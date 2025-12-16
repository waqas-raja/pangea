<?php

namespace App\Framework\Models;

use App\Framework\Tools\DB;
use DateInterval;
use DateTime;
use DateTimeZone;
use Exception;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Random\RandomException;

final class Estimate
{

    /**
     * @throws Exception
     */
    public static function GetAll($request, $response)
    {
        $q = <<<query
            select 
                e.*,
                c.name as customer_name,
                c.surname as customer_surname,
                c.bizname as customer_bizname,
                p.alias as property_alias,
                p.address as property_address, 
                p.city as property_city,
                p.cap as property_cap,
                p.nation as property_nation,
                p.property_status as property_status_id,
                ps.name as property_status_label,
                COALESCE(fc.fixed_cost, 0) AS fixed_cost,
                COALESCE(m.total_amount, 0) AS total_amount
            from estimate as e
            left join customer as c on e.customer = c.id
            left join property as p on e.property = p.id
            left join td_property_status as ps on p.property_status = ps.id
            LEFT JOIN (
                SELECT 
                    estimate_id,
                    SUM(amount) AS fixed_cost
                FROM estimate_fixed_costs
                GROUP BY estimate_id
            ) fc ON fc.estimate_id = e.id
            LEFT JOIN (
                SELECT 
                    estimate_id,
                    SUM(avge_daily_price * rented_days) AS total_amount
                FROM estimate_monthly
                GROUP BY estimate_id
            ) m ON m.estimate_id = e.id
            order by c.name
        query;
        $estimates = DB::Query($q);
        $response->getBody()->write(json_encode(["payload" => $estimates]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    /**
     * @throws Exception
     */
    public static function Add($request, $response)
    {
        try {
            $token_info = User::GetTokenInfo($request);
            $user_id = $token_info['id'];
            $data = json_decode($request->getBody()->getContents(), true);
            $customer = (int)$data['customer'] ?? 0;
            $property = (int)$data['property'] ?? 0;
            $monthlyEstimate = $data['monthlyEstimate'] ?? [];
            $fixedCost = $data['fixedCost'] ?? [];
            $date = new DateTime("now", new DateTimeZone("Europe/Rome"));
            $formatedDate = $date->format("Y-m-d H:i:s");
            $q = "INSERT INTO estimate (customer, property, dtcr, ucr) VALUES (?,?,?,?)";
            $params = [$customer, $property, $formatedDate, $user_id];
            $row_affected = DB::Execute($q, $params);
            if ($row_affected == 0) throw new Exception("Error while insert new estimate", 500);
            $last_inserted_id = DB::$LastId;
            for ($i = 0; $i < count($fixedCost); $i++) {
                $q = "INSERT INTO estimate_fixed_costs (estimate_id, label, amount, ucr, ule) VALUES (?,?,?,?,?)";
                $params = [$last_inserted_id, $fixedCost[$i]['label'], (float)$fixedCost[$i]['amount'], $user_id, $user_id];
                $row_affected = DB::Execute($q, $params);
                if ($row_affected == 0) throw new Exception("Error while inserting fixed cost record", 500);
            }
            for ($i = 0; $i < count($monthlyEstimate); $i++) {
                $q = "INSERT INTO estimate_monthly (estimate_id, month, avge_daily_price, rented_days, ucr, ule) VALUES (?,?,?,?,?,?)";
                $params = [$last_inserted_id, $monthlyEstimate[$i]['month'], (float)$monthlyEstimate[$i]['average'], (int)$monthlyEstimate[$i]['estimated'], $user_id, $user_id];
                $row_affected = DB::Execute($q, $params);
                if ($row_affected == 0) throw new Exception("Error while inserting average and rented days record", 500);
            }
            $response->getBody()->write(json_encode(["result" => true, "message" => "Registrazione salvata con successo", "id" => $last_inserted_id]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        } catch (Exception $e) {
            throw new Exception('Failed to add new estimate: ' . $e->getMessage());
        }
    }

    /**
     * @throws Exception
     */
    public static function GetEstimate($request, $response)
    {
        try {
            $id = (int)$request->getAttribute('id');
            $res = [];
            $q = <<<query
                select 
                    e.*,
                    c.name as customer_name,
                    c.surname as customer_surname,
                    c.email as customer_email,
                    c.phone as customer_phone,
                    p.address as propert_address,
                    p.size as property_size
                from estimate as e
                left join customer as c on e.customer = c.id
                left join property as p on e.property = p.id
                where e.id = ?
            query;
            $estimates = DB::Query($q, [$id]);
            if (count($estimates) > 0) {
                $res['estimate'] = $estimates[0];
                $q = <<<estimate_month_query
                    select
                        em.month,
                        em.avge_daily_price,
                        em.rented_days
                    from estimate_monthly as em
                    where em.estimate_id = ?
                estimate_month_query;
                $rows = DB::Query($q, [$id]);
                count($rows) > 0 ? $res['estimate_month'] = $rows : $res['estimate_month'] = [];
                $q = <<<estimate_fixed_cost_query
                    select
                        efc.label as fixed_cost_label,
                        efc.amount as fixed_cost_amount
                    from estimate_fixed_costs as efc
                    where efc.estimate_id = ?
                estimate_fixed_cost_query;
                $rows = DB::Query($q, [$id]);
                count($rows) > 0 ? $res['estimate_fixed_cost'] = $rows : $res['estimate_fixed_cost'] = [];
            } else throw new Exception("Quote not found", 400);
            $response->getBody()->write(json_encode(["result" => true, "payload" => $res]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        } catch (\Exception $e) {
            $response->getBody()->write(json_encode(["result" => false, 'message' => $e->getMessage()]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
        }
    }

    /**
     * @throws Exception
     */
    public static function Update($request, $response)
    {
        try{
            $token_info = User::GetTokenInfo($request);
            $user_id = $token_info['id'];
            $id = (int)$request->getAttribute('id');
            $data = json_decode($request->getBody()->getContents(), true);
            $customer = (int)$data['customer'] ?? 0;
            $property = (int)$data['property'] ?? 0;
            $monthlyEstimate = $data['monthlyEstimate'] ?? [];
            $fixedCost = $data['fixedCost'] ?? [];
            $q = "UPDATE estimate SET customer = ?, property = ?, WHERE id = ?";
            $params = [$customer, $property, $id];
            DB::Execute($q, $params);
            if (count($fixedCost) > 0) {
                DB::Execute('DELETE FROM estimate_fixed_costs WHERE estimate_id = ?', [$id]);
                for ($i = 0; $i < count($fixedCost); $i++) {
                    $q = "INSERT INTO estimate_fixed_costs (estimate_id, label, amount, ucr, ule) VALUES (?,?,?,?,?)";
                    $params = [$id, $fixedCost[$i]['label'], (float)$fixedCost[$i]['amount'], $user_id, $user_id];
                    $row_affected = DB::Execute($q, $params);
                    if ($row_affected == 0) throw new Exception("Error while updating fixed cost record", 500);
                }
            }
            if (count($monthlyEstimate) > 0) {
                DB::Execute('DELETE FROM estimate_monthly WHERE estimate_id = ?', [$id]);
                for ($i = 0; $i < count($monthlyEstimate); $i++) {
                    $q = "INSERT INTO estimate_monthly (estimate_id, month, avge_daily_price, rented_days, ucr, ule) VALUES (?,?,?,?,?,?)";
                    $params = [$id, $monthlyEstimate[$i]['month'], (float)$monthlyEstimate[$i]['average'], (int)$monthlyEstimate[$i]['estimated'], $user_id, $user_id];
                    $row_affected = DB::Execute($q, $params);
                    if ($row_affected == 0) throw new Exception("Error while updating average and rented days record", 500);
                }
            }
            $response->getBody()->write(json_encode(["result" => true, "message" => "Preventivo aggiornato con successo"]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        } catch (\Exception $e) {
            $response->getBody()->write(json_encode(["result" => false, 'message' => $e->getMessage()]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
        }
    }

    /**
     * @throws Exception
     */
    public static function Delete($request, $response)
    {
        try {
            $id = (int)$request->getAttribute('id');
            DB::Execute("DELETE FROM estimate_fixed_costs WHERE estimate_id = ?", [$id]);
            DB::Execute("DELETE FROM estimate_monthly WHERE estimate_id = ?", [$id]);
            $row_affected = DB::Execute("DELETE FROM estimate WHERE id = ?", [$id]);
            if ($row_affected == 0) throw new Exception("Error while deleting estimate", 500);
            $response->getBody()->write(json_encode(["result" => true]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        } catch (\Exception $e) {
            $response->getBody()->write(json_encode(["result" => false, 'message' => $e->getMessage()]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
        }
    }
}

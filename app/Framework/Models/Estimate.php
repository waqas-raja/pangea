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

final class Estimate {

    /**
     * @throws Exception
     */
    public static function GetAll($request, $response) {
        $q = <<<query
            select 
                q.*,
                c.name as customer_name,
                c.surname as customer_surname,
                c.bizname as customer_bizname,
                p.alias as property_alias,
                p.address as property_address, 
                p.city as property_city,
                p.cap as property_cap,
                p.nation as property_nation
            from estimate as q
            left join customer as c on q.customer = c.id
            left join property as p on q.property = p.id
            order by q.id
        query;
        $customers = DB::Query($q);
        $response->getBody()->write(json_encode(["payload" => $customers]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    /**
     * @throws Exception
     */
    public static function Add($request, $response) {
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
            $response->getBody()->write(json_encode(["result" => true, "id" => $last_inserted_id]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        } catch (Exception $e) {
            throw new Exception('Failed to add new estimate: ' . $e->getMessage());
        }
    }

    /**
     * @throws Exception
     */
    public static function GetCustomer($request, $response) {
        $agent_id = (int)$request->getAttribute('id');
        $q = <<<query
            select 
                c.*
            from customer as c
            where c.id = ?
        query;
        $rows = DB::Query($q, [$agent_id]);
        if(count($rows) == 0) throw new Exception("Customer not found", 400);
        $response->getBody()->write(json_encode(["payload" => $rows[0]]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    /**
     * @throws Exception
     */
    public static function Update($request, $response) {
        // $response->getBody()->write(json_encode(["result" => true]));
        // return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        $aid = (int)$request->getAttribute('id');
        $data = json_decode($request->getBody()->getContents(), true);
        $name = $data['name'] ?? "";
        $surname = $data['surname'] ?? "";
        $phone = $data['phone'] ?? "";
        $email = $data['email'] ?? "";
        $bizname = $data['bizname'] ?? null;
        $vat = $data['vat'] ?? null;
        $fiscal = $data['fiscal'] ?? null;
        $sdi = $data['sdi'] ?? null;
        $address = $data['address'] ?? null;
        $city = $data['city'] ?? null;
        $zip = $data['zip'] ?? null;
        $nation = $data['state'] ?? null;
        $note = $data['note'] ?? null;
        error_log("Updating customer with ID: $aid");
        error_log("Data received: " . json_encode($data));
        $q = 'UPDATE customer SET name = ?, surname = ?, phone = ?, email = ?, bizname = ?, vat = ?, fiscal_code = ?, sdi = ?, address = ?, city = ?, cap = ?, nation = ?, note = ? WHERE id = ?';
        $params = [$name, $surname, $phone, $email, $bizname, $vat, $fiscal, $sdi, $address, $city, $zip, $nation, $note, $aid];
        error_log("params: " . json_encode($params));
        $row_affected = DB::Execute($q, $params);
        error_log("Updated customer successfully with ID: $aid, affected rows: $row_affected");
        if ($row_affected == 0) throw new Exception("Error while updating customer", 500);
        $response->getBody()->write(json_encode(["result" => true]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    /**
     * @throws Exception
     */
    public static function Delete($request, $response) {
        $aid = (int)$request->getAttribute('id');
        $row_affected = DB::Execute("DELETE FROM customer WHERE id = ?", [$aid]);
        if ($row_affected == 0) throw new Exception("Error while deleting the customer", 500);
        $response->getBody()->write(json_encode(["result" => true]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

}
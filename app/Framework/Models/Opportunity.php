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

final class Opportunity {

    /**
     * @throws Exception
     */
    public static function GetAll($request, $response) {
        $q = <<<query
            select 
                o.*,
                t.name as property_type,
                s.name as source,
                n.name as nation,
                os.name as status
            from opportunity as o
            left join td_property_type as t on o.property_type = t.id
            left join td_source as s on o.source = s.id
            left join td_nation as n on o.nation = n.code
            left join td_opportunity_status as os on o.opportunity_status = os.id
            order by o.id
        query;
        $opportunities = DB::Query($q);
        $response->getBody()->write(json_encode(["payload" => $opportunities]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }
    
    /**
     * @throws Exception
     */
    public static function GetSources($request, $response) {
        $q = <<<query
            select * from td_source
        query;
        $sources = DB::Query($q);
        $response->getBody()->write(json_encode(["payload" => $sources]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    /**
     * @throws Exception
     */
    public static function GetOpportunityStatus($request, $response) {
        $q = <<<query
            select * from td_opportunity_status
        query;
        $types = DB::Query($q);
        $response->getBody()->write(json_encode(["payload" => $types]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    /**
     * @throws Exception
     */
    public static function GetNations($request, $response) {
        $q = <<<query
            select * from td_nation
        query;
        $types = DB::Query($q);
        $response->getBody()->write(json_encode(["payload" => $types]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    /**
     * @throws Exception
     */
    public static function Add($request, $response) {
        try {
            $token_info = User::GetTokenInfo($request);
            $user_id = $token_info['id'];
            $user_role = $token_info['role'];
            $data = json_decode($request->getBody()->getContents(), true);
            $alias = $data['alias'] ?? "";
            $source = (int)$data['source'] ?? 0;
            $nation = $data['nation'] ?? "IT";
            $city = $data['city'] ?? "";
            $address = $data['address'] ?? "";
            $type = (int)$data['propertyType'] ?? 0;
            $size = (float)$data['size'] ?? 0;
            $price = (int)$data['price'] ?? 0;
            $taxes = (int)$data['taxes'] ?? 0;
            $status = (int)$data['status'] ?? 0;
            $note = $data['note'] ?? "";
            $q = "INSERT INTO opportunity (alias, source, nation, city, address, property_type, size, opportunity_status, price, taxes, note) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
            $params = [$alias, $source, $nation, $city, $address, $type, $size, $status, $price, $taxes, $note];
            error_log("Adding new opportunity with data: " . json_encode($params));
            $row_affected = DB::Execute($q, $params);
            if ($row_affected == 0) throw new Exception("Error while insert Opportunity", 500);
            $last_inserted_id = DB::$LastId;
            $response->getBody()->write(json_encode(["result" => true, "id" => $last_inserted_id]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        } catch (Exception $e) {
            throw new Exception('Failed to add customer: ' . $e->getMessage());
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
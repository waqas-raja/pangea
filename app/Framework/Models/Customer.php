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

final class Customer {

    /**
     * @throws Exception
     */
    public static function GetAll($request, $response) {
        $q = <<<query
            select 
                c.*
            from customer as c
            order by c.id
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
            $user_role = $token_info['role'];
            $data = json_decode($request->getBody()->getContents(), true);
            $name = $data['name'] ?? "";
            $surname = $data['surname'] ?? "";
            $email = $data['email'] ?? "";
            $phone = $data['phone'] ?? "";
            $bizname = $data['bizname'] ?? null;
            $vat = $data['vat'] ?? null;
            $q = "INSERT INTO customer (name, surname, email, phone, bizname, vat) VALUES (?,?,?,?,?,?)";
            $params = [$name, $surname, $email, $phone, $bizname, $vat];
            $row_affected = DB::Execute($q, $params);
            if ($row_affected == 0) throw new Exception("Error while insert customer", 500);
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
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
        error_log("GetAll Customers");
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
}
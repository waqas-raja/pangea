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

final class Property {

    /**
     * @throws Exception
     */
    public static function GetAll($request, $response) {
        $q = <<<query
            select 
                p.*,
                n.name as nation_name,
                ps. name as property_status_name
            from property as p
            left join td_nation as n on p.nation = n.code
            left join td_property_status as ps on p.property_status = ps.id
            order by p.id
        query;
        $properties = DB::Query($q);
        $response->getBody()->write(json_encode(["payload" => $properties]));
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
            $nation = $data['nation'] ?? "";
            $city = $data['city'] ?? "";
            $address = $data['address'] ?? "";
            $zip = $data['zip'] ?? '';
            $status = (int)$data['propertyStatus'] ?? 0;
            $size = $data['size'] ?? 0;
            $floor = (int)$data['floor'] ?? 0;
            $acqPrice = (int)$data['acqPrice'] ?? 0;
            $renPrice = (int)$data['renPrice'] ?? 0;
            $extraPrice = (int)$data['extraPrice'] ?? 0;
            $sellPrice = (int)$data['sellPrice'] ?? 0;
            
            $q = "INSERT INTO property (alias, nation, city, address, cap, property_status, size, floor, acquisition_price, renovation_price, extra_price, sell_price) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
            $params = [$alias, $nation, $city, $address, $zip, $status, $size, $floor, $acqPrice, $renPrice, $extraPrice, $sellPrice];
            $row_affected = DB::Execute($q, $params);
            if ($row_affected == 0) throw new Exception("Error while insert property", 500);
            $last_inserted_id = DB::$LastId;
            $response->getBody()->write(json_encode(["result" => true, "id" => $last_inserted_id]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        } catch (Exception $e) {
            throw new Exception('Failed to add property: ' . $e->getMessage());
        }
    }

    /**
     * @throws Exception
     */
    public static function GetProperty($request, $response) {
        $agent_id = (int)$request->getAttribute('id');
        $q = <<<query
            select 
                p.*,
                n.name as nation_name,
                ps. name as property_status_name
            from property as p
            left join td_nation as n on p.nation = n.code
            left join td_property_status as ps on p.property_status = ps.id
            where p.id = ?
        query;
        $rows = DB::Query($q, [$agent_id]);
        if(count($rows) == 0) throw new Exception("Property not found", 400);
        $response->getBody()->write(json_encode(["payload" => $rows[0]]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    /**
     * @throws Exception
     */
    public static function Update($request, $response) {
        $id = (int)$request->getAttribute('id');
        $data = json_decode($request->getBody()->getContents(), true);
        $customer = $data['customer'] !== '' ? $data['customer'] : null;
        $opportunity = $data['opportunity'] !== '' ? $data['opportunity'] : null;
        $alias = $data['alias'] ?? "";
        $nation = $data['nation'] ?? "";
        $city = $data['city'] ?? null;
        $address = $data['address'] ?? null;
        $zip = $data['zip'] ?? null;
        $propertyStatus = $data['propertyStatus'] ?? null;
        $size = (float)$data['size'] ?? 0;
        $floor = (int)$data['floor'] ?? 0;
        $room = (int)$data['room'] ?? 0;
        $bathroom = (int)$data['bathroom'] ?? 0;
        $garden = (int)$data['garden'] ?? 0;
        $box = (int)$data['box'] ?? 0;
        $elevator = (int)$data['elevator'] ?? 0;
        $acqPrice = (int)$data['acqPrice'] ?? 0;
        $renPrice = (int)$data['renPrice'] ?? 0;
        $extraPrice = (int)$data['extraPrice'] ?? 0;
        $sellPrice = (int)$data['sellPrice'] ?? 0;
        
        $q = 'UPDATE property SET customer = ?, opportunity = ?, alias = ?, nation = ?, city = ?, address = ?, cap = ?, property_status = ?, size = ?, rooms = ?, bathrooms = ?, garden = ?, box = ?, floor= ?, elevator = ?, acquisition_price = ?, renovation_price = ?, extra_price = ?, sell_price = ? WHERE id = ?';
        $params = [$customer, $opportunity, $alias, $nation, $city, $address, $zip, $propertyStatus, $size, $room, $bathroom, $garden, $box, $floor, $elevator, $acqPrice, $renPrice, $extraPrice, $sellPrice, $id];
        $row_affected = DB::Execute($q, $params);
        if ($row_affected == 0) throw new Exception("Error while updating property", 500);
        $response->getBody()->write(json_encode(["result" => true]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    /**
     * @throws Exception
     */
    public static function Delete($request, $response) {
        $id = (int)$request->getAttribute('id');
        $row_affected = DB::Execute("DELETE FROM property WHERE id = ?", [$id]);
        if ($row_affected == 0) throw new Exception("Error while deleting the property", 500);
        $response->getBody()->write(json_encode(["result" => true]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    /**
     * @throws Exception
     */
    public static function GetPropertyTypes($request, $response) {
        $q = <<<query
            select * from td_property_type
        query;
        $types = DB::Query($q);
        $response->getBody()->write(json_encode(["payload" => $types]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }
    
    /**
     * @throws Exception
     */
    public static function GetPropertyStatus($request, $response) {
        $q = <<<query
            select * from td_property_status
        query;
        $types = DB::Query($q);
        $response->getBody()->write(json_encode(["payload" => $types]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

}
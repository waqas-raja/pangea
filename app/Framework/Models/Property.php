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
                ps.name as property_status_name,
                pt.name as property_type
            from property as p
            left join td_nation as n on p.nation = n.code
            left join td_property_status as ps on p.property_status = ps.id
            left join td_property_type as pt on p.property_type = pt.id
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
            $customer = (int)$data['customer'] ?? null;
            $propertyType = $data['propertyType'] !== '' ? (int)$data['propertyType'] : null;
            $nation = $data['nation'] ?? "";
            $city = $data['city'] ?? "";
            $address = $data['address'] ?? "";
            $zip = $data['zip'] ?? '';
            $status = (int)$data['propertyStatus'] ?? 1;
            $size = $data['size'] ?? 0;
            $floor = (int)$data['floor'] ?? 0;
            $room = (int)$data['room'] ?? 0;
            $bath = (int)$data['bathroom'] ?? 0;
            $garden = (int)$data['garden'] ?? 0;
            $box = (int)$data['box'] ?? 0;
            $elevator = (int)$data['elevator'] ?? 0;
            $acqPrice = (int)$data['acqPrice'] ?? 0;
            $renPrice = (int)$data['renPrice'] ?? 0;
            $extraPrice = (int)$data['extraPrice'] ?? 0;
            $sellPrice = (int)$data['sellPrice'] ?? 0;
            
            $q = "INSERT INTO property (alias, customer, nation, city, address, cap, property_status, property_type, size, floor, rooms, bathrooms, garden, box, elevator, acquisition_price, renovation_price, extra_price, sell_price) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
            $params = [$alias, $customer, $nation, $city, $address, $zip, $status, $propertyType, $size, $floor, $room, $bath, $garden, $box, $elevator, $acqPrice, $renPrice, $extraPrice, $sellPrice];
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
                c.name as customer_name,
                c.surname as customer_surname,
                c.bizname as customer_bizname,
                c.email as customer_email,
                c.phone as customer_phone,
                n.name as nation_name,
                ps.name as property_status_name,
                pt.id as property_type_id,
                pt.name as property_type
            from property as p
            left join customer as c on p.customer = c.id
            left join td_nation as n on p.nation = n.code
            left join td_property_status as ps on p.property_status = ps.id
            left join td_property_type as pt on p.property_type = pt.id
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
        $propertyType = $data['propertyType'] !== '' ? $data['propertyType'] : null;
        $alias = $data['alias'] ?? "";
        $nation = $data['nation'] ?? "";
        $city = $data['city'] ?? null;
        $address = $data['address'] ?? null;
        $zip = $data['zip'] ?? null;
        $street = $data['street'] ?? null;
        $district = $data['district'] ?? null;
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
        
        $q = 'UPDATE property SET customer = ?, alias = ?, nation = ?, city = ?, address = ?, cap = ?, property_status = ?, property_type = ?, size = ?, rooms = ?, bathrooms = ?, garden = ?, box = ?, floor= ?, elevator = ?, acquisition_price = ?, renovation_price = ?, extra_price = ?, sell_price = ? WHERE id = ?';
        $params = [$customer, $alias, $nation, $city, $address, $zip, $propertyStatus, $propertyType, $size, $room, $bathroom, $garden, $box, $floor, $elevator, $acqPrice, $renPrice, $extraPrice, $sellPrice, $id];
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
            select * from td_property_type order by name
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
    
    /**
     * @throws Exception
     */
    public static function GetAssociatedQuotes($request, $response) {
        $id = (int)$request->getAttribute('id');
        $q = <<<query
                select
                    e.*,
                    c.name as customer_name,
                    c.surname as customer_surname,
                    c.email as customer_email,
                    c.phone as customer_phone
                from estimate as e
                left join customer as c on e.customer = c.id
                where e.property = ?
        query;
        $quotes = DB::Query($q, [$id]);
        $response->getBody()->write(json_encode(["payload" => $quotes]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }
    
    /**
     * @throws Exception
     */
    public static function GetPropertyDocuments($request, $response) {
        try {
            $propertyId = (int)$request->getAttribute('id');
            $destinationDir = __DIR__ . "../../../static/imgs/property_".$propertyId."/";
            $files = [];
            if (is_dir($destinationDir)) {
                foreach (scandir($destinationDir) as $file) {
                    if ($file !== '.' && $file !== '..') {
                        $files[] = [
                            'name' => $file,
                            'path' => $destinationDir . $file,
                            'size' => filesize($destinationDir . $file),
                            'modified' => date("Y-m-d H:i:s", filemtime($destinationDir . $file))
                        ];
                    }
                }
            }
            $response->getBody()->write(json_encode(["result" => true, "payload" => $files]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        } catch (Exception $e) {
            $response->getBody()->write(json_encode(["result" => false, "error" => 'Impossibile ottenere i documenti di immobile']));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
        }
    }
    
    /**
     * @throws Exception
     */
    public static function UploadPropertyDocument($request, $response) {
        try {
            $propertyId = $_POST['property_id'];
            $destinationDir = __DIR__ . "../../../static/imgs/property_".$propertyId."/";
            if(!is_dir($destinationDir)) mkdir($destinationDir, 0755, true);
            $files = $_FILES['documents'];
            foreach ($_FILES['documents']['name'] as $i => $name) {
                $ext = strtolower(pathinfo($name, PATHINFO_EXTENSION));
                // $newName = time() . "_" . basename($name);
                $path = $destinationDir . basename($name);
                if (file_exists($path)) unlink($path);
                move_uploaded_file($_FILES['documents']['tmp_name'][$i], $path);
            }
            $response->getBody()->write(json_encode(["result" => true, "payload" => $files]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        } catch (Exception $e) {
            $response->getBody()->write(json_encode(["result" => false, "error" => 'Impossibile caricare i documenti di immobile']));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
        }
    }
    
    /**
     * @throws Exception
     */
    public static function DeletePropertyDocument($request, $response) {
        try {
            $id = (int)$request->getAttribute('id');
            $fname = $request->getAttribute('name');
            $destinationDoc = __DIR__ . "../../../static/imgs/property_" . $id . "/" . $fname;
            if (file_exists($destinationDoc)) unlink($destinationDoc);
            $response->getBody()->write(json_encode(["result" => true]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        } catch (Exception $e) {
            $response->getBody()->write(json_encode(["result" => false, "error" => "Si è verificato un errore durante l'eliminazione di questo documento"]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
        }
    }

}
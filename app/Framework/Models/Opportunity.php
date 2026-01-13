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
            where o.del_dt is NULL
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
            select * from td_nation order by name
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
            $source = (int)$data['source'] ?? 1;
            $nation = $data['nation'] ?? "IT";
            $city = $data['city'] ?? "";
            $address = $data['address'] ?? "";
            $type = (int)$data['propertyType'] ?? 0;
            $size = (float)$data['size'] ?? 0;
            $price = (int)$data['price'] ?? 0;
            $taxes = (int)$data['taxes'] ?? 0;
            $status = (int)$data['status'] ?? 0;
            $note = $data['note'] ?? "";
            $url = $data['url'] ?? null;
            $acqPrice = (int)$data['acuisitionPrice'] ?? null;
            $professionalService = null;
            $referenceName = $data['referenceName'] ?? null;
            $referenceSurname = $data['referenceSurname'] ?? null;
            $referenceEmail = $data['referenceEmail'] ?? null;
            $referencePhone = $data['referencePhone'] ?? null;
            $q = "INSERT INTO opportunity (alias, source, nation, city, address, property_type, size, opportunity_status, price, taxes, note, url, reference_name, reference_surname, reference_email, reference_phone, acquisition_price, professional_services) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
            $params = [$alias, $source, $nation, $city, $address, $type, $size, $status, $price, $taxes, $note, $url, $referenceName, $referenceSurname, $referenceEmail, $referencePhone, $acqPrice, $professionalService];
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
    public static function GetOpportunity($request, $response) {
        $id = (int)$request->getAttribute('id');
        $q = <<<query
            select 
                o.*,
                s.name as source_name,
                pt.name as property_type_name,
                n.name as nation_name,
                os.name as opportunity_status_name
            from opportunity as o
            left join td_source as s on o.source = s.id
            left join td_property_type as pt on o.property_type = pt.id
            left join td_nation as n on o.nation = n.code
            left join td_opportunity_status as os on o.opportunity_status = os. id
            where o.id = ?
        query;
        $rows = DB::Query($q, [$id]);
        if(count($rows) == 0) throw new Exception("Opportunity record not found", 400);
        $response->getBody()->write(json_encode(["payload" => $rows[0]]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    /**
     * @throws Exception
     */
    public static function Update($request, $response) {
        try {
            $token_info = User::GetTokenInfo($request);
            $user_id = $token_info['id'];
            $user_role = $token_info['role'];
            $id = (int)$request->getAttribute('id');
            $data = json_decode($request->getBody()->getContents(), true);
            $alias = $data['alias'] ?? "";
            $source = (int)$data['source'] ?? 1;
            $nation = $data['nation'] ?? "IT";
            $city = $data['city'] ?? "";
            $address = $data['address'] ?? "";
            $type = (int)$data['propertyType'] ?? 0;
            $size = (float)$data['size'] ?? 0;
            $price = (int)$data['price'] ?? 0;
            $taxes = (int)$data['taxes'] ?? 0;
            $status = (int)$data['opportunityStatus'] ?? 0;
            $note = $data['note'] ?? "";
            $url = $data['url'] ?? null;
            $referenceName = $data['referenceName'] ?? null;
            $referenceSurname = $data['referenceSurname'] ?? null;
            $referenceEmail = $data['referenceEmail'] ?? null;
            $referencePhone = $data['referencePhone'] ?? null;
            $acqPrice = (int)$data['acqPrice'] ?? 0;
            $professionalService = null;
            $q = "UPDATE opportunity SET alias = ?, url = ?, source = ?, nation = ?, city = ?, address = ?, property_type = ?, size = ?, reference_name = ?, reference_surname = ?, reference_email = ?, reference_phone = ?, opportunity_status = ?, price = ?, acquisition_price = ?, professional_services = ?, taxes = ?, note = ? WHERE id = ?";
            $params = [$alias, $url, $source, $nation, $city, $address, $type, $size, $referenceName, $referenceSurname, $referenceEmail, $referencePhone, $status, $price, $acqPrice, $professionalService, $taxes, $note, $id];
            $row_affected = DB::Execute($q, $params);
            if ($row_affected == 0) throw new Exception("Error while updating Opportunity", 500);
            $response->getBody()->write(json_encode(["result" => true]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        } catch (Exception $e) {
            throw new Exception('Failed to update opportunity: ' . $e->getMessage());
        }
    }

    /**
     * @throws Exception
     */
    public static function MarkOpportunityDelete($request, $response) {
        $id = (int)$request->getAttribute('id');
        $data = json_decode($request->getBody()->getContents(), true);
        $reason = $data['reason'] ?? "";
        $date = new DateTime("now", new DateTimeZone("Europe/Rome"));
        $formatedDate = $date->format("Y-m-d H:i:s");
        $row_affected = DB::Execute("UPDATE opportunity set del_reason = ?, del_dt = ? WHERE id = ?", [$reason, $formatedDate, $id]);
        if ($row_affected == 0) throw new Exception("Error while deleting the opportunity", 500);
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
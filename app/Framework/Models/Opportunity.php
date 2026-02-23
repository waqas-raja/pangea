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
            $note = $data['note'] ?? '';
            $url = $data['url'] ?? null;
            $acqPrice = (int)$data['acquisitionPrice'] ?? null;
            $professionalService = null;
            $referenceName = $data['referenceName'] ?? null;
            $referenceSurname = $data['referenceSurname'] ?? null;
            $referenceEmail = $data['referenceEmail'] ?? null;
            $referencePhone = $data['referencePhone'] ?? null;
            $q = "INSERT INTO opportunity (alias, source, nation, city, address, property_type, size, opportunity_status, price, taxes, url, reference_name, reference_surname, reference_email, reference_phone, acquisition_price, professional_services, note) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
            $params = [$alias, $source, $nation, $city, $address, $type, $size, $status, $price, $taxes, $url, $referenceName, $referenceSurname, $referenceEmail, $referencePhone, $acqPrice, $professionalService, $note];
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
            $url = $data['url'] ?? null;
            $referenceName = $data['referenceName'] ?? null;
            $referenceSurname = $data['referenceSurname'] ?? null;
            $referenceEmail = $data['referenceEmail'] ?? null;
            $referencePhone = $data['referencePhone'] ?? null;
            $acqPrice = (int)$data['acqPrice'] ?? 0;
            $professionalService = null;
            $q = "UPDATE opportunity SET alias = ?, url = ?, source = ?, nation = ?, city = ?, address = ?, property_type = ?, size = ?, reference_name = ?, reference_surname = ?, reference_email = ?, reference_phone = ?, opportunity_status = ?, price = ?, acquisition_price = ?, professional_services = ?, taxes = ? WHERE id = ?";
            $params = [$alias, $url, $source, $nation, $city, $address, $type, $size, $referenceName, $referenceSurname, $referenceEmail, $referencePhone, $status, $price, $acqPrice, $professionalService, $taxes, $id];
            $row_affected = DB::Execute($q, $params);
            if ($row_affected == 0) throw new Exception("Non sono state apportate modifiche. I dati sono identici", 500);
            $response->getBody()->write(json_encode(["result" => true]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        } catch (Exception $e) {
            $response->getBody()->write(json_encode(["result" => false, "error" => $e->getMessage()]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
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

    /**
     * @throws Exception
     */
    public static function UpdateNote($request, $response) {
        try {
            $token_info = User::GetTokenInfo($request);
            $user_id = $token_info['id'];
            $user_role = $token_info['role'];
            $id = (int)$request->getAttribute('id');
            $data = json_decode($request->getBody()->getContents(), true);
            $note = $data['note'] ?? "";
            $q = "UPDATE opportunity SET note = ? WHERE id = ?";
            $params = [$note, $id];
            $row_affected = DB::Execute($q, $params);
            if ($row_affected == 0) throw new Exception("Non sono state apportate modifiche. I dati sono identici");
            $response->getBody()->write(json_encode(["result" => true]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        } catch (Exception $e) {
            $response->getBody()->write(json_encode(["result" => false, "error" => $e->getMessage()]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
        }
    }

    /**
     * @throws Exception
     */
    public static function UploadPropertyValuationDocument($request, $response) {
        try {
            $opportunityId = $_POST['opportunity_id'];
            $destinationDir = __DIR__ . "../../../static/opportunities/".$opportunityId."/";
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
    public static function GetPropertyValuationDocument($request, $response) {
        try {
            $id = (int)$request->getAttribute('id');
            $destinationDir = __DIR__ . "../../../static/opportunities/".$id."/";
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
    public static function DownloadPropertyValuationDocument($request, $response) {
        $id = (int) $request->getAttribute('id');
        $fname = urldecode($request->getAttribute('name'));
        $basePath = __DIR__ . '../../../static';
        $baseDir  = realpath($basePath);
        if ($baseDir === false || $baseDir === '') throw new Exception('Directory di base non trovata');
        $filePath = $baseDir . "/opportunities/$id/" . basename($fname);
        if (!file_exists($filePath)) {
            $response->getBody()->write(json_encode([
                'result' => false,
                'error'  => 'Documento non trovato'
            ]));
            return $response
                ->withHeader('Content-Type', 'application/json')
                ->withStatus(404);
        }

        $mime = mime_content_type($filePath);
        $stream = new \Slim\Psr7\Stream(fopen($filePath, 'rb'));
        return $response
            ->withHeader('Content-Type', $mime)
            ->withHeader(
                'Content-Disposition',
                'attachment; filename="' . basename($fname) . '"'
            )
            ->withHeader('Content-Length', (string) filesize($filePath))
            ->withHeader('Cache-Control', 'no-cache')
            ->withBody($stream);
    }

    /**
     * @throws Exception
     */
    public static function DeletePropertyValuationDocument($request, $response) {
        try {
            $id = (int)$request->getAttribute('id');
            $fname = $request->getAttribute('name');
            $destinationDoc = __DIR__ . "../../../static/opportunities/" . $id . "/" . $fname;
            if (file_exists($destinationDoc)) unlink($destinationDoc);
            $response->getBody()->write(json_encode(["result" => true]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        } catch (Exception $e) {
            $response->getBody()->write(json_encode(["result" => false, "error" => "Si è verificato un errore durante l'eliminazione di questo documento"]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
        }
    }

}
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

final class Land
{
    /**
     * @throws Exception
     */
    public static function GetLandsByType($request, $response)
    {
        $id = (int)$request->getAttribute('id');
        $q = <<<query
            select 
                l.*,
                lt.name
            from residential_land as l
            left join td_land_type as lt on l.name = lt.id
            where l.name = ?
            order by l.id
        query;
        $lands = DB::Query($q, [$id]);
        $response->getBody()->write(json_encode(["payload" => $lands]));
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
            $landId = (int)$data['name'] ?? 0;
            $type = $data['residence_type'] ?? '';
            $area = (float)$data['area'] ?? 0;
            $location = $data['location'] ?? '';
            // $date = $data['date'] ?? '0000-00-00';
            $date = new DateTime("now", new DateTimeZone("Europe/Rome"));
            $formatedDate = $date->format("Y-m-d");
            $q = "INSERT INTO residential_land (name, surface_area, residence_type, location, dt) VALUES (?,?,?,?,?)";
            $params = [$landId, $area, $type, $location, $formatedDate];
            $row_affected = DB::Execute($q, $params);
            if ($row_affected == 0) throw new Exception("Error while insert new land", 500);
            $last_inserted_id = DB::$LastId;
            $response->getBody()->write(json_encode(["result" => true, "id" => $last_inserted_id]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        } catch (Exception $e) {
            $response->getBody()->write(json_encode(["result" => false, "message" => '']));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        }
    }

    /**
     * @throws Exception
     */
    public static function UpdateLandById($request, $response)
    {
        try {
            $id = (int)$request->getAttribute('id');
            $data = json_decode($request->getBody()->getContents(), true);
            $type = $data['residence_type'] ?? '';
            $area = $data['area'] ?? 0;
            $location = $data['location'] ?? '';
            $date = new DateTime("now", new DateTimeZone("Europe/Rome"));
            $formatedDate = $date->format("Y-m-d H:i:s");
            $q = 'UPDATE residential_land SET surface_area = ?, residence_type = ?, location = ? WHERE id = ?';
            $params = [$area, $type, $location, $id];
            $row_affected = DB::Execute($q, $params);
            if ($row_affected == 0) throw new Exception("Error while updating land", 500);
            $response->getBody()->write(json_encode(["result" => true]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        } catch (Exception $e) {
            $response->getBody()->write(json_encode(["result" => false, "message" => $e->getMessage()]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        }
    }

    /**
     * @throws Exception
     */
    public static function GetLandById($request, $response)
    {
        try {
            $id = (int)$request->getAttribute('id');
            $q = "select * from residential_land where id = ?";
            $rows = DB::Query($q, [$id]);
            if (count($rows) == 0) throw new Exception("Land not found", 404);
            $response->getBody()->write(json_encode(["result" => true, "payload" => $rows]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        } catch (\Exception $e) {
            $response->getBody()->write(json_encode(["result" => false, 'message' => $e->getMessage()]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
        }
    }

    /**
     * @throws Exception
     */
    public static function GetLandTypes($request, $response)
    {
        try {
            $q = "select * from td_land_type order by name";
            $rows = DB::Query($q);
            if (count($rows) == 0) throw new Exception("Land are not found", 404);
            $response->getBody()->write(json_encode(["result" => true, "payload" => $rows]));
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
            $row_affected = DB::Execute("DELETE FROM residential_land WHERE id = ?", [$id]);
            if ($row_affected == 0) throw new Exception("Error while deleting land", 500);
            $response->getBody()->write(json_encode(["result" => true]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        } catch (\Exception $e) {
            $response->getBody()->write(json_encode(["result" => false, 'message' => $e->getMessage()]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
        }
    }

    /**
     * @throws Exception
     */
    public static function ShareFile($request, $response)
    {
        try {
            $customerId = (int)$_POST["customer_id"];
            $fileId = $_POST["file_id"];
            $destinationDir = __DIR__ . "../../../static/docs";
            if (!is_dir($destinationDir)) { mkdir($destinationDir, 0777, true); }
            $destinationDir = $destinationDir . "/shared";
            if (!is_dir($destinationDir)) { mkdir($destinationDir, 0777, true); }
            $destinationDir = $destinationDir . "/". $customerId . '/';
            if (!is_dir($destinationDir)) { mkdir($destinationDir, 0777, true); }
            $name = $fileId . ".pdf";
            move_uploaded_file($_FILES["file"]["tmp_name"], $destinationDir . $name);
            // OR WE CAN SHARE THE FILE THROUGH AN EMAIL...
            $response->getBody()->write(json_encode(["result" => true]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        } catch (\Exception $e) {
            $response->getBody()->write(json_encode(["result" => false, 'message' => $e->getMessage()]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
        }
    }

    /**
     * @throws Exception
     */
    public static function UploadLandDocument($request, $response) {
        try {
            $landId = $_POST['land_id'];
            $destinationDir = __DIR__ . "../../../static/lands/".$landId."/";
            if(!is_dir($destinationDir)) mkdir($destinationDir, 0755, true);
            foreach ($_FILES['documents']['name'] as $i => $name) {
                $ext = strtolower(pathinfo($name, PATHINFO_EXTENSION));
                // $newName = time() . "_" . basename($name);
                $path = $destinationDir . basename($name);
                if (file_exists($path)) unlink($path);
                move_uploaded_file($_FILES['documents']['tmp_name'][$i], $path);
            }
            $response->getBody()->write(json_encode(["result" => true]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        } catch (Exception $e) {
            $response->getBody()->write(json_encode(["result" => false, "error" => 'Impossibile caricare i documenti di immobile']));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
        }
    }

    /**
     * @throws Exception
     */
    public static function GetLandDocuments($request, $response) {
        try {
            $landId = (int)$request->getAttribute('id');
            $destinationDir = __DIR__ . "../../../static/lands/".$landId."/";
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
    public static function DeleteLandDocument($request, $response) {
        try {
            $id = (int)$request->getAttribute('id');
            $fname = $request->getAttribute('name');
            $destinationDoc = __DIR__ . "../../../static/lands/" . $id . "/" . $fname;
            if (file_exists($destinationDoc)) unlink($destinationDoc);
            $response->getBody()->write(json_encode(["result" => true]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        } catch (Exception $e) {
            $response->getBody()->write(json_encode(["result" => false, "error" => "Si è verificato un errore durante l'eliminazione di questo documento"]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
        }
    }
}

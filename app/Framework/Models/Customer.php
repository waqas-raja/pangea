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
            order by c.name
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
        $q = 'UPDATE customer SET name = ?, surname = ?, phone = ?, email = ?, bizname = ?, vat = ?, fiscal_code = ?, sdi = ?, address = ?, city = ?, cap = ?, nation = ?, note = ? WHERE id = ?';
        $params = [$name, $surname, $phone, $email, $bizname, $vat, $fiscal, $sdi, $address, $city, $zip, $nation, $note, $aid];
        $row_affected = DB::Execute($q, $params);
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
    
    /**
     * @throws Exception
     */
    public static function GetAssociatedProperties($request, $response) {
        try {
            $id = (int)$request->getAttribute('id');
            $rows = DB::Query("SELECT * FROM property WHERE customer = ? order by alias", [$id]);
            $response->getBody()->write(json_encode(["result" => true, "payload" => $rows]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        } catch (Exception $e) {
            $response->getBody()->write(json_encode(["result" => false, 'message' => $e->getMessage()]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
        }
    }
    
    /**
     * @throws Exception
     */
    public static function GetAssociatedQuotes($request, $response) {
        try {
            $id = (int)$request->getAttribute('id');
            $q = <<<query
                select 
                    q.*,
                    p.alias as property_alias,
                    p.property_status as property_status_id,
                    ps.name as property_status_label
                from estimate as q
                left join property as p on q.property = p.id
                left join td_property_status as ps on p.property_status = ps.id
                where q.customer = ? order by q.id
            query;
            $rows = DB::Query($q, [$id]);
            $response->getBody()->write(json_encode(["result" => true, "payload" => $rows]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        } catch (Exception $e) {
            $response->getBody()->write(json_encode(["result" => false, 'message' => $e->getMessage()]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
        }
    }
    
    /**
     * @throws Exception
     */
    public static function GetAllCallsByCustomer($request, $response) {
        try {
            $id = (int)$request->getAttribute('id');
            $rows = DB::Query('SELECT * FROM customer_call WHERE customer_id = ?', [$id]);
            $response->getBody()->write(json_encode(["result" => true, "payload" => $rows]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        } catch (Exception $e) {
            $response->getBody()->write(json_encode(["result" => false, 'message' => $e->getMessage()]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
        }
    }

    /**
     * @throws Exception
     */
    public static function GetCallById($request, $response) {
        try {
            $id = (int)$request->getAttribute('id');
            $rows = DB::Query('SELECT * FROM customer_call WHERE id = ?', [$id]);
            $response->getBody()->write(json_encode(["result" => true, "payload" => $rows]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        } catch (Exception $e) {
            $response->getBody()->write(json_encode(["result" => false, 'message' => $e->getMessage()]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
        }
    }
    
    /**
     * @throws Exception
     */
    public static function AddCustomerCall($request, $response) {
        try {
            $data = json_decode($request->getBody()->getContents(), true);
            $cid = $data['customer_id'] ?? "";
            $date = $data['date'] ?? "";
            $callType = $data['call_type'] ?? "";
            $note = $data['note'] ?? "";
            $q = "INSERT INTO customer_call (customer_id, dt, ctype, note) VALUES (?,?,?,?)";
            $params = [$cid, $date, $callType, $note];
            $row_affected = DB::Execute($q, $params);
            if ($row_affected == 0) throw new Exception("Errore durante l'inserimento dell'chiamata del cliente", 500);
            $last_inserted_id = DB::$LastId;
            $response->getBody()->write(json_encode(["result" => true, "id" => $last_inserted_id]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        } catch (Exception $e) {
            $response->getBody()->write(json_encode(["result" => false, 'message' => $e->getMessage()]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
        }
    }

    /**
     * @throws Exception
     */
    public static function UpdateCustomerCall($request, $response) {
        try {
            $id = (int)$request->getAttribute('id');
            $data = json_decode($request->getBody()->getContents(), true);
            $date = $data['date'] ?? "";
            $type = $data['call_type'] ?? "";
            $note = $data['note'] ?? "";
            $q = 'UPDATE customer_call SET dt = ?, ctype = ?, note = ? WHERE id = ?';
            $params = [$date, $type, $note, $id];
            $row_affected = DB::Execute($q, $params);
            if ($row_affected == 0) throw new Exception("Errore durante l'aggiornamento dell'chimata del cliente", 500);
            $response->getBody()->write(json_encode(["result" => true]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        } catch (Exception $e) {
            $response->getBody()->write(json_encode(["result" => false, 'message' => $e->getMessage()]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
        }
    }

    /**
     * @throws Exception
     */
    public static function DeleteCallById($request, $response) {
        try {
            $id = (int)$request->getAttribute('id');
            $row_affected = DB::Execute("DELETE FROM customer_call WHERE id = ?", [$id]);
            if ($row_affected == 0) throw new Exception("Error while deleting the call", 500);
            $response->getBody()->write(json_encode(["result" => true]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        } catch (Exception $e) {
            $response->getBody()->write(json_encode(["result" => false, 'message' => $e->getMessage()]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
        }
    }
    
    /**
     * @throws Exception
     */
    public static function GetAllAppointmentByCustomer($request, $response) {
        try {
            $id = (int)$request->getAttribute('id');
            $rows = DB::Query('SELECT * FROM appointment WHERE customer_id = ?', [$id]);
            $response->getBody()->write(json_encode(["result" => true, "payload" => $rows]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        } catch (Exception $e) {
            $response->getBody()->write(json_encode(["result" => false, 'message' => $e->getMessage()]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
        }
    }
    
    /**
     * @throws Exception
     */
    public static function GetAppointmentById($request, $response) {
        try {
            $id = (int)$request->getAttribute('id');
            $rows = DB::Query('SELECT * FROM appointment WHERE id = ?', [$id]);
            $response->getBody()->write(json_encode(["result" => true, "payload" => $rows]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        } catch (Exception $e) {
            $response->getBody()->write(json_encode(["result" => false, 'message' => $e->getMessage()]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
        }
    }
    
    /**
     * @throws Exception
     */
    public static function AddCustomerAppointment($request, $response) {
        try {
            $data = json_decode($request->getBody()->getContents(), true);
            $cid = $data['customer_id'] ?? "";
            $date = $data['date'] ?? "";
            $location = $data['location'] ?? "";
            $note = $data['note'] ?? "";
            $q = "INSERT INTO appointment (customer_id, dt, location, note) VALUES (?,?,?,?)";
            $params = [$cid, $date, $location, $note];
            $row_affected = DB::Execute($q, $params);
            if ($row_affected == 0) throw new Exception("Errore durante l'inserimento dell'appuntamento del cliente", 500);
            $last_inserted_id = DB::$LastId;
            $response->getBody()->write(json_encode(["result" => true, "id" => $last_inserted_id]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        } catch (Exception $e) {
            $response->getBody()->write(json_encode(["result" => false, 'message' => $e->getMessage()]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
        }
    }
    
    /**
     * @throws Exception
     */
    public static function UpdateCustomerAppointment($request, $response) {
        try {
            $id = (int)$request->getAttribute('id');
            $data = json_decode($request->getBody()->getContents(), true);
            $date = $data['date'] ?? "";
            $location = $data['location'] ?? "";
            $note = $data['note'] ?? "";
            $q = 'UPDATE appointment SET dt = ?, location = ?, note = ? WHERE id = ?';
            $params = [$date, $location, $note, $id];
            $row_affected = DB::Execute($q, $params);
            if ($row_affected == 0) throw new Exception("Errore durante l'aggiornamento dell'appuntamento del cliente", 500);
            $response->getBody()->write(json_encode(["result" => true]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        } catch (Exception $e) {
            $response->getBody()->write(json_encode(["result" => false, 'message' => $e->getMessage()]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
        }
    }
    
    /**
     * @throws Exception
     */
    public static function DeleteAppointmentById($request, $response) {
        try {
            $aid = (int)$request->getAttribute('id');
            $row_affected = DB::Execute("DELETE FROM appointment WHERE id = ?", [$aid]);
            if ($row_affected == 0) throw new Exception("Error while deleting the appointment", 500);
            $response->getBody()->write(json_encode(["result" => true]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        } catch (Exception $e) {
            $response->getBody()->write(json_encode(["result" => false, 'message' => $e->getMessage()]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
        }
    }

    /**
     * @throws Exception
     */
    public static function GetAllEmailsByCustomer($request, $response) {
        try {
            $id = (int)$request->getAttribute('id');
            $rows = DB::Query('SELECT * FROM customer_email WHERE customer_id = ?', [$id]);
            $response->getBody()->write(json_encode(["result" => true, "payload" => $rows]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        } catch (Exception $e) {
            $response->getBody()->write(json_encode(["result" => false, 'message' => $e->getMessage()]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
        }
    }

    /**
     * @throws Exception
     */
    public static function GetEmailById($request, $response) {
        try {
            $id = (int)$request->getAttribute('id');
            $rows = DB::Query('SELECT * FROM customer_email WHERE id = ?', [$id]);
            $response->getBody()->write(json_encode(["result" => true, "payload" => $rows]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        } catch (Exception $e) {
            $response->getBody()->write(json_encode(["result" => false, 'message' => $e->getMessage()]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
        }
    }

    /**
     * @throws Exception
     */
    public static function AddCustomerEmail($request, $response) {
        try {
            $data = json_decode($request->getBody()->getContents(), true);
            $cid = $data['customer_id'] ?? "";
            $date = $data['date'] ?? "";
            $subject = $data['subject'] ?? "";
            $content = $data['note'] ?? "";
            $q = "INSERT INTO customer_email (customer_id, subject, content, dt) VALUES (?,?,?,?)";
            $params = [$cid, $subject, $content, $date];
            $row_affected = DB::Execute($q, $params);
            if ($row_affected == 0) throw new Exception("Errore durante l'inserimento dell'email del cliente", 500);
            $last_inserted_id = DB::$LastId;
            $response->getBody()->write(json_encode(["result" => true, "id" => $last_inserted_id]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        } catch (Exception $e) {
            $response->getBody()->write(json_encode(["result" => false, 'message' => $e->getMessage()]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
        }
    }

    /**
     * @throws Exception
     */
    public static function UpdateCustomerEmail($request, $response) {
        try {
            $id = (int)$request->getAttribute('id');
            $data = json_decode($request->getBody()->getContents(), true);
            $date = $data['date'] ?? "";
            $subject = $data['subject'] ?? "";
            $content = $data['content'] ?? "";
            $q = 'UPDATE customer_email SET dt = ?, subject = ?, content = ? WHERE id = ?';
            $params = [$date, $subject, $content, $id];
            $row_affected = DB::Execute($q, $params);
            if ($row_affected == 0) throw new Exception("Errore durante l'aggiornamento dell'email del cliente", 500);
            $response->getBody()->write(json_encode(["result" => true]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        } catch (Exception $e) {
            $response->getBody()->write(json_encode(["result" => false, 'message' => $e->getMessage()]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
        }
    }

    /**
     * @throws Exception
     */
    public static function DeleteEmailById($request, $response) {
        try {
            $aid = (int)$request->getAttribute('id');
            $row_affected = DB::Execute("DELETE FROM customer_email WHERE id = ?", [$aid]);
            if ($row_affected == 0) throw new Exception("Error while deleting the email", 500);
            $response->getBody()->write(json_encode(["result" => true]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        } catch (Exception $e) {
            $response->getBody()->write(json_encode(["result" => false, 'message' => $e->getMessage()]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
        }
    }

}
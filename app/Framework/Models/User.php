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
use PHPMailer\PHPMailer\PHPMailer;
use App\Framework\Tools\BrevoManager;

final class User
{
    /**
     * @throws Exception
     */
    public static function GetTokenInfo($request): array
    {
        $jwtSecret = getenv('JWT_SECRET');
        $tokenCookie = $_COOKIE['token'] ?? '';
        if (empty($tokenCookie)) throw new Exception('Token not found', 401);
        $decoded = JWT::decode($tokenCookie, new Key($jwtSecret, 'HS256'));
        return (array)$decoded;
    }

    /**
     * @throws RandomException
     * @throws Exception
     */
    public static function SignIn($request, $response)
    {
        $body = $request->getBody()->getContents();
        $data = json_decode($body, true);
        $email = $data['email'] ?? '';
        $psw = $data['psw'] ?? '';
        $ip = $data['ip'] ?? '';
        $mobile = $data['mobile'] ?? '';
        $os = $data['os'] ?? '';
        if (empty($email) || empty($psw)) throw new Exception('Email and password are required', 400);
        $q = "SELECT u.id, u.name, u.role_id FROM user as u WHERE u.email = ? AND u.psw = ?";
        $rows = DB::Query($q, [$email, sha1($psw)]);
        if (count($rows) == 0) throw new Exception('Invalid email or password', 401);
        if (count($rows) > 1) throw new Exception("Invalid number of users with the same email", 500);
        $u = $rows[0];
        $payload = [
            'id' => $u['id'],
            'name' => $u['name'],
            'role' => $u['role_id'],
            'exp' => time() + 3600 * 24, // 1D
        ];
        $jwtSecret = getenv('JWT_SECRET');
        $token = JWT::encode($payload, $jwtSecret, 'HS256');
        $host = explode(':', $_SERVER["HTTP_HOST"])[0];
        // set token cookie
        $cookieParams = [
            'expires' => time() + 3660 * 24,
            'path' => '/',
            'domain' => $host,
            'secure' => ($host !== 'localhost' && $host !== '127.0.0.1'),
            'httponly' => true
        ];
        setcookie('token', $token, $cookieParams);
        $response->getBody()->write(json_encode(['id' => $u['id'], 'name' => $u['name'], 'role' => $u['role_id']]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    /**
     * @throws Exception
     */
    public static function AuthRenew($request, $response)
    {
        $body = $request->getBody()->getContents();
        $data = json_decode($body, true);
        $refresh_token = $data['refresh_token'] ?? '';
        $q = "select token from user_session where token = ?";
        $rows = DB::Query($q, [$refresh_token]);
        if (count($rows) == 0) throw new Exception('Invalid refresh token', 401);
        if (count($rows) > 1) throw new Exception("Invalid number of users with the same refresh token", 500);
        $token_info = self::GetTokenInfo($request);
        $jwtSecret = getenv('JWT_SECRET');
        $payload = [
            'id' => $token_info['id'],
            'name' => $token_info['name'],
            'role' => $token_info['role'],
            'exp' => time() + 3600, // 1H
        ];
        $token = JWT::encode($payload, $jwtSecret, 'HS256');
        $response->getBody()->write(json_encode(['token' => $token]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    /**
     * @throws Exception
     */
    public static function AuthValidate($request, $response)
    {
        $token_info = self::GetTokenInfo($request);
        $response->getBody()->write(json_encode(["is_valid" => !empty($token_info)]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    /**
     * @throws RandomException
     * @throws Exception
     */
    public static function GeneratePin($request, $response)
    {
        try {
            $token_info = self::GetTokenInfo($request);
            $user_id = $token_info['id'];
            $parsedBody = json_decode($request->getBody()->getContents(), true);
            $email = $parsedBody['email'] ?? "";
            error_log($email);
            if ($email === "") throw new Exception("L'e-mail è obbligatoria", 400);
            $query = 'SELECT id FROM user WHERE email = ?';
            $row = DB::Query($query, [$email]);
            if (count($row) == 0) throw new Exception("E-mail non trovata", 404);
            $email = 'waqasraja9@gmail.com';
            $pin = str_pad((string) random_int(0, 9999), 4, '0', STR_PAD_LEFT);
            $mail = new PHPMailer(true);
            $mail->isSMTP();
            $mail->Host       = getenv('BREVO_SMTP');
            $mail->SMTPAuth   = true;
            $mail->Username   = getenv('BREVO_USER');
            $mail->Password   = getenv('BREVO_PSW');
            $mail->Port       = (int)getenv('BREVO_PORT');
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->setFrom(getenv('DEFAULT_MAIL_FROM'), getenv('APPLICATION_NAME'));
            $mail->addAddress($email);
            // Content
            $mail->isHTML(true);
            $mail->Subject = 'Your Verification PIN';
            $mail->Body    = "
            <p>Hello,</p>
            <p>Your verification PIN is:</p>
            <h2>$pin</h2>
            <p>This PIN will expire in 3 minutes.</p>";
            $mailRes = $mail->send();
            $response->getBody()->write(json_encode(['result' => true, 'pin' => $pin, 'userId' => $row[0]['id']]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        } catch (\Exception $e) {
            $response->getBody()->write(json_encode(["result" => false, 'message' => $e->getMessage()]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
        }
    }
    
    /**
     * @throws RandomException
     * @throws Exception
     */
    public static function ResetNewPassword($request, $response)
    {
        try {
            $id = (int)$request->getAttribute('id');
            $parsedBody = json_decode($request->getBody()->getContents(), true);
            $newPsw = $parsedBody['newPsw'] ?? "";
            $q = "update user set psw = sha1(?), force_change_psw = 1 where id = ?";
            $params = [$newPsw, $id];
            $row_affected = DB::Execute($q, $params);
            if($row_affected == 0) throw new Exception("Errore durante l'aggiornamento della nuova password dell'utente", 500);
            $response->getBody()->write(json_encode(['result' => true]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        } catch (\Exception $e) {
            $response->getBody()->write(json_encode(["result" => false, 'message' => $e->getMessage()]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
        }
    }

    /**
     * @throws Exception
     */
    public static function GetAll($request, $response)
    {
        $token_info = self::GetTokenInfo($request);
        if ($token_info['role'] < Role::STAFF) throw new Exception('Unauthorized request', 401);
        $q = <<<query
            select u.id, u.name, u.surname, concat(u.name, ' ', u.surname) as full_name, u.email, r.id as role_id, r.name as role_name 
            from user as u 
            inner join `td_role` as r on r.id = u.role_id
            order by u.role_id desc, u.surname
        query;
        $rows = DB::Query($q);
        $response->getBody()->write(json_encode(['payload' => $rows]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    /**
     * @throws Exception
     */
    public static function Dashboard($request, $response)
    {
        $token_info = self::GetTokenInfo($request);
        $user_id = $token_info['id'];
        $user_role = $token_info['role'];
        $data = [
            "charts_info" => ContactList::GetChartInfo($user_id, $user_role),
            "calls" => ContactActivity::GetCalls($user_id, $user_role)
        ];
        $response->getBody()->write(json_encode(["payload" => $data]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    /**
     * @throws Exception
     */
    public static function Add($request, $response)
    {
        $token_info = self::GetTokenInfo($request);
        $user_id = $token_info['id'];
        $user_role = $token_info['role'];
        if ($user_role < Role::STAFF) throw new Exception('Unauthorized request', 401);
        $parsedBody = json_decode($request->getBody()->getContents(), true);
        $name = $parsedBody['name'] ?? "";
        $surname = $parsedBody['surname'] ?? "";
        $email = $parsedBody['email'] ?? "";
        $role_id = (int)$parsedBody['role'] ?? null;
        if (empty($name) || empty($surname) || empty($email))
            throw new Exception('Name, surname and email are required', 400);
        if (!in_array($role_id, Role::ToList()))
            throw new Exception('Role id is not allowed', 400);
        $rnd_psw = bin2hex(random_bytes(16));
        $q = "insert into user (name, surname, email, role_id, psw, force_change_psw, ucr, ule) values (?, ?, ?, ?, sha1(?), 1, ?, ?)";
        $params = [$name, $surname, $email, $role_id, $rnd_psw, $user_id, $user_id];
        $row_affected = DB::Execute($q, $params);
        if ($row_affected == 0) throw new Exception("Error inserting user", 500);
        $response->getBody()->write(json_encode(["result" => true, "psw" => $rnd_psw]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    /**
     * @throws Exception
     */
    public static function Delete($request, $response)
    {
        $token_info = self::GetTokenInfo($request);
        $user_role = $token_info['role'];
        if ($user_role < Role::STAFF) throw new Exception('Unauthorized request', 401);
        $id = (int)$request->getAttribute('id');
        $q = "delete from user where id = ?";
        $params = [$id];
        $row_affected = DB::Execute($q, $params);
        if ($row_affected == 0) throw new Exception("Error deleting user or user not found", 404);
        $response->getBody()->write(json_encode(["result" => true]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    /**
     * @throws Exception
     */
    public static function GetItem($request, $response)
    {
        $token_info = self::GetTokenInfo($request);
        $user_role = $token_info['role'];
        if ($user_role < Role::STAFF) throw new Exception('Unauthorized request', 401);
        $id = (int)$request->getAttribute('id');
        $q = "select * from user where id = ?";
        $params = [$id];
        $rows = DB::Query($q, $params);
        if (count($rows) == 0) throw new Exception("User not found", 404);
        $response->getBody()->write(json_encode(["payload" => $rows[0]]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    /**
     * @throws Exception
     */
    public static function Update($request, $response)
    {
        $token_info = self::GetTokenInfo($request);
        $user_id = $token_info['id'];
        $user_role = $token_info['role'];
        if ($user_role < Role::STAFF) throw new Exception('Unauthorized request', 401);
        $id = (int)$request->getAttribute('id');
        $parsedBody = json_decode($request->getBody()->getContents(), true);
        $name = $parsedBody['name'] ?? "";
        $surname = $parsedBody['surname'] ?? "";
        $email = $parsedBody['email'] ?? "";
        $role = (int)$parsedBody['role'] ?? null;
        $password = sha1($parsedBody['password']) ?? null;
        $q = "update user set name = ?, surname = ?, email = ?, psw = ?, role_id = ?, ule = ? where id = ?";
        $params = [$name, $surname, $email, $password, $role, $user_id, $id];
        $row_affected = DB::Execute($q, $params);
        if ($row_affected == 0) throw new Exception("Error updating user", 500);
        $response->getBody()->write(json_encode(["result" => true]));
        return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
    }

    /**
     * @throws Exception
     */
    public static function UpdateProfileData($request, $response)
    {
        try {
            $token_info = self::GetTokenInfo($request);
            $user_id = $token_info['id'];
            $user_role = $token_info['role'];
            if ($user_role < Role::STAFF) throw new Exception('Unauthorized request', 401);
            $id = (int)$request->getAttribute('id');
            $parsedBody = json_decode($request->getBody()->getContents(), true);
            $name = $parsedBody['name'] ?? "";
            $surname = $parsedBody['surname'] ?? "";
            $email = $parsedBody['email'] ?? "";
            $q = "update user set name = ?, surname = ?, email = ? where id = ?";
            $params = [$name, $surname, $email, $id];
            $row_affected = DB::Execute($q, $params);
            if ($row_affected == 0) throw new Exception("Error updating user profile data", 500);
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
    public static function UpdateProfilePsw($request, $response)
    {
        try {
            $token_info = self::GetTokenInfo($request);
            $user_role = $token_info['role'];
            if ($user_role < Role::STAFF) throw new Exception('Unauthorized request', 401);
            $id = (int)$request->getAttribute('id');
            $parsedBody = json_decode($request->getBody()->getContents(), true);
            $psw = $parsedBody['old_psw'] ?? "";
            $pswNew = $parsedBody['new_psw'] ?? "";
            $q = "select * from user where id = ? and psw = sha1(?)";
            $params = [$id, $psw];
            $rows = DB::Query($q, $params);
            if (count($rows) === 0) throw new Exception("La vecchia password è sbagliata", 500);
            $q = "update user set psw = sha1(?), force_change_psw = 1 where id = ?";
            $params = [$pswNew, $id];
            $row_affected = DB::Execute($q, $params);
            if ($row_affected == 0) throw new Exception("Si è verificato un errore durante l'aggiornamento della password", 500);
            $response->getBody()->write(json_encode(["result" => true]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(200);
        } catch (\Exception $e) {
            $response->getBody()->write(json_encode(["result" => false, 'message' => $e->getMessage()]));
            return $response->withHeader('Content-Type', 'application/json')->withStatus(400);
        }
    }
}

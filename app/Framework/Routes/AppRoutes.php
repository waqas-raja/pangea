<?php

namespace App\Framework\Routes;

use App\Framework\Middlewares\AuthMiddleware;
use Slim\App;

class AppRoutes {
    private AuthMiddleware $authMiddleware;

    public function __construct(AuthMiddleware $authMiddleware) {
        $this->authMiddleware = $authMiddleware;
    }

    public function register(App $app): void {
        $app->get('/', function ($request, $response) {
            ob_start();
            require_once __DIR__ . '/../../views/pages/sign-in.php';
            $response->getBody()->write(ob_get_clean());
            return $response->withHeader('Content-Type', 'text/html');
        });

        $app->get('/settings', function ($request, $response) {
            ob_start();
            require_once __DIR__ . '/../../views/pages/settings.php';
            $response->getBody()->write(ob_get_clean());
            return $response->withHeader('Content-Type', 'text/html');
        })->add($this->authMiddleware);

        $app->get('/user-profile', function ($request, $response) {
            ob_start();
            require_once __DIR__ . '/../../views/pages/user-profile.php';
            $response->getBody()->write(ob_get_clean());
            return $response->withHeader('Content-Type', 'text/html');
        })->add($this->authMiddleware);

        $app->get('/users', function ($request, $response) {
            ob_start();
            require_once __DIR__ . '/../../views/pages/users.php';
            $response->getBody()->write(ob_get_clean());
            return $response->withHeader('Content-Type', 'text/html');
        })->add($this->authMiddleware);

        $app->get('/user/{id}', function ($request, $response) {
            $cid = $request->getAttribute('id');
            extract(['cid' => $cid]);
            ob_start();
            require_once __DIR__ . '/../../views/pages/user-detail.php';
            $response->getBody()->write(ob_get_clean());
            return $response->withHeader('Content-Type', 'text/html');
        })->add($this->authMiddleware);

        $app->get('/dashboard', function ($request, $response) {
            ob_start();
            require_once __DIR__ . '/../../views/pages/dashboard.php';
            $response->getBody()->write(ob_get_clean());
            return $response->withHeader('Content-Type', 'text/html');
        })->add($this->authMiddleware);

        $app->get('/customers', function ($request, $response) {
            ob_start();
            require_once __DIR__ . '/../../views/pages/customers.php';
            $response->getBody()->write(ob_get_clean());
            return $response->withHeader('Content-Type', 'text/html');
        })->add($this->authMiddleware);

        $app->get('/customer/{id}', function ($request, $response) {
            $cid = $request->getAttribute('id');
            extract(['cid' => $cid]);
            ob_start();
            require_once __DIR__ . '/../../views/pages/customer-detail.php';
            $response->getBody()->write(ob_get_clean());
            return $response->withHeader('Content-Type', 'text/html');
        })->add($this->authMiddleware);

        $app->get('/properties', function ($request, $response) {
            ob_start();
            require_once __DIR__ . '/../../views/pages/properties.php';
            $response->getBody()->write(ob_get_clean());
            return $response->withHeader('Content-Type', 'text/html');
        })->add($this->authMiddleware);

        $app->get('/property/{id}', function ($request, $response) {
            $id = $request->getAttribute('id');
            extract(['id' => $id]);
            ob_start();
            require_once __DIR__ . '/../../views/pages/property-detail.php';
            $response->getBody()->write(ob_get_clean());
            return $response->withHeader('Content-Type', 'text/html');
        })->add($this->authMiddleware);
        
        $app->get('/estimate', function ($request, $response) {
            ob_start();
            require_once __DIR__ . '/../../views/pages/list-estimates.php';
            $response->getBody()->write(ob_get_clean());
            return $response->withHeader('Content-Type', 'text/html');
        })->add($this->authMiddleware);

        $app->get('/estimate/{id}', function ($request, $response) {
            $id = $request->getAttribute('id');
            extract(['id' => $id]);
            ob_start();
            require_once __DIR__ . '/../../views/pages/estimate-detail.php';
            $response->getBody()->write(ob_get_clean());
            return $response->withHeader('Content-Type', 'text/html');
        })->add($this->authMiddleware);

        $app->get('/opportunities', function ($request, $response) {
            ob_start();
            require_once __DIR__ . '/../../views/pages/opportunities.php';
            $response->getBody()->write(ob_get_clean());
            return $response->withHeader('Content-Type', 'text/html');
        })->add($this->authMiddleware);

        $app->get('/opportunity/{id}', function ($request, $response) {
            $oid = $request->getAttribute('id');
            extract(['oid' => $oid]);
            ob_start();
            require_once __DIR__ . '/../../views/pages/opportunity-detail.php';
            $response->getBody()->write(ob_get_clean());
            return $response->withHeader('Content-Type', 'text/html');
        })->add($this->authMiddleware);
    }
}

<?php

namespace App\Framework\Routes;

use App\Framework\Middlewares\AuthMiddleware;
use App\Framework\Middlewares\JWTMiddleware;
use App\Framework\Models\Land;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Routing\RouteCollectorProxy;

class LandRoutes {
    private AuthMiddleware $authMiddleware;
    private JWTMiddleware $jwtMiddleware;

    public function __construct(AuthMiddleware $authMiddleware, JWTMiddleware $jwtMiddleware) {
        $this->authMiddleware = $authMiddleware;
        $this->jwtMiddleware = $jwtMiddleware;
    }

    public function register(RouteCollectorProxy $group): void {
        $group->post('', function (Request $request, Response $response) {
            return Land::Add($request, $response);
        })
        ->add($this->authMiddleware)
        ->add($this->jwtMiddleware);

        $group->get('/land-types', function (Request $request, Response $response) {
            return Land::GetLandTypes($request, $response);
        })
        ->add($this->authMiddleware)
        ->add($this->jwtMiddleware);
    }
}


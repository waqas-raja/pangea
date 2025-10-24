<?php

namespace App\Framework\Routes;

use App\Framework\Middlewares\AuthMiddleware;
use App\Framework\Models\Estimate;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Routing\RouteCollectorProxy;

class EstimateRoutes {
    private AuthMiddleware $authMiddleware;

    public function __construct(AuthMiddleware $authMiddleware) {
        $this->authMiddleware = $authMiddleware;
    }

    public function register(RouteCollectorProxy $group): void {
        $group->post('', function (Request $request, Response $response) {
            return Estimate::Add($request, $response);
        })->add($this->authMiddleware);

        $group->get('/{id}', function (Request $request, Response $response) {
            return Estimate::GetCustomer($request, $response);
        })->add($this->authMiddleware);

        $group->patch('/{id}', function (Request $request, Response $response) {
            return Estimate::Update($request, $response);
        })->add($this->authMiddleware);

        $group->delete('/{id}', function (Request $request, Response $response) {
            return Estimate::Delete($request, $response);
        })->add($this->authMiddleware);
    }
}


<?php

namespace App\Framework\Routes;

use App\Framework\Middlewares\AuthMiddleware;
use App\Framework\Middlewares\JWTMiddleware;
use App\Framework\Models\User;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Routing\RouteCollectorProxy;

class UserRoutes {
    private AuthMiddleware $authMiddleware;
    private JWTMiddleware $jwtMiddleware;

    public function __construct(AuthMiddleware $authMiddleware, JWTMiddleware $jwtMiddleware) {
        $this->authMiddleware = $authMiddleware;
        $this->jwtMiddleware = $jwtMiddleware;
    }

    public function register(RouteCollectorProxy $group): void {
        $group->post('', function (Request $request, Response $response) {
            return User::Add($request, $response);
        })
        ->add($this->authMiddleware)
        ->add($this->jwtMiddleware);

        $group->get('/{id}', function (Request $request, Response $response) {
            return User::GetItem($request, $response);
        })
        ->add($this->authMiddleware)
        ->add($this->jwtMiddleware);

        $group->patch('/{id}', function (Request $request, Response $response) {
            return User::Update($request, $response);
        })
        ->add($this->authMiddleware)
        ->add($this->jwtMiddleware);
        
        $group->patch('/profile/{id}', function (Request $request, Response $response) {
            return User::UpdateProfileData($request, $response);
        })
        ->add($this->authMiddleware)
        ->add($this->jwtMiddleware);
        
        $group->patch('/profile/psw/{id}', function (Request $request, Response $response) {
            return User::UpdateProfilePsw($request, $response);
        })
        ->add($this->authMiddleware)
        ->add($this->jwtMiddleware);

        $group->delete('/{id}', function (Request $request, Response $response) {
            return User::Delete($request, $response);
        })
        ->add($this->authMiddleware)
        ->add($this->jwtMiddleware);
    }
}


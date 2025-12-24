<?php

namespace App\Framework\Routes;

use App\Framework\Middlewares\AuthMiddleware;
use App\Framework\Middlewares\JWTMiddleware;
use App\Framework\Models\Property;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Routing\RouteCollectorProxy;

class PropertyRoutes {
    private AuthMiddleware $authMiddleware;
    private JWTMiddleware $jwtMiddleware;

    public function __construct(AuthMiddleware $authMiddleware, JWTMiddleware $jwtMiddleware) {
        $this->authMiddleware = $authMiddleware;
        $this->jwtMiddleware = $jwtMiddleware;
    }

    public function register(RouteCollectorProxy $group): void {
        $group->post('', function (Request $request, Response $response) {
            return Property::Add($request, $response);
        })
        ->add($this->authMiddleware)
        ->add($this->jwtMiddleware);

        $group->get('/{id}', function (Request $request, Response $response) {
            return Property::GetProperty($request, $response);
        })
        ->add($this->authMiddleware)
        ->add($this->jwtMiddleware);

        $group->patch('/{id}', function (Request $request, Response $response) {
            return Property::Update($request, $response);
        })
        ->add($this->authMiddleware)
        ->add($this->jwtMiddleware);

        $group->delete('/{id}', function (Request $request, Response $response) {
            return Property::Delete($request, $response);
        })
        ->add($this->authMiddleware)
        ->add($this->jwtMiddleware);
        
        $group->get('/{id}/quotes', function (Request $request, Response $response) {
            return Property::GetAssociatedQuotes($request, $response);
        })
        ->add($this->authMiddleware)
        ->add($this->jwtMiddleware);
        
        $group->get('/get-document/{id}', function (Request $request, Response $response) {
            return Property::GetPropertyDocuments($request, $response);
        })
        ->add($this->authMiddleware)
        ->add($this->jwtMiddleware);
        
        $group->post('/upload-document', function (Request $request, Response $response) {
            return Property::UploadPropertyDocument($request, $response);
        })
        ->add($this->authMiddleware)
        ->add($this->jwtMiddleware);
        
        $group->delete('/delete-document/{id}/{name}', function (Request $request, Response $response) {
            return Property::DeletePropertyDocument($request, $response);
        })
        ->add($this->authMiddleware)
        ->add($this->jwtMiddleware);
        
        $group->get('/download-document/{id}/{name}', function (Request $request, Response $response) {
            return Property::DownloadPropertyDocument($request, $response);
        })
        ->add($this->authMiddleware)
        ->add($this->jwtMiddleware);
    }
}


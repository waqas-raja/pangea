<?php

namespace App\Framework\Routes;

use App\Framework\Middlewares\AuthMiddleware;
use App\Framework\Middlewares\JWTMiddleware;
use App\Framework\Models\Opportunity;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Routing\RouteCollectorProxy;

class OpportunityRoutes {
    private AuthMiddleware $authMiddleware;
    private JWTMiddleware $jwtMiddleware;

    public function __construct(AuthMiddleware $authMiddleware, JWTMiddleware $jwtMiddleware) {
        $this->authMiddleware = $authMiddleware;
        $this->jwtMiddleware = $jwtMiddleware;
    }

    public function register(RouteCollectorProxy $group): void {
        $group->post('', function (Request $request, Response $response) {
            return Opportunity::Add($request, $response);
        })
        ->add($this->authMiddleware)
        ->add($this->jwtMiddleware);

        $group->get('/{id}', function (Request $request, Response $response) {
            return Opportunity::GetOpportunity($request, $response);
        })
        ->add($this->authMiddleware)
        ->add($this->jwtMiddleware);

        $group->patch('/{id}', function (Request $request, Response $response) {
            return Opportunity::Update($request, $response);
        })
        ->add($this->authMiddleware)
        ->add($this->jwtMiddleware);
        
        $group->patch('/{id}/mark-delete', function (Request $request, Response $response) {
            return Opportunity::MarkOpportunityDelete($request, $response);
        })
        ->add($this->authMiddleware)
        ->add($this->jwtMiddleware);

        $group->delete('/{id}', function (Request $request, Response $response) {
            return Opportunity::Delete($request, $response);
        })
        ->add($this->authMiddleware)
        ->add($this->jwtMiddleware);
        
        $group->patch('/{id}/note', function (Request $request, Response $response) {
            return Opportunity::UpdateNote($request, $response);
        })
        ->add($this->authMiddleware)
        ->add($this->jwtMiddleware);

        $group->post('/upload-valuation-document', function (Request $request, Response $response) {
            return Opportunity::UploadPropertyValuationDocument($request, $response);
        })
        ->add($this->authMiddleware)
        ->add($this->jwtMiddleware);
        
        $group->get('/get-valuation-document/{id}', function (Request $request, Response $response) {
            return Opportunity::GetPropertyValuationDocument($request, $response);
        })
        ->add($this->authMiddleware)
        ->add($this->jwtMiddleware);
        
        $group->get('/download-valuation-document/{id}/{name}', function (Request $request, Response $response) {
            return Opportunity::DownloadPropertyValuationDocument($request, $response);
        })
        ->add($this->authMiddleware)
        ->add($this->jwtMiddleware);
        
        $group->delete('/delete-valuation-document/{id}/{name}', function (Request $request, Response $response) {
            return Opportunity::DeletePropertyValuationDocument($request, $response);
        })
        ->add($this->authMiddleware)
        ->add($this->jwtMiddleware);
    }
}


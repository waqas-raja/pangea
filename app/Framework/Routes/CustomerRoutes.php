<?php

namespace App\Framework\Routes;

use App\Framework\Middlewares\AuthMiddleware;
use App\Framework\Middlewares\JWTMiddleware;
use App\Framework\Models\Customer;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Routing\RouteCollectorProxy;

class CustomerRoutes {
    private AuthMiddleware $authMiddleware;
    private JWTMiddleware $jwtMiddleware;

    public function __construct(AuthMiddleware $authMiddleware, JWTMiddleware $jwtMiddleware) {
        $this->authMiddleware = $authMiddleware;
        $this->jwtMiddleware = $jwtMiddleware;
    }

    public function register(RouteCollectorProxy $group): void {
        $group->post('', function (Request $request, Response $response) {
            return Customer::Add($request, $response);
        })
        ->add($this->authMiddleware)
        ->add($this->jwtMiddleware);

        $group->get('/{id}', function (Request $request, Response $response) {
            return Customer::GetCustomer($request, $response);
        })
        ->add($this->authMiddleware)
        ->add($this->jwtMiddleware);

        $group->patch('/{id}', function (Request $request, Response $response) {
            return Customer::Update($request, $response);
        })
        ->add($this->authMiddleware)
        ->add($this->jwtMiddleware);

        $group->delete('/{id}', function (Request $request, Response $response) {
            return Customer::Delete($request, $response);
        })
        ->add($this->authMiddleware)
        ->add($this->jwtMiddleware);
        
        $group->get('/properties/{id}', function (Request $request, Response $response) {
            return Customer::GetAssociatedProperties($request, $response);
        })
        ->add($this->authMiddleware)
        ->add($this->jwtMiddleware);
        
        $group->get('/quotes/{id}', function (Request $request, Response $response) {
            return Customer::GetAssociatedQuotes($request, $response);
        })
        ->add($this->authMiddleware)
        ->add($this->jwtMiddleware);
        
        // CRM CALLS MANAGEMENT SECTION...
        $group->get('/{id}/crm/calls', function (Request $request, Response $response) {
            return Customer::GetAllCallsByCustomer($request, $response);
        })
        ->add($this->authMiddleware)
        ->add($this->jwtMiddleware);
        
        $group->get('/crm/call/{id}', function (Request $request, Response $response) {
            return Customer::GetCallById($request, $response);
        })
        ->add($this->authMiddleware)
        ->add($this->jwtMiddleware);
        
        $group->post('/crm/call', function (Request $request, Response $response) {
            return Customer::AddCustomerCall($request, $response);
        })
        ->add($this->authMiddleware)
        ->add($this->jwtMiddleware);

        $group->patch('/crm/call/{id}', function (Request $request, Response $response) {
            return Customer::UpdateCustomerCall($request, $response);
        })
        ->add($this->authMiddleware)
        ->add($this->jwtMiddleware);

        $group->delete('/crm/call/{id}', function (Request $request, Response $response) {
            return Customer::DeleteCallById($request, $response);
        })
        ->add($this->authMiddleware)
        ->add($this->jwtMiddleware);
        
        // CRM APPOINTMENT MANAGEMENT SECTION...
        $group->get('/{id}/crm/appointments', function (Request $request, Response $response) {
            return Customer::GetAllAppointmentByCustomer($request, $response);
        })
        ->add($this->authMiddleware)
        ->add($this->jwtMiddleware);
        
        $group->get('/crm/appointment/{id}', function (Request $request, Response $response) {
            return Customer::GetAppointmentById($request, $response);
        })
        ->add($this->authMiddleware)
        ->add($this->jwtMiddleware);
        
        $group->post('/crm/appointment', function (Request $request, Response $response) {
            return Customer::AddCustomerAppointment($request, $response);
        })
        ->add($this->authMiddleware)
        ->add($this->jwtMiddleware);

        $group->patch('/crm/appointment/{id}', function (Request $request, Response $response) {
            return Customer::UpdateCustomerAppointment($request, $response);
        })
        ->add($this->authMiddleware)
        ->add($this->jwtMiddleware);
        
        $group->delete('/crm/appointment/{id}', function (Request $request, Response $response) {
            return Customer::DeleteAppointmentById($request, $response);
        })
        ->add($this->authMiddleware)
        ->add($this->jwtMiddleware);

        // CRM EMAILS MANAGEMENT SECTION...
        $group->get('/{id}/crm/emails', function (Request $request, Response $response) {
            return Customer::GetAllEmailsByCustomer($request, $response);
        })
        ->add($this->authMiddleware)
        ->add($this->jwtMiddleware);

        $group->get('/crm/email/{id}', function (Request $request, Response $response) {
            return Customer::GetEmailById($request, $response);
        })
        ->add($this->authMiddleware)
        ->add($this->jwtMiddleware);

        $group->post('/crm/email', function (Request $request, Response $response) {
            return Customer::AddCustomerEmail($request, $response);
        })
        ->add($this->authMiddleware)
        ->add($this->jwtMiddleware);

        $group->patch('/crm/email/{id}', function (Request $request, Response $response) {
            return Customer::UpdateCustomerEmail($request, $response);
        })
        ->add($this->authMiddleware)
        ->add($this->jwtMiddleware);

        $group->delete('/crm/email/{id}', function (Request $request, Response $response) {
            return Customer::DeleteEmailById($request, $response);
        })
        ->add($this->authMiddleware)
        ->add($this->jwtMiddleware);
    }
}


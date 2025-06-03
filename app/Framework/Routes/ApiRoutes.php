<?php

namespace App\Framework\Routes;

use App\Framework\Middlewares\AuthMiddleware;
use App\Framework\Models\User;
use App\Framework\Models\Customer;
use App\Framework\Models\Property;
use App\Framework\Models\Opportunity;
use Slim\App;
use Slim\Exception\HttpNotImplementedException;
use Slim\Routing\RouteCollectorProxy;

class ApiRoutes {
    private AuthMiddleware $authMiddleware;

    public function __construct(AuthMiddleware $authMiddleware) {
        $this->authMiddleware = $authMiddleware;
    }

    public function register(App $app): void
    {
        $app->group('/api', function (RouteCollectorProxy $group) {
            $group->post('/sign-in', function ($request, $response) {
                return User::SignIn($request, $response);
            });

            $group->post('/auth-renew', function ($request, $response) {
                return User::AuthRenew($request, $response);
            });

            $group->post('/auth-validate', function ($request, $response) {
                return User::AuthValidate($request, $response);
            });

            $group->get('/dashboard', function ($request, $response) {
                return User::Dashboard($request, $response);
            })->add($this->authMiddleware);

            $group->post('/reset-psw', function ($request, $response) {
                return User::ResetPassword($request, $response);
            })->add($this->authMiddleware);

            // Entity's list routes

            $group->get('/users', function ($request, $response) {
                return User::GetAll($request, $response);
            })->add($this->authMiddleware);
            
            $group->get('/customers', function ($request, $response) {
                return Customer::GetAll($request, $response);
            })->add($this->authMiddleware);
            
            $group->get('/properties', function ($request, $response) {
                return Property::GetAll($request, $response);
            })->add($this->authMiddleware);
            
            $group->get('/property-types', function ($request, $response) {
                return Property::GetPropertyTypes($request, $response);
            })->add($this->authMiddleware);
            
            $group->get('/opportunities', function ($request, $response) {
                return Opportunity::GetAll($request, $response);
            })->add($this->authMiddleware);
            
            $group->get('/sources', function ($request, $response) {
                return Opportunity::GetSources($request, $response);
            })->add($this->authMiddleware);
            
            $group->get('/nations', function ($request, $response) {
                return Opportunity::GetNations($request, $response);
            })->add($this->authMiddleware);

            $group->get('/opportunity-status', function ($request, $response) {
                return Opportunity::GetOpportunityStatus($request, $response);
            })->add($this->authMiddleware);

            // Entity's routes

            $userRoutes = new UserRoutes($this->authMiddleware);
            $group->group('/user', function (RouteCollectorProxy $userGroup) use ($userRoutes) {
                $userRoutes->register($userGroup);
            });
            
            $customerRoutes = new CustomerRoutes($this->authMiddleware);
            $group->group('/customer', function (RouteCollectorProxy $customerGroup) use ($customerRoutes) {
                $customerRoutes->register($customerGroup);
            });
            
            $opportunityRoutes = new OpportunityRoutes($this->authMiddleware);
            $group->group('/opportunity', function (RouteCollectorProxy $opportunityGroup) use ($opportunityRoutes) {
                $opportunityRoutes->register($opportunityGroup);
            });

        });
    }
}

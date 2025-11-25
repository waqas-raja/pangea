<?php

namespace App\Framework\Routes;

use App\Framework\Middlewares\AuthMiddleware;
use App\Framework\Middlewares\JWTMiddleware;
use App\Framework\Models\User;
use App\Framework\Models\Customer;
use App\Framework\Models\Property;
use App\Framework\Models\Estimate;
use App\Framework\Models\Opportunity;
use Slim\App;
use Slim\Exception\HttpNotImplementedException;
use Slim\Routing\RouteCollectorProxy;

class ApiRoutes {
    private AuthMiddleware $authMiddleware;
    private JWTMiddleware $jwtMiddleware;

    public function __construct(AuthMiddleware $authMiddleware, JWTMiddleware $jwtMiddleware) {
        $this->authMiddleware = $authMiddleware;
        $this->jwtMiddleware = $jwtMiddleware;
    }

    public function register(App $app): void {
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
            })
            ->add($this->authMiddleware)
            ->add($this->jwtMiddleware);

            $group->post('/reset-psw', function ($request, $response) {
                return User::ResetPassword($request, $response);
            })
            ->add($this->authMiddleware)
            ->add($this->jwtMiddleware);

            // Entity's list routes

            $group->get('/users', function ($request, $response) {
                return User::GetAll($request, $response);
            })
            ->add($this->authMiddleware)
            ->add($this->jwtMiddleware);
            
            $group->get('/customers', function ($request, $response) {
                return Customer::GetAll($request, $response);
            })
            ->add($this->authMiddleware)
            ->add($this->jwtMiddleware);
            
            $group->get('/properties', function ($request, $response) {
                return Property::GetAll($request, $response);
            })
            ->add($this->authMiddleware)
            ->add($this->jwtMiddleware);
            
            $group->get('/property-types', function ($request, $response) {
                return Property::GetPropertyTypes($request, $response);
            })
            ->add($this->authMiddleware)
            ->add($this->jwtMiddleware);
            
            $group->get('/opportunities', function ($request, $response) {
                return Opportunity::GetAll($request, $response);
            })
            ->add($this->authMiddleware)
            ->add($this->jwtMiddleware);
            
            $group->get('/sources', function ($request, $response) {
                return Opportunity::GetSources($request, $response);
            })
            ->add($this->authMiddleware)
            ->add($this->jwtMiddleware);
            
            $group->get('/nations', function ($request, $response) {
                return Opportunity::GetNations($request, $response);
            })
            ->add($this->authMiddleware)
            ->add($this->jwtMiddleware);

            $group->get('/opportunity-status', function ($request, $response) {
                return Opportunity::GetOpportunityStatus($request, $response);
            })
            ->add($this->authMiddleware)
            ->add($this->jwtMiddleware);
            
            $group->get('/property-status', function ($request, $response) {
                return Property::GetPropertyStatus($request, $response);
            })
            ->add($this->authMiddleware)
            ->add($this->jwtMiddleware);

            // Entity's routes

            $userRoutes = new UserRoutes($this->authMiddleware, $this->jwtMiddleware);
            $group->group('/user', function (RouteCollectorProxy $userGroup) use ($userRoutes) {
                $userRoutes->register($userGroup);
            });
            
            $customerRoutes = new CustomerRoutes($this->authMiddleware, $this->jwtMiddleware);
            $group->group('/customer', function (RouteCollectorProxy $customerGroup) use ($customerRoutes) {
                $customerRoutes->register($customerGroup);
            });
            
            $propertyRoutes = new PropertyRoutes($this->authMiddleware, $this->jwtMiddleware);
            $group->group('/property', function (RouteCollectorProxy $propertyGroup) use ($propertyRoutes) {
                $propertyRoutes->register($propertyGroup);
            });
            
            $estimateRoutes = new EstimateRoutes($this->authMiddleware, $this->jwtMiddleware);
            $group->group('/estimate', function (RouteCollectorProxy $estimateGroup) use ($estimateRoutes) {
                $estimateRoutes->register($estimateGroup);
            });
            
            $opportunityRoutes = new OpportunityRoutes($this->authMiddleware, $this->jwtMiddleware);
            $group->group('/opportunity', function (RouteCollectorProxy $opportunityGroup) use ($opportunityRoutes) {
                $opportunityRoutes->register($opportunityGroup);
            });

        });
    }
}

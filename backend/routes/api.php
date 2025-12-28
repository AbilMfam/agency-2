<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\PortfolioController;
use App\Http\Controllers\Api\IndustryController;
use App\Http\Controllers\Api\BlogController;
use App\Http\Controllers\Api\ClientController;
use App\Http\Controllers\Api\PackageController;
use App\Http\Controllers\Api\ContactRequestController;
use App\Http\Controllers\Api\TestimonialController;
use App\Http\Controllers\Api\FileController;
use App\Http\Controllers\Api\SiteSettingController;
use App\Http\Controllers\Api\ReelController;
use App\Http\Controllers\Api\HomeCardController;
use App\Http\Controllers\Api\WebProjectController;
use App\Http\Controllers\Api\TeamMemberController;

// Public Routes
Route::prefix('v1')->group(function () {
    // Auth
    Route::post('/login', [AuthController::class, 'login'])->name('login');
    Route::post('/register', [AuthController::class, 'register'])->name('register');

    // Public API endpoints
    Route::get('/services', [ServiceController::class, 'index']);
    Route::get('/services/{service:slug}', [ServiceController::class, 'show']);

    Route::get('/portfolios', [PortfolioController::class, 'index']);
    Route::get('/portfolios/{portfolio:slug}', [PortfolioController::class, 'show']);

    Route::get('/industries', [IndustryController::class, 'index']);
    Route::get('/industries/{industry:slug}', [IndustryController::class, 'show']);

    Route::get('/blog', [BlogController::class, 'index']);
    Route::get('/blog/{slug}', [BlogController::class, 'show']);
    Route::get('/blog/categories', [BlogController::class, 'categories']);

    Route::get('/clients', [ClientController::class, 'index']);

    Route::get('/packages', [PackageController::class, 'index']);

    Route::get('/testimonials', [TestimonialController::class, 'index']);

    // Contact form
    Route::post('/contact', [ContactRequestController::class, 'store']);

    // Site Settings (Public)
    Route::get('/settings', [SiteSettingController::class, 'index']);
    Route::get('/settings/{key}', [SiteSettingController::class, 'show']);

    // Reels (Public)
    Route::get('/reels', [ReelController::class, 'index']);

    // Home Cards (Public)
    Route::get('/home-cards', [HomeCardController::class, 'index']);

    // Web Projects (Public)
    Route::get('/web-projects', [WebProjectController::class, 'index']);
    Route::get('/web-projects/types', [WebProjectController::class, 'types']);
    Route::get('/web-projects/{slug}', [WebProjectController::class, 'show']);

    // Team Members (Public)
    Route::get('/team', [TeamMemberController::class, 'index']);
});

// Protected Admin Routes
Route::prefix('v1/admin')->middleware(['auth:sanctum'])->group(function () {
    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index']);
    Route::get('/dashboard/stats', [DashboardController::class, 'stats']);

    // Services CRUD
    Route::apiResource('services', ServiceController::class)->except(['index', 'show']);

    // Portfolios CRUD
    Route::apiResource('portfolios', PortfolioController::class)->except(['index', 'show']);

    // Industries CRUD
    Route::apiResource('industries', IndustryController::class)->except(['index', 'show']);

    // Blog CRUD
    Route::get('/blog', [BlogController::class, 'adminIndex']);
    Route::post('/blog', [BlogController::class, 'store']);
    Route::put('/blog/{blogPost}', [BlogController::class, 'update']);
    Route::delete('/blog/{blogPost}', [BlogController::class, 'destroy']);

    // Clients CRUD
    Route::apiResource('clients', ClientController::class)->except(['index']);

    // Packages CRUD
    Route::apiResource('packages', PackageController::class)->except(['index']);

    // Contact Requests
    Route::get('/contacts', [ContactRequestController::class, 'index']);
    Route::get('/contacts/{contactRequest}', [ContactRequestController::class, 'show']);
    Route::patch('/contacts/{contactRequest}', [ContactRequestController::class, 'update']);
    Route::delete('/contacts/{contactRequest}', [ContactRequestController::class, 'destroy']);
    Route::post('/contacts/{contactRequest}/read', [ContactRequestController::class, 'markAsRead']);

    // Testimonials CRUD
    Route::apiResource('testimonials', TestimonialController::class)->except(['index']);

    // File Management
    Route::post('/files/upload', [FileController::class, 'upload']);
    Route::post('/files/upload-video', [FileController::class, 'uploadVideo']);
    Route::get('/files', [FileController::class, 'list']);
    Route::delete('/files', [FileController::class, 'delete']);

    // Site Settings CRUD
    Route::post('/settings', [SiteSettingController::class, 'store']);
    Route::put('/settings/{key}', [SiteSettingController::class, 'update']);
    Route::post('/settings/bulk', [SiteSettingController::class, 'bulkUpdate']);
    Route::delete('/settings/{key}', [SiteSettingController::class, 'destroy']);

    // Reels CRUD
    Route::apiResource('reels', ReelController::class)->except(['index']);

    // Home Cards CRUD
    Route::apiResource('home-cards', HomeCardController::class)->except(['index']);

    // Web Projects CRUD
    Route::apiResource('web-projects', WebProjectController::class)->except(['index', 'show']);

    // Team Members CRUD
    Route::get('/team', [TeamMemberController::class, 'adminIndex']);
    Route::apiResource('team-members', TeamMemberController::class)->except(['index']);
});

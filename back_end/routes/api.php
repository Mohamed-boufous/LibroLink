<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\CostumeVerifyEmail;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\UserController;
use Illuminate\Auth\Events\Login;
use App\Http\Middleware\LoggedIn;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/get_current_user', [UserController::class, 'get_current_user']);
    Route::post('/logout', [LoginController::class, 'logout']);
});
Route::post('/get_current_user', [UserController::class, 'get_current_user'])->middleware(['auth:sanctum']);
Route::middleware(['guest'])->group(function () {
    Route::post('/register', [RegisteredUserController::class, 'store']);
    Route::post('/login', [LoginController::class, 'login']);
});


Route::get('list', function () {
    return \App\Models\User::all();
});
Route::get('/email-verification', [CostumeVerifyEmail::class, 'verifyEmail'])->name('verification.verify');

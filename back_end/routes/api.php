<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\CostumeVerifyEmail;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\UserController;
use Illuminate\Auth\Events\Login;
use App\Http\Middleware\LoggedIn;
use App\Http\Controllers\BookController;

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


Route::get('list_users', [UserController::class, 'list']);
Route::delete('/delete_users', [UserController::class, 'delete']);

Route::get('/get_users_number', [UserController::class, 'list_users_number']);
Route::get('/get_books_number', [BookController::class, 'list_books_number']);

Route::get('/email-verification', [CostumeVerifyEmail::class, 'verifyEmail'])->name('verification.verify');
Route::get('/get_all_books', [BookController::class, 'index']);
Route::post('/upload_book', [BookController::class, 'store']);
Route::delete('/delete_books', [BookController::class, 'delete']);
Route::post('/update_books/{id}', [BookController::class, 'update']);
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
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\PenaltyUsersController;

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

Route::get('/email-verification', [CostumeVerifyEmail::class, 'verifyEmail'])->name('verification.verify');

Route::get('list_users', [UserController::class, 'list']);
Route::get('/get_users_number', [UserController::class, 'list_users_number']);
Route::delete('/delete_users', [UserController::class, 'delete']);


Route::get('/get_books_number', [BookController::class, 'list_books_number']);
Route::get('/get_book/{id}', [BookController::class, 'get_book']);
Route::get('/get_all_books', [BookController::class, 'index']);
Route::post('/upload_book', [BookController::class, 'store']);
Route::delete('/delete_books', [BookController::class, 'delete']);
Route::post('/update_books/{id}', [BookController::class, 'update']);

Route::post('/subscribe/{user_id}',[SubscriptionController::class, 'createSubscription']);
Route::get('/list_subscriptions', [SubscriptionController::class, 'index']);
Route::get('/get_subscriptions_number', [SubscriptionController::class, 'get_subs_number']);
Route::get('/get_revenue', [SubscriptionController::class, 'get_revenue']);

Route::post('/add_comment', [CommentController::class, 'store']);
Route::get('/list_comments', [CommentController::class, 'index']);
Route::post('/update_comment/{id}/{like}/{dislike}', [CommentController::class, 'update_like_delike']);
Route::get('/get_comments_number/{book_id}', [CommentController::class, 'get_number']);

Route::get('/get_all_reports', [ReportController::class, 'index']);
Route::get('/get_reports_number', [ReportController::class, 'get_number']);
Route::post('/make_report', [ReportController::class, 'store']);
Route::post('/update_report/{id}', [ReportController::class, 'update']);
Route::delete('/delete_reports', [ReportController::class, 'delete']);

Route::get('/get_all_penalties', [PenaltyUsersController::class, 'index']);
Route::post('/make_penalty', [PenaltyUsersController::class, 'store']);
Route::delete('/delete_penalties', [PenaltyUsersController::class, 'delete']);
<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\CostumeVerifyEmail;

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

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('/register', [RegisteredUserController::class, 'store']);
Route::get('list', function () {
    return \App\Models\User::all();
});
Route::get('/email-verification', [CostumeVerifyEmail::class, 'verifyEmail'])->name('verification.verify');
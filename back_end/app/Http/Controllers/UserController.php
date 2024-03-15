<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    function get_current_user(){
        try{
            if(Auth::check()){
                return Auth::user();
            }
        }catch (\Throwable $th){
            return response()->json([
                'message' => 'error',
            ], 404);
        }
    }
}

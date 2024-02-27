<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        if (!Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'Invalid credentials.',
                'data' => $credentials,

            ], 401);
        }
        try {
            /** @var User $user */
            $user = Auth::user();
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'message' => 'Successfully logged in.',
                'user' => $user,
                'token' => $token,
                'data' => Auth::user(),
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'error',
            ], 401);
        }
    }

    public function logout(Request $request)
    {
        
        if (Auth::check()) {
            /** @var User $user */
            $user = Auth::user();
            $user->tokens()->delete();
            return response()->json([
                'message' => 'Successfully logged out.',
            ]);
        } else {
            // User was not authenticated, handle the scenario if needed
            return response()->json([
                'message' => 'Not logged in.',
            ]);
        }
    }
}

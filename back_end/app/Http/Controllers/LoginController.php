<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use App\Models\Admin;
use App\Models\PenaltyUsers;
use Carbon\Carbon;

class LoginController extends Controller
{
    public function login(LoginRequest $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => ['required', 'string', 'email'],
            'password' => ['required', 'string'],
        ]);


        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'error' => $validator->messages(),
            ], 422);
        }
        //$credentials = $request->validated();
        $user = Admin::where('email', $request->email)->first();
        if (!$user) {
            $user = User::where('email', $request->email)->first();
        }

        if ($user && Auth::guard($user instanceof Admin ? 'admin' : 'web')->attempt(['email' => $request->email, 'password' => $request->password])) {
            $token = $user->createToken('auth_token')->plainTextToken;
            $penalty = PenaltyUsers::where('userId', $user->id)->first();
            if ($penalty) {
                if ($penalty->date_exp && $penalty->date_exp < Carbon::now()) {
                    $penalty->delete();
                } else {
                    $user->state = $penalty;
                    return response()->json([
                        'token' => $token,
                        'user' => $user,
                        'token_type' => 'bearer',
                        'type' => $user instanceof Admin ? 'admin' : 'user',
                    ]);
                }
            }

            $user->state = "normal";
            return response()->json([
                'token' => $token,
                'user' => $user,
                'token_type' => 'bearer',
                'type' => $user instanceof Admin ? 'admin' : 'user',
            ]);
        }

        return response()->json(['error' => 'Invalid login credentials.'], 401);
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

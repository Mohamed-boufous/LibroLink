<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'userName' => ['required', 'string', 'max:255','unique:'.User::class],
                'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:'.User::class],
                'password' => ['required', 'confirmed', Rules\Password::defaults()],
                'displayName' => ['required', 'string', 'max:45'],
                'date_birth' => ['required', 'date'],
            ]);
    
            $user = User::create([
                'userName' => $request->userName,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'displayName' => $request->displayName,
                'date_birth' => $request->date_birth,
            ]);
            $token = $user->createToken('API token of' . $user->userName);
            event(new Registered($user));
            Auth::login($user);
    
            return response()->json([
                'success' => true,
                'user' => $user,
                'token' => $token->plainTextToken,
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'error' => $th->getMessage(),
            ]);
        }
        
      
    }
}

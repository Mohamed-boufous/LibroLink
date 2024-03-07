<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\UnverifiedUser;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use App\Http\Controllers\Auth\VerifyEmail;
use Illuminate\Support\Facades\Validator;

class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'userName' => ['required', 'string', 'max:255', 'unique:' . User::class],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:' . User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'displayName' => ['required', 'string', 'max:45'],
            'date_birth' => ['required', 'date'],
        ]);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'error' => $validator->messages(),
            ], 422);
        }

        $tmp_user = UnverifiedUser::create([
            'userName' => $request->userName,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'displayName' => $request->displayName,
            'date_birth' => $request->date_birth,
        ]);
        $tmp_user->sendEmailVerificationNotification();
        return response()->json([
            'success' => true,
            'user' => $tmp_user,
        ]);
    }
}

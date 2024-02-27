<?php

namespace App\Http\Controllers;

use Illuminate\Auth\Events\Verified;
use App\Models\UnverifiedUser;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class CostumeVerifyEmail extends Controller
{
    public function verifyEmail(Request $request)
    {
        $tmp_user = UnverifiedUser::findOrFail($request->id);
        if (!hash_equals((string) $request->hash, sha1($tmp_user->getEmailForVerification()))) {
            return response()->json([
                "message" => "Unauthorized",
                "success" => false
            ]);
        }
        if ($tmp_user->hasVerifiedEmail()) {
            return response()->json([
                "message" => "User already verified!",
                "success" => false
            ]);
        }
        $user = User::create([
            'userName' => $tmp_user->userName,
            'email' => $tmp_user->email,
            'password' => $tmp_user->password,
            'displayName' => $tmp_user->displayName,
            'date_birth' => $tmp_user->date_birth,
        ]);
        $token = $user->createToken('auth_token for '.$user->userName)->plainTextToken;
        if ($user->markEmailAsVerified()) {
            $tmp_user->delete();
            event(new Verified($user));
        }
        

        return response()->json([
            "message" => "Email verified successfully!",
            "success" => true,
            "data" => $user,
            "token" => $token
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class UserController extends Controller
{
    function list(Request $request){
        $users = User::all();

        foreach ($users as $user) {
            $birthDate = Carbon::parse($user->date_birth);
            $user->age =  $birthDate->diffInYears(Carbon::today());
        }

        return response()->json($users);
    }

    function list_users_number(Request $request)
    {
        $state = $request->query('state');

        $totalUsers = User::count();
        if ($state === "total") {

            return response()->json([
                'total_users' => $totalUsers,
            ]);
        }

        $subscribedUsers = User::where('is_subscribed', 1)->count();
        if ($state === "sub") {
            return response()->json([
                'subscribed_users' => $subscribedUsers,
            ]);
        }

        $nonSubscribedUsers = $totalUsers - $subscribedUsers;
        if ($state === "non_sub") {
            return response()->json([
                'non_subscribed_users' => $nonSubscribedUsers,
            ]);
        }

        $male = User::where('gender', 'M')->count();
        if ($state === "male") {
            return response()->json([
                'male_users' => $male,
            ]);
        }

        $female = User::where('gender', 'F')->count();
        if ($state === "female") {
            return response()->json([
                'female_users' => $female,
            ]);
        }

        /*  $underAge =  User::whereBetween('age', [0, 18])->count();
            $teenToAdult =  User::whereBetween('age', [18, 25])->count();
            $adult =  User::whereBetween('age', [26, 35])->count();
            $middelAge =  User::whereBetween('age', [36, 45])->count(); */

        $usersAge = User::select(DB::raw('YEAR(CURDATE()) - YEAR(date_birth) AS age'))->get();
        $underAge =  0;
        $teenToAdult =  0;
        $adult =  0;
        $middelAge =  0;
        $old = 0;
        foreach ($usersAge as $userAge) {

            if ($userAge->age < 18) {
                $underAge++;
            }
            else if ($userAge->age >= 18 && $userAge->age <= 25) {
                $teenToAdult++;
            }
            else if ($userAge->age >= 26 && $userAge->age <= 35) {
                $adult++;
            }
            else if ($userAge->age >= 36 && $userAge->age <= 45) {
                $middelAge++;
            }
            else if ($userAge->age > 45) {
                $old++;
            }
        }
        if ($state === "age") {
            return response()->json([
                '0-18' => $underAge,
                '18-25' => $teenToAdult,
                '26-35' => $adult,
                '36-45' => $middelAge,
                '45-99' => $old,
            ]);
        }
        return response()->json([
            'total_users' => $totalUsers,
            'subscribed_users' => $subscribedUsers,
            'non_subscribed_users' => $nonSubscribedUsers,
            'male_users' => $male,
            'female_users' => $female,
            '0-18' => $underAge,
            '18-25' => $teenToAdult,
            '26-35' => $adult,
            '36-45' => $middelAge,
            '45-99' => $old,

        ]);
    }
    function get_current_user()
    {
        try {
            if (Auth::check()) {
                return Auth::user();
            }
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'error',
            ], 404);
        }
    }
}

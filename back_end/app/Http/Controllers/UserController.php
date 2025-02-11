<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Models\PenaltyUsers;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    function list(Request $request)
    {
        $users = User::all();

        foreach ($users as $user) {
            $birthDate = Carbon::parse($user->date_birth);
            $user->age =  $birthDate->diffInYears(Carbon::today());
            $penalty = PenaltyUsers::where('userId', $user->id)->first();
            $user->state = $penalty ? $penalty->penalty : "normal";
            $user->image =   $user->image ? asset($user->image) : null;
        }

        return response()->json($users);
    }

    function updateInfo(Request $request)
    {
        /** @var User $user */

        $user = Auth::user();


        $validator = Validator::make($request->all(), [
            'userName' => 'nullable|string|max:255|unique:utilisateur,userName,' . $user->id,
            'displayName' => 'nullable|string|max:45',
            'bio' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Update only non-null fields
        $updateData = [];
        if ($request->has('userName')) {
            $updateData['userName'] = $request->userName;
        }
        if ($request->has('displayName')) {
            $updateData['displayName'] = $request->displayName;
        }
        if ($request->has('bio')) {
            $updateData['bio'] = $request->bio;
        }
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = uniqid() . '.' . $image->getClientOriginalExtension();
            $image->move('images/profiles', $imageName);
            $updateData['image'] = 'images/profiles/' . $imageName;
        }
        /** @var User $user */
        $user->update($updateData);

        return response()->json([
            'message' => 'User information updated successfully!',
            'user' => $user->fresh(), // Refresh user data after update
        ]);
    }
    public function updateEmail(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'current_password' => 'required|string',
            'email' => 'required|string|email|unique:users,email,' . Auth::id(),
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        /** @var User $user */
        $user = Auth::user();

        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json(['message' => 'Invalid current password'], 401);
        }

        $user->update(['email' => $request->email]);

        return response()->json([
            'message' => 'Email updated successfully!',
            'user' => $user->fresh(), // Refresh user data after update
        ]);
    }

    public function updatePassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'current_password' => 'required|string',
            'new_password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        /** @var User $user */
        $user = Auth::user();

        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json(['message' => 'Invalid current password'], 401);
        }

        $user->update(['password' => Hash::make($request->new_password)]);

        return response()->json([
            'message' => 'Password updated successfully!',
        ]);
    }

    public function deleteAccount(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'password' => 'required|string', // Ensure current password is correct
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        /** @var User $user */
        $user = Auth::user();
        if (!Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid current password'], 401);
        }
        $user->views_book()->detach();
        $user->rating_book()->detach();
        $user->subscriptions()->delete();
        $user->credit_card()->delete();
        $user->comment()->delete();
        $user->penalty()->delete();
        $user->subscriptions()->delete();
        $user->delete();

        return response()->json([
            'message' => 'Account deleted successfully!',
        ], 200);
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
            } else if ($userAge->age >= 18 && $userAge->age <= 25) {
                $teenToAdult++;
            } else if ($userAge->age >= 26 && $userAge->age <= 35) {
                $adult++;
            } else if ($userAge->age >= 36 && $userAge->age <= 45) {
                $middelAge++;
            } else if ($userAge->age > 45) {
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
                $user =  Auth::user();
                $penalty = PenaltyUsers::where('userId', $user->id)->first();
                if ($penalty) {
                    if ($penalty->date_exp && $penalty->date_exp < Carbon::now()) {
                        $penalty->delete();
                    } else {
                        $user->state = $penalty;
                        $user->image = $user->image ? asset($user->image) : null;
                        return $user;
                    }
                }
                $user->state = 'normal';
                $user->image = $user->image ? asset($user->image) : null;
                return $user;
            }
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'error',
            ], 404);
        }
    }

    public  function delete(Request $request)
    {
        $ids = $request->ids;
        foreach ($ids as $id) {
            $user = User::find($id);
            $user->views_book()->detach();
            $user->rating_book()->detach();
            $user->subscriptions()->delete();
            $user->credit_card()->delete();
            $user->penalty()->delete();
            $user->subscriptions()->delete();
            $user->delete();
        }
        return response()->json(['message' => 'user$user deleted successfully']);
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PenaltyUsers;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class PenaltyUsersController extends Controller
{

    public function index()
    {
        $penalty = PenaltyUsers::all();
        return $penalty;
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'userId' => ['required', 'integer', 'exists:utilisateur,id'],
            'adminId' => ['required', 'integer', 'exists:admin,id'],
            'reason' => ['required', 'string'],
            'duration' => ['required', 'string'],
            'penalty' => ['required', 'string'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'error' => $validator->messages(),
            ], 500);
        }

        $penalty = new PenaltyUsers();
        $penalty->userId = $request->userId;
        $penalty->adminId = $request->adminId;
        $penalty->reason = $request->reason;
        $penalty->date_penalty = Carbon::now();
        if ( $request->duration == "unlimited") {
            $penalty->date_exp = null;
        }else {
            $penalty->date_exp = Carbon::now()->addDays($request->duration);
        }
        $penalty->penalty = $request->penalty;

        $penalty->save();

        return response()->json(['message' => 'Penalty created successfully', 'penalty' => $penalty], 201);
    }

    public function delete($id) {
        $penalty = PenaltyUsers::find($id);
        if (!$penalty) {
            return response()->json(['message' => 'Penalty not found'], 404);
        }
        $penalty->delete();
        return response()->json(['message' => 'Penalty deleted successfully'], 200);
    }
}

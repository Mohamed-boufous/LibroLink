<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Rating;

class RatingController extends Controller
{
    public function list_number($book_id){
        $ratings = Rating::where('book_id', $book_id)->count();
        return response()->json($ratings);
    }
}

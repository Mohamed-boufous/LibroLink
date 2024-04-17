<?php

namespace App\Http\Controllers;

use App\Models\Biblio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\BiblioHasBook;

class BiblioController extends Controller
{
    public function list($userId)
    {
        // Retrieve the biblioName for the specified user
        $userBiblioNames = Biblio::where('utilisateur_id', $userId)
            ->whereNotIn('biblioName', ['likedBooks', 'lecture en cours', 'a lire', 'lu'])
            ->orderBy('id', 'desc')
            ->pluck('biblioName', 'id');

        // Get the ID of the last row in the table
        $lastRowId = Biblio::where('utilisateur_id', $userId)
            ->orderBy('id', 'desc')
            ->value('id');

        if (!$userBiblioNames) {
            return response()->json(['message' => 'No biblioName found for the user.'], 404);
        }

        return response()->json([
            'biblioNames' => $userBiblioNames,
            'lastRowId' => $lastRowId
        ], 200);
    }


    public function createBiblio(Request $request)
    {
        $request->validate([
            'biblio_name' => 'required|string|max:255', // Update field name
            'user_id' => 'required|integer', // Update field name
        ]);

        $biblio = new Biblio();
        $biblio->biblioName = $request->input('biblio_name');
        $biblio->utilisateur_id = $request->input('user_id');
        $biblio->date_creation = now();

        $biblio->save();

        return response()->json(['message' => 'Biblio created successfully', 'biblio' => $biblio], 201);
    }

    public function deleteBiblioForUser($userId, $biblioId)
    {
        $biblio = Biblio::where('id', $biblioId)
            ->where('utilisateur_id', $userId)
            ->first(); // Retrieve the model instance

        if (!$biblio) {
            return response()->json(['message' => 'Biblio not found for the user.'], 404);
        }

        // Detach the relationship
        $biblio->book()->detach();

        // Delete the Biblio record
        $biblio->delete();

        return response()->json(['message' => 'Biblio has been deleted successfully'], 200);
    }

    public function addBookToBiblio(Request $request){

       $request->validate([
        'biblio_id' => 'required|integer',
        'book_id' => 'required|integer',
       ]);

       BiblioHasBook::create([
        'biblio_id' => $request->biblio_id,
        'book_id' => $request->book_id,
       ]);

       return response()->json(['message' => 'Book added to biblio successfully'], 201);

    }
    public function addBookToDefaultBiblio(Request $request){

        $request->validate([
         'biblio_name' => 'required|String',
         'book_id' => 'required|integer',
         'user_id' => 'required|integer',
        ]);
 
        $biblio = Biblio::where('biblioName', $request->biblio_name)->where('utilisateur_id', $request->user_id)->first();
        BiblioHasBook::create([
            'biblio_id' => $biblio->id,
            'book_id' => $request->book_id,
           ]);
        
        return response()->json(['message' => 'Book added to biblio successfully'], 201);
 
     }
}

<?php

namespace App\Http\Controllers;

use App\Models\ReadingHistory;
use App\Models\ReadingHistoryHasBook;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ReadingHistoryController extends Controller
{
    public function searchBooksByUserId($userId, $currentPage)
    {
        // Nombre d'éléments par page
        $perPage = 6; // Vous pouvez ajuster cela selon vos besoins

        // Récupérer l'historique de lecture pour l'utilisateur spécifié
        $readingHistory = ReadingHistory::where('id_utilisateur', $userId)->first();

        if (!$readingHistory) {
            return response()->json(['message' => 'Aucun historique de lecture trouvé pour cet utilisateur'], 404);
        }

        // Récupérer les livres associés à cet historique de lecture avec pagination
        $books = $readingHistory->books()->paginate($perPage, ['*'], 'page', $currentPage);

        // Vous pouvez également personnaliser les données de pagination si nécessaire
        $paginationData = [
            'total'        => $books->total(),
            'per_page'     => $books->perPage(),
            'current_page' => $books->currentPage(),
            'last_page'    => $books->lastPage(),
            'from'         => $books->firstItem(),
            'to'           => $books->lastItem(),
        ];

        return response()->json(['books' => $books, 'pagination' => $paginationData], 200);
    }

    public function addBookToHistory(Request $request) {
        $request->validate([
            'book_id' => 'required|integer',
            'id_utilisateur' => 'required|integer',
        ]);

        $readingHistory = ReadingHistory::where('id_utilisateur', $request->input('id_utilisateur'))->first();
        ReadingHistoryHasBook::create([
            'id_reading_history' => $readingHistory->id,
            'id_book' => $request->input('book_id'),
            'date_creation_book' => Carbon::now(),
        ]);

        return response()->json(['message' => 'Book added to reading history successfully'], 201);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\ReadingHistory;

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
}

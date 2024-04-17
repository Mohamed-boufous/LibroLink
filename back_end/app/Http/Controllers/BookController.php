<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Book;
use Illuminate\Support\Facades\Validator;
use App\Models\Genre;
use Illuminate\Support\Facades\Storage;
use setasign\Fpdi\Fpdi;
use setasign\Fpdi\PdfParser\StreamReader;
use setasign\Fpdi\PdfParser\PdfParser;
use setasign\Fpdi\PdfReader\PdfReader;
use App\Models\Biblio;
use App\Models\BiblioHasBook;
use App\Models\Rating;

class BookController extends Controller
{
    public function index(Request $request)
    {
        $option = $request->query('option');
        $order = $request->query('order');
        $limit = $request->query('limit');
        $books = Book::with('genres');
        switch ($option) {
            case 'Recently Added':
                $books = $books->orderBy('created_at', $order ? $order : "desc")->limit($limit ? $limit : 10)->get();
                break;
            case 'popular':
                $books = $books->orderBy('views', $order ? $order : "desc")->limit($limit ? $limit : 10)->get();
                break;
            case 'Rating':
                $books = $books->orderBy('sum_rating', $order ? $order : "desc")->limit($limit ? $limit : 10)->get();
                break;
            default:
                $books = $books->get();
                break;
        }


        foreach ($books as $book) {
            /** @var Book $book */
            $book->ImageURL = asset($book->bookCover);
        }
        return response()->json($books);
    }
    public function getBooksByTitle(Request $request)
    {
        // Get the search term from the request (assuming it's in a 'title' query parameter)
        $searchTerm = $request->query('title');

        // Perform the query using Eloquent
        $books = Book::where('title', 'like', "%{$searchTerm}%")
            ->with('genres')->get();

        // Alternative for case-insensitive search (optional)
        // $books = Book::where('title', 'ilike', "%{$searchTerm}%")
        //           ->get();

        // Check if any books were found
        if ($books->isEmpty()) {
            return response()->json([
                'message' => 'No books found for the search term.',
            ]);
        }
        foreach ($books as $book) {
            /** @var Book $book */
            $book->ImageURL = asset($book->bookCover);
        }
        // Return the found books as JSON
        return response()->json($books);
    }
    public function get_book($id)
    {
        $book = Book::with('genres')->find($id);
        $book->ImageURL = asset($book->bookCover);
        if ($book->filePath) {
            $book->PdfURL = asset($book->filePath);
        }
        return response()->json($book);
    }

    function list_books_number(Request $request)
    {
        $state = $request->query('state');

        $totalBooks = Book::count();

        if ($state === "total") {

            return response()->json([
                'total_books' => $totalBooks,
            ]);
        }
        $freeBooks = Book::where('isFree', 1)->count();

        if ($state === "free") {
            return response()->json([
                'free_books' => $freeBooks,
            ]);
        }

        $premiumBooks = $totalBooks - $freeBooks;

        if ($state === "premium") {
            return response()->json([
                'premium_books' => $premiumBooks,
            ]);
        }

        return response()->json([
            'total_books' => $totalBooks,
            'free_books' => $freeBooks,
            'premium_books' => $premiumBooks,
        ]);
    }

    public function filterByGenre(Request $request)
    {
        $genreString = $request->query('genres');
        $genreArray = explode(',', $genreString);
        $genreIds = Genre::whereIn('genreName', $genreArray)->pluck('id')->toArray();
        $order = $request->query('order');
        $ordermode = $request->query('ordermode');
        if ($order === "Name A-Z") {
            $tablecol = "title";
        } else if ($order === "Released Date") {
            $tablecol = "date_publication";
        } else if ($order === "Most Viewed") {
            $tablecol = "views";
        } else if ($order === "Rating") {
            $tablecol = "sum_rating";
        } else if ($order === "Recently Added") {
            $tablecol = "created_at";
        } else {
            $tablecol = "created_at";
            $ordermode = "desc";
        }

        if (!is_array($genreIds)) {

            return response()->json(['error' => "Genre IDs must be an array"], 400);
        }
        if (!empty($genreIds)) {
            $genreIdsCount = count($genreIds);

            $bookIds = Book::select('book_id')
                ->join('book_has_genres', 'book_has_genres.book_id', '=', 'book.id')
                ->whereIn('book_has_genres.genres_id', $genreIds)
                ->groupBy('book_id')
                ->havingRaw('COUNT(DISTINCT book_has_genres.genres_id) = ?', [$genreIdsCount])
                ->get()
                ->pluck('book_id');

            $books = Book::with('genres')->whereIn('id', $bookIds)->orderBy($tablecol, $ordermode ? $ordermode : "asc")->get();
        }

        foreach ($books as $book) {
            $book->ImageURL = asset($book->bookCover);
        }
        return response()->json($books);
    }

    public function filterByfree(Request $request)
    {
        $isFree = $request->query('isFree');
        $order = $request->query('order');
        $ordermode = $request->query('ordermode');
        if ($order === "Name A-Z") {
            $tablecol = "title";
        } else if ($order === "Released Date") {
            $tablecol = "date_publication";
        } else if ($order === "Most Viewed") {
            $tablecol = "views";
        } else if ($order === "Rating") {
            $tablecol = "sum_rating";
        } else if ($order === "Recently Added") {
            $tablecol = "created_at";
        } else {
            $tablecol = "created_at";
            $ordermode = "desc";
        }

        if (!isset($isFree)) {
            return response()->json(['error' => "isFree must be set to 0 or 1"], 400);
        }

        $books = Book::where('isFree', $isFree)->orderBy($tablecol, $ordermode ? $ordermode : "asc")->get();
        foreach ($books as $book) {
            $book->ImageURL = asset($book->bookCover);
        }

        return response()->json($books);
    }

    public function filterBylang(Request $request)
    {
        try {
            $langString = $request->query('lang');
            $order = $request->query('order');
            $ordermode = $request->query('ordermode');
            $langs = explode(',', $langString);
            if ($order === "Name A-Z") {
                $tablecol = "title";
            } else if ($order === "Released Date") {
                $tablecol = "date_publication";
            } else if ($order === "Most Viewed") {
                $tablecol = "views";
            } else if ($order === "Rating") {
                $tablecol = "sum_rating";
            } else if ($order === "Recently Added") {
                $tablecol = "created_at";
            } else {
                $tablecol = "created_at";
                $ordermode = "desc";
            }
            $books = Book::whereIn('lang', $langs)->orderBy($tablecol, $ordermode ? $ordermode : "asc")->get();
            return response()->json($books);
        } catch (\Throwable  $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'bookCover' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'title' => 'required|string',
            'author' => 'required|string',
            'description' => 'required|string',
            'subject' => 'required|string',
            'date_publication' => 'required',
            'origin' => 'string',
            'isFree' => 'required|numeric|between:0,1',
            'serie' => 'string|nullable',
            'lang' => 'required|string',
            'genre' => 'required|string',
            'bookFile' => 'file|mimes:pdf',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 422);
        }

        $book = new Book;
        $book->id = Book::latest()->first()->id + 1;
        $book->title = $request->title;
        $book->author = $request->author;
        $book->description = $request->description;
        $book->subject = $request->subject;
        $book->date_publication = $request->date_publication;
        $book->origin = $request->origin;
        $book->isFree = $request->isFree;
        $book->serie = $request->serie;
        $book->lang = $request->lang;
        if ($request->hasFile('bookCover')) {
            $image = $request->file('bookCover');
            $imageName = uniqid() . '.' . $image->getClientOriginalExtension();
            $image->move('images/bookCovers', $imageName);
            $book->bookCover = 'images/bookCovers/' . $imageName;
        }
        if ($request->hasFile('bookFile')) {
            $file = $request->file('bookFile');
            $fileName = uniqid() . '.' . $file->getClientOriginalExtension();
            $file->move('pdf', $fileName);
            $book->filePath = 'pdf/' . $fileName;
            $stream = StreamReader::createByFile($book->filePath);
            $parser = new PdfParser($stream);
            $pdfReader = new PdfReader($parser);
            //dd($pdfReader->getPageCount());
            $book->pages = $pdfReader->getPageCount();
        }
        $genre = explode(',', $request->genre);
        $genreIds = [];
        $genretable = [];
        foreach ($genre as $genreName) {
            $genretable[] = trim($genreName);
        }
        /* dd($genre); */
        foreach ($genre as $genreName) {
            $genretable = Genre::where('genreName', $genreName)->firstOrFail();
            /* dd($genretable->id); */
            $genreIds[] = $genretable->id;
        }
        $book->save();
        $book->genres()->attach($genreIds);

        return response()->json([
            'message' => 'book added successfully',
            'book' => $book
        ]);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'bookCover' => 'image|mimes:jpeg,png,jpg|max:2048',
            'title' => 'required|string',
            'author' => 'required|string',
            'description' => 'required|string',
            'subject' => 'required|string',
            'date_publication' => 'required',
            'origin' => 'string',
            'isFree' => 'required|numeric|between:0,1',
            'serie' => 'string',
            'lang' => 'required|string',
            'genre' => 'required|string',
            'bookFile' => 'file|mimes:pdf',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 422);
        }
        $book = Book::findOrFail($id);
        $book->update($request->all());
        if ($request->hasFile('bookCover')) {
            $image = $request->file('bookCover');
            $imageName = uniqid() . '.' . $image->getClientOriginalExtension();
            $image->move('images/bookCovers', $imageName);
            $book->bookCover = 'images/bookCovers/' . $imageName;
        }
        if ($request->hasFile('bookFile')) {
            $file = $request->file('bookFile');
            $fileName = uniqid() . '.' . $file->getClientOriginalExtension();
            $file->move('pdf', $fileName);
            $book->filePath = 'pdf/' . $fileName;
        }
        $genre = explode(',', $request->genre);
        $genreIds = [];
        $genretable = [];
        foreach ($genre as $genreName) {
            $genretable[] = trim($genreName);
        }
        foreach ($genre as $genreName) {
            $genretable = Genre::where('genreName', $genreName)->firstOrFail();
            $genreIds[] = $genretable->id;
        }
        $book->genres()->sync($genreIds);
        $book->save();

        return response()->json([
            'message' => 'book updated successfully',
            'book' => $book
        ]);
    }

    public  function delete(Request $request)
    {
        $ids = $request->ids;
        foreach ($ids as $id) {
            $book = Book::find($id);
            $book->genres()->detach();
            $book->users_views()->detach();
            $book->rating_book()->detach();
            $book->delete();
        }
        return response()->json(['message' => 'book deleted successfully']);
    }

    function deleteBookFromBiblio($nameBiblio, $userId, $bookId)
    {
        // Find the biblio ID based on the provided name and user ID
        $biblio = Biblio::where('biblioName', $nameBiblio)
            ->where('utilisateur_id', $userId)
            ->first();

        if (!$biblio) {
            return response()->json([
                'error' => 'Biblio not found for the specified user',
            ], 404);
        }

        $biblioId = $biblio->id;

        // Delete the book from the biblio_has_book table
        BiblioHasBook::where('biblio_id', $biblioId)
            ->where('book_id', $bookId)
            ->delete();

        return response()->json([
            'message' => 'Book deleted from biblio successfully',
        ]);
    }




    function book($nameBiblio, $userId, $page)
    {
        $bookPerPage = 16;

        // Retrieve books based on the provided condition
        $books = Biblio::where('biblioName', $nameBiblio)
            ->where('utilisateur_id', $userId)
            ->with(['book' => function ($query) {
                $query->select('id', 'title', 'author', 'description', 'subject', 'date_publication', 'origin', 'pages', 'isFree', 'sum_rating', 'filePath', 'serie', 'lang', 'bookCover');
            }])
            ->get();

        // Count total number of books
        $totalBooks = $books->pluck('book')->flatten()->count();

        // Calculate the total number of pages
        $nbrPage = ceil($totalBooks / $bookPerPage);

        // Paginate the books
        $pagedBooks = $books->pluck('book')->flatten()->slice(($page - 1) * $bookPerPage, $bookPerPage);

        return response()->json([
            'books' => $pagedBooks->values(), // Extract just the values without keys
            'nbrPage' => $nbrPage,
        ]);
    }

    function addRating(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'book_id' => 'required|integer',
            'rating' => 'required|integer|between:0,5',
            'utilisateur_id' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => $validator->errors()->first()], 422);
        }
        /* return response()->json(['message' => $request->utilisateur_id]); */
        try {
            Rating::create([
                'book_id' => $request->book_id,
                'rating' => $request->rating,
                'utilisateur_id' => $request->utilisateur_id
            ]);

            $book = Book::find($request->book_id);
            $book->sum_rating = Rating::where('book_id', $request->book_id)->average('rating');
            $book->save();
            return response()->json(['message' => 'Rating added successfully'], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}

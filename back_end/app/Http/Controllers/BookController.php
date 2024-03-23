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

class BookController extends Controller
{
    public function index()
    {
        $books = Book::with('genres')->get();
        foreach ($books as $book) {
            /** @var Book $book */
            $book->ImageURL = asset($book->bookCover);
        }
        return response()->json($books);
    }

    public function store(Request $request)
    {
        
        $validator = Validator::make($request->all(), [
            'bookCover' => 'required|image|mimes:jpeg,png,jpg|max:2048',
            'title' => 'required|string',
            'author' => 'required|string',
            'description' => 'required|string',
            'subject' => 'required|string',
            'date_publication' => 'required|date',
            'origin' => 'string',
            'isFree' => 'required|numeric|between:0,1',
            'serie' => 'string|nullable',
            'lang' => 'required|string',
            'genre' => 'required|string',
            'bookFile' => 'required|file|mimes:pdf',
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
            
            $book->pages = $pdfReader->getPageCount();
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
            'date_publication' => 'required|date',
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
            $book->delete();
        }
        return response()->json(['message' => 'book deleted successfully']);
    }
}

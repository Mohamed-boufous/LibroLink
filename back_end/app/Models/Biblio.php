<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Biblio extends Model
{
    use HasFactory;

    protected $table = 'biblio';
    protected $fillable = [
        'biblioName',
        'utilisateur_id',
        'date_creation',
        'booksNumber',
        'visibilty',
    ];

    public $timestamps = false;

   public function book(){
    return $this->belongsToMany(Book::class,'biblio_has_book','biblio_id','book_id');
   }
}

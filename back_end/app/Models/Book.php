<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;
    protected $table = 'book';
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'author',
        'description',
        'subject',
        'date_publication',
        'origin',
        'etat',
        'isFree',
        'filePath',
        'serie',
        'lang',
        'bookCover',
    ];
    public function genres()
    {
        return $this->belongsToMany(Genre::class, 'book_has_genres', 'book_id', 'genres_id');
    }

    public function users_views(){
        return $this->belongsToMany(User::class,'user_viewed_book','id_book','id_user');
    }

    public function rating_book(){
        return $this->belongsToMany(User::class,'ratings','book_id','utilisateur_id');
    }
}

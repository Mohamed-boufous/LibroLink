<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ReadingHistory extends Model
{
    protected $table = 'reading_history';

    protected $fillable = [
        'id', 'id_utilisateur',
    ];

    public function books()
    {
        return $this->belongsToMany(Book::class, 'reading_history_has_book', 'id_reading_history', 'id_book')->withPivot('date_creation_book');
    }
    
}

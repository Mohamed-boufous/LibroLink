<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BiblioHasBook extends Model
{
    use HasFactory;
    protected $table = 'biblio_has_book';
    protected $fillable = [
        'biblio_id',
        'book_id'
    ];
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReadingHistoryHasBook extends Model
{
    use HasFactory;
    protected $table = "reading_history_has_book";
    protected $fillable = ['id_reading_history', 'id_book', 'date_creation_book'];
    public $timestamps = false;

}

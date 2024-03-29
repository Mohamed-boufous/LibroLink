<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;
    protected $table = "comments";
    public $timestamps = false;
    protected $fillable = [
        'user_id',
        'text',
        'date',
        'book_id',
        'likes',
        'dislikes',
        'replied_id'
    ];

    public function user() {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function book() {
        return $this->belongsTo(Book::class, 'book_id', 'id');
    }

    public function replies() {
        return $this->hasMany(Comment::class, 'replied_id', 'id');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    use HasFactory;

    protected $table='report list';
    public $timestamps = false;
    protected $fillable = [
        'comment_id',
        'reporter_id',
        'reported_id',
        'message',
    ];

    public function comment() {
        return $this->belongsTo(Comment::class, 'comment_id');
    }
    public function reporter() {
        return $this->belongsTo(User::class, 'reporter_id');
    }
    public function reported() {
        return $this->belongsTo(User::class, 'reported_id');
    }
}

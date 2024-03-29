<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PenaltyUsers extends Model
{
    use HasFactory;
    protected $table ='penalty';
    public $timestamps = false;
    protected $fillable = [
        'userId',
        'adminId',
        'date_penalty' => 'timestamp', 
        'penalty'
    ];
}

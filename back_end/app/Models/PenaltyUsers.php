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
        'date_exp'   => 'timestamp',
        'penalty',
        'reason',
    ];

    public function user() {
        return $this->belongsTo(User::class, 'userId');
    }
    public function admin() {
        return $this->belongsTo(Admin::class, 'adminId');
    }
}

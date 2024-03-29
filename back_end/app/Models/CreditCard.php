<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CreditCard extends Model
{
    use HasFactory;
    protected $table = 'credit_cards';
    public $timestamps = false;
    protected $fillable = [
        'cardNumber',
        'cardName',
        'expiry',
        'cvv',
    ];

    public function user() {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
    public function subscription() {
        return $this->hasMany(Subscription::class);
    }
}

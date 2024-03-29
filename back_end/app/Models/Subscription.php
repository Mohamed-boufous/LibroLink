<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subscription extends Model
{
    use HasFactory;
    protected $table = 'abonnement list';
    public $timestamps = false;
    protected $fillable = [
        'offer_id',
        'card_id',
        'expiration_date',
        'subscription_date'
    ];

    public function offer()
    {
        return $this->belongsTo(Offer::class, 'offer_id', 'id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function card()
    {
        return $this->belongsTo(CreditCard::class, 'card_id', 'id');
    }
}

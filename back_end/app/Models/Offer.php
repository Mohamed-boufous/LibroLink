<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Offer extends Model
{
    use HasFactory;

    protected $table = 'offers';
    public $timestamps = false;

    public function subscription()
    {
        return $this->hasMany(Subscription::class);
    }
}

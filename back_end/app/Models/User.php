<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Laravel\Cashier\Billable;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable, Billable;
    protected $table = 'utilisateur';
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'userName',
        'displayName',
        'email',
        'password',
        'date_birth',
        'gender',
        'image',
        'bio',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];
    public function views_book()
    {
        return $this->belongsToMany(Book::class, 'user_viewed_book', 'id_user', 'id_book');
    }
    public function rating_book()
    {
        return $this->belongsToMany(Book::class, 'ratings', 'utilisateur_id', 'book_id');
    }
    public function subscription()
    {
        return $this->hasMany(Subscription::class);
    }
    public function credit_card()
    {
        return $this->hasOne(CreditCard::class);
    }
    public function penalty() {
        return $this->hasMany(PenaltyUsers::class, 'userId');
    }
}

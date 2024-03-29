<?php

namespace App\Http\Controllers;

use App\Models\CreditCard;
use Illuminate\Http\Request;
use Stripe\Stripe;
use App\Models\User;
use Carbon\Carbon;
use App\Models\Offer;
use App\Models\Subscription;

class SubscriptionController extends Controller
{

    public function index()
    {
        $subscriptions = Subscription::all();
        foreach ($subscriptions as $subscription) {
            $user = User::find($subscription->user_id);
            $offer = Offer::find($subscription->offer_id);
            $card = CreditCard::find($subscription->card_id);
            $subscription->user = $user;
            $subscription->offer = $offer;
            $subscription->card = $card;
        }
        return $subscriptions;
    }

    public function get_subs_number(Request $request)
    {
        $option = $request->input('option');

        $total = Subscription::count();

        if ($option == 'total') {
            return response()->json([
                'total' => $total
            ]);
        }

        $active = Subscription::where('expiration_date', '>=', Carbon::now())->count();
        if ($option == 'active') {
            return response()->json([
                'active' => $active
            ]);
        }

        $expired = Subscription::where('expiration_date', '<', Carbon::now())->count();
        if ($option == 'expired') {
            return response()->json([
                'expired' => $expired
            ]);
        }

        return response()->json([
            'total' => $total,
            'active' => $active,
            'expired' => $expired
        ]);
    }

    public function createSubscription(Request $request, $user_id)
    {
        try {
            $validatedData = $request->validate([
                'offer' => 'required|numeric|exists:offers,mois',
                'cardNumber' => 'required|numeric|digits:16',
                'cardName' => 'required|string|max:45',
                'expiry' => 'required|numeric',
                'cvv' => 'required|numeric|digits:3',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 422);
        }

        $user = User::find($user_id);
        $currentDate = Carbon::now();
        $alreadySubscribed = $user->subscription()->where('expiration_date', '>',  $currentDate)->exists();
        if ($alreadySubscribed) {
            return response()->json([
                'error' => 'User already subscribed',
            ], 422);
        }
        try {
            $cardAlreadyExists = CreditCard::where('cardNumber', $validatedData['cardNumber'])->where('user_id', $user->id)->exists();
            if ($cardAlreadyExists) {
                return response()->json([
                    'error' => 'Card already exists',
                ], 422);
            }

            $card = $user->credit_card()->create([
                'cardNumber' => $validatedData['cardNumber'],
                'cardName' => $validatedData['cardName'],
                'expiry' => $validatedData['expiry'],
                'cvv' => $validatedData['cvv']
            ]);
            $sub_duration = $validatedData['offer'];
            $offer = Offer::where('mois', $sub_duration)->first();

            $subscription = $user->subscription()->create([
                'offer_id' => $offer->id,
                'card_id' => $card->id,
                'expiration_date' => Carbon::now()->addMonths($validatedData['offer']),
                'subscription_date' => Carbon::now(),
            ]);
            $user->is_subscribed = 1;
            $user->save();

            return response()->json([
                'success' => 'Subscription created successfully',
                'subscription' => $subscription
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 422);
        }
    }
}

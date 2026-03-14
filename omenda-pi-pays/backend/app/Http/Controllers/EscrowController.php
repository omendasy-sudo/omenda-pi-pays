<?php

namespace App\Http\Controllers;

use App\Models\Escrow;
use App\Models\Order;
use App\Models\Wallet;

class EscrowController extends Controller
{
    public function release($orderId)
    {
        $escrow = Escrow::where('order_id', $orderId)->first();
        $order = Order::find($orderId);

        $wallet = Wallet::firstOrCreate([
            'user_id' => $order->seller_id,
        ]);

        $wallet->balance += $escrow->amount;
        $wallet->save();

        $escrow->status = 'released';
        $escrow->save();

        $order->status = 'completed';
        $order->save();
    }
}

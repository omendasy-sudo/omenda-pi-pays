<?php

namespace App\Http\Controllers;

use App\Models\Escrow;
use App\Models\Order;
use App\Services\PiPaymentService;
use Illuminate\Http\Request;

class PiController extends Controller
{
    private $pi;

    public function __construct(PiPaymentService $pi)
    {
        $this->pi = $pi;
    }

    public function approve(Request $request)
    {
        return $this->pi->approve($request->paymentId);
    }

    public function complete(Request $request)
    {
        $payment = $this->pi->verify($request->paymentId);

        if (!$payment['status']['transaction_verified']) {
            return response()->json(['error' => 'not verified']);
        }

        $order = Order::find($request->order_id);

        $order->status = 'paid';
        $order->save();

        Escrow::create([
            'order_id' => $order->id,
            'amount' => $order->amount,
        ]);

        return $this->pi->complete($request->paymentId);
    }
}

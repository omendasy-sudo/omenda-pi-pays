<?php

namespace App\Http\Controllers;

use App\Models\Escrow;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $payload = $request->validate([
            'product_id' => ['required', 'exists:products,id'],
            'quantity' => ['required', 'integer', 'min:1'],
            'payment_id' => ['required', 'string'],
            'txid' => ['nullable', 'string'],
        ]);

        $product = Product::findOrFail($payload['product_id']);

        if (!$product->is_active || $product->stock < $payload['quantity']) {
            return response()->json(['message' => 'Product unavailable'], 422);
        }

        $amount = bcmul((string) $product->price_pi, (string) $payload['quantity'], 4);

        $order = DB::transaction(function () use ($payload, $request, $product, $amount) {
            $product->decrement('stock', $payload['quantity']);

            $order = Order::create([
                'buyer_id' => $request->user()->id,
                'product_id' => $product->id,
                'quantity' => $payload['quantity'],
                'amount_pi' => $amount,
                'status' => Order::STATUS_ESCROWED,
                'payment_id' => $payload['payment_id'],
                'txid' => $payload['txid'] ?? null,
            ]);

            Escrow::create([
                'order_id' => $order->id,
                'seller_id' => $product->seller_id,
                'amount_pi' => $amount,
                'status' => 'held',
            ]);

            return $order;
        });

        return response()->json($order->load('escrow'), 201);
    }

    public function index(Request $request)
    {
        return Order::with(['product', 'escrow'])
            ->where('buyer_id', $request->user()->id)
            ->latest()
            ->paginate(20);
    }
}

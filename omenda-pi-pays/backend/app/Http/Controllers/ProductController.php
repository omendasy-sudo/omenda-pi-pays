<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        return Product::where('is_active', true)
            ->latest()
            ->paginate(20);
    }

    public function show(Product $product)
    {
        return response()->json($product);
    }

    public function store(Request $request)
    {
        $payload = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'description' => ['nullable', 'string'],
            'price_pi' => ['required', 'numeric', 'min:0.01'],
            'stock' => ['required', 'integer', 'min:0'],
        ]);

        $payload['seller_id'] = $request->user()->id;
        $payload['is_active'] = true;

        $product = Product::create($payload);

        return response()->json($product, 201);
    }

    public function update(Request $request, Product $product)
    {
        if ($product->seller_id !== $request->user()->id) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $payload = $request->validate([
            'name' => ['sometimes', 'string', 'max:120'],
            'description' => ['sometimes', 'nullable', 'string'],
            'price_pi' => ['sometimes', 'numeric', 'min:0.01'],
            'stock' => ['sometimes', 'integer', 'min:0'],
            'is_active' => ['sometimes', 'boolean'],
        ]);

        $product->update($payload);

        return response()->json($product);
    }

    public function destroy(Request $request, Product $product)
    {
        if ($product->seller_id !== $request->user()->id) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $product->delete();

        return response()->json(['message' => 'Deleted']);
    }
}

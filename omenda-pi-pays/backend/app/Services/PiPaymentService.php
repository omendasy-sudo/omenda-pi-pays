<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class PiPaymentService
{
    private $api;

    public function __construct()
    {
        $this->api = env('PI_API');
    }

    public function approve($paymentId)
    {
        return Http::withHeaders([
            'Authorization' => 'Key ' . env('PI_API_KEY'),
        ])->post("$this->api/payments/$paymentId/approve");
    }

    public function complete($paymentId)
    {
        return Http::withHeaders([
            'Authorization' => 'Key ' . env('PI_API_KEY'),
        ])->post("$this->api/payments/$paymentId/complete");
    }

    public function verify($paymentId)
    {
        return Http::withHeaders([
            'Authorization' => 'Key ' . env('PI_API_KEY'),
        ])->get("$this->api/payments/$paymentId");
    }
}

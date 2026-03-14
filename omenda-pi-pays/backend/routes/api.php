<?php

use App\Http\Controllers\EscrowController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PiController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

Route::get('/products', [ProductController::class, 'index']);
Route::post('/products', [ProductController::class, 'store']);

Route::post('/orders', [OrderController::class, 'create']);

Route::post('/pi/approve', [PiController::class, 'approve']);
Route::post('/pi/complete', [PiController::class, 'complete']);

Route::post('/escrow/release/{id}', [EscrowController::class, 'release']);

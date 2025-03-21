<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::get('/login', function () {
    return view('auth.login');
})->name('auth.log');

Route::post('/login', [AuthController::class, 'authenticate'])->name('auth.login');

Route::get('/admin', function() {
    return to_route('auth.log');
});
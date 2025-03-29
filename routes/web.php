<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BackendController;

// Route::get('/login', function () {
//     return view('lumen.core.auth.login');
// })->name('auth.log');

// Route::post('/login', [AuthController::class, 'authenticate'])->name('auth.login');

// Route::get('/admin', function() {
//     return to_route('auth.log');
//     return view('lumen.core.backend.index');
// });

//TODO: wrap in auth middleware & maybe group into lumen prefix and as
Route::group(['prefix' => 'admin', 'as' => 'backend'], function () {
    Route::get('/', [BackendController::class, 'index'])->name('.index');
    Route::group(['prefix' => 'content', 'as' => '.content'], function (){
        Route::get('/', [BackendController::class, 'contentIndex'])->name('.index');
        Route::get('/create', [BackendController::class, 'contentCreate'])->name('.create');
        Route::post('/store', [BackendController::class, 'contentStore'])->name('.store');
    });
});
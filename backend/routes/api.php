<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\AuthentificationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ServiceController;

Route::post('authenticate' ,[AuthentificationController::class,'authenticate']);
Route::get('authenticate' ,[AuthentificationController::class,'authenticate']);
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::group(['middleware'=> ['auth:sanctum']],function(){
    Route::post('/logout', [AuthentificationController::class, 'logout']);
    Route::get('/dashboard', [DashboardController::class, 'index']);
    Route::post('/services', [ServiceController::class, 'store']);
    Route::get('/services', [ServiceController::class, 'index']);
});

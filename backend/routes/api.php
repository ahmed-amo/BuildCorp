<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\AuthentificationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('authenticate' ,[AuthentificationController::class,'authenticate']);
Route::get('authenticate' ,[AuthentificationController::class,'authenticate']);
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::group(['middleware'=> ['auth:sanctum']],function(){
    Route::post('/logout', [AuthentificationController::class, 'logout']);
    Route::get('/dashboard', [DashboardController::class, 'index']);
});
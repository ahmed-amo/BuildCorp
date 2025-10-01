<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\AuthentificationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\TempImageController;

//authenification
Route::post('authenticate' ,[AuthentificationController::class,'authenticate']);
Route::get('authenticate' ,[AuthentificationController::class,'authenticate']);

//showing services

Route::get('/services', [ServiceController::class, 'index']);


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::group(['middleware'=> ['auth:sanctum']],function(){

    //AdminAPI
    Route::post('/logout', [AuthentificationController::class, 'logout']);
    Route::get('/dashboard', [DashboardController::class, 'index']);

    //ServicesAPI
    Route::post('/services', [ServiceController::class, 'store']);
    Route::put('/services/{id}', [ServiceController::class, 'update']);
    Route::get('/services/{id}', [ServiceController::class, 'show']);
    Route::delete('/services/{id}', [ServiceController::class, 'destroy']);

    //imageAPI
    Route::post('/temp-images', [TempImageController::class, 'store']);
});

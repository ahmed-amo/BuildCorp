<?php


use App\Http\Controllers\AuthentificationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ServicesController;

Route::post('/services',[ServicesController::class,'store']);
Route::put('services/{id}', [ServicesController::class, 'update']);
Route::delete('services/{id}', [ServicesController::class, 'destroy']);
Route::post('authenticate' ,[AuthentificationController::class,'authenticate']);
Route::get('authenticate' ,[AuthentificationController::class,'authenticate']);

Route::get('services', [ServicesController::class, 'index']);
Route::get('services/{slug}', [ServicesController::class, 'show']);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::group(['middleware'=> ['auth:sanctum']],function(){

    //AdminAPI
    Route::post('/logout', [AuthentificationController::class, 'logout']);

    //ServicesAPI


});

<?php


use App\Http\Controllers\AuthentificationController;
use App\Http\Controllers\ProjectsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ServicesController;


//PROJECTS
Route::get('projects', [ProjectsController::class, 'index']);
Route::post('projects', [ProjectsController::class,'store']);
Route::put('projects/{id}', [ProjectsController::class,'update']);
Route::delete('projects/{id}', [ProjectsController::class,'destroy']);
Route::get('projects/{slug}', [ServicesController::class, 'show']);


//AUTH
Route::post('authenticate' ,[AuthentificationController::class,'authenticate']);
Route::get('authenticate' ,[AuthentificationController::class,'authenticate']);

//SERVICES
Route::post('/services',[ServicesController::class,'store']);
Route::put('services/{id}', [ServicesController::class, 'update']);
Route::delete('services/{id}', [ServicesController::class, 'destroy']);
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

<?php

use Illuminate\Support\Facades\Route;
use Intervention\Image\Facades\Image;


Route::get('/', function () {
    return view('welcome');
});

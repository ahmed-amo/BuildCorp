<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TempImage;
use Illuminate\Support\Facades\Validator;

class TempImageController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'image' => 'required|mimes:png,jpg,jpeg,gif'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()->get('image') // fixed usage
            ]);
        }

        $image = $request->image;
        $ext = $image->getClientOriginalExtension();
        $imageName = time() . '.' . $ext; // simpler than strtotime('now')

        //save data in temp images table
        $model = new TempImage();
        $model->name = $imageName;
        $model->save();
        //save image in public/uploads
        $image->move(public_path('/uploads'), $imageName);

        return response()->json([
            'status' => true,
            'data' => $model,
            'message' => 'Image uploaded successfully'
        ]);
    }
}

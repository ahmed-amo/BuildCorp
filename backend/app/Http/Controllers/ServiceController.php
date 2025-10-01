<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Service;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;
use App\Models\TempImage;

class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::orderby('created_at','DESC') ->get();
        return response()->json([
            'status' => true,
            'data' => $services
        ]);
    }

public function store(Request $request)
{
    $validator = Validator::make($request->all(), [
        'title'       => 'required|string|max:255',
        'description' => 'nullable|string',
        'status'      => 'nullable|boolean',
        'temp_image_id' => 'nullable|exists:temp_images,id',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'status' => false,
            'errors' => $validator->errors()
        ]);
    }

    $service = new Service();
    $service->title = $request->title;
    $service->description = $request->description;
    $service->slug = Str::slug($request->title);
    $service->status = $request->status;

    // Handle temp image if provided
    if ($request->temp_image_id) {
        $tempImage = TempImage::find($request->temp_image_id);

        if ($tempImage) {
            $originalPath = public_path('uploads/' . $tempImage->name);
            $filename = uniqid() . '.jpg';
            $savePath = public_path('uploads/');

            if (!file_exists($savePath)) {
                mkdir($savePath, 0777, true);
            }

            // Large (1200px wide)
            $largePath = $savePath . 'large_' . $filename;
            Image::make($originalPath)->resize(1200, null, function ($constraint) {
                $constraint->aspectRatio();
                $constraint->upsize();
            })->save($largePath);

            // Small (300x300 exact, cropped if needed)
            $smallPath = $savePath . 'small_' . $filename;
            Image::make($originalPath)->fit(300, 300)->save($smallPath);

            $service->image_large = 'uploads/large_' . $filename;
            $service->image_small = 'uploads/small_' . $filename;
        }
    }

    $service->save();

    return response()->json([
        'status' => true,
        'message' => 'Service added successfully',
        'data' => $service
    ]);
}



public function update(Request $request, string $id)
{
    $service= Service::find($id);
    if($service == null){
        return response() ->json([
            'status' => false,
            'message' => 'service not found'
        ]);
    }
    $validator = Validator::make($request ->all(), [
        'title' => 'required',
        'slug'  => [
        'required',
        Rule::unique('services', 'slug')->ignore($id),
    ],
    ]);

    if ($validator ->fails ()){
        return response()->json ([
            'status' => false,
            'errors' => $validator ->errors()
        ]);
    }

        $service->title = $request->title;
        $service->description = $request->description;
        $service->slug =Str::slug($request->slug) ;
        $service->status = $request->status;
        $service->save();

        return response() ->json ([
            'status' => true,
            'message' => 'service updated successfully'
        ]);

}


    public function destroy(string $id)
    {
        $service = Service::find($id);

        if($service == null){
            return response() ->json ([
                'status' => false,
                'message' => 'service not found'
            ]);
        }
        $service ->delete();
        return response ()->json ([
            'status' => true,
            'message' => 'service deleted successfully'
        ]);
    }
}

<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Storage;

class ServicesController extends Controller
{
    public function index()
    {
        $services = Service::all();
        return response()->json([
            'status' => true,
            'data' => $services
        ]);
    }

    public function store(Request $request)
    {
        // Validate inputs, including the image file
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:65535',
            'status' => 'nullable|string|in:active,inactive',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif', // Image: optional, valid types, max 2MB
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ], 422); // 422 means validation error
        }

        // Create the service
        $service = new Service();
        $service->title = $request->title;
        $service->description = $request->description;
        $service->slug = Str::slug($request->title);
        $service->status = $request->status ?? 'inactive'; // Default to 0 if not provided

        // Handle image if uploaded
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $filename = uniqid() . '.jpg'; // Unique name, standardize to JPG

            // Paths for large and small images
            $largePath = 'services/large/' . $filename;
            $smallPath = 'services/small/' . $filename;

            // Process and save large image (1200px wide, keep aspect ratio)
            $largeImage = Image::make($image)->resize(1200, null, function ($constraint) {
                $constraint->aspectRatio();
                $constraint->upsize();
            })->encode('jpg');
            Storage::disk('public')->put($largePath, $largeImage);

            // Process and save small image (300x300 cropped)
            $smallImage = Image::make($image)->fit(300, 300)->encode('jpg');
            Storage::disk('public')->put($smallPath, $smallImage);

            // Save paths as attributes in the service
            $service->image_large = $largePath;
            $service->image_small = $smallPath;
        }

        $service->save();

        return response()->json([
            'status' => true,
            'message' => 'Service added successfully',
            'data' => $service
        ]);
    }
    public function show(string $slug)
    {
        $service = Service::where('slug', $slug)->first();
        if (!$service) {
            return response()->json([
                'status' => false,
                'message' => 'Service not found'
            ], 404);
        }

        return response()->json([
            'status' => true,
            'data' => $service
        ]);
    }
    public function update(Request $request, $id)
{
    $startTime = microtime(true); // ✅ Debug timer

    $service = Service::findOrFail($id); // Find service or 404

    // Validate (same as store)
    $validator = Validator::make($request->all(), [
        'title' => 'required|string|max:255',
        'description' => 'nullable|string',
        'status' => 'nullable|string|in:active,inactive',
        'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Optional, same rules
    ]);

    if ($validator->fails()) {
        \Log::error('Update validation failed:', $validator->errors()->toArray()); // ✅ Log errors
        return response()->json([
            'status' => false,
            'errors' => $validator->errors()
        ], 422);
    }

    // Update text fields
    $service->title = $request->title;
    $service->description = $request->description;
    $service->slug = Str::slug($request->title);
    $service->status = $request->status ?? 'inactive';

    $imageTimeStart = microtime(true); // ✅ Image timer

    if ($request->hasFile('image')) {
        \Log::info("Update: Image file detected: " . $request->file('image')->getClientOriginalName()); // ✅ Confirm file arrives

        $image = $request->file('image');
        $filename = uniqid() . '.' . $image->getClientOriginalExtension();

        $largePath = 'services/large/' . $filename;
        $smallPath = 'services/small/' . $filename;

        // Large image (optimized as before)
        $largeImage = Image::make($image)
            ->resize(800, null, function ($constraint) {
                $constraint->aspectRatio();
                $constraint->upsize();
            })
            ->encode('jpg', 80)
            ->stream();
        Storage::disk('public')->put($largePath, $largeImage);

        // Small image
        $smallImage = Image::make($image)
            ->fit(300, 300)
            ->encode('jpg', 80)
            ->stream();
        Storage::disk('public')->put($smallPath, $smallImage);

        // Overwrite old images
        $service->image_large = $largePath;
        $service->image_small = $smallPath;

        $imageTime = microtime(true) - $imageTimeStart;
        \Log::info("Update image processing time: {$imageTime}s");
    } else {
        \Log::info('Update: No new image uploaded—keeping old.'); // ✅ Log if no file
    }

    $service->save();

    $totalTime = microtime(true) - $startTime;
    \Log::info("Total update time: {$totalTime}s");

    return response()->json([
        'status' => true,
        'message' => 'Service updated successfully',
        'data' => $service
    ]);
}
    public function destroy(string $id)
    {
        $service = Service::find($id);
        if (!$service) {
            return response()->json([
                'status' => false,
                'message' => 'Service not found'
            ], 404);
        }

        // Delete images if they exist
        if ($service->image_large) {
            Storage::disk('public')->delete($service->image_large);
        }
        if ($service->image_small) {
            Storage::disk('public')->delete($service->image_small);
        }

        $service->delete();

        return response()->json([
            'status' => true,
            'message' => 'Service deleted successfully'
        ]);
    }

    // ... Keep your index() and destroy() methods as-is ...
}
<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Storage;

class ProjectsController extends Controller
{
    public function index()
    {
        $project = Project::all();
        return response()->json([
            'status' => true,
            'data' => $project
        ]);
    }

    public function store (Request $request) {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'slug' => 'nullable|string',
            'city' => 'nullable|string',
            'year' => 'nullable|integer',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ], 422);
        }
        $project = New Project();
        $project->title = $request->title;
        $project->description = $request->description ;
        $project->slug = Str::slug($request->title);
        $project->year = $request->year;
        $project->city = $request->city;

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $filename = uniqid() . '.jpg';

            // Paths for large and small images
            $largePath = 'projects/large/' . $filename;
            $smallPath = 'projects/small/' . $filename;
            $extraPath = 'projects/extra/' . $filename;

            // Process and save large image (1200px wide, keep aspect ratio)
            $largeImage = Image::make($image)->resize(1200, null, function ($constraint) {
                $constraint->aspectRatio();
                $constraint->upsize();
            })->encode('jpg');
            Storage::disk('public')->put($largePath, $largeImage);

            // Process and save small image (300x300 cropped)
            $smallImage = Image::make($image)->fit(300, 300)->encode('jpg');
            Storage::disk('public')->put($smallPath, $smallImage);

            $extraImage = Image::make($image)->fit(24, 24)->encode('jpg');
            Storage::disk('public')->put($extraPath, $extraImage);

            // Save paths as attributes in the service
            $project->image_large = $largePath;
            $project->image_small = $smallPath;
            $project->image_extra = $extraPath;
        }

        $project->save();

        return response()->json([
            'status' => true,
            'message' => 'Project added successfully',
            'data' => $project
        ]);

    }
    public function show(string $slug)
    {
        $project = Project::where('slug', $slug)->first();
        if (!$project) {
            return response()->json([
                'status' => false,
                'message' => 'Service not found'
            ], 404);
        }

        return response()->json([
            'status' => true,
            'data' => $project
        ]);
    }
    public function destroy(string $id)
    {
        $project = Project::find($id);
        if (!$project) {
            return response()->json([
                'status' => false,
                'message' => 'Service not found'
            ], 404);
        }

        // Delete images if they exist
        if ($project->image_large) {
            Storage::disk('public')->delete($project->image_large);
        }
        if ($project->image_small) {
            Storage::disk('public')->delete($project->image_small);
        }
        if ($project->image_extra) {
            Storage::disk('public')->delete($project->image_extra);
        }

        $project->delete();

        return response()->json([
            'status' => true,
            'message' => 'Service deleted successfully'
        ]);
    }

}

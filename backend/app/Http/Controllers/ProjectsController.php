<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

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

    public function store(Request $request)
    {
        \Log::debug('Store request data:', $request->all());
        $validator = Validator::make($request->all(), [
            'title' => 'string|max:255',
            'description' => 'string',
            'slug' => ['nullable', 'string', Rule::unique('projects')],
            'city' => 'nullable|string',
            'category' => 'nullable|string',
            'year' => 'nullable|integer',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5120',
        ]);

        if ($validator->fails()) {
            \Log::error('Store validation failed:', $validator->errors()->toArray());
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        DB::beginTransaction();
        try {
            $project = new Project();
            $project->title = $request->title;
            $project->description = $request->description ?? 'Default description'; // ✅ Fallback
            $project->slug = $request->slug ?? Str::slug($request->title);
            $project->year = $request->year;
            $project->category = $request->category;
            $project->city = $request->city;

            if ($request->hasFile('image')) {
                $imagePaths = $this->processImage($request->file('image'), new Project());
                $project->image_large = $imagePaths['image_large'];
                $project->image_small = $imagePaths['image_small'];
                $project->image_extra = $imagePaths['image_extra'];
            }

            $project->save();
            DB::commit();

            return response()->json([
                'status' => true,
                'message' => 'Project added successfully',
                'data' => $project
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            \Log::error('Store failed: ' . $e->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Failed to create project',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $project = Project::findOrFail($id);

        \Log::debug('Update request data:', $request->all());
        if ($request->hasFile('image')) {
            \Log::info('Update: Image file detected: ' . $request->file('image')->getClientOriginalName());
        } else {
            \Log::info('Update: No new image uploaded—keeping old.');
        }

        $validator = Validator::make($request->all(), [
            'title' => 'string|max:255',
            'description' => 'string',
            'slug' => [
                'nullable',
                'string',
                Rule::unique('projects')->ignore($project->id),
            ],
            'city' => 'nullable|string',
            'year' => 'nullable|integer',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:5120',
        ]);

        if ($validator->fails()) {
            \Log::error('Update validation failed:', $validator->errors()->toArray());
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        DB::beginTransaction();
        try {

            $project->title = $request->title ?? $project->title;
            $project->description = $request->description ?? $project->description; // ✅ Fallback to existing description
            $project->slug = $request->slug ?? Str::slug($request->title);
            $project->city = $request->city;
            $project->year = $request->year;

            if ($request->hasFile('image')) {
                $imagePaths = $this->processImage($request->file('image'), $project);
                $project->image_large = $imagePaths['image_large'];
                $project->image_small = $imagePaths['image_small'];
                $project->image_extra = $imagePaths['image_extra'];
            }

            \Log::debug('Project data before save:', $project->toArray());
            $project->save();
            DB::commit();

            return response()->json([
                'status' => true,
                'message' => 'Project updated successfully',
                'data' => $project
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            \Log::error('Update failed: ' . $e->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Failed to update project',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show(string $slug)
    {
        $project = Project::where('slug', $slug)->first();
        if (!$project) {
            return response()->json([
                'status' => false,
                'message' => 'Project not found'
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
                'message' => 'Project not found'
            ], 404);
        }

        DB::beginTransaction();
        try {
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
            DB::commit();

            return response()->json([
                'status' => true,
                'message' => 'Project deleted successfully'
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            \Log::error('Delete failed: ' . $e->getMessage());
            return response()->json([
                'status' => false,
                'message' => 'Failed to delete project',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    private function processImage($image, $project)
    {
        $filename = Str::random(40) . '.jpg';
        $largePath = config('app.project_image_paths.large', 'projects/large/') . $filename;
        $smallPath = config('app.project_image_paths.small', 'projects/small/') . $filename;
        $extraPath = config('app.project_image_paths.extra', 'projects/extra/') . $filename;

        try {
            $largeImage = Image::make($image)->resize(1200, null, function ($constraint) {
                $constraint->aspectRatio();
                $constraint->upsize();
            })->encode('jpg', 80);
            Storage::disk('public')->put($largePath, $largeImage);

            $smallImage = Image::make($image)->fit(300, 300)->encode('jpg', 80);
            Storage::disk('public')->put($smallPath, $smallImage);

            $extraImage = Image::make($image)->fit(24, 24)->encode('jpg', 80);
            Storage::disk('public')->put($extraPath, $extraImage);

            // Delete old images if they exist
            if ($project->image_large) {
                Storage::disk('public')->delete($project->image_large);
            }
            if ($project->image_small) {
                Storage::disk('public')->delete($project->image_small);
            }
            if ($project->image_extra) {
                Storage::disk('public')->delete($project->image_extra);
            }

            return [
                'image_large' => $largePath,
                'image_small' => $smallPath,
                'image_extra' => $extraPath,
            ];
        } catch (\Exception $e) {
            \Log::error('Image processing failed: ' . $e->getMessage());
            throw $e;
        }
    }
}

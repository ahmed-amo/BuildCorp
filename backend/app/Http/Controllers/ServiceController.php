<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Service;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $services = Service::orderby('created_at','DESC') ->get();
        return response()->json([
            'status' => true,
            'data' => $services
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

            $validator = Validator::make($request->all(),[
                'title' => 'required|string|max:255',
                'slug'=>'required | unique:services,slug',
                'description' => 'nullable|string',
                'image' => 'nullable|image|max:2048',
            ]);

            $model = new Service();
            $model->title = $request->title;
            $model->description = $request->description;
            $model->slug =Str::slug($request->slug) ;
            $model->status = $request->status;
            $model->save();

            return response() -> json ([
                'status' => true,
                'message' =>'Service Added Succefully',
            ]);


    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

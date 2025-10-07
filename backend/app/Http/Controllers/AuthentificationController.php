<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;


class AuthentificationController extends Controller
{
    public function authenticate(Request $request){

        // Apply validation
        $validator = Validator::make($request->all(), [
            'email' =>'required | email' ,
            'password'=>'required',
        ]);
        if($validator->fails()){
                return  response() -> json([
                    'status' => false,
                    'errors' => $validator->errors()
                ]);
        }else{
            $credentials = [
                'email'  => $request ->email,
                'password' => $request ->password,
            ];
            if (Auth::attempt($credentials)){
                $user = User::find(Auth::user()->id);
                $token =$user ->createToken('token') ->plainTextToken;
                return response () ->json ([
                    'status' => true,
                    'token' => $token,
                    'id' => Auth::user() ->id,
                    'username' => $user->name
                ]);
            }else{
                return response() ->json([
                    'status' => false,
                    'message' =>'Either email/password incorrect'
                ]);
            }
        }
    }
    public function logout (){
        $user = User::find(Auth::user() ->id);
        $user ->tokens() ->delete();
        return response()->json([
            'status' => false,
            'message' => 'logout successfully',
        ]);
        }
}

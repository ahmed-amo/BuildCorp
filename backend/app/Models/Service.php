<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable = [
        'title',
        'description',
        'slug',
        'status',
        'image',
    ];

    public function projects()
{
    return $this->hasMany(Project::class, 'category_id');
}
    /**
     * The attributes that should be cast.
     */
    protected $casts = [

    ];


}

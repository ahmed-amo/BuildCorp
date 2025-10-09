<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
   protected $fillable = [
        'title',
        'description',
        'slug',
        'year',
        'city',
        'image',
        'category',
    ];
    public function projects()
{
    return $this->hasMany(Project::class, 'service_id');
}
protected $casts = [
    'year' => 'integer',  // Ensures numeric consistency (e.g., for sorting by year)
    'category_id' => 'integer',  // Foreign key—keeps it numeric, auto-casts from form inputs
    'image' => 'array',  // If storing multiple image paths/URLs as JSON (e.g., ['hero.jpg', 'gallery1.jpg']); use 'string' if single path only
];
}

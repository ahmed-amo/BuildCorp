<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Project;
class ProjectSeeder extends Seeder

{
    public function run(): void
    {
        $this->command->info('Seeding projects...');

        // Projects for Service ID 1 (Corporate Builds)
        Project::create([
            'title' => 'Madrid Tower',
            'description' => '50-story corporate HQ with sustainable features.',
            'slug' => 'madrid-tower',
            'year' => 2023,
            'city' => 'Madrid',
            'service_id' => 2,
            'image_small' => 'projects/small/madrid-thumb.jpg',
            'image_large' => 'projects/large/madrid-hero.jpg'
        ]);

        Project::create([
            'title' => 'London Skyscraper',
            'description' => 'Modern office complex in the financial district.',
            'slug' => 'london-skyscraper',
            'year' => 2024,
            'city' => 'London',
            'service_id' => 3,
            'image_small' => 'projects/small/london-thumb.jpg',
            'image_large' => 'projects/large/london-hero.jpg'
        ]);

        // Projects for Service ID 2 (Campus Developments)
        Project::create([
            'title' => 'Barcelona Campus',
            'description' => 'Tech university expansion with green spaces.',
            'slug' => 'barcelona-campus',
            'year' => 2022,
            'city' => 'Barcelona',
            'service_id' => 6,
            'image_small' => 'projects/small/barcelona-thumb.jpg',
            'image_large' => 'projects/large/barcelona-hero.jpg'
        ]);
    }

}

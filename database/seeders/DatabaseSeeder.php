<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Site;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $user = User::create([
            'name' => 'test@test.de',
            'email' => 'test@test.de',
            'password' => bcrypt('test@test.de'),
        ]);

        Site::create([
            "title" => "event-testing-docker",
            "url" => "test.de",
            "allow_subdomains" => true,
            "database_name" => "event_tracker",
            "database_user" => "event_tracker",
            "database_password" => "EventTracker123!",
            "database_host" => "growth-hack-backend-event-exampl-db",
            "database_port" => "3308",
            "user_id" => $user->id
        ]);
    }
}

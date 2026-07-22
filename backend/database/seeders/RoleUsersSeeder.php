<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class RoleUsersSeeder extends Seeder
{
    public function run(): void
    {
        $users = [
            'dealer' => [
                'name' => 'Dealer User',
                'password' => 'dealer123',
            ],
            'rse' => [
                'name' => 'RSE User',
                'password' => 'rse123',
            ],
            'sales_head' => [
                'name' => 'Sales Head User',
                'password' => 'saleshead123',
            ],
            'technical_service_head' => [
                'name' => 'Technical Service Head User',
                'password' => 'techservice123',
            ],
            'plant_head' => [
                'name' => 'Plant Head User',
                'password' => 'planthead123',
            ],
            'production_head' => [
                'name' => 'Production Head User',
                'password' => 'productionhead123',
            ],
            'admin' => [
                'name' => 'Admin User',
                'password' => 'admin123',
            ],
        ];

        foreach ($users as $role => $details) {
            User::updateOrCreate(
                ['email' => "{$role}@test.com"],
                [
                    'name' => $details['name'],
                    'password' => Hash::make($details['password']),
                    'role' => $role,
                ]
            );
        }
    }
}
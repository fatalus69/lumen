<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Exception;

class CreateDefaultData extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:create-default-data';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        DB::beginTransaction();
        $role = null;

        if (!Role::find('admin')) {
            $role = new Role([
                'name' => 'admin',
                'description' => 'Website Administrator',
            ]);

            $role->save();
        }

        $user = new User();

        $user->name = 'Admin';
        $user->email = 'x@y.z';
        $user->password = Hash::make($this->secret("Enter a password for admin"));

        $user->save();

        DB::table('role_user')->insert([
            'role_id' => $role->id,
            'user_id' => $user->id,
        ]);

        try {
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
        }

    }
}

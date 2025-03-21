<?php

namespace App\Console\Commands\CMShell\UserCommands;

use Illuminate\Console\Command;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Models\Role;

class CreateUser extends Command
{
    protected $signature = 'user:create';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Creates a new User';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $username = $this->ask('Enter a username:');
        $email = $this->ask('Enter an email:');
        $password = Hash::make($this->secret('Enter a password:'));
        $role = $this->ask("Enter an existing role:");

        if (Role::find($role)->length() === 0) {
            $this->error('Role does not exist');
            return;
        }

        $user = new User([
            'name' => $username,
            'email' => $email,
            'password' => $password,
            'role' => Role::find($role)->id,
        ]);

        $user->save();

        return 0;
    }
}

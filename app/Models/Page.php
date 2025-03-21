<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    protected $fillable = ['title', 'slug', 'content', 'active'];

    public function author() 
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function meta()
    {
        return $this->morphMany(Meta::class, 'metable');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Node extends Model
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

    public function labels()
    {
        return $this->belongsToMany(Label::class, 'node_id');
    }
}

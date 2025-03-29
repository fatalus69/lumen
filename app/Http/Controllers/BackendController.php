<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Node;
use Illuminate\Support\Facades\Auth;

class BackendController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('lumen.core.backend.index');
    }

    public function contentIndex()
    {
        return view('lumen.core.backend.content.index');
    }

    public function contentCreate()
    {
        return view('lumen.core.backend.content.create');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $post = new Node();
        //todo: validate $request
        $post->title = $request->input('title');
        $post->slug = $request->input('slug');
        $post->content = $request->input('content');
        $post->active = $request->input('active', true);
        $post->author = Auth::id();

        $post->save();

        return redirect()->route('backend.content.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

<?php

namespace App\Http\Controllers\Lumen\Core;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Node;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Lumen\Core\StoreNodeRequest;

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
    public function store(StoreNodeRequest $request)
    {
        $node = new Node();
        //todo: validate $request
        $node->title = $request->input('title');
        $node->slug = $request->input('slug');
        $node->content = $request->input('content');
        $node->active = $request->input('active', true);
        $node->author = Auth::id();

        $node->save();

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

@extends('lumen.core.layout.app')
@section('title', 'Create Post')
@section('content')
    <h1>Create a new Post</h1>
    <form method="POST" action="{{ route('backend.content.store') }}">
        @csrf
        <div>
            <label for="title">Title:</label>
            <input type="text" id="title" name="title" required>
        </div>
        <div>
            <label for="content">Content:</label>
            <textarea id="content" name="content" required></textarea>
        </div>
        <button type="submit">Create Post</button>
    </form>
    <a href="{{ route('backend.content.index') }}">Back to Posts</a>
@endsection
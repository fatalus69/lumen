@extends('lumen.core.layout.app')
@section('title', 'Create Post')
@section('content')
    <h1 class="lumen-primary-header">Create a new Post</h1>
    <a href="{{ route('backend.content.index') }}" class="lumen-link">Back to Posts</a>
    <form method="POST" action="{{ route('backend.content.store') }}" class="flex-col">
        @csrf
        <div class="lumen-flex-col">
            <label for="title">Title:
                <span class="lumen-required-text">*</span>
            </label>
            <input type="text" class="lumen-node-textinput" name="title" required>
        </div class="lumen-flex-col">
        <div class="lumen-flex-col">
            <label for="slug">Slug:</label>
            <input type="text" class="lumen-node-textinput" name="slug">
        </div>
        <div class="lumen-flex-col">
            <label for="content">Content:
                <span class="lumen-required-text">*</span>
            </label>
            <textarea class="lumen-node-textarea" name="content"></textarea>
        </div>
        <div class="lumen-flex-row">
            <input type="checkbox" name="active" class="lumen-node-checkbox">
            <label for="active">Publish</label>
        </div>
        <button class="lumen-save-btn" type="submit">Create Post</button>
    </form>
@endsection
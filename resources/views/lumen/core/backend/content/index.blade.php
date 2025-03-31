@extends('lumen.core.layout.app')
@section('title', 'Backend Index')
@section('header')
    <ul>
        <li><a href="{{ route('backend.content.index') }}" class="lumen-link">Content</a></li>
        {{-- <li><a href="{{ route('configuration.index') }}">Configuration</a></li>
        <li><a href="{{ route('users.index') }}">Users</a></li> --}}
    </ul>
@endsection
@section('content')

    Lists posts here please


    <a href="{{ route('backend.content.create') }}" class="lumen-link">Create a new Post</a>
@endsection
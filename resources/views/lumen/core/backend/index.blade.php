@extends('lumen.core.layout.app')
@section('title', 'Backend Index')
@section('header')
    <ul>
        <li><a href="{{ route('backend.content.index') }}">Content</a></li>
        {{-- <li><a href="{{ route('configuration.index') }}">Configuration</a></li>
        <li><a href="{{ route('users.index') }}">Users</a></li> --}}
    </ul>
@endsection

@section('content')
HI From the backend's main page
@endsection
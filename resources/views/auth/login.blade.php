@extends('layout.app')

<form method="POST" action="{{ route('auth.login') }}">
    @csrf
    <input type="text" name="username" placeholder="Username" required>
    <input type="email" name="email" placeholder="Email" required>
    <input type="password" name="password" placeholder="Password" required>
    <input type="hidden" name="url_from" value="{{ url()->previous() }}">
    <button type="submit">Login</button>
</form>
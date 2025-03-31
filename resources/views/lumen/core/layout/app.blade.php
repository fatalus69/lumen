<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta name="description" content="@yield('description', 'Default description')">
        <meta name="keywords" content="@yield('keywords', 'Default keywords')">
        <title>@yield('title')</title>
        @vite(['resources/js/app.js', 'resources/css/app.css'])
    </head>
    <header>
        @yield('header')
    </header>
    <body>
        <div class="lumen-container">
            @yield('content')
        </div>
        <script type="text/javascript" src="{{ asset('js/app.js') }}"></script>
    </body>
    <footer>
        @yield('footer')
    </footer>
    @yield('before-scripts-end')
    <script></script>
    @yield('after-scripts-end')
</html>

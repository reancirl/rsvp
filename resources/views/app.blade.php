<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';

                if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                    if (prefersDark) {
                        document.documentElement.classList.add('dark');
                    }
                }
            })();
        </script>

        {{-- Inline style to set the HTML background color based on our theme in app.css --}}
        <style>
            html {
                background-color: #f3ece7;
            }

            html.dark {
                background-color: #f3ece7;
            }

            #app-loader {
                position: fixed;
                inset: 0;
                z-index: 9999;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 1.25rem;
                background-color: #f3ece7;
                color: #1b1b18;
                transition: opacity 600ms ease;
            }

            #app-loader.is-hidden {
                opacity: 0;
                pointer-events: none;
            }

            #app-loader .fmn-stage {
                position: relative;
                width: 140px;
                height: 140px;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: fmn-float 3.6s ease-in-out infinite;
            }

            #app-loader .fmn-glow {
                position: absolute;
                inset: 0;
                border-radius: 50%;
                background: radial-gradient(closest-side, rgba(166,188,220,0.35), rgba(166,188,220,0));
                animation: fmn-pulse 2.4s ease-in-out infinite;
            }

            #app-loader .fmn-flower {
                width: 110px;
                height: 110px;
                animation: fmn-spin 4.2s linear infinite;
                transform-origin: center;
            }

            #app-loader .fmn-flower .petals {
                transform-origin: center;
                animation: fmn-breathe 2.4s ease-in-out infinite;
            }

            #app-loader .fmn-label {
                font-family: 'Italianno', 'Cormorant Garamond', serif;
                font-size: 2rem;
                letter-spacing: 0.02em;
                color: #1b1b18;
                opacity: 0;
                animation: fmn-fadein 1.2s ease-out 0.4s forwards;
            }

            #app-loader .fmn-tagline {
                margin-top: 0.25rem;
                font-family: 'Cormorant Garamond', serif;
                font-size: 0.7rem;
                letter-spacing: 0.4em;
                text-transform: uppercase;
                color: rgba(27,27,24,0.55);
                opacity: 0;
                animation: fmn-fadein 1.2s ease-out 0.9s forwards;
            }

            @keyframes fmn-spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }

            @keyframes fmn-breathe {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(0.9); }
            }

            @keyframes fmn-float {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-8px); }
            }

            @keyframes fmn-pulse {
                0%, 100% { transform: scale(1); opacity: 0.6; }
                50% { transform: scale(1.25); opacity: 1; }
            }

            @keyframes fmn-fadein {
                from { opacity: 0; transform: translateY(6px); }
                to { opacity: 1; transform: translateY(0); }
            }
        </style>

        <link
            href="https://fonts.googleapis.com/css2?family=Italianno&display=swap"
            rel="stylesheet"
        />

        <link rel="icon" href="/favicon.ico" sizes="any">
        <link rel="icon" href="/favicon.svg" type="image/svg+xml">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">

        @fonts

        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        <x-inertia::head>
            <title>{{ config('app.name', 'Laravel') }}</title>
        </x-inertia::head>
    </head>
    <body class="font-sans antialiased">
        <div id="app-loader" aria-hidden="true">
            <div class="fmn-stage">
                <div class="fmn-glow"></div>
            <svg class="fmn-flower" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="loader-petal" cx="50%" cy="50%" r="60%">
                        <stop offset="0%" stop-color="#cad9ee"/>
                        <stop offset="55%" stop-color="#a6bcdc"/>
                        <stop offset="100%" stop-color="#7d99c4"/>
                    </radialGradient>
                    <radialGradient id="loader-center" cx="50%" cy="50%" r="60%">
                        <stop offset="0%" stop-color="#f4d97a"/>
                        <stop offset="70%" stop-color="#d9a83a"/>
                        <stop offset="100%" stop-color="#7a5212"/>
                    </radialGradient>
                </defs>
                <g transform="translate(32 32)">
                    <g class="petals">
                        <ellipse cx="0" cy="-16" rx="11" ry="14" fill="url(#loader-petal)"/>
                        <ellipse cx="0" cy="-16" rx="11" ry="14" fill="url(#loader-petal)" transform="rotate(72)"/>
                        <ellipse cx="0" cy="-16" rx="11" ry="14" fill="url(#loader-petal)" transform="rotate(144)"/>
                        <ellipse cx="0" cy="-16" rx="11" ry="14" fill="url(#loader-petal)" transform="rotate(216)"/>
                        <ellipse cx="0" cy="-16" rx="11" ry="14" fill="url(#loader-petal)" transform="rotate(288)"/>
                    </g>
                    <circle r="6" fill="url(#loader-center)"/>
                    <circle r="2.5" fill="#3a2706" opacity="0.55"/>
                </g>
            </svg>
            </div>
            <p class="fmn-label">Reancirl &amp; Chermae</p>
            <p class="fmn-tagline">June 1, 2026 · Iligan City</p>
        </div>
        <script>
            (function () {
                var hideLoader = function () {
                    var el = document.getElementById('app-loader');
                    if (!el) return;
                    el.classList.add('is-hidden');
                    setTimeout(function () {
                        if (el.parentNode) el.parentNode.removeChild(el);
                    }, 700);
                };
                if (document.readyState === 'complete') {
                    setTimeout(hideLoader, 2400);
                } else {
                    window.addEventListener('load', function () {
                        setTimeout(hideLoader, 2400);
                    });
                }
            })();
        </script>
        <x-inertia::app />
    </body>
</html>

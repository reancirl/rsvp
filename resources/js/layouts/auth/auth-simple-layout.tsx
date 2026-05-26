import { Head, Link } from '@inertiajs/react';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin=""
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Cormorant:wght@300;400;500&family=Italianno&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&display=swap"
                    rel="stylesheet"
                />
            </Head>

            <div className="relative min-h-svh w-full overflow-hidden bg-[#f3ece7] text-[#1b1b18]">
                <img
                    src="/forget-me-nots.jpg"
                    alt=""
                    aria-hidden="true"
                    className="pointer-events-none absolute top-0 right-0 w-[55%] max-w-[420px] -translate-y-[18%] translate-x-[10%] mix-blend-darken select-none sm:w-[40%] lg:w-[32%]"
                />
                <img
                    src="/forget-me-nots.jpg"
                    alt=""
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-0 left-0 w-[45%] max-w-[360px] translate-y-[18%] -translate-x-[12%] -scale-x-100 mix-blend-darken select-none sm:w-[32%] lg:w-[26%]"
                />

                <main className="relative z-10 mx-auto flex min-h-svh w-full max-w-md flex-col items-center justify-center px-8 py-12">
                    <Link
                        href={home()}
                        className="block text-center"
                        aria-label="Reancirl & Chermae"
                    >
                        <span
                            className="block text-5xl leading-none text-[#1b1b18]"
                            style={{ fontFamily: "'Italianno', cursive" }}
                        >
                            Reancirl &amp; Chermae
                        </span>
                        <span
                            className="mt-3 block text-[0.65rem] tracking-[0.4em] text-[#1b1b18]/55 uppercase"
                            style={{ fontFamily: "'Cormorant Garamond', serif" }}
                        >
                            June 1, 2026 · Iligan City
                        </span>
                    </Link>

                    <div
                        className="mt-10 w-full text-center"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                        <h1 className="text-2xl tracking-wide text-[#1b1b18] uppercase">
                            {title}
                        </h1>
                        {description && (
                            <p className="mt-2 text-sm tracking-[0.15em] text-[#1b1b18]/65 uppercase">
                                {description}
                            </p>
                        )}
                    </div>

                    <div className="mt-8 w-full">{children}</div>
                </main>
            </div>
        </>
    );
}

import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard } from '@/routes';

export default function Welcome() {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Reancirl & Chermae · June 1, 2026">
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

            <div className="relative min-h-screen w-full overflow-hidden bg-[#f3ece7] text-[#1b1b18]">
                {auth.user && (
                    <header className="absolute top-0 right-0 left-0 z-20 flex justify-end p-5 text-xs tracking-[0.2em] uppercase">
                        <Link
                            href={dashboard()}
                            className="rounded-full border border-[#1b1b18]/20 px-4 py-1.5 text-[#1b1b18] transition hover:border-[#1b1b18]/60"
                        >
                            Dashboard
                        </Link>
                    </header>
                )}

                <main className="relative mx-auto flex min-h-screen w-full max-w-5xl flex-col px-8 pt-20 pb-16 sm:px-16 sm:pt-24 lg:px-24">
                    <img
                        src="/forget-me-nots.jpg"
                        alt=""
                        aria-hidden="true"
                        className="pointer-events-none absolute top-0 right-0 w-[70%] max-w-[620px] -translate-y-[22%] translate-x-[6%] mix-blend-darken select-none sm:w-[58%] lg:w-[52%]"
                    />

                    <div
                        className="relative z-10 mt-20 flex flex-col items-start sm:mt-28 lg:mt-32"
                        style={{ fontFamily: "'Cormorant', serif" }}
                    >
                        <h1 className="text-[15vw] leading-[0.95] font-light tracking-[0.06em] sm:text-[7.5rem] lg:text-[8.5rem]">
                            REANCIRL
                        </h1>
                        <span
                            className="-mt-1 ml-6 text-[3rem] leading-none font-normal sm:ml-12 sm:text-[4.5rem]"
                            style={{ fontFamily: "'Italianno', cursive" }}
                        >
                            and
                        </span>
                        <h1 className="ml-3 text-[15vw] leading-[0.95] font-light tracking-[0.06em] sm:ml-6 sm:text-[7.5rem] lg:text-[8.5rem]">
                            CHERMAE
                        </h1>
                    </div>

                    <section
                        className="relative z-10 mt-8 max-w-2xl space-y-6 text-sm leading-relaxed tracking-[0.15em] uppercase sm:mt-10 sm:text-[0.95rem]"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                        <p>
                            Request the honour of your presence at the
                            celebration of our wedding
                        </p>

                        <div className="space-y-1">
                            <p className="text-lg sm:text-xl">
                                June 1, 2026 (Monday)
                            </p>
                            <p>Ceremony Time: 7:30 AM</p>
                        </div>

                        <div className="space-y-1">
                            <p className="text-base sm:text-lg">
                                Alan Sr. Caprice Residences
                            </p>
                            <p>61 Venus Street, Rabago Subdivision</p>
                            <p>Barangay Villaverde, Iligan City</p>
                        </div>
                    </section>

                    <footer
                        className="relative z-10 mt-auto pt-20 text-center"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                        <p className="flex flex-wrap items-center justify-center gap-3 text-base tracking-[0.25em] uppercase sm:text-lg">
                            <span className="font-medium">Motif:</span>
                            <span
                                className="text-[#d4a93b]"
                                style={{
                                    fontFamily: "'Italianno', cursive",
                                    fontSize: '2em',
                                    textTransform: 'none',
                                    letterSpacing: 'normal',
                                    lineHeight: 1,
                                }}
                            >
                                Light Yellow
                            </span>
                            <span className="text-[#1b1b18]/70">&amp;</span>
                            <span
                                className="text-[#7d9bc8]"
                                style={{
                                    fontFamily: "'Italianno', cursive",
                                    fontSize: '2em',
                                    textTransform: 'none',
                                    letterSpacing: 'normal',
                                    lineHeight: 1,
                                }}
                            >
                                Sky Blue
                            </span>
                        </p>
                    </footer>
                </main>
            </div>
        </>
    );
}

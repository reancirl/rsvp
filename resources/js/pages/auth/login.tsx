import { Form, Head, Link } from '@inertiajs/react';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

type Props = {
    status?: string;
    canResetPassword: boolean;
};

export default function Login({ status, canResetPassword }: Props) {
    return (
        <>
            <Head title="Log in" />

            {status && (
                <div
                    className="mb-6 rounded-md border border-green-700/30 bg-green-50/70 px-4 py-2 text-center text-sm tracking-wide text-green-800"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                    {status}
                </div>
            )}

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="space-y-7"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
                {({ processing, errors }) => (
                    <>
                        <div className="space-y-2">
                            <label
                                htmlFor="email"
                                className="block text-xs tracking-[0.25em] text-[#1b1b18]/80 uppercase"
                            >
                                Email address
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="email"
                                placeholder="you@example.com"
                                className="block w-full border-0 border-b border-[#1b1b18]/30 bg-transparent px-0 py-2 text-base text-[#1b1b18] placeholder-[#1b1b18]/30 focus:border-[#1b1b18] focus:ring-0 focus:outline-none"
                            />
                            {errors.email && (
                                <p className="text-xs tracking-[0.15em] text-red-700 uppercase">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="text-xs tracking-[0.25em] text-[#1b1b18]/80 uppercase"
                                >
                                    Password
                                </label>
                                {canResetPassword && (
                                    <Link
                                        href={request()}
                                        tabIndex={5}
                                        className="text-[0.7rem] tracking-[0.15em] text-[#1b1b18]/60 uppercase underline-offset-4 transition hover:text-[#1b1b18] hover:underline"
                                    >
                                        Forgot password?
                                    </Link>
                                )}
                            </div>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                required
                                tabIndex={2}
                                autoComplete="current-password"
                                placeholder="••••••••"
                                className="block w-full border-0 border-b border-[#1b1b18]/30 bg-transparent px-0 py-2 text-base text-[#1b1b18] placeholder-[#1b1b18]/30 focus:border-[#1b1b18] focus:ring-0 focus:outline-none"
                            />
                            {errors.password && (
                                <p className="text-xs tracking-[0.15em] text-red-700 uppercase">
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        <label className="flex cursor-pointer items-center gap-3 text-xs tracking-[0.2em] text-[#1b1b18]/75 uppercase">
                            <input
                                type="checkbox"
                                name="remember"
                                tabIndex={3}
                                className="h-4 w-4 cursor-pointer rounded border-[#1b1b18]/40 bg-transparent text-[#1b1b18] focus:ring-1 focus:ring-[#1b1b18]/40"
                            />
                            Remember me
                        </label>

                        <div className="pt-2 text-center">
                            <button
                                type="submit"
                                tabIndex={4}
                                disabled={processing}
                                data-test="login-button"
                                className="w-full rounded-full border border-[#1b1b18] bg-[#1b1b18] px-10 py-3 text-xs tracking-[0.3em] text-[#f3ece7] uppercase transition hover:bg-transparent hover:text-[#1b1b18] disabled:opacity-60"
                            >
                                {processing ? 'Signing in…' : 'Log in'}
                            </button>
                        </div>
                    </>
                )}
            </Form>
        </>
    );
}

Login.layout = {
    title: 'Welcome back',
    description: 'Sign in to view the RSVP responses',
};

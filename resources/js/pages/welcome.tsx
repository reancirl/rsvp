import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEvent, useState } from 'react';
import { store as storeRsvp } from '@/actions/App/Http/Controllers/RsvpController';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { dashboard } from '@/routes';

type RsvpFormData = {
    name: string;
    attending_wedding: '' | '1' | '0';
    attending_church_service: '' | '1' | '0';
};

export default function Welcome() {
    const { auth } = usePage().props;

    const [successOpen, setSuccessOpen] = useState(false);
    const [entourageOpen, setEntourageOpen] = useState(false);

    const form = useForm<RsvpFormData>({
        name: '',
        attending_wedding: '',
        attending_church_service: '',
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        form.post(storeRsvp().url, {
            preserveScroll: true,
            onSuccess: () => {
                form.reset();
                setSuccessOpen(true);
            },
        });
    };

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
                    href="https://fonts.googleapis.com/css2?family=Cormorant:wght@300;400;500&family=Italianno&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Tenor+Sans&display=swap"
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
                        className="relative z-10 mt-8 max-w-2xl space-y-6 text-sm leading-relaxed tracking-[0.18em] uppercase sm:mt-10 sm:text-[0.95rem]"
                        style={{ fontFamily: "'Tenor Sans', serif" }}
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

                        <div className="pt-2">
                            <button
                                type="button"
                                onClick={() => setEntourageOpen(true)}
                                className="rounded-full border border-[#1b1b18] px-8 py-2.5 text-xs tracking-[0.3em] text-[#1b1b18] uppercase transition hover:bg-[#1b1b18] hover:text-[#f3ece7]"
                            >
                                View Entourage
                            </button>
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

                        <RsvpForm form={form} onSubmit={handleSubmit} />
                    </footer>
                </main>

                <EntourageDialog
                    open={entourageOpen}
                    onOpenChange={setEntourageOpen}
                />

                <Dialog open={successOpen} onOpenChange={setSuccessOpen}>
                    <DialogContent
                        className="border-[#1b1b18]/15 bg-[#f3ece7] sm:max-w-md"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                        <DialogHeader className="text-center sm:text-center">
                            <DialogTitle
                                className="text-center text-5xl font-normal text-[#1b1b18] sm:text-6xl"
                                style={{ fontFamily: "'Italianno', cursive" }}
                            >
                                Success!
                            </DialogTitle>
                            <DialogDescription className="text-center text-sm tracking-[0.25em] text-[#1b1b18]/80 uppercase">
                                See you on our wedding day
                            </DialogDescription>
                        </DialogHeader>

                        <div className="mt-2 border-t border-[#1b1b18]/15 pt-5 text-center text-[0.95rem] leading-relaxed tracking-wide text-[#1b1b18]/85">
                            For the church service, guests may wear any
                            church-appropriate outfit.
                        </div>

                        <div className="mt-2 text-center">
                            <button
                                type="button"
                                onClick={() => setSuccessOpen(false)}
                                className="rounded-full border border-[#1b1b18] bg-[#1b1b18] px-8 py-2.5 text-xs tracking-[0.3em] text-[#f3ece7] uppercase transition hover:bg-transparent hover:text-[#1b1b18]"
                            >
                                Close
                            </button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
}

type RsvpFormProps = {
    form: ReturnType<typeof useForm<RsvpFormData>>;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

function RsvpForm({ form, onSubmit }: RsvpFormProps) {
    const { data, setData, processing, errors } = form;

    return (
        <form
            onSubmit={onSubmit}
            className="mx-auto mt-16 max-w-xl space-y-8 text-left"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
            <header className="text-center">
                <p
                    className="text-3xl text-[#1b1b18] sm:text-4xl"
                    style={{ fontFamily: "'Italianno', cursive" }}
                >
                    Kindly respond
                </p>
            </header>

            <YesNoField
                label="Will attend the wedding ceremony"
                name="attending_wedding"
                value={data.attending_wedding}
                onChange={(value) => setData('attending_wedding', value)}
                error={errors.attending_wedding}
            />

            <div className="space-y-2">
                <label
                    htmlFor="rsvp-name"
                    className="block text-xs tracking-[0.25em] text-[#1b1b18]/80 uppercase"
                >
                    Name
                </label>
                <input
                    id="rsvp-name"
                    type="text"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    autoComplete="name"
                    className="block w-full border-0 border-b border-[#1b1b18]/30 bg-transparent px-0 py-2 text-base text-[#1b1b18] placeholder-[#1b1b18]/30 focus:border-[#1b1b18] focus:ring-0 focus:outline-none"
                />
                {errors.name && (
                    <p className="text-xs tracking-[0.15em] text-red-700 uppercase">
                        {errors.name}
                    </p>
                )}
            </div>

            <div
                className="space-y-4 rounded-2xl border border-[#1b1b18]/15 bg-white/30 px-6 py-7 text-center sm:px-8"
                style={{ fontFamily: "'Tenor Sans', serif" }}
            >
                <p className="text-xs tracking-[0.3em] text-[#1b1b18] uppercase sm:text-sm">
                    You are invited to join us
                </p>
                <p className="text-[0.78rem] leading-relaxed tracking-[0.18em] text-[#1b1b18]/85 uppercase sm:text-[0.85rem]">
                    As our marriage is centered on Jesus Christ, we would like
                    to begin this celebration first in church, together in
                    worship and thanksgiving before our wedding day.
                </p>
                <div className="space-y-1 pt-1 tracking-[0.18em] uppercase">
                    <p className="text-base sm:text-lg">
                        At 8:30 AM, 31 May 2026
                    </p>
                    <p className="text-xs text-[#1b1b18]/80 sm:text-[0.85rem]">
                        6th Floor, Grand Berlin Hall, Plaza Alemania, Iligan
                        City
                    </p>
                </div>
                <p
                    className="pt-2 text-xs tracking-[0.15em] text-[#1b1b18]/65 normal-case sm:text-sm"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                    Guests may wear any church-appropriate attire.
                </p>
            </div>

            <YesNoField
                label="Will join the church service before the wedding day"
                name="attending_church_service"
                value={data.attending_church_service}
                onChange={(value) =>
                    setData('attending_church_service', value)
                }
                error={errors.attending_church_service}
            />

            <div className="pt-2 text-center">
                <button
                    type="submit"
                    disabled={processing}
                    className="rounded-full border border-[#1b1b18] bg-[#1b1b18] px-10 py-3 text-xs tracking-[0.3em] text-[#f3ece7] uppercase transition hover:bg-transparent hover:text-[#1b1b18] disabled:opacity-60"
                >
                    {processing ? 'Sending…' : 'Send RSVP'}
                </button>
            </div>
        </form>
    );
}

type YesNoFieldProps = {
    label: string;
    name: string;
    value: '' | '1' | '0';
    onChange: (value: '1' | '0') => void;
    error?: string;
};

function YesNoField({ label, name, value, onChange, error }: YesNoFieldProps) {
    return (
        <fieldset className="space-y-3">
            <legend className="block text-xs tracking-[0.25em] text-[#1b1b18]/80 uppercase">
                {label}
            </legend>
            <div className="flex items-center gap-3">
                {[
                    { v: '1' as const, label: 'Yes' },
                    { v: '0' as const, label: 'No' },
                ].map((opt) => {
                    const selected = value === opt.v;
                    return (
                        <label
                            key={opt.v}
                            className={`flex-1 cursor-pointer rounded-full border px-6 py-2.5 text-center text-xs tracking-[0.25em] uppercase transition ${
                                selected
                                    ? 'border-[#1b1b18] bg-[#1b1b18] text-[#f3ece7]'
                                    : 'border-[#1b1b18]/30 text-[#1b1b18]/70 hover:border-[#1b1b18]/60'
                            }`}
                        >
                            <input
                                type="radio"
                                name={name}
                                value={opt.v}
                                checked={selected}
                                onChange={() => onChange(opt.v)}
                                className="sr-only"
                            />
                            {opt.label}
                        </label>
                    );
                })}
            </div>
            {error && (
                <p className="text-xs tracking-[0.15em] text-red-700 uppercase">
                    {error}
                </p>
            )}
        </fieldset>
    );
}

type EntourageDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

type EntourageEntry = string | [string, string] | [string, string, string];

type EntourageSection = {
    title: string;
    entries: EntourageEntry[];
    layout?: 'single' | 'pairs';
};

const entourageSections: EntourageSection[] = [
    {
        title: 'The Couple',
        entries: [
            ['Bride', 'Chermae L. Anobling'],
            ['Groom', 'Reancirl C. Balaba'],
        ],
    },
    {
        title: 'Pastors',
        entries: ['Bayani Areola', 'Anjie Areola'],
    },
    {
        title: 'Officiating Pastor',
        entries: ['To be announced'],
    },
    {
        title: 'Parents of the Bride',
        entries: ['Artcher O. Anobling', 'Lota Mae L. Anobling'],
    },
    {
        title: 'Parents of the Groom',
        entries: ['Florencio R. Balaba', 'Charissa Janen C. Balaba'],
    },
    {
        title: 'Siblings',
        entries: ['Jude Miguel C. Balaba', 'Zaphy L. Anobling'],
    },
    {
        title: 'Best Man',
        entries: ['Jaeric Miguel C. Balaba'],
    },
    {
        title: 'Maid of Honor',
        entries: ['Charmine L. Magbanua'],
    },
    {
        title: 'Grandparents',
        entries: ['Teresita C. Ces'],
    },
    {
        title: 'Ring Bearer',
        entries: ['Reondel P. Leong'],
    },
    {
        title: 'Bible Bearer',
        entries: ['Jacob Ryenne C. Taculod'],
    },
    {
        title: 'Coin Bearer',
        entries: ['Mahkou M. Anobling'],
    },
    {
        title: 'Flower Girls',
        entries: [
            'Ariane Tj E. Obedencio',
            'Bethel Praise T. Golosino',
            'Mahky M. Anobling',
            'Ciara Bryn A. Magbanua',
        ],
    },
    {
        title: 'Candle Sponsors',
        layout: 'pairs',
        entries: [['Dilliam B. Pabelonio Jr.', 'Katrina F. Pabelonio']],
    },
    {
        title: 'Cord Sponsors',
        layout: 'pairs',
        entries: [['Sheindy N. Bote', 'John Michael A. Bote']],
    },
    {
        title: 'Veil Sponsors',
        layout: 'pairs',
        entries: [['Aljonmar B. Golosino', 'Riza Jane T. Golosino']],
    },
    {
        title: 'Worship Team',
        entries: [
            'Joshua N. Navarro',
            'Jay Sayde Mendoza',
            'Serge Elmedulan',
            'Jerome Q. Pingkian',
            'Adrian Niel A. Macalisang',
            'Joshua Suico',
            'Jaybe Joromo',
        ],
    },
    {
        title: 'Principal Sponsors',
        layout: 'pairs',
        entries: [
            ['Mr. Jay C. Ces', 'Mrs. Meridith M. Ces'],
            ['Mr. Freddie Castelo', 'Mrs. Jerah Mae C. Castelo'],
            ['Mr. Dexter Largo', 'Mrs. Joy C. Largo'],
            ['Mr. Ryan Taculod', 'Mrs. Jenny Rose C. Taculod'],
            ['Mr. Elton John Tan', 'Mrs. Shennie E. Tan'],
            ['', 'Mrs. Melchora B. Lector'],
            ['Mr. Veronico Balaba', 'Mrs. Jona Balaba'],
            ['Mr. Ritche Niñal', 'Mrs. Cristina B. Niñal'],
            ['', 'Mrs. Guillerma B. Gagate'],
            ['', 'Mrs. Neneth Novino'],
            ['Mr. Sevirino Balaba', 'Mrs. Balaba'],
            ['Mr. Gilbert Balaba', 'Mrs. Marciana Jorolan'],
            ['Mr. Sonny Tiu', 'Mrs. Melanie Tiu'],
            ['', 'Ms. Divina Resurreccion'],
            ['', 'Ms. Chichi Manansala'],
            ['', 'Ms. Mae Mary Ann Erat'],
            ['', 'Ms. Charm Copreros'],
            ['Mr. Sherwin Bado', 'Mrs. Mitzie Bado'],
            ['Mr. Jun Villanura', 'Mrs. Elaine Villanura'],
            ['Mr. Glucie B. Villaruel', 'Mrs. Jarell Villaruel'],
            ['Mr. Rodel L. Leong', 'Mrs. Apol Jean P. Leong'],
            ['Mr. Ronilo T. Desucatan', 'Ms. Clerdilyn L. Leong'],
            ['Mr. Arnold O. Anobling', 'Mrs. Marilyn M. Anobling'],
            ['Mr. Mark Anthony O. Anobling', 'Mrs. Malou M. Anobling'],
            ['Mr. Ariel O. Anobling', 'Mrs. Charlyn Diones M. Anobling'],
            ['Mr. Alan S. Pangarungan', 'Mrs. Star S. Pangarungan'],
            ['Mr. Marjun G. Yabo', 'Mrs. Yabo'],
            ['Hermogenes D. Wapin', 'Mrs. Joyce B. Wapin'],
            ['Mr. Ruben C. Rojo', 'Mrs. Helen A. Rojo'],
            ['Mr. Nellin C. Macalisang', 'Mrs. Merryan A. Macalisang'],
            ['Mr. Roland B. Ruiz', 'Mrs. Erlyn C. Ruiz'],
            ['Mr. Kyle T. Noval', 'Mrs. Jill S. Noval'],
        ],
    },
];

function EntourageDialog({ open, onOpenChange }: EntourageDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="max-h-[90vh] overflow-y-auto border-[#1b1b18]/15 bg-[#f3ece7] sm:max-w-2xl"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
                <DialogHeader className="text-center sm:text-center">
                    <DialogTitle
                        className="text-center text-5xl font-normal text-[#1b1b18] sm:text-6xl"
                        style={{ fontFamily: "'Italianno', cursive" }}
                    >
                        The Entourage
                    </DialogTitle>
                    <DialogDescription className="text-center text-xs tracking-[0.25em] text-[#1b1b18]/80 uppercase sm:text-sm">
                        With gratitude to those joining us
                    </DialogDescription>
                </DialogHeader>

                <div className="mt-4 space-y-8 border-t border-[#1b1b18]/15 pt-6">
                    {entourageSections.map((section) => (
                        <EntourageSectionBlock
                            key={section.title}
                            section={section}
                        />
                    ))}
                </div>

                <div className="mt-4 text-center">
                    <button
                        type="button"
                        onClick={() => onOpenChange(false)}
                        className="rounded-full border border-[#1b1b18] bg-[#1b1b18] px-8 py-2.5 text-xs tracking-[0.3em] text-[#f3ece7] uppercase transition hover:bg-transparent hover:text-[#1b1b18]"
                    >
                        Close
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

function EntourageSectionBlock({ section }: { section: EntourageSection }) {
    return (
        <section className="space-y-3 text-center">
            <h3
                className="text-xs tracking-[0.35em] text-[#1b1b18] uppercase sm:text-sm"
                style={{ fontFamily: "'Tenor Sans', serif" }}
            >
                {section.title}
            </h3>
            {section.layout === 'pairs' ? (
                <ul className="space-y-2 text-[0.95rem] text-[#1b1b18]/90 sm:text-base">
                    {section.entries.map((entry, idx) => {
                        const pair = Array.isArray(entry)
                            ? entry
                            : [entry, ''];
                        return (
                            <li
                                key={idx}
                                className="grid grid-cols-1 gap-1 sm:grid-cols-2 sm:gap-6"
                            >
                                <span className="sm:text-right">
                                    {pair[0] || ' '}
                                </span>
                                <span className="sm:text-left">
                                    {pair[1] || ' '}
                                </span>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <ul className="space-y-1 text-[0.95rem] text-[#1b1b18]/90 sm:text-base">
                    {section.entries.map((entry, idx) => (
                        <li key={idx}>
                            {typeof entry === 'string'
                                ? entry
                                : entry.filter(Boolean).join(' · ')}
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}

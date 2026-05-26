import { Head } from '@inertiajs/react';
import { dashboard } from '@/routes';

type Rsvp = {
    id: number;
    name: string;
    attending_wedding: boolean;
    attending_church_service: boolean;
    created_at: string | null;
};

type Stats = {
    total: number;
    attending_wedding: number;
    attending_church: number;
};

type Props = {
    rsvps: Rsvp[];
    stats: Stats;
};

export default function Dashboard({ rsvps, stats }: Props) {
    return (
        <>
            <Head title="RSVPs" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <StatCard label="Total responses" value={stats.total} />
                    <StatCard
                        label="Attending wedding"
                        value={stats.attending_wedding}
                        accent="green"
                    />
                    <StatCard
                        label="Attending church service"
                        value={stats.attending_church}
                        accent="blue"
                    />
                </div>

                <div className="rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                    <div className="border-b border-sidebar-border/70 px-5 py-4 dark:border-sidebar-border">
                        <h2 className="text-base font-medium">Responses</h2>
                        <p className="text-sm text-muted-foreground">
                            Guest answers to the wedding ceremony and church
                            service questions
                        </p>
                    </div>

                    {rsvps.length === 0 ? (
                        <div className="px-5 py-12 text-center text-sm text-muted-foreground">
                            No responses yet.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="text-left text-xs text-muted-foreground uppercase">
                                    <tr className="border-b border-sidebar-border/70 dark:border-sidebar-border">
                                        <th className="px-5 py-3 font-medium">
                                            Name
                                        </th>
                                        <th className="px-5 py-3 font-medium">
                                            Wedding ceremony
                                        </th>
                                        <th className="px-5 py-3 font-medium">
                                            Church service
                                        </th>
                                        <th className="px-5 py-3 font-medium">
                                            Submitted
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rsvps.map((rsvp) => (
                                        <tr
                                            key={rsvp.id}
                                            className="border-b border-sidebar-border/40 last:border-0 dark:border-sidebar-border"
                                        >
                                            <td className="px-5 py-3 font-medium">
                                                {rsvp.name}
                                            </td>
                                            <td className="px-5 py-3">
                                                <YesNoBadge
                                                    value={
                                                        rsvp.attending_wedding
                                                    }
                                                />
                                            </td>
                                            <td className="px-5 py-3">
                                                <YesNoBadge
                                                    value={
                                                        rsvp.attending_church_service
                                                    }
                                                />
                                            </td>
                                            <td className="px-5 py-3 text-muted-foreground">
                                                {formatDate(rsvp.created_at)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

function YesNoBadge({ value }: { value: boolean }) {
    if (value) {
        return (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-800 dark:bg-green-900/40 dark:text-green-300">
                <span className="h-1.5 w-1.5 rounded-full bg-green-600 dark:bg-green-400" />
                Yes
            </span>
        );
    }
    return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-2.5 py-1 text-xs font-medium text-red-800 dark:bg-red-900/40 dark:text-red-300">
            <span className="h-1.5 w-1.5 rounded-full bg-red-600 dark:bg-red-400" />
            No
        </span>
    );
}

function StatCard({
    label,
    value,
    accent,
}: {
    label: string;
    value: number;
    accent?: 'green' | 'blue';
}) {
    const accentClass =
        accent === 'green'
            ? 'text-green-700 dark:text-green-300'
            : accent === 'blue'
              ? 'text-blue-700 dark:text-blue-300'
              : 'text-foreground';
    return (
        <div className="rounded-xl border border-sidebar-border/70 p-5 dark:border-sidebar-border">
            <p className="text-xs tracking-wide text-muted-foreground uppercase">
                {label}
            </p>
            <p className={`mt-2 text-3xl font-semibold ${accentClass}`}>
                {value}
            </p>
        </div>
    );
}

function formatDate(iso: string | null) {
    if (!iso) return '—';
    const d = new Date(iso);
    return d.toLocaleString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};

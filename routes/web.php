<?php

use App\Http\Controllers\RsvpController;
use App\Models\Rsvp;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::inertia('/', 'welcome')->name('home');
Route::post('rsvp', [RsvpController::class, 'store'])->name('rsvp.store');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $rsvps = Rsvp::orderByDesc('created_at')->get();

        return Inertia::render('dashboard', [
            'rsvps' => $rsvps->map(fn (Rsvp $r) => [
                'id' => $r->id,
                'name' => $r->name,
                'attending_wedding' => $r->attending_wedding,
                'attending_church_service' => $r->attending_church_service,
                'created_at' => $r->created_at?->toIso8601String(),
            ])->all(),
            'stats' => [
                'total' => $rsvps->count(),
                'attending_wedding' => $rsvps->where('attending_wedding', true)->count(),
                'attending_church' => $rsvps->where('attending_church_service', true)->count(),
            ],
        ]);
    })->name('dashboard');
});

require __DIR__.'/settings.php';

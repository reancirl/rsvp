<?php

namespace Tests\Feature;

use App\Models\Rsvp;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RsvpStoreTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_can_submit_an_rsvp(): void
    {
        $response = $this->post(route('rsvp.store'), [
            'name' => 'Jane Doe',
            'attending_wedding' => '1',
            'attending_church_service' => '0',
        ]);

        $response->assertRedirectToRoute('home');

        $this->assertDatabaseCount('rsvps', 1);
        $rsvp = Rsvp::sole();
        $this->assertSame('Jane Doe', $rsvp->name);
        $this->assertTrue($rsvp->attending_wedding);
        $this->assertFalse($rsvp->attending_church_service);
    }

    public function test_name_is_required(): void
    {
        $response = $this->from(route('home'))->post(route('rsvp.store'), [
            'name' => '',
            'attending_wedding' => '1',
            'attending_church_service' => '1',
        ]);

        $response->assertSessionHasErrors('name');
        $this->assertDatabaseCount('rsvps', 0);
    }

    public function test_wedding_attendance_is_required(): void
    {
        $response = $this->from(route('home'))->post(route('rsvp.store'), [
            'name' => 'Jane Doe',
            'attending_church_service' => '1',
        ]);

        $response->assertSessionHasErrors('attending_wedding');
        $this->assertDatabaseCount('rsvps', 0);
    }

    public function test_church_service_attendance_is_required(): void
    {
        $response = $this->from(route('home'))->post(route('rsvp.store'), [
            'name' => 'Jane Doe',
            'attending_wedding' => '1',
        ]);

        $response->assertSessionHasErrors('attending_church_service');
        $this->assertDatabaseCount('rsvps', 0);
    }
}

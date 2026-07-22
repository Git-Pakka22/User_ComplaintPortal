<?php

namespace App\Listeners;

use App\Events\ComplaintSubmitted;
use App\Mail\ComplaintAcknowledgmentMail;
use App\Models\User;
use Illuminate\Support\Facades\Mail;

class SendAcknowledgmentEmails
{
    public function __construct()
    {
        //
    }

    public function handle(ComplaintSubmitted $event): void
    {
        $roles = ['rse', 'sales_head', 'technical_service_head', 'production_head', 'plant_head'];

        $recipients = User::whereIn('role', $roles)->pluck('email');

        foreach ($recipients as $email) {
            Mail::to($email)->send(new ComplaintAcknowledgmentMail($event->complaint));
        }
    }
}
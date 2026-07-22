<?php

namespace App\Mail;

use App\Models\Complaint;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ComplaintAcknowledgmentMail extends Mailable
{
    use Queueable, SerializesModels;

    public Complaint $complaint;

    public function __construct(Complaint $complaint)
    {
        $this->complaint = $complaint;
    }

    public function build()
    {
        return $this->subject("Complaint Acknowledgment - {$this->complaint->tracking_number}")
            ->view('emails.complaint-acknowledgment');
    }
}
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Complaint extends Model
{
    use HasFactory;

    protected $fillable = [
        'tracking_number',
        'invoice_line_item_id',
        'dealer_id',
        'complain_qty_kg',
        'complain_no_of_reels_sheets',
        'visit_required',
        'type_of_complaint',
        'description',
        'status',
    ];

    protected $casts = [
        'type_of_complaint' => 'array', // auto JSON encode/decode
        'visit_required' => 'boolean',
    ];
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($complaint) {
            if (empty($complaint->tracking_number)) {
                $complaint->tracking_number = static::generateTrackingNumber();
            }
        });
    }

    public static function generateTrackingNumber(): string
    {
        do {
            $number = 'CMP-' . date('ymd') . '-' . strtoupper(substr(uniqid(), -5));
        } while (static::where('tracking_number', $number)->exists());

        return $number;
    }

    public function lineItem()
    {
        return $this->belongsTo(InvoiceLineItem::class, 'invoice_line_item_id');
    }

    public function dealer()
    {
        return $this->belongsTo(User::class, 'dealer_id');
    }

    public function attachments()
    {
        return $this->hasMany(ComplaintAttachment::class);
    }
}
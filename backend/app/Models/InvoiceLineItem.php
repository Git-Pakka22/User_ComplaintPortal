<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InvoiceLineItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'invoice_id',
        'product_name',
        'grade',
        'variety',
        'gsm',
        'qty_billed',
        'no_of_reels_sheets',
    ];

    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
    }
}
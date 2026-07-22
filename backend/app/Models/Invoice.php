<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use HasFactory;

    protected $fillable = [
        'invoice_number',
        'dealer_id',
        'dispatch_date',
    ];

    public function dealer()
    {
        return $this->belongsTo(User::class, 'dealer_id');
    }

    public function lineItems()
    {
        return $this->hasMany(InvoiceLineItem::class);
    }
}
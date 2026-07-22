<?php

namespace Database\Seeders;

use App\Models\Invoice;
use App\Models\InvoiceLineItem;
use App\Models\User;
use Illuminate\Database\Seeder;

class InvoiceSeeder extends Seeder
{
    public function run(): void
    {
        $dealer = User::where('email', 'dealer@test.com')->first();

        if (! $dealer) {
            return; // seed RoleUsersSeeder first
        }

        $invoicesData = [
            [
                'invoice_number' => 'INV-1001',
                'dispatch_date' => '2026-06-20',
                'items' => [
                    ['product_name' => 'OBR 65GSM 52CM', 'grade' => 'A', 'variety' => 'OBR', 'gsm' => '65', 'qty_billed' => 2150, 'no_of_reels_sheets' => 40021110],
                    ['product_name' => 'PBB 70GSM 30CM', 'grade' => 'A', 'variety' => 'PBB', 'gsm' => '70', 'qty_billed' => 1870, 'no_of_reels_sheets' => 40020987],
                ],
            ],
            [
                'invoice_number' => 'INV-1002',
                'dispatch_date' => '2026-06-25',
                'items' => [
                    ['product_name' => 'SEP 45GSM 99CM', 'grade' => 'B', 'variety' => 'SEP', 'gsm' => '45', 'qty_billed' => 3060, 'no_of_reels_sheets' => 40019654],
                ],
            ],
        ];

        foreach ($invoicesData as $data) {
            $invoice = Invoice::updateOrCreate(
                ['invoice_number' => $data['invoice_number']],
                [
                    'dealer_id' => $dealer->id,
                    'dispatch_date' => $data['dispatch_date'],
                ]
            );

            foreach ($data['items'] as $item) {
                InvoiceLineItem::updateOrCreate(
                    [
                        'invoice_id' => $invoice->id,
                        'product_name' => $item['product_name'],
                    ],
                    $item
                );
            }
        }
    }
}
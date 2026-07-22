<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    /**
     * List invoices for the logged-in dealer (or all, if requested by staff/admin).
     */
    public function index(Request $request)
    {
        $user = $request->user();

        $query = Invoice::query();

        // Dealers only see their own invoices; other roles can see all (or filter by ?dealer_id=)
        if ($user->role === 'dealer') {
            $query->where('dealer_id', $user->id);
        } elseif ($request->has('dealer_id')) {
            $query->where('dealer_id', $request->dealer_id);
        }

        $invoices = $query->orderBy('dispatch_date', 'desc')->get();

        return response()->json($invoices);
    }

    /**
     * List line items for a specific invoice (read-only fields shown on NewComplaint page).
     */
    public function lineItems(Request $request, Invoice $invoice)
    {
        $user = $request->user();

        // A dealer can only see line items for their own invoice
        if ($user->role === 'dealer' && $invoice->dealer_id !== $user->id) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        return response()->json($invoice->lineItems);
    }
}
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Complaint;
use App\Models\InvoiceLineItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Events\ComplaintSubmitted;

class ComplaintController extends Controller
{
    /**
     * Submit one or more complaint line items in a single request.
     * Each line item becomes its own Complaint row with its own tracking number.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'line_items' => 'required|array|min:1',
            'line_items.*.invoice_line_item_id' => 'required|exists:invoice_line_items,id',
            'line_items.*.complain_qty_kg' => 'required|numeric|min:0',
            'line_items.*.complain_no_of_reels_sheets' => 'nullable|integer',
            'line_items.*.visit_required' => 'required|boolean',
            'line_items.*.type_of_complaint' => 'required|array|min:1',
            'line_items.*.description' => 'nullable|string',
        ]);

        $dealer = $request->user();
        $createdComplaints = [];

        DB::transaction(function () use ($validated, $dealer, &$createdComplaints) {
        foreach ($validated['line_items'] as $item) {
        $complaint = Complaint::create([
            'invoice_line_item_id' => $item['invoice_line_item_id'],
            'dealer_id' => $dealer->id,
            'complain_qty_kg' => $item['complain_qty_kg'],
            'complain_no_of_reels_sheets' => $item['complain_no_of_reels_sheets'] ?? null,
            'visit_required' => $item['visit_required'],
            'type_of_complaint' => $item['type_of_complaint'],
            'description' => $item['description'] ?? null,
            'status' => 'submitted',
        ]);

        $complaint->load('lineItem', 'dealer');
        $createdComplaints[] = $complaint;

        event(new ComplaintSubmitted($complaint));
        }
        });

        return response()->json([
            'message' => count($createdComplaints) . ' complaint(s) submitted successfully',
            'complaints' => $createdComplaints,
        ], 201);
    }

    /**
     * List complaints (dealer sees only their own; other roles see all).
     */
    public function index(Request $request)
    {
        $user = $request->user();

        $query = Complaint::with('lineItem.invoice', 'dealer');

        if ($user->role === 'dealer') {
            $query->where('dealer_id', $user->id);
        }

        return response()->json($query->orderBy('created_at', 'desc')->get());
    }

    /**
     * Show a single complaint by tracking number.
     */
    public function show(Request $request, string $trackingNumber)
    {
        $complaint = Complaint::with('lineItem.invoice', 'dealer', 'attachments')
            ->where('tracking_number', $trackingNumber)
            ->firstOrFail();

        $user = $request->user();
        if ($user->role === 'dealer' && $complaint->dealer_id !== $user->id) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        return response()->json($complaint);
    }
}
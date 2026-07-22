<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
</head>
<body style="font-family: Arial, sans-serif; color: #333;">
    <h2 style="color: #9E1B32;">Complaint Acknowledgment</h2>

    <p>A new complaint has been submitted and requires your attention.</p>

    <table style="border-collapse: collapse; width: 100%; max-width: 500px;">
        <tr>
            <td style="padding: 6px 0; font-weight: bold;">Tracking Number:</td>
            <td style="padding: 6px 0;">{{ $complaint->tracking_number }}</td>
        </tr>
        <tr>
            <td style="padding: 6px 0; font-weight: bold;">Dealer:</td>
            <td style="padding: 6px 0;">{{ $complaint->dealer->name }}</td>
        </tr>
        <tr>
            <td style="padding: 6px 0; font-weight: bold;">Product:</td>
            <td style="padding: 6px 0;">{{ $complaint->lineItem->product_name }}</td>
        </tr>
        <tr>
            <td style="padding: 6px 0; font-weight: bold;">Complained Qty (KG):</td>
            <td style="padding: 6px 0;">{{ $complaint->complain_qty_kg }}</td>
        </tr>
        <tr>
            <td style="padding: 6px 0; font-weight: bold;">Visit Required:</td>
            <td style="padding: 6px 0;">{{ $complaint->visit_required ? 'Yes' : 'No' }}</td>
        </tr>
        <tr>
            <td style="padding: 6px 0; font-weight: bold;">Type of Complaint:</td>
            <td style="padding: 6px 0;">{{ implode(', ', $complaint->type_of_complaint) }}</td>
        </tr>
        <tr>
            <td style="padding: 6px 0; font-weight: bold;">Description:</td>
            <td style="padding: 6px 0;">{{ $complaint->description }}</td>
        </tr>
    </table>

    <p style="margin-top: 20px; color: #777; font-size: 13px;">
        This is an automated acknowledgment. This complaint has an SLA of 30 days from submission.
    </p>
</body>
</html>
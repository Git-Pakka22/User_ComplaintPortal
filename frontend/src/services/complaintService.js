// Mock complaint data, keyed by Complaint Number ("no" in the Complaints table).
// Replace the internals of these functions with real API calls
// (e.g. fetch("/api/complaints/:id")) when the backend is ready.
// The page files (Complaints.jsx, ComplaintDetail.jsx, etc.) never need to
// change when that happens — only this file does.

const complaintsData = {
    "7-976": {
        name: "Complaint By sales - OBR 65GSM 52CM",
        businessArea: "Paper",
        status: "In Progress",
        source: "WEBSERVICE",
        priority: "",
        invoiceNumber: "1055901",
        reopenCount: "",
        slaName: "Paper Complaint Process - 30 days",
        zone: "",
        assignedTo: "Ravendra Pratap Singh",
        relatedTo: "A V MARKETING",
        targetEndDate: "",
        actualEndDate: "",
        complaintNumber: "QC-2026-27-961",
        progress: "",
        customerName: "PR GLOBAL RESOURCES INDIA PVT LTD",
        customerSapId: "300112",
        phase: "",
        createdTime: "29-06-2026 7:22 PM",
        modifiedTime: "29-06-2026 7:22 PM",
        firstActualResponse: "--",
        totalHoursElapsed: "6 Hours 7 Minutes",
        hoursToResolve: "30 days",
        firstResponseStatus: "Time Left",
        slaActualResolution: "--",
        slaStatus: "Running",
        description: "GSM variation observed against ordered specification.",
        item: {
            itemDescription: "8000019442 - OBR 65GSM 52CM",
            gsm: "65",
            complainedQuantity: "2140",
            complainedSheetsOrReels: "40021110",
            typeOfComplaints: "Product Related - GSM variation",
            dispatchDate: "24-06-2026",
            variety: "OBR",
            billedQuantity: "2150.00",
            billedSheetsOrReels: "40021110",
            visitRequired: "No",
            capaDocument: "No attachment uploaded. Edit record to upload attachment",
        },
        keyMetrics: {
            tasksOpen: 0, progress: 1, tasksDue: 0, tasksCompleted: 1,
            highPriority: 1, normalPriority: 0, lowPriority: 0, otherPriorities: 1,
        },
        tasks: [
            { name: "Complaint By sales - OBR 65GSM 52CM", progress: "", status: "Completed" },
            { name: "Complaint By sales - OBR 65GSM 52CM", progress: "", status: "In Progress" },
        ],
        updates: [
            { time: "3 hours ago", title: "Complaint Task Team Pakka", detail: "Complaint By sales - OBR 65GSM 52CM created" },
        ],
    },
    "7-975": {
        name: "Complaint By sales - PBB 70GSM 30CM",
        businessArea: "Paper",
        status: "In Progress",
        source: "WEBSERVICE",
        priority: "",
        invoiceNumber: "1055877",
        reopenCount: "",
        slaName: "Paper Complaint Process - 30 days",
        zone: "",
        assignedTo: "Ravendra Pratap Singh",
        relatedTo: "A V MARKETING",
        targetEndDate: "",
        actualEndDate: "",
        complaintNumber: "QC-2026-27-960",
        progress: "",
        customerName: "PR GLOBAL RESOURCES INDIA PVT LTD",
        customerSapId: "300112",
        phase: "",
        createdTime: "29-06-2026 7:10 PM",
        modifiedTime: "29-06-2026 7:10 PM",
        firstActualResponse: "--",
        totalHoursElapsed: "6 Hours 19 Minutes",
        hoursToResolve: "30 days",
        firstResponseStatus: "Time Left",
        slaActualResolution: "--",
        slaStatus: "Running",
        description: "Strength issue reported on received reels.",
        item: {
            itemDescription: "8000017764 - PBB 70GSM 30CM",
            gsm: "70",
            complainedQuantity: "1860",
            complainedSheetsOrReels: "40020987",
            typeOfComplaints: "Product Related - Strength Issue",
            dispatchDate: "23-06-2026",
            variety: "PBB",
            billedQuantity: "1870.00",
            billedSheetsOrReels: "40020987",
            visitRequired: "No",
            capaDocument: "No attachment uploaded. Edit record to upload attachment",
        },
        keyMetrics: {
            tasksOpen: 1, progress: 0, tasksDue: 1, tasksCompleted: 0,
            highPriority: 0, normalPriority: 1, lowPriority: 0, otherPriorities: 0,
        },
        tasks: [
            { name: "Complaint By sales - PBB 70GSM 30CM", progress: "", status: "In Progress" },
        ],
        updates: [
            { time: "5 hours ago", title: "Complaint Task Team Pakka", detail: "Complaint By sales - PBB 70GSM 30CM created" },
        ],
    },
    "7-952": {
        name: "Complaint By sales - SEP 45GSM 99CM",
        businessArea: "Paper",
        status: "Completed",
        source: "WEBSERVICE",
        priority: "",
        invoiceNumber: "1054410",
        reopenCount: "",
        slaName: "Paper Complaint Process - 30 days",
        zone: "",
        assignedTo: "Ravendra Pratap Singh",
        relatedTo: "BALA JI PAPERS",
        targetEndDate: "26-06-2026",
        actualEndDate: "27-05-2026",
        complaintNumber: "QC-2026-25-812",
        progress: "",
        customerName: "Sri Balaji Packaging",
        customerSapId: "300036",
        phase: "",
        createdTime: "27-05-2026 10:27 AM",
        modifiedTime: "28-05-2026 3:41 PM",
        firstActualResponse: "27-05-2026 2:10 PM",
        totalHoursElapsed: "21 Days 6 Hours 2 Minutes",
        hoursToResolve: "30 days",
        firstResponseStatus: "Responded",
        slaActualResolution: "1 Days 3 Hours 31 Minutes",
        slaStatus: "Running",
        description: "High moisture in paper reported by customer on receipt.",
        item: {
            itemDescription: "8000015521 - SEP 45GSM 99CM",
            gsm: "45",
            complainedQuantity: "3050",
            complainedSheetsOrReels: "40019654",
            typeOfComplaints: "Product Related - High Moisture in paper",
            dispatchDate: "22-05-2026",
            variety: "SEP",
            billedQuantity: "3060.00",
            billedSheetsOrReels: "40019654",
            visitRequired: "Yes",
            capaDocument: "No attachment uploaded. Edit record to upload attachment",
        },
        keyMetrics: {
            tasksOpen: 0, progress: 0, tasksDue: 0, tasksCompleted: 2,
            highPriority: 0, normalPriority: 0, lowPriority: 1, otherPriorities: 0,
        },
        tasks: [
            { name: "Complaint By sales - SEP 45GSM 99CM", progress: "", status: "Completed" },
            { name: "Complaint By sales - SEP 45GSM 99CM", progress: "", status: "Completed" },
        ],
        updates: [
            { time: "5 weeks ago", title: "Complaint Task Team Pakka", detail: "Complaint By sales - SEP 45GSM 99CM created" },
            { time: "5 weeks ago", title: "Complaint Task Team Pakka", detail: "Complaint By sales - SEP 45GSM 99CM marked Completed" },
        ],
    },
};

// --- Auto-generated bulk mock data (50 additional complaints) ---
// Purely to demo pagination / "Show entries" sorting until the real API supplies volume.
// Safe to delete this whole block later — getAllComplaints() just reads complaintsData.
// TODO: remove before wiring the real API / before production build.
(function seedBulkMockComplaints() {
    const varietyPool = ["OBR", "PBB", "SEP", "KLB", "MG"];
    const typePool = [
        "Product Related - GSM variation",
        "Product Related - Strength Issue",
        "Product Related - High Moisture in paper",
        "Product Related - Print Quality",
        "Logistics - Delayed Dispatch",
    ];
    const accountPool = ["A V MARKETING", "BALA JI PAPERS", "PREM PAPERS"];
    const customerPool = [
        "PR GLOBAL RESOURCES INDIA PVT LTD",
        "Sri Balaji Packaging",
        "Shree Ganesh Enterprises",
        "Om Sai Traders",
    ];
    const assigneePool = ["Ravendra Pratap Singh", "Vikas Srivastava", "Heena Kumari"];

    for (let i = 1; i <= 200; i++) {
        const key = `7-${900 - i}`; // 7-899 down to 7-850, no collision with existing keys
        const variety = varietyPool[i % varietyPool.length];
        const gsm = 40 + (i % 6) * 5;
        const cm = 40 + (i % 5) * 10;
        const day = String(1 + (i % 27)).padStart(2, "0");
        const month = String(1 + (i % 12)).padStart(2, "0");

        complaintsData[key] = {
            name: `Complaint By sales - ${variety} ${gsm}GSM ${cm}CM`,
            businessArea: "Paper",
            status: i % 3 === 0 ? "Completed" : "In Progress",
            source: "WEBSERVICE",
            priority: "",
            invoiceNumber: `10${5000 + i}`,
            reopenCount: "",
            slaName: "Paper Complaint Process - 30 days",
            zone: "",
            assignedTo: assigneePool[i % assigneePool.length],
            relatedTo: accountPool[i % accountPool.length],
            targetEndDate: "",
            actualEndDate: "",
            complaintNumber: `QC-2026-${20 + (i % 8)}-${800 + i}`,
            progress: "",
            customerName: customerPool[i % customerPool.length],
            customerSapId: `3001${i}`,
            phase: "",
            createdTime: `${day}-${month}-2026 ${9 + (i % 8)}:00 AM`,
            modifiedTime: `${day}-${month}-2026 ${9 + (i % 8)}:00 AM`,
            firstActualResponse: "--",
            totalHoursElapsed: `${i % 24} Hours`,
            hoursToResolve: "30 days",
            firstResponseStatus: "Time Left",
            slaActualResolution: "--",
            slaStatus: "Running",
            description: "Auto-generated mock complaint for pagination testing.",
            item: {
                itemDescription: `800001${i} - ${variety} ${gsm}GSM`,
                gsm: String(gsm),
                complainedQuantity: String(1000 + i * 10),
                complainedSheetsOrReels: `4002${1000 + i}`,
                typeOfComplaints: typePool[i % typePool.length],
                dispatchDate: `${day}-${month}-2026`,
                variety,
                billedQuantity: String(1010 + i * 10),
                billedSheetsOrReels: `4002${1000 + i}`,
                visitRequired: i % 5 === 0 ? "Yes" : "No",
                capaDocument: "No attachment uploaded. Edit record to upload attachment",
            },
            keyMetrics: {
                tasksOpen: i % 2, progress: 0, tasksDue: i % 2, tasksCompleted: i % 3 === 0 ? 2 : 0,
                highPriority: i % 4 === 0 ? 1 : 0, normalPriority: 1, lowPriority: 0, otherPriorities: 0,
            },
            tasks: [
                { name: `Complaint By sales - ${variety} ${gsm}GSM`, progress: "", status: i % 3 === 0 ? "Completed" : "In Progress" },
            ],
            updates: [
                { time: `${(i % 10) + 1} days ago`, title: "Complaint Task Team Pakka", detail: "Complaint auto-generated for testing" },
            ],
        };
    }
})();

// Used by ComplaintDetail.jsx — one complaint, by its number
export function getComplaintById(id) {
    return complaintsData[id] || null;
}

// Used by Complaints.jsx — the full list, shaped for the table
export function getAllComplaints() {
    return Object.entries(complaintsData).map(([no, c]) => ({
        no,
        created: c.createdTime,
        name: c.name,
        type: c.item.typeOfComplaints,
        assignedTo: c.assignedTo,
        relatedTo: c.relatedTo,
        customer: c.customerName,
    }));
}
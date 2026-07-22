// Mock workflow data. Replace internals with real API calls when/if
// a backend workflow engine exists. Pages never need to change — only this file does.

// Module list with workflow counts, shown in the "All Workflows" dropdown panel.
export const moduleList = [
    { key: "all", label: "All Workflows", count: 77 },
    { key: "opportunities", label: "Opportunities Workflows", count: 0 },
    { key: "contacts", label: "Contacts Workflows", count: 3 },
    { key: "accounts", label: "Accounts Workflows", count: 1 },
    { key: "leads", label: "Leads Workflows", count: 3 },
    { key: "documents", label: "Documents Workflows", count: 0 },
    { key: "tasks", label: "Task Workflows", count: 1 },
    { key: "tickets", label: "Tickets Workflows", count: 7 },
    { key: "products", label: "Products Workflows", count: 0 },
    { key: "events", label: "Events Workflows", count: 1 },
    { key: "vendors", label: "Vendors Workflows", count: 0 },
    { key: "pricebooks", label: "Price Books Workflows", count: 0 },
    { key: "quotes", label: "Quotes Workflows", count: 0 },
    { key: "purchaseorders", label: "Purchase Orders Workflows", count: 0 },
    { key: "salesorders", label: "Sales Orders Workflows", count: 0 },
    { key: "invoices", label: "Invoices Workflows", count: 0 },
    { key: "campaigns", label: "Campaigns Workflows", count: 0 },
    { key: "servicecontracts", label: "Service Contracts Workflows", count: 0 },
    { key: "services", label: "Services Workflows", count: 0 },
    { key: "assets", label: "Assets Workflows", count: 0 },
    { key: "smsnotifier", label: "SMS Notifier Workflows", count: 0 },
    { key: "projectmilestones", label: "Project Milestones Workflows", count: 0 },
    { key: "projecttasks", label: "Project Tasks Workflows", count: 0 },
    { key: "projects", label: "Projects Workflows", count: 0 },
    { key: "notes", label: "Notes Workflows", count: 1 },
    { key: "mailtemplates", label: "Mail Templates Workflows", count: 0 },
    { key: "corporateemails", label: "Corporate emails Workflows", count: 0 },
    { key: "mailscanner", label: "Mail Scanner Workflows", count: 0 },
    { key: "visitcall", label: "Visit Call Workflows", count: 0 },
    { key: "stakeholder", label: "Stakeholder Workflows", count: 1 },
    { key: "testmod", label: "Test Mod Workflows", count: 0 },
    { key: "testmodule", label: "Test module Workflows", count: 0 },
    { key: "costing", label: "Costing Workflows", count: 0 },
    { key: "test", label: "Test Workflows", count: 0 },
    { key: "test2", label: "test2 Workflows", count: 0 },
    { key: "notices", label: "Notices Workflows", count: 0 },
    { key: "ctmobileattendance", label: "CTMobile Attendance Workflows", count: 0 },
    { key: "ctmobilemessagetemplate", label: "CTMobile Message Template Workflows", count: 0 },
    { key: "ctmobilepushnotification", label: "CTMobile Push Notification Workflows", count: 0 },
    { key: "ctmobileuserfilter", label: "CTMobile User Filter Workflows", count: 0 },
    { key: "ctmobilerouteplanning", label: "CTMobile Route Planning Workflows", count: 0 },
    { key: "ctmobilerouteattendance", label: "CTMobile Route Attendance Workflows", count: 0 },
    { key: "ctmobiletimecontrol", label: "CTMobile Time Control Workflows", count: 0 },
    { key: "ctmobiletimetracker", label: "CTMobile Time Tracker Workflows", count: 0 },
    { key: "ctsurvey", label: "CTSurvey Workflows", count: 0 },
    { key: "ctcustomform", label: "CTCustomform Workflows", count: 0 },
    { key: "ctsurveyanswer", label: "CTSurvey Answer Workflows", count: 0 },
    { key: "ctsurveyanswervalues", label: "CTSurvey Answer Values Workflows", count: 0 },
    { key: "ctsurveyquestions", label: "CTSurveyQuestions Workflows", count: 0 },
    { key: "ctsurveyquestionstype", label: "CTSurvey Questions Type Workflows", count: 0 },
    { key: "ctsurveycustomvalues", label: "CTSurvey Custom Values Workflows", count: 0 },
    { key: "ctsurveytrackingreport", label: "CTSurvey TrackingReport Workflows", count: 0 },
    { key: "ctsurveyquestionanswer", label: "CTSurvey Question Answer Workflows", count: 0 },
    { key: "sapinvoices", label: "SAP Invoices Workflows", count: 0 },
    { key: "creditdebitnotes", label: "Credit Debit Notes Workflows", count: 0 },
    { key: "complaints", label: "Complaints Workflows", count: 9 },
    { key: "complainttask", label: "Complaint Task Workflows", count: 50 },
    { key: "capa", label: "CAPA Workflows", count: 0 },
];

let workflowRows = [
    {
        id: 1,
        module: "tickets",
        moduleIcon: "ticket",
        name: "Send Email to Contact on Ticket Close",
        trigger: "Every time conditons are met",
        conditions: {
            all: ["From Portal is Disabled", "Status has changed to Closed", "Team is IT Team"],
            any: [],
        },
        actions: [
            { type: "Email", title: "Email (1)" },
            { type: "Field Update", title: "Field Update (1)" },
        ],
        status: "ON",
        description: "Send Email to Contact on Ticket Close",
        targetModule: "Tickets",
        triggerOn: "updated",
        recurrence: "every",
    },
    {
        id: 2,
        module: "events",
        moduleIcon: "calendar",
        name: "Workflow for Events when Send Notification is True",
        trigger: "Every time conditons are met",
        conditions: { all: [], any: ["Send Notification is Enabled"] },
        actions: [],
        status: "OFF",
        description: "",
        targetModule: "Events",
        triggerOn: "updated",
        recurrence: "every",
    },
    {
        id: 3,
        module: "events",
        moduleIcon: "calendar",
        name: "Workflow for Calendar Todos when Send Notification is True",
        trigger: "Every time conditons are met",
        conditions: { all: [], any: ["Send Notification is Enabled"] },
        actions: [],
        status: "OFF",
        description: "",
        targetModule: "Events",
        triggerOn: "updated",
        recurrence: "every",
    },
    {
        id: 4,
        module: "opportunities",
        moduleIcon: "opportunity",
        name: "Calculate or Update forecast amount",
        trigger: "Every time conditons are met",
        conditions: { all: [], any: [] },
        actions: [{ type: "Field Update", title: "Field Update (1)" }],
        status: "OFF",
        description: "",
        targetModule: "Opportunities",
        triggerOn: "updated",
        recurrence: "every",
        deletable: true,
    },
    {
        id: 5,
        module: "tickets",
        moduleIcon: "ticket",
        name: "Comment Added From CRM : Send Email to Record Owner",
        trigger: "Every time conditons are met",
        conditions: { all: ["Comment is added"], any: [] },
        actions: [{ type: "Email", title: "Email (1)LBL_vtNotificationTask (1)" }],
        status: "OFF",
        description: "",
        targetModule: "Tickets",
        triggerOn: "updated",
        recurrence: "every",
    },
    {
        id: 6,
        module: "tickets",
        moduleIcon: "ticket",
        name: "Send Email to Record Owner on Ticket Update",
        trigger: "Every time conditons are met",
        conditions: {
            all: ["From Portal is Disabled"],
            any: ["Assigned To has changed"],
        },
        actions: [{ type: "Email", title: "Email (1)LBL_vtNotificationTask (1)LBL_VTPushNotification (1)" }],
        status: "ON",
        description: "",
        targetModule: "Tickets",
        triggerOn: "updated",
        recurrence: "every",
    },
    {
        id: 7,
        module: "tickets",
        moduleIcon: "ticket",
        name: "Ticket Creation From CRM : Send Email to Record Assigned",
        trigger: "Tickets creation",
        conditions: { all: ["From Portal is Disabled"], any: [] },
        actions: [{ type: "Email", title: "Email (1)LBL_vtNotificationTask (1)" }],
        status: "OFF",
        description: "",
        targetModule: "Tickets",
        triggerOn: "created",
        recurrence: "every",
    },
    {
        id: 8,
        module: "leads",
        moduleIcon: "lead",
        name: "Test workflow by Neelesh",
        trigger: "Every time conditons are met",
        conditions: { all: ["Lead Source has changed to Existing Customer"], any: [] },
        actions: [{ type: "Field Update", title: "Field Update (1)" }],
        status: "OFF",
        description: "",
        targetModule: "Leads",
        triggerOn: "updated",
        recurrence: "every",
    },
    {
        id: 9,
        module: "contacts",
        moduleIcon: "contact",
        name: "Birthdays Emails and Notification",
        trigger: "Time Interval",
        conditions: { all: ["Date of Birth is today"], any: [] },
        actions: [{ type: "Email", title: "Email (1)LBL_vtNotificationTask (1)LBL_VTPushNotification (1)" }],
        status: "ON",
        description: "",
        targetModule: "Contacts",
        triggerOn: "interval",
        recurrence: "every",
        deletable: true,
    },
    {
        id: 10,
        module: "invoices",
        moduleIcon: "invoice",
        name: "UpdateInventoryProducts On Every Save",
        trigger: "Every time conditons are met",
        conditions: { all: [], any: ["Subject does not contain `!`"] },
        actions: [{ type: "Custom Function", title: "Custom Function (1)" }],
        status: "OFF",
        description: "UpdateInventoryProducts On Every Save",
        targetModule: "Invoices",
        triggerOn: "updated",
        recurrence: "every",
        legacyLook: true,
    },
];

export function getModuleList() {
    return moduleList;
}

export function getAllWorkflows() {
    return workflowRows;
}

export function getWorkflowsByModule(moduleKey) {
    if (moduleKey === "all") return workflowRows;
    return workflowRows.filter((w) => w.module === moduleKey);
}

export function getWorkflowById(id) {
    return workflowRows.find((w) => String(w.id) === String(id)) || null;
}

export function toggleWorkflowStatus(id) {
    workflowRows = workflowRows.map((w) =>
        String(w.id) === String(id) ? { ...w, status: w.status === "ON" ? "OFF" : "ON" } : w
    );
    return getWorkflowById(id);
}

export function deleteWorkflow(id) {
    workflowRows = workflowRows.filter((w) => String(w.id) !== String(id));
}

export function saveWorkflow(workflow) {
    if (workflow.id) {
        workflowRows = workflowRows.map((w) => (w.id === workflow.id ? { ...w, ...workflow } : w));
        return getWorkflowById(workflow.id);
    }
    const newWorkflow = {
        ...workflow,
        id: Math.max(0, ...workflowRows.map((w) => w.id)) + 1,
        status: workflow.status || "OFF",
    };
    workflowRows = [newWorkflow, ...workflowRows];
    return newWorkflow;
}
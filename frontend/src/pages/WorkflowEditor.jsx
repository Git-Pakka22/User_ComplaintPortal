import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import PageTransition from "../components/PageTransition";
import ToggleSwitch from "../components/ToggleSwitch";
import "../assets/workflows.css";
import { FaChevronDown, FaArrowLeft, FaSearch } from "react-icons/fa";
import { getWorkflowById, saveWorkflow } from "../services/workflowService";

const TARGET_MODULES = [
    "Complaints", "Complaint Task", "Invoices", "Tickets", "Contacts",
    "Accounts", "Leads", "Opportunities", "Events", "Tasks",
];

const ACTION_TYPES = [
    "Send Mail",
    "Invoke Custom Function",
    "Create Task",
    "Create Event",
    "Update Fields",
    "Create Record",
    "SMS Task",
    "Notification Alert",
    "CRMTiger Mobile - Push Notification",
    "Send Mail Attachment",
];

const RECORD_MODULES = [
    "None", "Opportunities", "Contacts", "Accounts", "Leads", "Documents", "Tickets",
    "Products", "FAQ", "Vendors", "Price Books", "Campaigns", "Service Contracts",
    "Services", "Assets", "Project Milestones", "Project Tasks", "Projects",
    "Mail Templates", "Corporate emails", "Mail Scanner", "Visit Call", "Stakeholder",
    "Test Mod", "Test module", "Costing", "Test", "test2", "Notices",
    "CTMobile Attendance", "CTMobile Message Template", "CTMobile Push Notification",
    "CTMobile User Filter", "CTMobile Route Planning", "CTMobile Route Attendance",
    "CTMobile Time Control", "CTMobile Time Tracker", "CTSurvey", "CTCustomform",
    "CTSurvey Answer", "CTSurvey Answer Values", "CTSurveyQuestions",
    "CTSurvey Questions Type", "CTSurvey Custom Values", "CTSurvey TrackingReport",
    "CTSurvey Question Answer", "SAP Invoices", "Credit Debit Notes", "Complaints",
    "Complaint Task", "CAPA", "Notes",
];

const CONDITION_FIELDS = [
    "Opportunity Name", "Status", "Assigned To", "Priority",
    "Created Date", "Modified Date", "Send Notification",
];
const CONDITION_OPERATORS = [
    "is", "is not", "contains", "does not contain", "is empty", "is not empty",
];

function SearchableSelect({ value, onChange, options, placeholder }) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const filtered = options.filter((o) =>
        o.toLowerCase().includes(search.trim().toLowerCase())
    );
    return (
        <div className="wf-searchable-select">
            <button
                type="button"
                className="wf-searchable-select-btn"
                onClick={() => setOpen((p) => !p)}
            >
                {value || placeholder || "None"} <span className="wf-caret-mini">▲</span>
            </button>
            {open && (
                <div className="wf-searchable-select-panel">
                    <div className="wf-searchable-select-search">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            autoFocus
                        />
                        <FaSearch />
                    </div>
                    <div className="wf-searchable-select-list">
                        {filtered.map((opt) => (
                            <div
                                key={opt}
                                className={`wf-searchable-select-item ${opt === value ? "active" : ""}`}
                                onClick={() => {
                                    onChange(opt);
                                    setOpen(false);
                                    setSearch("");
                                }}
                            >
                                {opt}
                            </div>
                        ))}
                        {filtered.length === 0 && (
                            <div className="wf-searchable-select-empty">No results</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

function FieldRow({ label, required, children }) {
    return (
        <div className="wf-modal-row">
            <label className="wf-modal-label">
                {label}
                {required && <span className="wf-required">*</span>}
            </label>
            <div className="wf-modal-field">{children}</div>
        </div>
    );
}

function ToOrFromRow({ label, required, value, onChange, select }) {
    return (
        <div className="wf-modal-row">
            <label className="wf-modal-label">
                {label}
                {required && <span className="wf-required">*</span>}
            </label>
            <div className="wf-modal-field wf-modal-field-split">
                <input
                    type="text"
                    className="wf-modal-input"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
                <select className="wf-modal-select-inline" defaultValue="">
                    <option value="" disabled>{select || "Select"}</option>
                </select>
            </div>
        </div>
    );
}

function SendMailForm({ data, setData, isAttachment }) {
    return (
        <>
            <FieldRow label="Action Title" required>
                <input
                    type="text"
                    className="wf-modal-input"
                    value={data.actionTitle || ""}
                    onChange={(e) => setData({ ...data, actionTitle: e.target.value })}
                />
            </FieldRow>
            <ToOrFromRow label="From" value={data.from || ""} onChange={(v) => setData({ ...data, from: v })} select="Select" />
            <ToOrFromRow label="Reply To" value={data.replyTo || ""} onChange={(v) => setData({ ...data, replyTo: v })} select="Select" />
            <ToOrFromRow label="To" required value={data.to || ""} onChange={(v) => setData({ ...data, to: v })} select="Select" />
            <div className="wf-modal-row">
                <div className="wf-modal-label"></div>
                <div className="wf-modal-field">
                    <span className="wf-cc-bcc-link">Add Cc</span> <span className="wf-cc-bcc-link">Add Bcc</span>
                </div>
            </div>
            <ToOrFromRow label="Subject" required value={data.subject || ""} onChange={(v) => setData({ ...data, subject: v })} select="Select" />
            {isAttachment && (
                <FieldRow label="Attachment" required>
                    <select className="wf-modal-select" defaultValue="">
                        <option value="" disabled>Select</option>
                    </select>
                </FieldRow>
            )}
            <FieldRow label="Add Field">
                <select className="wf-modal-select" defaultValue="">
                    <option value="" disabled>Select</option>
                </select>
            </FieldRow>
            <FieldRow label="Body">
                <textarea
                    className="wf-modal-textarea wf-modal-textarea-large"
                    value={data.body || ""}
                    onChange={(e) => setData({ ...data, body: e.target.value })}
                    placeholder="Email body..."
                />
            </FieldRow>
        </>
    );
}

function InvokeCustomFunctionForm({ data, setData }) {
    return (
        <>
            <FieldRow label="Action Title" required>
                <input
                    type="text"
                    className="wf-modal-input"
                    value={data.actionTitle || ""}
                    onChange={(e) => setData({ ...data, actionTitle: e.target.value })}
                />
            </FieldRow>
            <FieldRow label="Method Name">
                <div className="wf-info-banner">No method is available for this module</div>
            </FieldRow>
        </>
    );
}

function CreateTaskForm({ data, setData }) {
    return (
        <>
            <FieldRow label="Action Title" required>
                <input
                    type="text"
                    className="wf-modal-input"
                    value={data.actionTitle || ""}
                    onChange={(e) => setData({ ...data, actionTitle: e.target.value })}
                />
            </FieldRow>
            <FieldRow label="Title" required>
                <input
                    type="text"
                    className="wf-modal-input"
                    value={data.title || ""}
                    onChange={(e) => setData({ ...data, title: e.target.value })}
                />
            </FieldRow>
            <FieldRow label="Description">
                <textarea
                    className="wf-modal-textarea"
                    value={data.description || ""}
                    onChange={(e) => setData({ ...data, description: e.target.value })}
                />
            </FieldRow>
            <FieldRow label="Status">
                <select
                    className="wf-modal-select"
                    value={data.status || "Not Started"}
                    onChange={(e) => setData({ ...data, status: e.target.value })}
                >
                    <option>Not Started</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                </select>
            </FieldRow>
            <FieldRow label="Priority">
                <select
                    className="wf-modal-select"
                    value={data.priority || "High"}
                    onChange={(e) => setData({ ...data, priority: e.target.value })}
                >
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                </select>
            </FieldRow>
            <FieldRow label="Assigned to">
                <select className="wf-modal-select" defaultValue="">
                    <option value="" disabled>Select an Option</option>
                </select>
            </FieldRow>
            <FieldRow label="Time">
                <div className="wf-modal-field-split">
                    <input type="time" className="wf-modal-input" />
                    <button type="button" className="wf-time-icon-btn">◷</button>
                </div>
            </FieldRow>
            <FieldRow label="Due Date">
                <div className="wf-due-date-row">
                    <input type="number" className="wf-modal-input wf-input-narrow" placeholder="0" />
                    <span>days</span>
                    <select className="wf-modal-select-inline" defaultValue="after">
                        <option value="after">after</option>
                        <option value="before">before</option>
                    </select>
                    <select className="wf-modal-select-inline" defaultValue="expected">
                        <option value="expected">Expected Close Date</option>
                    </select>
                    <span className="wf-due-date-hint">(The same value is used for the start date)</span>
                </div>
            </FieldRow>
            <FieldRow label="Send Notification">
                <input type="checkbox" />
            </FieldRow>
        </>
    );
}

function CreateEventForm({ data, setData }) {
    return (
        <>
            <FieldRow label="Action Title" required>
                <input
                    type="text"
                    className="wf-modal-input"
                    value={data.actionTitle || ""}
                    onChange={(e) => setData({ ...data, actionTitle: e.target.value })}
                />
            </FieldRow>
            <FieldRow label="Event Name" required>
                <input
                    type="text"
                    className="wf-modal-input"
                    value={data.eventName || ""}
                    onChange={(e) => setData({ ...data, eventName: e.target.value })}
                />
            </FieldRow>
            <FieldRow label="Description">
                <textarea
                    className="wf-modal-textarea"
                    value={data.description || ""}
                    onChange={(e) => setData({ ...data, description: e.target.value })}
                />
            </FieldRow>
            <FieldRow label="Status">
                <select className="wf-modal-select" defaultValue="Planned">
                    <option>Planned</option>
                    <option>Held</option>
                    <option>Not Held</option>
                </select>
            </FieldRow>
            <FieldRow label="Type">
                <select className="wf-modal-select" defaultValue="Call">
                    <option>Call</option>
                    <option>Meeting</option>
                    <option>Visit</option>
                </select>
            </FieldRow>
            <FieldRow label="Assigned to">
                <select className="wf-modal-select" defaultValue="">
                    <option value="" disabled>Select an Option</option>
                </select>
            </FieldRow>
            <FieldRow label="Start Time">
                <div className="wf-modal-field-split">
                    <input type="time" className="wf-modal-input" />
                    <button type="button" className="wf-time-icon-btn">◷</button>
                </div>
            </FieldRow>
            <FieldRow label="Start Date">
                <div className="wf-due-date-row">
                    <input type="number" className="wf-modal-input wf-input-narrow" placeholder="0" />
                    <span>days</span>
                    <select className="wf-modal-select-inline" defaultValue="after">
                        <option value="after">after</option>
                        <option value="before">before</option>
                    </select>
                    <select className="wf-modal-select-inline" defaultValue="expected">
                        <option value="expected">Expected Close Date</option>
                    </select>
                </div>
            </FieldRow>
            <FieldRow label="End Time">
                <div className="wf-modal-field-split">
                    <input type="time" className="wf-modal-input" />
                    <button type="button" className="wf-time-icon-btn">◷</button>
                </div>
            </FieldRow>
            <FieldRow label="End Date">
                <div className="wf-due-date-row">
                    <input type="number" className="wf-modal-input wf-input-narrow" placeholder="0" />
                    <span>days</span>
                    <select className="wf-modal-select-inline" defaultValue="after">
                        <option value="after">after</option>
                        <option value="before">before</option>
                    </select>
                    <select className="wf-modal-select-inline" defaultValue="expected">
                        <option value="expected">Expected Close Date</option>
                    </select>
                </div>
            </FieldRow>
            <FieldRow label="Enable Repeat">
                <input type="checkbox" />
            </FieldRow>
        </>
    );
}

function UpdateFieldsForm({ data, setData }) {
    const fields = data.fields || [];
    const addField = () => setData({ ...data, fields: [...fields, { field: "", value: "" }] });
    return (
        <>
            <FieldRow label="Action Title" required>
                <input
                    type="text"
                    className="wf-modal-input"
                    value={data.actionTitle || ""}
                    onChange={(e) => setData({ ...data, actionTitle: e.target.value })}
                />
            </FieldRow>
            <div className="wf-modal-row">
                <label className="wf-modal-label">Set Field Values</label>
                <div className="wf-modal-field">
                    <button type="button" className="wf-add-field-btn" onClick={addField}>
                        Add Field
                    </button>
                    {fields.map((f, i) => (
                        <div className="wf-modal-field-split" style={{ marginTop: 10 }} key={i}>
                            <select
                                className="wf-modal-select-inline"
                                value={f.field}
                                onChange={(e) => {
                                    const next = [...fields];
                                    next[i] = { ...next[i], field: e.target.value };
                                    setData({ ...data, fields: next });
                                }}
                            >
                                <option value="">Select field</option>
                                <option value="status">Status</option>
                                <option value="priority">Priority</option>
                            </select>
                            <input
                                type="text"
                                className="wf-modal-input"
                                placeholder="Value"
                                value={f.value}
                                onChange={(e) => {
                                    const next = [...fields];
                                    next[i] = { ...next[i], value: e.target.value };
                                    setData({ ...data, fields: next });
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

function CreateRecordForm({ data, setData }) {
    return (
        <>
            <FieldRow label="Action Title" required>
                <input
                    type="text"
                    className="wf-modal-input"
                    value={data.actionTitle || ""}
                    onChange={(e) => setData({ ...data, actionTitle: e.target.value })}
                />
            </FieldRow>
            <FieldRow label="Create a record in" required>
                <SearchableSelect
                    value={data.recordModule || "None"}
                    onChange={(v) => setData({ ...data, recordModule: v })}
                    options={RECORD_MODULES}
                />
            </FieldRow>
        </>
    );
}

function SmsTaskForm({ data, setData }) {
    return (
        <>
            <FieldRow label="Action Title" required>
                <input
                    type="text"
                    className="wf-modal-input"
                    value={data.actionTitle || ""}
                    onChange={(e) => setData({ ...data, actionTitle: e.target.value })}
                />
            </FieldRow>
            <ToOrFromRow label="Recepients" required value={data.recipients || ""} onChange={(v) => setData({ ...data, recipients: v })} select="Select Fields" />
            <FieldRow label="Add Fields">
                <select className="wf-modal-select" defaultValue="">
                    <option value="" disabled>Select Fields</option>
                </select>
            </FieldRow>
            <FieldRow label="Sms Text">
                <textarea
                    className="wf-modal-textarea"
                    value={data.smsText || ""}
                    onChange={(e) => setData({ ...data, smsText: e.target.value })}
                />
            </FieldRow>
        </>
    );
}

function NotificationAlertForm({ data, setData }) {
    const fieldOptions = [
        "(Opportunities) Assigned To", "(Accounts) Assigned To",
        "(Contacts) Assigned To", "(Campaigns) Assigned To",
    ];
    return (
        <>
            <FieldRow label="Action Title" required>
                <input
                    type="text"
                    className="wf-modal-input"
                    value={data.actionTitle || ""}
                    onChange={(e) => setData({ ...data, actionTitle: e.target.value })}
                />
            </FieldRow>
            <FieldRow label="Notify to" required>
                <div className="wf-modal-field-split">
                    <textarea
                        className="wf-modal-textarea"
                        value={data.notifyTo || ""}
                        onChange={(e) => setData({ ...data, notifyTo: e.target.value })}
                    />
                    <SearchableSelect
                        value={data.notifyField || ""}
                        onChange={(v) => setData({ ...data, notifyField: v })}
                        options={fieldOptions}
                        placeholder="Select Fields"
                    />
                </div>
            </FieldRow>
            <FieldRow label="Add Fields">
                <select className="wf-modal-select" defaultValue="">
                    <option value="" disabled>Select Fields</option>
                </select>
            </FieldRow>
            <FieldRow label="Notification Content">
                <textarea
                    className="wf-modal-textarea"
                    value={data.content || ""}
                    onChange={(e) => setData({ ...data, content: e.target.value })}
                />
            </FieldRow>
            <FieldRow label="Notice Type">
                <select className="wf-modal-select" defaultValue="Notice">
                    <option>Notice</option>
                    <option>Alert</option>
                </select>
            </FieldRow>
        </>
    );
}

function PushNotificationForm({ data, setData }) {
    return (
        <>
            <FieldRow label="Action Title" required>
                <input
                    type="text"
                    className="wf-modal-input"
                    value={data.actionTitle || ""}
                    onChange={(e) => setData({ ...data, actionTitle: e.target.value })}
                />
            </FieldRow>
            <FieldRow label="In App notification recepients" required>
                <input
                    type="text"
                    className="wf-modal-input"
                    value={data.recipients || ""}
                    onChange={(e) => setData({ ...data, recipients: e.target.value })}
                />
            </FieldRow>
            <FieldRow label="Add Fields">
                <select className="wf-modal-select" defaultValue="Opportunity Name">
                    <option>Opportunity Name</option>
                </select>
            </FieldRow>
            <FieldRow label="In App notification Message">
                <textarea
                    className="wf-modal-textarea"
                    value={data.message || ""}
                    onChange={(e) => setData({ ...data, message: e.target.value })}
                />
            </FieldRow>
        </>
    );
}

function ActionFormBody({ type, data, setData }) {
    switch (type) {
        case "Send Mail":
            return <SendMailForm data={data} setData={setData} />;
        case "Send Mail Attachment":
            return <SendMailForm data={data} setData={setData} isAttachment />;
        case "Invoke Custom Function":
            return <InvokeCustomFunctionForm data={data} setData={setData} />;
        case "Create Task":
            return <CreateTaskForm data={data} setData={setData} />;
        case "Create Event":
            return <CreateEventForm data={data} setData={setData} />;
        case "Update Fields":
            return <UpdateFieldsForm data={data} setData={setData} />;
        case "Create Record":
            return <CreateRecordForm data={data} setData={setData} />;
        case "SMS Task":
            return <SmsTaskForm data={data} setData={setData} />;
        case "Notification Alert":
            return <NotificationAlertForm data={data} setData={setData} />;
        case "CRMTiger Mobile - Push Notification":
            return <PushNotificationForm data={data} setData={setData} />;
        default:
            return null;
    }
}

function WorkflowEditor() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isNew = !id;
    const existing = isNew ? null : getWorkflowById(id);

    const [name, setName] = useState(existing?.name || "");
    const [description, setDescription] = useState(existing?.description || "");
    const [targetModule, setTargetModule] = useState(existing?.targetModule || TARGET_MODULES[0]);
    const [statusActive, setStatusActive] = useState(existing?.status === "ON");

    const [triggerOn, setTriggerOn] = useState(existing?.triggerOn || "updated");
    const [recurrence, setRecurrence] = useState(existing?.recurrence || "every");

    const [conditionMode, setConditionMode] = useState(
        existing?.legacyLook ? "use-existing" : "builder"
    );

    // Normalize legacy string conditions (e.g. "Status has changed to Closed")
    // into {field, operator, value} rows for the new 3-field builder.
    const normalizeConditions = (arr) =>
        (arr || []).map((c) =>
            typeof c === "string"
                ? { field: "", operator: "is", value: c }
                : c
        );

    const [allConditions, setAllConditions] = useState(
        normalizeConditions(existing?.conditions?.all)
    );
    const [anyConditions, setAnyConditions] = useState(
        normalizeConditions(existing?.conditions?.any)
    );

    const addConditionRow = (setter) =>
        setter((prev) => [...prev, { field: CONDITION_FIELDS[0], operator: "is", value: "" }]);

    const updateConditionRow = (setter, idx, key, value) =>
        setter((prev) => prev.map((row, i) => (i === idx ? { ...row, [key]: value } : row)));

    const removeConditionRow = (setter, idx) =>
        setter((prev) => prev.filter((_, i) => i !== idx));

    const [actions, setActions] = useState(existing?.actions || []);
    const [showActionMenu, setShowActionMenu] = useState(false);

    const [modalActionType, setModalActionType] = useState(null);
    const [modalData, setModalData] = useState({});

    const openActionModal = (type) => {
        setModalActionType(type);
        setModalData({});
        setShowActionMenu(false);
    };

    const closeActionModal = () => {
        setModalActionType(null);
        setModalData({});
    };

    const handleSaveActionModal = () => {
        if (!modalData.actionTitle || !modalData.actionTitle.trim()) {
            alert("Action Title is required");
            return;
        }
        setActions((prev) => [
            ...prev,
            {
                type: modalActionType,
                title: modalData.actionTitle,
                active: true,
                detail: modalData,
            },
        ]);
        closeActionModal();
    };

    const handleToggleAction = (idx) => {
        setActions((prev) =>
            prev.map((a, i) => (i === idx ? { ...a, active: !a.active } : a))
        );
    };

    const handleRemoveAction = (idx) =>
        setActions((prev) => prev.filter((_, i) => i !== idx));

    const handleSave = () => {
        if (!name.trim()) {
            alert("Workflow Name is required");
            return;
        }
        saveWorkflow({
            id: existing?.id,
            name,
            description,
            targetModule,
            status: statusActive ? "ON" : "OFF",
            triggerOn,
            recurrence,
            trigger:
                recurrence === "only-first"
                    ? "Only first time conditons are met"
                    : "Every time conditons are met",
            module: existing?.module || "complaints",
            moduleIcon: existing?.moduleIcon || "ticket",
            conditions: { all: allConditions, any: anyConditions },
            actions,
            legacyLook: false,
        });
        navigate("/workflows");
    };

    if (!isNew && !existing) {
        return (
            <Layout>
                <PageTransition>
                    <div className="workflows-page">
                        <div className="wf-not-found">
                            <h2>Workflow not found</h2>
                            <button className="wf-new-btn" onClick={() => navigate("/workflows")}>
                                Back to Workflows
                            </button>
                        </div>
                    </div>
                </PageTransition>
            </Layout>
        );
    }

    return (
        <Layout>
            <PageTransition>
                <div className="workflows-page wf-editor-page">

                    <button className="wf-back-link" onClick={() => navigate("/workflows")}>
                        <FaArrowLeft /> Back to Workflows
                    </button>

                    {/* ---------- Basic Information ---------- */}
                    <div className="wf-editor-section">
                        <h3 className="wf-editor-section-title">Basic Information</h3>
                        <div className="wf-editor-grid">
                            <label className="wf-editor-label">
                                Workflow Name<span className="wf-required">*</span>
                            </label>
                            <input
                                type="text"
                                className="wf-editor-input"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />

                            <label className="wf-editor-label">Description</label>
                            <textarea
                                className="wf-editor-textarea"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />

                            <label className="wf-editor-label">Target Module</label>
                            <div className="wf-select-wrapper">
                                <select
                                    className="wf-editor-select"
                                    value={targetModule}
                                    onChange={(e) => setTargetModule(e.target.value)}
                                >
                                    {TARGET_MODULES.map((m) => (
                                        <option key={m} value={m}>{m}</option>
                                    ))}
                                </select>
                                <FaChevronDown className="wf-select-caret" />
                            </div>

                            <label className="wf-editor-label">Status</label>
                            <div className="wf-radio-row">
                                <label className="wf-radio-option">
                                    <input
                                        type="radio"
                                        checked={statusActive}
                                        onChange={() => setStatusActive(true)}
                                    />
                                    Active
                                </label>
                                <label className="wf-radio-option">
                                    <input
                                        type="radio"
                                        checked={!statusActive}
                                        onChange={() => setStatusActive(false)}
                                    />
                                    InActive
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* ---------- Workflow Trigger ---------- */}
                    <div className="wf-editor-section">
                        <h3 className="wf-editor-section-title">Workflow Trigger</h3>
                        <div className="wf-editor-grid">
                            <label className="wf-editor-label">Trigger Workflow On</label>
                            <div className="wf-radio-col">
                                <label className="wf-radio-option">
                                    <input
                                        type="radio"
                                        checked={triggerOn === "created"}
                                        onChange={() => setTriggerOn("created")}
                                    />
                                    {targetModule} creation
                                </label>
                                <label className="wf-radio-option">
                                    <input
                                        type="radio"
                                        checked={triggerOn === "updated"}
                                        onChange={() => setTriggerOn("updated")}
                                    />
                                    {targetModule} updated (Includes Creation)
                                </label>
                                <label className="wf-radio-option">
                                    <input
                                        type="radio"
                                        checked={triggerOn === "interval"}
                                        onChange={() => setTriggerOn("interval")}
                                    />
                                    Time Interval
                                </label>
                            </div>

                            <label className="wf-editor-label">Recurrence</label>
                            <div className="wf-radio-col">
                                <label className="wf-radio-option">
                                    <input
                                        type="radio"
                                        checked={recurrence === "only-first"}
                                        onChange={() => setRecurrence("only-first")}
                                    />
                                    Only first time conditons are met
                                </label>
                                <label className="wf-radio-option">
                                    <input
                                        type="radio"
                                        checked={recurrence === "every"}
                                        onChange={() => setRecurrence("every")}
                                    />
                                    Every time conditons are met
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* ---------- Workflow Condition ---------- */}
                    <div className="wf-editor-section">
                        <h3 className="wf-editor-section-title">Workflow Condition</h3>

                        {conditionMode === "use-existing" ? (
                            <>
                                <div className="wf-legacy-banner">
                                    This workflow was created in <strong>older look</strong>. Conditions created in
                                    older look cannot be edited. You can choose to recreate the conditions, or use
                                    the existing conditions without changing them.
                                </div>
                                <div className="wf-radio-row wf-legacy-choice">
                                    <label className="wf-radio-option">
                                        <input
                                            type="radio"
                                            checked={conditionMode === "use-existing"}
                                            onChange={() => setConditionMode("use-existing")}
                                        />
                                        Use existing conditions
                                    </label>
                                    <label className="wf-radio-option">
                                        <input
                                            type="radio"
                                            checked={false}
                                            onChange={() => setConditionMode("builder")}
                                        />
                                        Recreate Conditions
                                    </label>
                                </div>
                            </>
                        ) : (
                            <div className="wf-condition-box">
                                <div className="wf-condition-block">
                                    <div className="wf-condition-block-title">
                                        All Conditions <span className="wf-condition-hint">(All conditions must be met)</span>
                                    </div>
                                    {allConditions.map((row, i) => (
                                        <div className="wf-condition-row" key={i}>
                                            <select
                                                className="wf-condition-select"
                                                value={row.field}
                                                onChange={(e) => updateConditionRow(setAllConditions, i, "field", e.target.value)}
                                            >
                                                {CONDITION_FIELDS.map((f) => (
                                                    <option key={f} value={f}>{f}</option>
                                                ))}
                                            </select>
                                            <select
                                                className="wf-condition-select"
                                                value={row.operator}
                                                onChange={(e) => updateConditionRow(setAllConditions, i, "operator", e.target.value)}
                                            >
                                                {CONDITION_OPERATORS.map((o) => (
                                                    <option key={o} value={o}>{o}</option>
                                                ))}
                                            </select>
                                            <input
                                                type="text"
                                                className="wf-condition-value-input"
                                                value={row.value}
                                                onChange={(e) => updateConditionRow(setAllConditions, i, "value", e.target.value)}
                                                placeholder="Value"
                                            />
                                            <button
                                                className="wf-condition-delete-btn"
                                                onClick={() => removeConditionRow(setAllConditions, i)}
                                                title="Remove condition"
                                            >
                                                🗑
                                            </button>
                                        </div>
                                    ))}
                                    <button className="wf-add-condition-btn" onClick={() => addConditionRow(setAllConditions)}>
                                        Add Condition
                                    </button>
                                </div>

                                <div className="wf-condition-block">
                                    <div className="wf-condition-block-title">
                                        Any Conditions <span className="wf-condition-hint">(At least one of the conditions must be met)</span>
                                    </div>
                                    {anyConditions.map((row, i) => (
                                        <div className="wf-condition-row" key={i}>
                                            <select
                                                className="wf-condition-select"
                                                value={row.field}
                                                onChange={(e) => updateConditionRow(setAnyConditions, i, "field", e.target.value)}
                                            >
                                                {CONDITION_FIELDS.map((f) => (
                                                    <option key={f} value={f}>{f}</option>
                                                ))}
                                            </select>
                                            <select
                                                className="wf-condition-select"
                                                value={row.operator}
                                                onChange={(e) => updateConditionRow(setAnyConditions, i, "operator", e.target.value)}
                                            >
                                                {CONDITION_OPERATORS.map((o) => (
                                                    <option key={o} value={o}>{o}</option>
                                                ))}
                                            </select>
                                            <input
                                                type="text"
                                                className="wf-condition-value-input"
                                                value={row.value}
                                                onChange={(e) => updateConditionRow(setAnyConditions, i, "value", e.target.value)}
                                                placeholder="Value"
                                            />
                                            <button
                                                className="wf-condition-delete-btn"
                                                onClick={() => removeConditionRow(setAnyConditions, i)}
                                                title="Remove condition"
                                            >
                                                🗑
                                            </button>
                                        </div>
                                    ))}
                                    <button className="wf-add-condition-btn" onClick={() => addConditionRow(setAnyConditions)}>
                                        Add Condition
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ---------- Workflow Actions ---------- */}
                    <div className="wf-editor-section">
                        <h3 className="wf-editor-section-title">Workflow Actions</h3>

                        <div className="wf-action-menu-wrapper">
                            <button
                                className="wf-add-action-btn"
                                onClick={() => setShowActionMenu((prev) => !prev)}
                            >
                                Add Action <FaChevronDown />
                            </button>
                            {showActionMenu && (
                                <div className="wf-action-menu">
                                    {ACTION_TYPES.map((type) => (
                                        <div
                                            key={type}
                                            className="wf-action-menu-item"
                                            onClick={() => openActionModal(type)}
                                        >
                                            {type}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="wf-actions-table-wrap">
                            <table className="wf-actions-table">
                                <thead>
                                    <tr>
                                        <th>Active</th>
                                        <th>Action Type</th>
                                        <th>Action Title</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {actions.map((a, i) => (
                                        <tr key={i}>
                                            <td>
                                                <div className="wf-action-active-cell">
                                                    <button
                                                        className="wf-action-remove"
                                                        onClick={() => handleRemoveAction(i)}
                                                        title="Remove"
                                                    >
                                                        🗑
                                                    </button>
                                                    <ToggleSwitch
                                                        on={a.active}
                                                        onClick={() => handleToggleAction(i)}
                                                    />
                                                </div>
                                            </td>
                                            <td>{a.type}</td>
                                            <td className="wf-action-title-link">{a.title}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {actions.length === 0 && <div className="wf-no-actions">No Actions</div>}
                        </div>
                    </div>

                    {/* ---------- Save / Cancel ---------- */}
                    <div className="wf-editor-footer-bar">
                        <button className="wf-save-btn" onClick={handleSave}>Save</button>
                        <button className="wf-cancel-btn" onClick={() => navigate("/workflows")}>Cancel</button>
                    </div>

                </div>
            </PageTransition>

            {/* ---------- Add Action full-screen page ---------- */}
            {modalActionType && (
                <div className="wf-modal-overlay">
                    <div className="wf-modal-box">
                        <div className="wf-modal-header">
                            <span>Add Action for Workflow -&gt; {modalActionType}</span>
                            <button className="wf-modal-close" onClick={closeActionModal}>✕</button>
                        </div>
                        <div className="wf-modal-body">
                            <ActionFormBody type={modalActionType} data={modalData} setData={setModalData} />
                        </div>
                        <div className="wf-modal-footer">
                            <button className="wf-save-btn" onClick={handleSaveActionModal}>Save</button>
                            <button className="wf-cancel-btn" onClick={closeActionModal}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
}

export default WorkflowEditor;

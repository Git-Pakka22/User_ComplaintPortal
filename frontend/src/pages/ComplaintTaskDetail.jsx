import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import PageTransition from "../components/PageTransition";
import "../assets/complainttaskdetail.css";
import {
    FaClipboardList, FaChevronLeft, FaChevronRight, FaFileAlt,
    FaCommentDots, FaCaretDown,
} from "react-icons/fa";

// ---------------------------------------------------------------------------
// Mock detail data — keyed by the same `id` used in ComplaintTask.jsx's
// MOCK_ROWS. Extends each row with the extra fields the detail view needs
// (SLA info, description, profile validation / CAPA specifics).
// Replace this block with a real fetch (e.g. complaintTaskService.getById)
// once the backend endpoint exists.
// ---------------------------------------------------------------------------
const MOCK_TASK_DETAILS = {
    "QC-2026-27-981": {
        id: "QC-2026-27-981",
        taskName: "Complaint By tableware - TRAYCHOMBO:3CP-...",
        type: "Profile Validation",
        businessArea: "Tableware",
        assignedTo: "mukesh verma",
        relatedTo: "Complaint By tableware - TRAYCHOMBO:3CP-...",
        relatedSlug: "complaint-by-tableware-traychombo-3cp",
        status: "In Progress",
        priority: "—",
        source: "WORKFLOW",
        progress: "—",
        startDate: "—",
        endDate: "—",
        slaName: "Complaint Task SLA",
        reopenCount: "0",
        zone: "—",
        prePost: "Pre",
        firstActualResponse: "..",
        firstResponseStatus: "Time Left",
        totalHoursElapsed: "12 Minutes",
        slaActualResolution: "21-07-2026 6:10 PM",
        hoursToResolve: "23 hours, 41 minutes, 5 seconds",
        slaStatus: "Running",
        remarks: "",
        profileValidation: {
            isVisitRequired: "No",
            validComplaint: "Yes",
            lotNo: "70021103",
            productionDate: "12-07-2026",
            plant: "TW1",
        },
    },
    "QC-2026-27-980": {
        id: "QC-2026-27-980",
        taskName: "Complaint By sales - SWP 35GSM 26CM",
        type: "Profile Validation",
        businessArea: "Paper",
        assignedTo: "Ravendra Pratap Singh",
        relatedTo: "Complaint By sales - SWP 35GSM 26CM",
        relatedSlug: "complaint-by-sales-swp-35gsm-26cm",
        status: "In Progress",
        priority: "—",
        source: "WORKFLOW",
        progress: "—",
        startDate: "—",
        endDate: "—",
        slaName: "Complaint Task SLA",
        reopenCount: "0",
        zone: "—",
        prePost: "Pre",
        firstActualResponse: "..",
        firstResponseStatus: "Time Left",
        totalHoursElapsed: "31 Minutes",
        slaActualResolution: "21-07-2026 3:05 PM",
        hoursToResolve: "9 hours, 12 minutes, 40 seconds",
        slaStatus: "Running",
        remarks: "",
        profileValidation: {
            isVisitRequired: "No",
            validComplaint: "Yes",
            lotNo: "70020884",
            productionDate: "10-07-2026",
            plant: "PM1",
        },
    },
    "QC-2026-27-962": {
        id: "QC-2026-27-962",
        taskName: "Complaint By sales - SWP 28GSM 92.5CM",
        type: "CAPA Task",
        businessArea: "Paper",
        assignedTo: "R.P. Singh",
        relatedTo: "Complaint By sales - SWP 28GSM 92.5CM",
        relatedSlug: "complaint-by-sales-swp-28gsm-92-5cm",
        status: "Sent for Approval",
        priority: "High",
        source: "WORKFLOW",
        progress: "—",
        startDate: "15-07-2026",
        endDate: "—",
        slaName: "Complaint Task SLA",
        reopenCount: "0",
        zone: "—",
        prePost: "Post",
        firstActualResponse: "18-07-2026 11:02 AM",
        firstResponseStatus: "On Time",
        totalHoursElapsed: "3 days, 4 hours",
        slaActualResolution: "22-07-2026 11:02 AM",
        hoursToResolve: "18 hours, 58 minutes, 0 seconds",
        slaStatus: "Running",
        remarks: "Root cause traced to roll-change misalignment on PM2.",
        capaDetails: {
            rootCause: "Roll-change misalignment on PM2",
            correctiveAction: "Operator retraining + alignment gauge added",
            approver: "Jagjeet Singh Khanna",
            targetCloseDate: "25-07-2026",
        },
    },
    "QC-2026-27-979-a": {
        id: "QC-2026-27-979-a",
        taskName: "Complaint By sales - SEP 40GSM 100CM",
        type: "Profile Validation",
        businessArea: "Paper",
        assignedTo: "Ravendra Pratap Singh",
        relatedTo: "Complaint By sales - SEP 40GSM 100CM",
        relatedSlug: "complaint-by-sales-sep-40gsm-100cm",
        status: "Completed",
        priority: "—",
        source: "WORKFLOW",
        progress: "—",
        startDate: "09-07-2026",
        endDate: "10-07-2026",
        slaName: "Complaint Task SLA",
        reopenCount: "0",
        zone: "—",
        prePost: "Pre",
        firstActualResponse: "09-07-2026 2:14 PM",
        firstResponseStatus: "On Time",
        totalHoursElapsed: "18 Hours",
        slaActualResolution: "10-07-2026 9:00 AM",
        hoursToResolve: "0 hours, 0 minutes, 0 seconds",
        slaStatus: "Closed",
        remarks: "",
        profileValidation: {
            isVisitRequired: "No",
            validComplaint: "Yes",
            lotNo: "70019801",
            productionDate: "05-07-2026",
            plant: "PM1",
        },
    },
    "QC-2026-27-979-b": {
        id: "QC-2026-27-979-b",
        taskName: "Complaint By sales - SEP 40GSM 100CM",
        type: "CAPA Task",
        businessArea: "Paper",
        assignedTo: "Jagjeet Singh Khanna",
        relatedTo: "Complaint By sales - SEP 40GSM 100CM",
        relatedSlug: "complaint-by-sales-sep-40gsm-100cm",
        status: "In Progress",
        priority: "Normal",
        source: "WORKFLOW",
        progress: "—",
        startDate: "10-07-2026",
        endDate: "—",
        slaName: "Complaint Task SLA",
        reopenCount: "0",
        zone: "—",
        prePost: "Post",
        firstActualResponse: "..",
        firstResponseStatus: "Time Left",
        totalHoursElapsed: "2 days, 1 hour",
        slaActualResolution: "24-07-2026 9:00 AM",
        hoursToResolve: "2 days, 22 hours, 10 minutes",
        slaStatus: "Running",
        remarks: "",
        capaDetails: {
            rootCause: "Under investigation",
            correctiveAction: "—",
            approver: "—",
            targetCloseDate: "—",
        },
    },
    "QC-2026-27-973": {
        id: "QC-2026-27-973",
        taskName: "Complaint By sales - NCB 32GSM 127CM",
        type: "CAPA Task",
        businessArea: "Paper",
        assignedTo: "R.P. Singh",
        relatedTo: "Complaint By sales - NCB 32GSM 127CM",
        relatedSlug: "complaint-by-sales-ncb-32gsm-127cm",
        status: "CAPA Generated",
        priority: "High",
        source: "WORKFLOW",
        progress: "—",
        startDate: "02-07-2026",
        endDate: "—",
        slaName: "Complaint Task SLA",
        reopenCount: "1",
        zone: "—",
        prePost: "Post",
        firstActualResponse: "03-07-2026 10:40 AM",
        firstResponseStatus: "On Time",
        totalHoursElapsed: "6 days, 2 hours",
        slaActualResolution: "26-07-2026 10:40 AM",
        hoursToResolve: "4 days, 21 hours, 20 minutes",
        slaStatus: "Running",
        remarks: "Reopened after customer flagged repeat defect.",
        capaDetails: {
            rootCause: "Blade wear on slitting line",
            correctiveAction: "Blade replacement schedule tightened",
            approver: "Ravendra Pratap Singh",
            targetCloseDate: "29-07-2026",
        },
    },
    "QC-2026-27-954": {
        id: "QC-2026-27-954",
        taskName: "Complaint By sales - SWP 30GSM 70CM",
        type: "CAPA Task",
        businessArea: "Paper",
        assignedTo: "R.P. Singh",
        relatedTo: "Complaint By sales - SWP 30GSM 70CM",
        relatedSlug: "complaint-by-sales-swp-30gsm-70cm",
        status: "CAPA Generated",
        priority: "Normal",
        source: "WORKFLOW",
        progress: "—",
        startDate: "28-06-2026",
        endDate: "—",
        slaName: "Complaint Task SLA",
        reopenCount: "0",
        zone: "—",
        prePost: "Post",
        firstActualResponse: "29-06-2026 9:15 AM",
        firstResponseStatus: "On Time",
        totalHoursElapsed: "9 days, 4 hours",
        slaActualResolution: "23-07-2026 9:15 AM",
        hoursToResolve: "1 day, 20 hours, 45 minutes",
        slaStatus: "Running",
        remarks: "",
        capaDetails: {
            rootCause: "Moisture variance in raw pulp batch",
            correctiveAction: "Supplier moisture spec tightened",
            approver: "Jagjeet Singh Khanna",
            targetCloseDate: "31-07-2026",
        },
    },
    "QC-2026-27-978": {
        id: "QC-2026-27-978",
        taskName: "Complaint By sales - FSC-SWP",
        type: "Profile Validation",
        businessArea: "Paper",
        assignedTo: "Ravendra Pratap Singh",
        relatedTo: "Complaint By sales - FSC-SWP",
        relatedSlug: "complaint-by-sales-fsc-swp",
        status: "Completed",
        priority: "—",
        source: "WORKFLOW",
        progress: "—",
        startDate: "01-07-2026",
        endDate: "01-07-2026",
        slaName: "Complaint Task SLA",
        reopenCount: "0",
        zone: "—",
        prePost: "Pre",
        firstActualResponse: "01-07-2026 11:50 AM",
        firstResponseStatus: "On Time",
        totalHoursElapsed: "3 Hours",
        slaActualResolution: "01-07-2026 3:00 PM",
        hoursToResolve: "0 hours, 0 minutes, 0 seconds",
        slaStatus: "Closed",
        remarks: "",
        profileValidation: {
            isVisitRequired: "No",
            validComplaint: "Yes",
            lotNo: "70018420",
            productionDate: "28-06-2026",
            plant: "PM1",
        },
    },
};

const TASK_ID_ORDER = Object.keys(MOCK_TASK_DETAILS);

// Defensive fallback so the page never blank-crashes for an id the mock
// data doesn't know about yet (e.g. one of the other 2020 rows from the
// full list view).
function buildFallback(id) {
    return {
        id,
        taskName: id,
        type: "—",
        businessArea: "—",
        assignedTo: "—",
        relatedTo: "—",
        relatedSlug: "",
        status: "—",
        priority: "—",
        source: "—",
        progress: "—",
        startDate: "—",
        endDate: "—",
        slaName: "—",
        reopenCount: "—",
        zone: "—",
        prePost: "—",
        firstActualResponse: "—",
        firstResponseStatus: "—",
        totalHoursElapsed: "—",
        slaActualResolution: "—",
        hoursToResolve: "—",
        slaStatus: "—",
        remarks: "",
    };
}

// Renders a set of {label, value, onClick} pairs as a 4-column field grid.
function FieldGrid({ fields }) {
    return (
        <div className="detail-field-grid">
            {fields.map((f, i) => (
                <div
                    key={i}
                    className={`detail-field${f.full ? " detail-field--full" : ""}`}
                >
                    <div className="detail-field-label">{f.label}</div>
                    {f.onClick ? (
                        <button className="detail-field-link" onClick={f.onClick}>
                            {f.value}
                        </button>
                    ) : (
                        <div className="detail-field-value">{f.value || "\u00A0"}</div>
                    )}
                </div>
            ))}
        </div>
    );
}

function SectionBanner({ title }) {
    return (
        <div className="detail-section-banner">
            <FaCaretDown className="detail-section-caret" />
            {title}
        </div>
    );
}

function ComplaintTaskDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("details");

    const task = MOCK_TASK_DETAILS[id] || buildFallback(id);

    const currentIndex = TASK_ID_ORDER.indexOf(id);
    const goPrev = () => {
        if (currentIndex > 0) navigate(`/complaint-task/${TASK_ID_ORDER[currentIndex - 1]}`);
    };
    const goNext = () => {
        if (currentIndex >= 0 && currentIndex < TASK_ID_ORDER.length - 1) {
            navigate(`/complaint-task/${TASK_ID_ORDER[currentIndex + 1]}`);
        }
    };

    // NOTE: adjust this route to match wherever ComplaintDetail.jsx is
    // actually mounted in AppRoutes.jsx (e.g. /complaints/:slug).
    const goToRelated = () => {
        if (task.relatedSlug) navigate(`/complaints/${task.relatedSlug}`);
    };

    const taskDetailFields = [
        { label: "Complaint Task Name", value: task.taskName },
        { label: "Assigned To", value: task.assignedTo, onClick: () => {} },
        { label: "Type", value: task.type },
        { label: "Related To", value: task.relatedTo, onClick: goToRelated },
        { label: "Business Area", value: task.businessArea },
        { label: "Status", value: task.status },
        { label: "Priority", value: task.priority },
        { label: "Source", value: task.source },
        { label: "Progress", value: task.progress },
        { label: "End Date", value: task.endDate },
        { label: "Start Date", value: task.startDate },
        { label: "SLA Name", value: task.slaName, onClick: () => {} },
        { label: "Reopen Count", value: task.reopenCount },
        { label: "Zone", value: task.zone },
        { label: "Pre or Post", value: task.prePost },
        { label: "", value: "" },
    ];

    const slaFields = [
        { label: "First Actual Response", value: task.firstActualResponse },
        { label: "First Response Status", value: task.firstResponseStatus },
        { label: "Total Hours Elapsed", value: task.totalHoursElapsed },
        { label: "SLA Actual Resolution", value: task.slaActualResolution },
        { label: "Hours To Resolve", value: task.hoursToResolve },
        { label: "SLA Status", value: task.slaStatus },
    ];

    const descriptionFields = [
        { label: "Remarks", value: task.remarks, full: true },
    ];

    const profileValidationFields = task.profileValidation
        ? [
              { label: "Is Visit Required", value: task.profileValidation.isVisitRequired },
              { label: "Valid Complaint", value: task.profileValidation.validComplaint },
              { label: "Lot No", value: task.profileValidation.lotNo },
              { label: "Production Date", value: task.profileValidation.productionDate },
              { label: "Plant", value: task.profileValidation.plant },
              { label: "", value: "" },
          ]
        : null;

    const capaFields = task.capaDetails
        ? [
              { label: "Root Cause", value: task.capaDetails.rootCause },
              { label: "Approver", value: task.capaDetails.approver },
              { label: "Corrective Action", value: task.capaDetails.correctiveAction },
              { label: "Target Close Date", value: task.capaDetails.targetCloseDate },
          ]
        : null;

    return (
        <Layout>
            <PageTransition>
                <div className="task-detail-page">
                    <div className="task-detail-breadcrumb">
                        <span onClick={() => navigate("/complaint-task")}>COMPLAINT TASK</span>
                        <span className="crumb-sep">&gt;</span>
                        <span onClick={() => navigate("/complaint-task")}>All</span>
                        <span className="crumb-sep">&gt;</span>
                        <span className="crumb-current">{task.taskName}</span>
                    </div>

                    <div className="task-detail-topbar">
                        <div className="task-detail-thumb">
                            <FaClipboardList />
                        </div>
                        <div className="task-detail-titleblock">
                            <h1 className="task-detail-title">{task.taskName}</h1>
                            <button className="add-tag-btn">+ Add Tag</button>
                        </div>
                        <div className="task-detail-actions">
                            <button className="detail-btn">Follow</button>
                            <button className="detail-btn detail-btn--primary">Edit</button>
                            <button className="detail-btn detail-btn--primary">Add Document</button>
                            <button className="detail-btn detail-btn--primary">More <FaCaretDown /></button>
                            <div className="nav-arrows">
                                <button onClick={goPrev} disabled={currentIndex <= 0}>
                                    <FaChevronLeft />
                                </button>
                                <button
                                    className="nav-arrow--primary"
                                    onClick={goNext}
                                    disabled={currentIndex === -1 || currentIndex === TASK_ID_ORDER.length - 1}
                                >
                                    <FaChevronRight />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="task-detail-tabs">
                        <button
                            className={`detail-tab${activeTab === "details" ? " active" : ""}`}
                            onClick={() => setActiveTab("details")}
                        >
                            Details
                        </button>
                        <button
                            className={`detail-tab${activeTab === "updates" ? " active" : ""}`}
                            onClick={() => setActiveTab("updates")}
                        >
                            Updates
                        </button>
                        <button className="detail-tab detail-tab--icon"><FaFileAlt /></button>
                        <button className="detail-tab detail-tab--icon"><FaCommentDots /></button>
                        {task.capaDetails && <button className="detail-tab detail-tab--text">capa</button>}
                    </div>

                    {activeTab === "details" ? (
                        <div className="task-detail-body">
                            <SectionBanner title="Complaint Task Details" />
                            <FieldGrid fields={taskDetailFields} />

                            <SectionBanner title="SLA Information" />
                            <FieldGrid fields={slaFields} />

                            <SectionBanner title="Description Details" />
                            <FieldGrid fields={descriptionFields} />

                            {profileValidationFields && (
                                <>
                                    <SectionBanner title="Profile Validation" />
                                    <FieldGrid fields={profileValidationFields} />
                                </>
                            )}

                            {capaFields && (
                                <>
                                    <SectionBanner title="CAPA Details" />
                                    <FieldGrid fields={capaFields} />
                                </>
                            )}
                        </div>
                    ) : (
                        <div className="task-detail-empty">No updates yet.</div>
                    )}

                    <div className="task-footer">&copy; 2026 Yash Pakka Limited</div>
                </div>
            </PageTransition>
        </Layout>
    );
}

export default ComplaintTaskDetail;

import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import PageTransition from "../components/PageTransition";
import "../assets/complainttask.css";
import {
    FaClock, FaCheckCircle, FaPaperPlane, FaClipboardCheck, FaTasks,
} from "react-icons/fa";

const STATUS_TONE = {
    "In Progress": "status-amber",
    "Completed": "status-green",
    "Sent for Approval": "status-blue",
    "CAPA Generated": "status-purple",
};

const MOCK_ROWS = [
    { id: "QC-2026-27-981", complaintNumber: "QC-2026-27-981", taskName: "Complaint By tableware - TRAYCHOMBO:3CP-...", type: "Profile Validation", relatedTo: "Complaint By tableware - TRAYCHOMBO:3CP-...", businessArea: "Tableware", assignedTo: "mukesh verma", status: "In Progress" },
    { id: "QC-2026-27-980", complaintNumber: "QC-2026-27-980", taskName: "Complaint By sales - SWP 35GSM 26CM", type: "Profile Validation", relatedTo: "Complaint By sales - SWP 35GSM 26CM", businessArea: "Paper", assignedTo: "Ravendra Pratap Singh", status: "In Progress" },
    { id: "QC-2026-27-962", complaintNumber: "QC-2026-27-962", taskName: "Complaint By sales - SWP 28GSM 92.5CM", type: "CAPA Task", relatedTo: "Complaint By sales - SWP 28GSM 92.5CM", businessArea: "Paper", assignedTo: "R.P. Singh", status: "Sent for Approval" },
    { id: "QC-2026-27-979-a", complaintNumber: "QC-2026-27-979", taskName: "Complaint By sales - SEP 40GSM 100CM", type: "Profile Validation", relatedTo: "Complaint By sales - SEP 40GSM 100CM", businessArea: "Paper", assignedTo: "Ravendra Pratap Singh", status: "Completed" },
    { id: "QC-2026-27-979-b", complaintNumber: "QC-2026-27-979", taskName: "Complaint By sales - SEP 40GSM 100CM", type: "CAPA Task", relatedTo: "Complaint By sales - SEP 40GSM 100CM", businessArea: "Paper", assignedTo: "Jagjeet Singh Khanna", status: "In Progress" },
    { id: "QC-2026-27-973", complaintNumber: "QC-2026-27-973", taskName: "Complaint By sales - NCB 32GSM 127CM", type: "CAPA Task", relatedTo: "Complaint By sales - NCB 32GSM 127CM", businessArea: "Paper", assignedTo: "R.P. Singh", status: "CAPA Generated" },
    { id: "QC-2026-27-954", complaintNumber: "QC-2026-27-954", taskName: "Complaint By sales - SWP 30GSM 70CM", type: "CAPA Task", relatedTo: "Complaint By sales - SWP 30GSM 70CM", businessArea: "Paper", assignedTo: "R.P. Singh", status: "CAPA Generated" },
    { id: "QC-2026-27-978", complaintNumber: "QC-2026-27-978", taskName: "Complaint By sales - FSC-SWP", type: "Profile Validation", relatedTo: "Complaint By sales - FSC-SWP", businessArea: "Paper", assignedTo: "Ravendra Pratap Singh", status: "Completed" },
];

// Grid columns — "Assigned To" removed; widths rebalanced across the
// remaining 6 columns for even, comfortable spacing.
const GRID_TEMPLATE = "170px 1.8fr 140px 1.8fr 150px 170px";

const GRID_COLUMNS = [
    { key: "complaintNumber", label: "Complaint Number" },
    { key: "taskName", label: "Complaint Task Name" },
    { key: "type", label: "Type" },
    { key: "relatedTo", label: "Related To" },
    { key: "businessArea", label: "Business Area" },
    { key: "status", label: "Status" },
];

// Stat card definitions — icon, colour, label, and how to count it from
// MOCK_ROWS. counted live below via `.filter(...).length` per card.
const STAT_CARD_DEFS = [
    { key: "In Progress", icon: <FaClock />, color: "#f5a623", label: "In Progress" },
    { key: "Sent for Approval", icon: <FaPaperPlane />, color: "#2159a6", label: "Sent for Approval" },
    { key: "CAPA Generated", icon: <FaClipboardCheck />, color: "#6a3fa0", label: "CAPA Generated" },
    { key: "Completed", icon: <FaCheckCircle />, color: "#227a45", label: "Completed" },
    { key: "__total__", icon: <FaTasks />, color: "#7c5cbf", label: "Total Tasks" },
];

function ComplaintTask() {
    const navigate = useNavigate();
    const goToTask = (id) => navigate(`/complaint-task/${id}`);

    const statCards = STAT_CARD_DEFS.map((def) => ({
        ...def,
        value: def.key === "__total__"
            ? MOCK_ROWS.length
            : MOCK_ROWS.filter((r) => r.status === def.key).length,
    }));

    return (
        <Layout>
            <PageTransition>
                <div className="complaint-task-page">

                    {/* Stat Cards */}
                    <div className="task-stat-cards-row">
                        {statCards.map((card) => (
                            <div className="task-stat-card" key={card.label} style={{ borderLeftColor: card.color }}>
                                <div className="task-stat-card-icon" style={{ color: card.color, background: `${card.color}18` }}>
                                    {card.icon}
                                </div>
                                <div className="task-stat-card-body">
                                    <div className="task-stat-card-value">{card.value}</div>
                                    <div className="task-stat-card-label">{card.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Clean table only — no breadcrumb, add button, or icon toolbar */}
                    <div className="task-table-card">
                        <div className="grid-table" role="table" aria-label="Complaint tasks">

                            <div
                                className="grid-row grid-row--head"
                                role="row"
                                style={{ gridTemplateColumns: GRID_TEMPLATE }}
                            >
                                {GRID_COLUMNS.map((col) => (
                                    <div key={col.key} role="columnheader" className="grid-cell grid-cell--head">
                                        {col.label}
                                    </div>
                                ))}
                            </div>

                            {MOCK_ROWS.length === 0 ? (
                                <div className="empty-row">No matching tasks found.</div>
                            ) : (
                                MOCK_ROWS.map((row) => (
                                    <div
                                        key={row.id}
                                        role="row"
                                        className="grid-row"
                                        style={{ gridTemplateColumns: GRID_TEMPLATE }}
                                    >
                                        <div role="cell" className="grid-cell">
                                            <button className="id-badge" onClick={() => goToTask(row.id)}>
                                                {row.complaintNumber}
                                            </button>
                                        </div>
                                        <div role="cell" className="grid-cell">
                                            <button className="cell-link cell-link--strong" onClick={() => goToTask(row.id)}>
                                                {row.taskName}
                                            </button>
                                        </div>
                                        <div role="cell" className="grid-cell grid-cell--muted">
                                            {row.type}
                                        </div>
                                        <div role="cell" className="grid-cell">
                                            <button className="cell-link" onClick={() => goToTask(row.id)}>
                                                {row.relatedTo}
                                            </button>
                                        </div>
                                        <div role="cell" className="grid-cell grid-cell--muted">
                                            {row.businessArea}
                                        </div>
                                        <div role="cell" className="grid-cell">
                                            <span className={`status-pill ${STATUS_TONE[row.status] || ""}`}>
                                                {row.status}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    <div className="task-footer">&copy; 2026 Yash Pakka Limited</div>
                </div>
            </PageTransition>
        </Layout>
    );
}

export default ComplaintTask;

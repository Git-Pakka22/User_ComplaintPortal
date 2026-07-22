import Layout from "../components/Layout";
import "../assets/dashboard-home.css";
import { useNavigate } from "react-router-dom";
import {
    FaClipboardList, FaCheckCircle, FaUndoAlt,
    FaExclamationTriangle, FaUsers, FaFileInvoice,
    FaListAlt, FaEdit, FaPaperPlane, FaTicketAlt,
    FaArrowRight,
} from "react-icons/fa";
import PageTransition from "../components/PageTransition";

const processSteps = [
    {
        icon: <FaFileInvoice />,
        title: "Select Invoice",
        desc: "Dealer selects Invoice or Dispatch from dropdown list",
        path: "/new-complaint",
        color: "#f5a623",
    },
    {
        icon: <FaListAlt />,
        title: "View Line Items",
        desc: "System displays all line items for the selected invoice",
        path: "/new-complaint",
        color: "#2196f3",
    },
    {
        icon: <FaEdit />,
        title: "Fill Complaint",
        desc: "Enter Qty, Reels, Visit Required, Type, Photos & Remarks",
        path: "/new-complaint",
        color: "#9e1f3d",
    },
    {
        icon: <FaPaperPlane />,
        title: "Submit",
        desc: "Submit complaint for each selected line item",
        path: "/new-complaint",
        color: "#6b7c2d",
    },
    {
        icon: <FaTicketAlt />,
        title: "Tracking Number",
        desc: "Unique complaint tracking number generated per line item",
        path: "/complaints",
        color: "#7c5cbf",
    },
];

const statCards = [
    { icon: <FaClipboardList />, color: "#f5a623", label: "Pending Review",    value: 0  },
    { icon: <FaCheckCircle />,   color: "#2196f3", label: "Approved / Active", value: 0  },
    { icon: <FaUndoAlt />,       color: "#9e1f3d", label: "Revoked",           value: 0  },
    { icon: <FaExclamationTriangle />, color: "#6b7c2d", label: "Completed",   value: 0  },
    { icon: <FaUsers />,         color: "#7c5cbf", label: "Total Complaints",  value: 899},
];

function Dashboard() {
    const navigate = useNavigate();

    return (
        <Layout>
            <PageTransition> 
            <div className="db-home-page">

                {/* ── Page Title ── */}
                <div className="db-home-title-row">
                    <div>
                        <h1 className="db-home-title">Complaint Management Dashboard</h1>
                        <p className="db-home-subtitle">
                            Automated Complaint Management Process — follow the steps below to submit and track complaints.
                        </p>
                    </div>
                    <div className="db-home-actions">
                        <button
                            className="db-btn-orange"
                            onClick={() => navigate("/new-complaint")}
                        >
                            <FaArrowRight /> Submit New Complaint
                        </button>
                        <button
                            className="db-btn-maroon"
                            onClick={() => navigate("/complaints")}
                        >
                            <FaListAlt /> View All Complaints
                        </button>
                    </div>
                </div>

                {/* ── Stat Cards ── */}
                <div className="db-stat-cards-row">
                    {statCards.map((card) => (
                        <div
                            className="db-stat-card"
                            key={card.label}
                            style={{ borderLeftColor: card.color }}
                            onClick={() => navigate("/complaints")}
                        >
                            <div
                                className="db-stat-icon"
                                style={{ color: card.color, background: `${card.color}18` }}
                            >
                                {card.icon}
                            </div>
                            <div className="db-stat-body">
                                <div className="db-stat-value">{card.value}</div>
                                <div className="db-stat-label">{card.label}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── Process Flow ── */}
                <div className="db-section-card">
                    <div className="db-section-header">
                        <h2 className="db-section-title">Automated Complaint Process Flow</h2>
                        <p className="db-section-sub">Click any step to begin</p>
                    </div>

                    <div className="db-stepper">
                        {processSteps.map((step, idx) => (
                            <div key={step.title} className="db-stepper-item-wrap">
                                <div
                                    className="db-stepper-item"
                                    onClick={() => navigate(step.path)}
                                    style={{ borderTopColor: step.color }}
                                >
                                    <div
                                        className="db-stepper-icon"
                                        style={{ color: step.color, background: `${step.color}18` }}
                                    >
                                        {step.icon}
                                    </div>
                                    <div className="db-stepper-num" style={{ color: step.color }}>
                                        Step {idx + 1}
                                    </div>
                                    <div className="db-stepper-title">{step.title}</div>
                                    <div className="db-stepper-desc">{step.desc}</div>
                                </div>

                                {idx < processSteps.length - 1 && (
                                    <div className="db-stepper-arrow">
                                        <FaArrowRight />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── SOP Guide ── */}
                <div className="db-section-card">
                    <div className="db-section-header">
                        <h2 className="db-section-title">Process Guide</h2>
                        <p className="db-section-sub">What happens at each step</p>
                    </div>

                    <div className="db-guide-grid">

                        <div className="db-guide-step">
                            <div className="db-guide-step-badge" style={{ background: "#f5a62320", color: "#f5a623" }}>
                                <FaFileInvoice /> Step 1
                            </div>
                            <h4>Complaint Submission</h4>
                            <p>Dealers submit complaints via the Customer Portal. Select an Invoice or Dispatch from the dropdown.</p>
                            <ul>
                                <li>Dealer selects Invoice or Dispatch</li>
                                <li>System displays all line items</li>
                                <li>User selects line item and clicks Add</li>
                            </ul>
                        </div>

                        <div className="db-guide-step">
                            <div className="db-guide-step-badge" style={{ background: "#2196f320", color: "#2196f3" }}>
                                <FaListAlt /> Step 2
                            </div>
                            <h4>Read-Only Line Item Details</h4>
                            <p>The following fields are auto-filled from the invoice and shown in read-only mode:</p>
                            <ul>
                                <li>Item Product Name</li>
                                <li>Grade &amp; Variety</li>
                                <li>GSM, Qty Billed</li>
                                <li>No of Reels / Sheets</li>
                            </ul>
                        </div>

                        <div className="db-guide-step">
                            <div className="db-guide-step-badge" style={{ background: "#9e1f3d20", color: "#9e1f3d" }}>
                                <FaEdit /> Step 3
                            </div>
                            <h4>Complaint Input Fields</h4>
                            <p>User fills in the complaint-specific details on the same line:</p>
                            <ul>
                                <li>Complaint Qty (KG)</li>
                                <li>Complaint No of Reels / Sheets</li>
                                <li>Visit Required — Yes / No</li>
                                <li>Type of Complaint (multi-select)</li>
                                <li>Upload multiple photos</li>
                                <li>Description / Remarks</li>
                            </ul>
                        </div>

                        <div className="db-guide-step">
                            <div className="db-guide-step-badge" style={{ background: "#7c5cbf20", color: "#7c5cbf" }}>
                                <FaTicketAlt /> Step 4
                            </div>
                            <h4>Tracking &amp; Submission</h4>
                            <p>Multiple line items can be added per invoice. On submission:</p>
                            <ul>
                                <li>Each line item generates a unique complaint tracking number</li>
                                <li>Complaint is routed for review</li>
                                <li>Status tracked in Complaints dashboard</li>
                            </ul>
                            <button
                                className="db-btn-orange db-btn-sm"
                                onClick={() => navigate("/new-complaint")}
                            >
                                Start a Complaint →
                            </button>
                        </div>

                    </div>
                </div>

            </div>
            </PageTransition>
        </Layout>
    );
}

export default Dashboard;
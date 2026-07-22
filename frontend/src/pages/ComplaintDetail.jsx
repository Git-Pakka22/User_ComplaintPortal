import { useState, useRef } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import Layout from "../components/Layout";
import PageTransition from "../components/PageTransition";
import "../assets/complaint-detail.css";
import {
    FaPuzzlePiece, FaClipboardList, FaPaperclip, FaChartLine, 
    FaHourglassHalf, FaCheckDouble, FaExclamationTriangle, 
    FaMinus, FaArrowDown, FaLayerGroup,
    FaFileAlt, FaListUl,
} from "react-icons/fa";
import { getComplaintById } from "../services/complaintService";

const LIST_COLUMNS = ["Column 1", "Column 2", "Column 3", "Column 4", "Column 5"];
const LIST_ROW_COUNT = 7;
const VALID_TABS = ["summary", "details", "list", "updates"];

function DetailSection({ title, children }) {
    return (
        <div className="detail-section">
            <div className="detail-section-header">{title}</div>
            <div className="detail-section-grid">{children}</div>
        </div>
    );
}

function Field({ label, value }) {
    return (
        <div className="detail-field">
            <div className="detail-field-label">{label}</div>
            <div className="detail-field-value">{value || <span className="empty-value">—</span>}</div>
        </div>
    );
}

function ComplaintDetail() {
    const { id } = useParams();
    const complaint = getComplaintById(id);
    const navigate = useNavigate();

    // Active tab now lives in the URL (?tab=details) so it survives a refresh.
    const [searchParams, setSearchParams] = useSearchParams();
    const tabFromUrl = searchParams.get("tab");
    const activeTab = VALID_TABS.includes(tabFromUrl) ? tabFromUrl : "summary";
    const setActiveTab = (tab) => {
        setSearchParams((prev) => {
            const next = new URLSearchParams(prev);
            next.set("tab", tab);
            return next;
        });
    };

    const [docFileName, setDocFileName] = useState("");
    const docInputRef = useRef(null);

    // List tab state
    const [listData, setListData] = useState(
        Array.from({ length: LIST_ROW_COUNT }, () => Array(LIST_COLUMNS.length).fill(""))
    );
    const [showListForm, setShowListForm] = useState(false);
    const [formColumn, setFormColumn] = useState(0);
    const [formRow, setFormRow] = useState(0);
    const [formValue, setFormValue] = useState("");

    const handleNewDocumentClick = () => {
        docInputRef.current?.click();
    };

    const handleDocFileChange = (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) setDocFileName(file.name);
    };

    const handleAddListElement = () => {
        if (!formValue.trim()) return;
        setListData((prev) => {
            const next = prev.map((row) => [...row]);
            next[formRow][formColumn] = formValue.trim();
            return next;
        });
        setFormValue("");
        setShowListForm(false);
    };

    const handleCancelListForm = () => {
        setFormValue("");
        setShowListForm(false);
    };

    if (!complaint) {
        return (
            <Layout>
                <PageTransition>
                    <div className="complaint-detail-page">
                        <div className="not-found-box">
                            <h2>Complaint not found</h2>
                            <p>We couldn't find a complaint with number "{id}".</p>
                            <button className="btn add-btn" onClick={() => navigate("/complaints")}>
                                Back to Complaints
                            </button>
                        </div>
                    </div>
                </PageTransition>
            </Layout>
        );
    }

    const km = complaint.keyMetrics;

    const metricsList = [
        { label: "Tasks Open", value: km.tasksOpen, icon: <FaClipboardList />, color: "amber" },
        { label: "Progress", value: km.progress, icon: <FaChartLine />, color: "blue" },
        { label: "Tasks Due", value: km.tasksDue, icon: <FaHourglassHalf />, color: "maroon" },
        { label: "Tasks Completed", value: km.tasksCompleted, icon: <FaCheckDouble />, color: "olive" },
        { label: "High Priority", value: km.highPriority, icon: <FaExclamationTriangle />, color: "purple" },
        { label: "Normal Priority", value: km.normalPriority, icon: <FaMinus />, color: "teal" },
        { label: "Low Priority", value: km.lowPriority, icon: <FaArrowDown />, color: "indigo" },
        { label: "Other Priorities", value: km.otherPriorities, icon: <FaLayerGroup />, color: "slate" },
    ];

    return (
        <Layout>
            <PageTransition>
                <div className="complaint-detail-page">

                    {/* Breadcrumb */}
                    <div className="breadcrumb">
                        <span onClick={() => navigate("/complaints")} className="breadcrumb-link">COMPLAINTS</span>
                        <span className="breadcrumb-sep">›</span>
                        <span onClick={() => navigate("/complaints")} className="breadcrumb-link">All</span>
                        <span className="breadcrumb-sep">›</span>
                        <span className="breadcrumb-current">{complaint.name}</span>
                    </div>

                    {/* Header */}
                    <div className="complaint-header">
                        <div className="complaint-header-left">
                            <div className="complaint-icon-box">
                                <FaPuzzlePiece />
                            </div>
                            <div>
                                <h1 className="complaint-title">{complaint.name}</h1>
                            </div>
                        </div>
                        
                    </div>

                    {/* Tabs */}
                    <div className="detail-tabs-row">
                        <button
                            className={`detail-tab ${activeTab === "summary" ? "active" : ""}`}
                            onClick={() => setActiveTab("summary")}
                        >
                            Summary
                        </button>
                        <button
                            className={`detail-tab ${activeTab === "details" ? "active" : ""}`}
                            onClick={() => setActiveTab("details")}
                        >
                            Details
                        </button>
                        <button
                            className={`detail-tab ${activeTab === "list" ? "active" : ""}`}
                            onClick={() => setActiveTab("list")}
                        >
                            List
                        </button>
                        <button
                            className={`detail-tab ${activeTab === "updates" ? "active" : ""}`}
                            onClick={() => setActiveTab("updates")}
                        >
                            Updates
                        </button>
                    </div>

                    {/* SUMMARY TAB */}
                    {activeTab === "summary" && (
                        <div className="summary-grid">
                            <div className="summary-col">
                                <div className="panel">
                                    <h3 className="panel-title">Key Fields</h3>
                                    <Field label="Complaint Name" value={complaint.name} />
                                    <Field label="Start Date" value={complaint.createdTime.split(" ")[0]} />
                                    <Field label="Status" value={complaint.status} />
                                    <Field label="Assigned To" value={<span className="link-text">{complaint.assignedTo}</span>} />
                                </div>

                                <div className="panel">
                                    <h3 className="panel-title">Notes</h3>
                                    <textarea className="notes-textarea" placeholder="Click to start noting" />
                                    <div className="notes-row">
                                        <button className="attach-btn"><FaPaperclip /> Attach Files</button>
                                        <button className="btn post-btn">Post</button>
                                    </div>
                                </div>
                            </div>

                            <div className="summary-col">
                                <div className="panel">
                                    <h3 className="panel-title">Key Metrics</h3>
                                    <div className="metrics-grid">
                                        {metricsList.map((m, i) => (
                                            <div className={`metric-box metric-${m.color}`} key={i}>
                                                <div className="metric-icon-badge">{m.icon}</div>
                                                <div className="metric-text">
                                                    <div className="metric-value">{m.value}</div>
                                                    <div className="metric-label">{m.label}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="summary-col">
                                <div className="panel">
                                    <div className="panel-header-row">
                                        <h3 className="panel-title">Tasks</h3>
                                        <button className="btn small-add-btn">+ Add</button>
                                    </div>
                                    <div className="tasks-filter-row">
                                        <select className="notes-select"><option>Progress - All</option></select>
                                        <select className="notes-select"><option>Select Status</option></select>
                                    </div>
                                    {complaint.tasks.map((t, i) => (
                                        <div className="task-row" key={i}>
                                            <div className="task-name">{t.name}</div>
                                            <div className="task-meta">
                                                <span>Progress :</span>
                                                <span className={`status-pill ${t.status === "Completed" ? "completed" : "running"}`}>
                                                    {t.status} ▾
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="panel">
                                    <div className="panel-header-row">
                                        <h3 className="panel-title">Documents</h3>
                                        <button className="btn small-add-btn" onClick={handleNewDocumentClick}>
                                            + New Document
                                        </button>
                                        <input
                                            type="file"
                                            ref={docInputRef}
                                            className="hidden-file-input"
                                            onChange={handleDocFileChange}
                                        />
                                    </div>
                                    {docFileName ? (
                                        <div className="doc-selected-row">
                                            <FaFileAlt />
                                            <span>{docFileName}</span>
                                        </div>
                                    ) : (
                                        <div className="no-documents">No Related Documents</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* DETAILS TAB */}
                    {activeTab === "details" && (
                        <div className="details-tab">
                            <DetailSection title="Complaint Details">
                                <div className="detail-col">
                                    <Field label="Complaint Name" value={complaint.name} />
                                    <Field label="Business Area" value={complaint.businessArea} />
                                    <Field label="Start Date" value="" />
                                    <Field label="Status" value={complaint.status} />
                                    <Field label="Source" value={complaint.source} />
                                    <Field label="Priority" value={complaint.priority} />
                                    <Field label="Invoice Number" value={complaint.invoiceNumber} />
                                    <Field label="Reopen Count" value={complaint.reopenCount} />
                                    <Field label="SLA Name" value={complaint.slaName} />
                                    <Field label="Zone" value={complaint.zone} />
                                </div>
                                <div className="detail-col">
                                    <Field label="Assigned To" value={<span className="link-text">{complaint.assignedTo}</span>} />
                                    <Field label="Related To" value={<span className="link-text">{complaint.relatedTo}</span>} />
                                    <Field label="Target End Date" value={complaint.targetEndDate} />
                                    <Field label="Actual End Date" value={complaint.actualEndDate} />
                                    <Field label="Complaint Number" value={complaint.complaintNumber} />
                                    <Field label="Progress" value={complaint.progress} />
                                    <Field label="Customer Name" value={complaint.customerName} />
                                    <Field label="Customer SAP Id" value={complaint.customerSapId} />
                                    <Field label="Phase" value={complaint.phase} />
                                </div>
                            </DetailSection>

                            <DetailSection title="Custom Information">
                                <div className="detail-col">
                                    <Field label="Created Time" value={complaint.createdTime} />
                                </div>
                                <div className="detail-col">
                                    <Field label="Modified Time" value={complaint.modifiedTime} />
                                </div>
                            </DetailSection>

                            <DetailSection title="SLA Information">
                                <div className="detail-col">
                                    <Field label="First Actual Response" value={complaint.firstActualResponse} />
                                    <Field label="Total Hours Elapsed" value={<span className="link-text">{complaint.totalHoursElapsed}</span>} />
                                    <Field label="Hours To Resolve" value={<span className="link-text">{complaint.hoursToResolve}</span>} />
                                </div>
                                <div className="detail-col">
                                    <Field label="First Response Status" value={complaint.firstResponseStatus} />
                                    <Field label="SLA Actual Resolution" value={complaint.slaActualResolution} />
                                    <Field label="SLA Status" value={<span className="status-pill running">{complaint.slaStatus}</span>} />
                                </div>
                            </DetailSection>

                            <DetailSection title="Description Details">
                                <div className="detail-col full-width">
                                    <Field label="Description" value={complaint.description} />
                                </div>
                            </DetailSection>

                            <DetailSection title="Item Details">
                                <div className="detail-col">
                                    <Field label="Item Description" value={complaint.item.itemDescription} />
                                    <Field label="GSM" value={complaint.item.gsm} />
                                    <Field label="Complained Quantity" value={<span className="link-text">{complaint.item.complainedQuantity}</span>} />
                                    <Field label="Complained Number of Sheets or Reels" value={<span className="link-text">{complaint.item.complainedSheetsOrReels}</span>} />
                                    <Field label="Type of Complaints" value={complaint.item.typeOfComplaints} />
                                    <Field label="Dispatch Date" value={complaint.item.dispatchDate} />
                                </div>
                                <div className="detail-col">
                                    <Field label="Variety" value={complaint.item.variety} />
                                    <Field label="Billed Quantity" value={complaint.item.billedQuantity} />
                                    <Field label="Billed Number of Sheets or Reels" value={complaint.item.billedSheetsOrReels} />
                                    <Field label="Visit Required" value={complaint.item.visitRequired} />
                                    <Field label="CAPA Document" value={<span className="muted-value">{complaint.item.capaDocument}</span>} />
                                </div>
                            </DetailSection>
                        </div>
                    )}

                    {/* LIST TAB */}
                    {activeTab === "list" && (
                        <div className="list-tab">
                            <div className="list-tab-header">
                                <h3 className="list-tab-title"><FaListUl /> List</h3>
                                <button
                                    className="btn small-add-btn"
                                    onClick={() => setShowListForm((prev) => !prev)}
                                >
                                    + Add Element
                                </button>
                            </div>

                            {showListForm && (
                                <div className="list-add-form">
                                    <select
                                        value={formColumn}
                                        onChange={(e) => setFormColumn(Number(e.target.value))}
                                    >
                                        {LIST_COLUMNS.map((col, i) => (
                                            <option key={col} value={i}>{col}</option>
                                        ))}
                                    </select>
                                    <select
                                        value={formRow}
                                        onChange={(e) => setFormRow(Number(e.target.value))}
                                    >
                                        {Array.from({ length: LIST_ROW_COUNT }, (_, i) => (
                                            <option key={i} value={i}>Row {i + 1}</option>
                                        ))}
                                    </select>
                                    <input
                                        type="text"
                                        placeholder="Value"
                                        value={formValue}
                                        onChange={(e) => setFormValue(e.target.value)}
                                    />
                                    <button className="list-form-submit" onClick={handleAddListElement}>
                                        Add
                                    </button>
                                    <button className="list-form-cancel" onClick={handleCancelListForm}>
                                        Cancel
                                    </button>
                                </div>
                            )}

                            <div className="list-table-wrap">
                                <table className="list-table">
                                    <thead>
                                        <tr>
                                            {LIST_COLUMNS.map((col) => (
                                                <th key={col}>{col}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listData.map((row, rIdx) => (
                                            <tr key={rIdx}>
                                                {row.map((cell, cIdx) => (
                                                    <td key={cIdx}>
                                                        {cell || <span className="empty-value">—</span>}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* UPDATES TAB */}
                    {activeTab === "updates" && (
                        <div className="updates-tab">
                            {complaint.updates.map((u, i) => (
                                <div className="update-row" key={i}>
                                    <div className="update-time">{u.time}</div>
                                    <div className="update-icon"><FaClipboardList /></div>
                                    <div className="update-body">
                                        <span className="update-title">{u.title}</span>
                                        <span className="update-linked"> Linked</span>
                                        <div className="update-detail">{u.detail}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                </div>
            </PageTransition>
        </Layout>
    );
}

export default ComplaintDetail;

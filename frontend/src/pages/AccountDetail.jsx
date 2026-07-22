import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import PageTransition from "../components/PageTransition";
import "../assets/complaint-detail.css";
import "../assets/account-detail.css";
import {
    FaBuilding, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt,
    FaStickyNote, FaCommentDots, FaClipboardList, FaFileAlt,
    FaFileInvoiceDollar, FaRegFileAlt, FaChevronLeft, FaChevronRight,
    FaPaperclip, FaImage, FaDownload, FaUserFriends,
} from "react-icons/fa";
import { getAccountById } from "../services/accountService";

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

function AccountDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("summary");

    const account = getAccountById(decodeURIComponent(id));

    if (!account) {
        return (
            <Layout>
                <PageTransition>
                    <div className="complaint-detail-page">
                        <div className="not-found-box">
                            <h2>Account not found</h2>
                            <p>We couldn't find an account named "{decodeURIComponent(id)}".</p>
                            <button className="btn add-btn" onClick={() => navigate("/complaints")}>
                                Back to Complaints
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
                <div className="complaint-detail-page">

                    {/* Breadcrumb */}
                    <div className="breadcrumb">
                        <span className="breadcrumb-link" onClick={() => navigate("/complaints")}>ACCOUNTS</span>
                        <span className="breadcrumb-sep">›</span>
                        <span className="breadcrumb-link" onClick={() => navigate("/complaints")}>All</span>
                        <span className="breadcrumb-sep">›</span>
                        <span className="breadcrumb-current">{account.name}</span>
                    </div>

                    {/* Header */}
                    <div className="complaint-header account-header">
                        <div className="complaint-header-left">
                            <div className="complaint-icon-box account-icon-box">
                                <FaBuilding />
                            </div>
                            <div>
                                <h1 className="complaint-title">{account.name}</h1>
                                <div className="account-contact-line">
                                    <FaEnvelope className="account-contact-icon" />
                                    <a href={`mailto:${account.email}`}>{account.email}</a>
                                </div>
                                <div className="account-contact-line">
                                    <FaPhoneAlt className="account-contact-icon" />
                                    <span>{account.phone}</span>
                                </div>
                                <div className="account-contact-line">
                                    <FaMapMarkerAlt className="account-contact-icon" />
                                    <span className="link-text">Show Map</span>
                                </div>
                                <button className="add-tag-btn" style={{ marginTop: 8 }}>+ Add Tag</button>
                            </div>
                        </div>

                        <div className="account-mis-badges">
                            <div className="mis-badge">
                                <div className="mis-badge-label">Monthly Target</div>
                                <div className="mis-badge-value">{account.monthlyTarget.toLocaleString()}</div>
                            </div>
                            <div className="mis-badge">
                                <div className="mis-badge-label">MTD Dispatch</div>
                                <div className="mis-badge-value">{account.mtdDispatch.toLocaleString()}</div>
                            </div>
                            <div className="mis-badge">
                                <div className="mis-badge-label">Total Pending Order</div>
                                <div className="mis-badge-value">{account.totalPendingOrder.toLocaleString()}</div>
                            </div>
                            <div className="mis-badge">
                                <div className="mis-badge-label">Asking Rate</div>
                                <div className="mis-badge-value">{account.askingRate.toLocaleString()}</div>
                            </div>
                        </div>

                        <div className="complaint-header-right">
                            <button className="btn header-btn">Add Customform</button>
                            <button className="btn header-btn">Follow</button>
                            <button className="btn header-btn">Edit</button>
                            <button className="btn header-btn">Send Email</button>
                            <button className="btn header-btn">More ▾</button>
                            <button className="icon-btn nav-arrow"><FaChevronLeft /></button>
                            <button className="icon-btn nav-arrow"><FaChevronRight /></button>
                        </div>
                    </div>

                    <div className="account-outline-buttons">
                        <button className="outline-btn"><FaFileInvoiceDollar /> Banking Details</button>
                        <button className="outline-btn"><FaRegFileAlt /> Other Details</button>
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
                            className={`detail-tab ${activeTab === "updates" ? "active" : ""}`}
                            onClick={() => setActiveTab("updates")}
                        >
                            Updates
                        </button>
                        <div className="detail-tabs-icons">
                            <span className="clipboard-icon" title="Contacts">
                                <FaUserFriends />
                                <span className="clipboard-badge">1</span>
                            </span>
                            <FaCommentDots title="Comments" />
                            <span className="clipboard-icon" title="Tasks">
                                <FaClipboardList />
                                <span className="clipboard-badge">1</span>
                            </span>
                            <span className="clipboard-icon" title="Emails">
                                <FaEnvelope />
                                <span className="clipboard-badge">105</span>
                            </span>
                            <span className="clipboard-icon" title="Notes">
                                <FaStickyNote />
                                <span className="clipboard-badge">2</span>
                            </span>
                            <span className="clipboard-icon" title="Invoices">
                                <FaFileAlt />
                                <span className="clipboard-badge">1142</span>
                            </span>
                            <span className="clipboard-icon" title="Documents">
                                <FaFileInvoiceDollar />
                                <span className="clipboard-badge">2018</span>
                            </span>
                        </div>
                    </div>

                    {/* SUMMARY TAB */}
                    {activeTab === "summary" && (
                        <div className="summary-grid account-summary-grid">
                            <div className="summary-col">
                                <div className="panel">
                                    <h3 className="panel-title">Key Fields</h3>
                                    <Field label="Assigned To" value={<span className="link-text">{account.assignedTo}</span>} />
                                    <Field label="Account Name" value={account.name} />
                                    <Field label="Account Type" value={account.accountType} />
                                    <Field label="Account Category" value={account.accountCategory} />
                                    <Field label="Parent Account" value={account.parentAccount} />
                                    <Field label="Billing Country" value={account.billingCountry} />
                                    <Field label="Billing City" value={account.billingCity} />
                                </div>

                                <div className="panel">
                                    <div className="panel-header-row">
                                        <h3 className="panel-title">Documents</h3>
                                        <button className="btn small-add-btn">+ New Document ▾</button>
                                    </div>
                                    {account.documents.length === 0 ? (
                                        <div className="no-documents">No Related Documents</div>
                                    ) : (
                                        <table className="doc-table">
                                            <thead>
                                                <tr><th>Title</th><th>File Name</th></tr>
                                            </thead>
                                            <tbody>
                                                {account.documents.map((d, i) => (
                                                    <tr key={i}>
                                                        <td>
                                                            {d.title}
                                                            <div className="doc-icons"><FaImage /> <FaDownload /></div>
                                                        </td>
                                                        <td>{d.file}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}
                                </div>
                            </div>

                            <div className="summary-col">
                                <div className="panel">
                                    <h3 className="panel-title">Notes</h3>
                                    <textarea className="notes-textarea" placeholder="Click to start noting" />
                                    <div className="notes-row">
                                        <button className="attach-btn"><FaPaperclip /> Attach Files</button>
                                        <select className="notes-select"><option>Select an Option</option></select>
                                        <select className="notes-select"><option>Select an Option</option></select>
                                        <button className="btn post-btn">Post</button>
                                    </div>
                                    <div className="recent-notes-header">
                                        <span>Recent Notes</span>
                                        <span className="roll-up">Roll up <span className="toggle-off">OFF</span></span>
                                    </div>
                                    <div className="no-notes">No notes</div>
                                </div>
                            </div>

                            <div className="summary-col">
                                <div className="panel">
                                    <div className="panel-header-row">
                                        <h3 className="panel-title">Activities</h3>
                                        <div style={{ display: "flex", gap: 8 }}>
                                            <button className="btn small-add-btn">+ Add Task</button>
                                            <button className="btn small-add-btn">+ Add Event</button>
                                        </div>
                                    </div>
                                    <div className="no-documents">No pending activities</div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* DETAILS TAB */}
                    {activeTab === "details" && (
                        <div className="details-tab">
                            <DetailSection title="Account Details">
                                <div className="detail-col">
                                    <Field label="Created By" value={<span className="link-text">{account.createdBy}</span>} />
                                    <Field label="Team" value={account.team} />
                                    <Field label="Account Type" value={account.accountType} />
                                    <Field label="Account Category" value={account.accountCategory} />
                                    <Field label="Email Opt Out" value="No" />
                                    <Field label="Modified Time" value={account.modifiedTime} />
                                    <Field label="Is Converted From Lead" value={account.isConvertedFromLead} />
                                    <Field label="Source" value={account.source} />
                                </div>
                                <div className="detail-col">
                                    <Field label="Assigned To" value={<span className="link-text">{account.assignedTo}</span>} />
                                    <Field label="Account Name" value={account.name} />
                                    <Field label="Market Segment" value={account.marketSegment} />
                                    <Field label="Account Status" value={account.accountStatus} />
                                    <Field label="Parent Account" value={account.parentAccount} />
                                    <Field label="Account Number" value={account.accountNumber} />
                                    <Field label="Created Time" value={account.createdTime} />
                                </div>
                            </DetailSection>

                            <DetailSection title="Communication">
                                <div className="detail-col">
                                    <Field label="Primary Email" value={<span className="link-text">{account.email}</span>} />
                                    <Field label="Primary Phone" value={account.phone} />
                                    <Field label="Website" value={account.website} />
                                </div>
                                <div className="detail-col">
                                    <Field label="Secondary Email" value={account.secondaryEmail} />
                                    <Field label="Secondary Phone" value={account.secondaryPhone} />
                                </div>
                            </DetailSection>

                            <DetailSection title="Other Information">
                                <div className="detail-col">
                                    <Field label="Zone" value={account.zone} />
                                    <Field label="Key account" value={account.keyAccount} />
                                    <Field label="Credit Terms" value={account.creditTerms} />
                                    <Field label="No. of Employees" value={account.employees} />
                                    <Field label="GST" value={account.gst} />
                                    <Field label="CIN No" value={account.cinNo} />
                                    <Field label="Currency" value={account.currency} />
                                </div>
                                <div className="detail-col">
                                    <Field label="Industry" value={account.industry} />
                                    <Field label="Stage" value={account.stage} />
                                    <Field label="Date of association" value={account.dateOfAssociation} />
                                    <Field label="Annual Revenue" value={account.annualRevenue} />
                                    <Field label="PAN" value={account.pan} />
                                    <Field label="MSME Registration No" value={account.msmeRegNo} />
                                </div>
                            </DetailSection>

                            <DetailSection title="Banking Information">
                                <div className="detail-col">
                                    <Field label="Account Holder Name" value={account.bankHolderName} />
                                    <Field label="Bank Name" value={account.bankName} />
                                    <Field label="IFSC Or Swift Code" value={account.ifsc} />
                                </div>
                                <div className="detail-col">
                                    <Field label="Bank Account No" value={account.bankAccountNo} />
                                    <Field label="Branch" value={account.branch} />
                                </div>
                            </DetailSection>

                            <DetailSection title="MIS">
                                <div className="detail-col">
                                    <Field label="Monthly Target" value={account.monthlyTarget.toLocaleString()} />
                                    <Field label="Asking Rate" value={account.askingRate.toLocaleString()} />
                                    <Field label="Total Pending Orders This Month" value={account.totalPendingOrdersMonth.toLocaleString()} />
                                </div>
                                <div className="detail-col">
                                    <Field label="MTD Dispatch" value={account.mtdDispatch.toLocaleString()} />
                                    <Field label="Total Pending Orders" value={account.totalPendingOrder.toLocaleString()} />
                                </div>
                            </DetailSection>

                            <DetailSection title="Address Details">
                                <div className="detail-col">
                                    <Field label="Billing Address" value={account.billingAddress} />
                                    <Field label="Billing PO Box" value={account.billingPoBox} />
                                    <Field label="Billing Country" value={account.billingCountry} />
                                    <Field label="Billing State" value={account.billingState} />
                                    <Field label="Billing City" value={account.billingCity} />
                                    <Field label="Billing Postal Code" value={account.billingPostalCode} />
                                </div>
                                <div className="detail-col">
                                    <Field label="Shipping Address" value={account.shippingAddress} />
                                    <Field label="Shipping PO Box" value={account.shippingPoBox} />
                                    <Field label="Shipping Country" value={account.shippingCountry} />
                                    <Field label="Shipping State" value={account.shippingState} />
                                    <Field label="Shipping City" value={account.shippingCity} />
                                    <Field label="Shipping Postal Code" value={account.shippingPostalCode} />
                                </div>
                            </DetailSection>

                            <DetailSection title="Description Details">
                                <div className="detail-col full-width">
                                    <Field label="Description" value={account.description} />
                                </div>
                            </DetailSection>

                            <DetailSection title="Our Sites">
                                <div className="detail-col">
                                    <Field label="SAP Id" value={account.sapId} />
                                    <Field label="User Id" value={account.userId} />
                                    <Field label="Is Enabled" value={account.isEnabled} />
                                    <Field label="Is Internal" value={account.isInternal} />
                                </div>
                                <div className="detail-col">
                                    <Field label="Price List" value={account.priceList} />
                                    <Field label="Password" value={<span className="muted-value">{account.password}</span>} />
                                    <Field label="Deals In" value={account.dealsIn} />
                                </div>
                            </DetailSection>
                        </div>
                    )}

                    {/* UPDATES TAB */}
                    {activeTab === "updates" && (
                        <div className="updates-tab">
                            {account.updates.map((u, i) => (
                                <div className="update-row account-update-row" key={i}>
                                    <div className="update-time">{u.time}</div>
                                    <div className="update-icon">
                                        {u.action === "Linked" ? <FaClipboardList /> : <FaUserFriends />}
                                    </div>
                                    <div className="update-body">
                                        <span className="update-title">{u.actor}</span>
                                        <span className="update-linked"> {u.action}</span>

                                        {u.detail && <div className="update-detail">{u.detail}</div>}

                                        {u.changes && u.changes.map((c, j) => (
                                            <div className="field-change" key={j}>
                                                <span className="field-change-name">{c.field}</span>
                                                <span className="field-change-label">
                                                    {c.field === "Zone" || !c.from ? "updated" : "changed"}
                                                </span>
                                                {c.from && (
                                                    <div className="field-change-line">
                                                        From <span className="field-change-val">{c.from}</span>
                                                    </div>
                                                )}
                                                <div className="field-change-line">
                                                    To <span className="field-change-val">{c.to}</span>
                                                </div>
                                            </div>
                                        ))}
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

export default AccountDetail;
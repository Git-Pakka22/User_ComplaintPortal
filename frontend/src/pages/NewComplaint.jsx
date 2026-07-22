import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import "../assets/newcomplaint.css";

function NewComplaint() {
    const navigate = useNavigate();
    const [form, setForm] = useState({});
    const [capaFileName, setCapaFileName] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleCapaFileChange = (e) => {
        const file = e.target.files && e.target.files[0];
        setCapaFileName(file ? file.name : "");
        setForm({ ...form, capaDocument: file || null });
    };

    const handleSave = (e) => {
        e.preventDefault();
        console.log("Saving complaint:", form);
    };

    return (
        <Layout>
            <div className="new-complaint-page">

                {/* Breadcrumb */}
                <div className="breadcrumb-row">
                    COMPLAINTS <span>&gt;</span> All <span>&gt;</span> <strong>Adding new</strong>
                </div>

                {/* Header row: back button + title, matching the Tableware Order Form style */}
                <div className="page-header-row">
                    <button
                        type="button"
                        className="back-btn"
                        aria-label="Go back"
                        onClick={() => navigate(-1)}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                            <line x1="19" y1="12" x2="5" y2="12"></line>
                            <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                    </button>
                    <h2 className="page-title">Creating New Complaint</h2>
                </div>

                <form onSubmit={handleSave}>

                    {/* ===================== Complaint Details ===================== */}
                    <div className="form-section">
                        <div className="section-header">Complaint Details</div>

                        <div className="section-body">
                            <div className="form-grid">

                                <div className="form-field">
                                    <label>Complaint Name <span className="required">*</span></label>
                                    <input type="text" name="complaintName" onChange={handleChange} />
                                </div>

                                <div className="form-field">
                                    <label>Assigned To <span className="required">*</span></label>
                                    <div className="field-with-icon">
                                        <select name="assignedTo" className="error-field" onChange={handleChange}>
                                            <option>Select an Option</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-field">
                                    <label>Business Area <span className="required">*</span></label>
                                    <div className="field-with-icon">
                                        <select name="businessArea" onChange={handleChange}>
                                            <option>Select an Option</option>
                                        </select>
                                        <button type="button" className="add-icon-btn">+</button>
                                    </div>
                                </div>

                                <div className="form-field">
                                    <label>Accounts <span className="required">*</span></label>
                                    <div className="field-with-icon">
                                        <input type="text" placeholder="Type to search" name="accounts" onChange={handleChange} />
                                        <button type="button" className="add-icon-btn search-btn">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                        </button>
                                        <button type="button" className="add-icon-btn">+</button>
                                    </div>
                                </div>

                                <div className="form-field">
                                    <label>Start Date</label>
                                    <div className="field-with-icon">
                                        <input type="text" placeholder="YYYY-MM-DD" name="startDate" onChange={handleChange} />
                                        <button type="button" className="add-icon-btn icon-only">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                        </button>
                                    </div>
                                </div>

                                <div className="form-field">
                                    <label>Target End Date</label>
                                    <div className="field-with-icon">
                                        <input type="text" placeholder="YYYY-MM-DD" name="targetEndDate" onChange={handleChange} />
                                        <button type="button" className="add-icon-btn icon-only">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                        </button>
                                    </div>
                                </div>

                                <div className="form-field">
                                    <label>Status</label>
                                    <div className="field-with-icon">
                                        <select name="status" onChange={handleChange} defaultValue="In Progress">
                                            <option>In Progress</option>
                                            <option>Completed</option>
                                            <option>On Hold</option>
                                        </select>
                                        <button type="button" className="add-icon-btn">+</button>
                                    </div>
                                </div>

                                <div className="form-field">
                                    <label>Actual End Date</label>
                                    <div className="field-with-icon">
                                        <input type="text" placeholder="YYYY-MM-DD" name="actualEndDate" onChange={handleChange} />
                                        <button type="button" className="add-icon-btn icon-only">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                        </button>
                                    </div>
                                </div>

                                <div className="form-field">
                                    <label>Priority</label>
                                    <div className="field-with-icon">
                                        <select name="priority" onChange={handleChange}>
                                            <option>Select an Option</option>
                                        </select>
                                        <button type="button" className="add-icon-btn">+</button>
                                    </div>
                                </div>

                                <div className="form-field">
                                    <label>Progress</label>
                                    <div className="field-with-icon">
                                        <select name="progress" onChange={handleChange}>
                                            <option>Select an Option</option>
                                        </select>
                                        <button type="button" className="add-icon-btn">+</button>
                                    </div>
                                </div>

                                <div className="form-field">
                                    <label>Invoice Number <span className="required">*</span></label>
                                    <input type="text" name="invoiceNumber" onChange={handleChange} />
                                </div>

                                <div className="form-field">
                                    <label>Customer Name</label>
                                    <input type="text" name="customerName" onChange={handleChange} />
                                </div>

                                <div className="form-field">
                                    <label>Customer SAP Id</label>
                                    <input type="text" name="customerSapId" onChange={handleChange} />
                                </div>

                                <div className="form-field">
                                    <label>SLA Name <span className="required">*</span></label>
                                    <select name="slaName" onChange={handleChange} defaultValue="Paper Complaint Process - 30 days">
                                        <option>Paper Complaint Process - 30 days</option>
                                    </select>
                                </div>

                                <div className="form-field">
                                    <label>Phase</label>
                                    <div className="field-with-icon">
                                        <select name="phase" onChange={handleChange}>
                                            <option>Select an Option</option>
                                        </select>
                                        <button type="button" className="add-icon-btn">+</button>
                                    </div>
                                </div>

                                <div className="form-field">
                                    <label>Zone</label>
                                    <div className="field-with-icon">
                                        <select name="zone" onChange={handleChange}>
                                            <option>Select an Option</option>
                                        </select>
                                        <button type="button" className="add-icon-btn">+</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* ===================== Description Details ===================== */}
                    <div className="form-section">
                        <div className="section-header">Description Details</div>

                        <div className="section-body">
                            <div className="form-field full-width">
                                <label>Description</label>
                                <textarea name="description" rows="4" placeholder="Enter detailed complaint narrative..." onChange={handleChange}></textarea>
                            </div>
                        </div>
                    </div>

                    {/* ===================== Item Details ===================== */}
                    <div className="form-section">
                        <div className="section-header">Item Details</div>

                        <div className="section-body">
                            <div className="form-grid">

                                <div className="form-field">
                                    <label>Item Description</label>
                                    <input type="text" name="itemDescription" onChange={handleChange} />
                                </div>

                                <div className="form-field">
                                    <label>Variety</label>
                                    <input type="text" name="variety" onChange={handleChange} />
                                </div>

                                <div className="form-field">
                                    <label>GSM</label>
                                    <input type="text" name="gsm" onChange={handleChange} />
                                </div>

                                <div className="form-field">
                                    <label>Billed Quantity</label>
                                    <input type="text" name="billedQuantity" onChange={handleChange} />
                                </div>

                                <div className="form-field">
                                    <label>Complained Quantity</label>
                                    <input type="text" name="complainedQuantity" onChange={handleChange} />
                                </div>

                                <div className="form-field">
                                    <label>Billed Number of Sheets or Reels</label>
                                    <input type="text" name="billedSheets" onChange={handleChange} />
                                </div>

                                <div className="form-field">
                                    <label>Complained Number of Sheets or Reels</label>
                                    <input type="text" name="complainedSheets" onChange={handleChange} />
                                </div>

                                <div className="form-field checkbox-field">
                                    <input type="checkbox" id="visitRequired" name="visitRequired" onChange={handleChange} />
                                    <label htmlFor="visitRequired">Visit Required</label>
                                </div>

                                <div className="form-field full-width">
                                    <label>Type of Complaints</label>
                                    <textarea name="typeOfComplaints" rows="3" placeholder="Specify complaint types..." onChange={handleChange}></textarea>
                                </div>

                                <div className="form-field">
                                    <label>CAPA Document</label>
                                    <label className="capa-doc" htmlFor="capaDocumentInput">
                                        <input
                                            type="file"
                                            id="capaDocumentInput"
                                            name="capaDocument"
                                            className="capa-doc-input"
                                            onChange={handleCapaFileChange}
                                        />
                                        <span className="capa-doc-badge">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                            <span className="capa-doc-text">
                                                {capaFileName || "Choose Document"}
                                            </span>
                                        </span>
                                    </label>
                                </div>

                                <div className="form-field">
                                    <label>Dispatch Date</label>
                                    <div className="field-with-icon">
                                        <input type="text" placeholder="YYYY-MM-DD" name="dispatchDate" onChange={handleChange} />
                                        <button type="button" className="add-icon-btn icon-only">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* ===================== Sticky Action Bar ===================== */}
                    <div className="form-actions-bar">
                        <div className="actions-container">
                            <button type="button" className="btn-cancel" onClick={() => navigate("/dashboard")}>
                                Cancel
                            </button>
                            <button type="submit" className="btn-save">
                                Save Complaint
                            </button>
                        </div>
                    </div>

                </form>

            </div>
        </Layout>
    );
}

export default NewComplaint;

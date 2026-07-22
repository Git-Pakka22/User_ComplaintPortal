import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import "../assets/importcomplaints.css";

const STEPS = ["Upload CSV File", "Duplicate Handling", "Field Mapping"];

function ImportComplaints() {
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);
    const [hasHeader, setHasHeader] = useState(true);
    const [encoding, setEncoding] = useState("UTF-8");
    const [delimiter, setDelimiter] = useState("comma");
    const [fileName, setFileName] = useState("");

    const handleFileSelect = (e) => {
        if (e.target.files?.[0]) {
            setFileName(e.target.files[0].name);
        }
    };

    const handleNext = () => {
        setActiveStep((prev) => Math.min(prev + 1, STEPS.length - 1));
    };

    const handleClose = () => {
        navigate("/dashboard");
    };

    return (
        <Layout>
            <div className="import-page">

                <div className="breadcrumb-row">
                    COMPLAINTS <span>&gt;</span> All
                </div>

                <div className="import-banner">
                    <span>Import Complaints</span>
                    <button className="import-close-btn" onClick={handleClose}>✕</button>
                </div>

                <div className="import-stepper">
                    {STEPS.map((label, idx) => (
                        <div
                            key={label}
                            className={
                                "stepper-item" +
                                (idx === activeStep ? " active" : "") +
                                (idx < activeStep ? " completed" : "")
                            }
                        >
                            <span className="stepper-number">{idx + 1}</span>
                            <span className="stepper-label">{label}</span>
                        </div>
                    ))}
                </div>

                <div className="import-body">

                    {activeStep === 0 && (
                        <div className="import-section">
                            <h3 className="import-section-title">Import from CSV file</h3>
                            <hr />

                            <div className="import-field-row">
                                <label>Select CSV file</label>
                                <div className="import-field-control">
                                    <label className="file-select-btn">
                                        📁 Select from My Computer
                                        <input
                                            type="file"
                                            accept=".csv"
                                            hidden
                                            onChange={handleFileSelect}
                                        />
                                    </label>
                                    {fileName && <span className="file-name">{fileName}</span>}
                                </div>
                            </div>

                            <div className="import-field-row">
                                <label>Has Header</label>
                                <div className="import-field-control">
                                    <input
                                        type="checkbox"
                                        checked={hasHeader}
                                        onChange={(e) => setHasHeader(e.target.checked)}
                                    />
                                </div>
                            </div>

                            <div className="import-field-row">
                                <label>Character Encoding</label>
                                <div className="import-field-control">
                                    <select
                                        value={encoding}
                                        onChange={(e) => setEncoding(e.target.value)}
                                    >
                                        <option>UTF-8</option>
                                        <option>UTF-16</option>
                                        <option>ISO-8859-1</option>
                                        <option>ASCII</option>
                                    </select>
                                </div>
                            </div>

                            <div className="import-field-row">
                                <label>Delimiter</label>
                                <div className="import-field-control radio-group">
                                    {["comma", "semicolon", "Pipe", "Caret"].map((opt) => (
                                        <label key={opt} className="radio-option">
                                            <input
                                                type="radio"
                                                name="delimiter"
                                                checked={delimiter === opt}
                                                onChange={() => setDelimiter(opt)}
                                            />
                                            {opt}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeStep === 1 && (
                        <div className="import-section">
                            <h3 className="import-section-title">Duplicate Handling</h3>
                            <hr />
                            <p className="placeholder-text">
                                Configure how duplicate records should be detected and handled.
                            </p>
                        </div>
                    )}

                    {activeStep === 2 && (
                        <div className="import-section">
                            <h3 className="import-section-title">Field Mapping</h3>
                            <hr />
                            <p className="placeholder-text">
                                Map CSV columns to complaint fields.
                            </p>
                        </div>
                    )}

                </div>

                <div className="import-actions-bar">
                    <button className="btn-next" onClick={handleNext}>
                        {activeStep === STEPS.length - 1 ? "Finish" : "Next"}
                    </button>
                    <button className="btn-cancel" onClick={handleClose}>
                        Cancel
                    </button>
                </div>

            </div>
        </Layout>
    );
}

export default ImportComplaints;
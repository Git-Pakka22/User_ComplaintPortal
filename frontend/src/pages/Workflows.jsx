import { useMemo, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import PageTransition from "../components/PageTransition";
import ToggleSwitch from "../components/ToggleSwitch";
import "../assets/workflows.css";
import {
    FaChevronDown, FaChevronLeft, FaChevronRight, FaEllipsisV,
    FaSearch, FaPlus, FaTicketAlt, FaCalendarAlt, FaChartLine,
    FaAddressBook, FaUserTag, FaFileInvoiceDollar, FaFileAlt,
} from "react-icons/fa";
import {
    getModuleList, getWorkflowsByModule, toggleWorkflowStatus, deleteWorkflow,
} from "../services/workflowService";

const MODULE_ICONS = {
    ticket: <FaTicketAlt />,
    calendar: <FaCalendarAlt />,
    opportunity: <FaChartLine />,
    lead: <FaUserTag />,
    contact: <FaAddressBook />,
    invoice: <FaFileInvoiceDollar />,
};

const ENTRIES_PER_PAGE = 100;

function Workflows() {
    const navigate = useNavigate();

    const [selectedModule, setSelectedModule] = useState("all");
    const [showModuleDropdown, setShowModuleDropdown] = useState(false);
    const [moduleSearch, setModuleSearch] = useState("");
    const [nameSearch, setNameSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [hoveredRow, setHoveredRow] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);

    const dropdownRef = useRef(null);

    const rows = useMemo(
        () => getWorkflowsByModule(selectedModule),
        [selectedModule, refreshKey]
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedModule]);

    useEffect(() => {
        function handleClickOutside(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setShowModuleDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const moduleList = getModuleList();
    const filteredModules = useMemo(
        () =>
            moduleList.filter((m) =>
                m.label.toLowerCase().includes(moduleSearch.trim().toLowerCase())
            ),
        [moduleList, moduleSearch]
    );

    const filteredRows = useMemo(() => {
        const term = nameSearch.trim().toLowerCase();
        if (!term) return rows;
        return rows.filter((r) => r.name.toLowerCase().includes(term));
    }, [rows, nameSearch]);

    const totalPages = Math.max(1, Math.ceil(filteredRows.length / ENTRIES_PER_PAGE));
    const safePage = Math.min(currentPage, totalPages);
    const paginatedRows = filteredRows.slice(
        (safePage - 1) * ENTRIES_PER_PAGE,
        safePage * ENTRIES_PER_PAGE
    );

    const activeModuleLabel =
        moduleList.find((m) => m.key === selectedModule)?.label || "All Workflows";
    const activeModuleCount =
        moduleList.find((m) => m.key === selectedModule)?.count ?? filteredRows.length;

    const handleToggle = (e, id) => {
        e.stopPropagation();
        toggleWorkflowStatus(id);
        setRefreshKey((k) => k + 1);
    };

    const handleDelete = (e, id) => {
        e.stopPropagation();
        if (window.confirm("Delete this workflow?")) {
            deleteWorkflow(id);
            setRefreshKey((k) => k + 1);
        }
    };

    return (
        <Layout>
            <PageTransition>
                <div className="workflows-page">

                    {/* New Workflow button */}
                    <div className="wf-top-row wf-top-row-end">
                        <button className="wf-new-btn" onClick={() => navigate("/workflows/new")}>
                            <FaPlus /> New Workflow
                        </button>
                    </div>

                    {/* Toolbar: module dropdown, search, pagination */}
                    <div className="wf-toolbar">
                        <div className="wf-module-dropdown" ref={dropdownRef}>
                            <button
                                className="wf-module-dropdown-btn"
                                onClick={() => setShowModuleDropdown((prev) => !prev)}
                            >
                                <span>{activeModuleLabel}</span>
                                <span className="wf-module-count-badge">{activeModuleCount}</span>
                                <FaChevronDown className={`wf-caret ${showModuleDropdown ? "open" : ""}`} />
                            </button>

                            {showModuleDropdown && (
                                <div className="wf-module-panel">
                                    <div className="wf-module-search">
                                        <input
                                            type="text"
                                            placeholder=""
                                            value={moduleSearch}
                                            onChange={(e) => setModuleSearch(e.target.value)}
                                            autoFocus
                                        />
                                        <FaSearch />
                                    </div>
                                    <div className="wf-module-list">
                                        {filteredModules.map((m) => (
                                            <div
                                                key={m.key}
                                                className={`wf-module-item ${m.key === selectedModule ? "active" : ""}`}
                                                onClick={() => {
                                                    setSelectedModule(m.key);
                                                    setShowModuleDropdown(false);
                                                    setModuleSearch("");
                                                }}
                                            >
                                                <span>{m.label}</span>
                                                <span className="wf-module-item-count">{m.count}</span>
                                            </div>
                                        ))}
                                        {filteredModules.length === 0 && (
                                            <div className="wf-module-item-empty">No modules found</div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="wf-search-by-name">
                            <FaSearch className="wf-search-icon" />
                            <input
                                type="text"
                                placeholder="Search by Name"
                                value={nameSearch}
                                onChange={(e) => setNameSearch(e.target.value)}
                            />
                        </div>

                        <div className="wf-pagination-info">
                            <span>
                                {filteredRows.length === 0 ? 0 : (safePage - 1) * ENTRIES_PER_PAGE + 1} to{" "}
                                {Math.min(safePage * ENTRIES_PER_PAGE, filteredRows.length)} of{" "}
                                {filteredRows.length}
                            </span>
                            <button
                                className="wf-icon-btn"
                                disabled={safePage === 1}
                                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            >
                                <FaChevronLeft />
                            </button>
                            <button className="wf-icon-btn">
                                <FaEllipsisV />
                            </button>
                            <button
                                className="wf-icon-btn wf-icon-btn-active"
                                disabled={safePage === totalPages}
                                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                            >
                                <FaChevronRight />
                            </button>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="wf-table-card">
                        <table className="wf-table">
                            <thead>
                                <tr>
                                    <th className="wf-col-toggle"></th>
                                    <th className="wf-col-module">Module</th>
                                    <th className="wf-col-name">Workflow Name</th>
                                    <th className="wf-col-trigger">Trigger</th>
                                    <th className="wf-col-conditions">Conditions</th>
                                    <th className="wf-col-actions">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedRows.map((row) => (
                                    <tr
                                        key={row.id}
                                        className="wf-row"
                                        onClick={() => navigate(`/workflows/${row.id}`)}
                                        onMouseEnter={() => setHoveredRow(row.id)}
                                        onMouseLeave={() => setHoveredRow(null)}
                                    >
                                        <td className="wf-col-toggle" onClick={(e) => e.stopPropagation()}>
                                            <div className="wf-toggle-cell">
                                                {row.deletable && hoveredRow === row.id && (
                                                    <button
                                                        className="wf-delete-icon"
                                                        title="Delete workflow"
                                                        onClick={(e) => handleDelete(e, row.id)}
                                                    >
                                                        🗑
                                                    </button>
                                                )}
                                                <ToggleSwitch
                                                    on={row.status === "ON"}
                                                    onClick={(e) => handleToggle(e, row.id)}
                                                />
                                            </div>
                                        </td>
                                        <td className="wf-col-module">
                                            <span className="wf-module-icon">
                                                {MODULE_ICONS[row.moduleIcon] || <FaFileAlt />}
                                            </span>
                                        </td>
                                        <td className="wf-col-name">{row.name}</td>
                                        <td className="wf-col-trigger">{row.trigger}</td>
                                        <td className="wf-col-conditions">
                                            <div>
                                                <strong>All :</strong>{" "}
                                                {row.conditions.all.length > 0
                                                    ? row.conditions.all.map((c, i) => (
                                                        <div key={i}>{typeof c === "string" ? c : `${c.field} ${c.operator} ${c.value}`}</div>
                                                    ))
                                                    : "-NA-"}
                                            </div>
                                            <div>
                                                <strong>Any :</strong>{" "}
                                                {row.conditions.any.length > 0
                                                    ? row.conditions.any.map((c, i) => (
                                                        <div key={i}>{typeof c === "string" ? c : `${c.field} ${c.operator} ${c.value}`}</div>
                                                    ))
                                                    : "-NA-"}
                                            </div>
                                        </td>
                                        <td className="wf-col-actions">
                                            {row.actions.length > 0
                                                ? row.actions.map((a, i) => <span key={i}>{a.title}</span>)
                                                : "—"}
                                        </td>
                                    </tr>
                                ))}
                                {paginatedRows.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="wf-no-results">
                                            No workflows found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="wf-footer">© 2026 Yash Pakka Limited</div>

                </div>
            </PageTransition>
        </Layout>
    );
}

export default Workflows;

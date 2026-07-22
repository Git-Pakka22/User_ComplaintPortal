import { useMemo, useState } from "react";
import { utils, writeFile } from "xlsx";
import Layout from "../components/Layout";
import "../assets/complaints.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    FaClipboardList, FaCheckCircle,
    FaUndoAlt, FaExclamationTriangle, FaUsers,
    FaPlus, FaSearch, FaChevronDown,
    FaRedo, FaFileExcel, FaPrint,
} from "react-icons/fa";
import PageTransition from "../components/PageTransition";
import { getAllComplaints } from "../services/complaintService";

const statCards = [
    { icon: <FaClipboardList />, color: "#f5a623", border: "#f5a623", label: "Pending Review", value: 0 },
    { icon: <FaCheckCircle />, color: "#2196f3", border: "#2196f3", label: "Approved / Active", value: 0 },
    { icon: <FaUndoAlt />, color: "#9e1f3d", border: "#9e1f3d", label: "Revoked", value: 0 },
    { icon: <FaExclamationTriangle />, color: "#6b7c2d", border: "#6b7c2d", label: "Completed", value: 0 },
    { icon: <FaUsers />, color: "#7c5cbf", border: "#7c5cbf", label: "Total Complaints", value: 899 },
];

const DEFAULT_ENTRIES_PER_PAGE = 50;

function parseCreatedDate(created) {
    const [datePart] = created.split(" ");
    const [dd, mm, yyyy] = datePart.split("-");
    return new Date(`${yyyy}-${mm}-${dd}`);
}

// Builds the list of page buttons to render, collapsing long ranges with "..."
function getPageNumbers(current, total) {
    const maxVisible = 10;
    if (total <= maxVisible + 2) {
        return Array.from({ length: total }, (_, i) => i + 1);
    }
    if (current <= maxVisible) {
        return [...Array.from({ length: maxVisible }, (_, i) => i + 1), "...", total - 1, total];
    }
    if (current > total - maxVisible) {
        return [1, 2, "...", ...Array.from({ length: maxVisible }, (_, i) => total - maxVisible + 1 + i)];
    }
    return [1, 2, "...", current - 3, current - 2, current - 1, current, current + 1, current + 2, current + 3, "...", total - 1, total];
}

function Complaints() {
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState("");
    const [customerFilter, setCustomerFilter] = useState("all");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [entriesPerPage, setEntriesPerPage] = useState(DEFAULT_ENTRIES_PER_PAGE);
    const [currentPage, setCurrentPage] = useState(1);

    const complaints = getAllComplaints();

    const customerOptions = useMemo(
        () => Array.from(new Set(complaints.map((c) => c.customer))).sort(),
        [complaints]
    );

    const filteredComplaints = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();
        const from = fromDate ? new Date(fromDate) : null;
        const to = toDate ? new Date(toDate) : null;

        return complaints.filter((c) => {
            const matchesSearch =
                !term ||
                [c.no, c.created, c.name, c.type, c.assignedTo, c.relatedTo, c.customer]
                    .filter(Boolean)
                    .some((field) => field.toLowerCase().includes(term));

            const matchesCustomer = customerFilter === "all" || c.customer === customerFilter;

            const createdDate = parseCreatedDate(c.created);
            const matchesFrom = !from || createdDate >= from;
            const matchesTo = !to || createdDate <= to;

            return matchesSearch && matchesCustomer && matchesFrom && matchesTo;
        });
    }, [searchTerm, customerFilter, fromDate, toDate, complaints]);

    const totalPages = Math.max(1, Math.ceil(filteredComplaints.length / entriesPerPage));
    const safePage = Math.min(currentPage, totalPages);
    const paginatedComplaints = filteredComplaints.slice((safePage - 1) * entriesPerPage, safePage * entriesPerPage);

    const handlePrevPage = () => setCurrentPage((p) => Math.max(1, p - 1));
    const handleNextPage = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

    const handleReset = () => {
        setSearchTerm("");
        setCustomerFilter("all");
        setFromDate("");
        setToDate("");
        setEntriesPerPage(DEFAULT_ENTRIES_PER_PAGE);
        setCurrentPage(1);
    };

    const handleExportExcel = () => {
        const worksheet = utils.json_to_sheet(
            filteredComplaints.map((c) => ({
                "Complaint Number": c.no,
                "Created Time": c.created,
                "Complaint Name": c.name,
                "Type of Complaints": c.type,
                "Assigned To": c.assignedTo,
                "Related To": c.relatedTo,
                "Customer Name": c.customer,
            }))
        );
        const workbook = utils.book_new();
        utils.book_append_sheet(workbook, worksheet, "Complaints");
        writeFile(workbook, "complaints.xlsx");
    };

    const handlePrintPdf = () => {
        window.print();
    };

    return (
        <Layout>
            <PageTransition>
                <div className="dashboard-page">

                    {/* Stat Cards */}
                    <div className="stat-cards-row no-print">
                        {statCards.map((card, i) => (
                            <motion.div
                                className="stat-card"
                                key={card.label}
                                style={{ borderLeftColor: card.border }}
                                initial={{ opacity: 0, y: 14 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.35, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                                whileHover={{ y: -4 }}
                            >
                                <div
                                    className="stat-card-icon"
                                    style={{ color: card.color, background: `${card.color}18` }}
                                >
                                    {card.icon}
                                </div>
                                <div className="stat-card-body">
                                    <div className="stat-card-value">{card.value}</div>
                                    <div className="stat-card-label">{card.label}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Add Complaint Heading Row */}
                    <div className="above-table-row no-print">
                        <motion.button
                            className="btn-add-complaint"
                            onClick={() => navigate("/new-complaint")}
                            whileHover={{ y: -2 }}
                            whileTap={{ y: 1, scale: 0.98 }}
                        >
                            <FaPlus className="btn-icon" /> Add Complaint
                        </motion.button>
                    </div>

                    {/* Box 1: Filters card */}
                    <div className="filters-outer-card">
                        {/* Filters bar: entries per page, search, customer filter, date range, actions */}
                        <div className="table-filters-bar no-print">
                            <div className="filter-entries">
                                <span>Show</span>
                                <select
                                    value={entriesPerPage}
                                    onChange={(e) => {
                                        setEntriesPerPage(Number(e.target.value));
                                        setCurrentPage(1);
                                    }}
                                >
                                    <option value={10}>10</option>
                                    <option value={25}>25</option>
                                    <option value={50}>50</option>
                                    <option value={100}>100</option>
                                </select>
                                <span>entries</span>
                            </div>

                            <div className="filter-search">
                                <FaSearch className="filter-search-icon" />
                                <input
                                    type="text"
                                    placeholder="Search complaints..."
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                />
                            </div>

                            <div className="filter-select-wrapper">
                                <select
                                    className="filter-customer-select"
                                    value={customerFilter}
                                    onChange={(e) => {
                                        setCustomerFilter(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                >
                                    <option value="all">All Customers</option>
                                    {customerOptions.map((customer) => (
                                        <option key={customer} value={customer}>{customer}</option>
                                    ))}
                                </select>
                                <FaChevronDown className="filter-select-caret" />
                            </div>



                            <button className="filter-action-btn" onClick={handleReset}>
                                <FaRedo /> Reset
                            </button>
                            <button className="filter-action-btn" onClick={handleExportExcel}>
                                <FaFileExcel /> Excel
                            </button>
                            <button className="filter-action-btn" onClick={handlePrintPdf}>
                                <FaPrint /> Print PDF
                            </button>
                        </div>
                    </div>

                    {/* Box 2: Table card */}
                    <div className="table-outer-card">
                        <div className="responsive-table-wrapper">
                            <table className="complaint-table">
                                <colgroup>
                                    <col className="col-no" />
                                    <col className="col-time" />
                                    <col className="col-name" />
                                    <col className="col-type" />
                                    <col className="col-assigned" />
                                    <col className="col-related" />
                                    <col className="col-customer" />
                                </colgroup>
                                <thead>
                                    <tr>
                                        <th className="col-no">Complaint Number</th>
                                        <th className="col-time">Created Time</th>
                                        <th className="col-name">Complaint Name</th>
                                        <th className="col-type">Type of Complaints</th>
                                        <th className="col-assigned">Assigned To</th>
                                        <th className="col-related">Related To</th>
                                        <th className="col-customer">Customer Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedComplaints.map((c, i) => (
                                        <motion.tr
                                            key={c.no}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, delay: 0.15 + i * 0.05 }}
                                        >
                                            <td className="col-no">
                                                <button className="complaint-badge" onClick={() => navigate(`/complaints/${c.no}`)}>
                                                    {c.no}
                                                </button>
                                            </td>
                                            <td className="col-time">{c.created}</td>
                                            <td className="col-name text-wrap-cell highlighted-link" onClick={() => navigate(`/complaints/${c.no}`)}>
                                                {c.name}
                                            </td>
                                            <td className="col-type text-wrap-cell">{c.type}</td>
                                            <td className="col-assigned text-wrap-cell">{c.assignedTo}</td>
                                            <td className="col-related text-wrap-cell highlighted-link" onClick={() => navigate(`/accounts/${encodeURIComponent(c.relatedTo)}`)}>
                                                {c.relatedTo}
                                            </td>
                                            <td className="col-customer text-wrap-cell">{c.customer}</td>
                                        </motion.tr>
                                    ))}
                                    {paginatedComplaints.length === 0 && (
                                        <tr>
                                            <td colSpan={7} className="no-results-cell">
                                                No complaints match the current filters
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Page number footer */}
                        {totalPages > 1 && (
                            <div className="table-pagination-footer no-print">
                                <button
                                    className="page-nav-btn"
                                    onClick={handlePrevPage}
                                    disabled={safePage === 1}
                                >
                                    « Previous
                                </button>

                                {getPageNumbers(safePage, totalPages).map((page, idx) =>
                                    page === "..." ? (
                                        <span key={`dots-${idx}`} className="page-dots">...</span>
                                    ) : (
                                        <button
                                            key={page}
                                            className={`page-number ${page === safePage ? "page-number-active" : ""}`}
                                            onClick={() => setCurrentPage(page)}
                                        >
                                            {page}
                                        </button>
                                    )
                                )}

                                <button
                                    className="page-nav-btn"
                                    onClick={handleNextPage}
                                    disabled={safePage === totalPages}
                                >
                                    Next »
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </PageTransition>
        </Layout>
    );
}
export default Complaints;

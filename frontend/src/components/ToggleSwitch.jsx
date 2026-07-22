// Reusable sliding toggle switch used on the Workflows list page and
// inside the Workflow Actions table. The knob physically slides:
// ON -> knob sits on the LEFT, OFF -> knob sits on the RIGHT.
function ToggleSwitch({ on, onClick, title }) {
    return (
        <button
            type="button"
            className={`wf-toggle-switch ${on ? "on" : "off"}`}
            onClick={onClick}
            title={title}
        >
            <span className="wf-toggle-switch-label">{on ? "ON" : "OFF"}</span>
            <span className="wf-toggle-switch-knob" />
        </button>
    );
}

export default ToggleSwitch;

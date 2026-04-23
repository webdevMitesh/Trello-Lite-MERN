import "../../assets/css/Button.css";

const Button = ({
    children,
    onClick,
    variant = "primary",
    size = "md",
    full = false,
    type = "button",
    disabled = false,
    loading = false,
    icon,
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={`btn ${variant} ${size} ${full ? "full" : ""}`}
        >
            {loading ? (
                <span className="btn-loading"></span>
            ) : (
                <>
                    {icon && <span className="btn-icon">{icon}</span>}
                    {children}
                </>
            )}
        </button>
    );
};

export default Button;
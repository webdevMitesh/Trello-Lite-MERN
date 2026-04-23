import { forwardRef } from "react";
import "../../assets/css/Input.css";

const Input = forwardRef(
    (
        {
            label,
            error,
            value,
            onChange,
            placeholder,
            type = "text",
            name,
            disabled = false,
            onKeyDown,
            className = "",
        },
        ref
    ) => {
        return (
            <div className="input-group">
                {label && <label>{label}</label>}

                <input
                    ref={ref}
                    className={`input ${error ? "error" : ""} ${className}`}
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    onKeyDown={onKeyDown}
                />

                {error && <span className="input-error">{error}</span>}
            </div>
        );
    }
);

export default Input;
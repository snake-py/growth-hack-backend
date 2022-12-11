import { forwardRef, useEffect, useRef } from "react";

export default forwardRef(function TextInput(
    {
        type = "text",
        name,
        id,
        placeholder,
        value,
        className,
        autoComplete,
        required,
        isFocused,
        handleChange,
    },
    ref
) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <div className="flex flex-col items-start">
            <input
                placeholder={placeholder}
                type={type}
                name={name}
                id={id}
                value={value}
                className={
                    `bg-background border-border text-basicwhite focus:border-basicwhite focus:ring-0 rounded-md !placeholder-bodytext ` +
                    className
                }
                ref={input}
                autoComplete={autoComplete}
                required={required}
                onChange={(e) => handleChange(e)}
            />
        </div>
    );
});

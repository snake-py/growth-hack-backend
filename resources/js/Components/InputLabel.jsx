export default function InputLabel({ forInput, value, className, children }) {
    return (
        <label
            htmlFor={forInput}
            className={
                `block font-medium text-sm text-basicwhite mb-2 ` + className
            }
        >
            {value ? value : children}
        </label>
    );
}

export default function Checkbox({ name, value, handleChange }) {
    return (
        <input
            type="checkbox"
            name={name}
            value={value}
            className="rounded bg-background border border-border text-basicwhite w-5 h-5 mr-1 focus:ring-0 focus:text-background checked:bg-background checked:border checked:border-border checked:text-basicwhite hover:!bg-background hover:!border hover:!border-basicwhite"
            onChange={(e) => handleChange(e)}
        />
    );
}

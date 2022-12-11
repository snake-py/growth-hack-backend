export default function PrimaryButton({
    type = "submit",
    className = "",
    processing,
    children,
    onClick,
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={
                `inline-flex items-center px-4 h-[36px] bg-basicwhite border border-border rounded-md font-semibold text-sm text-background hover:bg-background hover:text-basicwhite focus:bg-none active:bg-gray-900 focus:outline-none focus:ring-0 transition ease-in-out duration-150 ${
                    processing && "opacity-25"
                } ` + className
            }
            disabled={processing}
        >
            {children}
        </button>
    );
}

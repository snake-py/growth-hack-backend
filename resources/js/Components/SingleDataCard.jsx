export default function SingleDataCard({ title, value, width = 100 }) {
    return (
        <div
            className={`m-5 bg-foreground border border-border rounded-md p-8 relative d-flex justify-center align-content-center text-center w-1/3`}
        >
            <div className="text-bodytext">{title}</div>
            <div className="text-basicwhite">{value}</div>
        </div>
    );
}

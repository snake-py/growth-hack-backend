export default function PlotDataCard({ title, width, children }) {
    return (
        <div
            className={`m-5 bg-foreground border border-border rounded-md p-8 relative d-flex justify-center align-content-center text-center w-100`}
        >
            {children}
        </div>
    );
}

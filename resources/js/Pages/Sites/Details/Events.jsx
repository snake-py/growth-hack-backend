import SecondaryButton from "@/Components/SecondaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/inertia-react";

export default function Events({ auth, site }) {
    return (
        <AuthenticatedLayout
            auth={auth}
            menu={
                <div className="flex justify-start items-center w-full pt-8">
                    <div className="flex items-center space-x-4">
                        <Link
                            href={route("sites.details.index", {
                                id: site.title,
                            })}
                        >
                            <button className="py-1 px-4 mb-3 text-bodytext">
                                Overview
                            </button>
                        </Link>
                        <Link
                            href={route("sites.details.events", {
                                id: site.title,
                            })}
                        >
                            <button className="py-1 px-4 mb-3 bg-bodytext bg-opacity-30 rounded-md text-basicwhite">
                                Events
                            </button>
                        </Link>
                        <Link
                            href={route("sites.details.goals", {
                                id: site.title,
                            })}
                        >
                            <button className="py-1 px-4 mb-3 text-bodytext">
                                Goals
                            </button>
                        </Link>
                        <Link href="/settings">
                            <button className="py-1 px-4 mb-3 text-bodytext">
                                Settings
                            </button>
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title="Sites" />
            <div className="max-w-7xl mx-auto h-full py-16 flex flex-col space-y-8">
                <h2 className="text-basicwhite">Live Event View</h2>
                <div className="bg-background border border-border rounded-md p-8 relative">
                    <div className="absolute w-full h-full top-0 left-0 right-0 bottom-0 bg-gradientoverlay backdrop-blur-[2px]">
                        <div className="w-full h-full flex flex-col items-center justify-center">
                            <h4 className="text-basicwhite">
                                Start Tracking Events
                            </h4>

                            <code className="whitespace-pre mt-4 p-4 border border-border bg-background rounded-md">
                                curl -d example -X POST
                                https://eventbuddy.com/api/v1/events
                            </code>
                        </div>
                    </div>
                    <div className="flex flex-col items-center space-y-4  overflow-scroll max-h-[340px]">
                        <table className="table-fixed w-full">
                            <thead>
                                <tr className="border-b border-border">
                                    <td className="pb-4">Event Type</td>
                                    <td className="pb-4">Event Name</td>
                                    <td className="pb-4">Timestamp</td>
                                    <td className="pb-4">User</td>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.from({ length: 10 }).map((_, index) => (
                                    <tr className="border-b border-border">
                                        <td className="py-4">Event Type</td>
                                        <td className="py-4">Event Name</td>
                                        <td className="py-4">Timestamp</td>
                                        <td className="py-4">User</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

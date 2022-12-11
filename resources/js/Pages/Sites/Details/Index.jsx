import SecondaryButton from "@/Components/SecondaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/inertia-react";

export default function Detail({ auth, site, events }) {
    console.log(site);
    console.log(events);
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
                            <button className="py-1 px-4 mb-3 bg-bodytext bg-opacity-30 rounded-md text-basicwhite">
                                Overview
                            </button>
                        </Link>
                        <Link
                            href={route("sites.details.events", {
                                id: site.title,
                            })}
                        >
                            <button className="py-1 px-4 mb-3 text-bodytext">
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
                        <Link
                            href={route("sites.details.settings", {
                                id: site.title,
                            })}
                        >
                            <button className="py-1 px-4 mb-3 text-bodytext">
                                Settings
                            </button>
                        </Link>
                    </div>
                </div>
            }
            site={site.title}
        >
            <Head title="Sites" />
            <div className="max-w-7xl mx-auto h-full py-16">
                <div className="flex flex-col space-y-1 mb-8">
                    <h2 className="text-basicwhite">{site.title}</h2>
                    <h2>{site.url}</h2>
                </div>
                <div className="bg-background border border-border rounded-md text-center p-8">
                    <div className="flex flex-col items-center space-y-4">
                        <span>
                            Currently you are not tracking any events...
                        </span>
                        <Link
                            href={route("sites.details.events", {
                                id: site.title,
                            })}
                        >
                            <SecondaryButton>Track Events</SecondaryButton>
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

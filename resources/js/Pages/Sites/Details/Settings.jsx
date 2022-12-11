import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/inertia-react";

export default function Settings({ auth, site }) {
    return (
        <>
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
                                <button className="py-1 px-4 mb-3 bg-bodytext bg-opacity-30 rounded-md text-basicwhite">
                                    Settings
                                </button>
                            </Link>
                        </div>
                    </div>
                }
                site={site.title}
            >
                <Head title="Sites" />
                Settings
            </AuthenticatedLayout>
        </>
    );
}

import Checkbox from "@/Components/Checkbox";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/inertia-react";
import {
    DotsVerticalIcon,
    ExternalLinkIcon,
    PlusIcon,
} from "@radix-ui/react-icons";
import { useState } from "react";

export default function Sites({ auth, sites }) {
    const siteList = sites;
    console.log(siteList);
    return (
        <AuthenticatedLayout
            auth={auth}
            menu={
                <div className="flex justify-start items-center w-full pt-8">
                    <div className="flex items-center space-x-4">
                        <Link href="/sites">
                            <button className="py-1 px-4 mb-3 bg-bodytext bg-opacity-30 rounded-md text-basicwhite">
                                Your Sites
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
            <div className="max-w-7xl mx-auto h-full py-16">
                <div className="flex justify-between items-center mb-8">
                    <h4>Sites: [{siteList.length}]</h4>

                    <Link href={route("sites.new")}>
                        <PrimaryButton>
                            <div className="flex items-center space-x-2">
                                <span>Add New Site</span>
                                <PlusIcon className="w-4 h-4" />
                            </div>
                        </PrimaryButton>
                    </Link>
                </div>
                {siteList.length > 0 ? (
                    <ul className="grid gap-8">
                        {siteList.map((site) => (
                            <SiteCard key={site.id} site={site} />
                        ))}
                    </ul>
                ) : (
                    <div className="bg-background border border-border rounded-md text-center p-8">
                        <div className="flex flex-col space-y-6">
                            <p className="text-base">
                                You currently don’t have any sites to track.
                                Click below to create one!
                            </p>
                            <div>
                                <Link href={route("sites.new")}>
                                    <SecondaryButton>
                                        Add New Site
                                    </SecondaryButton>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}

const SiteCard = ({ site }) => {
    const [isTracking, setIsTracking] = useState(false);
    return (
        <li className="bg-background border border-border rounded-md text-center p-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className="rounded-full h-10 w-10 bg-gray-50"></div>
                    <div className="flex flex-col items-start space-y-1">
                        <h4 className="text-basicwhite hover:underline">
                            <Link
                                href={route("sites.details.index", {
                                    id: site.title,
                                })}
                            >
                                {site.title}
                            </Link>
                        </h4>
                        <a
                            className="flex items-center space-x-2 hover:underline"
                            href={site.url}
                            target="_blank"
                        >
                            <span>{site.url}</span>
                            <ExternalLinkIcon className="w-3 h-3" />
                        </a>
                    </div>
                </div>
                <div className="flex flex-col items-start space-y-1">
                    <h4 className="text-basicwhite">Goal Events: 0</h4>
                    <span>{site.goalId}</span>
                </div>
                <div className="flex items-center space-x-2">
                    <h4>tracking</h4>
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            value={isTracking}
                            handleChange={() => setIsTracking(!isTracking)}
                        />
                    </label>
                </div>
                <div className="flex items-center space-x-2">
                    <DotsVerticalIcon className="w-5 h-5" />
                </div>
            </div>
        </li>
    );
};

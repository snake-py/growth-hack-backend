import Checkbox from "@/Components/Checkbox";
import SecondaryButton from "@/Components/SecondaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/inertia-react";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { useState } from "react";

const siteList = [
    {
        id: 1,
        name: "nanogiants-test",
        url: "http://45.83.107.70/",
        totalGoalEvents: "22k+",
        goalId: "reach-slider-end",
        tracking: true,
    },
];

export default function Sites({ auth }) {
    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Sites" />
            <div className="max-w-7xl mx-auto h-full py-16">
                {siteList ? (
                    <ul>
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
        <li
            key={site.id}
            className="bg-background border border-border rounded-md text-center p-8"
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className="rounded-full h-10 w-10 bg-gray-50"></div>
                    <div className="flex flex-col items-start space-y-1">
                        <h4 className="text-basicwhite">{site.name}</h4>
                        <a href={site.url} target="_blank">
                            {site.url}
                        </a>
                    </div>
                </div>
                <div className="flex flex-col items-start space-y-1">
                    <h4 className="text-basicwhite">
                        Goal Events: {site.totalGoalEvents}
                    </h4>
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

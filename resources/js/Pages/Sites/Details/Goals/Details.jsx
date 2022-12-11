import SecondaryButton from "@/Components/SecondaryButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import { ArrowLeftIcon, PlusIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import SingleDataCard from "@/Components/SingleDataCard";
import PlotDataCard from "@/Components/PlotDataCard";
// import Line from "@/Components/Plots/Line";

export default function ({ auth, site, goal, eventData }) {
    console.log(eventData);
    console.log(goal);
    const calculateTotal = (eventTypes) => {
        let sum = 0;
        eventTypes.forEach((events) => {
            sum += events.length;
        });
        return sum;
    };
    const prepareDataForLineGraph = (label, events) => {
        // events.map((event) => {
        //     return {
        //         primary: event.created_at,
        //         secondary: event,
        //     };
        // {
        //     label: "Main Event",
        // }
    };
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
                            <button className="py-1 px-4 mb-3 text-bodytext">
                                Events
                            </button>
                        </Link>
                        <Link
                            href={route("sites.details.goals", {
                                id: site.title,
                            })}
                        >
                            <button className="py-1 px-4 mb-3 bg-bodytext bg-opacity-30 rounded-md text-basicwhite">
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
            <Head title="Goal" />

            <div className="max-w-7xl mx-auto h-full py-16 flex flex-col space-y-8">
                <Link href={route("sites.details.goals", { id: site.title })}>
                    <div className="flex items-center space-x-1">
                        <ArrowLeftIcon className="w-4 h-4" />
                        <span className="underline">Back</span>
                    </div>
                </Link>
                <h2 className="text-basicwhite">Goal: {goal.title}</h2>
                <div className="bg-background border border-border rounded-md p-8 relative">
                    <div className="flex">
                        <SingleDataCard
                            width={"1/3"}
                            title="Total Main Events"
                            value={eventData.mainEvent.length}
                        />
                        <SingleDataCard
                            width={"1/3"}
                            title="Total Positive Related Events"
                            value={calculateTotal(
                                eventData.positiveRelatedEvents
                            )}
                        />
                        <SingleDataCard
                            width={"1/3"}
                            title="Total Negative Related Events"
                            value={calculateTotal(
                                eventData.negativeRelatedEvents
                            )}
                        />
                    </div>
                    <PlotDataCard title={"test"}>{/* <Line /> */}</PlotDataCard>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

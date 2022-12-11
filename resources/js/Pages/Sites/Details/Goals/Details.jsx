import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import { ArrowLeftIcon, PlusIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import SingleDataCard from "@/Components/SingleDataCard";
import PlotDataCard from "@/Components/PlotDataCard";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: true,
            text: "Chart.js Line Chart",
        },
    },
};

const prepareData = (eventSets) => {
    const dataset = {
        labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ],
        datasets: [],
    };

    Object.keys(eventSets).forEach((key) => {
        const events = eventSets[key];
        const values = [];

        if (
            key === "negativeRelatedEvents" ||
            key === "positiveRelatedEvents"
        ) {
            events.forEach((event) => {
                const groupedEvents = groupEventsForTheSameTimeFrame(event);
                for (let i = 1; i <= 12; i++) {
                    if (groupedEvents[i]) {
                        if (values[i - 1] === undefined) {
                            values.push(groupedEvents[i].length);
                        } else {
                            values[i - 1] += groupedEvents[i].length;
                        }
                    }
                    if (!values[i - 1]) {
                        values.push(0);
                    }
                }
            });
        } else {
            const groupedEvents = groupEventsForTheSameTimeFrame(events);
            for (let i = 1; i <= 12; i++) {
                if (groupedEvents[i]) {
                    values.push(groupedEvents[i].length);
                }
                values.push(0);
            }
        }

        dataset.datasets.push({
            label: events[0].event_name ?? key,
            data: values,
            fill: false,
            borderColor: getColor(key),
            tension: 0.1,
        });
    });
    return dataset;
};

const getColor = (key) => {
    if (key === "visitors") return "rgb(54, 162, 235)";
    if (key === "mainEvent") return "rgb(0, 240, 120)";
    if (key === "positiveRelatedEvents") return "rgb(255, 205, 86)";
    if (key === "negativeRelatedEvents") return "rgb(255, 99, 132)";
};

const groupEventsForTheSameTimeFrame = (events) => {
    const groupedEvents = {};
    events.forEach((event) => {
        const date = new Date(event.created_at);
        const key = date.getMonth() + 1;
        if (!groupedEvents[key]) {
            groupedEvents[key] = [];
        }
        groupedEvents[key].push(event);
    });
    return groupedEvents;
};

export default function ({ auth, site, goal, eventData }) {
    const [timeFrame, setTimeFrame] = useState("day");
    const calculateTotal = (eventTypes) => {
        let sum = 0;
        eventTypes.forEach((events) => {
            sum += events.length;
        });
        return sum;
    };
    const lineChartData = prepareData(eventData);

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
                    {/* <PlotDataCard title={"test"}>
                        <div className="full-width heigh-[300px]">
                            <Line options={options} data={lineChartData} />
                        </div>
                    </PlotDataCard> */}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

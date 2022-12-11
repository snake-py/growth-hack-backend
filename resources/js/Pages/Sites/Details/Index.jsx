import SecondaryButton from "@/Components/SecondaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/inertia-react";
import { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const prepareData = (events) => {
    console.log(events);

    const labels = [...new Set(events.map((event) => event.event_name))];
    console.log(labels);
    const data = [];
    labels.forEach((label) => {
        console.log(label);
        const filteredEvents = events.filter(
            (event) => event.event_name === label
        );
        return data.push(filteredEvents.length);
    });

    const orderedData = [];

    for (let i = 0; i < labels.length; i++) {
        console.log(i, labels[i]);

        orderedData.push({
            label: labels[i],
            data: data[i],
        });
    }

    console.log(orderedData);

    orderedData.sort((a, b) => b.data - a.data);

    console.log(orderedData);

    return {
        labels: orderedData.map((item) => item.label),
        datasets: [
            {
                label: "Occurrences",
                data: orderedData.map((item) => item.data),
                borderWidth: 1,
                backgroundColor: "#B57FE9",
            },
        ],
    };

    // console.log(data);

    // return {
    //     labels,
    //     datasets: [
    //         {
    //             label: "Completions",
    //             data,
    //             borderWidth: 1,
    //             backgroundColor: "#B57FE9",
    //         },
    //     ],
    // };
};

export default function Detail({ auth, site, events }) {
    const data = prepareData(events);

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
                {events ? (
                    <div className="bg-background border border-border rounded-md text-center">
                        <div className="flex justify-around items-start p-8">
                            <div className="relative z-10 h-[200px] w-[70%]">
                                <BarChart data={data} />
                            </div>
                            <div className="w-[30%]">
                                <table>
                                    <thead>
                                        <tr className="">
                                            <td>
                                                <h4>Total Completions</h4>
                                            </td>
                                            <td>
                                                <h4>Conversion Rate</h4>
                                            </td>
                                        </tr>
                                    </thead>
                                    <div className="flex items-center justify-end space-x-4"></div>
                                    <div className="flex items-center justify-end space-x-4">
                                        <h4>100</h4>
                                        <h4>20</h4>
                                    </div>
                                </table>
                            </div>
                        </div>
                    </div>
                ) : (
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
                )}
            </div>
        </AuthenticatedLayout>
    );
}

// {
//     labels: ["Event 1", "Event 2", "Event 3"],
//     datasets: [
//         {
//             label: "Completions",
//             data: [12, 19, 3],
//             borderWidth: 1,
//             backgroundColor: "#B57FE9",
//         },
//     ],
// }

const BarChart = ({ data }) => {
    return (
        <Bar
            style={{
                width: "100%",
            }}
            data={data}
            options={{
                responsive: true,
                aspectRatio: 0,
                indexAxis: "y",

                elements: {
                    bar: {
                        borderWidth: 2,
                    },
                },
            }}
        />
    );
};

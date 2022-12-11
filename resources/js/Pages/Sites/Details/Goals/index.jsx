import SecondaryButton from "@/Components/SecondaryButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import { ArrowLeftIcon, PlusIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

export default function Goals({ auth, site, goals }) {
    const [showForm, setShowForm] = useState(goals.length === 0);
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
                        {/* <Link
                            href={route("sites.details.settings", {
                                id: site.title,
                            })}
                        >
                            <button className="py-1 px-4 mb-3 text-bodytext">
                                Settings
                            </button>
                        </Link> */}
                    </div>
                </div>
            }
            site={site.title}
        >
            <Head title="Goals" />

            <div className="max-w-7xl mx-auto h-full py-16 flex flex-col space-y-8">
                <div className="flex justify-between items-center">
                    <h2 className="text-basicwhite">All Goals</h2>
                    <div className="flex justify-end">
                        <button
                            onClick={() => {
                                setShowForm(true);
                            }}
                            className="inline-flex items-center px-8 h-[36px] bg-background border border-border rounded-md font-semibold text-sm text-bodytext hover:border-basicwhite hover:text-basicwhite focus:bg-none active:bg-gray-900 focus:outline-none focus:ring-0 transition ease-in-out duration-150 undefined "
                        >
                            Add Goal
                        </button>
                    </div>
                </div>
                <div className="relative">
                    {showForm ? (
                        <GoalForm site={site} setShowForm={setShowForm} />
                    ) : (
                        <>
                            <GoalTable goals={goals} site={site} />
                        </>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

const GoalTable = ({ site, goals }) => {
    return (
        <div className="bg-background border border-border rounded-md p-8 ">
            <div className="flex flex-col items-center space-y-4">
                <div className="flex flex-col items-center space-y-4  overflow-scroll max-h-[340px]">
                    <table className="table-fixed w-full">
                        <thead>
                            <tr className="border-b border-border">
                                <td className="pb-4">Title</td>
                                <td className="pb-4">Main Event</td>
                                <td className="pb-4">Metrics</td>
                            </tr>
                        </thead>
                        {goals.length > 0 ? (
                            <tbody>
                                {goals.map((goal, index) => (
                                    <tr
                                        key={goal.id}
                                        className="border-b border-border"
                                    >
                                        <td className="py-4">{goal.title}</td>
                                        <td className="py-4">
                                            {goal.main_event}
                                        </td>
                                        <td className="py-4 underline text-basicwhite">
                                            <Link
                                                href={route(
                                                    "sites.details.goals.details",
                                                    {
                                                        site_title: site.title,
                                                        goal_id: goal.id,
                                                    }
                                                )}
                                            >
                                                Open Metrics
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        ) : (
                            <tbody>
                                {Array.from({ length: 10 }).map((_, index) => (
                                    <tr
                                        key={index}
                                        className="border-b border-border"
                                    >
                                        <td className="py-4">Title</td>
                                        <td className="py-4">Main Event</td>
                                        <td className="py-4">Open Metrics</td>
                                    </tr>
                                ))}
                            </tbody>
                        )}
                    </table>
                </div>
            </div>
        </div>
    );
};

const InputFields = [
    {
        name: "title",
        label: "Title",
        type: "text",
        placeholder: "my-new-goal",
    },
    {
        name: "main_event",
        label: "Main Event to track",
        type: "text",
        placeholder: "conversion_event",
    },
    {
        name: "positive_related_events",
        label: "Comma separated list of positive related events",
        type: "text",
        placeholder: "click_event,view_section_a_event",
    },
    {
        name: "negative_related_events",
        label: "Comma separated list of negative related events",
        type: "text",
        placeholder: "view_section_b,left_after_5_seconds_event",
    },
    {
        name: "description",
        label: "Description (optional)",
        type: "text",
        placeholder: "Describe your goal...",
    },
    {
        name: "target_value",
        label: "How many do you want to achieve?",
        type: "number",
        placeholder: "100",
    },
    // {
    //     name: "target_value_type",
    //     label: "In what Time Frame?",
    //     type: "select",
    //     options: [
    //         { value: "daily", label: "Daily" },
    //         { value: "weekly", label: "Weekly" },
    //         { value: "monthly", label: "Monthly" },
    //         { value: "yearly", label: "Yearly" },
    //         { value: "total", label: "Total" },
    //     ],
    // },
];

const GoalForm = ({ site, setShowForm }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        main_event: "",
        positive_related_events: "",
        negative_related_events: "",
        description: "",
    });

    useEffect(() => {
        return () => {
            reset(
                "title",
                "main_event",
                "positive_related_events",
                "negative_related_events",
                "description"
            );
        };
    }, []);

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("sites.details.goals.create", { id: site.id }), {
            onSuccess: () => console.log("success"),
            onError: () => console.log(errors),
        });
    };

    return (
        <div className="max-w-3xl mx-auto bg-background border border-border rounded-md p-8">
            <form onSubmit={submit}>
                <div className="grid grid-cols-2 gap-10">
                    {InputFields.map((field) => (
                        <div key={field.name}>
                            {field.type === "select" ? (
                                <>
                                    <InputLabel
                                        forInput={field.name}
                                        value={field.label}
                                    />
                                    {/* TODO Make select field */}
                                    <TextInput
                                        id={field.name}
                                        name={field.name}
                                        value={data[field.name]}
                                        placeholder={field.placeholder}
                                        type={field.type}
                                        className="mt-1 block w-full"
                                        handleChange={onHandleChange}
                                        required
                                    />

                                    <InputError
                                        message={errors[field.name]}
                                        className="mt-2"
                                    />
                                </>
                            ) : (
                                <>
                                    <InputLabel
                                        forInput={field.name}
                                        value={field.label}
                                    />
                                    <TextInput
                                        id={field.name}
                                        name={field.name}
                                        value={data[field.name]}
                                        placeholder={field.placeholder}
                                        type={field.type}
                                        className="mt-1 block w-full"
                                        handleChange={onHandleChange}
                                        required
                                    />

                                    <InputError
                                        message={errors[field.name]}
                                        className="mt-2"
                                    />
                                </>
                            )}
                        </div>
                    ))}
                </div>

                <div className="flex items-center justify-between mt-8">
                    <SecondaryButton onClick={() => setShowForm(false)}>
                        <div className="flex items-center space-x-2">
                            <span>Cancel</span>
                        </div>
                    </SecondaryButton>
                    <PrimaryButton processing={processing} onClick={submit}>
                        <div className="flex items-center space-x-2">
                            <span>Add New Goal</span>
                            <PlusIcon className="w-4 h-4" />
                        </div>
                    </PrimaryButton>
                </div>
            </form>
        </div>
    );
};

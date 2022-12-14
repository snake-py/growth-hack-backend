import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import { ArrowLeftIcon, PlusIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";

const InputFields = [
    {
        name: "url",
        label: "Site URL",
        type: "text",
        placeholder: "my-site.com",
    },
    {
        name: "database_host",
        label: "Database Host",
        type: "text",
        placeholder: "localhost",
    },
    {
        name: "database_port",
        label: "Database Port",
        type: "text",
        placeholder: "3306",
    },
    {
        name: "database_name",
        label: "Database Name",
        type: "text",
        placeholder: "my_site_db",
    },
    {
        name: "database_user",
        label: "Database User",
        type: "text",
        placeholder: "root",
    },
    {
        name: "database_password",
        label: "Database Password",
        type: "password",
        placeholder: "super-secret-password",
    },
];

export default function Edit({ auth, mustVerifyEmail, status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        database_host: "",
        database_port: "",
        database_name: "",
        database_user: "",
        database_password: "",
        title: "",
        url: "",
        allow_subdomains: true,
    });

    useEffect(() => {
        return () => {
            reset(
                "database_host",
                "database_port",
                "database_name",
                "database_user",
                "database_password",
                "title",
                "url",
                "allow_subdomains"
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
        post(route("sites.create"), {
            onSuccess: () => console.log("success"),
            onError: () => console.log(errors),
        });
    };

    return (
        <AuthenticatedLayout auth={auth} noMenu>
            <Head title="New Site" />
            <div className="max-w-[650px] mx-auto h-full py-16 ">
                <div className="mb-8 flex">
                    <Link href={route("sites.index")}>
                        <div className="flex items-center space-x-1">
                            <ArrowLeftIcon className="w-4 h-4" />
                            <span className="underline">Back</span>
                        </div>
                    </Link>
                </div>

                <h1 className="text-3xl text-basicwhite my-4">
                    Create new site
                </h1>
                <p>
                    Enter your site???s domain name and connect your database of
                    choice.
                </p>

                <div className="bg-background border border-border rounded-md p-8 mt-8">
                    <form onSubmit={submit}>
                        <InputLabel forInput="title" value="Site Title" />
                        <TextInput
                            id="title"
                            name="title"
                            value={data.title}
                            placeholder={"my-cool-site"}
                            className="mt-1 block w-full"
                            handleChange={onHandleChange}
                            required
                        />
                        <InputError message={errors.title} className="mt-2" />
                        <div className="grid grid-cols-2 gap-10 mt-8">
                            {InputFields.map((field) => (
                                <div key={field.name}>
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
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center justify-between mt-8">
                            <label className="flex items-center">
                                <Checkbox
                                    name="allow_subdomains"
                                    value={data.allow_subdomains}
                                    handleChange={onHandleChange}
                                />
                                <span className="ml-2 text-sm text-bodytext">
                                    Track Subdomains?
                                </span>
                            </label>
                            <PrimaryButton
                                processing={processing}
                                onClick={submit}
                            >
                                <div className="flex items-center space-x-2">
                                    <span>Add New Site</span>
                                    <PlusIcon className="w-4 h-4" />
                                </div>
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

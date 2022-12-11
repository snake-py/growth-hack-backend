import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import { ArrowLeftIcon, PlusIcon } from "@radix-ui/react-icons";
import { useEffect } from "react";

export default function Edit({ auth, mustVerifyEmail, status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        domainname: "",
        subdomainname: "",
        dbhostname: "",
        dbpassword: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
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
                    Enter your site’s domain name and connect your database of
                    choice.
                </p>

                <div className="bg-background border border-border rounded-md p-8 mt-8">
                    <form onSubmit={submit}>
                        <div className="grid grid-cols-2 gap-10 ">
                            <div>
                                <InputLabel
                                    forInput="domainName"
                                    value="Domain Name"
                                />

                                <TextInput
                                    id="domainName"
                                    name="domainname"
                                    value={data.domainname}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    handleChange={onHandleChange}
                                    required
                                />

                                <InputError
                                    message={errors.domainname}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <InputLabel
                                    forInput="subdomainName"
                                    value="Subdomain Name"
                                />

                                <TextInput
                                    id="subdomainName"
                                    name="subdomainName"
                                    value={data.subdomainName}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    handleChange={onHandleChange}
                                    required
                                />

                                <InputError
                                    message={errors.subdomainName}
                                    className="mt-2"
                                />
                            </div>

                            <div className="">
                                <InputLabel
                                    forInput="dbhostname"
                                    value="Database Hostname"
                                />

                                <TextInput
                                    id="dbhostname"
                                    type="text"
                                    name="dbhostname"
                                    value={data.dbhostname}
                                    className="mt-1 block w-full"
                                    handleChange={onHandleChange}
                                    required
                                />

                                <InputError
                                    message={errors.dbhostname}
                                    className="mt-2"
                                />
                            </div>

                            <div className="">
                                <InputLabel
                                    forInput="dbpassword"
                                    value="Database Password"
                                />

                                <TextInput
                                    id="dbpassword"
                                    type="password"
                                    name="dbpassword"
                                    autoComplete="off"
                                    value={data.dbpassword}
                                    className="mt-1 block w-full"
                                    handleChange={onHandleChange}
                                    required
                                />

                                <InputError
                                    message={errors.dbpassword}
                                    className="mt-2"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between mt-8">
                            <label className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    value={data.remember}
                                    handleChange={onHandleChange}
                                />
                                <span className="ml-2 text-sm text-bodytext">
                                    Support Localhost?
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

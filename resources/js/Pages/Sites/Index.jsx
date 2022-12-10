import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/inertia-react";

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Sites
                </h2>
            }
        >
            <Head title="Sites" />

            <div className="py-12">
                <Link href={route("sites.create")}>Create site</Link>
            </div>
        </AuthenticatedLayout>
    );
}

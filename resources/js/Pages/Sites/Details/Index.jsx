import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/inertia-react";

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Sites" />

            <div className="py-12"></div>
        </AuthenticatedLayout>
    );
}

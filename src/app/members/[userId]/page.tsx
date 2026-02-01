import { getMemberByUserId } from "@/lib/actions/member-actions";
import { notFound } from "next/navigation";
import CardPageLayout from "./CardPageLayout";
import { getCurrentUser } from "@/lib/actions/auth-actions";
import EditForm from "./EditForm";

export default async function MemberDetailedPage({ params }: { params: Promise<{ userId: string }> }) {
    const { userId } = await params;
    const member = await getMemberByUserId(userId);

    if (!member) return notFound();

    const currentUser = await getCurrentUser();
    const isOwner = currentUser?.id === userId;

    return (
        <CardPageLayout title={isOwner ? 'Edit your profile' : 'Profile'}>
            {isOwner ? (
                <EditForm member={member} />
            ) : (
                <div>{member.description}</div>
            )}

        </CardPageLayout>
    )
}
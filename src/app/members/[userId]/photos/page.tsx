import { getMemberPhotosByUserId } from "@/lib/actions/member-actions";
import CardPageLayout from "../CardPageLayout";
import { getCurrentUser } from "@/lib/actions/auth-actions";
import PhotoUpload from "./PhotoUpload";
import MemberPhotos from "./MemberPhotos";

export default async function PhotosPage({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;
  const photos = await getMemberPhotosByUserId(userId);

  const currentUser = await getCurrentUser();
  const isOwner = currentUser?.id === userId;

  return (
    <CardPageLayout 
      title={isOwner ? 'Update photos' : 'Photos'}
      action={isOwner ? <PhotoUpload /> : undefined}
    >
      <MemberPhotos photos={photos} isOwner={isOwner} mainImageUrl={currentUser?.image} />
    </CardPageLayout>
  )
}
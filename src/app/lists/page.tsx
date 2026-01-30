import { fetchCurrentUserLikeIds, fetchLikedMembers } from "@/lib/actions/like-actions";
import ListsTabs from "./ListsTabs";

export default async function ListsPage({searchParams}: {searchParams: Promise<{type: string}>}) {

  const {type} = await searchParams;

  const likeIds = await fetchCurrentUserLikeIds();
  const members = await fetchLikedMembers(type);

  return (
    <div className="mt-24 mx-10">
      <ListsTabs members={members} likeIds={likeIds} />
    </div>
  )
}

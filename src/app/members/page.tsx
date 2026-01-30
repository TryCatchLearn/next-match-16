import { getMembers } from "@/lib/actions/member-actions"
import MemberCard from "./MemberCard";
import { fetchCurrentUserLikeIds } from "@/lib/actions/like-actions";

export default async function MembersPage() {
  const members = await getMembers();
  const likeIds = await fetchCurrentUserLikeIds();

  return (
    <div className="p-10 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6">
        {members && members.map(member => (
          <MemberCard key={member.id} member={member} likeIds={likeIds} />
        ))}
    </div>

  )
}

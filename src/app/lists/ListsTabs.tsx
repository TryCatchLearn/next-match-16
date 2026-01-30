'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Member } from "../../../generated/prisma/client"
import MemberCard from "../members/MemberCard";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Spinner } from "@/components/ui/spinner";

type Props = {
    members: Member[];
    likeIds: string[];
}

export default function ListsTabs({ members, likeIds }: Props) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    const tabs = [
        { id: 'target', label: 'Members I have liked' },
        { id: 'source', label: 'Members that like me' },
        { id: 'mutual', label: 'Mutual likes' },
    ]

    const currentTab = searchParams.get('type') || 'target';

    function handleTabChange(value: string) {
        const params = new URLSearchParams(searchParams);
        params.set('type', value);
        startTransition(() => {
            router.replace(`${pathname}?${params}`)
        })
    }

    return (
        <div className="flex flex-col mt-10 gap-5">
            <Tabs value={currentTab} onValueChange={handleTabChange}>
                <div className="flex gap-3 items-center">
                    <TabsList>
                        {tabs.map(tab => (
                            <TabsTrigger key={tab.id} value={tab.id} className="cursor-pointer">
                                {tab.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    {isPending && <Spinner className="size-6 text-primary" />}
                </div>

                {tabs.map(tab => (
                    <TabsContent key={tab.id} value={tab.id}>
                        {members.length > 0 ? (
                            <div className="pt-6 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6">
                                {members.map(member => (
                                    <MemberCard key={member.id} member={member} likeIds={likeIds} />
                                ))}
                            </div>
                        ) : (
                            <div>No members for this filter</div>
                        )}
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    )
}
'use server'

import { redirect } from "next/navigation";
import { Member } from "../../../generated/prisma/client";
import { prisma } from "../prisma";
import { memberEditSchema, MemberEditSchema } from "../schemas/memberEditSchema";
import { ActionResult } from "../types";
import { getCurrentUser } from "./auth-actions";

export async function updateMemberProfile(data: MemberEditSchema): Promise<ActionResult<Member>> {
    try {
        const user = await getCurrentUser();

        if (!user) redirect('/login');

        const validated = memberEditSchema.safeParse(data);

        if (!validated.success) return {status: 'error', error: validated.error.issues}

        const {name, description, city, country} = validated.data;

        const member = await prisma.member.update({
            where: {userId: user.id},
            data: {
                name,
                description,
                city,
                country,
                user: {
                    update: {name}
                }
            }
        });

        return {status: 'success', data: member}
    } catch (error) {   
        console.log(error);
        throw error;
    }
}
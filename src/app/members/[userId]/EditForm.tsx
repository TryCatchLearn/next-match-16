'use client';

import { Path, useForm } from "react-hook-form";
import { Member } from "../../../../generated/prisma/client"
import { memberEditSchema, MemberEditSchema } from "@/lib/schemas/memberEditSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldContent, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { updateMemberProfile } from "@/lib/actions/user-actions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type Props = {
    member: Member;
}

export default function EditForm({ member }: Props) {
    const router = useRouter();
    const { register, handleSubmit, setError, reset, formState: { isValid, errors, isDirty, isSubmitting } }
        = useForm<MemberEditSchema>({
            resolver: zodResolver(memberEditSchema),
            mode: 'onTouched',
            defaultValues: {
                name: member.name,
                description: member.description,
                city: member.city,
                country: member.country
            }
        });

    const onSubmit = async (data: MemberEditSchema) => {
        const result = await updateMemberProfile(data);

        if (result.status === 'success') {
            router.refresh();
            reset({ ...data });
            toast.success('Profile updated successfully')
        } else {
            if (Array.isArray(result.error)) {
                result.error.forEach(e => {
                    const fieldName = e.path as Path<unknown>
                    setError(fieldName, {message: e.message})
                })
            } else {
                toast.error(result.error)
            }
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
            <Field data-invalid={!!errors.name}>
                <FieldLabel>Name</FieldLabel>
                <FieldContent>
                    <Input
                        {...register('name')}
                        aria-invalid={!!errors.name}
                    />
                    <FieldError>{errors.name?.message}</FieldError>
                </FieldContent>
            </Field>

            <Field data-invalid={!!errors.description}>
                <FieldLabel>Description</FieldLabel>
                <FieldContent>
                    <Textarea
                        rows={6}
                        {...register('description')}
                        aria-invalid={!!errors.description}
                    />
                    <FieldError>{errors.description?.message}</FieldError>
                </FieldContent>
            </Field>

            <div className="flex gap-3">
                <Field data-invalid={!!errors.city}>
                    <FieldLabel>City</FieldLabel>
                    <FieldContent>
                        <Input
                            {...register('city')}
                            aria-invalid={!!errors.city}
                        />
                        <FieldError>{errors.city?.message}</FieldError>
                    </FieldContent>
                </Field>
                <Field data-invalid={!!errors.country}>
                    <FieldLabel>Country</FieldLabel>
                    <FieldContent>
                        <Input
                            {...register('country')}
                            aria-invalid={!!errors.country}
                        />
                        <FieldError>{errors.country?.message}</FieldError>
                    </FieldContent>
                </Field>
            </div>

            {errors.root && (
                <p className="text-destructive text-sm">{errors.root.message}</p>
            )}

            <Button
                type="submit"
                className="flex self-end"
                disabled={!isValid || !isDirty || isSubmitting}
            >
                {isSubmitting && <Spinner />}
                Update profile
            </Button>

        </form>
    )
}
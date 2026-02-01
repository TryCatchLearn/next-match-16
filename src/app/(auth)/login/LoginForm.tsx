'use client';

import { Card, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Field, FieldError } from '@/components/ui/field';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, loginSchema } from '@/lib/schemas/loginSchema';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'react-toastify';

export default function LoginForm() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors, isValid, isSubmitting } } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        mode: 'onTouched'
    });

    const onSubmit = async (data: LoginSchema) => {
        await authClient.signIn.email({
            email: data.email,
            password: data.password
        }, {
            onSuccess: () => {
                router.push('/members');
                router.refresh();
            },
            onError: (ctx) => {
                toast.error(ctx.error.message)
            } 
        })
    }

    return (
        <Card className='w-full max-w-md shadow-xl'>
            <CardHeader className='flex flex-col items-center justify-center'>
                <div className='flex flex-col gap-2 items-center'>
                    <div className='flex flex-row items-center gap-3 text-primary'>
                        <Lock size={30} />
                        <h1 className='text-3xl font-semibold'>Login</h1>
                    </div>
                    <p className='text-muted-foreground'>Welcome back to NextMatch</p>
                </div>
            </CardHeader>

            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 px-6'>
                <div className='flex flex-col gap-1'>
                    <Field data-invalid={!!errors.email}>
                        <Input
                            type='email'
                            placeholder='Enter your email'
                            aria-invalid={!!errors.email}
                            {...register('email')}
                        />
                        <FieldError>{errors.email?.message}</FieldError>
                    </Field>

                </div>

                <div className='flex flex-col gap-1'>
                    <Field data-invalid={!!errors.password}>
                        <Input
                            type='password'
                            placeholder='Enter your password'
                            aria-invalid={!!errors.password}
                            {...register('password')}
                        />
                        <FieldError>{errors.password?.message}</FieldError>
                    </Field>

                </div>

                <Button disabled={!isValid || isSubmitting} type='submit' className='w-full'>
                    {isSubmitting ? (
                        <Spinner />
                    ) : (
                        <span>Sign In</span>
                    )}
                
                    
                </Button>
            </form>
        </Card>
    );
}
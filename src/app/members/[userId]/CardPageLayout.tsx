import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ReactNode } from "react";

type Props = {
    title: string;
    children: ReactNode;
    action?: ReactNode
}

export default function CardPageLayout({ title, children, action }: Props) {
    return (
        <>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <h2 className="text-2xl font-semibold capitalize text-primary">
                        {title}
                    </h2>
                    {action && <span>{action}</span>}
                </CardTitle>

            </CardHeader>
            <Separator />
            <CardContent>
                {children}
            </CardContent>
        </>
    )
}
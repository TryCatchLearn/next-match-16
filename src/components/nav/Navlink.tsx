'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
    href: string;
    label: string;
}

export default function Navlink({href, label}: Props) {
    const pathame = usePathname();

    return (
        <Link 
            href={href}
            className={
                pathame === href ? 'text-sky-500' : 'hover:text-sky-200'
            }
        >
            {label}
        </Link>
    )
}
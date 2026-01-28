import { Flame } from "lucide-react"
import Link from "next/link"
import { Button } from "../ui/button"
import Navlink from "./Navlink"
import ThemeToggle from "./ThemeToggle"

export default function Navbar() {
    const navLinks = [
        {href: '/members', label: 'Matches'},
        {href: '/lists', label: 'Lists'},
        {href: '/messages', label: 'Messages'}
    ]

    return (
        <header className="p-3 w-full fixed top-0 bg-linear-to-r 
            from-primary dark:from-purple-950 to-black dark:to-gray-500">
            <div className="flex justify-between items-center px-10 mx-auto gap-6">
                <Link href='/' className="flex items-center gap-2">
                    <Flame size={40} className="text-gray-200" />
                    <div className="font-bold text-3xl flex">
                        <span className="text-gray-900 dark:text-gray-500">Next</span>
                        <span className="text-gray-200">Match</span>
                    </div>
                </Link>

                <nav className="flex gap-3 my-2 uppercase text-xl text-white">
                    {navLinks.map(link => (
                        <Navlink key={link.href} href={link.href} label={link.label} />
                    ))}
                </nav>

                <div className="flex gap-3">
                    <ThemeToggle />
                    <Button variant='secondary'><Link href='/login'>Login</Link></Button>
                    <Button variant='secondary'><Link href='/register'>Register</Link></Button>
                </div>
            </div>
        </header>
    )
}
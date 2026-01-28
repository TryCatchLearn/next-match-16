import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Hello app!</h1>
      <Button>
        <Link href='/members'>
          Go to members page
        </Link>
      </Button>
    </div>
    
  );
}

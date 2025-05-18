import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      <p className="text-lg">Welcome to the Next.js app!</p>
      <Button variant='primary'>Subscribe</Button>
      <UserButton/>
    </div>
  );
}

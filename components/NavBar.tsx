import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="flex h-14 shadow-lg bg-gradient-to-b from-slate-500 to-slate-900  z-10">
      <nav className="flex items-center px-4 gap-4 container ">
        <Link
          className="mr-auto text-2xl text-zinc-200 hover:underline flex items-center"
          href="/"
        >
          Top PROGnozy
        </Link>
        <SignedIn>
          {/*<AdminLink />*/}
          <Link
            className="hover:bg-accent/10 text-xl font-bold  text-zinc-200 flex items-center px-2"
            href="/votes"
          >
            My Votes
          </Link>
          <Link
            className="hover:bg-accent/10 text-xl font-bold text-zinc-200 flex items-center px-2"
            href="/programmes"
          >
            Programmes
          </Link>
          <div className="size-8 self-center">
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: { width: "100%", height: "100%" },
                },
              }}
            />
          </div>
        </SignedIn>

        <SignedOut>
          <Button className="text-foreground" variant="secondary" asChild>
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </SignedOut>
      </nav>
    </header>
  );
}

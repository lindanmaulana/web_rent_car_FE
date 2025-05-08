import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { HomePage } from "@/features/client/home";

export default async function Home() {
  const handleLogout = async () => {
    "use server"
    await signOut({redirectTo: "/auth/login"})
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <form action={handleLogout}>
        <Button type="submit" variant="destructive">
          Logout
        </Button>
      </form>

      <HomePage />
    </div>
  );
}

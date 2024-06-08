import { getServerAuthSession } from "@/server/auth";

export default async function Home() {
  const session = await getServerAuthSession();
  console.log(session);
  return (
    <main className="container">
      this is landing page!
      <div></div>
    </main>
  );
}

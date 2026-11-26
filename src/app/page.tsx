import LinkList from "@/components/LinkList";
import ProfileHeader from "@/components/ProfileHeader";
import { links } from "@/lib/links";

// 더미 데이터 — 나중에 실제 내용으로 교체
const profile = {
  name: "김클로",
  bio: "세계 최강 바이브코더",
};

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center px-5 py-12">
      <ProfileHeader name={profile.name} bio={profile.bio} />
      <LinkList links={links} />
    </main>
  );
}

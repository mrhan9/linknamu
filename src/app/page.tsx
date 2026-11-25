import LinkCard from "@/components/LinkCard";
import ProfileHeader from "@/components/ProfileHeader";

// 더미 데이터 — 나중에 실제 내용으로 교체
const profile = {
  name: "김클로",
  bio: "세계 최강 바이브코더",
};

const links = [
  { title: "GitHub", url: "https://github.com" },
  { title: "LinkedIn", url: "https://www.linkedin.com" },
  { title: "Blog", url: "https://example.com" },
];

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center px-5 py-12">
      <ProfileHeader name={profile.name} bio={profile.bio} />
      <ul className="mt-10 flex w-full flex-col gap-6">
        {links.map((link) => (
          <li key={link.title}>
            <LinkCard title={link.title} url={link.url} />
          </li>
        ))}
      </ul>
    </main>
  );
}

export type LinkItem = {
  id: string;
  title: string;
  url: string;
};

// 더미 데이터 — 나중에 실제 내용으로 교체
export const links: LinkItem[] = [
  { id: "github", title: "GitHub", url: "https://github.com" },
  { id: "linkedin", title: "LinkedIn", url: "https://www.linkedin.com" },
  { id: "blog", title: "Blog", url: "https://example.com" },
];

export const linkIds = links.map((link) => link.id);

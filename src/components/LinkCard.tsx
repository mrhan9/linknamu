type LinkCardProps = {
  title: string;
  url: string;
  count: number;
  onClick?: () => void;
};

export default function LinkCard({ title, url, count, onClick }: LinkCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className="relative block w-full rounded-2xl border-2 border-neutral-800 px-16 py-4 text-center font-medium transition hover:-translate-y-0.5 hover:bg-neutral-100 dark:border-neutral-200 dark:hover:bg-neutral-800"
    >
      {title}
      <span className="absolute right-5 top-1/2 -translate-y-1/2 text-xs font-normal text-neutral-500 dark:text-neutral-400">
        {count.toLocaleString()}회
      </span>
    </a>
  );
}

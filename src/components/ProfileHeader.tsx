type ProfileHeaderProps = {
  name: string;
  bio: string;
  photoUrl?: string;
};

export default function ProfileHeader({ name, bio, photoUrl }: ProfileHeaderProps) {
  return (
    <header className="flex flex-col items-center text-center">
      {photoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={photoUrl}
          alt={`${name} 프로필 사진`}
          className="h-40 w-40 rounded-full border-2 border-neutral-800 object-cover dark:border-neutral-200"
        />
      ) : (
        <div
          aria-label={`${name} 프로필 사진`}
          className="flex h-40 w-40 items-center justify-center rounded-full border-2 border-neutral-800 bg-gradient-to-br from-emerald-300 to-sky-400 text-6xl font-bold text-white dark:border-neutral-200"
        >
          {name.charAt(0)}
        </div>
      )}
      <h1 className="mt-5 text-xl font-bold">{name}</h1>
      <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{bio}</p>
    </header>
  );
}

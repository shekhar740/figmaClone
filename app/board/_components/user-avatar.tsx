import { Hint } from "@/app/home/(dashboard)/_components/hint";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from 'next/image';

interface UserAvatarProps {
  src?: string;
  name?: string;
  fallback?: string;
  borderColor?: string;
}

export const UserAvatar = ({ src, name, fallback, borderColor }: UserAvatarProps) => {
  return (
    <Hint label={name || 'User Name'}>
      <Avatar className="h-8 w-8 fles justify-center border-2" style={{ borderColor }}>
        {src ? (
          <AvatarImage src={src} alt={name || 'User'} />
        ) : (
            fallback
        )}
      </Avatar>
    </Hint>
  );
};

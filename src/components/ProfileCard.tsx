import { FakeUser } from '@/hooks/useFakeUsers';

interface ProfileCardProps {
  user: FakeUser;
  onOpenModal: (user: FakeUser) => void;
}

export const ProfileCard = ({ user, onOpenModal }: ProfileCardProps) => {
  const handleClick = () => {
    onOpenModal(user);
  };

  return (
    <div 
      className="profile-card animate-scale-in"
      onClick={handleClick}
    >
      <div className="flex flex-col items-center text-center space-y-3">
        <div className="relative">
          <img
            src={user.avatar}
            alt={`${user.fullName}'s avatar`}
            className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
          />
        </div>
        
        <div className="w-full space-y-1">
          <h3 className="text-lg font-semibold text-foreground truncate">
            {user.fullName}
          </h3>
          <p className="text-sm text-muted-foreground">{user.phone}</p>
        </div>
      </div>
    </div>
  );
};
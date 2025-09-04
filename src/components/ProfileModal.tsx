import { FakeUser } from '@/hooks/useFakeUsers';
import { CopyButton } from './CopyButton';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ProfileModalProps {
  user: FakeUser | null;
  isOpen: boolean;
  onClose: () => void;
}

interface ProfileFieldProps {
  label: string;
  value: string;
  copyLabel?: string;
}

const ProfileField = ({ label, value, copyLabel }: ProfileFieldProps) => (
  <div className="profile-field">
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-foreground">{label}</p>
      <p className="text-sm text-muted-foreground truncate">{value}</p>
    </div>
    <CopyButton text={value} label={copyLabel || label} />
  </div>
);

export const ProfileModal = ({ user, isOpen, onClose }: ProfileModalProps) => {
  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">Profile Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Header with large avatar */}
          <div className="flex flex-col items-center text-center pb-6 border-b border-profile-border">
            <div className="relative mb-4">
              <img
                src={user.avatar}
                alt={`${user.fullName}'s avatar`}
                className="w-36 h-36 rounded-full object-cover border-4 border-primary/20"
              />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">{user.fullName}</h2>
            <p className="text-lg text-muted-foreground">{user.phone}</p>
          </div>

          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">Personal Information</h3>
            <div className="grid gap-3">
              <ProfileField label="Full Name" value={user.fullName} />
              <ProfileField label="Email" value={user.email} />
              <ProfileField label="Phone" value={user.phone} />
              <ProfileField label="Address" value={user.address} />
              <ProfileField label="Country" value={user.country} />
              <ProfileField label="Username" value={user.username} />
              <ProfileField label="Gender" value={user.gender} />
              <ProfileField label="Age" value={`${user.age} years old`} />
            </div>
          </div>

          {/* Physical & Professional */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">Physical & Professional</h3>
            <div className="grid gap-3">
              <ProfileField label="Height" value={user.height} />
              <ProfileField label="Weight" value={user.weight} />
              <ProfileField label="Profession" value={user.profession} />
            </div>
          </div>

          {/* About Me */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">About Me</h3>
            <div className="profile-field">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground leading-relaxed">{user.bio}</p>
              </div>
              <CopyButton text={user.bio} label="Bio" />
            </div>
          </div>

          {/* Sensitive Information */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">Sensitive Information</h3>
            <div className="grid gap-3">
              <ProfileField label="Password" value={user.password} />
              <ProfileField label="Credit Card" value={user.creditCard} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
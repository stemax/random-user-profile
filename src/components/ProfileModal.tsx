import { FakeUser } from '@/hooks/useFakeUsers';
import { CopyButton } from './CopyButton';
import {
    Dialog,
    DialogContent,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

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
    const handleDownloadJson = () => {
        const json = JSON.stringify(user, null, 2);
        const blob = new Blob([json], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = `${user.fullName.replace(/\s+/g, "_")}_profile.json`;
        link.click();

        URL.revokeObjectURL(url);
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <ProfileField label="Full Name" value={user.fullName} />
                            <ProfileField label="Profession" value={user.profession} />
                            <ProfileField label="Gender" value={user.gender} />
                            <ProfileField label="Age" value={`${user.age} years old`} />
                            <ProfileField label="Email" value={user.email} />
                            <ProfileField label="Phone" value={user.phone} />
                            <ProfileField label="Country" value={user.country} />
                            <ProfileField label="Address" value={user.address} />
                        </div>
                    </div>

                    {/* Physical */}
                    <div>
                        <h3 className="text-lg font-semibold text-primary mb-4">Physical</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <ProfileField label="Height" value={user.height} />
                            <ProfileField label="Weight" value={user.weight} />
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
                            <ProfileField label="Username" value={user.username} />
                            <ProfileField label="Password" value={user.password} />
                            <ProfileField label="Credit Card" value={user.creditCard} />
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-2 mt-6">
                    <Button onClick={handleDownloadJson}>Download as JSON</Button>
                    <Button variant="secondary" onClick={onClose}>Close</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

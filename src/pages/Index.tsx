import { useState } from 'react';
import { useFakeUsers, FakeUser } from '@/hooks/useFakeUsers';
import { ProfileCard } from '@/components/ProfileCard';
import { ProfileModal } from '@/components/ProfileModal';
import { Filters } from '@/components/Filters';
import { RefreshCw } from 'lucide-react';
import { BackgroundWords } from "@/components/BackgroundWords";

const Index = () => {
  const { users, filters, countries, generateNewUsers, updateFilters } = useFakeUsers();
  const [selectedUser, setSelectedUser] = useState<FakeUser | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (user: FakeUser) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleResetFilters = () => {
    updateFilters({
      gender: 'any',
      ageRange: [18, 80],
      country: 'any'
    });
  };

    return (
        <div className="min-h-screen relative overflow-hidden">
            <BackgroundWords />

            <div className="relative z-10 py-8 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-bold text-foreground mb-4">
                            Random User Profile Showcase
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8">
                            Discover randomly generated user profiles with a one-click.
                        </p>

                        <button
                            onClick={generateNewUsers}
                            className="generate-button inline-flex items-center gap-2"
                        >
                            <RefreshCw size={20} />
                            Generate new random users
                        </button>
                    </div>

                    <Filters
                        filters={filters}
                        countries={countries}
                        onFiltersChange={updateFilters}
                        onReset={handleResetFilters}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {users.length > 0 ? (
                            users.map((user) => (
                                <ProfileCard
                                    key={user.id}
                                    user={user}
                                    onOpenModal={handleOpenModal}
                                />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12">
                                <p className="text-lg text-muted-foreground">
                                    No profiles match your current filters. Try adjusting your
                                    search criteria.
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="text-center mt-16 pb-8">
                        <h3 className="text-2xl font-bold text-foreground mb-4">
                            Special for developers and testers: Fast copy and download full profile in JSON format.
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            All data is randomly generated using Faker.js • Click any card to
                            open modal with full details
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Created by{" "}
                            <a
                                href="https://github.com/stemax"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline"
                            >
                                Stemax
                            </a>
                        </p>
                    </div>
                </div>

                <ProfileModal
                    user={selectedUser}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                />
            </div>
        </div>
    );

};

export default Index;

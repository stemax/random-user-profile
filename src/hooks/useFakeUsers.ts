import { useState, useCallback, useMemo } from 'react';
import { faker } from '@faker-js/faker';

export interface FakeUser {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  username: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  gender: string;
  age: number;
  height: string;
  weight: string;
  profession: string;
  bio: string;
  creditCard: string;
  avatar: string;
  country: string;
}

export interface UserFilters {
  gender: 'any' | 'male' | 'female';
  ageRange: [number, number];
  country: string;
}

const countOfFakeUsers = 24;

const generateFakeUser = (): FakeUser => {
    const sex: 'male' | 'female' = faker.person.sexType();
    const firstName = faker.person.firstName(sex);
  const lastName = faker.person.lastName(sex);
  
  return {
    id: faker.string.uuid(),
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`,
    username: faker.internet.username({ firstName, lastName }),
    email: faker.internet.email({ firstName, lastName }),
    phone: faker.phone.number({ style: 'national' }),
    address: `${faker.location.streetAddress()}, ${faker.location.city()}, ${faker.location.state()} ${faker.location.zipCode()}`,
    password: faker.internet.password({ length: 12 }),
    gender: sex.charAt(0).toUpperCase() + sex.slice(1),
    age: faker.number.int({ min: 18, max: 80 }),
    height: `${faker.number.int({ min: 150, max: 200 })} cm`,
    weight: `${faker.number.int({ min: 45, max: 120 })} kg`,
    profession: faker.person.jobTitle(),
    bio: faker.person.bio(),
    creditCard: faker.finance.creditCardNumber(),
    avatar: faker.image.personPortrait( {sex, size: 64}),
    country: faker.location.country(),
  };
};

export const useFakeUsers = () => {
  const [allUsers, setAllUsers] = useState<FakeUser[]>(() => 
    Array.from({ length: countOfFakeUsers }, generateFakeUser)
  );
  
  const [filters, setFilters] = useState<UserFilters>({
    gender: 'any',
    ageRange: [18, 80],
    country: 'any'
  });

  const countries = useMemo(() => {
    const uniqueCountries = Array.from(new Set(allUsers.map(user => user.country)));
    return ['any', ...uniqueCountries.sort()];
  }, [allUsers]);

  const filteredUsers = useMemo(() => {
    return allUsers.filter(user => {
      if (filters.gender !== 'any' && user.gender.toLowerCase() !== filters.gender) {
        return false;
      }
      if (user.age < filters.ageRange[0] || user.age > filters.ageRange[1]) {
        return false;
      }
      if (filters.country !== 'any' && user.country !== filters.country) {
        return false;
      }
      return true;
    });
  }, [allUsers, filters]);

  const generateNewUsers = useCallback(() => {
    setAllUsers(Array.from({ length: countOfFakeUsers }, generateFakeUser));
  }, []);

  const updateFilters = useCallback((newFilters: Partial<UserFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  return { 
    users: filteredUsers, 
    allUsers,
    filters,
    countries,
    generateNewUsers,
    updateFilters
  };
};
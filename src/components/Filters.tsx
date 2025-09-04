import { UserFilters } from '@/hooks/useFakeUsers';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FiltersProps {
  filters: UserFilters;
  countries: string[];
  onFiltersChange: (filters: Partial<UserFilters>) => void;
  onReset: () => void;
}

export const Filters = ({ filters, countries, onFiltersChange, onReset }: FiltersProps) => {
  const handleAgeRangeChange = (value: number[]) => {
    onFiltersChange({ ageRange: [value[0], value[1]] });
  };

  return (
    <Card className="w-full mb-8">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">Filter Profiles</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
          {/* Gender Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Gender</label>
            <Select 
              value={filters.gender} 
              onValueChange={(value: 'any' | 'male' | 'female') => onFiltersChange({ gender: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Age Range Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Age Range: {filters.ageRange[0]} - {filters.ageRange[1]}
            </label>
            <div className="px-2">
              <Slider
                value={filters.ageRange}
                onValueChange={handleAgeRangeChange}
                min={18}
                max={80}
                step={1}
                className="w-full"
              />
            </div>
          </div>

          {/* Country Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Country</label>
            <Select 
              value={filters.country} 
              onValueChange={(value: string) => onFiltersChange({ country: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country === 'any' ? 'Any Country' : country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Reset Button */}
          <div>
            <Button
              variant="outline"
              onClick={onReset}
              className="w-full"
            >
              Reset Filters
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
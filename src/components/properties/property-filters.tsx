"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

type Filters = {
  search: string;
  type: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: string;
};

type PropertyFiltersProps = {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
};

export function PropertyFilters({ filters, setFilters }: PropertyFiltersProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string) => (value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handlePriceChange = (value: number[]) => {
    setFilters((prev) => ({ ...prev, minPrice: value[0], maxPrice: value[1] }));
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="search">Search by Location or Title</Label>
        <Input
          id="search"
          name="search"
          placeholder="e.g. 'Malibu' or 'Villa'"
          value={filters.search}
          onChange={handleInputChange}
        />
      </div>
      <div className="space-y-2">
        <Label>Property Type</Label>
        <Select
          name="type"
          value={filters.type}
          onValueChange={handleSelectChange("type")}
        >
          <SelectTrigger>
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="House">House</SelectItem>
            <SelectItem value="Apartment">Apartment</SelectItem>
            <SelectItem value="Condo">Condo</SelectItem>
            <SelectItem value="Villa">Villa</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Price Range</Label>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>${filters.minPrice.toLocaleString()}</span>
          <span>${filters.maxPrice.toLocaleString()}</span>
        </div>
        <Slider
          min={0}
          max={5000000}
          step={10000}
          value={[filters.minPrice, filters.maxPrice]}
          onValueChange={handlePriceChange}
        />
      </div>
      <div className="space-y-2">
        <Label>Minimum Bedrooms</Label>
        <Select
          name="bedrooms"
          value={filters.bedrooms}
          onValueChange={handleSelectChange("bedrooms")}
        >
          <SelectTrigger>
            <SelectValue placeholder="Any" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any</SelectItem>
            <SelectItem value="1">1+</SelectItem>
            <SelectItem value="2">2+</SelectItem>
            <SelectItem value="3">3+</SelectItem>
            <SelectItem value="4">4+</SelectItem>
            <SelectItem value="5">5+</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

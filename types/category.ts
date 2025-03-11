export interface Subcategory {
  id: string;
  name: string;
  topics: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  subcategories: Subcategory[];
}

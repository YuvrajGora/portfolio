export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readingTime: string;
  date: string;
  featured?: boolean;
}

// Add real posts here — the grid renders automatically once this
// array isn't empty, and the first `featured: true` post gets the large card.
export const posts: BlogPost[] = [];

export interface News {
    id: string;
    title: string;
    description: string;
    image: string;
    category: CategoryType;
    categoryColor: string;
    author: string;
    date: string;
    views: string;
    readTime: number; // minutos
    tags: string[];
    featured?: boolean;
    breaking?: boolean;
}

export type CategoryType =
    | 'Todas'
    | 'Tecnología'
    | 'Deportes'
    | 'Entretenimiento'
    | 'Ciencia'
    | 'Salud'
    | 'Política'
    | 'Economía';

export interface Category {
    id: string;
    name: CategoryType;
    icon: string;
    color: string;
    gradient: [string, string];
}

export interface NewsCardProps {
    news: News;
    onPress?: (news: News) => void;
}

export interface CategoryTabsProps {
    selectedCategory: CategoryType;
    onSelectCategory: (category: CategoryType) => void;
    newsCount?: Record<CategoryType, number>;
}

export type SortOption = 'recent' | 'popular' | 'trending';

export interface FilterState {
    category: CategoryType;
    sortBy: SortOption;
    searchQuery: string;
}

interface Movie {
    title: string;
    year: number;
    rating: number;
    awards: string[];
}

interface Category {
    name: string;
    listMovies: Movie[];
}


interface Filter<T> {
    filter: T;
}


interface RangeFilter<T> extends Filter<T> {
    filterTo: T;
}

interface ValueFilter<T> {
    values: T[];
}

interface FilterableList<T> {
    items: T[];
    applySearchValue(searchValue: string): void;
    applyFilters(filters: FilterOptions): void;
}


interface FilterOptions {
    yearFilter?: RangeFilter<number>;
    ratingFilter?: RangeFilter<number>;
    awardFilter?: ValueFilter<string>;
}

// Клас для фільтрованого списку фільмів
class MovieList implements FilterableList<Movie> {
    items: Movie[] = [];

    applySearchValue(searchValue: string): void {
        this.items = this.items.filter(movie =>
            movie.title.includes(searchValue)
        );
    }

    applyFilters(filters: FilterOptions): void {
        if (filters.yearFilter) {
            const { filter, filterTo } = filters.yearFilter;
            this.items = this.items.filter(movie =>
                movie.year >= filter &&
                movie.year <= filterTo
            );
        }

        if (filters.ratingFilter) {
            const { filter, filterTo } = filters.ratingFilter;
            this.items = this.items.filter(movie =>
                movie.rating >= filter &&
                movie.rating <= filterTo
            );
        }

        if (filters.awardFilter) {
            this.items = this.items.filter(movie =>
                filters.awardFilter!.values.some(award => movie.awards.includes(award))
            );
        }
    }
}

class CategoryList implements FilterableList<Category> {
    items: Category[] = [];

    applySearchValue(searchValue: string): void {
        this.items = this.items.filter(category =>
            category.name.includes(searchValue)
        );
    }
    applyFilters(filters: FilterOptions): void {
    }
}
enum GridFilterTypeEnum {
    Text = 'text',
    Number = 'number',
    Date = 'date',
    DateRange = 'dateRange',
    NumberRange = 'numberRange',
}
type GridFilterValue<T> = {
    type: GridFilterTypeEnum;
    filter: Extract<T, string | number>;
    filterTo?: Extract<T, string | number>;
};

type GridFilterSetValues<T> = {
    values: T[];
};
type Award = string;
interface IMovie{
    title: string;
    year: number;
    rating: number;
    listAward: Award[];
}
interface IMovieCategory{
    nameCategoryMovie: string;
    movies: IMovie[];
}
interface IFilterMatch {
    filter: string;
}

interface IFilterRange {
    filter: number;
    filterTo: number;
}

interface IFilterValue {
    values: string[];
}

type Filter =
    | GridFilterValue<string | number>
    | GridFilterSetValues<string | number>;
interface IMovieList {
    movies: IMovie[];
    filters: Filter[];
    applySearchValue(searchValue: string): IMovie[];
    applyFiltersValue(filters: Filter[]): IMovie[];
}

interface ICategoryList {
    categories: IMovieCategory[];
    filters: Filter[];
    applySearchValue(searchValue: string): IMovieCategory[];
}

class MovieList {
    public movies: IMovie[] = [];
    public filters: Filter[] = [];

    applySearchValue(searchValue: string): IMovie[] {
        return this.movies.filter(movie =>
            movie.title.toLowerCase().includes(searchValue.toLowerCase())
        );
    }

    applyFiltersValue(filters: Filter[]): IMovie[] {
        let filteredMovies = this.movies;

        filters.forEach(filter => {
            switch (filter.type) {
                case GridFilterTypeEnum.Text:
                    filteredMovies = filteredMovies.filter(movie =>
                        movie.title.toLowerCase().includes((filter.filter as string).toLowerCase())
                    );
                    break;
                case GridFilterTypeEnum.Number:
                    filteredMovies = filteredMovies.filter(movie =>
                        movie.rating === filter.filter
                    );
                    break;
                case GridFilterTypeEnum.NumberRange:
                    filteredMovies = filteredMovies.filter(movie =>
                        movie.year >= (filter.filter as number) &&
                        movie.year <= (filter.filterTo as number)
                    );
                    break;
                case GridFilterTypeEnum.DateRange:
                    filteredMovies = filteredMovies.filter(movies =>
                        new Date(movies.awards[0]).getTime() >= new Date(filter.filter as string).getTime() &&
                        new Date(this.movies.awards[0]).getTime() <= new Date(filter.filterTo as string).getTime()
                    );
                    break;
                default:
                    break;
            }
        });

        return filteredMovies;
    }
}

class CategoryList {
    public categories: IMovieCategory[] = [];
    public filters: Filter[] = [];

    applySearchValue(searchValue: string): IMovieCategory[] {
        return this.categories.filter(category =>
            category.name.toLowerCase().includes(searchValue.toLowerCase())
        );
    }
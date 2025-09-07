export interface MetaData {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
}

export interface ApiResponse<T> {
    data: T | T[] | null;
    message?: string;
    meta?: MetaData;
}
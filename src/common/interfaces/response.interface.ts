export interface MetaData {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface ApiSuccessResponse<T> {
  status: 'success' | 'oke';
  message?: string;
  data: T | T[] | null;
  meta?: MetaData;
}

export interface ApiErrorResponse {
  status: 'error' | 'fail';
  message: string;
  error_code?: string;
  details?: Record<string, any>;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

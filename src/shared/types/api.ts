export type ApiResponse<T> = {
  data: T;
};

export type ApiPagination = {
  page: number;
  perPage: number;
  totalPages: number;
};

export type Meta = {
  meta: Partial<ApiPagination>;
};

export type PaginatedApiResponse<T> = ApiResponse<T> & Meta;

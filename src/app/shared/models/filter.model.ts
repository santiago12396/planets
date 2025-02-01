export interface Filter {
  currentPage?: number;
  sortBy?: string;
  order?: Order;
  query?: string;
  limit?: number;
}

export enum Order {
  Asc = 'asc',
  Desc = 'desc',
}

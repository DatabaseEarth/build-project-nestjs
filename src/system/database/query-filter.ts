export class LengthAwarePaginator<T> {
  items: T[];

  total: number;

  size: number;

  page: number;

  last_page: number;

  constructor(items: T[], total: number, size: number, page: number) {
    this.items = items;
    this.total = total;
    this.size = size;
    this.page = page;
    this.last_page = Math.max(Math.ceil(total / size), 1);
  }
}

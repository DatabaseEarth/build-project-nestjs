export class ResponsePaginate<T> {
  data: T[];
  metadata: {
    total: number;
    size: number;
    page: number;
    last_page: number;
  };

  constructor(
    data: T[],
    metadata: { total: number; size: number; page: number; last_page: number },
  ) {
    this.data = data;
    this.metadata = metadata;
  }
}

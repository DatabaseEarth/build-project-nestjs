export class DataResponse<T> {
  data: T;

  constructor(data: T) {
    this.data = data;
  }
}

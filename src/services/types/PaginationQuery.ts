export class PaginationQuery {
  constructor(page = 1, size = 10, type?: string) {
    this.page = page;
    this.size = size;

    if (type) {
      this.type = type;
    }
  }

  type?: string;

  page: number = 1;

  size: number = 10;
}

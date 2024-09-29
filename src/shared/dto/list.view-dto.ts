export class ListViewDto<T> {
  page: number;
  
  limit: number;
  
  count: number;
  
  rows: T[];
  
  constructor(dto: ListViewDto<T>) {
    this.page = dto.page;
    this.limit = dto.limit;
    this.count = dto.count;
    this.rows = dto.rows;
  }
}

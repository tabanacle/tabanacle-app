export interface PaginatedTableHeader<T = any> {
  id: number;
  label: string;
  value?: string;
  renderLabel?(): JSX.Element | string | null;
  render?(row: T): JSX.Element | string | null;
  sortKey?: string;
}

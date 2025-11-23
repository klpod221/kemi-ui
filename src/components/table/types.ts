import type { TemplateResult } from "lit";

export interface TableColumn {
  key: string;
  title: string;
  width?: string;
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: any, record: any) => TemplateResult;
}

export interface DataSourceParams {
  page: number;
  pageSize: number;
  search?: string;
  filters?: Record<string, any>;
  sortField?: string;
  sortOrder?: "asc" | "desc";
}

export interface DataSourceResult {
  data: any[];
  total: number;
}

export type SortOrder = "asc" | "desc" | null;

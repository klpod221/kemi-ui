import { LitElement, html, css, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./main.scss?inline";
import type {
  TableColumn,
  DataSourceParams,
  DataSourceResult,
  SortOrder,
} from "./types";
import "../pagination";
import "../empty";
import "../skeleton";
import "../input";

@customElement("ui-table")
export class UiTable extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  @property({ type: Array }) columns: TableColumn[] = [];
  @property({ type: Array }) data: any[] = [];
  @property({ type: Object }) dataSource?: (
    params: DataSourceParams
  ) => Promise<DataSourceResult>;
  @property({ type: Boolean }) searchable = false;
  @property({ type: String }) searchPlaceholder = "Search...";
  @property({ type: Boolean }) pagination = true;
  @property({ type: Array }) pageSizeOptions = [10, 20, 50, 100];
  @property({ type: Number }) defaultPageSize = 10;

  @state() private currentPage = 1;
  @state() private pageSize = this.defaultPageSize;
  @state() private total = 0;
  @state() private loading = false;
  @state() private searchQuery = "";
  @state() private sortField: string | null = null;
  @state() private sortOrder: SortOrder = null;
  @state() private displayData: any[] = [];

  connectedCallback() {
    super.connectedCallback();
    this.pageSize = this.defaultPageSize;
    this.loadData();
  }

  private async loadData() {
    if (this.dataSource) {
      
      this.loading = true;
      try {
        const result = await this.dataSource({
          page: this.currentPage,
          pageSize: this.pageSize,
          search: this.searchQuery,
          sortField: this.sortField || undefined,
          sortOrder: this.sortOrder || undefined,
        });
        this.displayData = result.data;
        this.total = result.total;
      } catch (error) {
        console.error("Error loading data:", error);
        this.displayData = [];
        this.total = 0;
      }
      this.loading = false;
    } else {
      
      let filtered = [...this.data];

      
      if (this.searchQuery) {
        filtered = filtered.filter((row) =>
          this.columns.some((col) =>
            String(row[col.key] || "")
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase())
          )
        );
      }

      
      if (this.sortField && this.sortOrder) {
        filtered.sort((a, b) => {
          const aVal = a[this.sortField!];
          const bVal = b[this.sortField!];
          const result = aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
          return this.sortOrder === "asc" ? result : -result;
        });
      }

      this.total = filtered.length;

      
      if (this.pagination) {
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        this.displayData = filtered.slice(start, end);
      } else {
        this.displayData = filtered;
      }
    }
  }

  private handleSearch(e: Event) {
    const input = e.target as HTMLInputElement;
    this.searchQuery = input.value;
    this.currentPage = 1;
    this.loadData();
  }

  private handleSort(column: TableColumn) {
    if (!column.sortable) return;

    if (this.sortField === column.key) {
      
      this.sortOrder =
        this.sortOrder === "asc"
          ? "desc"
          : this.sortOrder === "desc"
          ? null
          : "asc";
      if (!this.sortOrder) this.sortField = null;
    } else {
      this.sortField = column.key;
      this.sortOrder = "asc";
    }

    this.loadData();
  }

  private handlePageChange(e: CustomEvent) {
    this.currentPage = e.detail.page;
    this.loadData();
  }

  private handlePageSizeChange(e: Event) {
    const select = e.target as HTMLSelectElement;
    this.pageSize = Number(select.value);
    this.currentPage = 1;
    this.loadData();
  }

  private renderSortIcon(column: TableColumn) {
    if (!column.sortable) return "";
    if (this.sortField !== column.key) {
      return html`<span class="sort-icon">↕</span>`;
    }
    return this.sortOrder === "asc"
      ? html`<span class="sort-icon active">↑</span>`
      : html`<span class="sort-icon active">↓</span>`;
  }

  render() {
    return html`
      <div class="table-container">
        ${this.searchable
          ? html`
              <div class="table-toolbar">
                <ui-input
                  placeholder="${this.searchPlaceholder}"
                  @input=${this.handleSearch}
                ></ui-input>
              </div>
            `
          : ""}

        <div class="table-wrapper">
          <table class="table">
            <thead>
              <tr>
                ${this.columns.map(
                  (col) => html`
                    <th
                      style="${col.width ? `width: ${col.width}` : ""}"
                      class="${col.sortable ? "sortable" : ""}"
                      @click=${() => this.handleSort(col)}
                    >
                      <div class="th-content">
                        ${col.title} ${this.renderSortIcon(col)}
                      </div>
                    </th>
                  `
                )}
              </tr>
            </thead>
            <tbody>
              ${this.loading
                ? html`
                    ${Array.from(
                      { length: this.pageSize },
                      () => html`
                        <tr>
                          ${this.columns.map(
                            () => html`
                              <td>
                                <ui-skeleton
                                  variant="text"
                                  width="80%"
                                  height="16px"
                                ></ui-skeleton>
                              </td>
                            `
                          )}
                        </tr>
                      `
                    )}
                  `
                : this.displayData.length === 0
                ? html`
                    <tr>
                      <td colspan="${this.columns.length}">
                        <ui-empty description="No data"></ui-empty>
                      </td>
                    </tr>
                  `
                : this.displayData.map(
                    (row) => html`
                      <tr>
                        ${this.columns.map(
                          (col) => html`
                            <td>
                              ${col.render
                                ? col.render(row[col.key], row)
                                : row[col.key]}
                            </td>
                          `
                        )}
                      </tr>
                    `
                  )}
            </tbody>
          </table>
        </div>

        ${this.pagination && !this.loading
          ? html`
              <div class="table-footer">
                <div class="page-size-selector">
                  <span>Items per page:</span>
                  <select @change=${this.handlePageSizeChange}>
                    ${this.pageSizeOptions.map(
                      (size) => html`
                        <option
                          value="${size}"
                          ?selected=${size === this.pageSize}
                        >
                          ${size}
                        </option>
                      `
                    )}
                  </select>
                </div>
                <ui-pagination
                  total="${this.total}"
                  current="${this.currentPage}"
                  pageSize="${this.pageSize}"
                  @change=${this.handlePageChange}
                ></ui-pagination>
              </div>
            `
          : ""}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ui-table": UiTable;
  }
}

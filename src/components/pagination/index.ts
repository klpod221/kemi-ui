import { LitElement, html, css, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./main.scss?inline";

@customElement("ui-pagination")
export class UiPagination extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  @property({ type: Number }) total = 0;
  @property({ type: Number }) current = 1;
  @property({ type: Number }) pageSize = 10;

  private get totalPages() {
    return Math.ceil(this.total / this.pageSize);
  }

  private handlePageChange(page: number) {
    if (page < 1 || page > this.totalPages || page === this.current) return;
    this.dispatchEvent(
      new CustomEvent("change", {
        detail: { page },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    const pages = [];
    const maxVisible = 7;

    if (this.totalPages <= maxVisible) {
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (this.current > 3) pages.push("...");

      const start = Math.max(2, this.current - 1);
      const end = Math.min(this.totalPages - 1, this.current + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (this.current < this.totalPages - 2) pages.push("...");
      pages.push(this.totalPages);
    }

    return html`
      <div class="pagination">
        <button
          class="pagination-btn"
          ?disabled=${this.current === 1}
          @click=${() => this.handlePageChange(this.current - 1)}
        >
          ‹
        </button>

        ${pages.map((page) =>
          page === "..."
            ? html`<span class="pagination-ellipsis">...</span>`
            : html`
                <button
                  class="pagination-btn ${page === this.current
                    ? "active"
                    : ""}"
                  @click=${() => this.handlePageChange(page as number)}
                >
                  ${page}
                </button>
              `
        )}

        <button
          class="pagination-btn"
          ?disabled=${this.current === this.totalPages}
          @click=${() => this.handlePageChange(this.current + 1)}
        >
          ›
        </button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ui-pagination": UiPagination;
  }
}

import { LitElement, html, css, unsafeCSS } from "lit";
import { customElement, property, state, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import styles from "./main.scss?inline";
import { validate } from "../../utils/validators";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

@customElement("ui-select")
export class UiSelect extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  @property({ type: String }) id = `select-${Math.random()
    .toString(36)
    .substr(2, 9)}`;
  @property({ type: String }) value = "";
  @property({ type: Array }) options: SelectOption[] = [];
  @property({ type: String }) label = "";
  @property({ type: String }) placeholder = "Select...";
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) searchable = false;
  @property({ type: String }) helperText = "";
  @property({ type: String }) errorMessage = "";
  @property({ type: String }) rules = "";

  @state() private _isOpen = false;
  @state() private _searchQuery = "";
  @state() private _internalErrorMessage = "";

  @state() private _highlightedIndex = -1;

  @query(".select-trigger") triggerElement!: HTMLDivElement;
  @query(".select-search") searchElement!: HTMLInputElement;
  @query(".select-options") optionsElement!: HTMLDivElement;

  connectedCallback() {
    super.connectedCallback();
    this.dispatchEvent(
      new CustomEvent("ui-form-register", {
        detail: {
          id: this.id,
          validate: this.validate.bind(this),
          getValue: () => this.value,
          element: this,
        },
        bubbles: true,
        composed: true,
      })
    );
    document.addEventListener("click", this.handleClickOutside);
  }

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has("_isOpen") && this._isOpen) {
      if (this.searchable) {
        requestAnimationFrame(() => this.searchElement?.focus());
      } else {
        // If not searchable, keep focus on trigger but ensure options are visible
        this.scrollToHighlighted();
      }
    }
  }

  private scrollToHighlighted() {
    if (this._highlightedIndex >= 0 && this.optionsElement) {
      const option = this.optionsElement.children[
        this._highlightedIndex
      ] as HTMLElement;
      if (option) {
        option.scrollIntoView({ block: "nearest" });
      }
    }
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (this.disabled) return;

    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault();
        if (this._isOpen) {
          if (this._highlightedIndex >= 0) {
            this.selectOption(this.filteredOptions[this._highlightedIndex]);
          } else {
            this.toggleDropdown();
          }
        } else {
          this.toggleDropdown();
        }
        break;
      case "ArrowDown":
        e.preventDefault();
        if (!this._isOpen) {
          this.toggleDropdown();
        } else {
          this._highlightedIndex = Math.min(
            this._highlightedIndex + 1,
            this.filteredOptions.length - 1
          );
          this.scrollToHighlighted();
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        if (!this._isOpen) {
          this.toggleDropdown();
        } else {
          this._highlightedIndex = Math.max(this._highlightedIndex - 1, 0);
          this.scrollToHighlighted();
        }
        break;
      case "Escape":
        if (this._isOpen) {
          e.preventDefault();
          this.toggleDropdown();
          this.triggerElement.focus();
        }
        break;
      case "Tab":
        if (this._isOpen) {
          this.toggleDropdown();
        }
        break;
    }
  }

  private toggleDropdown() {
    if (!this.disabled) {
      this._isOpen = !this._isOpen;
      this._searchQuery = "";
      if (this._isOpen) {
        // Reset highlighted index to current value or first option
        const index = this.filteredOptions.findIndex(
          (opt) => opt.value === this.value
        );
        this._highlightedIndex = index >= 0 ? index : 0;
      }
    }
  }

  private selectOption(option: SelectOption) {
    if (!option.disabled) {
      this.value = option.value;
      this._isOpen = false;
      this._searchQuery = "";
      this.triggerElement.focus();

      this.dispatchEvent(
        new CustomEvent("change", {
          detail: { value: this.value },
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  private handleClickOutside = (e: MouseEvent) => {
    const path = e.composedPath();
    if (!path.includes(this)) {
      this._isOpen = false;
    }
  };

  private handleSearch(e: Event) {
    const target = e.target as HTMLInputElement;
    this._searchQuery = target.value.toLowerCase();
  }

  private get filteredOptions(): SelectOption[] {
    if (!this.searchable || !this._searchQuery) {
      return this.options;
    }
    return this.options.filter((opt) =>
      opt.label.toLowerCase().includes(this._searchQuery)
    );
  }

  private get selectedLabel(): string {
    const selected = this.options.find((opt) => opt.value === this.value);
    return selected?.label || "";
  }

  public validate(allValues: any = {}): string {
    if (!this.rules) return "";

    const error = validate(this.value, this.rules, allValues);
    this._internalErrorMessage = error;
    this.requestUpdate();
    return error;
  }

  private get isRequired(): boolean {
    return this.rules.includes("required");
  }

  render() {
    const hasError = !!(this._internalErrorMessage || this.errorMessage);
    const errorMsg = this._internalErrorMessage || this.errorMessage;

    const selectClasses = {
      "select-trigger": true,
      "select-trigger--error": hasError,
      "select-trigger--disabled": this.disabled,
      "select-trigger--open": this._isOpen,
    };

    return html`
      <div class="select-wrapper">
        ${this.label
          ? html`<label class="label" for=${this.id}>
              ${this.label}
              ${this.isRequired ? html`<span class="required">*</span>` : ""}
            </label>`
          : ""}
        <div class="select-container">
          <div
            id=${this.id}
            class=${classMap(selectClasses)}
            @click=${this.toggleDropdown}
            tabindex=${this.disabled ? "-1" : "0"}
            @keydown=${this.handleKeyDown}
          >
            <span class="selected-value">
              ${this.selectedLabel ||
              html`<span class="placeholder">${this.placeholder}</span>`}
            </span>
            <svg
              class="arrow-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>

          ${this._isOpen
            ? html`
                <div class="select-dropdown">
                  ${this.searchable
                    ? html`
                        <div class="search-box">
                          <input
                            type="text"
                            class="search-input"
                            placeholder="Search..."
                            .value=${this._searchQuery}
                            @input=${this.handleSearch}
                            @click=${(e: Event) => e.stopPropagation()}
                          />
                        </div>
                      `
                    : ""}
                  <div class="options-list">
                    ${this.filteredOptions.length > 0
                      ? this.filteredOptions.map(
                          (opt, index) => html`
                            <div
                              class="select-option ${this.value === opt.value
                                ? "select-option--selected"
                                : ""} ${index === this._highlightedIndex
                                ? "select-option--highlighted"
                                : ""}"
                              @click=${() => this.selectOption(opt)}
                            >
                              ${opt.label}
                              ${this.value === opt.value
                                ? html`
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      stroke-width="2"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    >
                                      <polyline
                                        points="20 6 9 17 4 12"
                                      ></polyline>
                                    </svg>
                                  `
                                : ""}
                            </div>
                          `
                        )
                      : html`<div class="no-options">No options found</div>`}
                  </div>
                </div>
              `
            : ""}
        </div>
        ${errorMsg
          ? html`<div class="error-message">${errorMsg}</div>`
          : this.helperText
          ? html`<div class="helper-text">${this.helperText}</div>`
          : ""}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ui-select": UiSelect;
  }
}

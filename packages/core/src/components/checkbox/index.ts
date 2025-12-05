import { LitElement, html, css, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import styles from "./main.scss?inline";
import { validate } from "../../utils/validators";

@customElement("ui-checkbox")
export class UiCheckbox extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  @property({ type: String }) id = `checkbox-${Math.random()
    .toString(36)
    .substr(2, 9)}`;
  @property({ type: Boolean }) checked = false;
  @property({ type: Boolean }) indeterminate = false;
  @property({ type: String }) value = "";
  @property({ type: String }) name = "";
  @property({ type: String }) label = "";
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) size: "sm" | "md" | "lg" = "md";

  @state() private _focused = false;

  @property({ type: String }) rules = "";
  @property({ type: String }) errorMessage = "";
  @state() private _internalErrorMessage = "";

  connectedCallback() {
    super.connectedCallback();
    this.dispatchEvent(
      new CustomEvent("ui-form-register", {
        detail: {
          id: this.id,
          validate: this.validate.bind(this),
          getValue: () => this.checked,
          element: this,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  public validate(allValues: any = {}): string {
    if (!this.rules) return "";

    
    let error = "";
    if (this.rules.includes("required") && !this.checked) {
      error = "This field is required";
    } else {
      
      error = validate(this.checked, this.rules, allValues);
    }

    this._internalErrorMessage = error;
    this.requestUpdate();
    return error;
  }

  private handleChange(e: Event) {
    const target = e.target as HTMLInputElement;
    this.checked = target.checked;
    this.indeterminate = false; 

    this.dispatchEvent(
      new CustomEvent("change", {
        detail: { checked: this.checked, value: this.value },
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleFocus() {
    this._focused = true;
  }

  private handleBlur() {
    this._focused = false;
  }

  private get isRequired(): boolean {
    return this.rules.includes("required");
  }

  render() {
    const hasError = !!(this._internalErrorMessage || this.errorMessage);
    const errorMsg = this._internalErrorMessage || this.errorMessage;

    const checkboxClasses = {
      checkbox: true,
      [`checkbox--${this.size}`]: true,
      "checkbox--focused": this._focused,
      "checkbox--disabled": this.disabled,
      "checkbox--error": hasError,
    };

    return html`
      <div class="checkbox-container">
        <label class="checkbox-wrapper">
          <input
            type="checkbox"
            id=${this.id}
            name=${this.name}
            class="checkbox-input"
            .checked=${this.checked}
            .indeterminate=${this.indeterminate}
            .value=${this.value}
            ?disabled=${this.disabled}
            @change=${this.handleChange}
            @focus=${this.handleFocus}
            @blur=${this.handleBlur}
          />
          <div class=${classMap(checkboxClasses)}>
            ${this.indeterminate
              ? html`
                  <svg
                    xmlns="http:
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                `
              : this.checked
              ? html`
                  <svg
                    xmlns="http:
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                `
              : ""}
          </div>
          ${this.label
            ? html`<span class="checkbox-label">
                ${this.label}
                ${this.isRequired ? html`<span class="required">*</span>` : ""}
              </span>`
            : ""}
        </label>
        ${errorMsg ? html`<div class="error-message">${errorMsg}</div>` : ""}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ui-checkbox": UiCheckbox;
  }
}

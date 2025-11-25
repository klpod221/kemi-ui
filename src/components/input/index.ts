import { LitElement, html, css, unsafeCSS } from "lit";
import { customElement, property, state, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import styles from "./main.scss?inline";
import { validate } from "../../utils/validators";

@customElement("ui-input")
export class UiInput extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  @property({ type: String }) id = `input-${Math.random()
    .toString(36)
    .substr(2, 9)}`;
  @property({ type: String }) value = "";
  @property({ type: String }) type:
    | "text"
    | "password"
    | "email"
    | "number"
    | "tel"
    | "url"
    | "search" = "text";
  @property({ type: String }) label = "";
  @property({ type: String }) placeholder = "";
  @property({ type: String }) rules = "";
  @property({ type: String }) helperText = "";
  @property({ type: String }) errorMessage = "";
  @property({ type: String }) size: "sm" | "md" | "lg" = "md";
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) readonly = false;
  @property({ type: String }) autocomplete = "off";
  @property({ type: Boolean }) autofocus = false;

  @state() private _touched = false;
  @state() private _internalErrorMessage = "";
  @state() private _isPasswordVisible = false;
  @state() private _hasLeftIcon = false;
  @state() private _hasRightIcon = false;

  @query("input") inputElement!: HTMLInputElement;

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
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.dispatchEvent(
      new CustomEvent("ui-form-unregister", {
        detail: { id: this.id },
        bubbles: true,
        composed: true,
      })
    );
  }

  public validate(allValues: any = {}): string {
    if (!this.rules) return "";

    const error = validate(this.value, this.rules, allValues);
    this._internalErrorMessage = error;
    this.requestUpdate(); 
    return error;
  }

  public markTouchedAndValidate(allValues: any = {}): string {
    this._touched = true;
    return this.validate(allValues);
  }

  private get isRequired(): boolean {
    return this.rules.includes("required");
  }

  private handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    this.value = target.value;
    this.dispatchEvent(new CustomEvent("input", { detail: this.value })); 

    if (this._touched) {
      const form = this.closest("ui-form");
      if (form) {
        this.dispatchEvent(
          new CustomEvent("ui-input-validate", {
            bubbles: true,
            composed: true,
            detail: { id: this.id },
          })
        );
      } else {
        this.validate({});
      }
    }
  }

  private handleBlur() {
    this._touched = true;
    const form = this.closest("ui-form");
    if (form) {
      this.dispatchEvent(
        new CustomEvent("ui-input-validate", {
          bubbles: true,
          composed: true,
          detail: { id: this.id },
        })
      );
    } else {
      this.validate({});
    }
    this.dispatchEvent(new CustomEvent("blur"));
  }

  private handleFocus() {
    this.dispatchEvent(new CustomEvent("focus"));
  }

  private handleKeydown(e: KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      const form = this.closest("ui-form");
      if (form) {
        e.preventDefault();
        
        const submitButton = form.querySelector(
          'ui-button[type="submit"]'
        ) as any;
        if (submitButton) {
          submitButton.click();
        }
      }
    }
  }

  private togglePasswordVisibility() {
    this._isPasswordVisible = !this._isPasswordVisible;
    
    requestAnimationFrame(() => {
      this.inputElement?.focus();
    });
  }

  private incrementNumber() {
    if (this.type !== "number" || this.disabled || this.readonly) return;
    const step = parseFloat(this.inputElement.step) || 1;
    const currentValue = parseFloat(this.value) || 0;
    const newValue = currentValue + step;

    
    if (this.inputElement.max && newValue > parseFloat(this.inputElement.max))
      return;

    this.value = newValue.toString();
    this.handleInput({ target: { value: this.value } } as any);
  }

  private decrementNumber() {
    if (this.type !== "number" || this.disabled || this.readonly) return;
    const step = parseFloat(this.inputElement.step) || 1;
    const currentValue = parseFloat(this.value) || 0;
    const newValue = currentValue - step;

    
    if (this.inputElement.min && newValue < parseFloat(this.inputElement.min))
      return;

    this.value = newValue.toString();
    this.handleInput({ target: { value: this.value } } as any);
  }

  private handleLeftIconSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    this._hasLeftIcon = slot.assignedNodes({ flatten: true }).length > 0;
  }

  private handleRightIconSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    this._hasRightIcon = slot.assignedNodes({ flatten: true }).length > 0;
  }

  render() {
    const isPassword = this.type === "password";
    const inputType = isPassword
      ? this._isPasswordVisible
        ? "text"
        : "password"
      : this.type;

    const displayError = this.errorMessage || this._internalErrorMessage;

    const inputClasses = {
      input: true,
      [`input--${this.size}`]: true,
      "input--has-left-icon": this._hasLeftIcon,
      "input--has-right-icon": this._hasRightIcon || isPassword,
      "input--error": !!displayError,
    };

    return html`
      <div class="input-wrapper">
        ${this.label
          ? html`<label class="label" for=${this.id}>
              ${this.label}
              ${this.isRequired ? html`<span class="required">*</span>` : ""}
            </label>`
          : ""}

        <div class="input-container">
          <!-- Left Icon -->
          <div class="icon-left">
            <slot
              name="icon-left"
              @slotchange=${this.handleLeftIconSlotChange}
            ></slot>
          </div>

          <input
            id=${this.id}
            class=${classMap(inputClasses)}
            type=${inputType}
            .value=${this.value}
            placeholder=${this.placeholder}
            ?disabled=${this.disabled}
            ?readonly=${this.readonly}
            autocomplete=${ifDefined(this.autocomplete)}
            ?autofocus=${this.autofocus}
            @input=${this.handleInput}
            @blur=${this.handleBlur}
            @focus=${this.handleFocus}
            @keydown=${this.handleKeydown}
          />

          <!-- Right Icon / Password Toggle / Number Controls -->
          <div class="icon-right">
            ${isPassword
              ? html`
                  <button
                    type="button"
                    class="password-toggle"
                    @click=${this.togglePasswordVisibility}
                    tabindex="-1"
                  >
                    ${this._isPasswordVisible
                      ? html`<svg
                          xmlns="http:
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                          <path
                            d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
                          />
                          <path
                            d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
                          />
                          <line x1="2" y1="2" x2="22" y2="22" />
                        </svg>`
                      : html`<svg
                          xmlns="http:
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path
                            d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
                          />
                          <circle cx="12" cy="12" r="3" />
                        </svg>`}
                  </button>
                `
              : this.type === "number"
              ? html`
                  <div class="number-controls">
                    <button
                      type="button"
                      class="number-btn number-btn-up"
                      @click=${this.incrementNumber}
                      ?disabled=${this.disabled || this.readonly}
                      tabindex="-1"
                    >
                      <svg
                        xmlns="http:
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <polyline points="18 15 12 9 6 15" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      class="number-btn number-btn-down"
                      @click=${this.decrementNumber}
                      ?disabled=${this.disabled || this.readonly}
                      tabindex="-1"
                    >
                      <svg
                        xmlns="http:
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>
                  </div>
                `
              : html`
                  <slot
                    name="icon-right"
                    @slotchange=${this.handleRightIconSlotChange}
                  ></slot>
                `}
          </div>
        </div>

        <!-- Helper Text / Error Message -->
        ${this._internalErrorMessage || this.errorMessage
          ? html`<div class="error-message">
              ${this._internalErrorMessage || this.errorMessage}
            </div>`
          : this.helperText
          ? html`<div class="helper-text">${this.helperText}</div>`
          : ""}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ui-input": UiInput;
  }
}

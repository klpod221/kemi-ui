import { LitElement, html, css, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./main.scss?inline";
import { validate } from "../../utils/validators";

@customElement("ui-taginput")
export class UiTagInput extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  @property({ type: String }) id = `taginput-${Math.random()
    .toString(36)
    .substr(2, 9)}`;
  @property({ type: Array }) value: string[] = [];
  @property({ type: String }) label = "";
  @property({ type: String }) placeholder = "Add tags...";
  @property({ type: Number }) maxTags = 0;
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) helperText = "";
  @property({ type: String }) rules = "";
  @property({ type: String }) errorMessage = "";
  @state() private _internalErrorMessage = "";

  @state() private _inputValue = "";
  @state() private _focused = false;

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

  public validate(allValues: any = {}): string {
    if (!this.rules) return "";

    
    
    
    

    let error = "";
    if (this.rules.includes("required") && this.value.length === 0) {
      
      
      
      error = "This field is required";
    } else {
      
      
      
      error = validate(this.value, this.rules, allValues);
    }

    this._internalErrorMessage = error;
    this.requestUpdate();
    return error;
  }

  private addTag(tag: string) {
    const trimmedTag = tag.trim();
    if (!trimmedTag) return;
    if (this.value.includes(trimmedTag)) return;
    if (this.maxTags > 0 && this.value.length >= this.maxTags) return;

    this.value = [...this.value, trimmedTag];
    this._inputValue = "";

    this.dispatchEvent(
      new CustomEvent("change", {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      })
    );
  }

  private removeTag(index: number) {
    this.value = this.value.filter((_, i) => i !== index);

    this.dispatchEvent(
      new CustomEvent("change", {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    this._inputValue = target.value;
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();
      this.addTag(this._inputValue);
    } else if (
      e.key === "Backspace" &&
      !this._inputValue &&
      this.value.length > 0
    ) {
      this.removeTag(this.value.length - 1);
    }
  }

  private get isRequired(): boolean {
    return this.rules.includes("required");
  }

  render() {
    const canAddMore = this.maxTags === 0 || this.value.length < this.maxTags;
    const hasError = !!(this._internalErrorMessage || this.errorMessage);
    const errorMsg = this._internalErrorMessage || this.errorMessage;

    return html`
      <div class="taginput-wrapper">
        ${this.label
          ? html`<label for=${this.id} class="label">
              ${this.label}
              ${this.isRequired ? html`<span class="required">*</span>` : ""}
            </label>`
          : ""}

        <div
          class="taginput-container ${this._focused
            ? "taginput-container--focused"
            : ""} ${hasError ? "taginput-container--error" : ""}"
          @click=${() => this.shadowRoot?.querySelector("input")?.focus()}
        >
          ${this.value.map(
            (tag, index) => html`
              <span class="tag">
                ${tag}
                <button
                  type="button"
                  class="tag-remove"
                  @click=${(e: Event) => {
                    e.stopPropagation();
                    this.removeTag(index);
                  }}
                  ?disabled=${this.disabled}
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
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </span>
            `
          )}
          ${canAddMore
            ? html`
                <input
                  type="text"
                  class="taginput-input"
                  .value=${this._inputValue}
                  placeholder=${this.value.length === 0 ? this.placeholder : ""}
                  ?disabled=${this.disabled}
                  @input=${this.handleInput}
                  @keydown=${this.handleKeyDown}
                  @focus=${() => (this._focused = true)}
                  @blur=${() => (this._focused = false)}
                />
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
    "ui-taginput": UiTagInput;
  }
}

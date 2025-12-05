import { LitElement, html, css, unsafeCSS } from "lit";
import { customElement, property, state, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import styles from "./main.scss?inline";
import { validate } from "../../utils/validators";

@customElement("ui-textarea")
export class UiTextarea extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  @property({ type: String }) id = `textarea-${Math.random()
    .toString(36)
    .substr(2, 9)}`;
  @property({ type: String }) value = "";
  @property({ type: String }) label = "";
  @property({ type: String }) placeholder = "";
  @property({ type: String }) rules = "";
  @property({ type: String }) helperText = "";
  @property({ type: String }) errorMessage = "";
  @property({ type: String }) rows = "3";
  @property({ type: String }) maxLength = "";
  @property({ type: Boolean }) showCounter = false;
  @property({ type: Boolean }) autoResize = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) readonly = false;
  @property({ type: String }) resize:
    | "none"
    | "vertical"
    | "horizontal"
    | "both" = "vertical";

  @state() private _touched = false;
  @state() private _internalErrorMessage = "";

  @query("textarea") textareaElement!: HTMLTextAreaElement;

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

  private validate(allValues: { [key: string]: unknown }): string {
    if (!this.rules) return "";
    const error = validate(this.value, this.rules, allValues);
    this._internalErrorMessage = error;
    this.requestUpdate();
    return error;
  }

  public markTouchedAndValidate(
    allValues: { [key: string]: unknown } = {}
  ): string {
    this._touched = true;
    return this.validate(allValues);
  }

  private get isRequired(): boolean {
    return this.rules.includes("required");
  }

  private handleInput(e: Event) {
    const target = e.target as HTMLTextAreaElement;
    this.value = target.value;

    if (this.autoResize) {
      this.adjustHeight();
    }

    if (this._touched) {
      this.dispatchEvent(
        new CustomEvent("ui-input-validate", {
          detail: { id: this.id },
          bubbles: true,
          composed: true,
        })
      );
    }

    this.dispatchEvent(
      new CustomEvent("input", {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      })
    );
  }

  private handleBlur() {
    this._touched = true;
    this.dispatchEvent(
      new CustomEvent("ui-input-validate", {
        detail: { id: this.id },
        bubbles: true,
        composed: true,
      })
    );
    this.dispatchEvent(new CustomEvent("blur"));
  }

  private handleFocus() {
    this.dispatchEvent(new CustomEvent("focus"));
  }

  private adjustHeight() {
    if (!this.autoResize || !this.textareaElement) return;

    this.textareaElement.style.height = "auto";
    this.textareaElement.style.height = `${this.textareaElement.scrollHeight}px`;
  }

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has("value") && this.autoResize) {
      this.adjustHeight();
    }
  }

  render() {
    const hasError = !!(this._internalErrorMessage || this.errorMessage);
    const currentLength = this.value.length;
    const maxLen = this.maxLength ? parseInt(this.maxLength) : 0;

    const textareaClasses = {
      textarea: true,
      "textarea--error": hasError,
    };

    return html`
      <div class="textarea-wrapper">
        ${this.label
          ? html`
              <label for=${this.id} class="label">
                ${this.label}
                ${this.isRequired ? html`<span class="required">*</span>` : ""}
              </label>
            `
          : ""}

        <textarea
          id=${this.id}
          class=${classMap(textareaClasses)}
          .value=${this.value}
          placeholder=${this.placeholder}
          rows=${this.rows}
          maxlength=${this.maxLength || undefined}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
          style="resize: ${this.resize};"
          @input=${this.handleInput}
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
        ></textarea>

        <div class="textarea-footer">
          <!-- Helper Text / Error Message -->
          <div class="message-wrapper">
            ${this._internalErrorMessage || this.errorMessage
              ? html`<div class="error-message">
                  ${this._internalErrorMessage || this.errorMessage}
                </div>`
              : this.helperText
              ? html`<div class="helper-text">${this.helperText}</div>`
              : ""}
          </div>

          <!-- Counter -->
          ${this.showCounter && maxLen > 0
            ? html` <div class="counter">${currentLength} / ${maxLen}</div> `
            : ""}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ui-textarea": UiTextarea;
  }
}

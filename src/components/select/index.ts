import { LitElement, html, css, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
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
  @property({ type: String }) helperText = "";
  @property({ type: String }) errorMessage = "";
  @property({ type: String }) rules = "";

  @state() private _internalErrorMessage = "";
  @state() private _slottedOptions: SelectOption[] = [];

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

  private handleSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    const nodes = slot.assignedElements({ flatten: true });
    
    const options: SelectOption[] = [];
    nodes.forEach((node) => {
      if (node.tagName === "OPTION") {
        const opt = node as HTMLOptionElement;
        options.push({
          label: opt.text,
          value: opt.value,
          disabled: opt.disabled,
        });
      }
    });
    this._slottedOptions = options;
  }

  private get allOptions() {
    return [...this.options, ...this._slottedOptions];
  }

  private handleChange(e: Event) {
    const target = e.target as HTMLSelectElement;
    this.value = target.value;
    this.dispatchEvent(
      new CustomEvent("change", {
        detail: { value: this.value },
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

  private get isRequired(): boolean {
    return this.rules.includes("required");
  }

  render() {
    const hasError = !!(this._internalErrorMessage || this.errorMessage);
    const errorMsg = this._internalErrorMessage || this.errorMessage;

    const selectClasses = {
      "select-input": true,
      "select-input--error": hasError,
      "select-input--disabled": this.disabled,
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
          <select
            id=${this.id}
            class=${classMap(selectClasses)}
            .value=${this.value}
            ?disabled=${this.disabled}
            @change=${this.handleChange}
          >
            <option value="" disabled selected ?hidden=${!!this.value}>
              ${this.placeholder}
            </option>
            ${this.allOptions.map(
              (opt) => html`
                <option
                  value=${opt.value}
                  ?disabled=${opt.disabled}
                  ?selected=${opt.value === this.value}
                >
                  ${opt.label}
                </option>
              `
            )}
          </select>
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
          
          <!-- Hidden slot to capture light DOM options -->
          <div style="display: none;">
            <slot @slotchange=${this.handleSlotChange}></slot>
          </div>
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

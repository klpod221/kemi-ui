import { LitElement, html, css, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import styles from "./main.scss?inline";
import { validate } from "../../utils/validators";

@customElement("ui-radio")
export class UiRadio extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  @property({ type: String }) id = `radio-${Math.random()
    .toString(36)
    .substr(2, 9)}`;
  @property({ type: Boolean }) checked = false;
  @property({ type: String }) value = "";
  @property({ type: String }) name = "";
  @property({ type: String }) label = "";
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) size: "sm" | "md" | "lg" = "md";

  @state() private _focused = false;
  @property({ type: Array }) options: { label: string; value: string }[] = [];
  @property({ type: String }) rules = "";
  @property({ type: String }) errorMessage = "";
  @state() private _internalErrorMessage = "";

  connectedCallback() {
    super.connectedCallback();
    
    if (this.name) {
      this.dispatchEvent(
        new CustomEvent("ui-form-register", {
          detail: {
            id: this.name,
            validate: this.validate.bind(this),
            getValue: () => this.value,
            element: this,
          },
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  public validate(allValues: any = {}): string {
    if (!this.rules) return "";

    
    
    
    const error = validate(this.value, this.rules, allValues);
    this._internalErrorMessage = error;
    this.requestUpdate();
    return error;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.name) {
      this.dispatchEvent(
        new CustomEvent("ui-form-unregister", {
          detail: { id: this.name },
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  private handleChange(e: Event) {
    const target = e.target as HTMLInputElement;

    
    if (target.checked && this.name) {
      const radios = Array.from(
        document.querySelectorAll(`ui-radio[name="${this.name}"]`)
      ) as UiRadio[];
      radios.forEach((radio) => {
        if (radio !== this) {
          radio.checked = false;
        }
      });
    }

    this.checked = target.checked;

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

  private handleGroupChange(e: Event, val: string) {
    e.stopPropagation(); 
    this.value = val;
    this.dispatchEvent(
      new CustomEvent("change", {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      })
    );

    
    const form = this.closest("ui-form");
    if (form) {
      this.dispatchEvent(
        new CustomEvent("ui-input-validate", {
          detail: { id: this.name },
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  private get isRequired(): boolean {
    return this.rules.includes("required");
  }

  render() {
    const errorMsg = this._internalErrorMessage || this.errorMessage;

    
    if (this.options.length > 0) {
      return html`
        <div class="radio-group-container">
          ${this.label
            ? html`<label class="group-label">
                ${this.label}
                ${this.isRequired ? html`<span class="required">*</span>` : ""}
              </label>`
            : ""}
          <div class="radio-group">
            ${this.options.map(
              (option) => html`
                <label class="radio-wrapper">
                  <input
                    type="radio"
                    name=${this.name || this.id}
                    class="radio-input"
                    .value=${option.value}
                    .checked=${this.value === option.value}
                    ?disabled=${this.disabled}
                    @change=${this.handleGroupChange}
                    @focus=${this.handleFocus}
                    @blur=${this.handleBlur}
                  />
                  <div
                    class="radio ${this.value === option.value
                      ? "radio--checked"
                      : ""} radio--${this.size} ${this.disabled
                      ? "radio--disabled"
                      : ""}"
                  >
                    <div class="radio-inner"></div>
                  </div>
                  <span class="radio-label">${option.label}</span>
                </label>
              `
            )}
          </div>
          ${errorMsg ? html`<div class="error-message">${errorMsg}</div>` : ""}
        </div>
      `;
    }

    
    const radioClasses = {
      radio: true,
      [`radio--${this.size}`]: true,
      "radio--focused": this._focused,
      "radio--disabled": this.disabled,
    };

    return html`
      <label class="radio-wrapper">
        <input
          type="radio"
          id=${this.id}
          class="radio-input"
          .checked=${this.checked}
          .value=${this.value}
          name=${this.name}
          ?disabled=${this.disabled}
          @change=${this.handleChange}
          @focus=${this.handleFocus}
          @blur=${this.handleBlur}
        />
        <div class=${classMap(radioClasses)}>
          <div class="radio-inner"></div>
        </div>
        ${this.label
          ? html`<span class="radio-label">${this.label}</span>`
          : ""}
      </label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ui-radio": UiRadio;
  }
}

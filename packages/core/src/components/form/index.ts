import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";

interface FormField {
  id: string;
  validate: (allValues: any) => string;
  getValue: () => any;
  element?: any; 
}

@customElement("ui-form")
export class UiForm extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `;

  private fields = new Map<string, FormField>();

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener(
      "ui-form-register",
      this.handleRegister as EventListener
    );
    this.addEventListener(
      "ui-form-unregister",
      this.handleUnregister as EventListener
    );
    this.addEventListener(
      "ui-input-validate",
      this.handleValidate as EventListener
    );

    
    this.addEventListener("click", this.handleClick as EventListener);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener(
      "ui-form-register",
      this.handleRegister as EventListener
    );
    this.removeEventListener(
      "ui-form-unregister",
      this.handleUnregister as EventListener
    );
    this.removeEventListener(
      "ui-input-validate",
      this.handleValidate as EventListener
    );
    this.removeEventListener("click", this.handleClick as EventListener);
  }

  private handleClick(e: Event) {
    const target = e.target as any;
    
    if (
      target &&
      (target.type === "submit" || target.tagName === "UI-BUTTON")
    ) {
      const button = target.tagName === "UI-BUTTON" ? target : null;
      if (button && button.type === "submit") {
        e.preventDefault();
        this.handleSubmit(e);
      }
    }
  }

  private handleUnregister(e: CustomEvent) {
    e.stopPropagation();
    const { id } = e.detail;
    this.fields.delete(id);
  }

  private handleValidate(e: CustomEvent) {
    e.stopPropagation();
    const { id } = e.detail;
    const field = this.fields.get(id);
    if (field) {
      const allValues = this.getAllValues();
      field.validate(allValues);
    }
  }

  private handleRegister(e: CustomEvent) {
    e.stopPropagation();
    const { id, validate, getValue, element } = e.detail;
    this.fields.set(id, { id, validate, getValue, element });
  }

  public validate(): boolean {
    const allValues = this.getAllValues();
    let isValid = true;

    
    this.fields.forEach((field) => {
      if (
        field.element &&
        typeof field.element.markTouchedAndValidate === "function"
      ) {
        const error = field.element.markTouchedAndValidate(allValues);
        if (error) {
          isValid = false;
        }
      } else {
        
        const error = field.validate(allValues);
        if (error) {
          isValid = false;
        }
      }
    });

    return isValid;
  }

  public getAllValues(): Record<string, any> {
    const values: Record<string, any> = {};
    this.fields.forEach((field, id) => {
      values[id] = field.getValue();
    });
    return values;
  }

  private handleSubmit(e: Event) {
    e.preventDefault();
    if (this.validate()) {
      this.dispatchEvent(
        new CustomEvent("submit", {
          detail: this.getAllValues(),
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  render() {
    return html`
      <form @submit=${(e: Event) => this.handleSubmit(e)}>
        <slot></slot>
      </form>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ui-form": UiForm;
  }
}

import "./message-item";
import { UiMessageItem, type MessageType } from "./message-item";

class MessageManager {
  private container: HTMLDivElement | null = null;

  private getContainer() {
    if (!this.container) {
      this.container = document.createElement("div");
      this.container.style.cssText = `
        position: fixed;
        top: var(--spacing-2xl);
        left: 50%;
        transform: translateX(-50%);
        z-index: 9999;
        display: flex;
        flex-direction: column;
        align-items: center;
        pointer-events: none;
      `;
      document.body.appendChild(this.container);
    }
    return this.container;
  }

  open(type: MessageType, content: string, duration: number = 3000) {
    const container = this.getContainer();
    const messageEl = document.createElement(
      "ui-message-item"
    ) as UiMessageItem;

    messageEl.type = type;
    messageEl.content = content;
    messageEl.duration = duration;

    messageEl.addEventListener("close", () => {
      messageEl.style.opacity = "0";
      messageEl.style.transform = "translateY(-20px)";
      messageEl.style.transition = "all 0.3s ease";

      setTimeout(() => {
        if (container.contains(messageEl)) {
          container.removeChild(messageEl);
        }
        if (container.childNodes.length === 0) {
          document.body.removeChild(container);
          this.container = null;
        }
      }, 300);
    });

    container.appendChild(messageEl);
  }

  success(content: string, duration?: number) {
    this.open("success", content, duration);
  }

  error(content: string, duration?: number) {
    this.open("error", content, duration);
  }

  info(content: string, duration?: number) {
    this.open("info", content, duration);
  }

  warning(content: string, duration?: number) {
    this.open("warning", content, duration);
  }

  loading(content: string, duration: number = 0) {
    this.open("loading", content, duration);
  }
}

export const message = new MessageManager();

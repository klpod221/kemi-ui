import { message as kemiMessage } from '@klpod221/kemi-ui'

export function useMessage() {
  return {
    success: (text: string, duration?: number) => {
      return kemiMessage.success(text, duration)
    },
    error: (text: string, duration?: number) => {
      return kemiMessage.error(text, duration)
    },
    warning: (text: string, duration?: number) => {
      return kemiMessage.warning(text, duration)
    },
    info: (text: string, duration?: number) => {
      return kemiMessage.info(text, duration)
    }
  }
}

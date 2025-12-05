import { modal } from '@klpod221/kemi-ui'

export function useModal() {
  return {
    /**
     * Open a modal by its ID
     * @param id - The ID of the ui-modal element in the DOM
     * @param props - Optional props to pass to the modal
     */
    open: (id: string, props?: Record<string, any>) => {
      return modal.open(id, props)
    },
    /**
     * Close a modal by its ID
     * @param id - The ID of the ui-modal element to close
     */
    close: (id: string) => {
      modal.close(id)
    },
    /**
     * Close all open modals
     */
    closeAll: () => {
      modal.closeAll()
    }
  }
}

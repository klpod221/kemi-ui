import { drawer } from '@klpod221/kemi-ui'

export function useDrawer() {
  return {
    /**
     * Open a drawer by its ID
     * @param id - The ID of the ui-drawer element in the DOM
     * @param props - Optional props to pass to the drawer
     */
    open: (id: string, props?: Record<string, any>) => {
      return drawer.open(id, props)
    },
    /**
     * Close a drawer by its ID
     * @param id - The ID of the ui-drawer element to close
     */
    close: (id: string) => {
      drawer.close(id)
    },
    /**
     * Close all open drawers
     */
    closeAll: () => {
      drawer.closeAll()
    }
  }
}

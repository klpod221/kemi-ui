// Import core kemi-ui library to register web components
import '@klpod221/kemi-ui'

// Export all components
export { default as KButton } from './components/KButton.vue'
export { default as KInput } from './components/KInput.vue'
export { default as KTextarea } from './components/KTextarea.vue'
export { default as KSelect } from './components/KSelect.vue'
export { default as KCheckbox } from './components/KCheckbox.vue'
export { default as KCheckboxGroup } from './components/KCheckboxGroup.vue'
export { default as KRadio } from './components/KRadio.vue'
export { default as KRadioGroup } from './components/KRadioGroup.vue'
export { default as KSwitch } from './components/KSwitch.vue'
export { default as KSlider } from './components/KSlider.vue'
export { default as KColorPicker } from './components/KColorPicker.vue'
export { default as KTagInput } from './components/KTagInput.vue'
export { default as KDatepicker } from './components/KDatepicker.vue'
export { default as KCard } from './components/KCard.vue'
export { default as KForm } from './components/KForm.vue'
export { default as KBadge } from './components/KBadge.vue'
export { default as KTag } from './components/KTag.vue'
export { default as KAvatar } from './components/KAvatar.vue'
export { default as KKeyboardBadge } from './components/KKeyboardBadge.vue'
export { default as KSkeleton } from './components/KSkeleton.vue'
export { default as KEmpty } from './components/KEmpty.vue'
export { default as KSpin } from './components/KSpin.vue'
export { default as KProgress } from './components/KProgress.vue'
export { default as KBreadcrumb } from './components/KBreadcrumb.vue'
export { default as KPagination } from './components/KPagination.vue'
export { default as KDropdown } from './components/KDropdown.vue'
export { default as KPopover } from './components/KPopover.vue'
export { default as KTooltip } from './components/KTooltip.vue'
export { default as KTable } from './components/KTable.vue'
export { default as KCodeDisplay } from './components/KCodeDisplay.vue'
export { default as KCodeEditor } from './components/KCodeEditor.vue'

// Export composables
export { useMessage } from './composables/useMessage'
export { useModal } from './composables/useModal'
export { useDrawer } from './composables/useDrawer'

// Export utilities
export * from './utils/validators'

// Export types
export * from './types'

// Export plugin
export { default as KemiUI } from './plugin'
export { default } from './plugin'

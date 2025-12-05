import type { App, Plugin } from 'vue'
import KButton from './components/KButton.vue'
import KInput from './components/KInput.vue'
import KTextarea from './components/KTextarea.vue'
import KSelect from './components/KSelect.vue'
import KCheckbox from './components/KCheckbox.vue'
import KCheckboxGroup from './components/KCheckboxGroup.vue'
import KRadio from './components/KRadio.vue'
import KRadioGroup from './components/KRadioGroup.vue'
import KSwitch from './components/KSwitch.vue'
import KSlider from './components/KSlider.vue'
import KColorPicker from './components/KColorPicker.vue'
import KTagInput from './components/KTagInput.vue'
import KDatepicker from './components/KDatepicker.vue'
import KCard from './components/KCard.vue'
import KForm from './components/KForm.vue'
import KBadge from './components/KBadge.vue'
import KTag from './components/KTag.vue'
import KAvatar from './components/KAvatar.vue'
import KKeyboardBadge from './components/KKeyboardBadge.vue'
import KSkeleton from './components/KSkeleton.vue'
import KEmpty from './components/KEmpty.vue'
import KSpin from './components/KSpin.vue'
import KProgress from './components/KProgress.vue'
import KBreadcrumb from './components/KBreadcrumb.vue'
import KPagination from './components/KPagination.vue'
import KDropdown from './components/KDropdown.vue'
import KPopover from './components/KPopover.vue'
import KTooltip from './components/KTooltip.vue'
import KTable from './components/KTable.vue'
import KCodeDisplay from './components/KCodeDisplay.vue'
import KCodeEditor from './components/KCodeEditor.vue'

const components = {
  KButton,
  KInput,
  KTextarea,
  KSelect,
  KCheckbox,
  KCheckboxGroup,
  KRadio,
  KRadioGroup,
  KSwitch,
  KSlider,
  KColorPicker,
  KTagInput,
  KDatepicker,
  KCard,
  KForm,
  KBadge,
  KTag,
  KAvatar,
  KKeyboardBadge,
  KSkeleton,
  KEmpty,
  KSpin,
  KProgress,
  KBreadcrumb,
  KPagination,
  KDropdown,
  KPopover,
  KTooltip,
  KTable,
  KCodeDisplay,
  KCodeEditor
}

const KemiUI: Plugin = {
  install(app: App) {
    // Register all components globally
    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component)
    })
  }
}

export default KemiUI

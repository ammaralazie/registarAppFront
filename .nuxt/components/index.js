export { default as Loading } from '../..\\components\\loading.vue'
export { default as SideBarList } from '../..\\components\\SideBarList.vue'
export { default as SideBarLogo } from '../..\\components\\SideBarLogo.vue'
export { default as ProfileTabsFive } from '../..\\components\\ProfileTabs\\Five.vue'
export { default as ProfileTabsFour } from '../..\\components\\ProfileTabs\\Four.vue'
export { default as ProfileTabsOne } from '../..\\components\\ProfileTabs\\One.vue'
export { default as ProfileTabsSaven } from '../..\\components\\ProfileTabs\\Saven.vue'
export { default as ProfileTabsSix } from '../..\\components\\ProfileTabs\\Six.vue'
export { default as ProfileTabsThree } from '../..\\components\\ProfileTabs\\Three.vue'
export { default as ProfileTabsTwo } from '../..\\components\\ProfileTabs\\Two.vue'
export { default as ReportsOrders } from '../..\\components\\Reports\\Orders.vue'
export { default as ReportsStudents } from '../..\\components\\Reports\\Students.vue'
export { default as StepperAddressStudentInfo } from '../..\\components\\Stepper\\AddressStudentInfo.vue'
export { default as StepperBasicStudentInfo } from '../..\\components\\Stepper\\BasicStudentInfo.vue'
export { default as StepperResponsibleStudentInfo } from '../..\\components\\Stepper\\ResponsibleStudentInfo.vue'
export { default as StepperSchollStudentInfo } from '../..\\components\\Stepper\\SchollStudentInfo.vue'
export { default as StepperUploadAttachments } from '../..\\components\\Stepper\\UploadAttachments.vue'
export { default as ProfileTabsDialogsCreate } from '../..\\components\\ProfileTabs\\Dialogs\\Create.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}

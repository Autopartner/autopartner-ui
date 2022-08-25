<script setup lang="ts">
const emit = defineEmits(['close'])

</script>

<template> <i class="lnir lnir-menu" aria-hidden="true"></i>
  <div class="sidebar-panel is-generic">
    <div class="subpanel-header">
      <h3 class="no-mb">Dashboards</h3>
      <div class="panel-close" tabindex="0" @keydown.space.prevent="emit('close')" @click="emit('close')">
        <i aria-hidden="true" class="iconify" data-icon="feather:x"></i>
      </div>
    </div>
    <div class="inner" data-simplebar>
      <ul>
        <SubSidebarLi :route_name="'app'" :icon="'lnil lnil-home pr-2'" :text="'Company Name'" />
        <SubSidebarLi :route_name="'app'" :icon="'lnil lnil-home pr-2'" :text="'Orders'" />

        <VCollapseLinks :open='false'>
          <template #header>
            <li class="dropLiPrimary">Warehouse</li>
            <i aria-hidden="true" class="iconify" data-icon="feather:chevron-right" />
          </template>
          <SubSidebarLi :route_name="'app'" :icon="'lnil lnil-home pr-2'" :text="'Suppliers'" />
          <SubSidebarLi :route_name="'app'" :icon="'lnil lnil-home pr-2'" :text="'Supplies'" />
          <SubSidebarLi :route_name="'app'" :icon="'lnil lnil-home pr-2'" :text="'Products'" />
        </VCollapseLinks>

        <VCollapseLinks :open='false'>
          <template #header>
            <li class="dropLiPrimary">Dictionaries </li>
            <i aria-hidden="true" class="iconify" data-icon="feather:chevron-right" />
          </template>
          <SubSidebarLi :route_name="'app'" :icon="'lnil lnil-home pr-2'" :text="'Clients'" />
          <SubSidebarLi :route_name="'app'" :icon="'lnil lnil-home pr-2'" :text="'Users'" />
          <SubSidebarLi :route_name="'app'" :icon="'lnil lnil-home pr-2'" :text="'Cars'" />
          <SubSidebarLi :route_name="'app'" :icon="'lnil lnil-home pr-2'" :text="'Works'" />
        </VCollapseLinks>

      </ul>
    </div>
  </div>
</template>

<style lang="scss">
@import '../../scss/layout/sidebar-panel';

.dropLiPrimary{
  color: var(--primary);
}
</style>

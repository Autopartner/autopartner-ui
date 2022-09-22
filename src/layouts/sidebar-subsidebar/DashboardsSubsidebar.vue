<script setup lang="ts">
const openSubsidebarLinks = ref('')
const emit = defineEmits(['close'])
</script>

<template>
  <div class="sidebar-panel is-generic">
    <div class="subpanel-header">
      <h3 class="no-mb">AutoPartner</h3>
      <div
        class="panel-close"
        tabindex="0"
        @keydown.space.prevent="emit('close')"
        @click="emit('close')"
      >
        <i aria-hidden="true" class="iconify" data-icon="feather:x"></i>
      </div>
    </div>
    <div class="inner" data-simplebar>
      <ul>
        <li>
          <RouterLink to="app">
            <i aria-hidden="true" class="lnil lnil-book"></i>
            Orders
          </RouterLink>
        </li>

        <li class="divider"></li>

        <VCollapseLinks v-model:open="openSubsidebarLinks" collapse-id="warehouse">
          <template #header>
            Warehouse
            <i aria-hidden="true" class="iconify" data-icon="feather:chevron-right" />
          </template>

          <RouterLink to="app" class="is-submenu">
            <i aria-hidden="true" class="lnil lnil-user"></i>
            <span>Suppliers</span>
          </RouterLink>

          <RouterLink to="test-page" class="is-submenu">
            <i aria-hidden="true" class="lnil "></i>
            <span>Supplies</span>
          </RouterLink>

          <RouterLink to="app" class="is-submenu">
            <i aria-hidden="true" class="lnil"></i>
            <span>Products</span>
          </RouterLink>
        </VCollapseLinks>

        <VCollapseLinks v-model:open="openSubsidebarLinks" collapse-id="dictionaries">
          <template #header>
            Dictionaries
            <i aria-hidden="true" class="iconify" data-icon="feather:chevron-right" />
          </template>

          <RouterLink to="app" class="is-submenu">
            <i aria-hidden="true" class="lnil"></i>
            <span>Users</span>
          </RouterLink>

          <RouterLink to="app" class="is-submenu">
            <i aria-hidden="true" class="lnil"></i>
            <span>Clients</span>
          </RouterLink>

          <RouterLink to="app" class="is-submenu">
            <i aria-hidden="true" class="lnil"></i>
            <span>Cars</span>
          </RouterLink>

          <RouterLink to="app" class="is-submenu">
            <i aria-hidden="true" class="lnil"></i>
            <span>Tasks</span>
          </RouterLink>
        </VCollapseLinks>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
@import '/@src/scss/layout/sidebar-panel';
</style>

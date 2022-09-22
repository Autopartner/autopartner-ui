<template>
  <div class="mobile-subsidebar">
    <div class="inner">
      <div class="sidebar-title">
        <h3>AutoPartner</h3>
      </div>

      <ul class="submenu" data-simplebar>
        <li>
          <RouterLink to="app">
            <i aria-hidden="true" class="lnil lnil-book"></i>
            Orders
          </RouterLink>
        </li>

        <li class="divider"></li>

        <VCollapseLinks>
          <template #header>
            Warehouse
            <i aria-hidden="true" class="iconify" data-icon="feather:chevron-right" />
          </template>

          <RouterLink to="app" class="is-submenu">
            <i aria-hidden="true" class="lnil"></i>
            <span>Suppliers</span>
          </RouterLink>

          <RouterLink to="app" class="is-submenu">
            <i aria-hidden="true" class="lnil"></i>
            <span>Supplies</span>
          </RouterLink>

          <RouterLink to="app" class="is-submenu">
            <i aria-hidden="true" class="lnil"></i>
            <span>Products</span>
          </RouterLink>
        </VCollapseLinks>

        <VCollapseLinks>
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

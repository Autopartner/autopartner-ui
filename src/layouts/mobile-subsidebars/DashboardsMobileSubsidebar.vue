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
            <i class="lnir lnir-users" aria-hidden="true"></i>
            <span>Suppliers</span>
          </RouterLink>

          <RouterLink to="test-page" class="is-submenu">
            <i class="lnir lnir-cart-full" aria-hidden="true"></i>
            <span>Supplies</span>
          </RouterLink>

          <RouterLink to="app" class="is-submenu">
            <i class="lnir lnir-bricks" aria-hidden="true"></i>
            <span>Products</span>
          </RouterLink>
        </VCollapseLinks>

        <VCollapseLinks>
          <template #header>
            Dictionaries
            <i aria-hidden="true" class="iconify" data-icon="feather:chevron-right" />
          </template>

          <RouterLink to="users" class="is-submenu">
            <i class="lnir lnir-user" aria-hidden="true"></i>
            <span>Users</span>
          </RouterLink>

          <RouterLink to="clients" class="is-submenu">
            <i class="lnir lnir-users" aria-hidden="true"></i>
            <span>Clients</span>
          </RouterLink>

          <RouterLink to="app" class="is-submenu">
            <i class="lnir lnir-car-alt" aria-hidden="true"></i>
            <span>Cars</span>
          </RouterLink>

          <RouterLink to="app" class="is-submenu">
            <i class="lnir lnir-wrench" aria-hidden="true"></i>
            <span>Tasks</span>
          </RouterLink>
        </VCollapseLinks>
      </ul>
    </div>
  </div>
</template>

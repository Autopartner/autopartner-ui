<script setup lang="ts">

import {useUserStore} from "/@src/stores/users";

const page = ref(42)
const filters = ref('')
const isLoading = ref(false)

const user = useUserStore()

onMounted(async () => {
  try {
    isLoading.value = true
    await user.loadUsers()
    isLoading.value = false
  } catch (e: any) {
    console.error(e)
    isLoading.value = false
  }
})

const columns = {
  name: {
    label: 'Name',
    grow: true,
    media: true,
  },
  phone: 'Phone',
  email: 'Email',
  role: 'Role',
  actions: {
    label: 'Actions',
    align: 'end',
  },
} as const

const filteredData = computed(() => {
  if (!filters.value) {
    return user.users
  } else {
    const filterRe = new RegExp(filters.value, 'gi')
    return user.users.filter((item) => {
      return (
        item.firstName && item.firstName.match(filterRe) ||
        item.lastName && item.lastName.match(filterRe) ||
        item.phone && item.phone.match(filterRe) ||
        item.email && item.email.match(filterRe) ||
        item.authorities && item.authorities.match(filterRe)
      )
    })
  }
})

debouncedWatch(
  filters,
  () => {
    if (filters.value.length < 3) {
      return
    }

    // dataLayer and is injected via vite-plugin-radar
    if (window) {
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({
        event: 'search',
        search_term: filters.value,
      })
    }
  },
  { debounce: 300 }
)

const renderRole = (role: string) => {
  const roleMap: any = {
    'ROLE_ADMIN': {
      color: 'primary',
      name: 'owner'
    },
    'ROLE_USER': {
      color: 'blue',
      name: 'user'
    },
    'ROLE_CLIENT': {
      color: 'green',
      name: 'client'
    }
  }

  return roleMap[role]
}
</script>

<template>

  <div
    :style="[
    isLoading
      ? { position: 'absolute', height: '100%', width: '100%' }
      : { display: 'none' },
    ]"
  >
    <VLoader
      size="large"
      :active="isLoading"
      :translucent="true"
      :style="{ height: '100%' }"
    ></VLoader>
  </div>

  <div>
    <div class="list-flex-toolbar flex-list-v1">
      <VField>
        <VControl icon="feather:search">
          <input
            v-model.trim="filters"
            class="input custom-text-filter"
            placeholder="Search..."
          />
        </VControl>
      </VField>

      <VButtons>
        <VButton color="primary" icon="fas fa-plus" elevated> Add User </VButton>
      </VButtons>
    </div>

    <div class="page-content-inner">
      <div class="flex-list-wrapper flex-list-v1">
        <!--List Empty Search Placeholder -->
        <VPlaceholderPage
          v-if="!filteredData.length"
          title="We couldn't find any matching results."
          subtitle="Too bad. Looks like we couldn't find any matching results for the
          search terms you've entered. Please try different search terms or
          criteria."
          larger
        >
          <template #image>
            <img
              class="light-image"
              src="/@src/assets/illustrations/placeholders/search-4.svg"
              alt=""
            />
            <img
              class="dark-image"
              src="/@src/assets/illustrations/placeholders/search-4-dark.svg"
              alt=""
            />
          </template>
        </VPlaceholderPage>

        <VFlexTable
          v-if="filteredData.length"
          :data="filteredData"
          :columns="columns"
          compact
        >
          <template #body>
            <TransitionGroup name="list" tag="div" class="flex-list-inner">
              <!--Table item-->
              <div v-for="item in filteredData" :key="item.id" class="flex-table-item">
                <VFlexTableCell :column="{ media: true, grow: true }">
                  <div>
                    <span class="item-name dark-inverted">{{ item.firstName }} {{ item.lastName }}</span>
                  </div>
                </VFlexTableCell>
                <VFlexTableCell>
                  <span class="light-text">{{ item.phone }}</span>
                </VFlexTableCell>
                <VFlexTableCell>
                  <span class="light-text">{{ item.email }}</span>
                </VFlexTableCell>
                <VFlexTableCell>
                  <VTag
                    rounded
                    :color=renderRole(item.authorities).color
                  >
                  {{ renderRole(item.authorities).name }}
                  </VTag>
                </VFlexTableCell>
                <VFlexTableCell :column="{ align: 'end' }">
                  <FlexTableDropdown />
                </VFlexTableCell>
              </div>
            </TransitionGroup>
          </template>
        </VFlexTable>

        <!--Table Pagination-->
        <VFlexPagination
          v-if="filteredData.length > 5"
          v-model:current-page="page"
          :item-per-page="10"
          :total-items="873"
          :max-links-displayed="7"
          no-router
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.has-top-nav {
  .flex-list-wrapper,
  .list-flex-toolbar {
    max-width: 880px;
    margin-right: auto;
    margin-left: auto;
  }
}
</style>

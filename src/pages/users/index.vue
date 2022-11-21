<script setup lang="ts">
import {useHead} from '@vueuse/head'

import {useViewWrapper} from '/@src/stores/viewWrapper'
import {useUserStore} from "/@src/stores/users";

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('Users')

useHead({
  title: 'Users',
})

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

const dataForTable = computed(() => {
  if (user.users) {
    const mappedUsers = user.users.map(user => {
      return {
        id: user.id,
        email: user.email,
        phone: user.phone,
        name: `${user.firstName} ${user.lastName}`,
        role: user.authorities
      }
    });

    return {
        data: mappedUsers
    }
  }
})


const getRole = (role: string) => {
  const roleMap: any = {
    'ROLE_ADMIN': {
      color: 'primary',
      name: 'owner'
    },
    'ROLE_USER': {
      color: 'info',
      name: 'user'
    },
    'ROLE_CLIENT': {
      color: 'success',
      name: 'client'
    }
  }

  return roleMap[role]
}

</script>

<template>
  <div class="page-content-inner">
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
      <div class="page-content-inner">
        <div class="users-table">
          <!--List Empty Search Placeholder -->
          <VPlaceholderPage
            v-if="!user.users.length"
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

          <VSimpleDatatables :options="dataForTable" v-if="user.users.length"/>

          <VFlexTableWrapper
            :data="dataForTable?.data"
            :columns="{
              name: {
                label: 'Name',
                sortable: true,
                searchable: true
              },
              phone: {
                label: 'Phone',
                sortable: true,
                searchable: true
              },
              email: {
                label: 'Email',
                sortable: true,
                searchable: true
              },
              role: {
                label: 'Role',
                sortable: true,
                searchable: true
              },
              actions: {
                label: 'Actions',
                align: 'end',
              },
            }">

              <template #default="wrapperState">
                <!-- We can place any content inside the default slot-->
                <VFlexTableToolbar>
                  <template #left>
                    <!-- We can bind wrapperState.searchInput to any input -->
                    <VField>
                      <VControl icon="feather:search">
                        <input
                          v-model="wrapperState.searchInput"
                          type="text"
                          class="input is-rounded"
                          placeholder="Filter..."
                        />
                      </VControl>
                    </VField>
                  </template>

                  <template #right>
                    <!-- We can also bind wrapperState.limit -->
                    <VField>
                      <VControl>
                        <div class="select is-rounded">
                          <select v-model="wrapperState.limit">
                            <option :value="1">1 results per page</option>
                            <option :value="10">10 results per page</option>
                            <option :value="15">15 results per page</option>
                            <option :value="25">25 results per page</option>
                            <option :value="50">50 results per page</option>
                          </select>
                        </div>
                      </VControl>
                    </VField>
                  </template>
                </VFlexTableToolbar>

                <!-- 
                  The VFlexTable "data" and "columns" props 
                  will be inherited from parent VFlexTableWrapper 
                -->
                <VFlexTable rounded>
                  <!-- Custom "name" cell content -->
                  <template #body-cell="{ row, column }">
                    <template v-if="column.key === 'role'">
                      <div class="has-text-right">
                        <small
                          class="tag is-rounded"
                          :class="getRole(row.role).color">
                          {{ getRole(row.role).name }}
                        </small>
                      </div>
                    </template>

					<template v-if="column.key === 'actions'">
                      <div class="has-text-right">
                        <VButton>
							Edit
						</VButton>
						<VButton>
							Remove
						</VButton>
                      </div>
                    </template>
                  </template>
                </VFlexTable>

                <!-- Table Pagination with wrapperState.page binded-->
                <VFlexPagination
                  v-model:current-page="wrapperState.page"
                  class="mt-6"
                  :item-per-page="wrapperState.limit"
                  :total-items="wrapperState.total"
                  :max-links-displayed="5"
                  no-router
                />
              </template>
            </VFlexTableWrapper>

        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  .is-dark .users-table .search-results {
    background: none;
  }
</style>

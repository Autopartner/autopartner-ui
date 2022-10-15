<script setup lang="ts">
import {useHead} from '@vueuse/head'

import {useViewWrapper} from '/@src/stores/viewWrapper'
import {useUserStore} from "/@src/stores/users";
import {optionsUsers} from "/@src/data/v-datatable/users-datatable";

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
    return {
      ...optionsUsers,
      data: {
        ...optionsUsers.data,
        data: 
          user.users.map(user => {
            return [`${user.firstName} ${user.lastName}`, user.phone, user.email, user.authorities]
          })
        
      }
    }
  }
})

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
        <div class="flex-list-wrapper flex-list-v1">
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

        </div>
      </div>
    </div>
  </div>
</template>

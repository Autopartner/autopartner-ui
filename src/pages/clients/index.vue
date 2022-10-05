<script setup lang="ts">
import {useHead} from '@vueuse/head'

import {useViewWrapper} from '/@src/stores/viewWrapper'
import { optionsUsers } from '/@src/data/v-datatable/users-datatable'

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('Clients')

useHead({
  title: 'Clients',
})
</script>

<template>
  <div class="page-content-inner">
    <VSimpleDatatables :options="optionsUsers" />
  </div>
</template>

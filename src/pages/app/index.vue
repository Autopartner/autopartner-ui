<script setup lang="ts">
import { useHead } from '@vueuse/head'

import { useViewWrapper } from '/@src/stores/viewWrapper'

const viewWrapper = useViewWrapper()
viewWrapper.setPageTitle('Orders')

useHead({
  title: 'Orders',
})
</script>

<template>
  <div class="page-content-inner">
    <Dashboard />
  </div>
</template>

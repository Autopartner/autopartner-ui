<script setup lang="ts">

export interface SideBarLiProps {
  route_name: string
  icon: string
  text: string
}

const props = withDefaults(defineProps<SideBarLiProps>(), {
  route_name: 'app',
  icon: '',
  text: ''
})
</script>

<template>
  <li>
    <RouterLink :to="{ name: `${props.route_name}` }">
      <i aria-hidden="true" :class=props.icon></i>
      {{ props.text }}
    </RouterLink>
  </li>
</template>

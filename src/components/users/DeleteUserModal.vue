<script setup lang="ts">

import {useUserStore} from "/@src/stores/users";

export interface DeleteUserModalProps {
  open?: boolean
}

const props = withDefaults(defineProps<DeleteUserModalProps>(), {
  open: false
})

const user = useUserStore()

</script>
<template>
  <VModal
    :open="user.deleteConfirmationOpen"
    actions="center"
    size="small"
    @close="user.deleteConfirmationOpen = false"
  >
    <template #content>
      <VPlaceholderSection
        title="Remove"
        :subtitle="'Are you sure you want to delete ' + user.selectedUser?.name + '?'"
      />
    </template>
    <template #action>
      <VButton color="primary" raised @click="user.remove(); user.deleteConfirmationOpen = false">Remove</VButton>
    </template>
  </VModal>
</template>



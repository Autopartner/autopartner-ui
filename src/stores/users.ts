import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref } from 'vue'
import {fetchUsers, deleteUser, User} from "/@src/api/users";

export const useUserStore = defineStore('user', () => {

  const users = ref<User[]>([])
  const selectedUser = ref<User>()
  const loading = ref(false)
  const deleteConfirmationOpen = ref(false)

  async function loadUsers() {
    if (loading.value) return

    loading.value = true

    try {
      users.value = await fetchUsers()
    } finally {
      loading.value = false
    }
  }

  async function remove() {
    if (selectedUser.value) {
      await deleteUser(selectedUser.value.id)
      await loadUsers()
    }
  }

  return {
    users,
    selectedUser,
    loadUsers,
    deleteConfirmationOpen,
    remove
  } as const
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}

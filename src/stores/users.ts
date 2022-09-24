import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref } from 'vue'
import {fetchUsers, User} from "/@src/api/users";

export const useUserStore = defineStore('user', () => {

  const users = ref<User[]>([])
  const loading = ref(false)

  async function loadUsers() {
    if (loading.value) return

    loading.value = true

    try {
      users.value = await fetchUsers()
    } finally {
      loading.value = false
    }
  }

  return {
    users,
    loadUsers
  } as const
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}

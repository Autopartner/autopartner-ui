import {useApi} from "../composable/useApi"

export interface User {
  id: number
  firstName: string
  lastName: string
  phone: string
  email: string
  role: string
}

interface response {
  data: User[]
}

export const fetchUsers = async (): Promise<User[]> => {
    const api = useApi()
    try {
        const response : response =  await api.get('/api/v1/users')
        return response.data
    } catch (error : any) {
        return error.response.data.message
    }
}

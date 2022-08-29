import {useApi} from "../composable/useApi"

interface loginArgs {
    email: string,
    password: string,
}

interface response {
    data: {
        token: string
    }
}

export const login = async (loginArgs: loginArgs) => {
    const api = useApi()

    try {
        const response : response = await api.post('/api/v1/auth', loginArgs)

        return response.data
    } catch (error : any) {
        return error.response.data.message
    }
}

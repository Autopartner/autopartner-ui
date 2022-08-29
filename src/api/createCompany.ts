import {useApi} from "../composable/useApi";

interface signupFieldsArgs {
    firstName: string,
    lastName: string,
    email: string,
    name: string,
    country: string,
    city: string,
    phone: string,
    password: string,
    passwordCheck: string,
}

interface response {
    data: any,
    status: number
}

export const createCompany = async (signupFields: signupFieldsArgs) => {
    const api = useApi();

    try {
        const response : response = await api.post('/api/v1/companies', signupFields);

        return response;
    } catch (error : any) {
        return error.response.data.message;
    }

};

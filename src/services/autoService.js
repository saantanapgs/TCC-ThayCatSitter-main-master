import api from "./api"

export async function register(name, email, phone, birthday, password) {
    try{
        const res = await api.post("/register", {
            name,
            email,
            phone,
            birthday,
            password
        })
        return res.data
    } catch(error){
        console.error("Erro no registro: ", error.response?.data || error.message)
        throw error
    }
}

export async function login(email, password) {
    try{
        const res = await api.post("/login", {
            email,
            password
        })
        return res.data
    } catch(error){
        console.error("Erro no login: ", error.response?.data || error.message)
        throw error
    }
}
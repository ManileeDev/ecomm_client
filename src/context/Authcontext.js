import { createContext, useEffect, useReducer } from "react"

export const AuthContext = createContext();


const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return { user: action.payload }
        case "LOGOUT":
            return { user: null }
        case "UPDATEUSER":
            return {user : action.payload}
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        cartValue: 2
    })

    useEffect(() => {
        const user = localStorage.getItem("user")

        if (user) {
            dispatch({ type: "LOGIN", payload: JSON.parse(user) })
        }
    }, [])

    console.log("Auth State :", state)

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}
import { useState, createContext } from "react"

export const UserContext = createContext()

export const UserProvider = (props) => {
    const [isLogin, setIsLogin] = useState(false)

    const data = {
        isLogin,
        setIsLogin
    }

    return(
        <UserContext.Provider value={data}>
            {props.children}
        </UserContext.Provider>
    )
}
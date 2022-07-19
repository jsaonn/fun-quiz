import { UserContext } from "../UserContext"
import { useContext, useEffect } from "react"
import { 
    Routes,
    Route,
    Navigate
} from "react-router-dom"
import Homepage from "../pages/Homepage"
import CategoryList from "../pages/CategoryList"
import QuizPage from "../pages/QuizPage"
import LoginPage from "../pages/LoginPage"

const MainRoute = () => {
    const { setIsLogin } = useContext(UserContext)

    useEffect(() => {
        localStorage.getItem("token") !== undefined ? setIsLogin(true) : setIsLogin(false)
    })

    return(
        <>
            <Routes>
                <Route path="/" element={<Homepage />} />
                {
                    localStorage.getItem("token") && (
                        <>
                        <Route path="/category" element={<CategoryList />} />
                        <Route path="/quiz/:category" element={<QuizPage />} />
                        </>
                    )
                }
                {
                    !localStorage.getItem("token") && (
                        <>
                            <Route path="/login" element={<LoginPage />} />
                        </>
                    )
                }
            </Routes>
        </>
    )
}

export default MainRoute
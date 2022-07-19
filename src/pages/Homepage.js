import { Button, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useNavigate } from "react-router-dom"

const Homepage = () => {
    const navigate = useNavigate()

    return(
        <>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", flexDirection: "column" }}>
                <Typography variant="h1">FUN QUIZ!!</Typography>
                <Button 
                    variant="contained" 
                    onClick={()=> {
                        localStorage.getItem("token") ?
                        navigate('/category', { replace: true }) :
                        navigate('/login', { replace: true })
                    }}
                >
                    get started
                </Button>
            </Box>
        </>
    )
}

export default Homepage
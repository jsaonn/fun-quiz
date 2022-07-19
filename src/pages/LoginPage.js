import { Card, Box, Typography, TextField, Button } from "@mui/material"
import { useNavigate } from "react-router-dom"

export const LoginPage = () => {
    const navigate = useNavigate()
    
    const handleSubmit = () => {
        localStorage.setItem("token", "temp_token")
        navigate(`/category`, { replace: true })
    }

    return(
        <>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
            <Card sx={{ p: 5, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 5 }}>
                <Typography variant="h6">LOGIN PAGE</Typography>
                <TextField label="Username" variant="outlined" required />
                <TextField label="Password" variant="outlined" required type="password" />
                <Button variant="contained" onClick={handleSubmit}>Login</Button>
            </Card>
        </Box>
        </>
    )
}

export default LoginPage
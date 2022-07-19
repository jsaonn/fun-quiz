import { Card, Box, Typography } from "@mui/material"
import pict from "../asset/pict1.jpg"
import { useNavigate } from "react-router-dom"

const CATEGORIES = [
    {
        id: 15,
        name: "Video Games"
    },
    {
        id: 11,
        name: "Films"
    },
    {
        id: 21,
        name: "Sports"
    },
    {
        id: 27,
        name: "Animals"
    },
    {
        id: 31,
        name: "Anime & Manga"
    },
    {
        id: 12,
        name: "Music"
    },
    {
        id: 20,
        name: "Mythology"
    },
    {
        id: 17,
        name: "Science & Nature"
    },
]

const CategoryList = () => {
    const navigate = useNavigate()
    
    return(
        <>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: 5 }}>
            {
                CATEGORIES.map(category => {
                    return(
                        <Card
                            key={category.id} 
                            sx={{ mt: 6, 
                                p: 3, 
                                minWidth: "200px", 
                                display: "flex", 
                                alignItems: "center", 
                                justifyContent: "center", 
                                flexDirection: "column", 
                                gap: 5, 
                                cursor: "pointer"
                             }}
                             onClick={()=>navigate(`/quiz/${category.id}`, { replace: true })}
                        >
                            <img src={pict} width={150} />
                            <Typography variant="h6" color="initial">{category.name}</Typography>
                        </Card>
                    )
                })
            }
            </Box>
        </>
    )
}

export default CategoryList
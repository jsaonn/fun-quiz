import { useEffect, useState } from "react"
import axios from "axios"
import { Card, Box, Typography, Radio, RadioGroup, FormControl, FormControlLabel, Button } from "@mui/material"
import { useParams, useNavigate } from 'react-router-dom'
import he from "he"
import Countdown from "react-countdown"

const QuizPage = () => {
    const navigate = useNavigate()
    const { category } = useParams()
    const [data, setData] = useState(
        { date: Date.now(), delay: 600000 }
    )
    const wantedDelay = 600000
    const [isLoading, setLoading] = useState(true)
    const [question, setQuestion] = useState([])
    const [answers, setAnswers] = useState([])
    const [correctAnswer, setCorrectAnswer] = useState([])
    const [answered, setAnswered] = useState({})
    const [currentNumber, setCurrentNumber] = useState(0)
    const [isSubmitted, setSubmitted] = useState(false)
    const [score, setScore] = useState(0)
    const [count, setCount] = useState(0)

    const renderer = ({ minutes, seconds }) => {
        if (!isSubmitted) {
            return(
                <>
                    <Typography sx={{ mb: 3 }}>Timer: {minutes}:{seconds}</Typography>
                    <Typography sx={{ mb: 3 }}>Number: {currentNumber+1}/10</Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                        <Typography>{currentNumber+1}.</Typography>
                        <Typography>{question[currentNumber]}</Typography>
                    </Box>
                    <FormControl fullWidth>
                        <RadioGroup sx={{ display: "flex", flexDirection: "column", mt: 3, gap: 1 }}
                            onChange={handleAnswered}
                        >
                        {
                            answers[currentNumber].map((el, idx)=> {
                                return(
                                    <Box key={idx} sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start", p: 1 }}>
                                        <FormControlLabel value={el} control={<Radio required />} label={he.decode(el)} />
                                    </Box>
                                )
                            })
                        }
                        </RadioGroup>
                    </FormControl>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                        <Button variant="outlined" color="secondary" disabled={currentNumber === 0 ? true : false} onClick={()=>setCurrentNumber(currentNumber - 1)}>Back</Button>
                        <Button variant="contained" color="primary" sx={{ display: currentNumber === 9 ? "none" : "inline" }} onClick={()=>setCurrentNumber(currentNumber + 1)}>Next</Button>
                        <Button variant="contained" color="primary" sx={{ display: currentNumber === 9 ? "inline" : "none" }} onClick={handleSubmit}>Submit</Button>
                    </Box>
                </>
            )
        } else {
            return(
                <>
                    <Typography>You have answered {count} questions!</Typography>
                    <Typography>{score} out of 10 questions answered correcly</Typography>
                    <Typography variant="h6">Your score is {score === 0 ? 0 : `${score}0`}!</Typography>
                    <Button variant="outlined" onClick={()=>navigate(`/category`, { replace: true })} sx={{ mt: 2 }}>Back to category list</Button>
                </>
            )
        }
    }

    const getLocalStorageValue = (s) => localStorage.getItem(s)

    useEffect(() => {
        const savedDate = getLocalStorageValue("end_date")
        if (savedDate != null && !isNaN(savedDate)) {
            const currentTime = Date.now()
            const delta = parseInt(savedDate, 10) - currentTime

            if (delta > wantedDelay) {
                if (localStorage.getItem("end_date").length > 0) {
                    localStorage.removeItem("end_date")
                }
            } else {
                setData({ date: currentTime, delay: delta })
            }
        }

        const getQuiz = () => {
            axios.get(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=easy&type=multiple`)
            .then(res => {
                let arrQuestion = []
                let arrCorrect = []
                let arrAnswers = []
                res.data.results.map(el => {
                    arrQuestion.push(he.decode(el.question))
                    arrCorrect.push(el.correct_answer)

                    let tempAnswer = [...el.incorrect_answers, el.correct_answer]
                    arrAnswers.push(tempAnswer)
                })

                setQuestion(arrQuestion)
                setCorrectAnswer(arrCorrect)
                setAnswers(arrAnswers)
                setLoading(false)
                setAnswered({})
                setCurrentNumber(0)
            })
        }

        getQuiz()
    }, [])

    if (isLoading) {
        return <div>Loading...</div>
    }

    const handleAnswered = (event) => {
        setAnswered(Object.assign(answered, {
            [currentNumber]: event.target.value
        }))
        setCount((count) => count + 1)
    }

    const handleSubmit = () => {
        correctAnswer.map((ans, idx) => {
            if (idx in answered) {
                setScore((score) => ans === answered[idx] ? score + 1 : score + 0)
            }
        })
        setSubmitted(true)
    }

    return(
        <>
            <Card sx={{ p: 5, m: 5 }}>
                <Countdown
                    date={data.date + data.delay}
                    renderer={renderer}
                    onStart={() => {
                        if (localStorage.getItem("end_date") == null) {
                            localStorage.setItem(
                                "end_date",
                                JSON.stringify(data.date, data.delay)
                            )
                        }
                    }}
                    onComplete={() => {
                        if (localStorage.getItem("end_date") != null) {
                            localStorage.removeItem("end_date")
                        }

                        setSubmitted(true)
                    }}
                />
            </Card>
        </>
    )
}

export default QuizPage
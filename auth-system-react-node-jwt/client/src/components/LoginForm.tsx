import React, { useState } from 'react'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Header from './header';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Footer from './Footer';



interface PropsType { }

const Login: React.FC<PropsType> = () => {
    let navigate = useNavigate()
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await Axios.post('http://localhost:3001/api', {
            email: email,
            password: password

        }).then((res) => {
            if (res.data.msg == 'success') {

                const login = localStorage.setItem('login', 'true')
            }
            console.log("Successully", res.data)
            navigate('/')
        }).catch((err) => {
            console.log(err)
        })
        console.log(email, password)
    }


    return (
        <>
            <Header />

            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={(e) => setemail(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(e) => setpassword(e.target.value)}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleSubmit}
                        >
                            Sign In
                        </Button>
                    </Box>
                </Box>
            </Container>
            <Footer/>
        </>
    )
}

export default Login
import React from 'react'
import Footer from './Footer'
import Header from './header'

interface PropsType { }

const Home: React.FC<PropsType> = () => {
    return (
        <div>
            <Header/>
            <h1>welcome</h1>
            <Footer/>
        </div>
    )
}

export default Home
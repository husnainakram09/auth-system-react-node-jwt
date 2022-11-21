import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


interface PropsType { 
    Component:any,
}

const Protected: React.FC<PropsType> = ({Component}) => {
    const navigate = useNavigate();
    useEffect(() => {
        let login = localStorage.getItem('login')
        if (login!='true') {
            navigate('/login')
        }
        console.log(login)
    });
    return (
        <div>
            {Component}
        </div>)
}

export default Protected
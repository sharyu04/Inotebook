import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'

const Login = (props) => {
    const host = "http://localhost:5000";

    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });

        const json = await response.json()
        console.log(json)
        if(json.success){
            // Save the auth token in local storage and redirect
            localStorage.setItem('token',json.authtoken);
            navigate('/');
            props.showAlert("Logged in successfully","success")
        }
        else{
            props.showAlert("Invalid Credentials","danger")
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }


    return (
        <div style={{backgroundColor: 'white', padding:'40px',borderRadius:'40px'}}>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label" style={{fontSize:"20px"}}>Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" name='email' value={credentials.email} aria-describedby="emailHelp" onChange={onChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label" style={{fontSize:"20px"}}>Password</label>
                    <input type="password" className="form-control" name='password' value={credentials.password} id="exampleInputPassword1" onChange={onChange} />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary" style={{fontWeight: "bold"}}>Submit</button>
            </form>
        </div>
    )
}

export default Login    
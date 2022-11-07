import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'

const SignUp = (props) => {

  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/auth/createUser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name:credentials.name ,email: credentials.email, password: credentials.password })
    });

    const json = await response.json()
    console.log(json)
    if (json.success) {
      // Save the auth token in local storage and redirect
      localStorage.setItem('token', json.authtoken);
      navigate('/');
      props.showAlert("Account created successfully","success")
    }
    else {
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
          <label htmlFor="name" className="form-label" style={{fontSize:"20px"}}>Name</label>
          <input type="text" className="form-control" id="name" name='name' aria-describedby="emailHelp" onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label" style={{fontSize:"20px"}}>Email</label>
          <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name='email' onChange={onChange} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label" style={{fontSize:"20px"}}>Password</label>
          <input type="password" className="form-control" id="password" name='password' onChange={onChange} minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label" style={{fontSize:"20px"}}>Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} minLength={5} required />
        </div>
        <button type="submit" className="btn btn-primary" style={{fontWeight: "bold"}}>Submit</button>
      </form>
    </div>
  )
}

export default SignUp
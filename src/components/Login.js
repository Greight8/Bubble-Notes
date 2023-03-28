import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import alertContext from '../context/alert/alertContext';
import darkContext from '../context/darkmode/darkContext';

const Login = () => {
    // getting darkmode from context api
    const context3 = useContext(darkContext);
    const { mode } = context3;

    // getting alert from context api
    const context = useContext(alertContext);
    const { showAlert } = context;

    // making state for our email and poassword
    const [credentials, setCredentials] = useState({ email: "", password: "" });

    // making useNavigate hook to redirect
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();

        if (json.success) {
            // save auth-token to localstorage and redirect to "/"
            localStorage.setItem("token", json.authToken);
            navigate("/", { replace: true });
            showAlert("  Loggedin Successfully", "success");
        }
        else {
            showAlert("  invalid credentials", "danger");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (
        <div className='my-3'>
            <form onSubmit={handleSubmit}>
                <h2 className='mb-5 mt-1 text-center' style={{ color: mode === "light" ? "black" : "white" }}>Login your Account</h2>
                <div className="mb-3 mt-5">
                    <label htmlFor="email" className="form-label mx-5" style={{ color: mode === "light" ? "black" : "white", fontStyle: "italic" }}>Email address</label>
                    <input type="email" className="form-control mx-5" id="email" name="email" aria-describedby="emailHelp" value={credentials.email} onChange={onChange} style={{ backgroundColor: mode === "light" ? "white" : "rgb(202 233 246)", border: "1px solid black", width: "440px", borderRadius: "15px" }} />
                </div>
                <div className="mb-3 mt-5">
                    <label htmlFor="password" className="form-label mx-5" style={{ color: mode === "light" ? "black" : "white", fontStyle: "italic" }}>Password</label>
                    <input type="password" className="form-control mx-5" id="password" name="password" value={credentials.password} onChange={onChange} minLength={5} required style={{ backgroundColor: mode === "light" ? "white" : "rgb(202 233 246)", border: "1px solid black", width: "440px", borderRadius: "15px" }} />
                </div>
                <button type="submit" className="btn btn-info mx-5 mt-3" style={{ borderRadius: "12px" }}>Login</button>
            </form>
        </div>
    )
}

export default Login

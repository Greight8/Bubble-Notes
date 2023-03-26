import React, { useContext, useEffect, useState } from 'react'
import darkContext from '../context/darkmode/darkContext';

const MyAccount = () => {
    // getting darkmode from context api
    const context3 = useContext(darkContext);
    const { mode } = context3;

    // making  state to store our user details
    const userInitial = [];
    const [user, setUser] = useState(userInitial);

    // to show user its name and email id
    const host = "http://localhost:5000";

    const accDetail = async () => {
        const response = await fetch(`${host}/api/auth/getuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token"),
            }
        });
        const json = await response.json();
        setUser(user.concat(json));
    }

    useEffect(() => {
        accDetail();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="container">
            <h2 className='mb-5 mt-1 text-center' style={{ color: mode === "light" ? "black" : "white" }}>Account Details</h2>
            {user.map((myUser) => {
                return <div key={myUser}>
                    <div className="container d-flex justify-content-center align-items-center" style={{ backgroundColor: mode === "light" ? "white" : " rgb(202 233 246)", border: "1px solid #988c8c", width: "440px", borderRadius: "15px", flexDirection: "column", marginTop: "75px" }}>
                        <div className="card-header" style={{ backgroundColor: mode === "light" ? "white" : "lightblue"}}>
                            Name
                        </div>
                        <div className="card-body mb-2">
                            <blockquote className="blockquote mt-4">
                                <p>{myUser.name}</p>
                            </blockquote>
                        </div>
                        <div className="card-header" style={{ backgroundColor: mode === "light" ? "white" : "lightblue"}}>
                            Email
                        </div>
                        <div className="card-body mb-2">
                            <blockquote className="blockquote mt-3">
                                <p>{myUser.email}</p>
                            </blockquote>
                        </div>
                    </div>
                </div>
            })}
        </div>
    )
}

export default MyAccount

import React, { useContext } from 'react'
import darkContext from '../context/darkmode/darkContext';

export default function About() {
  // getting darkmode from context api
  const context3 = useContext(darkContext);
  const { mode } = context3;

  // myStyle is a conditional variable ie an object
  let myStyle = {
    background: mode === "light" ? "white" : "#042743",
    color: mode === "light" ? "#042743" : "white"
  }

  return (
    <div className='container' style={myStyle}>
      <h1 className='my-3 mb-5'>About us</h1>
      <div className="accordion my-1" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" style={myStyle}>
              <strong>What is Bubble Notes</strong>
            </button>
          </h2>
          <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample" style={myStyle}>
            <div className="accordion-body">
              Bubble Notes is a Notes utility app where a user can create it's own account and save , delete and update his/her personal Notes. It is safe and secure and easy to use.The User's data is completely safe on the cloud
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" style={myStyle}>
              <strong>Free to use</strong>
            </button>
          </h2>
          <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample" style={myStyle}>
            <div className="accordion-body">
              Bubble Notes is completely free to use
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingThree">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree" style={myStyle}>
              <strong>Browser compatible</strong>
            </button>
          </h2>
          <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample" style={myStyle}>
            <div className="accordion-body">
              Bubble Notes works in any web browser such as chrome, firefox, safari, edge, opera etc.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
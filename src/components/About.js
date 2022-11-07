import React from 'react';

const About = () => {
  return (
    <div style={{backgroundColor: 'white', padding:'40px',borderRadius:'40px'}}>
      <h1>iNotes</h1>
      <p style={{fontSize: "20px"}}>The project made under the DBMS coursework.iNotes is a react application for managing college notes on the cloud.The purpose of this project to keep the track of digital notes regarding college classwork . This website serves as a helping hand to keep the track of notes "Any where & Any Time".  It consists of all the DBMS concept such as Database connectivity, Nosql and Mongodb. React js has been used a frontend framework and node js for backend. For database mongodb is being used.</p>
      <h3>Packages used :</h3>
      <ul style={{fontSize: "20px"}}>
        <li>Mongoose</li>
        <li>Express</li>
        <li>Jsonwebtoken</li>
        <li>Cors</li>
        <li>bcryptjs</li>
      </ul>
      <h3>Tech Stack : MERN </h3>
      <ul style={{fontSize: "20px"}}>
        <li>ReactJs</li>
        <li>NodeJs</li>
        <li>MongoDB</li>
      </ul>
    </div>
  )
}

export default About
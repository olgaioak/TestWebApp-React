import React from 'react';
import './Contact.css';

const contact = props => (
  <article className="contact">
    <header>
      <div>Name: {props.name}</div>
      <div>Email: {props.email} </div>
      <div>Address: {props.address} </div>
      <div>Number: {props.number} </div>
    </header>
    <div className="contact__actions">
      <button className='button' onClick={props.onStartEdit}>Edit</button> 
      <button className='button' onClick={props.onDelete}>Delete</button>
    </div>
  </article>
);

export default contact;

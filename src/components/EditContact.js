import React from 'react';
import './Contact.css';

class EditContact extends React.Component {  
    render(){
        return(
            <form>
            <input
            type="text"
            name="name"
            placeholder="Your name"
            
            />
              <input
            type="email"
            name="email"
            placeholder="Your email"
            
            />
              <input
            type="text"
            name="address"
            placeholder="Your address"
            
            />
              <input
            type="number"
            name="number"
            placeholder="Your number"
            
            />
            <button type="submit">
            Add
            </button>
            </form>

        )
    }
 
}

export default EditContact;
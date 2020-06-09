import React, { Component, Fragment } from 'react';
import Contact from '../components/Contact';
import styled from 'styled-components'

const Title = styled.h1`
    font-size: 1.5em;
    text-align: center;
    `;

class ContactsPage extends Component {

    state={
        contacts: [],
        contactsLoading: true
    };

    componentDidMount() {
        // fetch('URL')
        //   .then(res => {
        //     if (res.status !== 200) {
        //       throw new Error('Failed to fetch user status.');
        //     }
        //     return res.json();
        //   })
        //   .then(resData => {
        //     this.setState({ status: resData.status });
        //   })
        //   .catch(this.catchError);
       
        this.loadContacts();
      }

      loadContacts = () => {
        
        fetch('http://localhost:8080/')
          .then(res => {
            if (res.status !== 200) {
              throw new Error('Failed to fetch posts.');
            }
            return res.json();
          })
          .then(resData => {
            this.setState({
              contacts: resData.contacts,
              contactsLoading: false
            });
          })
          .catch(this.catchError);
      };

      render(){
          return (
            <Fragment>
                <Title>Contacts Page</Title>
                {this.state.contacts.map(contact => (
                    <Contact
                    key={contact._id}
                    id={contact._id}
                    name ={contact.name}
                    email ={contact.email}
                    address ={contact.address}
                    number = {contact.number}
                    //   onStartEdit={}
                    //   onDelete={}
                    />
                ))}
                 {/* <button className='button' onClick={props.onDelete}>Delete</button> */}
            </Fragment>
          );
      }
}

export default ContactsPage;
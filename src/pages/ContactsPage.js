import React, { Component, Fragment } from 'react';
import Contact from '../components/Contact';
import EditContact from '../components/EditContact';
import styled from 'styled-components'

const Title = styled.h1`
    font-size: 1.5em;
    text-align: center;
    color: #3b0062;
    `;

class ContactsPage extends Component {
    
    state = { 
        showPopup: false,
        contacts: [],
        contactsLoading: true,
        deletedMsg: false 
    };  
    
    togglePopup() {  
        this.setState({  
             showPopup: !this.state.showPopup  
        });  
    }

    componentDidMount() {
        this.loadContacts();
      }

      loadContacts = () => {
        
        fetch('http://localhost:8080/')
          .then(res => {
            if (res.status !== 200) {
              throw new Error('Failed to fetch contacts.');
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

      deleteContactHandler = contactId => {
        fetch('http://localhost:8080/delete-contact/' + contactId)
          .then(res => {
            if (res.status !== 200 && res.status !== 201) {
              throw new Error('Deleting a contact failed!');
            }
            return res.json();
          })
          .then(resData => {
            console.log(resData);
            this.setState(prevState => {
                const updatedContacts = prevState.contacts.filter(p => p._id !== contactId);
                return { contacts: updatedContacts, postsLoading: false , deletedMsg: true };
              });
          })
          .catch(err => {
            console.log(err);
            this.setState({ contactsLoading: false });
          });
      };

      
      addContact = postData => {
        fetch('http://localhost:8080/add-contact', {
            method : 'POST', 
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                name: postData.name,
                email: postData.email,
                address: postData.address,
                number: postData.number
            })
        })
             .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                throw new Error('Creating a contact failed!');
                }
                return res.json();
            })
            .then(resData => {
                console.log(resData);
                this.setState(prevState => {
                     let updatedContacts = [...prevState.contacts];
                     return {
                        contacts: updatedContacts
                   };
                }) 
            })
            .catch(err => {
                console.log(err);
            });
        };

      render(){
          return (
            <Fragment>
                <Title>Contacts Page</Title>
                {this.state.deletedMsg ? <div className='deletedMsg'>Contact successfully deleted</div> : null}
                {this.state.contacts.map(contact => (
                    <Contact
                    key={contact._id}
                    id={contact._id}
                    name ={contact.name}
                    email ={contact.email}
                    address ={contact.address}
                    number = {contact.number}
                    //   onStartEdit={}
                    onDelete={this.deleteContactHandler.bind(this, contact._id)}
                    />
                ))}
                <div className='btn-align'> <button className='button' onClick={this.togglePopup.bind(this)}>Add New Contact</button></div>
                
                 {this.state.showPopup ?  
                    <EditContact/>  
                : null  
                }  
            </Fragment>
          );
      }
}

export default ContactsPage;
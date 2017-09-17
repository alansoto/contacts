import React, {Component} from 'react'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'


class ListContacts extends Component{
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired
  }

  state={
    query:''
  }

  updateQuery = (queryText)=>{
    this.setState({query:queryText.trim()})
  }

  render(){
    const {contacts, onDeleteContact } = this.props
    const {query} = this.state
    let filteredContacts
    if (this.state.query){
      const match = new RegExp(escapeRegExp(query),'i')
      filteredContacts = contacts.filter((contact)=>match.test(contact.name))
      filteredContacts.sort(sortBy('name'))
    }else {
      filteredContacts = contacts
  }


    return (
      <div className='list-contacts'>
        <div className='list-contacts-top'>
          <input className='search-contacts' type='text' placeholder='Search contacts' value={query}
            onChange={(event)=>this.updateQuery(event.target.value)} />
        </div>

        {filteredContacts.length !== contacts.length && (
          <div className='showing-contacts'>
            <span>Now showing {filteredContacts.length} out of {contacts.length}</span>
            <button onClick={()=>{this.updateQuery('')}}>Show all</button>
            
          </div>
        )}

        <ol className = 'contact-list'>
          {
            filteredContacts.map (contact => (
              <li key={contact.id} className='contact-list-item'>
                <div className='contact-avatar' style={{
                 backgroundImage: `url(${contact.avatarURL})`
                }} />

                <div className='contact-details'>
                  <p>{contact.name}</p>
                  <p>{contact.email}</p>
                </div>

                <button className='contact-remove' onClick={()=> onDeleteContact(contact)}>
                  Remove
                </button>
              </li>
            ))
          }
        </ol>
      </div>

    )
  }
}



export default ListContacts

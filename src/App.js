import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => {
        setContacts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching contacts:', error);
        setLoading(false);
      });
  };

  const handleCardClick = (contact) => {
    setSelectedContact(contact);
  };

  const closePopup = () => {
    setSelectedContact(null);
  };

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  return (
    <div className="app-container">
      <h1>Contacts</h1>
      <div className="contacts-list">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="contact-card"
            onClick={() => handleCardClick(contact)}
          >
            <h2>{contact.name}</h2>
            <p>
              <strong>Email:</strong> {contact.email}
            </p>
            <p>
              <strong>Phone:</strong> {contact.phone}
            </p>
            <p>
              <strong>Company:</strong> {contact.company.name}
            </p>
          </div>
        ))}
      </div>
      <button className="load-more-button" onClick={fetchContacts}>
        Load More
      </button>

      {/* Popup Modal */}
      {selectedContact && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closePopup}>
              &times;
            </button>
            <h2>{selectedContact.name}</h2>
            <p>
              <strong>Email:</strong> {selectedContact.email}
            </p>
            <p>
              <strong>Phone:</strong> {selectedContact.phone}
            </p>
            <p>
              <strong>Website:</strong> {selectedContact.website}
            </p>
            <p>
              <strong>Company:</strong> {selectedContact.company.name}
            </p>
            <p>
              <strong>Address:</strong>{' '}
              {`${selectedContact.address.street}, ${selectedContact.address.city}, ${selectedContact.address.zipcode}`}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

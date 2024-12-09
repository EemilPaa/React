import { useState } from 'react';
import './App.css';

function App() {
  const [person, setPerson] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '' // Lisää puhelinnumero-ominaisuus
  });

  const inputChanged = (event) => {
    setPerson({ ...person, [event.target.name]: event.target.value });
  }

  const showAlert = () => {
    alert(`Hello ${person.firstname} ${person.lastname}`);
  }

  const formSubmitted = (event) => {
    event.preventDefault();
    // Tee jotain datan kanssa
  }

  return (
    <>
      <p>
        {person.firstname} {person.lastname} <br />
        {person.email} <br />
        {person.phone} {/* Näytä puhelinnumero */}
      </p>
      <form onSubmit={formSubmitted}>
        <input
          placeholder="First name"
          name="firstname"
          value={person.firstname}
          onChange={inputChanged}
        />
        <p> </p>
        <input
          placeholder="Last name"
          name="lastname"
          value={person.lastname}
          onChange={inputChanged}
        />
        <p> </p>
        <input
          placeholder="Email"
          name="email"
          value={person.email}
          onChange={inputChanged}
        />
        <p> </p>
        <input
          placeholder="Phone number"
          name="phone"
          value={person.phone}
          onChange={inputChanged}
        />
        <p> </p>
        <input type="submit" value="Submit" />
      </form>
    </>
  );
}

export default App;

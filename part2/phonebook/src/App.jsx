import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import personsService from "./services/persons";
import Notification from "./Components/Notification";

const App = () => {
  const [allPersons, setAllPersons] = useState([
    { name: "Arto Hellas", id: "Arto Hellas", number: "9832323322" },
  ]);
  const [newName, setNewName] = useState("");
  const [errorMessage, setErrorMessage] = useState(null)
  const [newNumber, setNewNumber] = useState("");
  const [filterby, setFilterby] = useState("");
  const [persons, setPersons] = useState(allPersons);

  useEffect(() => {
    personsService.getAll().then((res) => setAllPersons(res));
  }, []);
  const handleFilter = function (e) {
    let temp = persons;
    console.log(e.target.value);
    setFilterby(e.target.value);
    const toShow = persons.filter((p) => p.name.includes(e.target.value));

    setPersons(toShow);
  };
  const handleAddName = function (e) {
    setNewName(e.target.value);
  };

  const handleAddNumber = function (e) {
    setNewNumber(e.target.value);
  };
  const handleAddContact = function (e) {
    e.preventDefault();
    console.log("why not ", newName);

    const personObject = {
      name: newName,
      id: newName,
      number: newNumber,
    };

    if (allPersons.map((p) => p.name).includes(newName)) {
      console.log("why");

      const cfm = window.confirm(
        `${newName} arleady exists want to update his number`
      );
      if (cfm) {
        personsService
          .update(personObject)
          .then((res) =>{
              setAllPersons(allPersons.map((p) => (p.id == newName ? res : p)));
              setErrorMessage(`updated ${newName}'s number successfully`)
              setTimeout(()=>{setErrorMessage(null)},5000)
          }
          );
      }
      return;
    }

    personsService.create(personObject).then((res) => {
      console.log(res);
      setErrorMessage(`Added ${newName} to phonebook successfully`)
      setTimeout(()=>{setErrorMessage(null)},5000)
      setAllPersons(allPersons.concat(personObject));
    });
  };

  const handleDelete = function (id) {
    console.log("lets delete ", id);

    const confirmation = window.confirm("are you sure want to delete", id);
    if (confirmation) {
      personsService.remove(id).then((res) => {
        console.log(res);
        const person = allPersons.filter((p) => p.id !== id);
        setAllPersons(person);
      }).catch((e)=>{
        setErrorMessage("this person is already deleted from server");
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000);
        const person = allPersons.filter((p) => p.id !== id);
      setAllPersons(person);
                            
      });
    }
  };
  return (
    <div>
      <Notification message={errorMessage}/>
      <h2>Phonebook</h2>
      <div>
        <p>Filter shown with</p>
        <input type="text" onChange={handleFilter} value={filterby} />
      </div>
      <form onSubmit={handleAddContact}>
        <div>
          name: <input value={newName} onChange={handleAddName} />
        </div>
        <div>
          name:{" "}
          <input type="number" value={newNumber} onChange={handleAddNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {allPersons.map((p) => (
        <div key={p.id}>
          <p>
            {p.name} {p.number}{" "}
            <button
              onClick={() => {
                handleDelete(p.id);
              }}
            >
              delete
            </button>
          </p>
        </div>
      ))}
      <div>debug: {newName}</div>
    </div>
  );
};

export default App;

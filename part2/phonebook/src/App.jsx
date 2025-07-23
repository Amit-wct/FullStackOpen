import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const App = () => {
  const [allPersons, setAllPersons] = useState([
    { name: "Arto Hellas", id: "Arto Hellas", number: "9832323322" },
  ]);
  const [newName, setNewName] = useState("");

  const [newNumber, setNewNumber] = useState("");
  const [filterby, setFilterby] = useState("");
  const [persons, setPersons] = useState(allPersons);

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((res) => setAllPersons(res.data));
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
    if (persons.map((p) => p.name).includes(newName)) {
      console.log("why");
      alert(`${newName} arleady exists`);
      return;
    }

    console.log(e.target);
    const personObject = {
      name: newName,
      id: newName,
      number: newNumber,
    };

    setAllPersons(allPersons.concat(personObject));
  };
  return (
    <div>
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
            {p.name} {p.number}
          </p>
        </div>
      ))}
      <div>debug: {newName}</div>
    </div>
  );
};

export default App;

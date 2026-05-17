import { useState, useEffect } from 'react';
import Header from './Header';
import ToyForm from './ToyForm';
import ToyContainer from './ToyContainer';

function App() {
  const [toys, setToys] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/toys')
      .then((response) => response.json())
      .then((data) => setToys(data))
      .catch((error) => console.error('Error fetching toys:', error));
  }, []);

  const handleAddToy = (newToy) => {
    setToys([...toys, newToy]);
  };

  const handleDeleteToy = (toyId) => {
    setToys(toys.filter((toy) => toy.id !== toyId));
  };

  const handleLikeToy = (updatedToy) => {
    const updatedToys = toys.map((toy) =>
      toy.id === updatedToy.id ? updatedToy : toy,
    );
    setToys(updatedToys);
  };

  return (
    <div className="app">
      <Header />
      <h1>Toy Tales</h1>
      <ToyForm onAddToy={handleAddToy} />
      <ToyContainer
        toys={toys}
        onDeleteToy={handleDeleteToy}
        onLikeToy={handleLikeToy}
      />
    </div>
  );
}

export default App;

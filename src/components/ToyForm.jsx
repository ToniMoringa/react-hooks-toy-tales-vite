import { useState } from 'react';

function ToyForm({ onAddToy }) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    image: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newToy = {
      name: formData.name,
      image: formData.image,
      likes: 0,
    };

    fetch('http://localhost:3001/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newToy),
    })
      .then((response) => response.json())
      .then((savedToy) => {
        onAddToy(savedToy);
        setFormData({ name: '', image: '' });
        setShowForm(false);
      })
      .catch((error) => console.error('Error adding toy:', error));
  };

  return (
    <div>
      <button onClick={() => setShowForm(!showForm)}>Add a Toy</button>
      {showForm && (
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            type="text"
            placeholder="Enter a toy's name..."
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            name="image"
            type="text"
            placeholder="Enter a toy's image URL..."
            value={formData.image}
            onChange={handleChange}
            required
          />
          <button type="submit">Create New Toy</button>
        </form>
      )}
    </div>
  );
}

export default ToyForm;

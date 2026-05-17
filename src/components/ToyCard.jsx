function ToyCard({ toy, onDeleteToy, onLikeToy }) {
  const handleDelete = () => {
    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          onDeleteToy(toy.id);
        }
      })
      .catch((error) => console.error('Error deleting toy:', error));
  };

  const handleLike = () => {
    const updatedLikes = toy.likes + 1;

    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ likes: updatedLikes }),
    })
      .then((response) => response.json())
      .then((updatedToy) => {
        onLikeToy(updatedToy);
      })
      .catch((error) => console.error('Error updating likes:', error));
  };

  return (
    <div className="toy-card" data-testid="toy-card">
      <h2>{toy.name}</h2>
      <img src={toy.image} alt={toy.name} className="toy-avatar" />
      <p>{toy.likes} Likes </p>
      <button className="like-btn" onClick={handleLike}>
        Like {'<3'}
      </button>
      <button className="donate-btn" onClick={handleDelete}>
        Donate to GoodWill
      </button>
    </div>
  );
}

export default ToyCard;

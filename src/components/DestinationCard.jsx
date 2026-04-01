import "./DestinationCard.css";
import React from "react";

const UNSPLASH_KEY = "lF-30YwQgDHEoRbf18wtS5oIp98mXejXn6BUVnA8Lro";

export default function DestinationCard({
  destination,
  onEdit,
  onDelete,
  onToggleVisited,
}) {
  const { id, name, country, notes, visited } = destination;
  const [photo, setPhoto] = React.useState(null);

  React.useEffect(() => {
    async function fetchPhoto() {
      try {
        const res = await fetch(
          `https://api.unsplash.com/search/photos?query=${name}&client_id=${UNSPLASH_KEY}&per_page=1`,
        );
        const data = await res.json();
        if (data.results.length > 0) {
          setPhoto(data.results[0].urls.regular);
        }
      } catch {
        setPhoto(null);
      }
    }
    fetchPhoto();
  }, [name]);

  function handleRemove() {
    onDelete(id);
  }
  return (
    <div className="card">
      {photo && <img src={photo} alt={name} className="card-image" />}
      <div className="card-header">
        <span className="card-flag"> 🌍 </span>
        <div>
          <h3>{name}</h3>
          <p className="card-country">{country?.name}</p>
        </div>
        {visited && <span className="visited-badge">✓ Visited</span>}
      </div>

      {notes && <p className="card-notes">{notes}</p>}

      <div className="card-actions">
        <button onClick={() => onToggleVisited(id)}>
          {visited ? "Mark Unvisited" : "Mark Visited"}
        </button>
        <button onClick={() => onEdit(destination)}>Edit</button>
        <button onClick={handleRemove} className="btn-delete">
          Delete
        </button>
      </div>
      <div className="travelDate">
        {destination.dateFrom && destination.dateTo && (
          <p>
            🗓️ {destination.dateFrom} → {destination.dateTo}
          </p>
        )}
      </div>
    </div>
  );
}

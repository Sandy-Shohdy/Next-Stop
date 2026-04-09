import "./DestinationCard.css";
import React from "react";

// REVIEW: API key is hardcoded and exposed in client-side code. This is a security risk — anyone can see and abuse this key. Move it to an environment variable (e.g. import.meta.env.VITE_UNSPLASH_KEY).
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
        // REVIEW: No guard for data.results — if the API returns an error object (e.g. rate-limited), data.results will be undefined and .length will throw.
        if (data.results.length > 0) {
          setPhoto(data.results[0].urls.regular);
        }
      } catch {
        setPhoto(null);
      }
    }
    fetchPhoto();
  }, [name]);

  function handleDelete() {
    onDelete(id);
  }
  return (
    <div className="card">
      {/* REVIEW: No loading state or placeholder for the image. The card layout will shift when the image loads (Cumulative Layout Shift issue). */}
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
        <button onClick={handleDelete} className="btn-delete">
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

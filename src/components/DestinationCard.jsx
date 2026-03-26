import "./DestinationCard.css";

export default function DestinationCard({
  destination,
  onEdit,
  onDelete,
  onToggleVisited,
}) {
  const { id, name, country, notes, visited } = destination;
  function handleRemove() {
    onDelete(id);
  }
  return (
    <div className="card">
      <div className="card-header">
        <span className="card-flag">{country?.flag || "🌍"}</span>
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
    </div>
  );
}

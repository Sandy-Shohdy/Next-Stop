import DestinationCard from "../components/DestinationCard";
import DestinationList from "../components/DestinationList";
import "./HomePage.css";

export function HomePage({ destinations, onEdit, onDelete, onToggleVisited }) {
  return (
    <main>
      <div className="page">
        <div className="page-top">
          <h2>My Destinations</h2>
          <button className="btn-primary" onClick={() => setShowForm(true)}>
            + Add
          </button>
        </div>
      </div>
      <DestinationList
        destinations={destinations}
        onEdit={onEdit}
        onDelete={onDelete}
        onToggleVisited={onToggleVisited}
      />
    </main>
  );
}

import DestinationCard from "./DestinationCard";
import "./DestinationList.css";

export default function DestinationList({
  destinations,
  onEdit,
  onDelete,
  onToggleVisited,
}) {
  if (destinations.length === 0) {
    return <p className="empty">No destinations yet. Add one!</p>;
  }

  return (
    <div className="card-grid">
      {destinations.map((destination) => (
        <DestinationCard
          key={destination.id}
          destination={destination}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleVisited={onToggleVisited}
        />
      ))}
    </div>
  );
}

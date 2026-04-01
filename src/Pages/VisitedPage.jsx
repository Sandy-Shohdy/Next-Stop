import DestinationCard from "../components/DestinationCard";
import "./VisitedPage.css";

export default function VisitedPage({
  destinations,
  onEdit,
  onDelete,
  onToggleVisited,
}) {
  const visitedDestinations = destinations.filter(
    (destination) => destination.visited === true,
  );

  return (
    <div className="visited-page">
      <h2 className="page-top">Visited Destinations</h2>
      {visitedDestinations.length === 0 ? (
        <p className="empty">No visited places yet!</p>
      ) : (
        <div className="card-grid">
          {visitedDestinations.map((destination) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleVisited={onToggleVisited}
            />
          ))}
        </div>
      )}
    </div>
  );
}

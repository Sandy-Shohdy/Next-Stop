import DestinationCard from "../components/DestinationCard";
import "./VisitedPage.css";
export default function VisitedPage({
  destinations,
  onEdit,
  onDelete,
  onToggleVisited,
}) {
  const visitedDestinations = destinations.filter(
    (des) => des.visited === true,
  );

  return (
    <div className="visited-page">
      <h2>Visited Destinations</h2>

      {visitedDestinations.length === 0 ? (
        <p className="empty">No visited places yet!</p>
      ) : (
        <div className="card-grid">
          {visitedDestinations.map((des) => (
            <DestinationCard
              key={des.id}
              destination={des}
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

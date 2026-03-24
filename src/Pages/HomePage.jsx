import DestinationList from "../components/DestinationList";
import React from "react";
import "./HomePage.css";

export function HomePage({ destinations, onEdit, onDelete, onToggleVisited }) {
  const [filter, setFilter] = React.useState("all");
  const filtered = destinations.filter((des) => {
    if (filter === "visited") return des.visited === true;
    if (filter === "unvisited") return des.visited === false;
    return true;
  });

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

      <div className="filters">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={filter === "unvisited" ? "active" : ""}
          onClick={() => setFilter("unvisited")}
        >
          Want to Visit
        </button>
        <button
          className={filter === "visited" ? "active" : ""}
          onClick={() => setFilter("visited")}
        >
          Visited
        </button>
      </div>

      <DestinationList
        destinations={filtered}
        onEdit={onEdit}
        onDelete={onDelete}
        onToggleVisited={onToggleVisited}
      />
    </main>
  );
}

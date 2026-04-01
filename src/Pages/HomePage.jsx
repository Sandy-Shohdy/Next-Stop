import DestinationList from "../components/DestinationList";
import DestinationForm from "../components/DestinationForm";
import React from "react";
import "./HomePage.css";
import "../global.css";

export function HomePage({
  destinations,
  onAdd,
  onEdit,
  onDelete,
  onToggleVisited,
}) {
  const [showForm, setShowForm] = React.useState(false);
  const [editingItem, setEditingItem] = React.useState(null);
  const [filter, setFilter] = React.useState("all");

  function handleSubmit(destination) {
    editingItem ? onEdit(destination) : onAdd(destination);

    setShowForm(false);
    setEditingItem(null);
  }

  function handleEdit(destination) {
    setEditingItem(destination);
    setShowForm(true);
  }

  function handleCancel() {
    setShowForm(false);
    setEditingItem(null);
  }

  const filtered = destinations.filter((destination) => {
    if (filter === "visited") return destination.visited === true;
    if (filter === "unvisited") return destination.visited === false;
    return true;
  });

  return (
    <div className="home-page">
      <h2 className="all-destinations">My Destinations</h2>

      <div className="top-bar">
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
        <button className="btn-primary" onClick={() => setShowForm(true)}>
          + Add
        </button>
      </div>

      <DestinationList
        destinations={filtered}
        onEdit={handleEdit}
        onDelete={onDelete}
        onToggleVisited={onToggleVisited}
      />
      {showForm && (
        <DestinationForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          editingItem={editingItem}
        />
      )}
    </div>
  );
}

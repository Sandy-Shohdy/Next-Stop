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

  function handleSubmit(des) {
    if (editingItem) {
      onEdit(des);
    } else {
      onAdd(des);
    }

    setShowForm(false);
    setEditingItem(null);
  }

  function handleEdit(des) {
    setEditingItem(des);
    setShowForm(true);
  }

  function handleCancel() {
    setShowForm(false);
    setEditingItem(null);
  }

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
    </main>
  );
}

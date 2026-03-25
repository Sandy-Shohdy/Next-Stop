import { Routes, Route } from "react-router";
import { HomePage } from "./Pages/HomePage";
import InitialDes from "./InitialDestination.js";
import React from "react";
import Header from "./components/Header.jsx";
import VisitedPage from "./Pages/VisitedPage.jsx";
import AboutPage from "./Pages/AboutPage.jsx";

export default function App() {
  const [destinations, setDestinations] = React.useState(InitialDes);

  function handleAdd(newDestination) {
    setDestinations((prev) => [newDestination, ...prev]);
  }

  function handleEdit(updated) {
    setDestinations((prev) =>
      prev.map((des) => (des.id === updated.id ? updated : des)),
    );
  }

  function handleDelete(id) {
    setDestinations((prev) => prev.filter((des) => des.id !== id));
  }
  function handleToggleVisited(id) {
    setDestinations((prev) =>
      prev.map((des) =>
        des.id === id ? { ...des, visited: !des.visited } : des,
      ),
    );
  }

  return (
    <>
      <Header />

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                destinations={destinations}
                onAdd={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onToggleVisited={handleToggleVisited}
              />
            }
          />
          <Route
            path="/visited"
            element={
              <VisitedPage
                destinations={destinations}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onToggleVisited={handleToggleVisited}
              />
            }
          />

          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>
    </>
  );
}

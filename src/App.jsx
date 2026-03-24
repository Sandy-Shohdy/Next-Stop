import { Routes, Route } from "react-router";
import { HomePage } from "./Pages/HomePage";
import "./App.css";
import InitialDes from "./InitialDestination.js";
import { useState } from "react";
import Header from "./components/Header.jsx";
import VisitedPage from "./Pages/VisitedPage.jsx";

export default function App() {
  const [destinations, setDestinations] = useState(InitialDes);

  function handleEdit(updated) {
    setDestinations(
      destinations.map((des) => (des.id === updated.id ? updated : des)),
    );
  }

  function handleDelete(id) {
    setDestinations(destinations.filter((des) => des.id !== id));
  }

  function handleToggleVisited(id) {
    setDestinations(
      destinations.map((des) =>
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
        </Routes>
      </main>
    </>
  );
}

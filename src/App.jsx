// REVIEW: Imports from "react-router" but main.jsx imports from "react-router-dom". Be consistent — use "react-router-dom" everywhere.
import { Routes, Route } from "react-router";
import { HomePage } from "./Pages/HomePage";
import React from "react";
import Header from "./components/Header.jsx";
import VisitedPage from "./Pages/VisitedPage.jsx";
import AboutPage from "./Pages/AboutPage.jsx";
import "./global.css";

export default function App() {
  const [destinations, setDestinations] = React.useState(() => {
    // REVIEW: No try/catch around JSON.parse — if localStorage data is corrupted this will crash the app.
    const saved = localStorage.getItem("destinations");
    return saved ? JSON.parse(saved) : [];
  });

  const [loading, setLoading] = React.useState(true);
  const [alert, setAlert] = React.useState(null);

  React.useEffect(() => {
    localStorage.setItem("destinations", JSON.stringify(destinations));
  }, [destinations]);

  // REVIEW: This useEffect reads localStorage again, but the useState initializer above already loaded that data. This is redundant and causes a double-parse.
  React.useEffect(() => {
    const saved = localStorage.getItem("destinations");
    if (saved && JSON.parse(saved).length > 0) {
      setLoading(false);
      return;
    }

    const fetchInitialDestinations = async () => {
      try {
        const starterCountries = [
          "Argentina",
          "Iceland",
          "Spain",
          "Egypt",
          "South Africa",
        ];

        const results = await Promise.all(
          starterCountries.map((country) =>
            fetch(
              `https://restcountries.com/v3.1/name/${country}?fields=name,capital,region`,
            ).then((response) => response.json()),
          ),
        );

        const initial = results
          .map((countryData, index) => {
            const country = countryData[0];
            if (!country) return null;
            return {
              id: (index + 1).toString(),
              // REVIEW: country.capital could be undefined or empty for some countries (e.g. territories). This will crash with "Cannot read properties of undefined".
              name: country.capital[0],
              country: {
                name: country.name.common,
                capital: country.capital[0],
                region: country.region,
              },
              notes: "",
              visited: false,
            };
          })
          .filter(Boolean);

        setDestinations(initial);
      } catch (error) {
        console.error("Failed to fetch initial destinations:", error);
        setDestinations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialDestinations();
  }, []);

  function showAlert(message) {
    setAlert(message);
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }

  function handleAdd(destination) {
    setDestinations((prev) => [destination, ...prev]);
    showAlert("Destination added!");
  }

  function handleEdit(updated) {
    setDestinations((prev) =>
      prev.map((d) => (d.id === updated.id ? updated : d)),
    );
    showAlert("Destination updated!");
  }

  function handleDelete(id) {
    setDestinations((prev) => prev.filter((d) => d.id !== id));
    showAlert("Destination deleted!");
  }

  function handleToggleVisited(id) {
    setDestinations((prev) =>
      prev.map((d) => (d.id === id ? { ...d, visited: !d.visited } : d)),
    );
  }

  if (loading) {
    return (
      <p style={{ color: "white", textAlign: "center", marginTop: "4rem" }}>
        Loading destinations...
      </p>
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

          <Route
            path="*"
            element={
              <p
                style={{
                  color: "white",
                  textAlign: "center",
                  marginTop: "4rem",
                }}
              >
                Page not found
              </p>
            }
          />
        </Routes>
      </main>
      {alert && <div className="alert">{alert}</div>}
    </>
  );
}

import { Routes, Route } from "react-router";
import { HomePage } from "./Pages/HomePage";
import React from "react";
import Header from "./components/Header.jsx";
import VisitedPage from "./Pages/VisitedPage.jsx";
import AboutPage from "./Pages/AboutPage.jsx";
import "./global.css";

export default function App() {
  const [destinations, setDestinations] = React.useState(() => {
    const saved = localStorage.getItem("destinations");
    return saved ? JSON.parse(saved) : [];
  });

  const [loading, setLoading] = React.useState(true);
  const [alert, setAlert] = React.useState(null);

  React.useEffect(() => {
    localStorage.setItem("destinations", JSON.stringify(destinations));
  }, [destinations]);

  React.useEffect(() => {
    const saved = localStorage.getItem("destinations");
    if (saved && JSON.parse(saved).length > 0) {
      setLoading(false);
      return;
    }

    async function fetchCountryData(countryName) {
      try {
        const res = await fetch(
          `https://api.first.org/data/v1/countries?q=${encodeURIComponent(countryName)}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          },
        );

        if (!res.ok) {
          console.warn(`Failed to fetch ${countryName}: ${res.status}`);
          return null;
        }

        const json = await res.json();
        if (!json.data || Object.keys(json.data).length === 0) {
          return null;
        }

        // Get the first country from the results
        const firstCountry = Object.values(json.data)[0];
        return firstCountry;
      } catch (error) {
        console.warn(`Error fetching ${countryName}:`, error?.message || error);
        return null;
      }
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
          starterCountries.map((c) => fetchCountryData(c)),
        );

        const initial = results
          .map((country, index) => {
            if (!country || !country.country) return null;

            return {
              id: (index + 1).toString(),
              name: country.country, 
              country: {
                name: country.country,
                capital: country.name || "",
                region: "",
              },
              notes: "",
              visited: false,
              dateFrom: "",
              dateTo: "",
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

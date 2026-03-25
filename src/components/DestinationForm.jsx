import React, { useEffect } from "react";
import "./DestinationForm.css";

export default function DestinationForm({ onSubmit, onCancel, editingItem }) {
  const [name, setName] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [errors, setErrors] = React.useState({});
  const [countryInput, setCountryInput] = React.useState("");
  const [suggestions, setSuggestions] = React.useState([]);
  const [selectedCountry, setSelectedCountry] = React.useState(null);

  function validate() {
    const errs = {};
    if (!name.trim()) errs.name = "Name is required";
    return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const newDestination = {
      id: editingItem ? editingItem.id : Date.now().toString(),
      name: name.trim(),
      notes: notes.trim(),
      country: selectedCountry || null,
      visited: editingItem ? editingItem.visited : false,
    };
    onSubmit(newDestination);
  }

  async function handleCountrySearch(value) {
    setCountryInput(value);
    setSelectedCountry(null);
    if (value.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await fetch(
        `https://restcountries.com/v3.1/name/${value}?fields=name,flags,capital,region`,
      );
      const data = await res.json();
      setSuggestions(
        data.slice(0, 5).map((c) => ({
          name: c.name.common,
          flag: c.flags?.emoji,
          capital: c.capital?.[0] || "",
          region: c.region || "",
        })),
      );
    } catch { 
      setSuggestions([]);
    }
  }

  function pickCountry(country) {
    setSelectedCountry(country);
    setCountryInput(country.name);
    setSuggestions([]);
  }

  useEffect(() => {
    if (editingItem) {
      setName(editingItem.name);
      setNotes(editingItem.notes || "");
      setCountryInput(editingItem.country?.name || "");
      setSelectedCountry(editingItem.country || null);
    }
  }, [editingItem]);

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{editingItem ? "Edit Destination" : "Add Destination"}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Destination Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Kyoto"
            />
            {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
          </div>

          <div>
            <label>Country</label>
            <input
              type="text"
              value={countryInput}
              onChange={(e) => handleCountrySearch(e.target.value)}
              placeholder="Search country..."
            />
            {suggestions.length > 0 && (
              <ul>
                {suggestions.map((c) => (
                  <li
                    key={c.name}
                    onClick={() => pickCountry(c)}
                    style={{ cursor: "pointer" }}
                  >
                    {c.flag} {c.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <label>Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any notes..."
            />
          </div>
          <button type="submit">{editingItem ? "Save" : "Add"}</button>

          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

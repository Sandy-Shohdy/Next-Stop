import React from "react";
import "./DestinationForm.css";

export default function DestinationForm({ onSubmit, onCancel, editingItem }) {
  const [name, setName] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [errors, setErrors] = React.useState({});
  const [countryInput, setCountryInput] = React.useState("");
  const [suggestions, setSuggestions] = React.useState([]);
  const [selectedCountry, setSelectedCountry] = React.useState(null);
  const [dateFrom, setDateFrom] = React.useState("");
  const [dateTo, setDateTo] = React.useState("");

  // REVIEW: Validation only checks the name field. Country, dates, and date-range logic (dateTo should not be before dateFrom) are not validated at all.
  function validate() {
    const errs = {};
    if (!name.trim()) errs.name = "Destination's Name is required";
    return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const destination = {
      id: editingItem ? editingItem.id : Date.now().toString(),
      name: name.trim(),
      notes: notes.trim(),
      country: selectedCountry || null,
      visited: editingItem ? editingItem.visited : false,
      dateFrom,
      dateTo,
    };
    onSubmit(destination);
  }

  // REVIEW: No debounce — this fires an API request on every keystroke. Should debounce (e.g. 300ms) to avoid hammering the API and potential rate-limiting.
  async function handleCountrySearch(value) {
    setCountryInput(value);
    setSelectedCountry(null);
    if (value.trim().length < 1) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await fetch(
        `https://restcountries.com/v3.1/name/${value}?fields=name,capital,region`,
      );
      const data = await res.json();
      setSuggestions(
        data.slice(0, 7).map((c) => ({
          name: c.name.common,
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

  React.useEffect(() => {
    if (editingItem) {
      setName(editingItem.name);
      setNotes(editingItem.notes || "");
      setCountryInput(editingItem.country?.name || "");
      setSelectedCountry(editingItem.country || null);
      // REVIEW: editingItem.dateFrom and editingItem.dateTo may be undefined (older items created without dates). Passing undefined to a controlled input causes a React warning. Use fallback: editingItem.dateFrom || ""
      setDateFrom(editingItem.dateFrom);
      setDateTo(editingItem.dateTo);
    } else {
      setName("");
      setNotes("");
      setCountryInput("");
      setSelectedCountry(null);
      setDateFrom("");
      setDateTo("");
      setErrors({});
    }
  }, [editingItem]);

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onCancel]);

  return (
    // REVIEW: Stray {" "} whitespace node between overlay and modal div — appears to be leftover from formatting. Remove it.
    <div className="modal-overlay" onClick={onCancel}>
      {" "}
      <div className="modal" onClick={(e) => e.stopPropagation()}>
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
                  <li key={c.name} onClick={() => pickCountry(c)}>
                    {c.name}
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

          <div className="travel-date">
            <div className="date-input-group">
              <label>From</label>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </div>
            <div className="date-input-group">
              <label>To</label>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              {editingItem ? "Save" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

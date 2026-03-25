import "./AboutPage.css";

export default function AboutPage() {
  return (
    <div className="about-page">
      <div className="about-hero">
        <h1>✈️ Travel Bucket List</h1>
        <p>Your personal travel companion — track the places you dream of visiting and the ones you've already explored.</p>
      </div>

      <div className="about-grid">
        <div className="about-card">
          <h3>🛠️ Built With</h3>
          <ul>
            <li>React</li>
            <li>React Router</li>
            <li>RestCountries API</li>
            <li>Wikipedia API</li>
            <li>Vite</li>
          </ul>
        </div>

        <div className="about-card">
          <h3>⚛️ React Concepts</h3>
          <ul>
            <li>useState & useEffect</li>
            <li>Props & components</li>
            <li>React Router & useParams</li>
            <li>API fetching</li>
            <li>Form validation</li>
          </ul>
        </div>

        <div className="about-card">
          <h3>✨ Features</h3>
          <ul>
            <li>Add, edit, delete destinations</li>
            <li>Mark places as visited</li>
            <li>Filter by status</li>
            <li>Live country search</li>
            <li>Country detail page</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
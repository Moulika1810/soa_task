
import { useEffect, useState } from "react";
import {
  getAllPools,
  addPool,
  deletePool,
} from "./services/swimmingPoolApi";
import "./App.css";

const emptyForm = {
  poolName: "",
  location: "",
  lengthMeters: "",
  heated: false,
};

function App() {
  const [pools, setPools] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function loadPools() {
    setLoading(true);
    setError("");

    try {
      const response = await getAllPools();
      setPools(response.data);
    } catch (err) {
      setError(
        "Unable to load pools. Check that Spring Boot is running on port 8082 and CORS is configured."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPools();
  }, []);

  function handleChange(event) {
    const { name, value, checked, type } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setError("");

    if (!form.poolName.trim() || !form.location.trim()) {
      setError("Please enter the pool name and location.");
      return;
    }

    const length =
      form.lengthMeters === "" ? null : Number(form.lengthMeters);

    if (length !== null && (!Number.isFinite(length) || length <= 0)) {
      setError("Length must be a positive number.");
      return;
    }

    const pool = {
      poolName: form.poolName.trim(),
      location: form.location.trim(),
      lengthMeters: length,
      heated: form.heated,
    };

    try {
      await addPool(pool);
      setMessage("Swimming pool added successfully!");
      setForm({ ...emptyForm });
      await loadPools();
    } catch (err) {
      setError(
        "Unable to add pool. Check the backend and try again."
      );
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this swimming pool?"
    );

    if (!confirmed) return;

    setMessage("");
    setError("");

    try {
      await deletePool(id);
      setMessage("Swimming pool deleted successfully!");
      await loadPools();
    } catch (err) {
      setError("Unable to delete pool. Please try again.");
    }
  }

  return (
    <main className="app">
      <header className="hero">
        <div className="wave">🌊</div>
        <p className="eyebrow">POOL MANAGEMENT SYSTEM</p>
        <h1>Swimming Pools</h1>
        <p className="subtitle">
          Manage your swimming pool details in one place.
        </p>
      </header>

      <section className="panel">
        <h2>Add a Swimming Pool</h2>

        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <label>
              Pool Name *
              <input
                name="poolName"
                value={form.poolName}
                onChange={handleChange}
                placeholder="Enter pool name"
                required
              />
            </label>

            <label>
              Location *
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Enter location"
                required
              />
            </label>

            <label>
              Length (meters)
              <input
                type="number"
                name="lengthMeters"
                value={form.lengthMeters}
                onChange={handleChange}
                placeholder="e.g. 25"
                min="0.01"
                step="any"
              />
            </label>

            <label className="heated-option">
              <input
                type="checkbox"
                name="heated"
                checked={form.heated}
                onChange={handleChange}
              />
              Heated swimming pool
            </label>
          </div>

          <button className="primary" type="submit">
            + Add Pool
          </button>
        </form>
      </section>

      <section className="panel">
        <div className="table-heading">
          <div>
            <h2>Swimming Pool Records</h2>
            <p className="subtitle">Your registered pools</p>
          </div>

          <button
            className="secondary"
            type="button"
            onClick={loadPools}
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <p>Loading pools...</p>
        ) : pools.length === 0 ? (
          <p className="empty">
            No swimming pools found. Add your first pool above.
          </p>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Pool Name</th>
                  <th>Location</th>
                  <th>Length</th>
                  <th>Heated</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {pools.map((pool) => (
                  <tr key={pool.id}>
                    <td>{pool.id}</td>
                    <td>{pool.poolName}</td>
                    <td>{pool.location}</td>
                    <td>
                      {pool.lengthMeters == null
                        ? "—"
                        : `${pool.lengthMeters} m`}
                    </td>
                    <td>{pool.heated ? "Yes" : "No"}</td>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(pool.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <footer>React + Spring Boot + PostgreSQL</footer>
    </main>
  );
}

export default App;

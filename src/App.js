import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [installPrompt, setInstallPrompt] = useState(null);
  const [currentPage, setCurrentPage] = useState("home");

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    const handleBeforeInstallPrompt = (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setInstallPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = () => {
    if (installPrompt) {
      installPrompt.prompt();
      installPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
        setInstallPrompt(null);
      });
    }
  };

  const navigateToPage = (page) => {
    setCurrentPage(page);
  };

  const navigateToHome = () => {
    setCurrentPage("home");
  };

  // Page Components
  const WeatherPage = () => (
    <div className="page weather-page">
      <div className="page-header">
        <button className="back-btn" onClick={navigateToHome}>
          ← Back
        </button>
        <h1>🌤️ Weather</h1>
      </div>
      <div className="page-content">
        <div className="weather-card">
          <h2>Current Conditions</h2>
          <div className="weather-info">
            <div className="temp">22°C</div>
            <div className="condition">Partly Cloudy</div>
          </div>
        </div>
        <div className="weather-card">
          <h2>Wind</h2>
          <div className="wind-info">
            <div className="wind-speed">15 knots</div>
            <div className="wind-direction">NE</div>
          </div>
        </div>
        <div className="weather-card">
          <h2>Marine Forecast</h2>
          <div className="forecast">
            <p>Moderate seas 1-2m</p>
            <p>Visibility: Good</p>
            <p>Swell: 1m from SW</p>
          </div>
        </div>
      </div>
    </div>
  );

  const NavigationPage = () => (
    <div className="page navigation-page">
      <div className="page-header">
        <button className="back-btn" onClick={navigateToHome}>
          ← Back
        </button>
        <h1>🧭 Navigation</h1>
      </div>
      <div className="page-content">
        <div className="nav-card">
          <h2>GPS Position</h2>
          <div className="coordinates">
            <div>Lat: 34°04'N</div>
            <div>Lon: 118°15'W</div>
          </div>
        </div>
        <div className="nav-card">
          <h2>Course & Speed</h2>
          <div className="course-info">
            <div className="course">Course: 045°</div>
            <div className="speed">Speed: 6.5 kts</div>
          </div>
        </div>
        <div className="nav-card">
          <h2>Waypoint</h2>
          <div className="waypoint">
            <div>Next: Marina Del Rey</div>
            <div>Distance: 12.3 nm</div>
            <div>ETA: 14:30</div>
          </div>
        </div>
      </div>
    </div>
  );

  const ChartsPage = () => (
    <div className="page charts-page">
      <div className="page-header">
        <button className="back-btn" onClick={navigateToHome}>
          ← Back
        </button>
        <h1>🗺️ Charts</h1>
      </div>
      <div className="page-content">
        <div className="chart-card">
          <h2>Active Chart</h2>
          <div className="chart-placeholder">
            <div className="map-icon">🗺️</div>
            <p>Chart: US Waters - West Coast</p>
            <p>Scale: 1:50,000</p>
          </div>
        </div>
        <div className="chart-card">
          <h2>Available Charts</h2>
          <div className="chart-list">
            <div className="chart-item">📍 San Diego Harbor</div>
            <div className="chart-item">📍 Los Angeles Harbor</div>
            <div className="chart-item">📍 San Francisco Bay</div>
            <div className="chart-item">📍 Monterey Bay</div>
          </div>
        </div>
        <div className="chart-card">
          <h2>Tide Information</h2>
          <div className="tide-info">
            <div>High: 14:25 (1.8m)</div>
            <div>Low: 20:15 (0.3m)</div>
          </div>
        </div>
      </div>
    </div>
  );

  const LogbookPage = () => (
    <div className="page logbook-page">
      <div className="page-header">
        <button className="back-btn" onClick={navigateToHome}>
          ← Back
        </button>
        <h1>📖 Logbook</h1>
      </div>
      <div className="page-content">
        <div className="logbook-card">
          <h2>Current Trip</h2>
          <div className="trip-info">
            <div>Started: 09:00</div>
            <div>Distance: 25.4 nm</div>
            <div>Duration: 4h 15m</div>
          </div>
        </div>
        <div className="logbook-card">
          <h2>Recent Entries</h2>
          <div className="log-entries">
            <div className="log-entry">
              <div className="log-time">13:15</div>
              <div className="log-text">Passed Point Loma lighthouse</div>
            </div>
            <div className="log-entry">
              <div className="log-time">12:30</div>
              <div className="log-text">Wind increased to 18 knots</div>
            </div>
            <div className="log-entry">
              <div className="log-time">11:45</div>
              <div className="log-text">Changed course to 060°</div>
            </div>
          </div>
        </div>
        <div className="logbook-card">
          <h2>Quick Entry</h2>
          <div className="quick-entry">
            <input
              type="text"
              placeholder="Add logbook entry..."
              className="log-input"
            />
            <button className="log-btn">Add Entry</button>
          </div>
        </div>
      </div>
    </div>
  );

  // Home Page Component
  const HomePage = () => (
    <>
      {/* Wind flag at the top */}
      <div className="wind-flag">
        <div className="flag-pole"></div>
        <div className="flag"></div>
      </div>

      {/* Animated ocean background */}
      <div className="ocean">
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
        <div className="wave wave3"></div>
      </div>

      {/* Main sailing content */}
      <div className="sailing-scene">
        <div className="sailboat">
          {/* Sailboat hull */}
          <div className="hull"></div>

          {/* Mast */}
          <div className="mast"></div>

          {/* Main sail */}
          <div className="main-sail"></div>

          {/* Jib sail */}
          <div className="jib-sail"></div>

          {/* Flag at top of mast */}
          <div className="mast-flag"></div>
        </div>

        {/* Welcome content */}
        <div className="welcome-content">
          <h1 className="app-title">⛵ SailPWA</h1>
          <p className="welcome-text">Set sail for adventure!</p>

          <div className="status-indicators">
            <div className={`status ${isOnline ? "online" : "offline"}`}>
              <div className="status-dot"></div>
              {isOnline ? "Online" : "Offline"}
            </div>
          </div>

          {installPrompt && (
            <button className="install-button" onClick={handleInstallClick}>
              ⚓ Install App
            </button>
          )}
        </div>
      </div>

      {/* Cool action buttons at the bottom */}
      <div className="action-buttons">
        <button
          className="action-btn weather-btn"
          onClick={() => navigateToPage("weather")}
        >
          <span className="btn-icon">🌤️</span>
          <span className="btn-text">Weather</span>
        </button>
        <button
          className="action-btn navigation-btn"
          onClick={() => navigateToPage("navigation")}
        >
          <span className="btn-icon">🧭</span>
          <span className="btn-text">Navigation</span>
        </button>
        <button
          className="action-btn charts-btn"
          onClick={() => navigateToPage("charts")}
        >
          <span className="btn-icon">🗺️</span>
          <span className="btn-text">Charts</span>
        </button>
        <button
          className="action-btn logbook-btn"
          onClick={() => navigateToPage("logbook")}
        >
          <span className="btn-icon">📖</span>
          <span className="btn-text">Logbook</span>
        </button>
      </div>
    </>
  );

  return (
    <div className="App">
      {currentPage === "home" && <HomePage />}
      {currentPage === "weather" && <WeatherPage />}
      {currentPage === "navigation" && <NavigationPage />}
      {currentPage === "charts" && <ChartsPage />}
      {currentPage === "logbook" && <LogbookPage />}
    </div>
  );
}

export default App;

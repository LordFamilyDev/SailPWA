import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [installPrompt, setInstallPrompt] = useState(null);
  const [currentPage, setCurrentPage] = useState("home");

  // Sailing Simulator State
  const [boatPosition, setBoatPosition] = useState({
    lat: 34.0522,
    lng: -118.2437,
  });
  const [destinationPosition, setDestinationPosition] = useState({
    lat: 34.1,
    lng: -118.2,
  });
  const [isDragging, setIsDragging] = useState(null);
  const [currentWindSpeed, setCurrentWindSpeed] = useState(12);
  const [currentWindDirection, setCurrentWindDirection] = useState(45);

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

  // Speed Guide Data for US6850 PARADIGM SHIFT
  const speedGuideData = {
    6: [
      { twa: 43.0, btv: 5.14, vmg: 3.76, aws: 10.36, awa: 23.2 },
      { twa: 52, btv: 5.73, vmg: 3.53, aws: 10.54, awa: 26.6 },
      { twa: 60, btv: 6.03, vmg: 3.02, aws: 10.42, awa: 29.9 },
      { twa: 70, btv: 6.22, vmg: 2.13, aws: 10.01, awa: 34.3 },
      { twa: 75, btv: 6.24, vmg: 1.61, aws: 9.71, awa: 36.6 },
      { twa: 80, btv: 6.22, vmg: 1.08, aws: 9.36, awa: 39.1 },
      { twa: 90, btv: 6.35, vmg: 0.0, aws: 8.73, awa: 43.3 },
      { twa: 110, btv: 6.24, vmg: 2.13, aws: 7.02, awa: 53.4 },
      { twa: 120, btv: 6.1, vmg: 3.05, aws: 6.05, awa: 59.2 },
      { twa: 135, btv: 5.52, vmg: 3.9, aws: 4.43, awa: 73.3 },
      { twa: 142.7, btv: 5.05, vmg: 4.02, aws: 3.64, awa: 85.6 },
      { twa: 150, btv: 4.57, vmg: 3.96, aws: 3.06, awa: 101.8 },
      { twa: 165, btv: 3.48, vmg: 3.36, aws: 2.79, awa: 146.2 },
      { twa: 180, btv: 3.01, vmg: 3.01, aws: 2.99, awa: 180.0 },
    ],
    8: [
      { twa: 40.9, btv: 6.04, vmg: 4.56, aws: 13.14, awa: 23.1 },
      { twa: 52, btv: 6.72, vmg: 4.14, aws: 13.2, awa: 28.1 },
      { twa: 60, btv: 6.95, vmg: 3.47, aws: 12.91, awa: 32.0 },
      { twa: 70, btv: 7.08, vmg: 2.42, aws: 12.33, awa: 37.3 },
      { twa: 75, btv: 7.1, vmg: 1.84, aws: 11.97, awa: 40.0 },
      { twa: 80, btv: 7.16, vmg: 1.24, aws: 11.51, awa: 42.0 },
      { twa: 90, btv: 7.29, vmg: 0.0, aws: 10.75, awa: 47.2 },
      { twa: 110, btv: 7.34, vmg: 2.51, aws: 8.77, awa: 58.3 },
      { twa: 120, btv: 7.25, vmg: 3.63, aws: 7.65, awa: 64.8 },
      { twa: 135, btv: 6.75, vmg: 4.77, aws: 5.76, awa: 79.1 },
      { twa: 146.7, btv: 6.04, vmg: 5.05, aws: 4.44, awa: 98.3 },
      { twa: 150, btv: 5.82, vmg: 5.04, aws: 4.15, awa: 105.5 },
      { twa: 165, btv: 4.59, vmg: 4.43, aws: 3.76, awa: 146.6 },
      { twa: 180, btv: 4.0, vmg: 4.0, aws: 4.0, awa: 180.0 },
    ],
    10: [
      { twa: 39.2, btv: 6.55, vmg: 5.08, aws: 15.53, awa: 22.9 },
      { twa: 52, btv: 7.24, vmg: 4.46, aws: 15.36, awa: 29.3 },
      { twa: 60, btv: 7.42, vmg: 3.71, aws: 14.95, awa: 33.8 },
      { twa: 70, btv: 7.53, vmg: 2.58, aws: 14.27, awa: 39.9 },
      { twa: 75, btv: 7.56, vmg: 1.96, aws: 13.88, awa: 43.0 },
      { twa: 80, btv: 7.59, vmg: 1.32, aws: 13.14, awa: 44.8 },
      { twa: 90, btv: 7.76, vmg: 0.0, aws: 12.34, awa: 51.1 },
      { twa: 110, btv: 7.9, vmg: 2.7, aws: 10.18, awa: 63.9 },
      { twa: 120, btv: 7.85, vmg: 3.93, aws: 9.06, awa: 71.7 },
      { twa: 135, btv: 7.52, vmg: 5.32, aws: 7.09, awa: 86.4 },
    ],
    12: [
      { twa: 39.2, btv: 7.2, vmg: 5.58, aws: 18.25, awa: 22.9 },
      { twa: 52, btv: 7.89, vmg: 4.87, aws: 18.14, awa: 29.3 },
      { twa: 60, btv: 8.12, vmg: 4.06, aws: 17.68, awa: 33.8 },
      { twa: 70, btv: 8.25, vmg: 2.83, aws: 16.89, awa: 39.9 },
      { twa: 75, btv: 8.29, vmg: 2.15, aws: 16.44, awa: 43.0 },
      { twa: 80, btv: 8.33, vmg: 1.45, aws: 15.64, awa: 44.8 },
      { twa: 90, btv: 8.52, vmg: 0.0, aws: 14.67, awa: 51.1 },
      { twa: 110, btv: 8.68, vmg: 2.97, aws: 12.13, awa: 63.9 },
      { twa: 120, btv: 8.64, vmg: 4.32, aws: 10.8, awa: 71.7 },
      { twa: 135, btv: 8.27, vmg: 5.85, aws: 8.45, awa: 86.4 },
    ],
  };

  // Calculate distance between two coordinates
  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 3440.065; // Earth's radius in nautical miles
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Calculate bearing between two coordinates
  const calculateBearing = (lat1, lng1, lat2, lng2) => {
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const lat1Rad = (lat1 * Math.PI) / 180;
    const lat2Rad = (lat2 * Math.PI) / 180;
    const y = Math.sin(dLng) * Math.cos(lat2Rad);
    const x =
      Math.cos(lat1Rad) * Math.sin(lat2Rad) -
      Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(dLng);
    const bearing = (Math.atan2(y, x) * 180) / Math.PI;
    return (bearing + 360) % 360;
  };

  // Get boat speed based on wind speed and angle
  const getBoatSpeed = (windSpeed, windAngle) => {
    const data = speedGuideData[windSpeed] || speedGuideData[12];
    const closestPoint = data.reduce((prev, curr) =>
      Math.abs(curr.twa - windAngle) < Math.abs(prev.twa - windAngle)
        ? curr
        : prev
    );
    return closestPoint.btv;
  };

  const SailingSimPage = () => {
    const distance = calculateDistance(
      boatPosition.lat,
      boatPosition.lng,
      destinationPosition.lat,
      destinationPosition.lng
    );
    const bearing = calculateBearing(
      boatPosition.lat,
      boatPosition.lng,
      destinationPosition.lat,
      destinationPosition.lng
    );
    const windAngle = Math.abs(bearing - currentWindDirection);
    const boatSpeed = getBoatSpeed(currentWindSpeed, windAngle);
    const eta = distance / boatSpeed;

    const handlePositionChange = (type, field, value) => {
      const numValue = parseFloat(value);
      if (isNaN(numValue)) return;

      if (type === "boat") {
        setBoatPosition((prev) => ({ ...prev, [field]: numValue }));
      } else {
        setDestinationPosition((prev) => ({ ...prev, [field]: numValue }));
      }
    };

    const centerOnBoat = () => {
      // This would center the map on the boat position
      // For now, we'll just show an alert
      alert(
        `Centering map on boat position: ${boatPosition.lat.toFixed(
          4
        )}, ${boatPosition.lng.toFixed(4)}`
      );
    };

    return (
      <div className="page sailing-sim-page">
        <div className="page-header">
          <button className="back-btn" onClick={navigateToHome}>
            ← Back
          </button>
          <h1>⛵ Sailing Simulator</h1>
          <div className="boat-info">
            <span>PARADIGM SHIFT - US6850</span>
          </div>
        </div>
        <div className="page-content">
          <div className="sim-container">
            {/* Interactive Map Area */}
            <div className="map-container">
              <div className="map-area">
                <div
                  className="boat-marker"
                  style={{
                    left: `${((boatPosition.lng + 118.5) / 0.5) * 100}%`,
                    top: `${((34.2 - boatPosition.lat) / 0.2) * 100}%`,
                  }}
                  draggable
                  onDragStart={() => setIsDragging("boat")}
                  onDragEnd={(e) => {
                    const rect = e.target.parentElement.getBoundingClientRect();
                    const x = (e.clientX - rect.left) / rect.width;
                    const y = (e.clientY - rect.top) / rect.height;
                    setBoatPosition({
                      lat: 34.2 - y * 0.2,
                      lng: -118.5 + x * 0.5,
                    });
                    setIsDragging(null);
                  }}
                >
                  ⛵
                </div>
                <div
                  className="destination-marker"
                  style={{
                    left: `${((destinationPosition.lng + 118.5) / 0.5) * 100}%`,
                    top: `${((34.2 - destinationPosition.lat) / 0.2) * 100}%`,
                  }}
                  draggable
                  onDragStart={() => setIsDragging("destination")}
                  onDragEnd={(e) => {
                    const rect = e.target.parentElement.getBoundingClientRect();
                    const x = (e.clientX - rect.left) / rect.width;
                    const y = (e.clientY - rect.top) / rect.height;
                    setDestinationPosition({
                      lat: 34.2 - y * 0.2,
                      lng: -118.5 + x * 0.5,
                    });
                    setIsDragging(null);
                  }}
                >
                  📍
                </div>
              </div>
              <button className="center-boat-btn" onClick={centerOnBoat}>
                🎯
              </button>
            </div>

            {/* Control Panel */}
            <div className="control-panel">
              <div className="position-controls">
                <div className="position-group">
                  <h3>⛵ Boat Position</h3>
                  <div className="coordinate-inputs">
                    <div className="coord-input">
                      <label>Latitude:</label>
                      <input
                        type="number"
                        step="0.0001"
                        value={boatPosition.lat.toFixed(4)}
                        onChange={(e) =>
                          handlePositionChange("boat", "lat", e.target.value)
                        }
                      />
                    </div>
                    <div className="coord-input">
                      <label>Longitude:</label>
                      <input
                        type="number"
                        step="0.0001"
                        value={boatPosition.lng.toFixed(4)}
                        onChange={(e) =>
                          handlePositionChange("boat", "lng", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="position-group">
                  <h3>📍 Destination</h3>
                  <div className="coordinate-inputs">
                    <div className="coord-input">
                      <label>Latitude:</label>
                      <input
                        type="number"
                        step="0.0001"
                        value={destinationPosition.lat.toFixed(4)}
                        onChange={(e) =>
                          handlePositionChange(
                            "destination",
                            "lat",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="coord-input">
                      <label>Longitude:</label>
                      <input
                        type="number"
                        step="0.0001"
                        value={destinationPosition.lng.toFixed(4)}
                        onChange={(e) =>
                          handlePositionChange(
                            "destination",
                            "lng",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="wind-controls">
                <div className="wind-group">
                  <h3>💨 Wind Conditions</h3>
                  <div className="wind-inputs">
                    <div className="wind-input">
                      <label>Wind Speed (knots):</label>
                      <select
                        value={currentWindSpeed}
                        onChange={(e) =>
                          setCurrentWindSpeed(parseInt(e.target.value))
                        }
                      >
                        <option value={6}>6 knots</option>
                        <option value={8}>8 knots</option>
                        <option value={10}>10 knots</option>
                        <option value={12}>12 knots</option>
                      </select>
                    </div>
                    <div className="wind-input">
                      <label>Wind Direction (°):</label>
                      <input
                        type="number"
                        min="0"
                        max="360"
                        value={currentWindDirection}
                        onChange={(e) =>
                          setCurrentWindDirection(parseInt(e.target.value))
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="sailing-data">
                <h3>📊 Sailing Data</h3>
                <div className="data-grid">
                  <div className="data-item">
                    <span className="data-label">Distance:</span>
                    <span className="data-value">{distance.toFixed(2)} nm</span>
                  </div>
                  <div className="data-item">
                    <span className="data-label">Bearing:</span>
                    <span className="data-value">{bearing.toFixed(1)}°</span>
                  </div>
                  <div className="data-item">
                    <span className="data-label">Wind Angle:</span>
                    <span className="data-value">{windAngle.toFixed(1)}°</span>
                  </div>
                  <div className="data-item">
                    <span className="data-label">Boat Speed:</span>
                    <span className="data-value">
                      {boatSpeed.toFixed(1)} kts
                    </span>
                  </div>
                  <div className="data-item">
                    <span className="data-label">ETA:</span>
                    <span className="data-value">{eta.toFixed(1)} hrs</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

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
        <button
          className="action-btn sailing-sim-btn"
          onClick={() => navigateToPage("sailing-sim")}
        >
          <span className="btn-icon">⛵</span>
          <span className="btn-text">Sailing Sim</span>
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
      {currentPage === "sailing-sim" && <SailingSimPage />}
    </div>
  );
}

export default App;

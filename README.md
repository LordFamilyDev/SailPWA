# SailPWA - Sailing Progressive Web App ⛵

A comprehensive sailing companion app built with React that works offline and can be installed on your device. Features weather information, navigation tools, charts, logbook, and a sailing simulator with real performance data for the US6850 PARADIGM SHIFT.

## Features

- 🌤️ **Weather** - Current conditions, wind data, and marine forecasts
- 🧭 **Navigation** - GPS position, course, speed, and waypoint information
- 🗺️ **Charts** - Interactive sailing charts and tide information
- 📖 **Logbook** - Trip logging and entry management
- ⛵ **Sailing Simulator** - Interactive sailing simulator with real boat performance data
- 📱 **PWA Support** - Install as a native app, works offline
- 🎨 **Beautiful UI** - Animated sailing scene with modern design

## Prerequisites

Before you begin, you'll need to have Node.js and npm installed on your system.

### Installing Node.js and npm

#### Windows:

1. Go to [nodejs.org](https://nodejs.org/)
2. Download the LTS version (recommended)
3. Run the installer and follow the setup wizard
4. npm is included with Node.js installation

#### macOS:

```bash
# Using Homebrew (recommended)
brew install node

# Or download from nodejs.org
```

#### Linux (Ubuntu/Debian):

```bash
# Using NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# Or using package manager
sudo apt update
sudo apt install nodejs npm
```

### Verify Installation

Check that Node.js and npm are installed correctly:

```bash
node --version
npm --version
```

You should see version numbers for both commands.

## Installation

1. **Clone or download the project**

   ```bash
   git clone <repository-url>
   cd SailPWA
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

## Development

### Running in Development Mode

To start the development server:

```bash
npm start
```

This will:

- Start the React development server
- Open your browser to `http://localhost:3000`
- Enable hot reloading (changes will automatically refresh the browser)
- Show any compilation errors in the console

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (irreversible)

## Building for Production

To create a production build:

```bash
npm run build
```

This creates a `build` folder with optimized files ready for deployment.

## PWA Features

This app is a Progressive Web App (PWA) that includes:

- **Service Worker** - Enables offline functionality
- **Web App Manifest** - Allows installation on devices
- **Responsive Design** - Works on desktop and mobile
- **Offline Support** - Core functionality works without internet

### Installing as an App

When you visit the app in a supported browser, you'll see an "Install App" button. Click it to install SailPWA as a native app on your device.

## Project Structure

```
SailPWA/
├── public/
│   ├── index.html
│   ├── manifest.json
│   ├── service-worker.js
│   └── screenshots/
├── src/
│   ├── App.js          # Main application component
│   ├── App.css         # Application styles
│   ├── index.js        # React entry point
│   └── serviceWorkerRegistration.js
├── package.json        # Dependencies and scripts
└── README.md          # This file
```

## Key Components

- **HomePage** - Animated sailing scene with navigation buttons
- **WeatherPage** - Weather conditions and marine forecasts
- **NavigationPage** - GPS data and navigation information
- **ChartsPage** - Chart selection and tide information
- **LogbookPage** - Trip logging and entry management
- **SailingSimPage** - Interactive sailing simulator with boat performance data

## Sailing Simulator

The sailing simulator includes real performance data for the US6850 PARADIGM SHIFT sailboat. Features:

- Interactive map with draggable boat and destination markers
- Wind speed and direction controls
- Real-time calculations for:
  - Distance to destination
  - Bearing
  - Wind angle
  - Boat speed (based on polar data)
  - Estimated time of arrival (ETA)

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers with PWA support

## Troubleshooting

### Common Issues

1. **"npm is not recognized"**

   - Ensure Node.js is properly installed
   - Restart your terminal/command prompt
   - Check that npm is in your PATH

2. **Port 3000 already in use**

   - The app will automatically try to use port 3001
   - Or specify a different port: `PORT=3002 npm start`

3. **Module not found errors**

   - Delete `node_modules` folder and `package-lock.json`
   - Run `npm install` again

4. **Build errors**
   - Check that all dependencies are installed
   - Ensure you're using a compatible Node.js version (14+)

### Development Tips

- Use browser developer tools to test PWA features
- Test offline functionality by turning off network in dev tools
- Use the "Application" tab in Chrome DevTools to inspect service worker and manifest

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**Happy Sailing!** ⛵🌊

## How to Deploy the Build

scp -i "C:\Users\Dan/.ssh/cakeServe" -r "C:\LS\SailPWA\build\*" fire@firecake.us:/opt/containers/caddy/www/SailPWA

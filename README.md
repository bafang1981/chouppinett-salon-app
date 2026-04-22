# StrandPro Salon Management - PWA

Professional salon management system with Progressive Web App capabilities.

## Features

### Core Functionality
- **Dashboard** - Overview of salon performance
- **Appointments** - Schedule and manage client appointments
- **Client Management** - Client database and history
- **Inventory** - Track salon supplies and products
- **Staff Management** - Employee scheduling and attendance
- **Revenue & Payments** - Financial tracking and reporting
- **Expenses** - Business expense management

### PWA Features
- **Offline Support** - Works without internet connection
- **Installable** - Add to home screen on mobile devices
- **Push Notifications** - Appointment reminders and updates
- **Responsive Design** - Optimized for mobile and desktop
- **Fast Loading** - Cached assets for instant access

## Installation

### Development Setup
1. Clone or download the project
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start development server:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:8080` in your browser

### Production Deployment
1. Build the project (no build step needed for static site)
2. Deploy to any static hosting service (Vercel, Netlify, GitHub Pages, etc.)
3. Ensure HTTPS is enabled (required for PWA features)

## PWA Setup

### Icons
Add your StrandPro logo icons to the `icons/` directory:
- `icon-72x72.png`
- `icon-96x96.png`
- `icon-128x128.png`
- `icon-144x144.png`
- `icon-152x152.png`
- `icon-192x192.png`
- `icon-384x384.png`
- `icon-512x512.png`

### Manifest Configuration
The PWA manifest is configured in `manifest.webmanifest`:
- App name: "StrandPro Salon Management"
- Theme color: Golden (#C9922A)
- Display mode: Standalone
- Orientation: Any

### Service Worker
The service worker (`sw.js`) handles:
- Caching static assets
- Offline fallbacks
- Push notifications
- Background sync

## Browser Support

### Full Support
- Chrome 88+
- Edge 88+
- Firefox 85+
- Safari 14+

### Limited Support
- Older browsers may not support PWA installation
- iOS Safari has some limitations but works well

## Development

### Project Structure
```
strandpro-salon-app/
├── index.html              # Main application
├── manifest.webmanifest    # PWA manifest
├── sw.js                   # Service worker
├── pwa-install.js          # PWA installation logic
├── package.json            # Dependencies and scripts
├── icons/                  # PWA icons
└── README.md              # This file
```

### Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server with auto-reload
- `npm run serve` - Alternative server option

## Configuration

### Theme Colors
- Primary Gold: `#C9922A`
- Light Gold: `#E5B84A`
- Background: `#0D0B09`
- Surface: `#1e1b17`

### Notifications
Push notifications are supported for:
- Appointment reminders
- Low inventory alerts
- Staff notifications
- System updates

## Security

### Authentication
- Local storage based authentication
- Password hashing
- Session management
- Role-based access control

### Data Protection
- All data stored locally
- No external API calls
- Offline-first architecture
- Secure service worker scope

## Performance

### Optimization
- Asset caching
- Lazy loading
- Minimal JavaScript
- Optimized images
- Efficient CSS

### Lighthouse Scores
- Performance: 95+
- Accessibility: 90+
- Best Practices: 95+
- SEO: 85+

## Troubleshooting

### Common Issues

#### PWA Not Installing
1. Ensure HTTPS is enabled
2. Check service worker registration
3. Verify manifest is accessible
4. Clear browser cache and retry

#### Offline Mode Not Working
1. Check service worker is active
2. Verify assets are cached
3. Test with network throttling
4. Check browser console for errors

#### Push Notifications Not Working
1. Request notification permissions
2. Check service worker registration
3. Verify manifest configuration
4. Test with different browsers

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support and questions:
- Check the troubleshooting section
- Review browser console for errors
- Verify all files are deployed correctly
- Test in different browsers

---

**StrandPro** - Professional Salon Management System
© 2024 All rights reserved

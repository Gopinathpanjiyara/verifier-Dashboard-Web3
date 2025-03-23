# Document Verifier Platform

A modern web application for document verification and authentication, built with React and Tailwind CSS.

## Features

- Document queue management
- Document verification workflow
- User management with role-based access control
- Reporting and analytics
- Blockchain verification integration
- Security settings and MFA support
- Dark mode support
- Session management

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Getting Started

1. Clone the repository:
```bash
git clone [repository-url]
cd verifier
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will be available at http://localhost:3000

## Default Login Credentials

For testing purposes, you can use the following credentials:

- Admin:
  - Email: admin@verify.com
  - Password: admin123

- Senior Verifier:
  - Email: senior@verify.com
  - Password: senior123

- Junior Verifier:
  - Email: junior@verify.com
  - Password: junior123

## Project Structure

```
verifier/
├── public/               # Static files
├── src/
│   ├── components/       # Reusable components
│   ├── contexts/         # React context providers
│   ├── pages/           # Page components
│   └── App.jsx          # Main application component
├── package.json         # Project dependencies
└── README.md           # Project documentation
```

## Built With

- React - Frontend library
- React Router - Navigation
- Framer Motion - Animations
- Tailwind CSS - Styling
- Heroicons - Icons
- Context API - State management

## Development

The application uses several modern React patterns and features:

- Context API for state management
- React Router for navigation
- Custom hooks for reusable logic
- Tailwind CSS for styling
- Framer Motion for animations

## Security Features

- Role-based access control
- Session management
- Two-factor authentication support
- Password policies
- IP restrictions
- Brute force protection
- Login monitoring

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

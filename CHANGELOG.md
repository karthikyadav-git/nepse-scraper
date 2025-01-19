# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), 
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] -
### Added
- Added extended `documentation`.
- `docs` route added.
- `DatabaseManager` tool added to make data handling easy.

### Changed
- Symbol based route changed from `/nepse/:symbol` to `/symbol/:symbol`.
- Clear `routes` are separated.
- `SQL` commands are separated into files.

### Fixed
- `Symbols` are case insensative now.

## [1.0.0] - 2024-12-06
### Added
- Initial release of the full-stack Node.js application.
- Basic routing setup for the API.
- Middleware for request logging and error handling.
- `/nepse/:symbol` route for fetching stock prices from SQLite database.
- Integration with a scrapper for data updates.
- README file for project documentation.

### Changed
- Improved directory management for easier understanding.

### Fixed
- Resolved an issue where API routes were not correctly mounted on the Express app.

---

## [Unreleased]
### Planned Features
- Scrap `sharesansar.com` for stock info.
- Store the scrapped data into a database.
- Optimize scrapper logic for better performance.
- Give data on GET requests.

---


# NEPSE Scrapper

## Description
An express app that scraps the NEPSE stock data.

## Working Process
- Scraps the NEPSE stock info from `sharesansar.com`.
- Stores the data in a SQLite Database.
- Provides the NEPSE data according to the stock `Symbol` upon GET requests.

> 📌 The stocks database is updated on every request from the client to give the client the latest data.

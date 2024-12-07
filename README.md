# NEPSE Scrapper API

## Description
An express app that scraps the NEPSE stock data and returns stock info in json format.

## Working Process
- Scraps the NEPSE stock info from `sharesansar.com`.
- Stores the data in a SQLite Database.
- Provides the NEPSE data according to the stock `Symbol` upon GET requests.

> 📌 The stocks database is updated on every request from the client to give the client the latest data.

## How to use?
Send a GET request with the symbol of the stock to https://api.karthikyadav.com/nepse/{symbol}
Example:
```js
GET 'https://api.karthikyadav.com/nepse/ADBL'
```

const axios = require('axios');
const cheerio = require('cheerio');
const Database = require('better-sqlite3');

const db = new Database('./databases/stocks.db');

// separate scraped data array into individual stock array
function separator(array, length) {
  const stocksSeparated = [];
  for(let i = 0; i < length; i += 10) {
      stocksSeparated.push(array.slice(i, i+10));
  }
  return stocksSeparated;
}

async function scraper() {
  try {
    // scrape the data
    const { data } = await axios.get('https://www.sharesansar.com/live-trading');
    const $ = cheerio.load(data);

    const stockData = $('tbody tr td').text();
    const stockArray = stockData.split(' ').filter(line => line !== '').join('').split('\n').filter(line => line !== '');
    const separatedStocks = separator(stockArray, stockArray.length);

    // create a database table
    db.exec(`CREATE TABLE IF NOT EXISTS stockPrices(
      id INTEGER,
      symbol TEXT UNIQUE,
      LTP REAL,
      point_change REAL,
      percent_change REAL,
      open REAL,
      high REAL,
      low REAL,
      volume INTEGER,
      prev_close REAL
      )`);
    
    // delete previous data table
    db.exec(`DELETE FROM stockPrices`);

    // store the stock info in the database table
    const input = db.prepare(`INSERT INTO stockPrices(id, symbol, LTP, point_change, percent_change, open, high, low, volume, prev_close) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
    for(let i = 0; i < separatedStocks.length; i++) {
      input.run(separatedStocks[i]);
    }

    console.log("Stock prices updated successfully.");
  } catch (error) {
    console.error("Error loading stock prices:", error);
  }
}

module.exports = scraper;

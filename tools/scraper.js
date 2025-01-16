const axios = require('axios');
const cheerio = require('cheerio');
const DatabaseManager = require('./databaseManager');

const dbMan = new DatabaseManager('stocks.db')

// separate scraped data array into individual stock array
function arrayByStock(array, length) {
  const individualStocksArray = [];
  for(let i = 0; i < length; i += 10) {
      individualStocksArray.push(array.slice(i, i+10));
  }
  return individualStocksArray;
}

async function scraper() {
  try {
    // scrape the data
    const { data } = await axios.get('https://www.sharesansar.com/live-trading');
    const $ = cheerio.load(data);

    const rawStocksData = $('tbody tr td').text();
    const stocksDataArray = rawStocksData.split(' ').filter(line => line !== '').join('').split('\n').filter(line => line !== '');
    const dataArrayByStock = arrayByStock(stocksDataArray, stocksDataArray.length);

    dbMan.createStocksTable();
    dbMan.deleteStocksTable();

    for(let i = 0; i < dataArrayByStock.length; i++) {
      dbMan.insertStockData(dataArrayByStock[i]);
    }

    console.log("Stock prices updated successfully.");
  } catch (error) {
    console.error("Error updating stock prices! Previously loaded data will be served.");
  }
}

module.exports = scraper;

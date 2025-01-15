CREATE TABLE IF NOT EXISTS stockPrices(
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
      )
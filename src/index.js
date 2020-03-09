const puppeteer = require("puppeteer");

const agent = {
  QUERIES: {
    URL: "https://1337x.to/category-search/%query%/%category%/1/",
    QUERY_PLACEHOLDER: "%query%",
    CATEGORY_PLACEHOLDER: "%category%"
  },
  DATE_REGEX: /(th|\.|\')/gm,
  SELECTORS: {
    QUERY: {
      RESULTS: ".table-list tbody tr",
      RESULT_NAME: ".name",
      DETAIL_PAGE_URL: ".name a:nth-child(2)",
      SEEDS: ".seeds",
      LEECHES: ".leeches",
      SIZE: ".size",
      DATE: ".coll-date"
    },
    DETAIL: {
      MAGNET_LINK: ".torrent-detail-page a"
    }
  },
  categories: {
    movies: "Movies",
    tv: "TV"
  }
};

const queryResults = [];

async function getPropertyValue(element, selector, property = "innerText") {
  try {
    return await (
      await (await element.$(selector)).getProperty(property)
    ).jsonValue();
  } catch {
    throw new Error(`Can't find anything with selector: ${selector}`);
  }
}

async function makeTheQuery() {
  const encodedQuery = encodeURIComponent("Trollhunter (2010)");
  // const encodedQuery = encodeURIComponent("Better Call Saul S05E03");
  //   const encodedQuery = encodeURIComponent("1917 (2019)");
  let url = agent.QUERIES.URL;
  url = url.replace(agent.QUERIES.QUERY_PLACEHOLDER, encodedQuery);
  url = url.replace(
    agent.QUERIES.CATEGORY_PLACEHOLDER,
    agent.categories.movies
  );

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const results = await page.$$(agent.SELECTORS.QUERY.RESULTS);
  const response = [];

  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    const name = await getPropertyValue(
      result,
      agent.SELECTORS.QUERY.RESULT_NAME
    );
    const url = await getPropertyValue(
      result,
      agent.SELECTORS.QUERY.DETAIL_PAGE_URL,
      "href"
    );
    const seeds = await getPropertyValue(result, agent.SELECTORS.QUERY.SEEDS);
    const leeches = await getPropertyValue(
      result,
      agent.SELECTORS.QUERY.LEECHES
    );
    const size = await getPropertyValue(result, agent.SELECTORS.QUERY.SIZE);
    const date = await getPropertyValue(result, agent.SELECTORS.QUERY.DATE);
    // const poster = await PuppeteerUtility.getPropertyValue(
    //   result,
    //   constants.RESULTS_QUERY_SELECTORS.QUERY.RESULT_POSTER_URL,
    //   "src"
    // );
    // const year = await PuppeteerUtility.getPropertyValue(
    //   result,
    //   constants.RESULTS_QUERY_SELECTORS.QUERY.RESULT_YEAR
    // );

    console.log({
      name,
      url,
      seeds,
      leeches,
      size,
      date: formatDate(agent, date)
    });

    queryResults.push({
      name,
      url,
      seeds,
      leeches,
      size,
      date: formatDate(agent, date)
    });
  }

  await browser.close();

  getMagnetLink(1);
}

const formatDate = (agent, dateString) => {
  return new Date(dateString.replace(agent.DATE_REGEX, ""));
};

const getMagnetLink = async index => {
  const magnet = queryResults[index];

  console.log("getting magnet link for " + magnet.name);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(magnet.url);

  const magnetLink = await (
    await (await page.$(agent.SELECTORS.DETAIL.MAGNET_LINK)).getProperty("href")
  ).jsonValue();
  console.log(magnetLink);

  return magnetLink;

  // const magnetLink = await page.$$(agent.SELECTORS.DETAIL.RESULTS);
};

// const sortBySeeders = () => {
//   const data = queryResults;
//   results.filter();
// };

makeTheQuery();

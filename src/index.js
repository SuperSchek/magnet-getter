const puppeteer = require("puppeteer");

const agent = {
  QUERIES: {
    URL: "https://1337x.to/category-search/%query%/%category%/1/",
    QUERY_PLACEHOLDER: "%query%",
    CATEGORY_PLACEHOLDER: "%category%"
  },
  SELECTORS: {
    RESULTS: ".table-list tbody tr",
    RESULT_NAME: ".name",
    DETAIL_PAGE_URL: ".name a:nth-child(2)",
    SEEDS: ".seeds",
    LEECHES: ".leeches",
    SIZE: ".size",
    DATE: ".coll-date"
  },
  categories: {
    movies: "Movies",
    tv: "TV"
  }
};

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
  const encodedQuery = encodeURIComponent("Better Call Saul S05E03");
  //   const encodedQuery = encodeURIComponent("1917 (2019)");
  let url = agent.QUERIES.URL;
  url = url.replace(agent.QUERIES.QUERY_PLACEHOLDER, encodedQuery);
  url = url.replace(agent.QUERIES.CATEGORY_PLACEHOLDER, agent.categories.tv);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const results = await page.$$(agent.SELECTORS.RESULTS);
  const response = [];

  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    const name = await getPropertyValue(result, agent.SELECTORS.RESULT_NAME);
    const url = await getPropertyValue(
      result,
      agent.SELECTORS.DETAIL_PAGE_URL,
      "href"
    );
    const seeds = await getPropertyValue(result, agent.SELECTORS.SEEDS);
    const leeches = await getPropertyValue(result, agent.SELECTORS.LEECHES);
    const size = await getPropertyValue(result, agent.SELECTORS.SIZE);
    const date = await getPropertyValue(result, agent.SELECTORS.DATE);
    // const poster = await PuppeteerUtility.getPropertyValue(
    //   result,
    //   constants.RESULTS_QUERY_SELECTORS.RESULT_POSTER_URL,
    //   "src"
    // );
    // const year = await PuppeteerUtility.getPropertyValue(
    //   result,
    //   constants.RESULTS_QUERY_SELECTORS.RESULT_YEAR
    // );

    console.log({ name, url, seeds, leeches, size, date });

    response.push({
      name
    });
  }

  await browser.close();
}

makeTheQuery();

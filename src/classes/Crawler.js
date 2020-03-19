const puppeteer = require("puppeteer");
const _merge = require("lodash/merge");

class Crawler {
  constructor(options, database) {
    this._options = options;
    this._db = database;
  }

  /**
   *
   * @param {string} query
   * @param {string} [type='tvShows'] - Either 'tvShows' or 'movies'
   * @param {string} agentSlug
   */
  getQueryResults(query, type, agentSlug) {
    const results = [];

    if (agentSlug !== null) {
      const agent = this._db
        .get("agents")
        .find({ slug: agentSlug })
        .value();
      this._queryAgent(query, type, agent);
    } else {
      const agents = this._db.get("agents").value();
      agents.forEach(agent => {
        this._queryAgent(query, type, agent);
      });
    }

    // const encodedQuery = encodeURIComponent(query);
    //   // const encodedQuery = encodeURIComponent("Better Call Saul S05E03");
    //   //   const encodedQuery = encodeURIComponent("1917 (2019)");
    //   let url = agent.QUERIES.URL;
    //   url = url.replace(agent.QUERIES.QUERY_PLACEHOLDER, encodedQuery);
    //   url = url.replace(
    //     agent.QUERIES.CATEGORY_PLACEHOLDER,
    //     agent.categories.movies
    //   );

    //   const browser = await puppeteer.launch();
    //   const page = await browser.newPage();
    //   await page.goto(url);

    //   const results = await page.$$(agent.SELECTORS.QUERY.RESULTS);
    //   const response = [];

    //   for (let i = 0; i < results.length; i++) {
    //     const result = results[i];
    //     const name = await getPropertyValue(
    //       result,
    //       agent.SELECTORS.QUERY.RESULT_NAME
    //     );
    //     const url = await getPropertyValue(
    //       result,
    //       agent.SELECTORS.QUERY.DETAIL_PAGE_URL,
    //       "href"
    //     );
    //     const seeds = await getPropertyValue(result, agent.SELECTORS.QUERY.SEEDS);
    //     const leeches = await getPropertyValue(
    //       result,
    //       agent.SELECTORS.QUERY.LEECHES
    //     );
    //     const size = await getPropertyValue(result, agent.SELECTORS.QUERY.SIZE);
    //     const date = await getPropertyValue(result, agent.SELECTORS.QUERY.DATE);
    //     // const poster = await PuppeteerUtility.getPropertyValue(
    //     //   result,
    //     //   constants.RESULTS_QUERY_SELECTORS.QUERY.RESULT_POSTER_URL,
    //     //   "src"
    //     // );
    //     // const year = await PuppeteerUtility.getPropertyValue(
    //     //   result,
    //     //   constants.RESULTS_QUERY_SELECTORS.QUERY.RESULT_YEAR
    //     // );

    //     console.log({
    //       name,
    //       url,
    //       seeds,
    //       leeches,
    //       size,
    //       date: formatDate(agent, date)
    //     });

    //     queryResults.push({
    //       name,
    //       url,
    //       seeds,
    //       leeches,
    //       size,
    //       date: formatDate(agent, date)
    //     });
    //   }

    //   await browser.close();

    // getMagnetLink(1);
  }

  /**
   *
   * @param {number} url
   * @param {number} querySelector
   */
  getMagnetLink(url, querySelector) {}

  async _queryAgent(rawQuery, type, agent) {
    // const browser = await puppeteer.launch();
    // const page = await browser.newPage();
    const url = this._buildQueryUrl(rawQuery, type, agent);

    const {
      selectors: {
        query: { results }
      }
    } = agent;
    console.log(results);

    // this._getResults(÷/)

    // await page.goto(url);

    // const results = await page.$$(agent.selectors.query.results);

    // await browser.close();

    // console.log(results);

    // return results;
  }

  _buildQueryUrl(query, type, agent) {
    const encodedQuery = encodeURIComponent(query);
    let url = agent.queries.url;
    url = url.replace(agent.queries.queryPlaceholder, encodedQuery);
    url = url.replace(
      agent.queries.categoryPlaceholder,
      agent.queries.categories[type]
    );

    return url;
  }

  _filterResults(type) {
    const rules = _merge(this._options.rules.common, this._options.rules[type]);
  }
}

module.exports = Crawler;

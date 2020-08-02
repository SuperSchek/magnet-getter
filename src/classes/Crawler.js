const puppeteer = require("puppeteer");
const _merge = require("lodash/merge");
const { parse } = require("yargs");

class Crawler {
  constructor(options, database) {
    this._options = options;
    this._db = database;
    this._browser = null;
  }

  /**
   *
   * @param {string} query
   * @param {string} [type='tvShows'] - Either 'tvShows' or 'movies'
   * @param {string} agentSlug
   */
  getQueryResults(query, type, agentSlug) {
    if (agentSlug !== null) {
      const agent = this._db.get("agents").find({ slug: agentSlug }).value();
      this._queryAgent(query, type, agent);
    } else {
      const agents = this._db.get("agents").value();
      agents.forEach((agent) => {
        this._queryAgent(query, type, agent);
      });
    }
  }

  /**
   *
   * @param {number} url
   * @param {number} querySelector
   */
  getMagnetLink(url, querySelector) {}

  /**
   * Mutates the passed array to a sorted version by key
   *
   * @param {array} results - Array of objects
   * @param {string} key
   */
  _sortByKey(results, key, order = "asc") {
    if (results[0][key]) {
      if (order === "asc") {
        results.sort((a, b) => (a[key] > b[key] ? 1 : -1));
      } else if (order === "desc") {
        results.sort((a, b) => (a[key] < b[key] ? 1 : -1));
      } else {
        throw new Error(
          `sortByKey: Expected 'order' to be 'asc' or 'desc'. Got: '${order}'`
        );
      }
    } else {
      throw new Error(
        `sortByKey: Passed key '${order}' does not seem to be present.`
      );
    }
  }

  _filterResults(type) {
    const rules = _merge(this._options.rules.common, this._options.rules[type]);
  }

  async _queryAgent(query, type, agent) {
    const url = this._buildQueryUrl(query, type, agent);
    const results = await this._getResults(url, agent);
    const parsedResults = await this._parseResults(results, agent);

    this._sortByKey(parsedResults, "size");

    console.log(parsedResults);

    this._browser.close();
    // return results;
  }

  async _getResults(
    url,
    {
      querySelectors: {
        queryPageSelectors: { resultsSelector, resultNameSelector },
      },
    }
  ) {
    this._browser = await puppeteer.launch();
    const page = await this._browser.newPage();
    await page.goto(url);
    const results = await page.$$(resultsSelector);

    return results;
  }

  async _parseResults(results, { querySelectors: { queryPageSelectors } }) {
    const parsedResults = [];

    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      const name = await this._getPropertyValue(
        result,
        queryPageSelectors.resultNameSelector
      );
      const url = await this._getPropertyValue(
        result,
        queryPageSelectors.detailPageUrlSelector,
        "href"
      );
      const seeds = await this._getPropertyValue(
        result,
        queryPageSelectors.seedsSelector
      );
      const leeches = await this._getPropertyValue(
        result,
        queryPageSelectors.leechesSelector
      );
      const size = await this._getPropertyValue(
        result,
        queryPageSelectors.sizeSelector
      );
      const date = await this._getPropertyValue(
        result,
        queryPageSelectors.dateSelector
      );

      parsedResults.push({
        name,
        url,
        seeds,
        leeches,
        size: this._parseFileSize(size),
        date,
      });
    }

    return parsedResults;
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

  /**
   *
   * @param {string} fileSize
   */
  _parseFileSize(fileSize) {
    const sizeString = fileSize.toLowerCase();
    if (sizeString.indexOf("mb") !== -1) {
      const megaBytes = sizeString.replace("mb", "").replace(",", "");
      return megaBytes * 1;
    } else if (sizeString.indexOf("gb") !== -1) {
      const gigaBytes = sizeString.replace("gb", "").replace(",", "");
      return gigaBytes * 1000;
    }
  }

  async _getPropertyValue(element, selector, property = "innerText") {
    try {
      return await (
        await (await element.$(selector)).getProperty(property)
      ).jsonValue();
    } catch {
      throw new Error(`Can't find anything with selector: ${selector}`);
    }
  }
}

module.exports = Crawler;

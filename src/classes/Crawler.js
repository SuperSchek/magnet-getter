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
    this._filterResults(type);
  }

  /**
   *
   * @param {number} url
   * @param {number} querySelector
   */
  getMagnetLink(url, querySelector) {}

  _filterResults(type) {
    const rules = _merge(this._options.rules.common, this._options.rules[type]);
    // const rules = this._options.rules;

    console.log(rules);
  }
}

module.exports = Crawler;

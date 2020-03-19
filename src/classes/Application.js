// const express = require("express");
// const bodyParser = require("body-parser");
// const app = express();
const _merge = require("lodash/merge");
const constants = require("../constants");
const Crawler = require("./Crawler");
const Database = require("./Database");
// const Router = require("../classes/Router");

class Application {
  constructor() {
    this._options = null;
    this._db = null;
    this._crawler = null;
  }

  /**
   * Returns the options object
   * @public
   *
   * @returns {object}
   */
  get options() {
    return this._options;
  }

  get crawler() {
    return this._crawler;
  }

  get db() {
    return this._db;
  }

  /**
   * Checks whether the payload contains an object and if so
   */
  set options(payload) {
    if (payload instanceof Object) {
      this._options = this._mergeOptions(payload);
    }
  }

  set crawler(payload) {
    this._crawler = payload;
  }

  set db(payload) {
    this._db = payload;
  }

  _mergeOptions(options) {
    return _merge(constants.defaultOptions, options);
  }

  /**
   * Handles initialization
   *
   * @param {object} options
   */
  init(options) {
    this.options = options;
    this.db = new Database(this.options);
    this.crawler = new Crawler(this.options, this.db);

    console.log("Starting app!");
  }

  /**
   *
   * @param {string} query
   * @param {string} [type='tvShows'] - Either 'tvShows' or 'movies'
   * @param {string} agentSlug
   */
  query(query, type = "tvShows", agentSlug = null) {
    this.crawler.getQueryResults(query, type, agentSlug);
  }

  // // /**
  // //  * Serves up an instance of the API
  // //  * @public
  // //  *
  // //  * @description Sets the options, loads routes, starts listening on specified port and prints success message to the console if all is well.
  // //  *
  // //  * @param {object} options
  // //  */
  // // serve(options) {
  // //   this._parseOptions(options);
  // //   this._initializeExpress();
  // //   this._initializeRoutes();
  // //   console.log(`Serving IMDb-scrAPI on port ${this.options.port}`);
  // // }
  // // _initializeExpress() {
  // //   app.use(
  // //     bodyParser.urlencoded({
  // //       extended: true
  // //     })
  // //   );
  // //   app.use(bodyParser.json());
  // //   app.listen(this.options.port);
  // // }
  // // _initializeRoutes() {
  // //   const router = express.Router();
  // //   app.use(this.options.routesPrefix, router);
  // //   new Router().loadRoutes(router, this.options.routes);
  // // }
}

module.exports = Application;

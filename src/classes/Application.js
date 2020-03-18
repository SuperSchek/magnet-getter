// const express = require("express");
// const bodyParser = require("body-parser");
// const app = express();
const _merge = require("lodash/merge");
const constants = require("../constants");
// const Router = require("../classes/Router");

class Application {
  constructor() {
    this._options = null;
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

  /**
   * Checks whether the payload contains an object and if so
   */
  set options(payload) {
    if (payload instanceof Object) {
      this._options = this._mergeOptions(payload);
    }
  }

  _mergeOptions(options) {
    return _merge(constants.DEFAULT_OPTIONS, options);
  }

  /**
   * Handles initialization
   *
   * @param {object} options
   */
  init(options) {
    this.options = options;
    console.log(this.options);

    console.log("Starting app!");
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

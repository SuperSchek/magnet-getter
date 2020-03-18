const constants = require("../constants");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

class Database {
  constructor(options) {
    this._options = options;
    this._adapter = null;
    this._db = null;
  }

  get adapter() {
    return this._adapter;
  }

  get db() {
    return this._db;
  }

  get options() {
    return this._options;
  }

  set adapter(payload) {
    this._adapter = payload;
  }

  set db(payload) {
    this._db = payload;
  }

  init() {
    this.adapter = new FileSync(this.options.databaseFile);
    console.log(this.adapter);

    this.db = low(this.adapter);

    this.loadSeeds();
    // Check if DB is present
    // If so, nothing to init. Just listen
    // If not load seeds
  }

  loadSeeds() {
    this.db.defaults({ agents: [] }).write();
  }
}

module.exports = Database;

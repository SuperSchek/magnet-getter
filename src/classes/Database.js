const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

class Database {
  constructor(options) {
    this._options = options;
    this._adapter = null;
    this._db = null;

    this._init();
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

  _init() {
    this.adapter = new FileSync(this.options.databaseFile);
    this.db = low(this.adapter);

    const agents = this.db.get("agents").value();

    if (agents === undefined) {
      this._loadSeeds();
    }

    // Check if DB is present
    // If so, nothing to _init. Just listen
    // If not load seeds
  }

  /**
   * Popolates a new DB with seed data
   */
  _loadSeeds() {
    this.db.defaults({ agents: [] }).write();

    const defaultAgents = require("../../db/seeds/agents.json");

    defaultAgents.forEach(agent => {
      this.db
        .get("agents")
        .push(agent)
        .write();
    });
  }
}

module.exports = Database;

class InMemoryDatabase {
  constructor() {
    this.tables = {};
  }

  init() {
    if (!this.tables.alumnos) {
      this.tables.alumnos = [];
    }
  }

  table(name) {
    if (!this.tables[name]) {
      this.tables[name] = [];
    }
    return this.tables[name];
  }
}

module.exports = { InMemoryDatabase };

import faker from "faker";
const Application = require("../Application");
const Crawler = require("../Crawler");
const Database = require("../Database");

jest.mock("../Database");
jest.mock("../Crawler");
jest.mock("../../constants");

const createMockOptions = overrrides => {
  return {
    name: faker.lorem.word(),
    slug: faker.lorem.slug(),
    url: faker.internet.url(),
    ...overrrides
  };
};

describe("init", () => {
  it("calls the _mergeOptions method", () => {
    // Assign
    const app = new Application();
    const options = createMockOptions();
    jest.spyOn(app, "_mergeOptions");

    // Act
    app.init(options);

    // Assert
    expect(app._mergeOptions).toHaveBeenCalledWith(options);
  });
  it.each`
    property       | mockedClass
    ${"_crawler"}  | ${Crawler}
    ${"_database"} | ${Database}
  `(
    `adds a $mockedClass instance to the Application`,
    ({ property, mockedClass }) => {
      // Assign
      const app = new Application();
      const options = createMockOptions();

      // Act
      app.init(options);

      // Assert
      expect(app[property]).toBeDefined();
      expect(app[property]).toBeInstanceOf(mockedClass);
    }
  );
});
describe("query", () => {
  it("calls getQueryResults method on Crawler instance with passed params", () => {
    // Assign
    const app = new Application();
    const crawler = new Crawler();
    const query = faker.lorem.words();
    const type = faker.lorem.word();
    const agentSlug = faker.lorem.word();
    app.crawler = crawler;
    jest.spyOn(crawler, "getQueryResults");

    // Act
    app.query(query, type, agentSlug);

    // Assert
    expect(app.crawler.getQueryResults).toHaveBeenCalledWith(
      query,
      type,
      agentSlug
    );
  });
});

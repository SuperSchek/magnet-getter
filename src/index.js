const Application = require("./classes/Application");

const app = new Application();

app.init({ port: 3001 });
app.query("Better Call Saul S05E05", "tvShows", "1337x");

module.exports = Application;

// const puppeteer = require("puppeteer");
// const constants = require("./constants");

// const agent = {
//   QUERIES: {
//     URL: "https://1337x.to/category-search/%query%/%category%/1/",
//     QUERY_PLACEHOLDER: "%query%",
//     CATEGORY_PLACEHOLDER: "%category%"
//   },
//   DATE_REGEX: /(th|\.|\')/gm,
//   SELECTORS: {
//     QUERY: {
//       RESULTS: ".table-list tbody tr",
//       RESULT_NAME: ".name",
//       DETAIL_PAGE_URL: ".name a:nth-child(2)",
//       SEEDS: ".seeds",
//       LEECHES: ".leeches",
//       SIZE: ".size",
//       DATE: ".coll-date"
//     },
//     DETAIL: {
//       MAGNET_LINK: ".torrent-detail-page a"
//     }
//   },
//   categories: {
//     movies: "Movies",
//     tv: "TV"
//   }
// };

// const queryResults = [];

// async function getPropertyValue(element, selector, property = "innerText") {
//   try {
//     return await (
//       await (await element.$(selector)).getProperty(property)
//     ).jsonValue();
//   } catch {
//     throw new Error(`Can't find anything with selector: ${selector}`);
//   }
// }

// const formatDate = (agent, dateString) => {
//   return new Date(dateString.replace(agent.DATE_REGEX, ""));
// };

// const getMagnetLink = async index => {
//   const magnet = queryResults[index];

//   console.log("getting magnet link for " + magnet.name);

//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto(magnet.url);

//   const magnetLink = await (
//     await (await page.$(agent.SELECTORS.DETAIL.MAGNET_LINK)).getProperty("href")
//   ).jsonValue();
//   console.log(magnetLink);

//   return magnetLink;

//   // const magnetLink = await page.$$(agent.SELECTORS.DETAIL.RESULTS);
// };

// // const sortBySeeders = () => {
// //   const data = queryResults;
// //   results.filter();
// // };

// makeTheQuery();

const Application = require("./classes/Application");

const app = new Application();

app.init({ port: 3001 });
// app.query("Yesterday (2019)", "movies", "limetorrents");
app.query("The Man Who Killed Don Quixote (2018)", "movies", "limetorrents");
// app.query("The Man Who Killed Don Quixote", "movies", "1337x");
// app.query("Westworld S03E02", "tvShows", "1337x");
// app.query("Better Call Saul S05E05", "tvShows", "1337x");

module.exports = Application;

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

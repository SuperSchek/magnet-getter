// const puppeteer = require('puppeteer')



// const agent = {
//     QUERIES: {
//         URL: "https://1337x.to/category-search/%query%/%category%/1/",
//         QUERY_PLACEHOLDER: "%query%",
//         CATEGORY_PLACEHOLDER: "%category%"
//     },
//     categories: {
//         movies: "Movies",
//         tv: "TV"
//     }
// }


// async function makeTheQuery() {
//     // const encodedQuery = encodeURIComponent('1917 (2019)');
//     // let url = agent.QUERIES.URL;
//     // url = url.replace(agent.QUERIES.QUERY_PLACEHOLDER, encodedQuery);
//     // url = url.replace(agent.QUERIES.CATEGORY_PLACEHOLDER, agent.categories.movies);

//     const browser = await puppeteer.launch({ ignoreDefaultArgs: ['--disable-extensions'], args: ['--no-sandbox'] });
//     const page = await browser.newPage();
//     await page.goto("https://1337x.to/category-search/1917%202019/Movies/1/");
//     // await page.goto(url);

//     // await page.screenshot({ path: 'example.png' });

//     await browser.close();
// }

// makeTheQuery()

const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto('http://owlcommand.com');
    await page.screenshot({ path: 'example.png' });

    await browser.close();
})();
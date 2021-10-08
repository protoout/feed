// import fs from "fs-extra";
// import xml from "xml";
// import cheerio from "cheerio";
const fs = require(`fs-extra`);
const xml = require(`xml`);

(async function createRssFeed() {
  console.log("creating feed");
  const feedObject = {
    rss: [
      {
        _attr: {
          version: "2.0",
          "xmlns:atom": "http://www.w3.org/2005/Atom",
        },
      },
      {
        channel: [
          {
            "atom:link": {
              _attr: {
                href: "YOUR-WEBSITE/feed.rss",
                rel: "self",
                type: "application/rss+xml",
              },
            },
          },
          {
            title: "YOUR-WEBSITE-TITLE",
          },
          {
            link: "YOUR-WEBSITE/",
          },
          { description: "YOUR-WEBSITE-DESCRIPTION" },
          { language: "en-US" },
          // todo: add the feed items here
        ],
      },
    ],
  };
const feed = '<?xml version="1.0" encoding="UTF-8"?>' + xml(feedObject);
await fs.writeFile("./docs/qiita.rss", feed, "utf8");
})();
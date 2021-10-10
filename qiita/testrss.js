// import fs from "fs-extra";
// import xml from "xml";
// import cheerio from "cheerio";
const fs = require(`fs-extra`);
const xml = require(`xml`);

const getOrg = require(`./getOrg`);

(async function createRssFeed() {

    const ORG_KEY = `protoout-studio`
    const orgPosts = await getOrg(ORG_KEY);
    
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
        channel: orgPosts
      },
    ],
  };
const feed = '<?xml version="1.0" encoding="UTF-8"?>' + xml(feedObject);
await fs.writeFile("./docs/qiita.rss", feed, "utf8");
})();
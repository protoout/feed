'use strict'

// const MAGAZINE_KEY_INTERVIEW = `m27cd63996372`; //プロトアウトインタビューマガジン
// const MAGAZINE_KEY_ZENTAI = `m03f109eaf0a8`; //プロトアウト学生全体マガジン
const jsongen = require(`./jsongen`);
const rssgen = require(`./rssgen`);

(async ()=>{
    console.log(`start json gen`);
    await jsongen();

    console.log(`start rss gen`);
    await rssgen();
})();
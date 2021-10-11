'use strict'

// const MAGAZINE_KEY_INTERVIEW = `m27cd63996372`; //プロトアウトインタビューマガジン
// const MAGAZINE_KEY_ZENTAI = `m03f109eaf0a8`; //プロトアウト学生全体マガジン
const jsongen = require(`./jsongen`);
const htmlgen = require(`./htmlgen`);
// const atomgen = require(`./atomgen`);

(async ()=>{
    console.log(`--start json gen`);
    const output = await jsongen();

    console.log(`--start html gen`);
    await htmlgen(output.zentai);

    // console.log(`start html gen`);
    // await htmlgen();
})();
'use strict'

const fs = require(`fs`);
const getOrg = require(`./getOrg`);

// const MAGAZINE_KEY_INTERVIEW = `m27cd63996372`; //プロトアウトインタビューマガジン
// const MAGAZINE_KEY_ZENTAI = `m03f109eaf0a8`; //プロトアウト学生全体マガジン

module.exports = async () => {
    const ORG_KEY = `protoout-studio`
    const orgPosts = await getOrg(ORG_KEY);

    const output = {
        updated: require(`./../common/date`)(),
        zentai: orgPosts
    }

    fs.writeFileSync('./docs/qiita.json', JSON.stringify(output));
};
// import fs from "fs-extra";
// import xml from "xml";
// import cheerio from "cheerio";
const fs = require(`fs-extra`);
const xml = require(`xml`);

const convert = require('xml-js');
const getOrg = require(`./getOrg`);




async function createRssFeed() {

    const ORG_KEY = `protoout-studio`
    const orgPosts = await getOrg(ORG_KEY);

    let newObj = [];

    for (let i = 0, len= orgPosts.length; i < len; i++) {
        const obj = {};
        
        obj.a = {
            _attributes: {
                href: orgPosts[i].link
            },
            _text: orgPosts[i].title
        }

        obj.p = {
            _text: orgPosts[i].author
        }

        obj.span = {
            _text: orgPosts[i].published
        }

        obj.img ={
            _attributes: {
                src: orgPosts[i].link
            },
        }

        newObj[i] = obj;
    }

    // orgPosts
    
  console.log("creating feed");

  // console.log(orgPosts);

  const json = {
    // _declaration:{
    //     _attributes: {
    //         version: '1.0',
    //         encording: 'utf-8'
    //     },
    // },
    html: {
        // _attributes: {
        //     'xml:lang': 'ja-JP',
        //     xmlns: 'http://www.w3.org/2005/Atom'
        // },

        head:{
            title: `プロトアウトスタジオ の記事`,
            description: `Qiita で プロトアウトスタジオ に所属するユーザの最近の記事`,
        },
        body: {
            ul: {
                li: newObj
            }
        }

        // id: `tag:qiita.com,2005:/organizations/protoout-studio/activities`,

        // link: [
        //     {
        //         _attributes:{
        //             rel: 'alternate',
        //             text: 'text/html',
        //             href: 'https://protoout.github.io'
        //         }
        //     },
        //     {
        //         _attributes: {
        //             rel: 'self',
        //             type: 'application/atom+xml',
        //             href: 'https://protoout.github.io/info/qiita.atom'
        //         }
        //     },
        //     `https://protoout.github.io/info`,
        // ],

        // title: `プロトアウトスタジオ の記事`,
        // description: `Qiita で プロトアウトスタジオ に所属するユーザの最近の記事`,
        // // updated: `2021-10-10T13:05:33+09:00`,
        // entry: orgPosts
    },

  };

  const options = {compact: true, ignoreComment: true, spaces: 4};
  const xmlstr = convert.json2xml(json, options);

  console.log(xmlstr);

  await fs.writeFile('./docs/qiita.html', xmlstr, 'utf8');;
}

module.exports = createRssFeed;
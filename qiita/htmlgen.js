
const fs = require(`fs-extra`);

const convert = require('xml-js');
const getOrg = require(`./getOrg`);

async function createRssFeed(output) {

    let orgPosts = [];
    if(!output){
        const ORG_KEY = `protoout-studio`
        orgPosts = await getOrg(ORG_KEY);
    }

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

  const json = {
    html: {
        head:{
            title: `プロトアウトスタジオ の記事`,
            description: `Qiita で プロトアウトスタジオ に所属するユーザの最近の記事`,
        },
        body: {
            ul: {
                li: newObj
            }
        }

    },

  };

  const options = {compact: true, ignoreComment: true, spaces: 4};
  const html = convert.json2xml(json, options);

//   console.log(html);

  await fs.writeFile('./docs/qiita.html', html, 'utf8');;
}

module.exports = createRssFeed;
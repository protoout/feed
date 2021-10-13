
const fs = require(`fs-extra`);

const convert = require('xml-js');
const getOrg = require(`./getOrg`);

async function createRssFeed(output) {

    let orgPosts = [];
    if(!output){
        console.log(`新規でFetch`);
        const ORG_KEY = `protoout-studio`
        orgPosts = await getOrg(ORG_KEY);
    }else{
        orgPosts = output;
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

        obj.a = {
            _attributes: {
                href: orgPosts[i].link
            },
            _text: orgPosts[i].link
        }

        obj.p = [
            {
                _text: orgPosts[i].link
            },
            {
                _text: orgPosts[i].author
            },
            {
                _text: orgPosts[i].published
            },
            {
                _text: orgPosts[i].id
            },
            {
                _text: orgPosts[i].author_image_url
            }
        ]

        obj.img = [
            {
                _attributes: {
                    src: orgPosts[i].og_image
                },
            }
        ]

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
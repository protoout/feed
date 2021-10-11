const axios = require(`axios`);
const convert = require('xml-js');

// const ORG_KEY = `protoout-studio`;

// //useridからプロフ画像取得
// const getImg = async (userId) => {
//     const URL = `https://qiita.com/api/v2/users/${userId}`

//     try {
//         const res = await axios.get(URL);
//         const img = res.data.profile_image_url;
//         return img;
//     } catch (error) {

//         throw new Error(error);
//     };
// }

//記事URLからobimage取得
const getImg = async (itemUrl) => {
    try {
        const res = await axios.get(itemUrl);
        const html = res.data;

        //プロフ画像
        const author_image_url= html.match(/"profileImageUrl":"(.*?)"/)[1];
        
        //OGP画像
        const og_image_tmp = html.match(/<meta property="og\:image" content="(.*?)"/)[1];
        const og_image_url = og_image_tmp.replace(/amp;/g, '');

        return {
            author_image_url: author_image_url,
            og_image_url: og_image_url,
        }
    } catch (error) {
        throw new Error(error);
    };
}

module.exports = async (ORG_KEY) => {
    try {
        const QIITA_ORG = `https://qiita.com/organizations/${ORG_KEY}/activities.atom`;

        const res = await axios.get(QIITA_ORG);

        const options = { ignoreComment: true, alwaysChildren: true };
        const result = convert.xml2json([res.data], options);
        const json = JSON.parse(result).elements[0].elements;

        let output = [];
        const LIMIT = 5; // 5件のみ抽出

        json.map(elem => elem.elements)
            .map(elem => {
                //LIMIT件数のみ生成
                if(output.length >= LIMIT) return;

                const obj = {};
                for (let i = 0, len = elem.length; i < len; i++) {
                    const item = elem[i];
                    if(item.name === 'id')obj.id = item.elements[0].text;
                    if(item.name === 'updated')obj.updated = item.elements[0].text;
                    if(item.name === 'url')obj.url = item.elements[0].text;
                    if(item.name === 'title')obj.title = item.elements[0].text;
                    if(item.name === 'published')obj.published = item.elements[0].text;
                    if(item.name === 'link')obj.link = item.attributes.href;
                    //if(item.name === 'content')obj.content = item.elements[0].text;
                    if(item.name === 'author')obj.author = item.elements[0].elements[0].text;
                }

                if(Object.keys(obj).length) output.push(obj);
            })

        //画像をつける
        for(let i = 0, len = output.length; i < len; i++){
            const obj = output[i];
            if(obj.author){

                // obj.author_image_url = await getImg(obj.author);
                const {author_image_url, og_image_url} = await getImg(obj.url);
                obj.og_image = og_image_url;
                obj.author_image_url = author_image_url;
            }

            //コンテンツをいれてみる
            obj.content = {
                _attributes: {
                    type: 'html',
                },
                _text: `aaaa`
            }

            output[i] = obj;
        }

        return output;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}
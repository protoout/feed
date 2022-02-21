
const fs = require(`fs`);
const getMagazine = require(`./getMagazine`);

const MAGAZINE_KEY_INTERVIEW = `m172a343aee88`; //プロトアウトインタビューマガジン
const MAGAZINE_KEY_ZENTAI = `m03f109eaf0a8`; //プロトアウト学生全体マガジン

(async ()=>{
    const interview = await getMagazine(MAGAZINE_KEY_INTERVIEW);
    const zentai = await getMagazine(MAGAZINE_KEY_ZENTAI);

    const output = {
        interview: interview,
        zentai: zentai,
        updated: require(`./../common/date`)()
    }

    fs.writeFileSync('./docs/note.json', JSON.stringify(output));
})();
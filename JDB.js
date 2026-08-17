alert("jdb.js読み込まれた！");
console.log("JDBロード完了");

console.log("ユニット数:", unit_data1_ja.length);

function getCatData(name) {

    for (const unit of unit_data1_ja) {

        for (const form of unit.forms) {

            if (form.name === name) {

                console.log("見つかった:", form);

                return form;
            }
        }
    }

    console.log("見つからない:", name);

    return null;
}
function getCatStatus(name, level) {
    const form = getCatData(name);

    if (!form) {
        return null;
    }

    const multiplier = 0.55 * level + 1.5;

const hp = form.data[0] * multiplier;
const attack = form.data[3] * multiplier;

    return {
        name: form.name,
        hp: hp,
        attack: attack,
        range: form.data[5],
        freq: form.freq
    };
}
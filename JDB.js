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
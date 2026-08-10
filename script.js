// ==============================
// 敵データ
// ==============================

const enemies = {

    kuro: {
        name: "クロサワ監督",
        hp: 1200000,
        atk: 72000,
        traits: {
            black: true
        }
    },

    bunbun: {
        name: "ぶんぶん先生",
        hp: 999999,
        atk: 30000,
        traits: {
            floating: true
        }
    }

};


// ==============================
// JDBからキャラデータを取得
// ==============================

function createCatFromJDB(jdbCat, level) {

    if (!jdbCat) {
        return null;
    }

    // JDBの生データ
    const data = jdbCat.data;

    // 今は確認できている値を使用
    const hpBase = data[0];
    const atkBase = data[3];
    const range = data[5];

    // レベルによる仮計算
    const hp = hpBase * level / 30;
    const atk = atkBase * level / 30;

    return {
        name: jdbCat.name,
        hp: hp,
        atk: atk,
        range: range,
        freq: jdbCat.freq,

        // 今は既存計算との互換用
        attackFrequency: jdbCat.freq / 42,
        traits: {}
    };
}


// ==============================
// 攻撃ダメージ
// ==============================

function calculateDamage(cat) {

    let damage = cat.atk;

    if (cat.traits && cat.traits.blast) {
        damage += cat.atk;
    }

    return damage;
}


// ==============================
// 攻撃回数
// ==============================

function calculateHit(cat, enemyHp) {

    const damage = calculateDamage(cat);

    return Math.ceil(enemyHp / damage);
}


// ==============================
// 撃破時間
// ==============================

function calculateTime(hit, frequency) {

    return hit * frequency;
}


// ==============================
// 耐久
// ==============================

function calculateSurvive(cat, enemyAtk) {

    const hit = Math.floor(cat.hp / enemyAtk);

    if (hit < 1) {
        return 1;
    }

    return hit;
}


// ==============================
// 計算ボタン
// ==============================

const button = document.getElementById("calc");

button.addEventListener("click", function () {

    // 選択したキャラ
    const catChoice =
        document.getElementById("myCat").value;

    // レベル
    const level =
        Number(
            document.getElementById("level").value
        );

    // 選択した敵
    const enemyChoice =
        document.getElementById("enemy").value;

    // 敵倍率
    const multiplier =
        Number(
            document.getElementById("enemyMultiplier").value
        );


    // ==========================
    // JDBからキャラ取得
    // ==========================

    const jdbCat = getCatData(catChoice);

    if (!jdbCat) {

        document.getElementById("result").textContent =
            "キャラデータが見つかりません";

        return;
    }

    console.log("計算に使うJDBデータ:", jdbCat);


    // ==========================
    // JDBデータからキャラ作成
    // ==========================

    const myCat =
        createCatFromJDB(jdbCat, level);

    console.log("計算用キャラ:", myCat);
　　console.log("① 敵を取得します");

    // ==========================
    // 敵取得
    // ==========================

    const enemy =
        enemies[enemyChoice];
　　console.log("② 敵:", enemy);

    // ==========================
    // 敵倍率
    // ==========================

    const enemyHp =
        enemy.hp * multiplier / 100;

    const enemyAtk =
        enemy.atk * multiplier / 100;


    // ==========================
    // 計算
    // ==========================

    const damage =
        calculateDamage(myCat);
　　console.log("③ ダメージ:", damage);

    const hit =
        Math.ceil(enemyHp / damage);
    console.log("④ 撃破必要回数:", hit);

    const survive =
        calculateSurvive(myCat, enemyAtk);

    const time =
        calculateTime(
            hit,
            myCat.attackFrequency
        );


    // ==========================
    // 結果表示
    // ==========================

    document.getElementById("result").textContent =

        myCat.name + "は" +
        enemy.name + "を" +
        hit + "発で倒せます！ " +

        "敵の攻撃は" +
        survive + "発耐えます！ " +

        "撃破時間は約" +
        Math.round(time) +
        "秒です！";
});


// ==============================
// JDBからキャラ一覧を作る
// ==============================

function loadCatList() {

    const select =
        document.getElementById("myCat");

    select.innerHTML = "";

    for (const unit of unit_data1_ja) {

        const form =
            unit.forms.find(f => f.valid);

        if (!form) continue;

        const option =
            document.createElement("option");

        option.value =
            form.name;

        option.textContent =
            form.name;

        select.appendChild(option);
    }
}

loadCatList();
// 味方データ
const cats = {
    bahamut:{
        id: "bahamut",
        name:"覚醒のネコムート",
        hp:25500,
        atk:81600,
        dps:23000,
        range:200,
        kb:5,
        attackFrequency:2.2,
        traits:{
    blast:true,
}
}
};
// 敵データ
const enemies = {

    kuro:{
        name:"クロサワ監督",
        hp:1200000,
        atk:72000,
        traits:{
            black:true
        }
    },

    bunbun:{
        name:"ぶんぶん先生",
        hp:999999,
        atk:30000,
        traits:{
            floating:true
        }
    }

};


// 攻撃回数計算
function calculateDamage(cat){

    let damage = cat.atk;

    if(cat.traits.blast){

        damage += cat.atk;

    }

    return damage;

}
function calculateHit(cat, enemyHp){

    return Math.ceil(enemyHp / cat.atk);

}
function calculateTime(hit, frequency){

    return hit * frequency;

}

// 耐久計算
function calculateSurvive(cat, enemyAtk){

    const hit = Math.floor(cat.hp / enemyAtk);

    if(hit < 1){
        return 1;
    }

    return hit;

}


// ボタン取得
const button = document.getElementById("calc");


// ボタンを押した時
button.addEventListener("click", function(){

    const catChoice =
    document.getElementById("myCat").value;

const jdbCat = getCatData(catChoice);
console.log("計算に使うJDBデータ:", jdbCat);

    const enemyChoice =
    document.getElementById("enemy").value;
const level =
Number(
    document.getElementById("level").value
);
    // ← この辺に追加！
    const multiplier =
    Number(
        document.getElementById("enemyMultiplier").value
    );

    const baseCat = cats[catChoice];

const status =
getStatus(baseCat, level);


const myCat = {
    ...baseCat,
    hp: status.hp,
    atk: status.atk
};
getCatData(myCat.name);
    const enemy = enemies[enemyChoice];

    // ここから倍率計算
    const enemyHp = enemy.hp * multiplier / 100;
    const enemyAtk = enemy.atk * multiplier / 100;

    const damage =
calculateDamage(myCat);

const hit =
Math.ceil(enemyHp / damage);
    const survive = calculateSurvive(myCat, enemyAtk);
    const time =
calculateTime(hit, myCat.attackFrequency);
    document.getElementById("result").textContent =

    myCat.name + "は" +
    enemy.name + "を" +
    hit + "発で倒せます！ " +
    "敵の攻撃は" +
    survive + "発耐えます！ " +
    "撃破時間は約" +
    Math.round(time) +
    "秒です！";});
function getStatus(cat, level){

    const hp =
    cat.hp * level / 30;

    const atk =
    cat.atk * level / 30;


    return {
        hp: hp,
        atk: atk
    };

}
function loadCatList() {

    const select = document.getElementById("myCat");

    select.innerHTML = "";

    for (const unit of unit_data1_ja) {

        const form = unit.forms.find(f => f.valid);

        if (!form) continue;

        const option = document.createElement("option");

        option.value = form.name;
        option.textContent = form.name;

        select.appendChild(option);
    }
}

loadCatList();
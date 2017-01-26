function createCard(data) { //データを受け取りカードを生成
    $(".mdl-layout__content").empty();
    for (var i in data) {
        $(".mdl-layout__content").append("<div class='e_card mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect'><p class='e_w'>" +
            data[i].e_word + "</p><p class='j_w'>" + data[i].j_word + "</p></div>");
        componentHandler.upgradeDom();
    }
}

function loadSection(name) { //jsonファイルの名前を基にデータを作る
  httpObj = new XMLHttpRequest();
    httpObj.open("get", name, true);
    httpObj.onload = function(){
      file_data = JSON.parse(this.responseText);
      createCard(file_data);
    }
    httpObj.send(null);
}

function shuffleFileCards(){ //カードのシャッフル
  var n = file_data.length, t, i;

  while (n) {
    i = Math.floor(Math.random() * n--);
    t = file_data[n];
    file_data[n] = file_data[i];
    file_data[i] = t;
  }
  createCard(file_data);
}

function splitByLine(text_name) { //exportフォームの入力値を改行で分ける
    var text = document.getElementById(text_name).value.replace(/\r\n|\r/g, "\n");
    var lines = text.split('\n');
    var outArray = new Array();

    for (var i = 0; i < lines.length; i++) {
        // 空行は無視する
        if (lines[i] == '') {
            continue;
        }
        outArray.push(lines[i]);
    }
    return outArray;
}

function createJson() { //exportフォームでJsonファイルを作成
  var data = new Array();
    english_words = splitByLine('english');
    japanese_words = splitByLine('japanese');

    for (i = 0; i < english_words.length && i < japanese_words.length; i++) {
        data[i] = {
            "e_word": "",
            "j_word": ""
        }

        data[i].e_word = english_words[i];
        data[i].j_word = japanese_words[i];
    }

    data = JSON.stringify(data); //objectを文字列に変換する関数
    var blob = new Blob([data], {
        type: "text/json"
    });
    var file_title;
    // if(document.querySelector('#textbox_1').value != ''){　//textbox_1に何も入力されていないと実行できないようにするif文
    file_title = document.getElementById("title").value + ".json"; //ここを書き換えることでダウンロードリンクのタイトルが変わる
    // }
    if (file_title == ".json") {
        file_title = "your_english_words.json"
    }
    if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(blob, file_title);
        window.navigator.msSaveOrOpenBlob(blob, file_title);
    } else {
        window.URL = window.URL || window.webkitURL;
        var links = document.querySelector(".form");
        var temp = document.createElement("a");
        temp.innerHTML = file_title;
        temp.href = window.URL.createObjectURL(blob);
        temp.setAttribute("class", "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent");
        temp.setAttribute("download", file_title);
        links.removeChild(links.lastElementChild);
        links.appendChild(temp);
    }
    // componentHandler.upgradeDom();
}

function createForm() { //Exportフォーム
    $(".mdl-layout__content").empty();
    $(".mdl-layout__content").append('<div class="form">以下に英語とそれの日本語訳を記入し自分のフラッシュカードを作成できます<br>\
                                        <div class="mdl-textfield mdl-js-textfield">\
                                          <input class="mdl-textfield__input" type="text" id="title">\
                                          <label class="mdl-textfield__label" for="title">保存するタイトル名</label>\
                                        </div></br>\
                                        <div class="mdl-textfield mdl-js-textfield">\
                                          <textarea class="mdl-textfield__input lined" type="text" rows="25" id="english"></textarea>\
                                          <label class="mdl-textfield__label" for="english">_______ please write English here...</label>\
                                        </div>\
                                        <div class="mdl-textfield mdl-js-textfield">\
                                          <textarea class="mdl-textfield__input lined" type="text" rows="25" id="japanese"></textarea>\
                                          <label class="mdl-textfield__label" for="japaese">_______ please write Japanese here...</label>\
                                        </div></br>\
                                        <input type="button" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect" onClick=createJson() value=ダウンロードリンクの生成></br></br></br>\
                                      </div>');
    componentHandler.upgradeDom();

    $(function() { //テキストエリアに行番号とハイライトの追加
    	$(".lined").linedtextarea(
    	);
    });
}

function chooseJson() {
    $(".mdl-layout__content").empty();
    $(".mdl-layout__content").append('<div class="form">\
                                        <label for="file" class="file"> \
                                          <input type="file" name="file" value="" id="file"></br>\
                                          <div class="mdl-button mdl-js-button mdl-button--accent">ファイルを選択して決定をクリック</div>\
                                        </label>\
                                        <input type="button" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect" onClick=loadJson() value=決定>\
                                      </div>');
    componentHandler.upgradeDom();
}
file_data = ""; //グローバル変数
function loadJson() {
    var inp_file = document.querySelector('#file').files[0]; //ファイルフォームのidをここに指定
    var reader = new FileReader();
    reader.addEventListener('load', function(e) {
        file_data = reader.result;
        file_data = JSON.parse(file_data);
        createCard(file_data);
        //オブジェクトを配列に書き換える処理なので、いるなら使ってやってください
        // file_data = $.map(file_data, function(val, key) { return val; });
        //これでfile_dataにオブジェクトが追加されてるんで、このカッコの中で画面に描画する処理をしてください。
        // console.log(file_data); //ほら。読めてるでしょ？
    }, true);
    reader.readAsText(inp_file);
}

function dFocus() {
    $('.mdl-layout__obfuscator').trigger("click");
};

$(document).ready(function() {
    loadSection('./json/practice_1.json');
});

$('.e_card').live('click', function() {

    if ($(".j_w", this).is(':hidden')) {
        $(".j_w", this).css("display", "block");
    } else {
        $(".j_w", this).css("display", "none");
    }
});

function createCard(data) { //データを受け取りカードを生成
    $(".page-content").empty();
    for (var i in data) {
        $(".page-content").append("<div class='c_box'><div class='e_card mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect'><p class='e_w'>" +
            data[i].e_word + "</p><p class='j_w'>" + data[i].j_word + "</p></div>"
            + "<i id='" + data[i].e_word + "' class='material-icons mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect play'>play_arrow</i>"
            + "<i id='" + data[i].e_word + "' class='material-icons mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mic'>mic</i><div>"
            );
      }
      componentHandler.upgradeDom();
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

function chooseJson() {
    $(".page-content").empty();
    $(".page-content").append('<div class="form">\
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

$(document).on('click','.e_card', function() {

    if ($(".j_w", this).is(':hidden')) {
        $(".j_w", this).css("display", "block");
    } else {
        $(".j_w", this).css("display", "none");
    }
});



// メニューの発音チェック
$(document).on('click','.vocalization_button',function(){
  console.log(document.getElementById('vocalization').value);
  var e_text=this.id;
  var synthes = new SpeechSynthesisUtterance();
  synthes.voiceURI = 'native';
  synthes.volume = 1;
  synthes.rate = 1;
  synthes.pitch = 1;
  synthes.text = (document.getElementById('vocalization').value);
  synthes.lang = 'en';
  synthes.onend = function(e) {
  };
  speechSynthesis.speak(synthes);
})
//カードの音声を再生
$(document).on('click','.play',function(){
  console.log("aaaaa");
  var e_text=this.id;
  var synthes = new SpeechSynthesisUtterance();
  synthes.voiceURI = 'native';
  synthes.volume = 1;
  synthes.rate = 0.8;
  synthes.pitch = 1;
  synthes.text = e_text;
  synthes.lang = 'en';
  synthes.onend = function(e) {
  };
  speechSynthesis.speak(synthes);
})

//録音採点機能
$(document).on('click','.mic',function(){
  window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
  var recognition = new webkitSpeechRecognition();
  recognition.lang = 'en';
  var correct_word = this.id;
  // 録音終了時トリガー
  recognition.addEventListener('result', function(event){
    var reserved_word = event.results.item(0).item(0)
    // //スナックバー表示
    'use strict';
    var snackbarContainer = document.querySelector('#demo-toast-example');
    var showToastButton = document.querySelector('#demo-show-toast');
    var data = {
      message: reserved_word.transcript + '(' + Math.round(reserved_word.confidence * 10000) / 100 + 'Pt' + ')',
      timeout: 3000
    };
    //点数によって背景の色変える処理
    //現状カードの色とか変えるの結構大変なんで保留(録音と再生機能カード内部に入れ込めたら楽かも)
    if(reserved_word.transcript == correct_word){
      if(reserved_word.confidence > 0.85){
        data.message += "  Perfect!!"
        console.log("い")
      }else if(reserved_word.confidence > 0.65){
        data.message += "  Good"
        console.log("ろ")
      }else if(reserved_word.confidence > 0.45){
        data.message += "  Nice"
        console.log("は")
        }
        else{
          data.message += "  Bad…"
        }
      }
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
  }, false);

  // 録音開始
  recognition.start();
})

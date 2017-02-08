var w_data=gon.cards
console.dir(w_data)
function createCard(data) { //データを受け取りカードを生成
    $(".page-content").empty();
    var check_box = ""
    for (var i in data) {
      if(data[i].Weak == false){
         check_box = " check_box_outline_blank'>check_box_outline_blank"
      }else{
        check_box = " check_box'>check_box"
      }
      $(".page-content").append("<div class='c_box'><div class='e_card mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect'><p id='"+data[i].English+"' class='e_w'>" +
          data[i].English + "</p><p id='"+data[i].Japanese+"' class='j_w'>" + data[i].Japanese + "</p></div>"
          +"<button  class='mdl-js-button  mdl-button--colored c_button'><i id='check_" + data[i].id + "' class='material-icons" + check_box + "</i></button>"
          +"<button id='" + data[i].English + "' class='mic  mdl-js-button  mdl-button--colored c_button'><i class='material-icons'>mic</i></button>"
          +"<button id='" + data[i].English + "' class='play  mdl-js-button  mdl-button--colored c_button'><i class='material-icons'>play_arrow</i></button></div>"
          );
          //文字数ごとにフォントサイズ変更
          //English
          console.log("length="+data[i].English.length);
          if(data[i].English.length>0 && data[i].English.length<=11){
            $(document.getElementById(data[i].English)).css('font-size', '300%');
            console.log("1");
          }else if(data[i].English.length>11 && data[i].English.length<=17){
            $(document.getElementById(data[i].English)).css('font-size', '250%');
            console.log("2");
          }else{
            $(document.getElementById(data[i].English)).css('font-size', '200%');
            console.log("3");
          }
          //Japanese
          if(data[i].Japanese.length>0 && data[i].Japanese.length<=15){
            $(document.getElementById(data[i].Japanese)).css('font-size', '200%');
          }else if(data[i].Japanese.length>10 && data[i].Japanese.length<=25){
            $(document.getElementById(data[i].Japanese)).css('font-size', '170%');
          }else{
            $(document.getElementById(data[i].Japanese)).css('font-size', '130%');
          }
      }
      componentHandler.upgradeDom();
}

$(document).on('click','.check_box_outline_blank',function(){
  $("#" + this.id).removeClass("check_box_outline_blank");
  $("#" + this.id).html("check_box");
  $("#" + this.id).addClass("check_box");
  componentHandler.upgradeDom();
  flip(this.id, 1);
})

$(document).on('click','.check_box',function(){
  $("#" + this.id).removeClass("check_box");
  $("#" + this.id).addClass("check_box_outline_blank");
  $("#" + this.id).html("check_box_outline_blank");
  componentHandler.upgradeDom();
  flip(this.id, 0);
})

function flip(wordId, weak){
  var xhr;
  id = wordId.substring(6)
  console.log(id)
  xhr=$.ajax({
    url: 'flash_card',
    type: 'PATCH',
    dataType: 'json',
    async: true,
    data: {
      id: id,
      weak: weak
    },
  });
  return xhr.done(function(result) {
      console.log( '通信いけたでおおおお！');
    }).fail(function(result) {
      console.log( '通信失敗！');
    });
}

function findCards(filename){
  // var file=this.id;
  var xhr;
  xhr=$.ajax({
    url: 'flash_card',
    type: 'POST',
    dataType: 'text',
    async: true,
    data: {
      filename
    },
  });
  return xhr.done(function(result) {
      obj=JSON.parse(xhr.responseText)
      w_data=obj.homearr
      createCard(w_data);
    }).fail(function(result) {
      console.log( '通信失敗！');
    });
  // componentHandler.upgradeDom();
}


function importFileName(){
  for (var i in data) {
      $(".page-content").append("");
    }
    componentHandler.upgradeDom();
}


function loadSection(name) { //jsonファイルの名前を基にデータを作る
  httpObj = new XMLHttpRequest();
    httpObj.open("get", name, true);
    httpObj.onload = function(){
      file_data = w_data;
      createCard(w_data);
    }
    httpObj.send(null);
}

function shuffleFileCards(){ //カードのシャッフル
  var n = w_data.length, t, i;
  console.dir(w_data);
  while (n) {
    i = Math.floor(Math.random() * n--);
    t = w_data[n];
    w_data[n] = w_data[i];
    w_data[i] = t;
  }
  createCard(w_data);
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

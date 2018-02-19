var w_data=gon.cards
console.dir(w_data)
function createCard(data) { //データを受け取りカードを生成
    $(".page-content").empty();
    var check_box = ""
    for (var i in data) {
      //IDに入らない要素をバインド
      re = new RegExp("\'", "g");
      rev2 = new RegExp("\"", "g");
      var id = data[i].English.replace(re, "qttf")
      id = id.replace(rev2, "qttf")
      if(data[i].Weak == false){
         check_box = " check_box_outline_blank'>check_box_outline_blank"
      }else{
        check_box = " check_box'>check_box"
      }
      $(".page-content").append("<div class='c_box'><div class='e_card mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect'><p id='"+id+"' class='e_"+i+" e_w'>" +
          data[i].English + "</p><p id='j_"+data[i].Japanese+"' class='j_"+i+" j_w'>" + data[i].Japanese + "</p></div>"
          +"<button  class='mdl-js-button  mdl-button--colored c_button'><i id='check_" + data[i].id + "' class='material-icons" + check_box + "</i></button>"
          +"<button id='" + id + "' class='mic  mdl-js-button  mdl-button--colored c_button'><i class='material-icons'>mic</i></button>"
          +"<button id='" + id + "' class='play  mdl-js-button  mdl-button--colored c_button'><i class='material-icons'>play_arrow</i></button></div>"
          );
          //文字数ごとにフォントサイズ変更
          //English
          auto_font_size('.e_'+i,data[i].English,11,23,'280%','200%','170%');
          //Japanese
          auto_font_size('.j_'+i,data[i].Japanese,14,26,'150%','120%','100%')
      }
      componentHandler.upgradeDom();
}

//htmlのフォントサイズを変更
function auto_font_size(id,data,first_data,second_data,expansion1,expansion2,expansion3){
  if(data.length>0 && data.length<=first_data){
    $(id).css('font-size', expansion1);
  }else if(data.length>first_data && data.length<=second_data){
    $(id).css('font-size', expansion2);;
  }else if(data.length>second_data){
    $(id).css('font-size', expansion3);
  }
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
      console.log( '通信成功！');
    }).fail(function(result) {
      console.log( '通信失敗！');
    });
}

// メニュー内のfilenameを選択した時の処理
function findCards(filename){
  // var file=this.id;
  var xhr;
  xhr=$.ajax({
    url: 'flash_card',
    type: 'POST',
    dataType: 'text',
    async: true,
    data: {
      filename: filename
    },
  });
  return xhr.done(function(result) {
      obj=JSON.parse(xhr.responseText)
      w_data=obj.homearr
      dFocus();
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
    createCard(w_data);
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
  //ID追加処理でバインドされた要素を複合
  re = new RegExp("qttf", "g");
  e_text = e_text.replace(re, "\'")
  e_text = bind(e_text);

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
  correct_word = bind(correct_word);

  //ID追加処理でバインドされた要素を複合
  re = new RegExp("qttf", "g");
  correct_word = correct_word.replace(re, "\'")
  recognition.maxAlternatives = 10;
  // 録音終了時トリガー
  recognition.addEventListener('result', function(event){
    var reserved_word = event.results
    // //スナックバー表示
    'use strict';
    var snackbarContainer = document.querySelector('#demo-toast-example');
    var showToastButton = document.querySelector('#demo-show-toast');
    //点数によって背景の色変える処理
    //現状カードの色とか変えるの結構大変なんで保留(録音と再生機能カード内部に入れ込めたら楽かも)
    var i;
    var judge;
    console.dir(reserved_word.item(0));
    for(i = 0;i < reserved_word.item(0).length; i++){
      if(reserved_word.item(0).item(i).transcript.toUpperCase() == correct_word.toUpperCase()){
        if(reserved_word.item(0).item(i).confidence > 0.85){
          judge = "Perfect!!"
        }else if(reserved_word.item(0).item(i).confidence > 0.65){
          judge = "Good"
        }else if(reserved_word.item(0).item(i).confidence > 0.45){
          judge = "Nice"
        }else{
          judge = "Bad…"
        }
        break;
      }
    }
    if(i == reserved_word.item(0).length){
      judge = "このように認識しました"
      i = 0;
    }
    console.log(i);
    var data = {
      message: reserved_word.item(0).item(i).transcript + '(' + Math.round(reserved_word.item(0).item(i).confidence * 10000) / 100 + 'Pt' + ')     ' + judge,
      timeout: 3000
    };
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
  }, false);
  // 録音開始
  recognition.start();
})

//[]内の文字を全て除去
function bind(target_word){
  var bind1=0,bind2=0;
  while(bind1!=-1&&bind2!=-1){
    bind1=target_word.indexOf("[");
    bind2=target_word.indexOf("]");
    if(bind1!=-1&&bind2!=-1){
      target_word=target_word.substr(0,bind1)+target_word.substr(bind2+1,target_word.length);
    }
  }
  // console.log(target_word.indexOf("["))
  // console.log("hoge")
  // console.log(target_word.indexOf("]"))

  return target_word;
  // console.dir(target_word);

  //[]だけを除去
  // target_word = target_word.replace(/\[/g, "");
  // target_word = target_word.replace(/\]/g, "");
}

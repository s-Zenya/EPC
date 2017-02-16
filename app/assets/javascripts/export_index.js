function createJson() { //exportフォームでJsonファイルを作成
  var data = new Array();
    english_words = splitByLine('english');
    japanese_words = splitByLine('japanese');

    for (i = 0; i < english_words.length && i < japanese_words.length; i++) {
        data[i] = {
            "English": "",
            "Japanese": ""
        }
        data[i].English = english_words[i];
        data[i].Japanese = japanese_words[i];
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

function CardsToDb() { //exportフォームでDBにカードを保存
  var data = new Array();
  title = document.getElementById('title').value;
  english_words = splitByLine('english');
  japanese_words = splitByLine('japanese');
  console.log(english_words)
  $.ajax({
    url: '/export/create',
    type: 'POST',
    dataType: 'json',
    async: true,
    data: {
      title: title,
      english_words: english_words,
      japanese_words: japanese_words
    },
  }).done(function(data){
    $(".error_msg").empty();
    $('.error_msg').prepend('<div>DB登録に成功しました<div>');
  }).fail(function(data){
    $(".error_msg").empty();
    $('.error_msg').prepend('<div>DB登録に失敗しました<br>ファイル名が重複している可能性があります<div>');
  });
}

 $(function() {
 	$(".lined").linedtextarea(
 		{selectedLine: 1}
 	);
 });

 window.onload = function(){
  var file = document.getElementById('file');
  var file_notification = document.getElementById("JsonToDb");
  console.dir(file)
  file.addEventListener("change", function(e) {
    console.log("ugojdoas")
    file_notification.textContent = e.target.files[0].name + "をDBに保存";
  },false);
  };

function importJson(){
  file_data = ""; //グローバル変数
  var inp_file = document.querySelector('#file').files[0]; //ファイルフォームのidをここに指定
  var reader = new FileReader();
  var english_words = [];
  var japanese_words = [];
  var title = inp_file.name
  reader.addEventListener('load', function(e) {
    file_data = reader.result;
    file_data = JSON.parse(file_data);
    console.dir(file_data)
    for(i=0; i<file_data.length;i++){
      english_words[i] = file_data[i]["English"]
      japanese_words[i] = file_data[i]["Japanese"]
    }
    $.ajax({
      url: '/export/create',
      type: 'POST',
      dataType: 'json',
      async: true,
      data: {
        title: title,
        english_words: english_words,
        japanese_words: japanese_words
      },
    }).done(function(data){
      $(".error_msg").empty();
      $('.error_msg').prepend('<div>DB登録に成功しました<div>');
    }).fail(function(data){
      $(".error_msg").empty();
      $('.error_msg').prepend('<div>DB登録に失敗しました<br>ファイル名が重複している可能性があります<div>');
      console.dir(english_words)
      console.dir(japanese_words)
    });
  }, true);
  reader.readAsText(inp_file);
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

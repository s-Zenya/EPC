function deleteCards(fileId){
  var xhr;
  xhr=$.ajax({
    url: 'editing_delete',
    type: 'POST',
    dataType: 'text',
    async: true,
    data: {
      fileId
    },
  });
    return xhr.done(function(result) {
        console.log( '通信いけたでおおおお！');
        window.location.reload();
      }).fail(function(result) {
        console.log( '通信失敗！');
      });
}


function DbToJson(fileId){
  var xhr;
  xhr=$.ajax({
    url: 'editing_to_json',
    type: 'POST',
    dataType: 'text',
    async: true,
    data: {
      fileId
    },
  });
    return xhr.done(function(result) {
        obj=JSON.parse(xhr.responseText);
        w_data=obj.homearr;
        ToJson(w_data);
      }).fail(function(result) {
        console.log( '通信失敗！');
      });
}


function ToJson(data) { //DBのデータでJsonファイルを作成
  console.dir(data);
  var file_title;
  // if(document.querySelector('#textbox_1').value != ''){　//textbox_1に何も入力されていないと実行できないようにするif文
// ファイル名の最後に.jsonが付いているかのチェック
  if(!(data[1].filename.length-data[1].filename.lastIndexOf(".json")==5)){
    file_title = data[1].filename + ".json"; //ここを書き換えることでダウンロードリンクのタイトルが変わる
  }else{
    file_title = data[1].filename
  }
  if (file_title == ".json") {
      file_title = "your_english_words.json"
  }
  // 受け取ったjsonのid要素を削除
  for(i=0;i<data[0].words.length;i++){
    delete data[0].words[i].id;
  }
  data = JSON.stringify(data[0].words); //objectを文字列に変換する関数
  var blob = new Blob([data], {
      type: "text/json"
  });
  var url = window.URL || window.webkitURL;
  var blobURL = url.createObjectURL(blob);
  var a = document.createElement('a');
  a.download = file_title;
  a.href = blobURL;
  a.click();
  componentHandler.upgradeDom();
}

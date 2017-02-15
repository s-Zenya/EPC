function EditDb(id) { //exportフォームでDBにカードを保存
  var data = new Array();
  title = document.getElementById('title').value;
  english_words = splitByLine('english');
  japanese_words = splitByLine('japanese');
  console.log(english_words)
  $.ajax({
    url: '/edit/update',
    type: 'POST',
    dataType: 'json',
    async: true,
    data: {
      id: id,
      title: title,
      english_words: english_words,
      japanese_words: japanese_words
    },
  }).done(function(data){
    $('.form').append('<div>DB登録に成功しました<div>');
    location.href="editing";
  }).fail(function(data){
    $('.form').append('<div>DB登録に失敗しました<br>ファイル名が重複している可能性があります<div>');
  });
}

function splitByLine(text_name) { //exportフォームの入力値を改行で分ける
  var text = document.getElementById(text_name).value.replace(/\r\n|\r/g, "\n")
  text = text.gsub(/(\t)/,"\n");
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

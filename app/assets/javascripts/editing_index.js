function deleteCards(filename){
  var xhr;
  xhr=$.ajax({
    url: 'editing_delete',
    type: 'POST',
    dataType: 'text',
    async: true,
    data: {
      filename
    },
  });
    return xhr.done(function(result) {
        console.log( '通信いけたでおおおお！');
        window.location.reload();
      }).fail(function(result) {
        console.log( '通信失敗！');
      });
}

fnction deleteCards(filename){
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
      // obj=JSON.parse(xhr.responseText)
      // w_data=obj.homearr
    }).fail(function(result) {
      console.log( '通信失敗！');
    });
}

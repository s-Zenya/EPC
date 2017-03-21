$(document).on('click','.search_button',function(){
  var key=document.getElementById("tag_search").value;
  console.log(key);
    var xhr;
    xhr=$.ajax({
      url: '/share/search',
      type: 'POST',
      dataType: 'text',
      async: true,
      data: {
        key
      },
    });
    return xhr.done(function(result) {
        console.log( '通信いけたでおおおお！');
        obj=JSON.parse(xhr.responseText)
        data=obj.homearr

        $(".share_list").empty();
        for(var i=0;i<data.length;i++){
          console.dir(data[i].filename);
          $('.share_list').append('<a>'+data[i].filename+'</a>');
        }
      }).fail(function(result) {
        console.log( '通信失敗！');
      });
})

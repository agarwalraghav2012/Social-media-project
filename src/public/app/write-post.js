$("button").click(function(){
    $.post('/api/posts/', {
        userId: window.currentUserId ,
        title: $('#title').val(),
        body: $('#body').val()
        }, 
        function(data){
            console.log(data) ;
    });
  });
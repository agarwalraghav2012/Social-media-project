function loadMyPosts() {
    $.get('/api/posts', (posts) => {
      for (let p of posts) {
        if(p.user.username === window.currentUsername) {
        console.log(window.currentUsername);
        $('#posts-container').append(
          $(`
          <div class="col-4 row">
            <div class="card m-2">
              <div class="card-body">
                <h5 class="card-title">${p.title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">By- ${p.user.username}</h6>
                <p class="card-text">
                  ${p.body.substr(0, 200)}
                  <a href="#" class="a1" dataId = ${p.id}>...read more</a>
                </p>
              </div>
            </div>
          </div>
          `)
        )
        }
      }

      $( ".a1" ).click( function(ev) {

        $('#content').load("../components/comments.html") ;  
        var id = $(this).attr('dataId') ;
   
          
        $.get(`/api/posts/comments/${id}`, (comments) => {

          $.get(`/api/posts/${id}`, (post) => {
            
            $('#fullpost').append(
              `
              <div class="card text-center">
              <div class="card-header">
              <strong>${post[0].title}</strong>
              </div>
              <div class="card-body">
                <h5 class="card-title">- ${post[0].user.username}</h5>
                <p class="card-text">${post[0].body}</p>
              </div>
            </div>
              `
            )
          }) ;

          for (let c of comments) {
                
            $('#comments-container').append(
                `
                <div class="card" style="width: 60%;">
                <div class="card-body">
                  <h5 class="card-title">${c.title}</h5>
                  <h6 class="card-subtitle mb-2 text-muted">- ${c.user.username}</h6>
                  <p class="card-text">${c.body}</p>
                </div>
                </div>
                `
            ) ;
          } 
          
          $('#formbody').append(
            `
            <h5> Write comment :-</h5>
            <form>
                <div class="form-group col-md-11">
                  <label >Comment Title</label>
                  <input type="text" class="form-control" id="title">
                </div>
                <div class="form-group col-md-11">
                  <label >Details</label>
                  <textarea class="form-control"  rows="2" id="body" ></textarea>
                </div>
                <div class="form-group form-check col-md-11">
                  <input type="checkbox" class="form-check-input">
                  <label class="form-check-label">  Allow us to show this content to other users as well</label>
                </div>
                <button type="submit" class="btn btn-primary" id="post"> Post </button>
              </form>
            `
        ) ;

        $("#post").click(function(){
          
          $.post('/api/posts/comments/', {
              userId: window.currentUserId ,
              title: $('#title').val(),
              body: $('#body').val(),
              postId: id
              }, 
              function(data){
          });
        });

        }) ;
        

        
        /*$("#post").click(function(){
          console.log("post func run");
          
          $.post('/api/posts/comments/', {
              userId: window.currentUser.id ,
              title: $('#title').val(),
              body: $('#body').val(),
              postId: id
              }, 
              function(data){
                  console.log(data) ;
          });
        }); */

        });

    })
  }

loadMyPosts()
function loadPosts() {
    $.get('/api/posts', (posts) => {
      for (let p of posts) {
        
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
                <a href="#" class="card-link">Comment</a>
                <a href="#" class="card-link">Like</a>
              </div>
            </div>
          </div>
          `)
        )

        $( ".a1" ).click( function(ev) {

          

          var id = $(this).attr('dataId') ;
          console.log(id) ;
          
          $.get(`/api/posts/comments/${id}`, (comments) => {
            $('#content').load("../components/comments.html") ;
            for (let c of comments) {
                console.log("hey there");
                
                $('#comments-container').append(
                    $(`
                    <div class="card" style="width: 90%;">
                    <div class="card-body">
                      <h5 class="card-title">${c.title}</h5>
                      <h6 class="card-subtitle mb-2 text-muted">- ${c.user.username}</h6>
                      <p class="card-text">${c.body}</p>
                    </div>
                    </div>
                    `)
                )
            }
        })

        });

      }
    })
  }
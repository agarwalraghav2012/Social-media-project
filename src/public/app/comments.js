$(document).ready(function () {
function loadComments() {
    console.log("it's from comments.js");
    
    // $.get('/api/posts/comments/24.', (comments) => {
    //     for (let c of comments) {
    //         $('#comments-container').append(
    //             $(`
    //             <div class="card" style="width: 90%;">
    //             <div class="card-body">
    //               <h5 class="card-title">${c.title}</h5>
    //               <h6 class="card-subtitle mb-2 text-muted">- ${c.user.username}</h6>
    //               <p class="card-text">${c.body}</p>
    //             </div>
    //             </div>
    //             `)
    //         )
    //     }
    // })
}
loadComments() ;

});
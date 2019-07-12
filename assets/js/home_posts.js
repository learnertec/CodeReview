{
   let createPost = function(){
       let newPostForm = $('#new-post-form');
       newPostForm.submit(function(e){
           e.preventDefault();
           $.ajax({
               type: 'post',
               url: '/posts/create',
               data: newPostForm.serialize(), //convert the form data into json format
               success: function(data){
                let newPost = newPostDom(data.data.post);
                $('#posts-list-container>ul').prepend(newPost);
                deletePost($('.delete-post-button', newPost));  //delete post inside newPost
                 console.log(data);
               },
               error: function(err){
                console.log(error.responseText);
               }
               
           })
       })
   }

   let newPostDom = function(post){
    return $(`<li id="post-${post._id }"> 
    <p>
       <!-- view level check to only outhorized user can destroy the post -->
       <small>
          <a class="delete-post-button" href="/posts/destroy/${ post._id }">x</a>
       </small>
        ${post.content}
    <small>Created By: ${post.user.name}></small>
    </p> 


<div class="post-comments">
    <form action="/comments/create" method="POST">
      <input type="text" name="content" placeholder="Comment Please !" required>
      <input type="hidden" name="post" value="${post._id} ">
      <input type="submit" value="Place Comment">
    </form>

   <div class="post-comment-list">
      <ul class="post-comment-${post._id}">
        
      </ul>

   </div>

</div>
</li>`)  
   
   }

//  method to delete a post from dom
let deletePost = function(deleteLink){
    $(deleteLink).click(function(e){
        e.preventDefault();

        $.ajax({
            type: 'get',
            url: $(deleteLink).prop('href'),
            success: function(data){
             $(`#post-${data.data.post_id}`).remove();
            },
            error: function(err){
                console.log(err.responseText);
            }
        })
    })
}

   createPost();
}
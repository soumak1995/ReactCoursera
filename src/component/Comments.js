import React from 'react'

function Comments(comments) {
    console.log(comments)
    return (
        <div>
                 
                   <p>{comments.comments.comment}</p>
                --<strong>{comments.comments.author}</strong><p>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comments.comments.date)))}</p>
          
        </div>
    )
}

export default Comments

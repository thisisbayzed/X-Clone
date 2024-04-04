import React from 'react';
import CommentsItmes from './CommentsItmes';
function Commentsfeed({data}) {
    return (
        <div>
            {data?.map((comment) => (
                < CommentsItmes key={comment.id} data={comment} />
            ))}
        </div>
    );
}

export default Commentsfeed;
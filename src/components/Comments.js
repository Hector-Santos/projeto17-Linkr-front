export default function Comments({ commentAuthor, content, postAuthor }) {

    console.log({ commentAuthor, content, postAuthor })
    return(
        <>
            {commentAuthor === postAuthor
                ? <h3>{commentAuthor}  • post's author</h3>
                : <h3>{commentAuthor}</h3>
            }
            
            <p>{content}</p>
        </>
    )    
}
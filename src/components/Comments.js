export default function Comments({ author, content }) {

    console.log({ author, content })
    return(
        <>
            <h3>{author}</h3>
            <p>{content}</p>
        </>
    )    
}
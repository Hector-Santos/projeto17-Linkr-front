export default function formatLikes(likesQty){

    if (likesQty >= 1000) {
        return (likesQty / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
     }
     return likesQty;

}
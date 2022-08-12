import { Link } from "react-router-dom";

export default function TrendingHashtag({ name }){

    return(
        <Link to={`/hashtag/${name.replace(/#/gi, "")}`}>
            #{name}
        </Link>
    );

};
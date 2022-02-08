import { useState,useEffect } from "react/cjs/react.development";
import Results from "./Results";
import { useParams } from "react-router-dom";
function BodyComponent() {
    const [newCursor,setNewCursor]=useState();
    const [arrayResult,setArrayResult]=useState([]);
    let params = useParams();
    useEffect(() => {
        if(newCursor){
            setArrayResult([...arrayResult,<Results key={`Results_${arrayResult.length}`} after={`${newCursor}`} setNewCursor={setNewCursor} search={params.search} />])
        }
    }, [newCursor]);
    useEffect(() => {
        setArrayResult([ <Results key={`Results_0`} setNewCursor={setNewCursor} after="" search={params.search} /> ])
    }, [params]);
    
    return (
        <div >
            {
                arrayResult.map(Result=>(
                    Result
                ))
            }
        </div>
    );
}

export default BodyComponent;

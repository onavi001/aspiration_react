import { gql, useQuery } from '@apollo/client';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Chip from '@mui/material/Chip';
import { FaStar, FaBook } from 'react-icons/fa';
import { Link } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';    
import '../style/Results.css';
export const GET_TOPICS_QUERY = gql`
query SearchTopics($search: String!) {
    search(query: $search, type: REPOSITORY, first: 10) {
        repositoryCount
        pageInfo {
            startCursor
            hasNextPage
            hasPreviousPage 
            endCursor
        }
        edges {
            node {
            ... on Repository {
                    stargazers {
                        totalCount
                    }
                    resourcePath
                    repositoryTopics(first: 10) {
                        totalCount
                        nodes {
                            topic {
                                
                                name
                                stargazerCount
                                relatedTopics {
                                    name
                                }
                            }
                        }
                    }
                }
            }
            cursor
        }
    }
}
`;
export const GET_TOPICS_QUERY_WITH_AFTER = gql`
query SearchTopics($search: String!, $after: String!) {
    search(query: $search, type: REPOSITORY, first: 10, after: $after) {
        repositoryCount
        pageInfo {
            startCursor
            hasNextPage
            hasPreviousPage 
            endCursor
        }
        edges {
            node {
            ... on Repository {
                    stargazers {
                        totalCount
                    }
                    resourcePath
                    repositoryTopics(first: 10) {
                        totalCount
                        nodes {
                            topic {
                                name
                                stargazerCount
                                relatedTopics {
                                    name
                                }
                            }
                        }
                    }
                }
            }
            cursor
        }
    }
}
`
const Results = ({after,setNewCursor,search}) => {
    let navigate = useNavigate();
    //let params = useParams();
    const [hideSeeMore,setHideSeemore]=useState(false);
    const { loading, error, data } = useQuery(after ? GET_TOPICS_QUERY_WITH_AFTER : GET_TOPICS_QUERY,{
            variables: { search:`${search} stars:>10000`,after}
        }
    );

    if (loading) return (
        <div className="spinner-container">
            <svg width="100%" viewBox="0 0 248 247" fill="none" xmlns="http://www.w3.org/2000/svg"  >
                <g id="spinner2">
                    <g id="outer">
                        <circle id="Ellipse 1" cx="123.5" cy="124.5" r="104" stroke="#DABDFF" strokeWidth="11" />
                        <circle id="Ellipse 2" cx="124" cy="20" r="20" fill="#8C37F7" />
                        <circle id="Ellipse 5" cx="124" cy="227" r="20" fill="#8C37F7" />
                        <circle id="Ellipse 3" cx="228" cy="127" r="20" fill="#8C37F7" />
                        <circle id="Ellipse 4" cx="20" cy="127" r="20" fill="#8C37F6" />
                    </g>
                    <g id="inner">
                        <circle id="Ellipse 1_2" cx="122.916" cy="125.545" r="61.1714" transform="rotate(32.5155 122.916 125.545)" stroke="#C4C4C4" strokeWidth="11"  />
                        <circle id="Ellipse 2_2" cx="157.374" cy="72.0558" r="12.1774" transform="rotate(32.5155 157.374 72.0558)" fill="#DABDFF" />
                        <circle id="Ellipse 5_2" cx="89.626" cy="178.335" r="12.1774" transform="rotate(32.5155 89.626 178.335)" fill="#DABDFF" />
                        <circle id="Ellipse 3_2" cx="175.751" cy="161.03" r="12.1774" transform="rotate(32.5155 175.751 161.03)" fill="#DABDFF" />
                        <circle id="Ellipse 4_2" cx="68.958" cy="92.9549" r="12.1774" transform="rotate(32.5155 68.958 92.9549)" fill="#DABDFF" />
                    </g>
                </g>
            </svg>

            <p data-testid="loading" >Loading...</p>
        </div>
    )
    if (error) return (
        <>
            <label> 
                <Alert variant="filled" severity="error"><p data-testid="error" >An error occurred</p></Alert>
                <Alert variant="filled" severity="error">{`Error! ${error.message}`}</Alert>
            </label>
            <br/>
            <button onClick={()=>{setNewCursor(data.search.pageInfo.endCursor)}}>Reload</button>
        </>
    );
    return ( 
        <>
            {
                data && data.search.edges && data.search.edges.length > 0?
                    <div style={{padding: "0 10%"}}>
                        <div style={{display:'flex',alignItems:"center"}}>
                            <Button style={{fontSize:"32px",fontWeight:"600",margin:"0 15px 0 0"}} disabled variant="outlined">#</Button>
                            <h1 style={{fontSize:"32px",fontWeight:"600"}}>{search}</h1>
                        </div>
                        {
                            data.search.edges.map((edge, index) => (
                                <div data-testid="edge-topics" key={`edge_topic_${index}`}>
                                    <Card variant="outlined" sx={{ minWidth: 275, margin:"15px 0"}}>
                                        <CardContent>
                                            <div className="divContainerData" >
                                                <div className='divEdgeContainer' >
                                                    <FaBook className='bookIcon' />
                                                    {
                                                        edge.node.resourcePath.split('/').map((topic,index) => (
                                                                index === edge.node.resourcePath.split('/').length-1?
                                                                    topic !== "" && (
                                                                        <Link key={`Link_${index}`} style={{fontWeight: "bold"}} to={`/${topic}`} replace  >{topic}</Link>
                                                                    )
                                                                :
                                                                    topic !== "" && (
                                                                        <div key={`Link_${index}`} >
                                                                            <Link  to={`/${topic}`} replace  >{topic}</Link>
                                                                            <label style={{margin:"0 5px"}} >/</label>
                                                                        </div>
                                                                    )
                                                        ))
                                                    }
                                                </div>
                                                <span style={{float:"right"}}><FaStar/>{edge.node.stargazers.totalCount}</span> 
                                            </div>
                                            <div style={{margin:"20px 0", display:"flex",alignItems: "center",flexWrap:"wrap"}}>
                                                {
                                                    edge.node.repositoryTopics.nodes.length > 0 ?
                                                        <>
                                                            <h3 style={{marginRight:"10px"}} >Related Topics:</h3>
                                                            {
                                                                edge.node.repositoryTopics.nodes.map((node,j)=>(
                                                                    <Chip
                                                                        key={`Chip_${node.topic.name}`}
                                                                        style={{margin:"0 2px"}}
                                                                        label={
                                                                            <div style={{display:"flex",alignItems:"center"}}>
                                                                                <label>{node.topic.name}</label>
                                                                                <FaStar style={{marginLeft:"10px"}}/>
                                                                                <label>{node.topic.stargazerCount}</label>
                                                                            </div>
                                                                        }
                                                                        onClick={() => {navigate(`/${node.topic.name}`)}}
                                                                    />
                                                                    
                                                                ))
                                                            }
                                                        </>
                                                    :
                                                        <h3 style={{marginRight:"10px"}} >Whitout Topics</h3>
                                                }
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            ))
                        }
                        {
                            !hideSeeMore && data.search.pageInfo.hasNextPage?
                                <Button style={{width: "100%", marginBottom:"20px"}} onClick={()=>{setNewCursor(data.search.pageInfo.endCursor);setHideSeemore(true)}} variant="outlined">Load more...</Button>
                            :
                                null

                        }
                    </div>
                :
                    <h3>Data not found</h3>
            }
        </>
    );
}
 
export default Results;
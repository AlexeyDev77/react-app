import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import Loader from "../components/UI/Loader/Loader";
import PostList from "../components/PostList";

const PostIdPage = () => {
    const params = useParams()
    const [post, setPost] = useState({})
    const [comments, SetComments] = useState([])
    const [fetchPostById, isLoading, error] = useFetching(async (id) => {
        const response = await PostService.getById(id)
        setPost(response.data)
    })

    const [fetchComments, isComLoading, comerror] = useFetching(async (id) => {
        const response = await PostService.getCommentsByPostId(id)
        SetComments(response.data)
    })

    useEffect(() => {
        fetchPostById(params.id)
        fetchComments(params.id)
    },[])

    return (
        <div>
            <h1>Вы открыли страницу поста c ID = {params.id}</h1>
            {isLoading
                ? <div style={{display:"flex",justifyContent:"center", marginTop:"50px"}}> <Loader/> </div>
                : <div>{post.id}. {post.title}</div>
            }
            <h1>
                Комментарии
            </h1>
            {isLoading
                ? <div style={{display:"flex",justifyContent:"center", marginTop:"50px"}}> <Loader/> </div>
                : <div>
                    {comments.map(comm =>
                        <div style={{marginTop: 15}} key={comm.id}>
                            <h5>{comm.email}</h5>
                            <div>{comm.body}</div>
                        </div>
                    )}
                </div>
            }
        </div>
    );
};

export default PostIdPage;
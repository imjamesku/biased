import React, { useState, FormEvent } from 'react'
import Comment from './Comment/Comment'
import styles from './Comments.module.scss'
import CommentType from '../../_types/Comment'
import { useSelector } from 'react-redux'
import { RootState } from '../../_reducers'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import axios from '../../_helpers/axios'
import { commentService } from '../../_services/comment._service'

interface Props {
    topicId: number;
    topicIdx?: number;
    centered?: boolean;
    mutateCommentCount?: (addend: number) => void;
}

const Comments = (props: Props) => {
    function commentsFetcher(key: string) {
        return axios.get(key).then((res: any) => res.data)
    }
    let { data, error, mutate: commentMutate } = useSWR<CommentType[]>(`comment/${props.topicId}`, commentsFetcher)
    function deleteCommentFromCache(commentId: number) {
        commentMutate(data ? data.filter(comment => comment.id !== commentId) : [])
    }
    const auth = useSelector((state: RootState) => state.authentication)
    const router = useRouter()
    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (auth.loggedIn && auth.user) {
            commentService.createComment(props.topicId, newComment)
                .then((newCommentResponse: CommentType) => {
                    if (props.topicIdx || props.topicIdx === 0) {
                        props.mutateCommentCount && props.mutateCommentCount(1)
                    }
                    if (data) {
                        commentMutate([newCommentResponse, ...data])
                    } else {
                        commentMutate([newCommentResponse])
                    }
                    clearNewComment()
                })
                .catch(error => {
                    if (error.response) {
                        console.log(error.response.message)
                    }
                })
        } else {
            router.push('/signin')
        }
    }
    const [newComment, setNewComment] = useState('')
    function clearNewComment() {
        setNewComment('')
    }
    const commentListClasses = props.centered ? `${styles.commentList} ${styles.centered}` : `${styles.commentList}`
    return (
        <div className={commentListClasses}>
            <h1>Comments</h1>
            <form className={styles.commentForm} onSubmit={handleSubmit}>
                <textarea placeholder="Leave a comment" value={newComment} onChange={e => setNewComment(e.target.value)} required />
                <br />
                <button>Submit</button>
            </form>
            {error ? <p>Error loading comments</p> : data ? data.map((comment, idx) => <Comment key={idx} comment={comment} topicIdx={props.topicIdx} deleteCommentFromCache={deleteCommentFromCache} mutateCommentCount={props.mutateCommentCount} />) : <p>loading</p>}
        </div>
    )
}

export default Comments

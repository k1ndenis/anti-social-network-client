import { useEffect, useState } from "react"
import { sendCommentToServer, deleteCommentFromServer } from "../../../app/reducers/commentsSlice";
import { useAppSelector, useAppDispatch } from "../../../hooks/redux";
import { fetchComments } from "../../../app/reducers/commentsSlice";
import './Comment.css'

interface CommentProps {
  language: 'ru' | 'en';
  pictureId: string;
}

export const Comment = ({ language, pictureId }: CommentProps) => {
  const [commentValue, setCommentValue] = useState<string>("");
  const dispatch = useAppDispatch();
  const comments = useAppSelector(state => state.comments[pictureId] || []);

  useEffect(() => {
    dispatch(fetchComments());
  }, [dispatch]);

  const handleSend = () => {
    if (!commentValue.trim()) return;
    const tempId = crypto.randomUUID();
    // dispatch(addCommentLocal({ pictureId, text: commentValue, createdAt: Math.floor(Date.now() / 1000).toString(), id: tempId }))
    dispatch(sendCommentToServer({ pictureId, text: commentValue, createdAt: Math.floor(Date.now() / 1000).toString(), id: tempId }));
    setCommentValue("");
  }

  const keyDownHandle = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend();
  }

  const formatDate = (timestamp: string) => {
    const date = new Date(+timestamp * 1000);
    const formatted = date.toLocaleString('ru-RU', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
    return formatted
  }

  return (
    <div className="comments-container">
      <ul className="comments">
        {comments.map(comment => (
          <li className="comment-item" key={comment.id}>
            <span className="comment-text">{comment.text}</span>
            <span className="comment-date">{formatDate(comment.createdAt)}</span>
            <button className="comment-delete-button" onClick={() => dispatch(deleteCommentFromServer(comment.id))}>x</button>
          </li>
        ))}
      </ul>
      <div className="comment-input-container">
        <input
          type="text"
          value={commentValue}
          onChange={(e) => setCommentValue(e.target.value)}
          onKeyDown={keyDownHandle}
          placeholder={language === 'ru' ? "Введите комментарий..." : "Write a comment..."}
        />
        <button onClick={handleSend}>
          ➤
        </button>
      </div>
    </div>
  )
}
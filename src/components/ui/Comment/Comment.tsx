import { useState } from "react"
import { useDispatch } from "react-redux";
import { addComment, deleteComment } from "../../../app/reducers/commentsSlice";
import { useAppSelector } from "../../../hooks/redux";
import './Comment.css'

interface CommentProps {
  language: 'ru' | 'en';
  pictureId: string;
}

export const Comment = ({ language, pictureId }: CommentProps) => {
  const [commentValue, setCommentValue] = useState<string>("");
  const dispatch = useDispatch();

  const comments = useAppSelector(state => state.comments[pictureId] || []);

  const handleSend = () => {
    if (!commentValue.trim()) return;
    dispatch(addComment({ pictureId, text: commentValue }))
    setCommentValue("");
  }

  const keyDownHandle = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend();
  }

  return (
    <div className="comments-container">
      <ul className="comments">
        {comments.map(comment => (
          <div className="comment-item">
            <li className="comment-text" key={comment.id}>💬 {comment.text}</li>
            <button className="comment-delete-button" onClick={() => dispatch(deleteComment({ pictureId, commentId: comment.id }))}>x</button>
          </div>
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
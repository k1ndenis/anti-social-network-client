import { useState } from "react"
import { useDispatch } from "react-redux";
import { addComment } from "../../../app/reducers/commentsSlice";
import { useAppSelector } from "../../../hooks/redux";
import './Comment.css'

interface CommentProps {
  language: 'ru' | 'en';
  pictureId: string;
}

export const Comment = ({ language, pictureId }: CommentProps) => {
  const [commentValue, setCommentValue] = useState<string>("");
  const [viewComments, setViewComments] = useState<boolean>(false);
  const dispatch = useDispatch();

  const comments = useAppSelector(state => state.comments[pictureId] || []);

  const handleSend = () => {
    if (!commentValue.trim()) return;
    dispatch(addComment({ pictureId, text: commentValue }))
    setCommentValue("");
    setViewComments(true);
  }

  const keyDownHandle = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend();
  }

  return (
    <div>
      <input
        type="text"
        value={commentValue}
        onChange={(e) => setCommentValue(e.target.value)}
        onKeyDown={keyDownHandle}
        placeholder={language === 'ru' ? "Введите комментарий" : "Write a comment"}
      />
      <button onClick={handleSend}>
        {language === 'ru' ? "Отправить" : "Send"}
      </button>
      {!viewComments
        ? (
          <div onClick={() => setViewComments(true)}>
            {comments[0]
              && (
                <>
                  💬 {comments[0].text}
                </>
              )
            }
          </div>
        )
        : (
          <ul className="comments" onClick={() => setViewComments(false)}>
            {comments.map(comment => (
              <li className="comment" key={comment.id}>💬 {comment.text}</li>
            ))}
          </ul>
        )
      }
    </div>
  )
}
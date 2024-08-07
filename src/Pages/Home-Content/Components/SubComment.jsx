import { useContext, useState } from "react";
import axios from "axios";
import { PageContext } from "../../Context/PageContext";
import { formatDate } from "../../Helper-Functions/formatDate";
import { BiSolidLike } from "react-icons/bi";
import { MdEdit } from "react-icons/md";
import { CgRemove } from "react-icons/cg";
import { GiConfirmed } from "react-icons/gi";
import { TiCancelOutline } from "react-icons/ti";

const SubComment = ({ subComment, setSubComments, postId }) => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const { user } = useContext(PageContext);
  const {
    id,
    userId,
    commentId,
    commentedBy,
    createdOn,
    subCommentText: text,
    subCommentLikes,
  } = subComment;
  const [deleteSubComment, setDeleteSubComment] = useState(false);
  const [editSubComment, setEditSubComment] = useState(false);
  const [subCommentText, setSubCommentText] = useState(text);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${BASE_URL}/posts/${postId}/comments/${commentId}/subcomments/${id}`,
        { subCommentText, userId: user.id }
      );
      setSubComments((prev) =>
        prev.map((subComment) => (subComment.id === id ? res.data : subComment))
      );
      setEditSubComment(false);
    } catch (err) {
      console.log(err.response.data.error);
    }
  };

  const increaseLike = async () => {
    try {
      const res = await axios.put(
        `${BASE_URL}/posts/${postId}/comments/${commentId}/subcomments/${id}/like`
      );
      setSubComments((prev) =>
        prev.map((subComment) => (subComment.id === id ? res.data : subComment))
      );
    } catch (err) {
      console.log(err.response.data.error);
    }
  };

  return (
    <div className="sub-comment-container">
      <div className="sub-comment-container__header">
        <h5>{commentedBy}</h5>
        <h6>on: {formatDate(createdOn)}</h6>
        {(user && userId === user.id) && (
          <div className="sub-comment-settings-btn">
            {!deleteSubComment && (
              <>
                <button type="button" onClick={() => setEditSubComment(prev => !prev)}>
                  <MdEdit />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDeleteSubComment(true);
                    setTimeout(() => {
                      setDeleteSubComment(false);
                    }, 5000);
                  }}
                >
                  <CgRemove />
                </button>
              </>
            )}
            {deleteSubComment && (
              <>
                <button
                  type="button"
                  onClick={() => setDeleteSubComment(false)}
                >
                  <TiCancelOutline />
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await axios.delete(
                        `${BASE_URL}/posts/${postId}/comments/${commentId}/subcomments/${id}`
                      );
                      setSubComments((prev) =>
                        prev.filter((subComment) => subComment.id !== id)
                      );
                    } catch (err) {
                      console.log(err.response.data.error);
                    }
                  }}
                >
                  <GiConfirmed />
                </button>
              </>
            )}
          </div>
        )}
      </div>
      <div className="sub-comment-container__body-text">
        {!editSubComment && <p>{text}</p>}
        {editSubComment && (
          <form onSubmit={handleSubmit} className="comment-form">
            <div className="regular-input">
              <input
                type="text"
                placeholder="Write a comment..."
                value={subCommentText}
                onChange={(e) => setSubCommentText(e.target.value)}
              />
            </div>
            <div className="comment-form__btns switch-btn">
              <button
                type="button"
                onClick={() => {
                  setEditSubComment(false);
                  setSubCommentText(text);
                }}
              >
                <TiCancelOutline />
              </button>
              <button type="submit"><GiConfirmed /></button>
            </div>
          </form>
        )}
      </div>
      <div className="sub-comment-container__likes">
        <p>{subCommentLikes} likes</p>
        <button type="button" onClick={increaseLike}>
          <BiSolidLike />
        </button>
      </div>
    </div>
  );
};

export default SubComment;

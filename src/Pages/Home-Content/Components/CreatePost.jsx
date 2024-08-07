import { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { PageContext } from "../../Context/PageContext";
import { LuImagePlus } from "react-icons/lu";
import { CiCircleRemove } from "react-icons/ci";
import { FcNext } from "react-icons/fc";
import { FcPrevious } from "react-icons/fc";

const CreatePost = ({ setPosts }) => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const { user } = useContext(PageContext);
  const [postText, setPostText] = useState("");
  const [postLocation, setPostLocation] = useState("");
  const [media, setMedia] = useState([]);
  const [mediaPreview, setMediaPreview] = useState("");
  const [previewIndex, setPreviewIndex] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const inputRef = useRef();
  const onChooseFile = () => inputRef.current.click();

  const handleMediaSelection = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setMedia((prev) => [...prev, ...Array.from(e.target.files)]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!postText && !media.length) {
      setLoading(false);
      setError("Post must contain text or media");
      setTimeout(() => {
        setError("");
      }, 5000);
      return;
    } else if (media.length > 5) {
      setLoading(false);
      setError("Post can only contain up to 5 media files in total");
      setTimeout(() => {
        setError("");
      }, 5000);
      return;
    } else {
      const formData = new FormData();
      formData.append("userId", Number(user.id));
      formData.append("postText", postText);
      formData.append("postLocation", postLocation);
      media.forEach((file) => formData.append("media", file));
      try {
        const res = await axios.post(`${BASE_URL}/posts`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setPosts((prev) => [res.data, ...prev]);
        clearPost();
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(err.response.data);
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    }
  };

  const clearPost = () => {
    setPostText("");
    setPostLocation("");
    setMediaPreview("");
    setMedia([]);
    setPreviewIndex(0);
  };

  const nextPreview = () => {
    setPreviewIndex((prev) => {
      if (prev === media.length - 1) {
        return 0;
      }
      return prev + 1;
    });
  };

  const prevPreview = () => {
    setPreviewIndex((prev) => {
      if (prev === 0) {
        return media.length - 1;
      }
      return prev - 1;
    });
  };

  const removeMedia = () => {
    setMedia((prev) => prev.filter((_, i) => i !== previewIndex));
    if (media.length) {
      setPreviewIndex(0);
    }
  };

  useEffect(() => {
    if (media.length) {
      setMediaPreview(
        <div key={previewIndex} className="preview-window">
          <button
            type="button"
            onClick={prevPreview}
            className="prev-preview-btn"
          >
            <FcPrevious />
          </button>
          <button
            type="button"
            onClick={nextPreview}
            className="next-preview-btn"
          >
            <FcNext />
          </button>
          <img
            src={URL.createObjectURL(media[previewIndex])}
            alt="media"
            style={{ width: "250px" }}
          />
          <button
            type="button"
            className="delete-media-btn"
            onClick={removeMedia}
          >
            <CiCircleRemove />
          </button>
        </div>
      );
    } else {
      setMediaPreview("");
      setPreviewIndex(0);
    }
  }, [media, previewIndex]);

  useEffect(() => {
    if (media.length > 5) {
      setError("Post can only contain up to 5 media files in total");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  }, [media]);

  return (
    <div className="create-post">
      {loading ? (
          <div className="loader">
            <h5>Loading...</h5>
          </div>
      ) : (
        <form className="create-form-container" onSubmit={handleSubmit}>
          <div className="create-form-container__location">
            <div className="regular-input">
              <input
                type="text"
                placeholder="Post's Location..."
                value={postLocation}
                onChange={(e) => setPostLocation(e.target.value)}
              />
            </div>
          </div>
          <div className="create-form-container__upload-media switch-btn">
            <input
              type="file"
              multiple
              ref={inputRef}
              style={{ display: "none" }}
              onChange={handleMediaSelection}
              accept="image/*"
            />
            <button type="button" onClick={onChooseFile}>
              <LuImagePlus />
            </button>
            <p>media: {media.length} / 5</p>
          </div>
          <div className="create-form-container__post-text">
            <div className="regular-input">
              <input
                type="text"
                placeholder="Post's Text..."
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
              />
            </div>
          </div>
          <div className="create-form-container__media-preview">
            {mediaPreview}
          </div>
          <div className="create-form-container__btns main-btns">
            <button type="button" onClick={clearPost}>
              Cancel
            </button>
            <button type="submit">Submit</button>
          </div>
          <div className="create-form-container__error">
            {error && <p>{error}</p>}
          </div>
        </form>
      )}
    </div>
  );
};

export default CreatePost;

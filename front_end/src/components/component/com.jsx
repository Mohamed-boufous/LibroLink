import React, { useState, useEffect, useRef } from "react";
import { FiThumbsUp, FiThumbsDown, FiMoreVertical } from "react-icons/fi";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { axiosClient } from "@/api/axios";
import { useStateContext } from "@/context/ContextProvider";

export default function CommentSection({ bookId }) {
  const [comments, setComments] = useState([]);
  /* {
      id: 1,
      likes: 20,
      deslikes: 0,
      liked: false,
      disliked: false,
      replyInput: "",
      showReplyInput: false,
      optionsVisible: false,
    }, */
  const handleLikeClick = (id) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === id
          ? {
              ...comment,
              likes: comment.liked ? comment.likes - 1 : comment.likes + 1,
              liked: !comment.liked,
              disliked: comment.disliked ? false : comment.disliked,
              deslikes: comment.disliked
                ? comment.deslikes - 1
                : comment.deslikes,
            }
          : comment
      )
    );
  };

  const handleDislikeClick = (id) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === id
          ? {
              ...comment,
              deslikes: comment.disliked
                ? comment.deslikes - 1
                : comment.deslikes + 1,
              disliked: !comment.disliked,
              liked: comment.liked ? false : comment.liked,
              likes: comment.liked ? comment.likes - 1 : comment.likes,
            }
          : comment
      )
    );
  };

  const handleShowReplyInput = (id) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === id
          ? {
              ...comment,
              showReplyInput: !comment.showReplyInput,
              optionsVisible: false,
            }
          : comment
      )
    );
  };

  const toggleOptions = (id) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === id
          ? { ...comment, optionsVisible: !comment.optionsVisible }
          : { ...comment, optionsVisible: false }
      )
    );
  };

  const optionsRef = useRef([]);

  useEffect(() => {
    function handleClickOutside(event) {
      optionsRef.current.forEach((ref, index) => {
        // Vérifiez si le clic est en dehors du champ de réponse
        if (
          ref &&
          !ref.contains(event.target) &&
          !event.target.classList.contains("reply-input") // Ne ferme pas si le clic est sur le champ de réponse lui-même
        ) {
          setComments((prevComments) =>
            prevComments.map((comment, i) =>
              i === index ? { ...comment, showReplyInput: false } : comment
            )
          );
        }
      });
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [textComment, setTextComment] = useState(null);
  const { currentUser } = useStateContext();
  const [load, setLoad] = useState(false);
  const handleCommentSubmit = (event) => {
    event.preventDefault();
    const formData = {
      text: textComment,
      book_id: bookId,
      replied_id: 0,
      user_id: currentUser.id,
    };
    axiosClient
      .post("/api/add_comment", formData)
      .then((response) => {
        setTextComment("");
        setLoad(!load);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axiosClient
      .get(`/api/list_comments?book_id=${bookId}`)
      .then((response) => {
        setComments(
          response.data.map((comment) => ({
            ...comment,
            liked: false,
            disliked: false,
            replyInput: "",
            showReplyInput: false,
            optionsVisible: false,
          }))
        );
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [load]);
  return (
    <div className="bg-white p-6">
      <h2 className="text-xl font-semibold mb-4">2 Comments</h2>
      <form onSubmit={handleCommentSubmit}>
        <div className="flex flex-col space-y-2 items-end border-b border-gray-200 mb-5 pb-5">
          <div className="w-full">
            <div className="flex items-center">
              <Avatar className="">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>AV</AvatarFallback>
              </Avatar>
              <h3 className="font-semibold text-orange-500 ml-3">User</h3>
            </div>
            <textarea
              name="comment"
              className=" w-[98%] mx-12 h-24 p-2 outline-none border rounded resize-none"
              placeholder="Write a comment..."
              onChange={(e) => setTextComment(e.target.value)}
              required
              value={textComment}
            ></textarea>
          </div>
          <Button className=" h-10">Post Comment</Button>
        </div>
      </form>

      {/* Liste des commentaires */}
      {comments ? (
        comments.map((comment, index) => (
          <div key={comment.id} className="flex items-start space-x-3 mb-4">
            <Avatar className="">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>AV</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-orange-500">
                  {comment.user.userName}
                </h3>
                <span className="text-sm text-gray-500">
                  Comment Date {comment.date}
                </span>
              </div>
              <p className="text-gray-600 text-sm mt-1">{comment.text}</p>
              <div className="flex items-center justify-between mt-2">
                <div className="flex space-x-1 text-sm cursor-pointer">
                  <div
                    className={`flex space-x-1 ${
                      comment.liked ? "text-blue-500" : "text-gray-500"
                    }`}
                    onClick={() => handleLikeClick(comment.id)}
                  >
                    <FiThumbsUp className="w-5 h-5" />
                    <span>{comment.likes}</span>
                  </div>
                  <div
                    className={`flex space-x-1 ${
                      comment.disliked ? "text-red-500" : "text-gray-500"
                    }`}
                    onClick={() => handleDislikeClick(comment.id)}
                  >
                    <FiThumbsDown className="w-5 h-5" />
                    <span>{comment.deslikes}</span>
                  </div>
                  <div
                    ref={(ref) => (optionsRef.current[index] = ref)}
                    className="cursor-pointer ml-1"
                  >
                    <FiMoreVertical
                      onClick={() => toggleOptions(comment.id)}
                      className="w-5 h-5 text-gray-500"
                    />{" "}
                  </div>
                </div>
                {comment.optionsVisible && (
                  <div className="bg-white shadow-md rounded-md absolute mt-2 p-2">
                    <ul>
                      <li
                        className="p-2 cursor-pointer"
                        onClick={() => handleShowReplyInput(comment.id)}
                      >
                        Reply
                      </li>
                      <li className="p-2 cursor-pointer">Report</li>
                    </ul>
                  </div>
                )}
              </div>
              {comment.showReplyInput && (
                <input
                  type="text"
                  value={comment.replyInput}
                  onChange={(e) =>
                    setComments((prevComments) =>
                      prevComments.map((c, i) =>
                        i === index ? { ...c, replyInput: e.target.value } : c
                      )
                    )
                  }
                  placeholder="Write a reply..."
                  className="w-full p-2 border border-gray-300 rounded-md mt-2 reply-input" // Ajoutez la classe reply-input
                />
              )}
            </div>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
      {/* Fin de la liste des commentaires */}
    </div>
  );
}

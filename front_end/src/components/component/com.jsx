import React, { useState, useEffect, useRef } from "react";
import { FiThumbsUp, FiThumbsDown, FiMoreVertical } from 'react-icons/fi';


export default function CommentSection() {
  const [comments, setComments] = useState([
    {
      id: 1,
      likeCount: 20,
      dislikeCount: 0,
      liked: false,
      disliked: false,
      replyInput: "",
      showReplyInput: false,
      optionsVisible: false
    },
    {
      id: 2,
      likeCount: 0,
      dislikeCount: 0,
      liked: false,
      disliked: false,
      replyInput: "",
      showReplyInput: false,
      optionsVisible: false
    },
    // Ajoutez plus de commentaires si nécessaire
  ]);

  const handleLikeClick = (id) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === id
          ? {
              ...comment,
              likeCount: comment.liked ? comment.likeCount - 1 : comment.likeCount + 1,
              liked: !comment.liked,
              disliked: comment.disliked ? false : comment.disliked,
              dislikeCount: comment.disliked ? comment.dislikeCount - 1 : comment.dislikeCount,
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
              dislikeCount: comment.disliked ? comment.dislikeCount - 1 : comment.dislikeCount + 1,
              disliked: !comment.disliked,
              liked: comment.liked ? false : comment.liked,
              likeCount: comment.liked ? comment.likeCount - 1 : comment.likeCount,
            }
          : comment
      )
    );
  };

  const handleShowReplyInput = (id) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === id ? { ...comment, showReplyInput: !comment.showReplyInput, optionsVisible: false } : comment
      )
    );
  };
  
  
  

  const toggleOptions = (id) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === id ? { ...comment, optionsVisible: !comment.optionsVisible } : { ...comment, optionsVisible: false }
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
  

  return (
    <div key="1" className="bg-white p-6">
      <h2 className="text-xl font-semibold mb-4">2 Comments</h2>
      <div className="border-b border-gray-200 mb-4">
        <input
          aria-label="Join the discussion"
          className="w-full p-3 border border-gray-300 rounded-md mb-6"
          placeholder="Join the discussion..."
        />
      </div>

      {/* Liste des commentaires */}
      {comments.map((comment, index) => (
        <div key={comment.id} className="flex items-start space-x-3 mb-4">
          <div className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center text-lg font-semibold">
            A
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-orange-500">User{comment.id}</h3>
              <span className="text-sm text-gray-500">Comment Date {comment.id}</span>
            </div>
            <p className="text-gray-600 text-sm mt-1">
              This is the {comment.id === 1 ? "first" : "second"} comment.
            </p>
            <div className="flex items-center justify-between mt-2">
  <div className="flex space-x-1 text-sm cursor-pointer">
    <div
      className={`flex space-x-1 ${
        comment.liked ? "text-blue-500" : "text-gray-500"
      }`}
      onClick={() => handleLikeClick(comment.id)}
    >
      <FiThumbsUp className="w-5 h-5" />
      <span>{comment.likeCount}</span>
    </div>
    <div
      className={`flex space-x-1 ${
        comment.disliked ? "text-red-500" : "text-gray-500"
      }`}
      onClick={() => handleDislikeClick(comment.id)}
    >
      <FiThumbsDown className="w-5 h-5" />
      <span>{comment.dislikeCount}</span>
    </div>
    <div ref={(ref) => (optionsRef.current[index] = ref)} className="cursor-pointer ml-1">
      <FiMoreVertical
        onClick={() => toggleOptions(comment.id)}
        className="w-5 h-5 text-gray-500"
      />{" "}
    </div>
  </div>
            {comment.optionsVisible && (
              <div className="bg-white shadow-md rounded-md absolute mt-2 p-2">
                <ul>
                  <li className="p-2 cursor-pointer" onClick={() => handleShowReplyInput(comment.id)}>Reply</li>
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
      ))}
      {/* Fin de la liste des commentaires */}
    </div>
  );
}

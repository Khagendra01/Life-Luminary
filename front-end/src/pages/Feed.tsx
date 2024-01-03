import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getEachReact, getPost, getReact, postReact } from "../api/postFeed";
import { EachReact, FeedPosts, ReactionModel, UserReact, ReactionModelPost } from "../models/postModel";
import { AuthContext } from "../App";
import { getAllUser } from "../api/activity";

const Feed: React.FC = () => {

  const { user } = useContext(AuthContext) || {};

  const [posts, setPosts] = useState<FeedPosts[] | null>([]);

  const [goodJob, setGoodJob] = useState<ReactionModel>({});
  const [love, setLove] = useState<ReactionModel>({});

  const [isGoodJob, setIsGoodJob] = useState<ReactionModel>({});
  const [isLove, setIsLove] = useState<ReactionModel>({});

  const [postUser, setPostUser] = useState<ReactionModelPost>({});

  const [postLoading, setPostLoading] = useState(true);

  const getAllPost = async () => {
    await getPost()
      .then((res) => {
        setPosts(res);
        setPostLoading(false);
      })
      .catch(() => {
        console.log("Error fetching Posts");
      });
  };
  useEffect(() => {
    getAllPost();
  }, []);

  const handleGoodJob = async (postId: string) => {

    if( isGoodJob[postId] !== undefined && isLove[postId] !== undefined){
      const newReact: UserReact = {
        userId: user?.id,
        postId: postId,
        isGoodJob: !isGoodJob[postId],
        isLove: isGoodJob[postId],
      }
    
    await postReact(newReact)
    .then( () => {
      getAllReact(postId)
      getMyReact(postId)
    })
    .catch(() => {
      console.log("try again");
    });
  }

  };

  const handleLove = async (postId: string) => {

    if( isGoodJob[postId] !== undefined && isLove[postId] !== undefined){
      const newReact: UserReact = {
        userId: user?.id,
        postId: postId,
        isGoodJob: isGoodJob[postId],
        isLove: !isLove[postId],
      }
    
    await postReact(newReact)
    .then( () => {
      getAllReact(postId)
      getMyReact(postId)
    })
    .catch(() => {
      console.log("try again");
    });
  }

  };

  const getAllReact = async (postId: string) => {
    await getReact(postId)
      .then((res) => {
        setGoodJob((prevState) => ({
          ...prevState,
          [postId]: res?.goodJob,
        }));

        setLove((prevState) => ({
          ...prevState,
          [postId]: res?.love,
        }));
      })
      .catch(() => {
        console.log("Error fetching reactions");
      });
  };

  const getMyReact = async (postId: string) => {

    const thisReq: EachReact = {
      userId: user?.id,
      postId: postId
    }

    await getEachReact(thisReq)
    .then((res) => {
      setIsGoodJob((prevState) => ({
        ...prevState,
        [postId]: res?.goodJob,
      }));
      setIsLove((prevState) => ({
        ...prevState,
        [postId]: res?.love,
      }));
    })
    .catch(() => {
      console.log("Error fetching reactions");
    });
    
  }

  const getUsers = async(postId: string, userId: string) => {
    await getAllUser(userId)
    .then((res) => {

      setPostUser((prevState) => ({
        ...prevState,
        [postId]: res,
      }));
    })
    .catch(() => {
      console.log("Error fetching users profile");
    });
  }

  useEffect(() => {
    const fetchReactions = async () => {
      if (posts) {
        console.log(posts)
        await Promise.all(posts.map((post) => {       
          getAllReact(post.id);
          getUsers(post.id, post.userID)
          getMyReact(post.id);     
        }
          ));
      }
    };

    fetchReactions();
  }, [posts]);

  return (
    <>
      <Navbar />
      {posts == null && postLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="p-4 space-y-4">
          {posts &&
            posts.map((post) => (
              <>
                <div
                  key={post.id}
                  className="border rounded shadow p-4 space-y-2"
                >
                  <h3 className="text-xl font-bold">{postUser[post.id]?.firstName}{postUser[post.id]?.lastName}</h3>
                  <p className="text-base">{post.content}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <button
                        onClick={() => handleGoodJob(post.id)}
                        disabled={false}
                        className={`px-2 py-1 ${isGoodJob[post.id] !== undefined && isGoodJob[post.id] ? 'bg-secondary' : 'bg-blue-500'} text-white rounded mr-2`}
                      >
                        Good Job
                      </button>
                      <span className="mr-2">{goodJob[post.id]} </span>
                    </div>
                    <div>
                      <button
                        onClick={() => handleLove(post.id)}
                        disabled={false}
                        className={`px-2 py-1 ${isLove[post.id] !== undefined && isLove[post.id] ? 'bg-secondary' : 'bg-red-500'} text-white rounded mr-2`}
                      >
                        Love
                      </button>
                      <span>{love[post.id]} </span>
                    </div>
                  </div>
                </div>
              </>
            ))}
        </div>
      )}
      <Footer />
    </>
  );
};

export default Feed;

import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getEachReact, getPost, getReact } from "../api/postFeed";
import { EachReact, FeedPosts, ReactionModel } from "../models/postModel";
import { AuthContext } from "../App";

const Feed: React.FC = () => {

  const { user } = useContext(AuthContext) || {};

  const [posts, setPosts] = useState<FeedPosts[] | null>([]);

  const [goodJob, setGoodJob] = useState<ReactionModel>({});
  const [love, setLove] = useState<ReactionModel>({});

  const [isGoodJob, setIsGoodJob] = useState<ReactionModel>({});
  const [isLove, setIsLove] = useState<ReactionModel>({});

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

  const handleGoodJob = async () => {};

  const handleLove = async () => {};

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


  useEffect(() => {
    const fetchReactions = async () => {
      if (posts) {
        await Promise.all(posts.map((post) => { 
          
          getAllReact(post.id);
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
                  <h3 className="text-xl font-bold">{post.userId}</h3>
                  <p className="text-base">{post.content}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <button
                        onClick={() => handleGoodJob()}
                        disabled={false}
                        className="px-2 py-1 bg-blue-500 text-white rounded mr-2"
                      >
                        Good Job
                      </button>
                      <span className="mr-2">{goodJob[post.id]} {isGoodJob[post.id]}</span>
                    </div>
                    <div>
                      <button
                        onClick={() => handleLove()}
                        disabled={false}
                        className="px-2 py-1 bg-red-500 text-white rounded mr-2"
                      >
                        Love
                      </button>
                      <span>{love[post.id]} {isLove[post.id]}</span>
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

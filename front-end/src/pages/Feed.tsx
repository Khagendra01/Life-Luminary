import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getPost, getReact } from "../api/postFeed";
import { FeedPosts } from "../models/postModel";

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<FeedPosts[] | null>([]);

  const [goodJob, setGoodJob] = useState();
  const [love, setLove] = useState();

  const [];

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

  const getAllReact = async ( postId : string) =>
  {
        await getReact(postId)
        .then((res) => {
            //sdfsdf
        }).catch(() =>
        {
            //sdfsdfsdf
        })
  }

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
                { getAllReact(post.id)}
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
                      <span className="mr-2">{goodJob}</span>
                    </div>
                    <div>
                      <button
                        onClick={() => handleLove()}
                        disabled={false}
                        className="px-2 py-1 bg-red-500 text-white rounded mr-2"
                      >
                        Love
                      </button>
                      <span>{love}</span>
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

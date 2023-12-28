import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface Post {
    id: number;
    title: string;
    content: string;
    goodJob: number;
    love: number;
}

const Feed: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([
        {
            id: 1,
            title: 'First Post',
            content: 'This is the content of the first post.',
            goodJob: 0,
            love: 0,
        },
        {
            id: 2,
            title: 'Second Post',
            content: 'This is the content of the second post.',
            goodJob: 0,
            love: 0,
        },
    ]);

    const handleUpvote = (postId: number) => {
        setPosts(prevPosts =>
            prevPosts.map(post =>
                post.id === postId ? { ...post, goodJob: post.goodJob + 1 } : post
            )
        );
    };

    const handleDownvote = (postId: number) => {
        setPosts(prevPosts =>
            prevPosts.map(post =>
                post.id === postId ? { ...post, love: post.love + 1 } : post
            )
        );
    };

    return (
        <>
           <Navbar />
<div className="p-4 space-y-4">
    {posts.map(post => (
        <div key={post.id} className="border rounded shadow p-4 space-y-2">
            <h3 className="text-xl font-bold">{post.title}</h3>
            <p className="text-base">{post.content}</p>
            <div className="flex items-center justify-between">
                <div>
                    <button onClick={() => handleUpvote(post.id)} disabled={false} className="px-2 py-1 bg-blue-500 text-white rounded mr-2">Good Job</button>
                    <span className="mr-2">{post.goodJob}</span>
                </div>
                <div>
                    <button onClick={() => handleDownvote(post.id)} disabled={false} className="px-2 py-1 bg-red-500 text-white rounded mr-2">Love</button>
                    <span>{post.love}</span>
                </div>
            </div>
        </div>
    ))}
</div>
<Footer />
        </>
    );
};

export default Feed;


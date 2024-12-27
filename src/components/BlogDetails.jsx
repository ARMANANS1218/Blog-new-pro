import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const BlogDetails = ({post}) => {
     const { posts, loading  } = useContext(AppContext);
    return (
        <div className='post w-11/12 max-w-[1000px] text-justify p-10 flex  flex-col gap-7 bg-orange-200 rounded-2xl hover:shadow-2xl '>
            <NavLink to={`/blog/${post.id}`}>
                <span className='font-bold hover:underline
                text-xl '>{post.title}</span>
            </NavLink>
            <p className='mt-[-15px]'>
                By
                <span className='text-red-500 hover:text-red-700 '> {post.author} </span>
                on {" "}

                <NavLink to={`categories/${post.category.replace(" ","-")}`}>
                    <span>{post.category}</span>
                </NavLink>

                <p>Posted on {post.date}</p>
                <p className='text-justify'>{post.content}</p>
                <div className='mt-4'>
                    {post.tags.map( (tag,index) => (
                        <NavLink key={index} to={`/tags/${tag.replace(" ","-")}`}>
                            <span className='text-blue-600 text-sm font-bold me-5 hover:text-blue-900 hover:underline'>{`#${tag}`}</span>
                        </NavLink>
                    ))}
                </div>

            </p>
        </div>
    )
}

export default BlogDetails
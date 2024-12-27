import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Header from '../components/Header';
import BlogDetails from '../components/BlogDetails';

const BlogPage = () => {
    const newbaseUrl="https://codehelp-apis.vercel.app/api/"
    const [blog,setBlog]=useState(null);
    const [relatedBlogs,setRelatedBlogs] =useState([]);
    const navigation = useNavigate();
    const location = useLocation();
    const {setLoading,loading} =useContext(AppContext)

    const blogId =location.pathname.split("/").at(-1);

    async function fetchrelatedBlogs() {
        setLoading(true);
        let url = `${newbaseUrl}get-blog?blogId=${blogId}`;
        try{
            const res= await fetch(url);
            const data =await res.json();
            setBlog(data.blog);
            setRelatedBlogs(data.relatedBlogs);
        }
        catch(error){
            console.log("Fetcing Fail");
            setBlog(null);
            setRelatedBlogs([]);
        }
        setLoading(false);
    }

    useEffect(()=>{
        if(blogId){
            fetchrelatedBlogs();
        }
        
    },[location.pathname])

  return (
    <div className='flex justify-center '>
        <Header/>
        <div>
            <button
                onClick={() => navigation(-1)}
            >
                BACK
            </button>
        </div>
        {
            loading ? <p>Loading</p>:
            blog?
            (<div>
                   <div className='mt-[80px]'>
                   <BlogDetails post={blog}/>
                   </div>
                    <h2 className='text-center bg-slate-300 w-10/12 p-3 m-3  ms-8 flex items-center justify-center'>Related Blogs</h2>
                    {
                       relatedBlogs.map((post)=>(
                            <div className='mt-5' key={post.id}>
                            <BlogDetails post={post}  />
                        </div>
                       ))
                    }
              </div>  
                 ):

                 (
                    <div >
                    <p>No Blogs found</p>
                  </div>
                 )

        }
    </div>
  )
}

export default BlogPage
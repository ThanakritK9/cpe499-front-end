'use client';
import React, { useEffect, useState } from "react";
import Link from "next/link";
import DeleteBtn from "@/app/components/DeleteBtn";

export default function Page() {

  const [postData, setPostData] = useState([]);

  console.log(postData);

  const getPosts = async () => {
    try{
        const res = await fetch("https://cpe499-back-end.onrender.com/api/series", {
            cache: "no-store"
        })

        if (!res.ok) {
            throw new Error("Failed to fecth posts");
        }

        const data = await res.json();
        setPostData(data);

    } catch(error) {
        console.log("Error loading posts: ", error)
    }
  }
  console.log(postData);

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <main>
        <div className="w-full flex flex-col justify-center items-center z-0">
            <div className="w-9/12 flex flex-col justify-center items-center mt-32 max-lg:mt-24">
                <span className="text-3xl font-bold mb-16">
                    Series
                </span>
            </div>
            <div className="w-full flex flex-col justify-center items-center mt-16 max-lg:mt-2">
                <div className="w-9/12 flex justify-end items-center mb-9 max-lg:justify-center">
                    <Link href='/Create'>
                        <span className="py-2 px-4 font-bold text-xl text-white bg-black rounded hover:rounded-3xl"> 
                            Add New Series
                        </span>
                    </Link>
                </div>
                <div className="w-9/12 flex flex-row flex-wrap justify-center items-center gap-8 mb-20 max-lg:mb-56 ">
                    {postData && postData.length > 0 ? (
                        postData.map(val => (
                            <div key={val._id}>
                                <div className="group flex flex-col overflow-hidden cursor-pointer rounded-lg border-2 border-white hover:border-gray-400">
                                    <div className="h-[340px] flex justify-center items-center bg-gray-100">
                                        <img
                                            src={val.picture}
                                            width={320}
                                            height={100}
                                            className="object-cover transition-transform duration-300 hover:scale-[1.05] group-hover:scale-[1.05]"
                                        />
                                    </div>
                                    <div className="flex flex-col justify-center items-center pl-2 pt-5 pb-5 bg-white">
                                        <span className="font-bold bg-white z-10">{val.name}</span>
                                    </div>
                                    <div className="absolute w-auto h-auto bg-black rounded z-0 mt-1.5 ml-1.5">
                                        <div className="p-1 font-bold text-sm text-white">
                                                Seires : {val.series}
                                        </div>
                                    </div>
                                    <div className="flex justify-end mt-3 p-2">
                                        <Link className="bg-gray-400 text-white border py-1 px-2 m-1 rounded-md text-lg hover:bg-black hover:rounded-2xl" href={`/Edit/${val._id}`}>Edit</Link>
                                        <DeleteBtn id={val._id} />
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>
                            You do not have any posts yet.
                        </p>
                    )}
                </div>
            </div>
        </div>
    </main>
  )
}

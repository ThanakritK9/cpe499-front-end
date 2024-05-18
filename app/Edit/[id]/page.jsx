'use client';
import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function EditPostPage({ params }) {

  const { id } = params;

  const [name, setName] = useState("");
  const [series, setSeries] = useState("");
  const [picture, setPicture] = useState("");

  const router = useRouter();

  const getPostById = async (id) => {
    try{
        const res = await fetch(`https://cpe499-back-end.onrender.com/api/series/${id}`,{
            method: "GET",
            cache: 'no-store'
        })

        if (!res.ok) {
            throw new Error("Failed to fetch a post");
        }

        const data = await res.json();
        console.log("edit post", data);
        setName(data.name);
        setSeries(data.series);
        setPicture(data.picture);


    } catch(error) {
        console.log(error);
    }
  }

  useEffect(() => {
    getPostById(id);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const res = await fetch(`https://cpe499-back-end.onrender.com/api/series/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, series, picture })
        })

        if (!res.ok) {
            throw new Error("Failed to update Series")
        }

        router.refresh();
        router.push("/")

    } catch(error) {
        console.log(error);
    }
  }

  return (
    <div className="w-full flex flex-col justify-center items-center z-0">
            <div className="w-9/12 flex flex-col justify-center items-center mt-32 rounded-xl border p-6">
                <h1 className="font-bold text-3xl mb-16">Edit Series</h1>
                <hr />
                <div className="w-9/12 flex justify-end items-center mb-9 max-lg:justify-center">
                    <Link href={"/"}>
                        <span className="py-2 px-4 font-bold text-xl text-white bg-black rounded hover:rounded-3xl">
                            Go Back
                        </span>
                    </Link>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center">
                    <div>
                        <input
                            onChange={(e) => setName(e.target.value)}
                            type='text'
                            placeholder={name}
                            id='name'
                            name='name'
                            value={name}
                            className="w-[640px] max-lg:w-[270px] block bg-gray-200 border py-1 rounded text-lg my-2 text-center drop-shadow-md"
                        />
                    </div>
                    <div>
                        <input
                            onChange={(e) => setSeries(e.target.value)}
                            type='text'
                            placeholder={"Series : " + series}
                            id='series'
                            name='series'
                            value={series}
                            className="w-[640px] max-lg:w-[270px] block bg-gray-200 border py-1 rounded text-lg my-2 text-center drop-shadow-md"
                        />
                    </div>
                    <div>
                        <input
                            onChange={(e) => setPicture(e.target.value)}
                            type='text'
                            placeholder={picture}
                            id='picture'
                            name='picture'
                            value={picture}
                            className="w-[640px] max-lg:w-[270px] block bg-gray-200 border py-1 rounded text-lg my-2 text-center drop-shadow-md"
                        />
                    </div>
                    <button type='submit' className="w-[290px] max-lg:w-[230px] block bg-gray-400 py-2 rounded font-bold text-xl text-white my-2 text-center mt-9 hover:rounded-3xl hover:bg-black">
                        Update Series
                    </button>
                </form>
            </div>
        </div>
  )
}

export default EditPostPage

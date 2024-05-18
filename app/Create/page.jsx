'use client';
import React, { useState } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function CreatePostPage() {
    const [name, setName] = useState("");
    const [series, setSeries] = useState("");
    const [picture, setPicture] = useState("");

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !series || !picture) {
            alert("Please complete all inputs");
            return;
        }

        try {
            const res = await fetch("https://cpe499-back-end.onrender.com/api/series", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, series, picture })
            })

            if (res.ok) {
                router.push("/");
            } else {
                throw new Error("Failed to create Series");
            }

        } catch(error) {
            console.log(error);
        }
    }

    return (
        <div className="w-full flex flex-col justify-center items-center z-0 ">
            <div className="w-9/12 flex flex-col justify-center items-center mt-32 rounded-xl border p-6">
                <h1 className="font-bold text-3xl mb-16">Add New Series</h1>
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
                            placeholder='Name Series'
                            id='name'
                            name='name'
                            className="w-[640px] max-lg:w-[270px] block bg-gray-200 border py-1 rounded text-lg my-2 text-center drop-shadow-md"
                        />
                    </div>
                    <div>
                        <input
                            onChange={(e) => setSeries(e.target.value)}
                            type='text'
                            placeholder='Number Series'
                            id='series'
                            name='series'
                            className="w-[640px] max-lg:w-[270px] block bg-gray-200 border py-1 rounded text-lg my-2 text-center drop-shadow-md"
                        />
                    </div>
                    <div>
                        <input
                            onChange={(e) => setPicture(e.target.value)}
                            type='text'
                            placeholder='Link Picture'
                            id='picture'
                            name='picture'
                            className="w-[640px] max-lg:w-[270px] block bg-gray-200 border py-1 rounded text-lg my-2 text-center drop-shadow-md"
                        />
                    </div>
                    <button type='submit' className="w-[290px] max-lg:w-[230px] block bg-gray-400 py-2 rounded font-bold text-xl text-white my-2 text-center mt-9 hover:rounded-3xl hover:bg-black">
                        Add Series
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreatePostPage

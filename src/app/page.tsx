"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { use } from "react";

export default function Home() {
  const [state, setState] = React.useState<null | string>(null);
  const [username, setUserName] = React.useState<string>("");
  const router = useRouter();
  const handleJoin = () => {
    if (username) {
        setState("Joining");
        setTimeout(() => {
        router.push(`/video-conference/${username}`);
      }, 3000); // Simulate a delay for joining
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 gap-5">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
        Welcome to Video Conference
      </h1>
      <div>
        <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)} autoFocus placeholder="Your Name" type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        <button type="button" disabled={state === "Joining"} onClick={handleJoin} className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Join</button>
      </div>
      <span className="text-gray-500 text-sm">
        {state === "Joining" ? "Joining..." : "Enter your name to join the conference"}
      </span>
    </div>
  );
}

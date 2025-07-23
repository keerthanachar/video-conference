"use client"

import React from 'react'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'

type Props = {}

import { useRef, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

type Params = {
  username: string;
}

function page({ }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const {username} = useParams<Params>();
  const [joined, setJoined] = React.useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (containerRef.current) {
      const appID: number = parseInt(process.env.NEXT_PUBLIC_APP_ID || ""); // Replace with your App ID
      const roomID = `${username}-room`;
      const userID = `${username}-${Math.floor(Math.random() * 10000)}`;
      
      const zp = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        process.env.NEXT_PUBLIC_SERVER_SECRET || '',
        roomID,
        userID,
        username
      );
      const zc = ZegoUIKitPrebuilt.create(zp);
      zc.joinRoom({
        container: containerRef.current,
        scenario: {
          mode: ZegoUIKitPrebuilt.VideoConference,
        },
        onLeaveRoom: () => {
          router.push('/'); // Redirect to home page on leave
        },
        onJoinRoom: () => {
          setJoined(true); // Set joined state to true when the user joins the room
        }
      });

    }
  }, []);

  return (
    <>
    <>
    {
      joined &&  <div ref={containerRef} className="w-full h-full"></div> 
    }
    </>

    <>
    {!joined && <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 gap-5">
      <h6 className="text-1xl sm:text-3xl md:text-3xl lg:text-3xl font-bold mb-6">
        Hello {username},
      </h6>
      <div ref={containerRef} className="w-full h-f ull"></div>
      <span className="text-gray-500 text-sm">
        {`You are in the conference as ${username}`}
      </span>
    </div>}
    </>
    </>
  );
}

export default page
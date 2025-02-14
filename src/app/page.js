'use client'

import React, { useEffect, useState } from "react";
import Link from "next/link";

const HeartLoader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-pink-400 via-red-400 to-purple-500">
      <svg
        className="heart-loader"
        fill="none"
        height="200px"
        width="200px"
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 471.701 471.701"
        xmlSpace="preserve"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
        <g id="SVGRepo_iconCarrier">
          <path
            className="heart-path"
            d="M433.601,67.001c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7,13.6-92.4,38.3l-12.9,12.9l-13.1-13.1c-24.7-24.7-57.6-38.4-92.5-38.4c-34.8,0-67.6,13.6-92.2,38.2c-24.7,24.7-38.3,57.5-38.2,92.4c0,34.9,13.7,67.6,38.4,92.3l187.8,187.8c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-3.9l188.2-187.5c24.7-24.7,38.3-57.5,38.3-92.4C471.801,124.501,458.301,91.701,433.601,67.001z M414.401,232.701l-178.7,178l-178.3-178.3c-19.6-19.6-30.4-45.6-30.4-73.3s10.7-53.7,30.3-73.2c19.5-19.5,45.5-30.3,73.1-30.3c27.7,0,53.8,10.8,73.4,30.4l22.6,22.6c5.3,5.3,13.8,5.3,19.1,0l22.4-22.4c19.6-19.6,45.7-30.4,73.3-30.4c27.6,0,53.6,10.8,73.2,30.3c19.6,19.6,30.3,45.6,30.3,73.3C444.801,187.101,434.001,213.101,414.401,232.701z"
          ></path>
        </g>
      </svg>
    </div>
  );
};

const loaderStyles = `
  .heart-loader {
    animation: fillHeart 3s ease-in-out infinite;
    transform: rotate(-45deg);
  }

  .heart-path {
    fill: transparent;
    stroke: red;
    stroke-width: 5;
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: dashHeart 3s ease-in-out infinite;
  }

  @keyframes dashHeart {
    0% {
      stroke-dashoffset: 1000;
    }
    50% {
      stroke-dashoffset: 0;
      fill: red;
    }
    100% {
      stroke-dashoffset: 1000;
      fill: red;
    }
  }
`;

const HomePage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); 
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style>{loaderStyles}</style>
      {loading ? (
        <HeartLoader />
      ) : (
        <div className="min-h-screen bg-gradient-to-r from-pink-500 via-red-500 to-purple-600 flex flex-col items-center justify-center p-4 sm:p-8">
          <div className="text-center text-white">
            <h1 className="text-4xl sm:text-6xl font-bold mb-4">Happy Valentine’s Day!</h1>
            <p className="text-xl sm:text-2xl mb-8">
              Celebrate love and joy with a heartfelt card! 💖
            </p>
            <Link href="/card">
              <p className="bg-white text-pink-500 font-bold py-3 px-6 rounded-lg shadow-lg hover:opacity-90 mb-8 text-lg sm:text-xl">
                View Your Card
              </p>
            </Link>
            <Link href="/sex">
              <p className="bg-white text-pink-500 font-bold py-3 px-6 rounded-lg shadow-lg hover:opacity-90 text-lg sm:text-xl">
                Sex
              </p>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;

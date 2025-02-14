import React from "react";
import Link from "next/link";

const HomePage = () => {
  return (
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
  );
};

export default HomePage;

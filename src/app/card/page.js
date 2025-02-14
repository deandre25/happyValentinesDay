import React from "react";
import Link from "next/link";
import Image from "next/image";

const Card = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-600 via-red-500 to-pink-500 flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="text-center text-white">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Your Valentine’s Day Card</h1>
        <p className="text-lg sm:text-xl mb-8">
          Wishing you love, joy, and happiness! 💌
        </p>
      </div>

      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-6 text-center">
        <div className="relative w-full h-48 sm:h-60 mb-6">
          <Image
            src="/title.jpg"
            alt="Love"
            layout="fill"
            objectFit="cover"
            className="rounded-xl"
          />
        </div>

        <p className="text-base sm:text-lg text-gray-700 mb-4">
          Love is in the air! Share this card with someone special. 💌
        </p>

        <Link href="/">
          <p className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 px-4 rounded-lg shadow hover:opacity-90 text-lg sm:text-xl">
            Back to Home
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Card;

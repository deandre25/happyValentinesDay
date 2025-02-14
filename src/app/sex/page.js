'use client'

import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';

export default function DragAndDropPage() {
  const [images, setImages] = useState([
    { id: 1, src: "/image1.jpg", name: 'Жужик' },
    { id: 2, src: "/image2.jpg", name: 'Заюш' },
    { id: 3, src: "/image3.jpg", name: 'Пупок' },
    { id: 4, src: "/image4.jpg", name: 'Соля' },
    { id: 5, src: "/image5.jpg", name: 'Плєвок' },
    { id: 6, src: "/image6.jpg", name: 'Юлік' },
  ]);

  const [blocks, setBlocks] = useState([null, null]);
  const [pairs, setPairs] = useState([]);

  const handleDrop = (imageId, blockIndex) => {
    if (blocks[blockIndex] === null) {
      const selectedImage = images.find((img) => img.id === imageId);
      const newBlocks = [...blocks];
      newBlocks[blockIndex] = selectedImage;
      setBlocks(newBlocks);

      setImages((prevImages) => prevImages.filter((img) => img.id !== imageId));

      if (newBlocks[0] && newBlocks[1]) {
        setPairs((prevPairs) => [...prevPairs, { left: newBlocks[0], right: newBlocks[1] }]);
        setBlocks([null, null]);
      }
    }
  };

  const handleDragStart = (e, imageId) => {
    e.dataTransfer.setData("imageId", imageId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDropEvent = (e, blockIndex) => {
    e.preventDefault();
    const imageId = parseInt(e.dataTransfer.getData("imageId"), 10);
    handleDrop(imageId, blockIndex);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-500 via-red-500 to-purple-600 flex flex-col items-center justify-center p-4 sm:p-8">
      
      {/* Кнопка "Назад" */}
      <div className="absolute top-6 left-6 sm:top-8 sm:left-8">
        <Link href="/" passHref>
          <button className="bg-pink-600 text-white px-4 py-2 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
            Back
          </button>
        </Link>
      </div>

      <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-center">Happy Valentine’s Day! 💖</h1>

      <p className="text-xl sm:text-2xl mb-8 text-center">Celebrate love by matching images together!</p>

      <div className="flex flex-wrap gap-6 mb-6 justify-center">
        {images.map((image) => (
          <div key={image.id} className="relative w-20 h-20 sm:w-24 sm:h-24">
            <Image
              layout="fill"
              objectFit="cover"
              src={image.src}
              alt={`Image ${image.id}`}
              draggable
              onDragStart={(e) => handleDragStart(e, image.id)}
              className="rounded-lg shadow-lg border-2 border-white"
            />
          </div>
        ))}
      </div>

      {images.length > 0 ? (
        <div className="flex flex-wrap gap-8 mb-8 justify-center">
          {blocks.map((block, index) => (
            <div
              key={index}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDropEvent(e, index)}
              className="relative w-32 h-32 sm:w-36 sm:h-36 border-4 border-dashed border-white flex items-center justify-center rounded-lg bg-white bg-opacity-50 mb-4"
            >
              {block ? (
                <Image
                  layout="fill"
                  objectFit="cover"
                  src={block.src}
                  alt={`Block ${block.id}`}
                  className="rounded-lg"
                />
              ) : (
                <span className="text-white text-xl">Drop Here 💌</span>
              )}
            </div>
          ))}
        </div>
      ) : null}

      <div className="text-white mt-10 w-full max-w-xl">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-6 text-center">Your Pairs:</h2>
        <div className="space-y-6">
          {pairs.map((pair, index) => (
            <div key={index} className="flex items-center space-x-12 bg-white p-4 rounded-lg shadow-xl border-2 border-pink-300">
              <div className="flex items-center space-x-6 sm:space-x-12 justify-between">
                <div className="flex flex-col items-center justify-between">
                  <Image
                    width={100}
                    height={100}
                    objectFit="cover"
                    src={pair.left.src}
                    alt={`Pair Left ${pair.left.id}`}
                    className="rounded-full border-2 border-pink-500"
                  />
                  <span className="text-sm sm:text-base font-medium text-blue-600">{pair.left.name}</span>
                </div>
                <span className="font-medium text-xl text-yellow-400">+</span>
                <div className="flex flex-col items-center">
                  <Image
                    width={100}
                    height={100}
                    objectFit="cover"
                    src={pair.right.src}
                    alt={`Pair Right ${pair.right.id}`}
                    className="rounded-full border-2 border-pink-500"
                  />
                  <span className="text-sm sm:text-base font-medium text-red-900">{pair.right.name}</span>
                </div>
              </div>

              <span className="font-medium text-xl text-gray-400">=</span>

              <div className="flex items-center justify-center space-x-2">
                <span className="font-bold text-lg sm:text-xl">Pair {index + 1}</span>
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-red-500 flex items-center justify-center text-white text-2xl sm:text-3xl font-semibold">❤️</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 text-center">
        <span className="text-xl sm:text-2xl">Have a lovely day! 💘</span>
      </div>
    </div>
  );
}

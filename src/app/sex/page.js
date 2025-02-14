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
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (imageId) => {
    setSelectedImage(imageId);
  };

  const handleBlockClick = (blockIndex) => {
    if (selectedImage !== null) {
      const selectedImageObj = images.find(img => img.id === selectedImage);
      const newBlocks = [...blocks];
      newBlocks[blockIndex] = selectedImageObj;
      setBlocks(newBlocks);

      setImages((prevImages) => prevImages.filter((img) => img.id !== selectedImage)); 

      if (newBlocks[0] && newBlocks[1]) {
        // Проверяем, если это Соля и Заюш
        let compatibility = Math.random() * 100;
        if (
          (newBlocks[0].name === 'Соля' && newBlocks[1].name === 'Заюш') || 
          (newBlocks[1].name === 'Соля' && newBlocks[0].name === 'Заюш')
        ) {
          // Если это Соля и Заюш, то присваиваем совместимость в диапазоне 80-100%
          compatibility = 80 + Math.random() * 20; // Диапазон от 80 до 100
        }

        setPairs((prevPairs) => [
          ...prevPairs, 
          { left: newBlocks[0], right: newBlocks[1], compatibility: Math.round(compatibility) }
        ]);
        setBlocks([null, null]);  
      }

      setSelectedImage(null);  
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-500 via-red-500 to-purple-600 flex flex-col items-center justify-center p-4 sm:p-8">
      
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
        <Link href="/" passHref>
          <button className="bg-pink-600 text-white px-4 py-2 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 text-sm sm:text-base">
            Back
          </button>
        </Link>
      </div>

      <h1 className="text-3xl sm:text-5xl font-bold mb-6 text-center">Happy Valentine’s Day! 💖</h1>

      <p className="text-lg sm:text-2xl mb-8 text-center">Celebrate love by matching images together!</p>

      {/* Блок с картинками, если они еще есть */}
      {images.length > 0 && (
        <div className="flex flex-wrap gap-4 sm:gap-6 mb-6 justify-center">
          {images.map((image) => (
            <div
              key={image.id}
              className="relative w-16 h-16 sm:w-24 sm:h-24 cursor-pointer"
              onClick={() => handleImageClick(image.id)} 
            >
              <Image
                layout="fill"
                objectFit="cover"
                src={image.src}
                alt={`Image ${image.id}`}
                className="rounded-lg shadow-lg border-2 border-white"
              />
            </div>
          ))}
        </div>
      )}

      {images.length > 0 && (
        <div className="flex flex-wrap gap-4 sm:gap-6 mb-8 justify-center">
          {blocks.map((block, index) => (
            <div
              key={index}
              onClick={() => handleBlockClick(index)}
              className="relative w-32 h-32 sm:w-36 sm:h-36 border-4 border-dashed border-white flex items-center justify-center rounded-lg bg-white bg-opacity-50 mb-4 cursor-pointer"
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
      )}

      {/* Список пар с совместимостью */}
      <div className="text-white mt-10 w-full max-w-xl">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-6 text-center">Your Pairs:</h2>
        <div className="space-y-4 sm:space-y-6">
          {pairs.map((pair, index) => (
            <div key={index} className="flex items-center space-x-6 sm:space-x-12 bg-white p-4 rounded-lg shadow-xl border-2 border-pink-300">
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
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-500 flex items-center justify-center text-white text-xl sm:text-2xl font-semibold">❤️</div>
              </div>
              <div className="text-sm text-center text-purple-300 mt-2 font-bold">
                Compatibility: {pair.compatibility}%
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

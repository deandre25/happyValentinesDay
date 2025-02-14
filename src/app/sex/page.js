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
  const [selectedImage, setSelectedImage] = useState(null); // Для выбранной картинки

  // Выбор картинки при клике
  const handleImageClick = (imageId) => {
    setSelectedImage(imageId); // Устанавливаем выбранную картинку
  };

  // Добавление картинки в блок при клике на блок
  const handleBlockClick = (blockIndex) => {
    if (selectedImage !== null) {
      const selectedImageObj = images.find(img => img.id === selectedImage);
      const newBlocks = [...blocks];
      newBlocks[blockIndex] = selectedImageObj; // Добавляем картинку в блок
      setBlocks(newBlocks);

      setImages((prevImages) => prevImages.filter((img) => img.id !== selectedImage)); // Убираем картинку из списка

      if (newBlocks[0] && newBlocks[1]) {
        setPairs((prevPairs) => [...prevPairs, { left: newBlocks[0], right: newBlocks[1] }]);
        setBlocks([null, null]);  // Очищаем блоки после создания пары
      }

      setSelectedImage(null);  // Сбрасываем выбранную картинку
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-500 via-red-500 to-purple-600 flex flex-col items-center justify-center p-4 sm:p-8">
      
      {/* Кнопка "Назад" */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
        <Link href="/" passHref>
          <button className="bg-pink-600 text-white px-4 py-2 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 text-sm sm:text-base">
            Back
          </button>
        </Link>
      </div>

      <h1 className="text-3xl sm:text-5xl font-bold mb-6 text-center">Happy Valentine’s Day! 💖</h1>

      <p className="text-lg sm:text-2xl mb-8 text-center">Celebrate love by matching images together!</p>

      {/* Выбор картинок */}
      <div className="flex flex-wrap gap-4 sm:gap-6 mb-6 justify-center">
        {images.map((image) => (
          <div
            key={image.id}
            className="relative w-16 h-16 sm:w-24 sm:h-24 cursor-pointer"
            onClick={() => handleImageClick(image.id)}  // При клике выбираем картинку (для мобильных)
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

      {/* Блоки для перетаскивания */}
      <div className="flex flex-wrap gap-4 sm:gap-6 mb-8 justify-center">
        {blocks.map((block, index) => (
          <div
            key={index}
            onClick={() => handleBlockClick(index)}  // При клике на блок помещаем картинку в блок
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

      {/* Список пар */}
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

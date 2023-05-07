"use client";

import { useState } from "react";
import { imagesType } from "./types";
import Create from "./Create";
import Generate from "./Generate";

const testImages: imagesType[] = [
  {
    imageSrc: "https://placehold.jp/512x512.png",
    prompt: "test prompt1",
    negative: "test negative prompt1",
    width: 512,
    height: 512,
    ratio: "1:1",
    steps: 30,
    seed: 1,
  },
  {
    imageSrc: "https://placehold.jp/512x512.png",
    prompt: "test prompt2",
    negative: "test negative prompt2",
    width: 512,
    height: 512,
    ratio: "1:1",
    steps: 30,
    seed: 1,
  },
];

const Main = () => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<imagesType[] | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<imagesType | null>(null);

  return (
    <div className="grid grid-cols-5 gap-4">
      <div className="col-span-2">
        {/* 画像生成フォーム */}
        <Create
          loading={loading}
          setLoading={setLoading}
          setImages={setImages}
        />
      </div>

      <div className="col-span-3">
        {/* 生成画像 */}
        <Generate
          loading={loading}
          images={testImages}
          setModalData={setModalData}
          setModalOpen={setModalOpen}
        />
      </div>
    </div>
  );
};

export default Main;

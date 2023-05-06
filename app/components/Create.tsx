"use client";

import { useRef, useState } from "react";
import { CreateType } from "./types";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const SIZE_OPTIONS = [
  { ratio: "7:4", width: 896, height: 512 },
  { ratio: "3:2", width: 768, height: 512 },
  { ratio: "5:4", width: 640, height: 512 },
  { ratio: "1:1", width: 512, height: 512 },
  { ratio: "4:5", width: 512, height: 640 },
  { ratio: "2:3", width: 512, height: 768 },
  { ratio: "4:7", width: 512, height: 896 },
];

const MAX_IMAGE_COUNT = 4;

const Create = ({ loading, setLoading, setImages }: CreateType) => {
  const promptRef = useRef<HTMLTextAreaElement>(null);
  const negativeRef = useRef<HTMLTextAreaElement>(null);
  const scaleRef = useRef<HTMLInputElement>(null);
  const stepsRef = useRef<HTMLInputElement>(null);
  const seedRef = useRef<HTMLInputElement>(null);
  const [selectedSize, setSelectedSize] = useState(SIZE_OPTIONS[3]);
  const [size, setSize] = useState(3);
  const [count, setCount] = useState(1);
  const [error, setError] = useState<string | null>(null);

  // 画像生成数変更
  const countHandChange = (value: number | number[]) => {
    const numValue = value as number;
    setCount(numValue);
  };

  // 画像サイズ変更
  const sizeHandleChange = (value: number | number[]) => {
    const numValue = value as number;
    setSize(numValue);
    setSelectedSize(SIZE_OPTIONS[numValue]);
  };

  // 画像生成
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // ローディング開始
    setLoading(true);
    // エラーメッセージクリア
    setError(null);

    // フォームデータ取得
    const prompt = promptRef.current!.value;
    const negative = negativeRef.current!.value;
    const width = selectedSize.width;
    const height = selectedSize.height;
    const ratio = selectedSize.ratio;
    const scale = parseFloat(scaleRef.current!.value);
    const steps = parseInt(stepsRef.current!.value, 10);
    const seed = parseInt(seedRef.current!.value, 10);

    // シード生成
    const seedList = [];
    for (let i = 0; i < count; i++) {
      if (!seed) {
        // シードが指定されていない場合はランダムなシードを設定
        seedList.push(Math.floor(Math.random() * 1000000000));
      } else {
        // シードが指定されている場合は指定されたシードを設定
        seedList.push(seed);
      }
    }

    console.log("prompt", prompt);
    console.log("negative", negative);
    console.log("width", width);
    console.log("height", height);
    console.log("ratio", ratio);
    console.log("scale", scale);
    console.log("steps", steps);
    console.log("seedList", seedList);

    setLoading(false);
  };

  return (
    <>
      <div className="border-b-2 border-blue-100 mb-4 font-bold text-lg">
        Create
      </div>

      <form onSubmit={onSubmit}>
        <div className="p-4 rounded-lg bg-[#E6F2FF] shadow">
          {/* prompt */}
          <div className="mb-5">
            <div className="font-bold mb-2 text-sm">Prompt</div>
            <textarea
              className="w-full border rounded-lg p-2 focus:outline-none bg-gray-50 focus:bg-white"
              rows={3}
              ref={promptRef}
              id="prompt"
              required
            />
          </div>

          {/* nagativeprompt */}
          <div className="mb-5">
            <div className="font-bold mb-2 text-sm">Nagative Prompt</div>
            <textarea
              className="w-full border rounded-lg p-2 focus:outline-none bg-gray-50 focus:bg-white"
              rows={3}
              ref={negativeRef}
              id="negative"
              required
            />
          </div>

          {/* 画像生成数 */}
          <div className="mb-5">
            <div className="font-bold mb-2 text-sm">Image Count</div>
            <div className="px-2">
              <Slider
                min={1}
                max={MAX_IMAGE_COUNT}
                value={count}
                onChange={countHandChange}
                trackStyle={{ backgroundColor: "rgba(29, 78, 216)", height: 4 }}
                handleStyle={{
                  borderColor: "rgba(29, 78, 216)",
                  borderWidth: 2,
                  backgroundColor: "rgba(29, 78, 216)",
                  width: 16,
                  height: 16,
                }}
                railStyle={{
                  backgroundColor: "rgba(219, 234, 254)",
                  height: 4,
                }}
              />
            </div>

            <div className="flex justify-between mt-2 text-sm">
              {Array.from({ length: MAX_IMAGE_COUNT }, (_, i) => i + 1).map(
                (data, index) => (
                  <div key={index}>{data}</div>
                )
              )}
            </div>

            {/* 画像生成サイズ */}
            <div className="mb-5">
              <div className="flex justify-between">
                <div className="font-bold mb-2 text-sm">Size</div>
                <div className="text-sm">
                  {selectedSize.width} x {selectedSize.height}
                </div>
              </div>
              <div className="px-2">
                <Slider
                  min={0}
                  max={SIZE_OPTIONS.length - 1}
                  value={size}
                  onChange={sizeHandleChange}
                  trackStyle={{
                    backgroundColor: "rgba(29, 78, 216)",
                    height: 4,
                  }}
                  handleStyle={{
                    borderColor: "rgba(29, 78, 216)",
                    borderWidth: 2,
                    backgroundColor: "rgba(29, 78, 216)",
                    width: 16,
                    height: 16,
                  }}
                  railStyle={{
                    backgroundColor: "rgba(219, 234, 254)",
                    height: 4,
                  }}
                />
              </div>
              <div className="flex justify-between mt-2 text-sm">
                {SIZE_OPTIONS.map((data, index) => (
                  <div key={index}>{data.ratio}</div>
                ))}
              </div>

              {/* 画像がプロンプトにどれだけ従うか */}
              <div className="mb-5">
                <div className="font-bold mb-2 text-sm">Guidance Scale</div>
                <input
                  className="w-full border rounded-lg p-2 focus:outline-none bg-gray-50 focus:bg-white"
                  type="number"
                  step={0.5}
                  ref={scaleRef}
                  id="scale"
                  defaultValue={7.5}
                  required
                />
              </div>

              {/* ステップ数 */}
              <div className="mb-5">
                <div className="font-bold mb-2 text-sm">
                  Number of Interface Steps
                </div>
                <input
                  className="w-full border rounded-lg p-2 focus:outline-none bg-gray-50 focus:bg-white"
                  type="number"
                  ref={stepsRef}
                  id="steps"
                  defaultValue={30}
                  required
                />
              </div>

              {/* シード */}
              <div className="mb-5">
                <div className="font-bold mb-2 text-sm">Seed</div>
                <input
                  className="w-full border rounded-lg p-2 focus:outline-none bg-gray-50 focus:bg-white"
                  type="number"
                  ref={seedRef}
                  id="seed"
                />
              </div>

              {/* エラーメッセージ */}
              {error && (
                <div className="text-red-500 text-center mb-5">{error}</div>
              )}

              {/* ボタン */}
              <div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
                  disabled={loading}
                >
                  <div className="flex items-center justify-center space-x-3">
                    {loading && (
                      <div className="h-4 w-4 animate-spin rounded-full border border-white border-t-transparent" />
                    )}
                    <div>Generate</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Create;

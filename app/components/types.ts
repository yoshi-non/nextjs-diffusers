export type imagesType = {
  imageSrc: string;
  prompt: string;
  negative: string;
  ratio: string;
  width: number;
  height: number;
  seed: number;
  steps: number;
};

export type CreateType = {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setImages: (images: imagesType[]) => void;
};

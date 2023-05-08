# Create Image of AI app
Stable Diffusionを利用したAI画像生成アプリ
※自身のCPUを使用するためスペックによっては動きません。

## Frontend(app)

```bash
npx create-next-app@latest --typescript --eslint

npm i @heroicons/react jszip rc-slider
```

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## Backend(backend)

```bash
# 以下コマンド操作はbackendディレクトリで行う
cd backend
```

```bash
python -m venv .venv

# Windows
.venv/Scripts/activate

# Mac
source .venv/bin/activate

pip3 install --upgrade pip setuptools
```
pytorchを自身の環境に合わせてインストールしてください

https://pytorch.org/get-started/locally/

```bash
# 私の場合
pip3 install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu117
```

```bash
# pytorchが使えるかの確認
# 以下コマンドでTrueと出ればOK
(.venv) nextjs-diffusers\backend> python
>>> import torch
>>> torch.cuda.is_available()
True
>>> exit()
```

```bash
pip3 install -r requirements.txt
```

```bash
# サーバ起動
uvicorn main:app --reload
```

[ここから](https://huggingface.co/andite/anything-v4.0/tree/main)anything-v4.0.vae.ptをダウンロードしてvaeフォルダに入れています。

[ここから](https://github.com/huggingface/diffusers/blob/main/scripts/convert_vae_pt_to_diffusers.py)vaeをコンバートします。

```:vae関連のディレクトリ構造
vae
├── anythingv4_vae
|     ├── config.json
|     └── diffusion_pytorch_model.bin
└── anything-v4.0.vae.pt
```

```bash
python ./convert_vae_pt_to_diffusers.py --vae_pt_path ./vae/anything-v4.0.vae.pt --dump_path ./vae/anythingv4_vae
```

### uvicornの強制終了(Windows)
```bash
tasklist | findstr "uvicorn"
# 以下のように返ってきたとする
# uvicorn.exe  21872 Console  1 2,752 K
taskkill /PID 21872 /F
```
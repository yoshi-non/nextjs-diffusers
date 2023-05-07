# Create Image of AI app

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
uvicorn main:app --reload
```
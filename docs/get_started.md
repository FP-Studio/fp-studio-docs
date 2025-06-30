# Getting Started

## Installation

There are several methods to install FP-Studio. Each has its pros and cons depending on your operating system, familiarity level with different tools, and general computer experience.

You also need to consider which CUDA version you will be targeting based on the GPU you are using.

| GPU Series | Driver CUDA Version | Torch CUDA Version |
| ---------- | ------------------- | ------------------ |
| RTX 2XXX   | 12.4                | 12.4               |
| RTX 3XXX   | 12.6                | 12.6               |
| RTX 4XXX   | 12.8                | 12.8               |
| RTX 5XXX   | 12.9                | 12.8               |

Use the "Torch CUDA Version" for your card if the instructions below call for a specific CUDA version.

### Pinokio

This is the easiest install method for non-technical users, but it is hard to troubleshoot if something goes wrong.

First, install [Pinokio](https://pinokio.co/docs/#/?id=install). Then, use [this link](https://pinokio.co/item.html?uri=https%3A%2F%2Fgithub.com%2Fcolinurbs%2FFP-Studio) to get a one-click installer for FP-Studio.

### Docker

If you are familiar with Docker or are running in a server environment, use this method of install.

First, make sure Docker is installed:

- [Windows](https://docs.docker.com/desktop/setup/install/windows-install/)
- [Intel Mac](https://docs.docker.com/desktop/setup/install/mac-install/) (Unfortunately, due to GitHub Actions limitations we cannot provide builds compatible with Apple Silicon)
- [Linux](https://docs.docker.com/engine/install/)

Once you have Docker installed and running, you can use the `docker` command from any command prompt to interact with it.

Run the following commands to set up, install, and start a new FP-Studio instance on your host:

```sh
git clone https://github.com/colinurbs/FramePack-Studio.git
cd FramePack-Studio
docker compose up -d
```

The first start can take **quite some time**, as roughly 30GB of models must be downloaded. You can check the progress of startup by running `docker compose logs`. Once you see "Loading checkpoint shards" the application should be starting. Now you can navigate to `http://localhost:7860` to access FP-Studio. Use `docker compose ps` to see the status of your FP-Studio container. Refer to [Docker documentation](https://docs.docker.com/compose/intro/compose-application-model/#cli) on Compose for more information on how to work with it.

By default, the `docker-compose.yml` targets CUDA 12.4. In order to specify a different CUDA version, open the file and change the following line:

```
    image: colinurbs/fp-studio:cuda12.4-latest-develop

TO

    image: colinurbs/fp-studio:cudaX.Y-latest-develop
```

Where X.Y is your desired CUDA version.

To update, simply run `docker compose up -d` again - if there is a new version it will be fetched from the Docker servers and deployed over your previous copy automatically.

### Automated (Windows only)

If you are on Windows, you can get up and running quickly by using the `install.bat` file in the FP-Studio directory. Running that will open an interactive prompt that will ask you a couple of questions and then set up all the dependencies for you.

If you used `install.bat` to set up your install, you should run `update.bat` after any FP-Studio version change.

### Manual

If you are familiar with Python development or cannot use the other methods, then you can install FP-Studio manually.

Run the following commands in a Bash shell (install [Git for Windows](https://gitforwindows.org/) to get Bash on Windows):

```sh
git clone https://github.com/colinurbs/FramePack-Studio.git
cd FramePack-Studio
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu128
python studio.py
```

**Note** the "cu128" at the end of the URL in the torch install command. This means "CUDA 12.8" - if you need CUDA 12.4 or 12.6, you should use `cu124` or `cu126` instead.

The app will now start up and begin downloading models. Once it is done, you should be able to access it at `http://localhost:7860`.

## Attention Libraries

There are a variety of Python libraries which provide an improved "attention" implementation over the one provided with PyTorch. Because attention affects inference speed, installing one of these libraries can give you a significant performance boost. Only one attention library can be used, and it is chosen once at application startup based on which libraries you have installed. The order of preference is:

1. [SageAttention](https://github.com/thu-ml/SageAttention)
2. [flash-attention](https://github.com/Dao-AILab/flash-attention)
3. [xformers](https://github.com/facebookresearch/xformers)

This is because SageAttention is faster than flash-attention, which is faster than xformers.

### SageAttention

Ensure your virtual environment is active, and follow their [install instructions](https://github.com/thu-ml/SageAttention?tab=readme-ov-file#install-package).

### flash-attention

**NOTE**: Do not use flash-attention unless you have an [Ampere GPU](<https://en.wikipedia.org/wiki/Ampere_(microarchitecture)#Products_using_Ampere>), as it does not support cards released before that architecture.

Ensure your virtual environment is active, and then use the following command to install flash-attention:

```sh
pip install flash-attn --no-build-isolation
```

### xformers

**NOTE**: Do not use xformers unless you have an [Ampere GPU](<https://en.wikipedia.org/wiki/Ampere_(microarchitecture)#Products_using_Ampere>), as it does not support cards released before that architecture.

Ensure your virtual environment is active, and then use the following command to install xformers:

```sh
pip install xformers
```

## Startup

When running `python studio.py` to start the application, you may pass the following options:

### CLI Options

- `--share`: Create a public Gradio link to share your interface
- `--server <address>`: Specify the server address (default: 0.0.0.0)
- `--port <number>`: Specify a custom port
- `--inbrowser`: Automatically open the interface in your browser
- `--offline`: Disable HF model checks to allow use without internet

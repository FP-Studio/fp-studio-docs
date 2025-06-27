# Getting Started

## Installation

### Docker

If you are not familiar with Python, the most straightforward way to run FP-Studio is to use Docker.

Windows users should install [Docker Desktop](https://docs.docker.com/desktop/setup/install/windows-install/), Linux users should install [Docker Engine](https://docs.docker.com/engine/install/) for their distro. Unfortunately, due to GitHub Actions limitations we cannot provide builds compatible with Apple Silicon.

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

If you are familiar with Python or cannot use Docker for some reason, then you can install FP-Studio manually.

Run the following commands in a Bash shell (install [Git for Windows](https://gitforwindows.org/) to get Bash on Windows):

```sh
git clone https://github.com/colinurbs/FramePack-Studio.git
cd FramePack-Studio
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu128
python app.py
```

**Note** the "cu128" at the end of the URL in the torch install command. This means "CUDA 12.8" - if you need CUDA 12.4 or 12.6, you should use `cu124` or `cu126` instead.

The app will now start up and begin downloading models. Once it is done, you should be able to access it at `http://localhost:7860`.

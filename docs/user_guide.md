# User Guide

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

## Generate Tab

### Generation Types

The application offers several distinct methods for generating videos, each tailored to different use cases and input types.

- **Original**: This is the original FramePack image-to-video generation type. It takes an optional starting frame (an image) and a text prompt to generate a video. If no starting frame is provided, it uses a "latent image" (like a black or noise-filled frame) as the initial input. This model generates the video in reverse chronological order. It can struggle with creating dynamic motion but is generally better than F1 and maintaining consistency.

- **Original with Endframe**: This type extends the "Original" method by allowing you to specify both a starting frame and an ending frame. The generation is guided by the prompt, but it will conclude on the provided end frame. This is useful for creating seamless loops or ensuring the video transitions to a specific final scene.

- **F1**: F1 is a different implementation of the FramePack approach to video generation, while still based on Hunyuan video this model generates in chronologial order. F1 is generally better at creating dynamic motion but worse at maintaing consitency throughout a video. Additionally it tends to create a noticable 'pulse' between sections.

- **Video**: This generation type will extend the input video using the 'original' FramePack model.

- **Video with Endframe**: Functionally similar to 'video' but allows for use of an endframe to guide the video extension.
- **Video F1**: Extends videos using the 'F1' model.

- **Grid**: This is a powerful utility for experimentation and comparison. It allows you to generate a grid of videos by systematically varying one or two parameters across the X and Y axes. For example, you can create a grid where each column has a different number of "Steps" and each row has a different "Distilled CFG Scale". This is invaluable for understanding how different parameters affect the final output without having to run each generation manually. After the individual generations complete they will be combined into a final video grid.

### Generation Parameters

These are the parameters available on the "Generate" screen. Many are shared across multiple generation types.

#### Core Inputs

- **Start Frame (optional)**

  - **Applies to**: `Original`, `Original with Endframe`, `F1`
  - An image that serves as the first frame of the generated video. If not provided, a latent image is used.

- **Video Input**

  - **Applies to**: `Video`, `Video with Endframe`, `Video F1`
  - The source video to be transformed.

- **End Frame (Optional)**

  - **Applies to**: `Original with Endframe`, `Video with Endframe`
  - An image that the generated video will conclude on.

- **End Frame Influence**

  - **Applies to**: `Original with Endframe`, `Video with Endframe`
  - A slider (0.05 to 1.0) that controls how strongly the end frame guides the generation. A value of 1.0 means full influence.

- **Latent Image**

  - **Applies to**: All types except `Grid` (when no Start Frame is provided).
  - The initial image to start generation from if no `Start Frame` is given. Options are typically `Black`, `White`, `Noise`, or `Green Screen`.

#### Prompting

- **Prompt**

  - **Applies to**: All types.
  - The text description of the desired video content. You can use timestamps (e.g., `[2s: a person is smiling]`) to guide the animation over time.

- **Negative Prompt**

  - **Applies to**: All types except `Grid`.
  - Describes what you _don't_ want to see in the video, helping to steer the generation away from undesired elements or styles.

- **Number of sections to blend between prompts**

  - **Applies to**: All types except `Grid`.
  - Controls the smoothness of transitions between different timestamped sections in your prompt. A higher value creates more gradual blending.

#### Generation Settings

- **Steps**

  - **Applies to**: All types.
  - The number of denoising steps the model takes to generate each frame. More steps can increase detail but will take longer.

- **Video Length (Seconds)**

  - **Applies to**: All types.
  - The desired duration of the output video.

- **Resolution (Width & Height)**

  - **Applies to**: All types.
  - The dimensions of the output video. The system will automatically select the nearest supported "bucket" size.

- **Seed**

  - **Applies to**: All types.
  - A number that initializes the random noise pattern for generation. Using the same seed with the same parameters will produce a nearly identical output.

- **Randomize**

  - **Applies to**: All types.
  - If checked, a new random seed will be used for each generation job.

#### Advanced Parameters

- **Use TeaCache**

  - **Applies to**: All types.
  - Enables a caching mechanism (`TeaCache`) that can significantly speed up generation, though it may slightly degrade the quality of fine details like hands.

- **TeaCache steps**

  - **Applies to**: All types (when `Use TeaCache` is enabled).
  - The number of intermediate steps to keep in the cache.

- **TeaCache rel_l1_thresh**

  - **Applies to**: All types (when `Use TeaCache` is enabled).
  - A threshold that determines how much change is needed between frames to invalidate the cache.

- **Distilled CFG Scale**

  - **Applies to**: All types.
  - Controls how closely the generation adheres to the prompt. Higher values mean stronger adherence.

- **Combine with source video**

  - **Applies to**: `Video`, `Video with Endframe`, `Video F1`
  - If checked, the generated video will be blended with the original source video.

- **Number of Context Frames (Adherence to Video)**

  - **Applies to**: `Video`, `Video with Endframe`, `Video F1`
  - Controls how many frames from the source video are considered when generating a new frame. Higher values retain more detail from the source but are more computationally expensive and can sometimes restrict motion too much.

#### LoRAs & Metadata

- **Select LoRAs to Load**

  - **Applies to**: All types except `Grid`.
  - A dropdown to select one or more LoRA (Low-Rank Adaptation) models to apply during generation. LoRAs are small files that can modify the style or content of the output.

- **LoRA Weight Sliders**

  - **Applies to**: All types except `Grid`.
  - Individual sliders appear for each selected LoRA, allowing you to control the strength of its effect.

- **Upload Metadata JSON**

  - **Applies to**: All types except `Grid`.
  - Allows you to load all generation parameters from a previously saved JSON file, making it easy to replicate a past generation.

## Queue Tab

The "Queue" tab is where you can monitor and manage all of your video generation jobs. When you click "Add to Queue" on the Generate tab, your job is sent here. This allows you to line up multiple video generations to run one after another, creating an efficient, automated workflow.

---

#### **The Job Queue Table**

The central feature of this tab is the data table, which provides a real-time overview of all your jobs. Each row represents a single generation job and contains the following information:

- **Job ID**: A unique identifier for the job.

- **Type**: The generation type used for the job (e.g., `Original`, `Video`, `F1`).

- **Status**: The current state of the job.

  - `PENDING`: The job is waiting in the queue to be processed.
  - `RUNNING`: The job is currently being generated.
  - `COMPLETED`: The job finished successfully.
  - `FAILED`: The job stopped due to an error.
  - `CANCELLED`: The job was manually stopped by the user.

- **Created**: The timestamp when the job was added to the queue.

- **Started**: The timestamp when the job began processing.

- **Completed**: The timestamp when the job finished.

- **Elapsed**: The total time taken to process the job, from start to finish.

- **Preview**: A small thumbnail of the job's input image or video for easy identification.

---

#### **Queue Management Actions**

A set of powerful tools is available to help you manage the queue effectively:

- **Refresh Queue**: Manually updates the job list to show the most current status for all jobs.

- **Cancel Queue**: Cancels all jobs that are currently in the `PENDING` state. This will not affect a job that is already `RUNNING`. You will be asked to confirm this action.

- **Clear Complete**: Removes all jobs from the list that have a `COMPLETED`, `FAILED`, or `CANCELLED` status. This is useful for cleaning up the view to only show pending and running jobs.

- **Load Queue**: Loads the default `queue.json` file from your application directory. This is useful for restoring a queue from a previous session.

- **Export Queue**: Saves the current job list and all associated input images/videos into a single `.zip` file. This is perfect for moving a set of jobs to another computer or for archiving your work.

- **Import Queue**: Allows you to upload a `.json` or `.zip` file to add jobs to your queue. This is the corresponding action to `Export Queue` and is great for loading archived jobs or work from another user.

## Outputs Tab

#### **Key Components**

- **Video Gallery**

  - **What it is**: The main area of the tab is a gallery of thumbnails. Each thumbnail represents a unique video generation.
  - **Organization**: The gallery is automatically sorted with your most recently created videos appearing first, making it easy to find your latest work.

- **Video Player**

  - **How it works**: When you click on any thumbnail in the gallery, the full video is loaded into this player.
  - **Features**: The player includes standard controls to play, pause, and loop the video, allowing for a detailed review of the final output.

- **Generation Info**

  - **What it is**: A text box that displays the complete set of parameters (the "metadata") used to create the selected video.
  - **Content**: This includes the exact prompt, seed, model type, number of steps, and any other settings you used. This information is invaluable for understanding how a specific result was achieved and for replicating or iterating on that result later.

---

#### **Available Actions**

- **Refresh Button**

  - **Purpose**: If you have generations running in the background, they won't appear in the gallery until they are complete. Clicking the "Refresh" button will rescan your output folders and update the gallery with any newly finished videos.

- **➡️ Send to Post-processing Button**

  - **Purpose**: This powerful feature provides a seamless workflow for improving your generated videos.
  - **How it works**: After selecting a video from the gallery, clicking this button will send it directly to the **Post-processing** tab. This allows you to immediately start tasks like upscaling the video to a higher resolution or using frame interpolation (like RIFE) to make the motion smoother, without having to manually find and upload the file again.

## Post Processing Tab

The "Post-processing" tab is a powerful suite of tools designed to enhance, refine, and transform your generated videos. You can send videos here directly from the "Outputs" tab or upload them manually. This tab allows you to chain multiple effects together for advanced editing workflows.

---

#### **Core Workflow & Interface**

- **Input & Output Players**:

  - **Upload Video (Top-Left)**: This is the primary input for all operations. Videos you send from the "Outputs" tab will appear here.
  - **Processed Video (Top-Right)**: The result of any operation you perform will be displayed in this player.

- **Chaining Operations**:

  - To apply multiple effects (e.g., upscale, then add filters), you can create a workflow:

    1. Perform the first operation.
    2. Once the result appears in the "Processed Video" player, click the **"🔄 Use Processed as Input"** button.
    3. This moves your processed video to the input player, ready for the next operation.

- **Saving**:

  - **Autosave**: By default, all processed videos are automatically saved to a permanent folder.
  - **Manual Save**: You can disable the "Autosave" checkbox to have more control. When disabled, a **"💾 Save to Permanent Folder"** button appears, allowing you to save the video in the "Processed Video" player on demand.

---

#### **Available Operations**

The tools are organized into tabs for easy access:

##### **📈 Upscale Video (ESRGAN)**

This tool increases the resolution of your video, making it sharper and more detailed.

- **ESRGAN Model**: Select from a list of pre-trained AI models, each designed for different types of content (e.g., animation, realistic video). The model's default output scale (e.g., 2x, 4x) will be displayed.
- **Tile Size**: To manage memory usage on large videos, you can process the video in smaller tiles. "Auto" is recommended, but smaller tile sizes (e.g., 512px) can prevent out-of-memory errors at the cost of slower processing.
- **Enhance Faces (GFPGAN)**: A secondary AI model that can be enabled to specifically detect and restore faces, often resulting in much clearer and more natural-looking features.

##### **🎨 Video Filters (FFmpeg)**

Apply a wide range of visual adjustments to your video.

- **Filter Sliders**: A collection of sliders to control:

  - **Color**: Brightness, Contrast, Saturation, Color Temperature.
  - **Clarity**: Sharpen, Blur, Denoise.
  - **Artistic Effects**: Vignette (darkens corners), S-Curve Contrast (subtle, cinematic contrast), Film Grain.

- **Presets**: You can save and load your favorite combination of filter settings.

  - Select a preset from the **"Load Preset"** dropdown.
  - To save your current slider settings, type a name in the **"Preset Name"** box and click **"💾 Save/Update"**.

##### **🎞️ Frame Adjust (Speed & Interpolation)**

Modify the speed and smoothness of your video.

- **RIFE Frame Interpolation**: Use AI to generate new frames _between_ the existing ones. Selecting "2x RIFE Interpolation" will double the video's frame rate, resulting in significantly smoother motion.
- **Adjust Video Speed Factor**: Slow down (< 1.0) or speed up (> 1.0) the video playback.

##### **🔄 Video Loop**

Create seamless loops from your video clips.

- **Loop Type**:

  - `loop`: Plays the video from start to finish, then immediately starts again from the beginning.
  - `ping-pong`: Plays the video forward, then plays it in reverse to create a back-and-forth effect.

- **Number of Loops**: Control how many times the video repeats.

##### **🖼️ Frames I/O (Input/Output)**

This section gives you direct control over the individual frames of your video.

- **Extract Frames**:

  - Break down the input video into a sequence of individual image files (e.g., PNGs).
  - You can choose to extract every single frame or every Nth frame (e.g., every 5th frame).
  - Extracted frames are saved into their own uniquely named folder.

- **Reassemble Frames**:

  - Create a video _from_ a folder of images.
  - You can select a folder you previously extracted or upload your own set of frames.
  - This is extremely useful for workflows where you might want to edit individual frames in an external program before turning them back into a video.

---

#### **System & File Management**

- **📤 Unload Studio Model**: Frees up significant video memory (VRAM) by unloading the main video generation model. This is highly recommended before running memory-intensive tasks like upscaling. The model will be reloaded automatically the next time you generate a video on the "Generate" tab.
- **📁 Open Output Folder**: Opens the folder where your permanently saved videos are stored.
- **🗑️ Clear Temporary Files**: Deletes all files from the temporary processing folder to free up disk space.

## Settings Tab

The "Settings" tab allows you to customize the application's behavior, file paths, and default parameters. Changes made here are saved to a `settings.json` file and will persist between sessions.

---

#### **Core Generation Settings**

These settings control the default values and behavior for video generation.

- **Save Metadata**

  - **Description**: When enabled, a JSON file is saved alongside every generated video. This file contains all the parameters used for that generation (prompt, seed, model, etc.), making it easy to replicate or analyze your results later.

- **GPU Inference Preserved Memory (GB)**

  - **Description**: A crucial setting for managing video memory (VRAM). It tells the application to keep a certain amount of VRAM free during generation.
  - **Usage**: If you encounter "Out of Memory" (OOM) errors, **increase** this value. This will make generation slightly slower but more stable. If you have a powerful GPU and are not getting errors, you can decrease it for a potential speed boost.

- **MP4 Compression (CRF)**

  - **Description**: Controls the quality and file size of the final MP4 video. CRF stands for Constant Rate Factor.
  - **Usage**: A **lower** value results in **higher quality** and a larger file size. A **higher** value results in **lower quality** and a smaller file size. A value of `0` is lossless (very large file). A good range for high quality is typically `16-23`.

- **Clean up video files**

  - **Description**: During some generation processes, intermediate video files might be created. If this is checked, only the final, completed video will be kept, and all temporary video files will be deleted automatically.

---

#### **System Prompt (Advanced)**

This section allows for advanced customization of the underlying prompt structure for certain models.

- **Override System Prompt**

  - **Description**: When checked, the application will use the custom template you provide below instead of the model's default internal prompt structure. **This is an advanced feature and should generally be left unchecked unless you know what you are doing.**

- **System Prompt Template**

  - **Description**: The text box where you can define the custom prompt template. It requires a specific JSON format and is only recommended for expert users experimenting with model behavior.

---

#### **File & Directory Paths**

This is where you tell the application where to find and save files.

- **Output Directory**: The default folder where your final generated videos will be saved.
- **Metadata Directory**: The default folder where the metadata `.json` files will be saved.
- **LoRA Directory**: The folder where the application will look for your LoRA model files to populate the dropdown on the "Generate" tab.
- **Gradio Temporary Directory**: The path where the user interface framework (Gradio) stores temporary files, such as uploads.

---

#### **Application Settings**

General settings for the application's user interface and behavior.

- **Auto-save settings**

  - **Description**: When enabled, any changes you make on this settings page are saved automatically. If you disable this, you must click the "Save Settings" button to apply your changes.

- **Theme**

  - **Description**: Customizes the visual appearance of the user interface. You can choose from several themes (e.g., `soft`, `glass`, `mono`).
  - **Note**: A restart of the application is required for theme changes to take full effect.

---

#### **Actions**

- **Save Settings**: Manually saves all the current settings on the page to your `settings.json` file.
- **Clean Up Temporary Files**: Manually clears out the Gradio temporary directory. This can be useful to free up disk space if you've uploaded many large files.

import { test, expect } from '@playwright/test';
import path from 'path';

const { describe } = test;

const fileName = "SampleVideo_1280x720_1mb.mp4";

describe.serial("FlixTube Gateway", () => {
  let videoId: string;

  test('can display list of empty videos', async ({ page }) => {
    await page.goto('/');
    const videosList = page.locator("#video-list>div");
    await expect(videosList.nth(0)).toHaveText('No videos uploaded yet.');
  });

  test('can upload a video', async ({ page }) => {
    await page.goto('/upload');

    const results = page.locator("#results");
    const firstDiv = results.locator("div").first();
    
    await expect(firstDiv).toHaveText("Uploaded:");
    const sampleVideoPath = path.join(__dirname, "fixtures", fileName);

    const uploadResponsePromise = page.waitForResponse((response) => 
      response.url().includes('/upload') && response.status() === 200
    );

    await page
      .locator("form.upload-form>input[type='file']")
      .setInputFiles(sampleVideoPath);

    await uploadResponsePromise;

    await expect(results).toContainText(`${fileName}`);
  });

  test('can list videos', async ({ page }) => {
    const videosResponsePromise = page.waitForResponse(response => 
      response.url().includes('/video') && response.status() === 200
    );

    await page.goto('/');

    const videosResponse = await videosResponsePromise;
    const videosList = await videosResponse.json() as { _id: string, name: string, url: string }[];
    videoId = videosList[0]._id;

    const videos = page.locator("#video-list ul li>a");
    await expect(videos).toHaveCount(1);

    const firstVideo = videos.nth(0);
    await expect(firstVideo).toContainText("SampleVideo_1280x720_1mb.mp4");
    await expect(firstVideo).toHaveAttribute("href", `/play/${videoId}`);

    await firstVideo.click();
    await expect(page).toHaveURL(`/play/${videoId}`);
  });

  test('can play a video', async ({ page }) => {
    // Ensure we are on the video playback page.
    // The videoId is set in the 'can list videos' test.
    await page.goto(`/play/${videoId}`);

    // Locate the video element
    const videoPlayer = page.locator('video');

    // Expect the video player to be visible on the page
    await expect(videoPlayer).toBeVisible();

    // Wait for the video to be ready to play and auto-play to potentially start.
    // We can use evaluate to wait for the 'canplaythrough' event or check if it's already playing.
    await videoPlayer.evaluate((video: HTMLVideoElement) => {
      return new Promise<void>((resolve, reject) => {
        // If video is already playing or can play, resolve immediately.
        if (video.readyState >= 3 && !video.paused) { // HAVE_ENOUGH_DATA
          resolve();
        } else if (video.readyState >= 3 && video.ended) { // If it's a very short video and already ended
          resolve();
        } else {
          // Listen for events indicating readiness or start of playback
          video.addEventListener('canplaythrough', () => resolve());
          video.addEventListener('play', () => resolve());
          video.addEventListener('ended', () => resolve()); // Resolve if the video finishes playing quickly
          video.addEventListener('error', (e) => reject(new Error(`Video error: ${e.message}`)));
        }
      });
    });

    // Assert that the video is not paused, meaning it's playing or has finished playing.
    // If `autoPlay` is set, `paused` should be false once content is ready.
    await expect(videoPlayer).not.toHaveJSProperty('paused', true);

    // Additionally, check if the currentTime is greater than 0, indicating playback has started.
    await expect.poll(async () => {
      return videoPlayer.evaluate((v: HTMLVideoElement) => v.currentTime);
    }).toBeGreaterThan(0);
  });
});

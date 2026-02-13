import { test, expect } from '@playwright/test';
import { loadFixture } from '@flix-tube/mongodb-fixtures';

const { describe } = test;

describe("FlixTube Gateway", () => {
  test('can list videos', async ({ page }) => {
    await loadFixture('metadata', 'metadata/videos.json');

    await page.goto('/');

    const videos = page.locator("#video-list>div");
    await expect(videos).toHaveCount(2);

    const firstVideo = videos.nth(0).locator("a");
    await expect(firstVideo).toHaveText("SampleVideo_1280x720_1mb.mp4")
    await expect(firstVideo).toHaveAttribute("href", "/video?id=5ea234a1c34230004592eb32")

    const secondVideo = videos.nth(1).locator("a");
    await expect(secondVideo).toHaveText("Another_video.mp4")
    await expect(secondVideo).toHaveAttribute("href", "/video?id=5ea234a5c34230004592eb33")
  });
});


const sharp = require("sharp");

async function getMetadata() {
  try {
    const metadata = await sharp("sammy.png").metadata();
    console.log(metadata);
  } catch (error) {
    console.log(`An error occurred during processing: ${error}`);
  }
}

async function resizeImage() {
  try {
    // Record the initial resource usage
  const startUsage = process.cpuUsage();
  const startMemoryUsage = process.memoryUsage();
    await sharp("Large-Sample-Image-download-for-Testing.jpg")
      // .resize({
      //   width: 150,
      //   height: 97
      // })
      .jpeg( { mozjpeg: true })
      .toBuffer()
      // .toFile("large-resized-compressed.jpeg");
      console.log("done");

    // Measure and log resource usage after the operation
    const cpuUsage = process.cpuUsage(startUsage);
    const memoryUsage = process.memoryUsage();

    // Convert CPU usage to MBs and percentages
    const cpuInMB = {
      user: cpuUsage.user / (1024 * 1024),
      system: cpuUsage.system / (1024 * 1024),
    };

    const cpuPercentage = {
      user: ((cpuUsage.user / 1000) / (cpuUsage.user + cpuUsage.system)) * 100,
      system: ((cpuUsage.system / 1000) / (cpuUsage.user + cpuUsage.system)) * 100,
    };

    // Convert memory usage to MBs
    const memoryInMB = {
      rss: memoryUsage.rss / (1024 * 1024),
      heapTotal: memoryUsage.heapTotal / (1024 * 1024),
      heapUsed: memoryUsage.heapUsed / (1024 * 1024),
      external: memoryUsage.external / (1024 * 1024),
      arrayBuffers: memoryUsage.arrayBuffers / (1024 * 1024),
    };

    console.log('CPU usage (MB):', cpuInMB);
    console.log('CPU percentage:', cpuPercentage);
    console.log('Memory usage (MB):', memoryInMB);

  } catch (error) {
    console.log(error);
  }
}

async function resizePngImage() {
  try {
    await sharp("sammy.png")
      // .resize({
      //   width: 150,
      //   height: 97
      // })
      .png({ palette: true })
      .toFile("sammy-resized-compressed.png");
  } catch (error) {
    console.log(error);
  }
}

async function resizeWebpImage() {
  try {
    await sharp("./webp/file_example_WEBP_1500kB.webp")
      // .resize({
      //   width: 150,
      //   height: 97
      // })
      .webp({ quality: 80 })
      .toFile("webp image compressed.webp");
  } catch (error) {
    console.log(error);
  }
}

resizeImage();
// resizePngImage()
// resizeWebpImage()

getMetadata();

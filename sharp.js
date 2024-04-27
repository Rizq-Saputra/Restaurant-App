const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const target = path.resolve(__dirname, 'src/public/images/heros');
const destination = path.resolve(__dirname, 'dist/images/heros');

if (!fs.existsSync(destination)) {
  fs.mkdirSync(destination, { recursive: true });
}

// fs.readdirSync(target)
//   .forEach((image) => {
//     // mengubah ukuran gambar dengan lebar 800px, dengan prefix -large.jpg
//     sharp(`${target}/${image}`)
//       .resize(800)
//       .toFile(path.resolve(
//         __dirname,
//         `${destination}/${image.split('.').slice(0, -1).join('.')}-large.jpg`,
//       ));

//     // mengubah ukuran gambar dengan lebar 480px, dengan prefix -small.jpg
//     sharp(`${target}/${image}`)
//       .resize(480)
//       .toFile(path.resolve(
//         __dirname,
//         `${destination}/${image.split('.').slice(0, -1).join('.')}-small.jpg`,
//       ));
//   });

fs.readdirSync(target).forEach(async (image) => {
  const imageName = image.split('.').slice(0, -1).join('');

  try {
    // Mengubah ukuran gambar dengan lebar 800px dan menyimpan dalam format JPEG
    await sharp(`${target}/${image}`)
      .resize(800)
      .toFile(path.resolve(__dirname, `${destination}/${imageName}-large.jpg`));

    // Mengubah ukuran gambar dengan lebar 800px dan menyimpan dalam format WebP
    await sharp(`${target}/${image}`)
      .resize(800)
      .toFormat('webp')
      .toFile(path.resolve(__dirname, `${destination}/${imageName}-large.webp`));

    // Mengubah ukuran gambar dengan lebar 480px dan menyimpan dalam format JPEG
    await sharp(`${target}/${image}`)
      .resize(480)
      .toFile(path.resolve(__dirname, `${destination}/${imageName}-small.jpg`));

    // Mengubah ukuran gambar dengan lebar 480px dan menyimpan dalam format WebP
    await sharp(`${target}/${image}`)
      .resize(480)
      .toFormat('webp')
      .toFile(path.resolve(__dirname, `${destination}/${imageName}-small.webp`));

    console.log(`Converted ${image} to JPEG and WebP formats.`);
  } catch (err) {
    console.error(`Error converting ${image}: ${err}`);
  }
});

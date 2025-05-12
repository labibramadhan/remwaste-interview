const gulp = require('gulp');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs-extra');

const imagesDir = 'public/images';

async function optimizeFolder(subfolder) {
  const srcDir = path.join(imagesDir, subfolder);
  const destDir = path.join(imagesDir, subfolder + '_optimized');
  await fs.ensureDir(destDir);
  const files = (await fs.readdir(srcDir)).filter((file) =>
    /\.(jpe?g|png|webp)$/i.test(file),
  );

  await Promise.all(
    files.map(async (file) => {
      const inputPath = path.join(srcDir, file);
      const outputName = path.parse(file).name + '.webp';
      const outputPath = path.join(destDir, outputName);
      await sharp(inputPath).webp({ quality: 80 }).toFile(outputPath);
      console.log(
        `Optimized: ${subfolder}/${file} -> ${subfolder}_optimized/${outputName}`,
      );
    }),
  );
}

gulp.task('optimize-images', async function () {
  const folders = (await fs.readdir(imagesDir, { withFileTypes: true }))
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)
    .filter((name) => !name.endsWith('_optimized'));
  for (const folder of folders) {
    await optimizeFolder(folder);
  }
});

gulp.task('default', gulp.series('optimize-images'));

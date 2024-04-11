export const createImage = async (url: any): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();

    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });

export const getCroppedImg = async (imageSrc: any, pixelCrop: any) => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return null;
  }

  const bBoxWidth = 800;
  const bBoxHeight = 450;

  canvas.width = bBoxWidth;
  canvas.height = bBoxHeight;

  ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
  ctx.translate(-image.width / 2, -image.height / 2);
  ctx.drawImage(image, 0, 0);

  const data = ctx.getImageData(
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height
  );

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.putImageData(data, 0, 0);

  return new Promise((resolve, reject) => {
    canvas.toBlob((file) => {
      if (!file) {
        reject();
        return;
      }
      resolve(URL.createObjectURL(file));
    }, "image/jpeg");
  });
};

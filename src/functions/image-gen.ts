import { createCanvas, loadImage, registerFont } from "canvas";

registerFont("./assets/font/RobotoSlab-ExtraBold.ttf", {
  family: "RobotoSlab-ExtraBold"
});

export async function generateImage(number1: number, number2: number) {
  const image = await loadImage("./assets/templates/style1.png"); // path
  const canvas = createCanvas(image.width, image.height);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0, image.width, image.height);
  ctx.font = "600px RobotoSlab-ExtraBold";
  ctx.fillStyle = "#2F3136";
  ctx.textAlign = "center";
  ctx.fillText(number1.toString(), 730, 920);
  ctx.fillText(number2.toString(), 1270, 920);

  return canvas;
};

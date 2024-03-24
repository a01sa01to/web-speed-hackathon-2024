import { MAPPING } from './mapping';

const COLUMN_SIZE = 8;
const ROW_SIZE = 16;

export async function encrypt({
  exportCanvasContext,
  sourceImage,
  sourceImageInfo,
}: {
  exportCanvasContext: CanvasRenderingContext2D;
  sourceImage: CanvasImageSource;
  sourceImageInfo: { height: number; width: number };
}): Promise<void> {
  const columnOffsetPixel = Math.floor((sourceImageInfo.width % COLUMN_SIZE) / 2);
  const columnPixel = Math.floor(sourceImageInfo.width / COLUMN_SIZE);

  const rowOffsetPixel = Math.floor((sourceImageInfo.width % COLUMN_SIZE) / 2);
  const rowPixel = Math.floor(sourceImageInfo.height / ROW_SIZE);

  await Promise.all(
    MAPPING.map(async ({ from, to }) => {
      await new Promise<void>((resolve) => {
        const srcX = columnOffsetPixel + to.column * columnPixel;
        const srcY = rowOffsetPixel + to.row * rowPixel;
        const destX = columnOffsetPixel + from.column * columnPixel;
        const destY = rowOffsetPixel + from.row * rowPixel;
        exportCanvasContext.drawImage(
          sourceImage,
          srcX,
          srcY,
          columnPixel,
          rowPixel,
          destX,
          destY,
          columnPixel,
          rowPixel,
        );
        resolve();
      });
    }),
  );
}

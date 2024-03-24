import { init as jsquashInit } from '@jsquash/jxl/decode';
import 'jimp';

declare const Jimp: typeof import('jimp');

export async function transformJpegXLToBmp(response: Response): Promise<Response> {
  const cacheStore = await caches.open('jsquash');
  if (!(await cacheStore.match('/assets/jxl_dec.wasm'))) {
    await cacheStore.put(
      '/assets/jxl_dec.wasm',
      new Response(await fetch('/assets/jxl_dec.wasm').then((res) => res.arrayBuffer())),
    );
  }
  const jsquashWasmBinary = await cacheStore.match('/assets/jxl_dec.wasm').then((res) => res!.arrayBuffer());
  const { decode } = await jsquashInit(undefined, {
    locateFile: () => {},
    wasmBinary: jsquashWasmBinary,
  });

  const imageData = decode(await response.arrayBuffer())!;
  const bmpBinary = await new Jimp(imageData).getBufferAsync(Jimp.MIME_BMP);

  return new Response(bmpBinary, {
    headers: {
      'Cache-Control': 'no-store',
      'Content-Type': 'image/bmp',
    },
  });
}

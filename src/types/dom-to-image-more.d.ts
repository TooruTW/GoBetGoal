declare module "dom-to-image-more" {
  interface Options {
    quality?: number;
    bgcolor?: string;
    height?: number;
    width?: number;
    style?: Record<string, string>;
    filter?: (node: Element) => boolean;
  }

  interface DomToImage {
    toPng(node: HTMLElement, options?: Options): Promise<string>;
    toJpeg(node: HTMLElement, options?: Options): Promise<string>;
    toBlob(node: HTMLElement, options?: Options): Promise<Blob>;
    toSvg(node: HTMLElement, options?: Options): Promise<string>;
  }

  const domtoimage: DomToImage;
  export default domtoimage;
}

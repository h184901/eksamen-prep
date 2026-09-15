export interface GuideController {
  jump(index: number, pause?: boolean, animate?: boolean): void;
  readonly index: number;
  readonly view: string;
  readonly playing: boolean;
}
export function mountGuide(root: HTMLElement, data: unknown): { dispose(): void; controller: GuideController };

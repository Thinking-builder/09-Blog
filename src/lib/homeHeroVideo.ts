export interface HomeHeroVideoConfig {
  posterSrc: string;
  posterFallbackSrc: string;
  videoSrc: string;
  objectPositionDesktop: string;
  objectPositionMobile: string;
  moonFocusX: string;
  moonFocusY: string;
  veilStrength: number;
  videoScale: number;
}

export const homeHeroVideoConfig: HomeHeroVideoConfig = {
  posterSrc: '/media/home-moon-poster.avif',
  posterFallbackSrc: '/media/home-moon-poster.jpg',
  videoSrc: '/media/home-moon.mp4',
  objectPositionDesktop: '50% 46%',
  objectPositionMobile: '50% 42%',
  moonFocusX: '50%',
  moonFocusY: '28%',
  veilStrength: 0.22,
  videoScale: 1.01,
};

export function getHomeHeroVideoCssVars(config: HomeHeroVideoConfig): Record<string, string> {
  return {
    '--hero-object-position-desktop': config.objectPositionDesktop,
    '--hero-object-position-mobile': config.objectPositionMobile,
    '--hero-moon-focus-x': config.moonFocusX,
    '--hero-moon-focus-y': config.moonFocusY,
    '--hero-veil-strength': String(config.veilStrength),
    '--hero-video-scale': String(config.videoScale),
  };
}

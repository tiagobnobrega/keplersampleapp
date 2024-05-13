/// <reference types="react" />
/// <reference types="react-dom" />
/// <reference types='./react-native.d.ts' />
/// <reference types='./image.d.ts' />

declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;

  const src: string;
  export default src;
}

declare module '*.bmp' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  import { ImageSourcePropType } from 'react-native';

  const src: ImageSourcePropType;
  export default src;
}

declare module '*.avif' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  import { ImageSourcePropType } from 'react-native';

  const src: ImageSourcePropType;
  export default src;
}

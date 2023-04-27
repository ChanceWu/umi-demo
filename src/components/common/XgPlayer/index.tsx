import React, { useRef, useEffect } from 'react'
import type { IPlayerOptions } from 'xgplayer';
import Player from 'xgplayer';

export interface XgPlayerProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  options?: Partial<IPlayerOptions>;
}

const XgPlayer: React.FunctionComponent<XgPlayerProps> = ({ src, options, ...props }) => {
  const domRef = useRef<HTMLDivElement>(null);
  const player = useRef<Player>();
  const optionsRef = useRef<Partial<IPlayerOptions>>(options || {});

  useEffect(() => {
    player.current = new Player({
      url: src,
      fluid: true,
      videoInit: true,
      autoplay: true,
      el: domRef.current as HTMLElement,
      ...optionsRef.current,
    })
    return () => {
      player.current?.destroy();
    }
  }, [optionsRef, src])

  return (
    <div ref={domRef} {...props}></div>
  )
}

export default XgPlayer;

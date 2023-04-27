/**
 * 可滚动dom，添加拖动功能
 */
import { useEffect, useRef } from 'react';

function useScroll() {
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (domRef.current) {
      domRef.current!.onmousedown = (ev) => {
        const disX = ev.clientX;
        const disY = ev.clientY;
        const originalScrollLeft = domRef.current!.scrollLeft;
        const originalScrollTop = domRef.current!.scrollTop;
        const handleMousemove = (element: MouseEvent) => {
          element.preventDefault();
          const distanceX = element.clientX - disX;
          const distanceY = element.clientY - disY;
          domRef.current!.scrollTo(originalScrollLeft - distanceX, originalScrollTop - distanceY);
        };
        const handleMouseUp = () => {
          document.removeEventListener('mousemove', handleMousemove);
          document.removeEventListener('mouseup', handleMouseUp);
        };
        document.addEventListener('mousemove', handleMousemove);
        document.addEventListener('mouseup', handleMouseUp);
      };
    }
  }, []);

  return domRef;
}

export default useScroll;

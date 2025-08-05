import { useState, useEffect, RefObject } from 'react';

export const useTooltip = (ref: RefObject<HTMLElement | null>) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const el = ref?.current;
    if (!el) return;

    const handleMouseEnter = () => setIsOpen(true);

    const handleMouseLeave = () => setIsOpen(false);

    el.addEventListener('mouseenter', handleMouseEnter);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mouseenter', handleMouseEnter);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref]);

  return isOpen;
};

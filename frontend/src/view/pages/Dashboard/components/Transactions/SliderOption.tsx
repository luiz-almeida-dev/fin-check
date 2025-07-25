import { useSwiper } from 'swiper/react';
import { cn } from '../../../../../app/utils/cn';

interface SliderOptionProps{
  isActive: boolean
  month: string
  index: number
}

export function SliderOption({isActive, month, index}: SliderOptionProps) {
  const swiper = useSwiper();

  return (
    <button
      className={cn('w-full rounded-full h-12 text-sm text-gray-800 font-medium tracking-[-0.5px] ', isActive && 'bg-white')}
      onClick={()=> swiper.slideTo(index)}
    >
      {month}
    </button>
  );
}

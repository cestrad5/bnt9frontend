import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import img3010 from '../../assets/3010.png';
import img1012 from '../../assets/1012.png';
import img7026 from '../../assets/7026.png';
import img2017 from '../../assets/2017.png';
import img7025 from '../../assets/7025.png';
import img1019 from '../../assets/1019.png';
import img1020 from '../../assets/1020.png';
import img2009 from '../../assets/2009.png';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

/**
 * SwipeSlider component represents a swiper/slider for displaying images.
 * It uses Swiper library for the carousel functionality.
 */
const SwipeSlider = () => {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);

  /**
   * Handles the time left in autoplay to update the progress circle.
   * @param {number} s - Time in seconds.
   * @param {number} time - Remaining time.
   * @param {number} progress - Progress percentage.
   */
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  return (
    <>
      {/* Swiper Component */}
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        {/* Slides */}
        <SwiperSlide><img src={img1012} alt='Img producto'/></SwiperSlide>
        <SwiperSlide><img src={img2017} alt='Img producto'/></SwiperSlide>
        <SwiperSlide><img src={img3010} alt='Img producto'/></SwiperSlide>
        <SwiperSlide><img src={img1019} alt='Img producto'/></SwiperSlide>
        <SwiperSlide><img src={img1020} alt='Img producto'/></SwiperSlide>
        <SwiperSlide><img src={img2009} alt='Img producto'/></SwiperSlide>

        {/* Progress Circle */}
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </>
  );
}

export default SwipeSlider;

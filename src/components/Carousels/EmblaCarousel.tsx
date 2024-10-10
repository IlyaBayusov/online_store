"use client";

import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import img_test_shoes1 from "../../../public/testImg/img_test_shoes1.png";

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container gap-3">
          {slides.map((index) => (
            <div className="embla__slide" key={index}>
              <Image className="rounded-md" src={img_test_shoes1} alt="" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;

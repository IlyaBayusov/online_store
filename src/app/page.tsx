import CategoryList from "@/components/Category/CategoryList/CategoryList";
import img_tg from "../../public/main/img_tg.png";
import Image from "next/image";
import NewArrivalsList from "@/components/NewArrivals/NewArrivalsList/NewArrivalsList";
import EmblaCarousel from "@/components/Carousels/EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";

const OPTIONS: EmblaOptionsType = {};
const SLIDE_COUNT = 5;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

export default function Home() {
  return (
    <div className="w-full">
      <div
        id="mainIntroBlock"
        className="py-10 flex justify-center items-center"
      >
        <div className="flex justify-center items-center border-white border-2 w-24 h-24">
          <p id="textIntroBlock" className="relative text-2xl">
            MAN'S
          </p>
        </div>
      </div>
      <CategoryList />
      <div className="bg-black w-full py-3">
        <div className="container px-3 marker:">
          <div className="flex flex-col justify-center items-center">
            <p className="text-center text-xs">
              Подписывайтесь в телеграм, а также покупайте понравившиеся вещи в
              нашем интернет-магазине. У нас для вас готовые образы и всегда
              свежие тренды сезона. Не упустите шанс оставаться в тренде!
              Следуйте за нами в Telegram: @mjustdo, чтобы быть в курсе новых
              продуктов и эксклюзивных предложений.
            </p>

            <div className="max-w-12 max-h-12">
              <Image src={img_tg} alt="" />
            </div>
          </div>
        </div>
      </div>
      <NewArrivalsList />

      <div className="container px-3">
        <div className="flex justify-center mt-3 mb-5">
          <h2 id="subTitleLine" className="relative uppercase font-medium">
            Постоянные покупатели
          </h2>
        </div>

        <EmblaCarousel slides={SLIDES} options={OPTIONS} />
      </div>
    </div>
  );
}

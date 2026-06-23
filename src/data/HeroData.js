import BackgroundImg1 from "@/assets/background.jpg";
import Img1 from "@/assets/Tamara.jpg";
import BackgroundImg2 from "@/assets/background2.webp";
import Img2 from "@/assets/tariere.jpg";
import Img3 from "@/assets/The Square of Lost Songs.jpg";
import Img2Extra from "@/assets/bird-and-shroom.webp";
import { imageSrc } from "@/lib/image";

export const heroSections = [
  {
    id: "woyingi-god-is-a-woman",
    title:
      "Another book in Linda's captivating folktale series, Tamara: The Gender of God, is out now!",
    description:
      "A thought-provoking exploration of the Divine, weaving together history, spirituality, and culture. A powerful narrative that challenges perceptions and celebrates the sacred feminine.",
    link: "/book/woyingi-god-is-a-woman",
    image: imageSrc(Img1),
    background: imageSrc(BackgroundImg1),
    color: "#D7FF00",
    extraImg: null,
  },
  {
    id: "tari-ere-the-picky-virgin",
    title:
      "A captivating and enchanting tale inspired by ancient Ijaw legends. She Who Loved a Lie: An Ijaw folktale of love, loss, and return",
    description: "",
    link: "/book/tari-ere-the-picky-virgin",
    image: imageSrc(Img2),
    background: imageSrc(BackgroundImg2),
    color: "#E02B20",
    extraImg: imageSrc(Img2Extra),
  },
  {
    id: "the-square-of-lost-sons",
    title:
      "The Square of Lost Songs is a soul-stirring collection of modern folktales that echo with the wisdom of ancient drums and the defiance of forgotten tongues",
    description: "",
    link: "/book/the-square-of-lost-sons",
    image: imageSrc(Img3),
    background: imageSrc(BackgroundImg2),
    color: "#d7ff00",
  },
];

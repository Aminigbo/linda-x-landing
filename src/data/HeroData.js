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
      "Another enchanting addition to Linda’s captivating folktale collection, Firelight Fables is out now!",
    description:
      "A heartwarming collection of African folktales lovingly reimagined for young minds. Filled with clever tortoises, fearless girls, wise elders, and unforgettable characters, these timeless stories spark curiosity, teach enduring values, and keep the magic of African storytelling alive for a new generation.",
    link: "/book/woyingi-god-is-a-woman",
    image: imageSrc(Img1),
    background: imageSrc(BackgroundImg1),
    color: "#D7FF00",
    extraImg: null,
  },
  {
    id: "tari-ere-the-picky-virgin",
    title:
      "A captivating Ijaw legend of love, self-discovery, and the wisdom of parental guidance, The Legend of Tari-Ere: The Picky Virgin is out now!",
    description:
      "A timeless tale of a young woman whose journey through love, mystery, and the unexpected teaches her the enduring value of humility, discernment, and an open heart.",
    link: "/book/tari-ere-the-picky-virgin",
    image: imageSrc(Img2),
    background: imageSrc(BackgroundImg2),
    color: "#E02B20",
    extraImg: imageSrc(Img2Extra),
  },
  {
    id: "the-square-of-lost-sons",
    title:
      "A new collection from Linda’s captivating folktale series, Whispers from the Story Circle: Echoes of African Wisdom for Minds in Bloom, is out now!",
    description: "A beautifully woven collection of African folktales that invites young minds to look beyond the story—to discover wisdom, courage, justice, identity, and purpose. Tales that entertain, provoke thought, and let ancient wisdom whisper into the hearts of a new generation.",
    link: "/book/the-square-of-lost-sons",
    image: imageSrc(Img3),
    background: imageSrc(BackgroundImg2),
    color: "#d7ff00",
  },
];

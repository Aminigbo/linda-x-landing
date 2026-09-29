import Img from "../assets/Tamara.jpg";
import Img2 from "../assets/tariere.jpg";
import backgroundImage from "../assets/background.jpg";
import backgroundImage2 from "../assets/background2.webp";
import Img3 from "../assets/Piano.webp";
import Img5 from "../assets/The Square of Lost Songs.jpg";
import Img4 from "../assets/praise-bits-2.webp";

const publicationDefaults = {
  date: "2025",
  publisher: "A Production of LINDA SOMIARI-STEWART",
  address: "House 11, B2 Street, CITEC Estate Mbora, Abuja",
  edition: "First Edition",
  format: "Hard Copy",
  language: "English",
  genre: "Fiction",
  author: "LINDA SOMIARI-STEWART (LINDA X)",
};

function publication(details) {
  return { ...publicationDefaults, ...details };
}

export const bookDetails = {
  "woyingi-god-is-a-woman": {
    title: "Tamara: The Gender of God",
    description: [
      "Before the stories were written down, they were whispered around firelight. Before lessons were taught in classrooms, they were carried through generations in tales of courage, wisdom, consequence, and wonder. *Firelight Fables* rekindles the magic of African folktales for a new generation, bringing together timeless stories that entertain, inspire, and preserve the wisdom of ancestral memory. A captivating collection where every tale sparks imagination, carries a lesson, and keeps the fire of African storytelling alive."
    ],
    image: Img,
    praise: [
      {
        quote:
          "Tamara is a powerful reawakening. Linda has masterfully brought to light a sacred truth that has long been buried—the divine feminine. It’s deeply spiritual, intellectually engaging, and emotionally healing.",
        author: "Dr. Amaka O.",
      },
      {
        quote:
          "This book gave me chills in the best way. Tamara invites you to question, reflect, and reconnect with your spiritual roots. It’s not just a book—it’s an awakening wrapped in story.",
        author: "Ebiye D.",
      },
    ],
    bg: backgroundImage,
    picture: Img3,
    scribe: "Praise for Tamara: The Gender of God",
    link: "https://docs.google.com/document/d/1w-e5com2ytLpSq62yGDoJmZLm9GgOrpZqqaMFu1doZg/edit?usp=sharing",
    publication: publication({
      title: "FIRELIGHT FABLES (Timeless wisdom for Modern Children)",
      isbn: "978-978-43762-4-5",
      pages: "72 pages",
    }),
    purchase: [
      {
        label: "Kobo",
        href: "https://www.kobo.com/gb/en/search?query=linda+somiari+stewart&ac=1&acp=linda+somiari+stewart&ac.author=linda+somiari+stewart&sort=Temperature&fclanguages=en",
      },
      {
        label: "Books.by",
        href: "https://books.by/linda-somiari-stewart",
      },
    ],
  },
  "tari-ere-the-picky-virgin": {
    title: "She Who Loved A Lie",
    description: [
      "Tari-Ere was beautiful, discerning, and certain that no man in her village was worthy of her heart. But fate had other plans. When she falls in love with a mysterious being beyond her world, Tari-Ere is drawn into an extraordinary journey that tests her courage, resourcefulness, and understanding of love.",
      "Rooted in the rich oral traditions of the Ijaw people of Nigeria’s Niger Delta, The Legend of Tari-Ere: The Picky Virgin is a captivating tale of love, mystery, humility, and self-discovery. As Tari-Ere navigates a world unlike her own and wins the favor of a formidable mother-in-law, she learns lessons that ultimately lead her home—and transform the way she sees love, family, and herself.",
    ],
    image: Img2,
    praise: [
      {
        quote:
          "She who loved a lie is a stunning blend of folklore and life lessons. It’s beautifully written, rich in culture, and full of heart. I laughed, I held my breath, and I learned.",
        author: "Koko Briggs",
      },
      {
        quote:
          "An enchanting story that reminds us how powerful the wisdom of our ancestors can be. I loved how Linda wove magic, tradition, and emotion into every chapter.",
        author: "Tamara Owei",
      },
    ],
    bg: backgroundImage2,
    scribe: "Praise for She Who Loved A Lie",
    purchase: [
      {
        label: "Kobo",
        href: "https://www.kobo.com/gb/en/ebook/she-who-loved-a-lie",
      },
      {
        label: "Books.by",
        href: "https://books.by/linda-somiari-stewart#she-who-loved-a-lie",
      },
    ],
    picture: Img4,
    link: "https://docs.google.com/document/d/1NfhvhNciV-teuqLPpdcDHFBn5gIdvBO0PN76uOxqSyk/edit?usp=sharing",
    publication: publication({
      title: "THE LEGEND OF TARI-ERE (The Picky Virgin)",
      isbn: "979-978-44361-5-6",
      pages: "92 pages",
    }),
  },
  "the-square-of-lost-sons": {
    title: "The Square of Lost Sons: A Modern Griot Tales",
    description: [
      "Before wisdom was written in books, it was carried in stories. Before questions found answers, they were whispered around the story circle. **Whispers from the Story Circle: Echoes of African Wisdom for Minds in Bloom** gathers timeless African folktales for young minds standing at the edge of becoming—curious, thoughtful, and beginning to wonder about life, identity, courage, justice, and purpose.",
      "These are not simply stories of talking animals and clever tricksters. They are echoes of an older wisdom, woven with quiet truths and enduring lessons. Through wit, wonder, and reflection, each tale invites young readers to listen beyond the words—to discover what the stories awaken within them.",
      "A collection for minds in bloom, where ancient wisdom meets new questions, and every story has something more to say.",
    ],
    image: Img5,
    praise: [],
    bg: backgroundImage,
    picture: Img3,
    scribe: "The Square of Lost Sons",
    link: "https://docs.google.com/document/d/1Kaqh1Ea5EhRagPgw0uE1vq0WEolxRwDbVmC8aiVqRvA/edit?usp=sharing",
    publication: publication({
      title:
        "WHISPERS FROM THE STORY CIRCLE (Echoes of African Wisdom for Minds in Bloom)",
      isbn: "978-978-46622-4-5",
      pages: "165 pages",
    }),
    purchase: [
      {
        label: "Kobo",
        href: "https://www.kobo.com/gb/en/search?query=linda+somiari+stewart&ac=1&acp=linda+somiari+stewart&ac.author=linda+somiari+stewart&sort=Temperature&fclanguages=en",
      },
      {
        label: "Books.by",
        href: "https://books.by/linda-somiari-stewart",
      },
    ],
  },
};

import Img from "../assets/woyingi-god-is-a-woman.jpg";
import Img2 from "../assets/tari-ere.jpg";
import backgroundImage from "../assets/background.jpg";
import backgroundImage2 from "../assets/background2.webp";
import Img3 from "../assets/Piano.webp";
import Img5 from "../assets/whispers-from-the-story-circle.jpg";
import Img6 from "../assets/firelight-fables.jpg";
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
    title: "Woyingi: God Is a Woman",
    description: [
      "Before the stories were written down, they were whispered around firelight. Before lessons were taught in classrooms, they were carried through generations in tales of courage, wisdom, consequence, and wonder. *Firelight Fables* rekindles the magic of African folktales for a new generation, bringing together timeless stories that entertain, inspire, and preserve the wisdom of ancestral memory. A captivating collection where every tale sparks imagination, carries a lesson, and keeps the fire of African storytelling alive."
    ],
    image: Img,
    praise: [
      {
        quote:
          "Woyingi is a profound journey into the spiritual imagination of the Ijaw people. Linda beautifully brings together mythology, ancestry, and the mystery of creation in a way that invites you to question what you thought you knew about the Divine.",
        author: "Ebiye K.",
      },
      {
        quote:
          "There is something hauntingly beautiful about Woyingi. It feels like listening to an elder tell a story that has travelled through generations. A powerful exploration of creation, culture, and the sacred feminine.",
        author: "Benebo T.",
      },
    ],
    bg: backgroundImage,
    picture: Img3,
    scribe: "Praise for Woyingi: God Is a Woman",
    link: "https://docs.google.com/document/d/1w-e5com2ytLpSq62yGDoJmZLm9GgOrpZqqaMFu1doZg/edit?usp=sharing",
    publication: publication({
      title: "WOYINGI: GOD IS A WOMAN",
      isbn: "978-978-55911-3-3",
      pages: "108 pages",
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
          "Tari-Ere is a captivating reminder that our oldest stories still have something to teach us. Beneath the mystery and adventure is a beautiful lesson about humility, love, family, and learning to see beyond our own expectations.",
        author: "Grace E.",
      },
      {
        quote:
          "I loved how Tari-Ere blends Ijaw folklore, romance, mystery, and wisdom into one unforgettable story. It is entertaining enough to draw you in, but the lessons stay with you long after you finish reading.",
        author: "Anderson S.",
      },
    ],
    bg: backgroundImage2,
    scribe: "Praise for The Legend of Tari-Ere",
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
  "whispers-from-the-story-circle": {
    title: "Whispers from the Story Circle: Echoes of African Wisdom for Minds in Bloom",
    description: [
      "Before wisdom was written in books, it was carried in stories. Before questions found answers, they were whispered around the story circle. **Whispers from the Story Circle: Echoes of African Wisdom for Minds in Bloom** gathers timeless African folktales for young minds standing at the edge of becoming—curious, thoughtful, and beginning to wonder about life, identity, courage, justice, and purpose.",
      "These are not simply stories of talking animals and clever tricksters. They are echoes of an older wisdom, woven with quiet truths and enduring lessons. Through wit, wonder, and reflection, each tale invites young readers to listen beyond the words—to discover what the stories awaken within them.",
      "A collection for minds in bloom, where ancient wisdom meets new questions, and every story has something more to say.",
    ],
    image: Img5,
    praise: [
      {
        quote:
          "Whispers from the Story Circle is a beautiful reminder that the simplest stories can carry the deepest wisdom. Each tale invites young readers to think, question, and see the world with greater curiosity. It is both enchanting and profoundly meaningful.",
        author: "Mrs. Ibiwari A.",
      },
      {
        quote:
          "There is something special about these stories. They entertain, but they also linger long after the page is turned. Linda has beautifully woven African wisdom, imagination, and life lessons into a collection that speaks gently to young minds and hearts.",
        author: "Dr. Nengi E.",
      },
    ],
    bg: backgroundImage,
    picture: Img3,
    scribe: "Praise for Whispers from the Story Circle",
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

  "firelight-fables": {
    title: "Firelight Fables",
    description: [
      "Before the stories were written down, they were whispered around firelight. Before lessons were taught in classrooms, they were carried through generations in tales of courage, wisdom, consequence, and wonder. *Firelight Fables* rekindles the magic of African folktales for a new generation, bringing together timeless stories that entertain, inspire, and preserve the wisdom of ancestral memory. A captivating collection where every tale sparks imagination, carries a lesson, and keeps the fire of African storytelling alive.",
    ],
    image: Img6,
    praise: [
      {
        quote:
          "Firelight Fables is the kind of book that makes you want to gather children around a fire and tell stories again. It is warm, imaginative, and filled with lessons that children can carry long after the story ends.",
        author: "Amara E.",
      },
      {
        quote:
          "Every story feels like a little piece of Africa passed from one generation to another. The characters are memorable, the lessons are meaningful, and the storytelling makes African folklore feel wonderfully alive for young readers.",
        author: "Nkem O.",
      },
    ],
    bg: backgroundImage,
    picture: Img3,
    scribe: "Praise for Firelight Fables",
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
};

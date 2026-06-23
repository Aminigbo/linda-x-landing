import BackgroundImg from "../assets/about-bg.jpg";
import Img from "../assets/FB_IMG_1743869048255.jpg";
import { imageSrc } from "@/lib/image";

function AboutUs() {
  return (
    <div
      className="relative w-full min-h-screen bg-cover bg-center bg-no-repeat flex items-center px-4"
      style={{ backgroundImage: `url(${imageSrc(BackgroundImg)})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#080808] opacity-90 z-0" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 py-16 px-4 text-white">
        {/* Image Section */}
        <div className="flex justify-center items-start">
          <img
            src={imageSrc(Img)}
            alt="Linda"
            className="w-full max-w-[350px] md:h-[450px] object-cover shadow-xl rounded-sm"
          />
        </div>

        {/* Text Section */}
        <div className="bg-[#2E2E2E] bg-opacity-90 p-6 shadow-lg rounded-sm lg:w-[600px]">
          <h3 className="text-2xl sm:text-2xl md:text-3xl font-semibold mb-6 bg-[#A72024] p-3">
            About Linda Somiari-Stewart
          </h3>
          <div className="space-y-4 text-base sm:text-lg leading-relaxed">
            <p>
              Journalist. Griot. Keeper of Ancestral Fire.
            </p>
            <p>
              Linda Somiari-Stewart is a journalist-turned-griot with a passion
              for preserving Africa’s rich values,culture and traditions through
              storytelling. With an extensive background in both print and
              television media, she has dedicated her life to reviving Africa’s
              once cherished but now fading values. <br />
              Her work is focused on reconnecting people with the pure, sacred
              essence of life through the art of storytelling. <br />
              Her acclaimed works—including Woyingi: God Is a Woman ( Tamara:
              The Gender of God) , The Legend of Tari-Ere: The Picky Virgin( She
              who loved a lie)and The Square of Lost Songs-A Modern Griot’s
              Tales -celebrate African folklore while boldly exploring themes of
              gender, identity, the divine feminine and the supernatural.
              Drawing deeply from her Ijaw -African heritage, her storytelling
              weaves myth, memory, and philosophy into rich, lyrical narratives
              that speak to both the personal and the universal.
            </p>
            <p>
              Today, she is sought after by the young and old across Africa and
              the diaspora. In quiet one-on-one sessions or small group circles,
              people turn to her when life feels heavy, when the path forward is
              unclear, or when something deep within longs to be understood.
              With ancestral wisdom and deep listening, she offers more than
              answers—she offers clarity, healing, and direction.
              <br /> Her clients call her the Ancient Soul Whisperer! Many leave
              her presence transformed - grounded, renewed, and ready to live
              more colorful and enriched lives. Her impact echoes through
              stories, referrals, and lives changed by words both ancient and
              alive.
            </p>
            <p>
              She doesn’t just tell stories. She helps people find their own
              stories.<br /> Linda Somiari- Stewart is a living proof that wisdom
              deepens with time and that the griot’s flame burns strong for the
              generations to come.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;

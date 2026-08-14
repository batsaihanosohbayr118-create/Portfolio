import { DownloadIcon, Mail } from "lucide-react";
import CV from "../assets/CV.png";
import Facebook from "../assets/facebook.svg";
import Github from "../assets/github.png";
import Instagram from "../assets/instagram.svg";
import PortfolioImage from "../assets/portfolio.jpg";
import Tiktok from "../assets/tiktok.png";

const socialIcons = [
  { icon: Instagram, alt: "Instagram", link: "https://www.instagram.com/osgoo_b" },
  { icon: Tiktok, alt: "Tiktok", link: "https://www.tiktok.com/@osgoo_b" },
  {
    icon: Github,
    alt: "Github",
    link: "https://github.com/batsaihanosohbayr118-create",
  },
  { icon: Facebook, alt: "Facebook", link: "https://www.facebook.com/osgoo.b" },
];

const Hero = () => {
  const handleScrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative overflow-visible flex flex-col">
      <div className="pointer-events-none absolute z-[70] -top-20 -left-20 h-64 w-64 bg-orange-500 opacity-10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse hidden sm:block" />

      <section
        id="home"
        data-aos="fade-up"
        data-aos-delay="250"
        className="body-font relative min-h-[calc(100vh-80px)] flex items-center pt-24 pb-12 lg:pt-24 lg:pb-16"
      >
        <div className="container mx-auto flex px-4 sm:px-8 lg:px-14 flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 w-full flex flex-col items-center lg:items-start text-center lg:text-left mb-12 lg:mb-0">
            <div className="relative z-[60] flex justify-center lg:justify-start gap-4 sm:gap-6 mb-6 sm:mb-7 w-full">
              {socialIcons.map((social, index) => (
                <a
                  key={social.alt}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-aos-delay={`${400 + index * 100}`}
                  className="relative z-[60] transform hover:scale-110 transition-transform duration-300"
                >
                  <img
                    src={social.icon}
                    alt={social.alt}
                    className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                  />
                </a>
              ))}
            </div>

            <h1
              className="title-font text-3xl sm:text-4xl lg:text-5xl mb-4 font-bold text-white"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              Сайн байна уу, Би Өсөхбаяр
            </h1>

            <p
              className="mb-6 sm:mb-8 leading-relaxed max-w-md sm:max-w-lg text-gray-300"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              Намайг Өсөхбаяр гэдэг. Би хариуцлагатай, цагийг үнэлдэг бөгөөд
              тасралтгүй хөгжлийг эрхэмлэдэг хүн. Шинэ орчинд хурдан дасан
              зохицож, бие даан болон багаар үр дүнтэй ажиллах чадвартай.
            </p>

            <div
              className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
              data-aos="fade-up"
              data-aos-delay="700"
            >
              <a
                href={CV}
                download
                className="inline-flex items-center justify-center text-white bg-gradient-to-r from-orange-500 to-amber-500 py-3 px-8 rounded-full text-base sm:text-lg font-semibold transition-all duration-300 hover:shadow-[0_0_40px_rgb(255,165,0,0.7)]"
              >
                <DownloadIcon className="w-5 h-5 mr-2" />
                CV татах
              </a>

              <button
                onClick={handleScrollToContact}
                className="inline-flex items-center justify-center py-3 px-8 rounded-full text-base sm:text-lg font-semibold transition-all duration-300 hover:shadow-[0_0_40px_rgb(255,165,0,0.7)] text-white border-2 border-orange-500 hover:bg-orange-600"
              >
                <Mail className="w-5 h-5 mr-2" />
                Холбоо барих
              </button>
            </div>
          </div>

          <div
            className="lg:w-1/2 w-full max-w-md lg:max-w-lg mt-8 lg:mt-0 flex justify-center"
            data-aos="fade-left"
            data-aos-delay="400"
          >
            <div className="relative w-[300px] sm:w-[350px] lg:w-[400px]">
              <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-orange-400 via-amber-500 to-orange-600 opacity-80 blur-md" />
              <img
                src={PortfolioImage}
                alt="portfolio"
                className="relative w-full h-full rounded-full object-cover ring-4 ring-white/90 shadow-2xl shadow-orange-500/40 transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>

      </section>
    </div>
  );
};

export default Hero;

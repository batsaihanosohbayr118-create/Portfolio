import emailjs from "emailjs-com";
import { useRef, useState } from "react";
import contactImg from "../assets/about.jpg";

const inputBaseClass =
  "w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-sm sm:text-base focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all";

const fieldStyles = {
  backgroundColor: "#374151",
  borderColor: "#4b5563",
  color: "white",
};

const Contact = () => {
  const form = useRef(null);
  const [status, setStatus] = useState("idle");

  const isLoading = status === "loading";

  const resetStatusAfterDelay = () => {
    setTimeout(() => setStatus("idle"), 4000);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus("loading");

    emailjs
      .sendForm(
        "service_g4ebu8c",
        "template_4yrsjae",
        form.current,
        "La2k8Z4wLXYaTyNhk"
      )
      .then(
        () => {
          setStatus("success");
          form.current?.reset();
          resetStatusAfterDelay();
        },
        () => {
          setStatus("error");
          resetStatusAfterDelay();
        }
      );
  };

  return (
    <section
      id="contact"
      style={{ backgroundColor: "#111827" }}
      className="pt-20 sm:pt-24 pb-12 sm:pb-16 md:pb-20 lg:pb-24 overflow-hidden scroll-mt-24"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:items-stretch">
          <div className="flex justify-center order-2 lg:order-1" data-aos="fade-right">
            <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-md aspect-[3/4] lg:aspect-auto lg:h-full">
              <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-orange-400 via-amber-500 to-orange-600 opacity-70 blur-md" />
              <img
                src={contactImg}
                alt="Холбоо барих"
                className="absolute inset-0 w-full h-full object-cover rounded-[1.75rem] ring-4 ring-white/90 shadow-2xl shadow-orange-500/40"
              />
            </div>
          </div>

          <form
            ref={form}
            onSubmit={handleSubmit}
            style={{
              background: "linear-gradient(to right, #1f2937, #111827)",
              borderColor: "#374151",
            }}
            className="rounded-xl p-4 sm:p-5 md:p-6 lg:p-8 border shadow-lg order-1 lg:order-2"
            data-aos="fade-left"
          >
            {status === "success" && (
              <div className="mb-4 p-3 rounded-lg bg-green-100 border border-green-400 text-green-700 text-sm sm:text-base">
                Таны хүсэлт амжилттай илгээгдлээ!
              </div>
            )}

            {status === "error" && (
              <div className="mb-4 p-3 rounded-lg bg-red-100 border border-red-400 text-red-700 text-sm sm:text-base">
                Илгээгдсэнгүй. ID эсвэл мэдээллээ шалгаад дахин оролдоно уу.
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
              <input
                type="text"
                name="from_name"
                placeholder="Нэр"
                style={fieldStyles}
                className={inputBaseClass}
                required
              />

              <input
                type="text"
                name="last_name"
                placeholder="Овог"
                style={fieldStyles}
                className={inputBaseClass}
                required
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="И-мэйл хаяг"
              style={fieldStyles}
              className={`${inputBaseClass} mb-3 sm:mb-4`}
              required
            />

            <input
              type="tel"
              name="phone"
              placeholder="Утасны дугаар"
              style={fieldStyles}
              className={`${inputBaseClass} mb-3 sm:mb-4`}
              required
            />

            <textarea
              name="message"
              placeholder="Мессежээ бичнэ үү..."
              style={fieldStyles}
              className={`${inputBaseClass} mb-3 sm:mb-6 resize-none`}
              required
            />

            <button
              type="submit"
              disabled={isLoading}
              style={{ background: "linear-gradient(to right, #f97316, #f29e0b)" }}
              className="w-full py-2 sm:py-3 text-white font-semibold rounded-lg text-sm sm:text-base hover:shadow-lg hover:shadow-orange-500/25 hover:scale-[1.02] transition-all disabled:opacity-60"
            >
              {isLoading ? "Илгээж байна..." : "Илгээх"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;

import emailjs from "@emailjs/browser";
import { ArrowRight } from "lucide-react";
import { useRef, useState } from "react";
import contactImg from "../assets/about.webp";
import { useLanguage } from "../i18n/LanguageContext";
import SubjectSelect from "./SubjectSelect";

const serif = { fontFamily: '"Cormorant Garamond", "Times New Roman", serif' };

const labelClass = "block mb-2 text-sm text-[#1d1b18]/70";

const inputBaseClass =
  "w-full bg-transparent border-0 border-b border-[#1d1b18]/20 px-0 py-2.5 text-base text-[#1d1b18] placeholder:text-[#1d1b18]/45 outline-none transition-colors focus:border-[#a8875a]";

const Contact = () => {
  const form = useRef(null);
  const [status, setStatus] = useState("idle");
  const [subject, setSubject] = useState("");
  const { t } = useLanguage();

  const isLoading = status === "loading";

  const resetStatusAfterDelay = () => {
    setTimeout(() => setStatus("idle"), 4000);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Honeypot: real visitors never see this field, bots usually fill it in.
    if (form.current?.elements.namedItem("website")?.value) {
      setStatus("success");
      form.current.reset();
      setSubject("");
      resetStatusAfterDelay();
      return;
    }

    setStatus("loading");

    emailjs
      .sendForm("service_g4ebu8c", "template_4yrsjae", form.current, {
        publicKey: "La2k8Z4wLXYaTyNhk",
        limitRate: { id: "portfolio-contact", throttle: 10000 },
      })
      .then(
        () => {
          setStatus("success");
          form.current?.reset();
          setSubject("");
          resetStatusAfterDelay();
        },
        (error) => {
          console.error("EmailJS send failed:", error);
          setStatus("error");
          resetStatusAfterDelay();
        }
      );
  };

  return (
    <section
      id="contact"
      data-nav-tone="light"
      className="relative overflow-hidden bg-[#f3ece3] text-[#1d1b18] px-5 sm:px-10 lg:px-14 py-20 lg:py-28 scroll-mt-16"
    >
      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-center lg:items-start">
        <figure className="lg:col-span-5 flex flex-col items-center order-2 lg:order-1" data-aos="fade-up">
          <div className="relative w-64 sm:w-72 lg:w-full max-w-sm aspect-[4/5]">
            <div className="arch-drift absolute inset-0 -translate-x-4 translate-y-4 rounded-t-full border border-[#a8875a]/70" />
            <div className="arch-light arch-glow absolute -inset-2 rounded-t-full blur-2xl" aria-hidden="true" />
            <div className="arch-light relative h-full w-full rounded-t-full p-[2px]">
              <div className="h-full w-full overflow-hidden rounded-t-full">
                <img
                  src={contactImg}
                  alt={t.contact.imageAlt}
                  className="arch-zoom w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          <figcaption className="mt-12 text-center">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-[#a8875a]">
              {t.contact.captionA}
            </p>
            <p className="mt-3 text-lg text-[#3d3934]" style={serif}>
              {t.contact.captionB}
            </p>
          </figcaption>
        </figure>

        <div className="lg:col-span-7 order-1 lg:order-2" data-aos="fade-up" data-aos-delay="150">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-medium leading-none" style={serif}>
            {t.contact.title}
          </h2>
          <span className="mt-5 mb-4 block h-px w-14 bg-[#a8875a]" />
          <p className="mb-6 text-lg sm:text-xl leading-snug text-[#3d3934]" style={serif}>
            {t.contact.subtitleA}
            <br />
            {t.contact.subtitleB}
          </p>

          <form ref={form} onSubmit={handleSubmit} className="relative">
            {status === "success" && (
              <div role="status" className="mb-6 border-l-2 border-[#5b7a4a] bg-[#5b7a4a]/10 px-4 py-3 text-sm text-[#3f5733]">
                {t.contact.success}
              </div>
            )}

            {status === "error" && (
              <div role="alert" className="mb-6 border-l-2 border-[#a3412f] bg-[#a3412f]/10 px-4 py-3 text-sm text-[#86321f]">
                {t.contact.error}
              </div>
            )}

            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute -left-[9999px] h-0 w-0 opacity-0"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 mb-2">
              <input
                type="text"
                name="from_name"
                placeholder={t.contact.firstName}
                aria-label={t.contact.firstName}
                className={inputBaseClass}
                required
              />

              <input
                type="text"
                name="last_name"
                placeholder={t.contact.lastName}
                aria-label={t.contact.lastName}
                className={inputBaseClass}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 mb-5">
              <input
                type="email"
                name="email"
                placeholder={t.contact.email}
                aria-label={t.contact.email}
                className={inputBaseClass}
                required
              />

              <input
                type="tel"
                name="phone"
                placeholder={t.contact.phone}
                aria-label={t.contact.phone}
                className={inputBaseClass}
                required
              />
            </div>

            <div className="mb-5">
              <SubjectSelect
                name="subject"
                label={t.contact.subject}
                labelClassName={labelClass}
                placeholder={t.contact.subjectPlaceholder}
                options={t.contact.subjects}
                value={subject}
                onChange={setSubject}
              />
            </div>

            <label className="block mb-7">
              <span className={labelClass}>{t.contact.messageLabel}</span>
              <textarea
                name="message"
                placeholder={t.contact.message}
                rows={2}
                className={`${inputBaseClass} resize-none min-h-[4.5rem] max-h-60 [field-sizing:content] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}
                required
              />
            </label>

            <button
              type="submit"
              disabled={isLoading}
              className="group inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-full bg-[#1d1b18] px-9 py-4 text-xs sm:text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-[#f3ece3] btn-slide disabled:opacity-60 cursor-pointer"
            >
              {isLoading ? t.contact.sending : t.contact.send}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;

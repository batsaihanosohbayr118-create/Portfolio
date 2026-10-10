import { AnimatePresence, motion as Motion } from "framer-motion";
import { Download, ExternalLink, Loader2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorkerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import { useLanguage } from "../i18n/LanguageContext";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

const CVPreviewModal = ({ isOpen, onClose, cvUrl, fileName = "CV.pdf" }) => {
  const containerRef = useRef(null);
  const [status, setStatus] = useState("loading");
  const { t } = useLanguage();

  useEffect(() => {
    if (!isOpen) return;

    let cancelled = false;

    const render = async () => {
      setStatus("loading");
      try {
        const pdf = await pdfjsLib.getDocument({ url: cvUrl }).promise;
        if (cancelled || !containerRef.current) return;

        containerRef.current.innerHTML = "";

        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
          if (cancelled) return;

          const page = await pdf.getPage(pageNumber);
          const containerWidth = containerRef.current.clientWidth || 800;
          const baseViewport = page.getViewport({ scale: 1 });
          const scale = (containerWidth / baseViewport.width) * 2;
          const viewport = page.getViewport({ scale });

          const canvas = document.createElement("canvas");
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          canvas.style.width = "100%";
          canvas.style.height = "auto";
          canvas.style.display = "block";
          canvas.style.marginBottom = "20px";

          const context = canvas.getContext("2d");
          await page.render({ canvasContext: context, viewport }).promise;

          if (cancelled) return;
          containerRef.current.appendChild(canvas);
        }

        if (!cancelled) setStatus("ready");
      } catch (error) {
        console.error("CV PDF render error:", error);
        if (!cancelled) setStatus("error");
      }
    };

    render();

    return () => {
      cancelled = true;
    };
  }, [isOpen, cvUrl]);

  // Close on Escape and keep the page behind from scrolling while open.
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const iconButton =
    "w-10 h-10 rounded-full flex items-center justify-center border border-[#a8875a]/40 text-[#c9a46e] transition-colors duration-300 hover:border-[#a8875a] hover:bg-[#a8875a] hover:text-[#161412] cursor-pointer";

  return (
    <AnimatePresence>
      {isOpen && (
        <Motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0c0b0a]/80 p-3 sm:p-6 backdrop-blur-md"
          onClick={onClose}
        >
          <Motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cv-modal-title"
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
            className="relative w-full max-w-3xl h-[88vh] overflow-hidden rounded-2xl border border-[#a8875a]/40 bg-[#161412] text-[#f3ece3] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9),0_0_60px_-25px_rgba(201,164,110,0.5)] flex flex-col"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(168,135,90,0.25),transparent)]"
            />

            <div className="relative flex items-center justify-between gap-3 px-5 sm:px-7 py-4 sm:py-5 border-b border-[#a8875a]/25 shrink-0">
              <div className="min-w-0">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-[#c9a46e]">Curriculum Vitae</p>
                <h3
                  id="cv-modal-title"
                  className="mt-1 truncate text-2xl sm:text-3xl font-medium leading-none"
                  style={{ fontFamily: '"Cormorant Garamond", "Times New Roman", serif' }}
                >
                  {t.aboutPage.name}
                  <span className="text-[#c9a46e]">.</span>
                </h3>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <a
                  href={cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t.cv.openNew}
                  title={t.cv.openNew}
                  className={iconButton}
                >
                  <ExternalLink className="w-4 h-4" />
                </a>

                <a
                  href={cvUrl}
                  download={fileName}
                  aria-label={t.cv.download}
                  className="group inline-flex h-10 items-center gap-2 rounded-full bg-[#c9a46e] px-4 sm:px-5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[#161412] transition-all duration-300 hover:bg-[#d9b97f] hover:shadow-[0_0_25px_-5px_rgba(217,185,127,0.8)]"
                >
                  <Download className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                  <span className="hidden sm:inline">{t.cv.download}</span>
                </a>

                <button onClick={onClose} aria-label={t.cv.close} className={`${iconButton} group`}>
                  <X className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
                </button>
              </div>
            </div>

            <div className="relative flex-1 min-h-0 overflow-y-auto px-3 sm:px-8 py-5 sm:py-8 bg-[radial-gradient(ellipse_at_top,#221d18,#161412_70%)] [scrollbar-width:thin] [scrollbar-color:#a8875a66_transparent]">
              {status === "loading" && (
                <div className="h-full flex flex-col items-center justify-center gap-4 text-[#f3ece3]/55">
                  <Loader2 className="w-9 h-9 animate-spin text-[#c9a46e]" />
                  <span className="text-xs uppercase tracking-[0.25em]">{t.cv.loading}</span>
                </div>
              )}

              {status === "error" && (
                <div className="h-full flex flex-col items-center justify-center gap-3 px-4 text-center text-sm text-[#f3ece3]/60">
                  {t.cv.failed}
                </div>
              )}

              <Motion.div
                ref={containerRef}
                initial={false}
                animate={status === "ready" ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={`mx-auto max-w-2xl [&>canvas]:rounded-md [&>canvas]:shadow-[0_25px_50px_-20px_rgba(0,0,0,0.8)] [&>canvas]:ring-1 [&>canvas]:ring-[#a8875a]/30 ${
                  status === "ready" ? "" : "hidden"
                }`}
              />
            </div>

            <p className="relative shrink-0 border-t border-[#a8875a]/20 px-4 py-2.5 text-center text-[0.7rem] text-[#f3ece3]/45">
              {t.cv.hintA} <ExternalLink className="inline w-3 h-3 -mt-0.5 text-[#c9a46e]" /> {t.cv.hintB}
            </p>
          </Motion.div>
        </Motion.div>
      )}
    </AnimatePresence>
  );
};

export default CVPreviewModal;

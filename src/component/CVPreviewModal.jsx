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
          canvas.style.marginBottom = "12px";
          canvas.style.borderRadius = "8px";

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

  return (
    <AnimatePresence>
      {isOpen && (
        <Motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          style={{ backgroundColor: "rgba(0,0,0,0.75)" }}
          onClick={onClose}
        >
          <Motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(event) => event.stopPropagation()}
            style={{ backgroundColor: "#1f2937", borderColor: "#374151" }}
            className="relative w-full max-w-3xl h-[85vh] rounded-2xl border shadow-2xl overflow-hidden flex flex-col"
          >
            <div
              style={{ borderColor: "#374151" }}
              className="flex items-center justify-between gap-2 px-4 sm:px-6 py-3 sm:py-4 border-b shrink-0"
            >
              <h3 className="text-white font-semibold text-base sm:text-lg">
                CV
              </h3>

              <div className="flex items-center gap-2">
                <a
                  href={cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t.cv.openNew}
                  title={t.cv.openNew}
                  className="w-9 h-9 rounded-full flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>

                <a
                  href={cvUrl}
                  download={fileName}
                  className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-pink-500 to-purple-500 hover:shadow-[0_0_20px_rgb(236,72,153,0.5)] transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">{t.cv.download}</span>
                </a>

                <button
                  onClick={onClose}
                  aria-label={t.cv.close}
                  className="w-9 h-9 rounded-full flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div
              className="flex-1 min-h-0 overflow-y-auto px-3 sm:px-6 py-4"
              style={{ backgroundColor: "#0d182e" }}
            >
              {status === "loading" && (
                <div className="h-full flex flex-col items-center justify-center gap-3 text-gray-400">
                  <Loader2 className="w-8 h-8 animate-spin" />
                  <span className="text-sm">{t.cv.loading}</span>
                </div>
              )}

              {status === "error" && (
                <div className="h-full flex flex-col items-center justify-center gap-3 text-gray-400 text-center px-4">
                  <span className="text-sm">{t.cv.failed}</span>
                </div>
              )}

              <div ref={containerRef} className={status === "ready" ? "" : "hidden"} />
            </div>

            <p
              className="text-center text-xs py-2 shrink-0"
              style={{ color: "#9ca3af" }}
            >
              {t.cv.hintA}{" "}
              <ExternalLink className="w-3 h-3 inline -mt-0.5" /> {t.cv.hintB}
            </p>
          </Motion.div>
        </Motion.div>
      )}
    </AnimatePresence>
  );
};

export default CVPreviewModal;

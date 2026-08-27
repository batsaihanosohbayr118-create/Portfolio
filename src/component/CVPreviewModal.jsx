import { AnimatePresence, motion as Motion } from "framer-motion";
import { Download, ExternalLink, X } from "lucide-react";

const CVPreviewModal = ({ isOpen, onClose, cvUrl, fileName = "CV.pdf" }) => {
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
                  aria-label="Шинэ цонхонд нээх"
                  title="Шинэ цонхонд нээх"
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
                  <span className="hidden sm:inline">Татах</span>
                </a>

                <button
                  onClick={onClose}
                  aria-label="Хаах"
                  className="w-9 h-9 rounded-full flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 min-h-0" style={{ backgroundColor: "#0d182e" }}>
              <iframe
                src={`${cvUrl}#toolbar=0&view=FitH`}
                title="CV preview"
                className="w-full h-full"
              />
            </div>

            <p
              className="text-center text-xs py-2 shrink-0"
              style={{ color: "#9ca3af" }}
            >
              Файл харагдахгүй бол дээрх{" "}
              <ExternalLink className="w-3 h-3 inline -mt-0.5" /> товч дээр дарж
              шинэ цонхонд нээнэ үү
            </p>
          </Motion.div>
        </Motion.div>
      )}
    </AnimatePresence>
  );
};

export default CVPreviewModal;
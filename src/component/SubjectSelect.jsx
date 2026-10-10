import { AnimatePresence, motion as Motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

const SubjectSelect = ({ name, label, placeholder, options, value, onChange, labelClassName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const rootRef = useRef(null);
  const buttonRef = useRef(null);
  const id = useId();
  const labelId = `${id}-label`;
  const listId = `${id}-list`;
  const optionId = (i) => `${id}-option-${i}`;

  useEffect(() => {
    if (!isOpen) return;
    const handlePointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setIsOpen(false);
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen]);

  const open = () => {
    setActiveIndex(Math.max(0, options.indexOf(value)));
    setIsOpen(true);
  };

  const select = (option) => {
    onChange(option);
    setIsOpen(false);
    buttonRef.current?.focus();
  };

  const handleKeyDown = (event) => {
    if (!isOpen) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) {
        event.preventDefault();
        open();
      }
      return;
    }

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setActiveIndex((i) => (i + 1) % options.length);
        break;
      case "ArrowUp":
        event.preventDefault();
        setActiveIndex((i) => (i - 1 + options.length) % options.length);
        break;
      case "Home":
        event.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        event.preventDefault();
        setActiveIndex(options.length - 1);
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        if (activeIndex >= 0) select(options[activeIndex]);
        break;
      case "Escape":
        event.preventDefault();
        setIsOpen(false);
        break;
      case "Tab":
        setIsOpen(false);
        break;
      default:
    }
  };

  return (
    <div ref={rootRef} className="relative">
      <span id={labelId} className={labelClassName}>
        {label}
      </span>

      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listId}
        aria-labelledby={`${labelId} ${id}-value`}
        aria-activedescendant={isOpen && activeIndex >= 0 ? optionId(activeIndex) : undefined}
        onClick={() => (isOpen ? setIsOpen(false) : open())}
        onKeyDown={handleKeyDown}
        className={`group flex w-full items-center justify-between gap-3 border bg-transparent px-4 py-2.5 text-left text-sm outline-none transition-all duration-300 cursor-pointer ${
          isOpen
            ? "border-[#a8875a] bg-[#f8f3ec] shadow-[0_0_0_3px_rgba(168,135,90,0.12)]"
            : "border-[#1d1b18]/20 hover:border-[#a8875a]/60 focus-visible:border-[#a8875a]"
        }`}
      >
        <span id={`${id}-value`} className={value ? "text-[#1d1b18]" : "text-[#1d1b18]/45"}>
          {value || placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-[#a8875a]" : "text-[#1d1b18]/50 group-hover:text-[#a8875a]"
          }`}
        />
      </button>

      {/* Carries the value into the form and blocks submit until something is picked */}
      <input
        tabIndex={-1}
        aria-hidden="true"
        name={name}
        value={value}
        required
        onChange={() => {}}
        onFocus={() => buttonRef.current?.focus()}
        className="pointer-events-none absolute bottom-0 left-4 h-px w-px opacity-0"
      />

      <AnimatePresence>
        {isOpen && (
          <Motion.ul
            id={listId}
            role="listbox"
            aria-labelledby={labelId}
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-0 right-0 top-full z-30 mt-2 origin-top overflow-hidden rounded-xl border border-[#a8875a]/40 bg-[#f8f3ec] p-1.5 shadow-[0_25px_50px_-20px_rgba(29,27,24,0.45)]"
          >
            {options.map((option, i) => {
              const isSelected = option === value;
              const isActive = i === activeIndex;
              return (
                <Motion.li
                  key={option}
                  id={optionId(i)}
                  role="option"
                  aria-selected={isSelected}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: 0.03 * i }}
                  onPointerEnter={() => setActiveIndex(i)}
                  onPointerDown={(event) => event.preventDefault()}
                  onClick={() => select(option)}
                  className={`relative flex items-center justify-between gap-3 rounded-lg px-4 py-3 text-sm cursor-pointer transition-colors duration-200 ${
                    isActive ? "bg-[#a8875a]/12 text-[#1d1b18]" : "text-[#1d1b18]/75"
                  } ${isSelected ? "font-medium text-[#8a6c40]" : ""}`}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute left-1 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-[#a8875a] transition-opacity duration-200 ${
                      isActive || isSelected ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  <span className={`transition-transform duration-200 ${isActive ? "translate-x-1" : ""}`}>
                    {option}
                  </span>
                  {isSelected && <Check className="w-4 h-4 shrink-0 text-[#a8875a]" />}
                </Motion.li>
              );
            })}
          </Motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SubjectSelect;

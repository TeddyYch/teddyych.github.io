import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export type ProjectSlide = {
  id: string;
  navLabel: string;
  address: string;
  title: string;
  detail: string;
  src: string;
  alt: string;
  width: number;
  height: number;
};

const AUTOPLAY_DELAY = 7_000;

type KineticProjectGalleryProps = {
  galleryId: string;
  label: string;
  slides: ProjectSlide[];
  onActiveChange?: (id: string) => void;
};

export default function KineticProjectGallery({ galleryId, label, slides, onActiveChange }: KineticProjectGalleryProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const userChangePendingRef = useRef(false);
  const pendingClearTimerRef = useRef<number | null>(null);
  const [viewportRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center", duration: 42, skipSnaps: false });
  const reducedMotion = useReducedMotion();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);
  const [autoplayReset, setAutoplayReset] = useState(0);
  const [announcement, setAnnouncement] = useState("");

  const resetAutoplay = useCallback((expectsSlideChange = true) => {
    if (pendingClearTimerRef.current !== null) {
      window.clearTimeout(pendingClearTimerRef.current);
      pendingClearTimerRef.current = null;
    }
    userChangePendingRef.current = expectsSlideChange;
    setAutoplayReset((value) => value + 1);
  }, []);

  const updateSelection = useCallback(() => {
    if (!emblaApi) return;
    const index = emblaApi.selectedScrollSnap();
    setSelectedIndex(index);
    onActiveChange?.(slides[index].id);
    if (userChangePendingRef.current) {
      setAnnouncement(`Showing ${slides[index].navLabel} screenshot, ${index + 1} of ${slides.length}.`);
      userChangePendingRef.current = false;
    }
  }, [emblaApi, onActiveChange, slides]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: "120px 0px", threshold: 0.05 });
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateVisibility = () => setTabHidden(document.hidden);
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    const handlePointerDown = () => {
      setDragging(true);
      resetAutoplay();
    };
    const handlePointerUp = () => {
      pendingClearTimerRef.current = window.setTimeout(() => {
        userChangePendingRef.current = false;
        setDragging(false);
        pendingClearTimerRef.current = null;
      }, 1_000);
    };
    const handleSettle = () => {
      setDragging(false);
      if (pendingClearTimerRef.current !== null) {
        window.clearTimeout(pendingClearTimerRef.current);
        pendingClearTimerRef.current = null;
      }
      userChangePendingRef.current = false;
    };

    updateSelection();
    emblaApi.on("select", updateSelection);
    emblaApi.on("reInit", updateSelection);
    emblaApi.on("pointerDown", handlePointerDown);
    emblaApi.on("pointerUp", handlePointerUp);
    emblaApi.on("settle", handleSettle);
    return () => {
      emblaApi.off("select", updateSelection);
      emblaApi.off("reInit", updateSelection);
      emblaApi.off("pointerDown", handlePointerDown);
      emblaApi.off("pointerUp", handlePointerUp);
      emblaApi.off("settle", handleSettle);
    };
  }, [emblaApi, resetAutoplay, updateSelection]);

  const focusIsInside = focusWithin || Boolean(rootRef.current?.contains(document.activeElement));

  useEffect(() => {
    if (!emblaApi || reducedMotion || !visible || hovered || focusIsInside || dragging || tabHidden) return;
    const timer = window.setTimeout(() => {
      userChangePendingRef.current = false;
      emblaApi.scrollNext();
    }, AUTOPLAY_DELAY);
    return () => window.clearTimeout(timer);
  }, [autoplayReset, emblaApi, reducedMotion, visible, hovered, focusIsInside, dragging, selectedIndex, tabHidden]);

  useEffect(() => () => {
    if (pendingClearTimerRef.current !== null) window.clearTimeout(pendingClearTimerRef.current);
  }, []);

  const selectSlide = (index: number) => {
    resetAutoplay(index !== selectedIndex);
    emblaApi?.scrollTo(index);
  };

  const moveSlide = (direction: "previous" | "next") => {
    resetAutoplay();
    if (direction === "previous") emblaApi?.scrollPrev();
    else emblaApi?.scrollNext();
  };

  const autoplayRunning = Boolean(emblaApi && !reducedMotion && visible && !hovered && !focusIsInside && !dragging && !tabHidden);

  return (
    <div
      ref={rootRef}
      className="kinetic-gallery"
      aria-label={`${label} screenshots`}
      data-autoplay={autoplayRunning ? "running" : "paused"}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocusCapture={() => setFocusWithin(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocusWithin(false);
      }}
    >
      <div className="kinetic-gallery__tabs" aria-label={`Select ${label} view`}>
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            aria-pressed={selectedIndex === index}
            aria-controls={`${galleryId}-slide-${slide.id}`}
            onClick={() => selectSlide(index)}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>{slide.navLabel}
          </button>
        ))}
      </div>

      <div
        ref={viewportRef}
        className="kinetic-gallery__viewport"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") { event.preventDefault(); moveSlide("previous"); }
          if (event.key === "ArrowRight") { event.preventDefault(); moveSlide("next"); }
        }}
      >
        <div className="kinetic-gallery__track">
          {slides.map((slide, index) => (
            <div id={`${galleryId}-slide-${slide.id}`} key={slide.id} className={`kinetic-gallery__slide kinetic-gallery__slide--${slide.id}`} role="group" aria-label={`${index + 1} of ${slides.length}: ${slide.title}`} aria-current={selectedIndex === index}>
              <figure className="kinetic-gallery__figure">
                <div className="browser-frame__bar" aria-hidden="true"><span /><span /><span /><span className="browser-frame__address">{slide.address}</span></div>
                <div className="kinetic-gallery__image">
                  <img src={slide.src} alt={slide.alt} width={slide.width} height={slide.height} loading="lazy" decoding="async" draggable={false} />
                </div>
                <figcaption><span>{slide.title}</span><small>{slide.detail}</small></figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>

      <div className="kinetic-gallery__controls">
        <button type="button" onClick={() => moveSlide("previous")} aria-label={`Previous ${label} screenshot`}><ChevronLeft aria-hidden="true" /></button>
        <p><span>{String(selectedIndex + 1).padStart(2, "0")}</span> / {String(slides.length).padStart(2, "0")} · {slides[selectedIndex].navLabel}</p>
        <button type="button" onClick={() => moveSlide("next")} aria-label={`Next ${label} screenshot`}><ChevronRight aria-hidden="true" /></button>
      </div>
      <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</p>
    </div>
  );
}

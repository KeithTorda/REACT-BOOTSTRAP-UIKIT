import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

/** Fullscreen image viewer with prev/next. images: [{ src, alt, caption }] */
export default function Lightbox({ images = [], index = 0, open, onClose }) {
  const [current, setCurrent] = useState(index);
  useEffect(() => setCurrent(index), [index]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') onClose?.();
      if (event.key === 'ArrowRight') setCurrent((c) => (c + 1) % images.length);
      if (event.key === 'ArrowLeft') setCurrent((c) => (c - 1 + images.length) % images.length);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, images.length, onClose]);

  if (!open || !images.length) return null;
  const image = images[current];

  return createPortal(
    <div className="uikit-lightbox" role="dialog" aria-modal="true">
      <button type="button" className="uikit-lightbox__close btn-close btn-close-white" aria-label="Close" onClick={onClose} />
      <button type="button" className="uikit-lightbox__nav uikit-lightbox__nav--prev" aria-label="Previous"
        onClick={() => setCurrent((c) => (c - 1 + images.length) % images.length)}>
        <i className="bi bi-chevron-left" />
      </button>
      <figure className="uikit-lightbox__figure">
        <img src={image.src} alt={image.alt || ''} />
        {image.caption && <figcaption>{image.caption}</figcaption>}
        <span className="uikit-lightbox__count">{current + 1} / {images.length}</span>
      </figure>
      <button type="button" className="uikit-lightbox__nav uikit-lightbox__nav--next" aria-label="Next"
        onClick={() => setCurrent((c) => (c + 1) % images.length)}>
        <i className="bi bi-chevron-right" />
      </button>
    </div>,
    document.body
  );
}

Lightbox.propTypes = {
  images: PropTypes.array, index: PropTypes.number, open: PropTypes.bool, onClose: PropTypes.func,
};

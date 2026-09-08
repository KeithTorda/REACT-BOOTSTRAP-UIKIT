import { useState } from 'react';
import PropTypes from 'prop-types';
import Lightbox from '../overlays/Lightbox';
import { cn } from '../../utils/cn';

/** Thumbnail grid that opens a Lightbox. images: [{ src, alt, caption }] */
export default function Gallery({ images = [], columns = 4, ratio = '1 / 1', className }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <>
      <div className={cn('uikit-gallery', className)} style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
        {images.map((image, i) => (
          <button
            key={image.src || i}
            type="button"
            className="uikit-gallery__item"
            style={{ aspectRatio: ratio }}
            onClick={() => { setIndex(i); setOpen(true); }}
          >
            <img src={image.src} alt={image.alt || ''} />
            <span className="uikit-gallery__zoom"><i className="bi bi-zoom-in" /></span>
          </button>
        ))}
      </div>
      <Lightbox images={images} index={index} open={open} onClose={() => setOpen(false)} />
    </>
  );
}

Gallery.propTypes = { images: PropTypes.array, columns: PropTypes.number, ratio: PropTypes.string, className: PropTypes.string };

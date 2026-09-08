import PropTypes from 'prop-types';
import Preview from './Preview';
import PropsTable from './PropsTable';
import Badge from '../feedback/Badge';

/**
 * One documented component: name, description, variant list, live preview,
 * usage snippet and (optionally) a props table.
 */
export default function ShowcaseSection({ id, title, description, variants = [], code, props: propRows = [], muted, children }) {
  return (
    <section className="uikit-doc-section" id={id}>
      <div className="uikit-doc-section__head d-flex flex-wrap align-items-center gap-2">
        <div className="me-auto">
          <h2 className="uikit-doc-section__title">{title}</h2>
          {description && <p className="uikit-doc-section__desc">{description}</p>}
        </div>
        {variants.map((variant) => (
          <Badge key={variant} tone="soft" variant="secondary">{variant}</Badge>
        ))}
      </div>
      <Preview code={code} muted={muted}>{children}</Preview>
      <PropsTable rows={propRows} />
    </section>
  );
}

ShowcaseSection.propTypes = {
  id: PropTypes.string,
  title: PropTypes.node,
  description: PropTypes.node,
  variants: PropTypes.arrayOf(PropTypes.string),
  code: PropTypes.string,
  props: PropTypes.array,
  muted: PropTypes.bool,
  children: PropTypes.node,
};

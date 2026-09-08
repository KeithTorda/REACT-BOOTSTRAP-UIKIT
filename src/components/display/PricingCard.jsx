import PropTypes from 'prop-types';
import Card from '../cards/Card';
import Button from '../buttons/Button';
import { cn } from '../../utils/cn';

/**
 * Plan / tier card.
 * <PricingCard name="Pro" price="₱1,299" period="/mo" features={[…]} featured action={{label:'Choose'}} />
 */
export default function PricingCard({
  name, price, period = '/month', description, features = [], featured = false,
  badge, action, variant = 'primary', className,
}) {
  return (
    <Card
      variant={featured ? 'elevated' : 'bordered'}
      ribbon={featured ? badge || 'Popular' : undefined}
      ribbonVariant={variant}
      className={cn('h-100 text-center', featured && 'uikit-pricing--featured', className)}
    >
      <h6 className="text-uppercase text-secondary-soft" style={{ letterSpacing: '.06em' }}>{name}</h6>
      <div className="my-3">
        <span className="fw-bold" style={{ fontSize: '2rem', color: 'var(--text-heading)' }}>{price}</span>
        <span className="text-secondary-soft"> {period}</span>
      </div>
      {description && <p className="text-secondary-soft small">{description}</p>}

      <ul className="list-unstyled text-start my-4">
        {features.map((feature) => {
          const item = typeof feature === 'object' ? feature : { label: feature, included: true };
          return (
            <li key={item.label} className="d-flex align-items-start gap-2 py-1" style={{ fontSize: '.8125rem' }}>
              <i
                className={`bi bi-${item.included === false ? 'x-lg' : 'check-lg'}`}
                style={{ color: item.included === false ? 'var(--text-muted)' : `var(--${variant})` }}
              />
              <span className={item.included === false ? 'text-secondary-soft text-decoration-line-through' : undefined}>{item.label}</span>
            </li>
          );
        })}
      </ul>

      {action && (
        <Button block variant={variant} tone={featured ? 'solid' : 'outline'} onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </Card>
  );
}

PricingCard.propTypes = {
  name: PropTypes.node, price: PropTypes.node, period: PropTypes.node, description: PropTypes.node,
  features: PropTypes.array, featured: PropTypes.bool, badge: PropTypes.node,
  action: PropTypes.object, variant: PropTypes.string, className: PropTypes.string,
};

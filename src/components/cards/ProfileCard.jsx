import PropTypes from 'prop-types';
import Card from './Card';
import Avatar from '../display/Avatar';
import Badge from '../feedback/Badge';
import { cn } from '../../utils/cn';

/**
 * <ProfileCard name="Jane Smith" role="Operations Lead" status="Active"
 *              stats={[{ label:'Tasks', value: 24 }]} actions={<Button/>} />
 */
export default function ProfileCard({
  name, role, description, avatar, status, statusVariant = 'success',
  stats = [], actions, meta = [], cover = true, className,
}) {
  return (
    <Card padded={false} className={cn('overflow-hidden', className)}>
      {cover && <div className="uikit-profile-cover" />}
      <div className="uikit-card__body text-center" style={{ marginTop: cover ? -46 : 0 }}>
        <Avatar name={name} src={avatar} size={80} className="mb-2" />
        <h5 className="mb-0">{name}</h5>
        {role && <p className="text-secondary-soft small mb-2">{role}</p>}
        {status && <Badge variant={statusVariant} dot>{status}</Badge>}
        {description && <p className="text-secondary-soft small mt-3 mb-0">{description}</p>}

        {meta.length > 0 && (
          <ul className="list-unstyled text-start mt-3 mb-0 small">
            {meta.map((item) => (
              <li key={item.label} className="d-flex align-items-center gap-2 py-1 text-secondary-soft">
                {item.icon && <i className={`bi bi-${item.icon}`} aria-hidden="true" />}
                <span>{item.value}</span>
              </li>
            ))}
          </ul>
        )}

        {stats.length > 0 && (
          <div className="row g-0 text-center border-top mt-3 pt-3">
            {stats.map((stat) => (
              <div className="col" key={stat.label}>
                <div className="fw-semibold">{stat.value}</div>
                <div className="uikit-helper mt-0">{stat.label}</div>
              </div>
            ))}
          </div>
        )}

        {actions && <div className="d-flex justify-content-center gap-2 mt-3">{actions}</div>}
      </div>
    </Card>
  );
}

ProfileCard.propTypes = {
  name: PropTypes.string,
  role: PropTypes.node,
  description: PropTypes.node,
  avatar: PropTypes.string,
  status: PropTypes.node,
  statusVariant: PropTypes.string,
  stats: PropTypes.array,
  actions: PropTypes.node,
  meta: PropTypes.array,
  cover: PropTypes.bool,
  className: PropTypes.string,
};

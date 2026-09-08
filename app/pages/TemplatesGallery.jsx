import { Link } from 'react-router-dom';
import { ContentWrapper } from '@kit/components/layout';
import { Card } from '@kit/components/cards';
import { Badge } from '@kit/components/feedback';
import { TEMPLATES } from '@kit/templates';

const GROUPS = [...new Set(TEMPLATES.map((t) => t.group))];

export default function TemplatesGallery() {
  return (
    <ContentWrapper
      title="Page Templates"
      subtitle={`${TEMPLATES.length} complete screens built only from kit components — open one, then copy its file from src/templates/`}
      breadcrumb={[{ label: 'Home', path: '/' }, { label: 'Templates' }]}
    >
      {GROUPS.map((group) => (
        <section className="mb-4" key={group}>
          <h5 className="mb-3">{group}</h5>
          <div className="row g-3">
            {TEMPLATES.filter((template) => template.group === group).map((template) => (
              <div className="col-12 col-sm-6 col-xl-4" key={template.key}>
                <Link to={template.path} className="text-decoration-none">
                  <Card hoverable className="h-100 mb-0">
                    <div className="d-flex align-items-center gap-3">
                      <span
                        className="uikit-stats__icon"
                        style={{ width: 44, height: 44, fontSize: 18, background: 'var(--primary-soft)', color: 'var(--primary-dark)' }}
                      >
                        <i className={`bi bi-${template.icon}`} />
                      </span>
                      <div className="flex-grow-1 min-width-0">
                        <h6 className="mb-1">{template.name}</h6>
                        <Badge tone="soft" variant="secondary">src/templates/{template.file}</Badge>
                      </div>
                      <i className="bi bi-arrow-right text-secondary-soft" />
                    </div>
                  </Card>
                </Link>
              </div>
            ))}
          </div>
        </section>
      ))}
    </ContentWrapper>
  );
}

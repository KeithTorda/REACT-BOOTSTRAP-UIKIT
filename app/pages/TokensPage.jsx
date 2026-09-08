import { ContentWrapper } from '@kit/components/layout';
import { Card } from '@kit/components/cards';
import { ShowcaseSection } from '@kit/components/docs';

const COLORS = [
  ['--primary', '#2FDF84', 'Brand accent from the reference template'],
  ['--secondary', '#8944D7', 'Secondary accent (gradient partner)'],
  ['--success', '#22C571', 'Positive state'],
  ['--danger', '#F73164', 'Destructive / error'],
  ['--warning', '#F8D62B', 'Caution'],
  ['--info', '#009CE7', 'Informational / links'],
  ['--dark', '#2C323F', 'Dark surface, tooltips'],
  ['--background', '#F4F6F9', 'Page ground'],
  ['--surface', '#FFFFFF', 'Cards, sidebar, navbar'],
  ['--border', '#D5DBE1', 'Panel borders'],
  ['--text-primary', '#333333', 'Body text'],
  ['--text-secondary', '#777777', 'Muted text'],
];

const METRICS = [
  ['--sidebar-width', '270px'],
  ['--sidebar-collapsed-width', '76px'],
  ['--navbar-height', '60px'],
  ['--layout-gutter', '10px'],
  ['--border-radius', '10px'],
  ['--border-radius-sm', '6px'],
  ['--card-shadow', '0 6px 15px rgba(36,37,38,.08)'],
  ['--font-sans', "'Roboto', system sans-serif"],
  ['--font-size-base', '0.875rem'],
];

export default function TokensPage() {
  return (
    <ContentWrapper
      title="Design Tokens"
      subtitle="Every colour, radius and metric in the kit resolves to one of these CSS variables — defined once in src/assets/css/tokens.css"
      breadcrumb={[{ label: 'Home', path: '/' }, { label: 'Design Tokens' }]}
    >
      <ShowcaseSection
        title="Colour tokens"
        description="Change a value here and the entire kit re-skins — components never hardcode a colour."
        code={`:root {\n  --primary: #2fdf84;\n  --secondary: #8944d7;\n  --border-radius: 10px;\n}\n\n/* usage inside a component */\nstyle={{ color: 'var(--primary)' }}`}
        muted
      >
        <div className="row g-3">
          {COLORS.map(([token, hex, note]) => (
            <div className="col-6 col-md-4 col-xl-3" key={token}>
              <Card className="mb-0 h-100" padded={false}>
                <div style={{ height: 64, background: `var(${token})`, borderRadius: 'var(--border-radius) var(--border-radius) 0 0', borderBottom: '1px solid var(--border)' }} />
                <div className="p-3">
                  <code className="d-block" style={{ fontSize: '.75rem', color: 'var(--secondary)' }}>{token}</code>
                  <div className="uikit-helper mt-1">{hex}</div>
                  <div className="uikit-helper mt-1">{note}</div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Layout, shape & typography tokens"
        description="Metrics extracted from the reference template's sidebar, header and card styles."
        muted
      >
        <Card className="mb-0" padded={false}>
          <div className="table-responsive">
            <table className="table uikit-table uikit-prop-table mb-0">
              <thead><tr><th style={{ width: 260 }}>Token</th><th>Value</th></tr></thead>
              <tbody>
                {METRICS.map(([token, value]) => (
                  <tr key={token}><td><code>{token}</code></td><td className="text-secondary-soft">{value}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </ShowcaseSection>

      <ShowcaseSection
        title="Signature gradient"
        description="The reference template's page-title accent — kept as --gradient-accent and reused by the brand mark, page headers and profile covers."
        code={`--gradient-accent: linear-gradient(180deg, #2fdf84 0%, #8944d7 100%);`}
        muted
      >
        <div style={{ height: 72, borderRadius: 'var(--border-radius)', background: 'var(--gradient-accent)' }} />
      </ShowcaseSection>
    </ContentWrapper>
  );
}

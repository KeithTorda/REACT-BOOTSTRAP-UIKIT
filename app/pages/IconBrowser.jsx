import { useMemo, useState } from 'react';
import { ContentWrapper } from '@kit/components/layout';
import { Card } from '@kit/components/cards';
import { SearchInput } from '@kit/components/forms';
import { Badge } from '@kit/components/feedback';

/** Curated Bootstrap Icons list — click a tile to copy its name. */
const ICONS = `speedometer2 grid grid-1x2-fill grid-3x3-gap layout-sidebar layout-sidebar-inset window window-stack table input-cursor-text hand-index-thumb
chat-square-dots signpost-split layers bar-chart-line ui-checks-grid shield-lock palette diagram-3 person person-badge person-plus person-lock people
envelope envelope-open telephone geo-alt calendar3 calendar-check clock clock-history hourglass-split bell bell-fill chat-dots chat-left-text
house building bank briefcase box-seam boxes cart cart-check bag-check receipt cash cash-stack credit-card wallet2 coin calculator tags tag
file-earmark file-earmark-text file-earmark-plus file-earmark-pdf file-earmark-word file-earmark-spreadsheet file-earmark-image file-earmark-zip
folder folder-fill folder-plus folder2-open archive inbox send reply forward paperclip printer download upload cloud-arrow-up cloud-arrow-down
pencil pencil-square trash3 eye eye-slash search funnel sliders gear gear-fill tools wrench key lock unlock shield-check
check2 check2-circle check-lg x-lg x-circle exclamation-triangle exclamation-octagon info-circle question-circle plus-lg dash-lg
arrow-up arrow-down arrow-left arrow-right arrow-clockwise arrow-counterclockwise arrow-repeat arrow-left-right chevron-up chevron-down chevron-left chevron-right
sort-up sort-down arrow-down-up three-dots three-dots-vertical list list-ul list-ol list-check kanban columns
graph-up graph-down bar-chart pie-chart activity bullseye flag stars star star-fill heart bookmark trophy award
sun moon-stars brightness-high display laptop phone tablet hdd hdd-network cpu memory server database wifi globe link-45deg
image images camera play-circle pause-circle stop-circle mic volume-up film music-note-beamed
emoji-smile hand-thumbs-up chat-quote megaphone lightbulb rocket-takeoff magic patch-check gift life-preserver
google facebook github microsoft apple twitter-x linkedin whatsapp telegram`
  .split(/\s+/)
  .filter(Boolean);

export default function IconBrowser() {
  const [query, setQuery] = useState('');
  const [copied, setCopied] = useState(null);

  const shown = useMemo(
    () => (query ? ICONS.filter((icon) => icon.includes(query.toLowerCase())) : ICONS),
    [query]
  );

  const copy = async (icon) => {
    try {
      await navigator.clipboard.writeText(icon);
      setCopied(icon);
      window.setTimeout(() => setCopied(null), 1400);
    } catch { /* clipboard unavailable */ }
  };

  return (
    <ContentWrapper
      title="Icon Browser"
      subtitle="Bootstrap Icons used across the kit — click any tile to copy its name (pass it as the `icon` prop)"
      breadcrumb={[{ label: 'Home', path: '/' }, { label: 'Icons' }]}
      actions={<SearchInput value={query} onChange={setQuery} onClear={() => setQuery('')} placeholder="Search icons…" width={240} />}
    >
      <Card subtitle={`${shown.length} icons`}>
        <div className="uikit-icon-grid">
          {shown.map((icon) => (
            <button key={icon} type="button" className="uikit-icon-tile" onClick={() => copy(icon)} title={icon}>
              <i className={`bi bi-${icon}`} />
              <span className="uikit-icon-tile__name">{icon}</span>
              {copied === icon && <Badge variant="success" tone="solid" className="uikit-icon-tile__copied">Copied</Badge>}
            </button>
          ))}
        </div>
      </Card>
    </ContentWrapper>
  );
}

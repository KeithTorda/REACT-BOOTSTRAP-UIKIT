import { ContentWrapper } from '@kit/components/layout';
import { ShowcaseSection } from '@kit/components/docs';
import { LineChart, BarChart, PieChart, DoughnutChart } from '@kit/components/charts';
import { ChartCard } from '@kit/components/cards';
import { months, lineDatasets, barDatasets, pieLabels, pieData, doughnutLabels, doughnutData } from '@kit/data/sampleChartData';
import { RadarChart, PolarChart, ScatterChart, Sparkline } from '@kit/components/charts';
import { Card } from '@kit/components/cards';

export default function ChartShowcase() {
  return (
    <ContentWrapper
      title="Charts"
      subtitle="Chart.js wrappers pre-styled with the kit's palette and grid"
      breadcrumb={[{ label: 'Components', path: '/components' }, { label: 'Charts' }]}
    >
      <ShowcaseSection
        title="LineChart"
        description="Multi-series line or area chart."
        variants={['line', 'area', 'straight']}
        code={`<LineChart\n  labels={months}\n  datasets={[{ label: 'Series A', data: [32, 48, 41, 62] }]}\n  area\n/>`}
        props={[
          { name: 'labels', type: 'array', description: 'X-axis categories.' },
          { name: 'datasets', type: 'array', description: '{ label, data, color } — colour defaults to the palette.' },
          { name: 'area', type: 'bool', default: 'false', description: 'Fill under the line.' },
          { name: 'smooth', type: 'bool', default: 'true', description: 'Curved (tension 0.4) vs straight segments.' },
          { name: 'options', type: 'object', description: 'Merged over the shared Chart.js options.' },
        ]}
        muted
      >
        <div className="row g-3">
          <div className="col-lg-6"><ChartCard className="mb-0" title="Area" height={260}><LineChart labels={months} datasets={lineDatasets} area /></ChartCard></div>
          <div className="col-lg-6"><ChartCard className="mb-0" title="Line" height={260}><LineChart labels={months} datasets={lineDatasets} smooth={false} /></ChartCard></div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="BarChart"
        description="Grouped, stacked or horizontal bars."
        variants={['grouped', 'stacked', 'horizontal']}
        code={`<BarChart labels={months} datasets={datasets} stacked />\n<BarChart labels={months} datasets={datasets} horizontal />`}
        muted
      >
        <div className="row g-3">
          <div className="col-lg-4"><ChartCard className="mb-0" title="Grouped" height={250}><BarChart labels={months} datasets={barDatasets} /></ChartCard></div>
          <div className="col-lg-4"><ChartCard className="mb-0" title="Stacked" height={250}><BarChart labels={months} datasets={barDatasets} stacked /></ChartCard></div>
          <div className="col-lg-4"><ChartCard className="mb-0" title="Horizontal" height={250}><BarChart labels={months.slice(0, 5)} datasets={[barDatasets[0]]} horizontal /></ChartCard></div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="PieChart & DoughnutChart"
        description="Proportional charts; the doughnut supports a centre label."
        variants={['pie', 'doughnut', 'doughnut with centre']}
        code={`<PieChart labels={labels} data={[38, 27, 21, 14]} />\n\n<DoughnutChart labels={labels} data={data}\n  centerValue="1,248" centerLabel="Total" />`}
        muted
      >
        <div className="row g-3">
          <div className="col-lg-4"><ChartCard className="mb-0" title="Pie" height={260}><PieChart labels={pieLabels} data={pieData} /></ChartCard></div>
          <div className="col-lg-4"><ChartCard className="mb-0" title="Doughnut" height={260}><DoughnutChart labels={doughnutLabels} data={doughnutData} /></ChartCard></div>
          <div className="col-lg-4"><ChartCard className="mb-0" title="With centre label" height={260}><DoughnutChart labels={doughnutLabels} data={doughnutData} centerValue="1,248" centerLabel="Total" /></ChartCard></div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="RadarChart, PolarChart & ScatterChart"
        description="Comparison and distribution charts — all theme-aware."
        variants={['radar', 'polar', 'scatter', 'bubble']}
        code={`<RadarChart labels={axes} datasets={sets} />\n<PolarChart labels={labels} data={data} />\n<ScatterChart datasets={[{ label:'A', data:[{x:1,y:3}] }]} />\n<ScatterChart bubble datasets={[{ data:[{x:1,y:3,r:8}] }]} />`}
        muted
      >
        <div className="row g-3">
          <div className="col-lg-4">
            <ChartCard className="mb-0" title="Radar" height={260}>
              <RadarChart
                labels={['Speed', 'Cost', 'Quality', 'Support', 'Scale']}
                datasets={[{ label: 'Option A', data: [8, 6, 9, 7, 5] }, { label: 'Option B', data: [6, 9, 7, 5, 8] }]}
              />
            </ChartCard>
          </div>
          <div className="col-lg-4">
            <ChartCard className="mb-0" title="Polar area" height={260}>
              <PolarChart labels={pieLabels} data={pieData} />
            </ChartCard>
          </div>
          <div className="col-lg-4">
            <ChartCard className="mb-0" title="Bubble" height={260}>
              <ScatterChart
                bubble
                datasets={[{ label: 'Set A', data: [{ x: 2, y: 4, r: 10 }, { x: 5, y: 7, r: 16 }, { x: 8, y: 3, r: 7 }, { x: 11, y: 9, r: 13 }] }]}
              />
            </ChartCard>
          </div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Sparkline"
        description="Tiny inline chart for stat tiles and table cells — no axes, no legend."
        variants={['line', 'bar', 'no area']}
        code={`<Sparkline data={[12,18,15,24,21,30]} />\n<Sparkline data={data} variant="bar" />\n<StatsCard layout="spark" spark={<Sparkline data={data} />} />`}
        muted
      >
        <div className="row g-3">
          <div className="col-md-4"><Card className="mb-0" subtitle="line"><Sparkline data={[12, 18, 15, 24, 21, 30, 28, 36]} /></Card></div>
          <div className="col-md-4"><Card className="mb-0" subtitle="bar"><Sparkline data={[12, 18, 15, 24, 21, 30, 28, 36]} variant="bar" /></Card></div>
          <div className="col-md-4"><Card className="mb-0" subtitle="danger, no area"><Sparkline data={[36, 28, 30, 21, 24, 15, 18, 12]} color="var(--danger)" area={false} /></Card></div>
        </div>
      </ShowcaseSection>

      <ShowcaseSection
        title="Theme awareness"
        description="Charts read the CSS tokens, so switching the colour theme or dark mode re-colours every chart automatically — no chart code changes."
        code={`// chartSetup.js\nexport function chartColors() {\n  return [token('--primary'), token('--secondary'), token('--info'), …];\n}`}
      >
        <p className="text-secondary-soft mb-0">Open the settings drawer on the right and switch the colour or mode — these charts follow along.</p>
      </ShowcaseSection>

    </ContentWrapper>
  );
}

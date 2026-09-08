import {
  Chart as ChartJS,
  CategoryScale, LinearScale, RadialLinearScale, PointElement, LineElement, BarElement,
  ArcElement, Filler, Tooltip, Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale, LinearScale, RadialLinearScale, PointElement, LineElement, BarElement,
  ArcElement, Filler, Tooltip, Legend
);

/** Read a CSS custom property so charts follow the active theme. */
export function token(name, fallback = '#2fdf84') {
  if (typeof window === 'undefined') return fallback;
  const value = getComputedStyle(document.documentElement).getPropertyValue(name);
  return value?.trim() || fallback;
}

/** Live palette: the first two colours follow the selected brand theme. */
export function chartColors() {
  return [
    token('--primary', '#2fdf84'),
    token('--secondary', '#8944d7'),
    token('--info', '#009ce7'),
    token('--warning', '#f8d62b'),
    token('--danger', '#f73164'),
    token('--success', '#22c571'),
    '#7366ff', '#ff9f43',
  ];
}

/** Static fallback palette (safe during SSR / tests). */
export const CHART_COLORS = ['#2fdf84', '#8944d7', '#009ce7', '#f8d62b', '#f73164', '#22c571', '#7366ff', '#ff9f43'];

export function withAlpha(color, alpha) {
  if (color.startsWith('rgb')) return color.replace(/rgba?\(([^)]+)\)/, (_, inner) => `rgba(${inner.split(',').slice(0, 3).join(',')}, ${alpha})`);
  const value = color.replace('#', '');
  const full = value.length === 3 ? value.split('').map((c) => c + c).join('') : value;
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16));
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/** Shared options — grid, ticks and tooltip all read theme tokens (works in dark mode). */
export function baseOptions({ legend = true, legendPosition = 'bottom', grid = true, stacked = false, radial = false } = {}) {
  const gridColor = token('--border-soft', '#eaeaea');
  const tickColor = token('--text-muted', '#9aa2ab');
  const surface = token('--surface-inverse', '#2c323f');

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { intersect: false, mode: 'index' },
    plugins: {
      legend: {
        display: legend,
        position: legendPosition,
        labels: { usePointStyle: true, boxWidth: 8, font: { size: 11 }, color: tickColor },
      },
      tooltip: {
        backgroundColor: surface,
        padding: 10, cornerRadius: 6,
        titleFont: { size: 12 }, bodyFont: { size: 11 },
      },
    },
  };

  if (radial) {
    options.scales = {
      r: {
        grid: { color: gridColor },
        angleLines: { color: gridColor },
        pointLabels: { color: tickColor, font: { size: 11 } },
        ticks: { display: false, backdropColor: 'transparent' },
      },
    };
    return options;
  }

  if (grid) {
    options.scales = {
      x: { stacked, grid: { display: false }, ticks: { color: tickColor, font: { size: 11 } } },
      y: { stacked, beginAtZero: true, grid: { color: gridColor }, border: { display: false }, ticks: { color: tickColor, font: { size: 11 } } },
    };
  }
  return options;
}

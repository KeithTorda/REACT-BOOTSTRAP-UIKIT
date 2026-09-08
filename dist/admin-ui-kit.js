import { jsx as t, jsxs as d, Fragment as U } from "react/jsx-runtime";
import { useState as x, useEffect as R, useRef as ie, useCallback as te, useMemo as q, useContext as fa, createContext as ga, useId as F } from "react";
import e from "prop-types";
import { useLocation as ya, NavLink as va, Link as dt, Outlet as Be } from "react-router-dom";
import { createPortal as ge } from "react-dom";
import { Line as ut, Bar as mt, Pie as Na, Doughnut as ka, Radar as wa, PolarArea as xa, Bubble as _a, Scatter as Ta } from "react-chartjs-2";
import { Chart as Sa, CategoryScale as Ca, LinearScale as $a, RadialLinearScale as Oa, PointElement as Aa, LineElement as Da, BarElement as za, ArcElement as ja, Filler as La, Tooltip as Ia, Legend as Ma } from "chart.js";
function f(...a) {
  return a.filter(Boolean).join(" ");
}
function Xe(a, n) {
  return a.path && n === a.path ? !0 : (a.children || []).some((i) => i.path && n.startsWith(i.path));
}
function qe({ items: a = [], collapsed: n = !1, horizontal: i = !1, onNavigate: r, className: l }) {
  const s = a.length && a[0].items ? a : [{ section: null, items: a }];
  if (i) {
    const o = s.flatMap((c) => c.items);
    return /* @__PURE__ */ t("nav", { className: f("d-flex align-items-center gap-1", l), children: o.map((c) => /* @__PURE__ */ t(xe, { item: c, horizontal: !0, onNavigate: r }, c.label)) });
  }
  return /* @__PURE__ */ t("nav", { className: l, children: s.map((o, c) => /* @__PURE__ */ d("div", { children: [
    o.section && !n && /* @__PURE__ */ t("div", { className: "uikit-sidebar__section", children: o.section }),
    /* @__PURE__ */ t("ul", { className: "list-unstyled mb-0", children: o.items.map((u) => /* @__PURE__ */ t(xe, { item: u, collapsed: n, onNavigate: r }, u.label)) })
  ] }, o.section || `group-${c}`)) });
}
function xe({ item: a, collapsed: n, horizontal: i, onNavigate: r }) {
  var m;
  const { pathname: l } = ya(), s = !!((m = a.children) != null && m.length), [o, c] = x(() => Xe(a, l));
  return s ? /* @__PURE__ */ d(i ? "div" : "li", { className: i ? "uikit-dropdown" : void 0, children: [
    /* @__PURE__ */ d(
      "button",
      {
        type: "button",
        className: f("uikit-nav-link", Xe(a, l) && "is-active"),
        onClick: () => c((h) => !h),
        "aria-expanded": o,
        title: n ? a.label : void 0,
        children: [
          a.icon && /* @__PURE__ */ t("i", { className: `bi bi-${a.icon}`, "aria-hidden": "true" }),
          /* @__PURE__ */ t("span", { children: a.label }),
          /* @__PURE__ */ t("i", { className: f("bi bi-chevron-right uikit-nav-link__arrow", o && "is-open"), "aria-hidden": "true" })
        ]
      }
    ),
    o && !n && /* @__PURE__ */ t("ul", { className: i ? "uikit-dropdown__menu uikit-dropdown__menu--start list-unstyled mb-0" : "uikit-nav-sub", children: a.children.map((h) => /* @__PURE__ */ t(xe, { item: h, onNavigate: r }, h.label)) })
  ] }) : /* @__PURE__ */ t(i ? "div" : "li", { children: /* @__PURE__ */ d(
    va,
    {
      to: a.path || "#",
      end: a.end ?? !0,
      onClick: r,
      title: n ? a.label : void 0,
      className: ({ isActive: p }) => f("uikit-nav-link", p && "is-active"),
      children: [
        a.icon && /* @__PURE__ */ t("i", { className: `bi bi-${a.icon}`, "aria-hidden": "true" }),
        /* @__PURE__ */ t("span", { children: a.label }),
        a.badge && /* @__PURE__ */ t("span", { className: "ms-auto", children: a.badge })
      ]
    }
  ) });
}
const Pa = e.shape({
  label: e.string,
  icon: e.string,
  path: e.string,
  children: e.array
});
qe.propTypes = {
  items: e.array,
  collapsed: e.bool,
  horizontal: e.bool,
  onNavigate: e.func,
  className: e.string
};
xe.propTypes = {
  item: Pa.isRequired,
  collapsed: e.bool,
  horizontal: e.bool,
  onNavigate: e.func
};
function pt({
  items: a = [],
  brand: n = "Admin Kit",
  brandIcon: i = "grid-1x2-fill",
  brandHref: r = "/",
  collapsed: l = !1,
  onNavigate: s,
  footer: o,
  className: c
}) {
  return /* @__PURE__ */ d("aside", { className: f("uikit-sidebar", c), children: [
    /* @__PURE__ */ t("div", { className: "uikit-sidebar__brand", children: /* @__PURE__ */ d(dt, { to: r, className: "d-flex align-items-center gap-2 text-decoration-none", children: [
      /* @__PURE__ */ t("span", { className: "uikit-sidebar__brand-mark", children: /* @__PURE__ */ t("i", { className: `bi bi-${i}`, "aria-hidden": "true" }) }),
      /* @__PURE__ */ t("span", { className: "uikit-sidebar__brand-text", children: n })
    ] }) }),
    /* @__PURE__ */ t("div", { className: "uikit-sidebar__nav", children: /* @__PURE__ */ t(qe, { items: a, collapsed: l, onNavigate: s }) }),
    o && !l && /* @__PURE__ */ t("div", { className: "p-3 border-top", children: o })
  ] });
}
pt.propTypes = {
  items: e.array,
  brand: e.node,
  brandIcon: e.string,
  brandHref: e.string,
  collapsed: e.bool,
  onNavigate: e.func,
  footer: e.node,
  className: e.string
};
const et = { sm: 30, md: 36, lg: 44 };
function E({
  icon: a,
  variant: n = "light",
  size: i = "md",
  outline: r = !1,
  circle: l = !0,
  label: s,
  className: o,
  ...c
}) {
  const u = et[i] || et.md;
  return /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      "aria-label": s || a,
      title: s,
      className: f(
        "btn d-inline-flex align-items-center justify-content-center p-0",
        r ? `btn-outline-${n}` : `btn-${n}`,
        l ? "rounded-circle" : "rounded",
        o
      ),
      style: { width: u, height: u },
      ...c,
      children: /* @__PURE__ */ t("i", { className: `bi bi-${a}`, "aria-hidden": "true" })
    }
  );
}
E.propTypes = {
  icon: e.string.isRequired,
  variant: e.string,
  size: e.oneOf(["sm", "md", "lg"]),
  outline: e.bool,
  circle: e.bool,
  label: e.string,
  className: e.string
};
function Ve({
  value: a,
  onChange: n,
  placeholder: i = "Search…",
  size: r = "md",
  width: l,
  onClear: s,
  className: o,
  ...c
}) {
  return /* @__PURE__ */ d("div", { className: f("input-group", r !== "md" && `input-group-${r}`, o), style: l ? { width: l } : void 0, children: [
    /* @__PURE__ */ t("span", { className: "input-group-text bg-white border-end-0", children: /* @__PURE__ */ t("i", { className: "bi bi-search text-secondary-soft", "aria-hidden": "true" }) }),
    /* @__PURE__ */ t(
      "input",
      {
        type: "search",
        className: "form-control border-start-0 ps-0",
        value: a,
        placeholder: i,
        onChange: (u) => n == null ? void 0 : n(u.target.value, u),
        "aria-label": i,
        ...c
      }
    ),
    a && s && /* @__PURE__ */ t("button", { type: "button", className: "btn btn-light border", onClick: s, "aria-label": "Clear search", children: /* @__PURE__ */ t("i", { className: "bi bi-x-lg" }) })
  ] });
}
Ve.propTypes = {
  value: e.string,
  onChange: e.func,
  placeholder: e.string,
  size: e.oneOf(["sm", "md", "lg"]),
  width: e.oneOfType([e.string, e.number]),
  onClear: e.func,
  className: e.string
};
function On(a, n = {}) {
  return a == null || a === "" ? "—" : new Intl.NumberFormat("en-US", n).format(Number(a));
}
function be(a, n = "USD", i = "en-US") {
  return a == null || a === "" ? "—" : new Intl.NumberFormat(i, { style: "currency", currency: n }).format(Number(a));
}
function An(a, n = { year: "numeric", month: "short", day: "2-digit" }) {
  if (!a) return "—";
  const i = a instanceof Date ? a : new Date(a);
  return Number.isNaN(i.getTime()) ? String(a) : new Intl.DateTimeFormat("en-US", n).format(i);
}
function Ea(a = "") {
  return String(a).trim().split(/\s+/).slice(0, 2).map((n) => n.charAt(0).toUpperCase()).join("");
}
function Ra(a = "", n = 60) {
  const i = String(a);
  return i.length > n ? `${i.slice(0, n - 1)}…` : i;
}
function G(a, n) {
  if (n)
    return String(n).split(".").reduce((i, r) => i == null ? i : i[r], a);
}
function Y({ name: a = "", src: n, size: i = 40, square: r = !1, status: l, className: s, style: o, ...c }) {
  const u = { width: i, height: i, fontSize: Math.max(11, i * 0.36), ...o }, m = n ? /* @__PURE__ */ t("img", { src: n, alt: a, className: f("uikit-avatar", r && "uikit-avatar--square", s), style: u, ...c }) : /* @__PURE__ */ t("span", { className: f("uikit-avatar", r && "uikit-avatar--square", s), style: u, title: a, ...c, children: Ea(a) || "?" });
  if (!l) return m;
  const p = { online: "var(--success)", busy: "var(--danger)", away: "var(--warning)", offline: "var(--text-muted)" };
  return /* @__PURE__ */ d("span", { className: "position-relative d-inline-flex", children: [
    m,
    /* @__PURE__ */ t(
      "span",
      {
        className: "position-absolute rounded-circle border border-white",
        style: { width: i * 0.28, height: i * 0.28, right: 0, bottom: 0, background: p[l] || p.offline }
      }
    )
  ] });
}
Y.propTypes = {
  name: e.string,
  src: e.string,
  size: e.number,
  square: e.bool,
  status: e.oneOf(["online", "busy", "away", "offline"]),
  className: e.string,
  style: e.object
};
function Ce(a, n, i = !0) {
  R(() => {
    if (!i) return;
    const r = (s) => {
      a.current && !a.current.contains(s.target) && n(s);
    }, l = (s) => {
      s.key === "Escape" && n(s);
    };
    return document.addEventListener("mousedown", r), document.addEventListener("keydown", l), () => {
      document.removeEventListener("mousedown", r), document.removeEventListener("keydown", l);
    };
  }, [a, n, i]);
}
function ae({
  label: a,
  icon: n,
  trigger: i,
  items: r = [],
  align: l = "start",
  variant: s = "light",
  size: o,
  menuWidth: c,
  header: u,
  footer: m,
  className: p,
  children: h
}) {
  const [b, g] = x(!1), k = ie(null);
  return Ce(k, () => g(!1), b), /* @__PURE__ */ d("div", { className: f("uikit-dropdown", p), ref: k, children: [
    i ? /* @__PURE__ */ t("span", { onClick: () => g((N) => !N), className: "cursor-pointer d-inline-flex", children: i }) : /* @__PURE__ */ d(
      "button",
      {
        type: "button",
        className: f("btn d-inline-flex align-items-center gap-2", `btn-${s}`, o && `btn-${o}`),
        onClick: () => g((N) => !N),
        "aria-expanded": b,
        children: [
          n && /* @__PURE__ */ t("i", { className: `bi bi-${n}`, "aria-hidden": "true" }),
          a,
          /* @__PURE__ */ t("i", { className: "bi bi-chevron-down", style: { fontSize: ".7rem" }, "aria-hidden": "true" })
        ]
      }
    ),
    b && /* @__PURE__ */ d(
      "div",
      {
        className: f("uikit-dropdown__menu", `uikit-dropdown__menu--${l}`),
        style: c ? { width: c } : void 0,
        children: [
          u && /* @__PURE__ */ t("div", { className: "uikit-dropdown__header", children: u }),
          h,
          r.map(
            (N, y) => N.divider ? /* @__PURE__ */ t("hr", { className: "my-1" }, `divider-${y}`) : /* @__PURE__ */ d(
              "button",
              {
                type: "button",
                className: f("uikit-dropdown__item", N.danger && "is-danger"),
                onClick: () => {
                  var v;
                  (v = N.onClick) == null || v.call(N, N), g(!1);
                },
                children: [
                  N.icon && /* @__PURE__ */ t("i", { className: `bi bi-${N.icon}`, "aria-hidden": "true" }),
                  /* @__PURE__ */ t("span", { className: "flex-grow-1", children: N.label }),
                  N.badge
                ]
              },
              N.key || N.label
            )
          ),
          m && /* @__PURE__ */ t("div", { className: "border-top pt-2 mt-1 text-center", children: m })
        ]
      }
    )
  ] });
}
ae.propTypes = {
  label: e.node,
  icon: e.string,
  trigger: e.node,
  items: e.arrayOf(e.object),
  align: e.oneOf(["start", "end"]),
  variant: e.string,
  size: e.string,
  menuWidth: e.oneOfType([e.string, e.number]),
  header: e.node,
  footer: e.node,
  className: e.string,
  children: e.node
};
function Pe({
  icon: a = "bell",
  title: n = "Notifications",
  items: i = [],
  footerLabel: r = "View all",
  onFooterClick: l,
  onItemClick: s,
  className: o
}) {
  const c = i.filter((u) => u.unread !== !1).length;
  return /* @__PURE__ */ t(
    ae,
    {
      align: "end",
      menuWidth: 320,
      header: /* @__PURE__ */ d("div", { className: "d-flex justify-content-between align-items-center", children: [
        /* @__PURE__ */ t("span", { children: n }),
        c > 0 && /* @__PURE__ */ t("span", { className: "uikit-badge", style: { background: "var(--primary-soft)", color: "var(--primary-dark)" }, children: c })
      ] }),
      footer: /* @__PURE__ */ t("button", { type: "button", className: "btn btn-link btn-sm p-0", onClick: l, children: r }),
      className: o,
      trigger: /* @__PURE__ */ d("span", { className: "position-relative d-inline-flex btn btn-light rounded-circle align-items-center justify-content-center", style: { width: 36, height: 36 }, children: [
        /* @__PURE__ */ t("i", { className: `bi bi-${a}`, "aria-hidden": "true" }),
        c > 0 && /* @__PURE__ */ t(
          "span",
          {
            className: "position-absolute rounded-circle",
            style: { top: 6, right: 7, width: 8, height: 8, background: "var(--danger)" }
          }
        )
      ] }),
      children: /* @__PURE__ */ t("div", { className: "uikit-scroll-y", style: { maxHeight: 300 }, children: i.map((u, m) => /* @__PURE__ */ d(
        "button",
        {
          type: "button",
          className: "uikit-dropdown__item align-items-start",
          onClick: () => s == null ? void 0 : s(u),
          children: [
            /* @__PURE__ */ t(
              "span",
              {
                className: "uikit-stats__icon",
                style: { width: 32, height: 32, fontSize: 14, background: `var(--${u.variant || "primary"}-soft, var(--surface-muted))`, color: `var(--${u.variant || "primary"})` },
                children: /* @__PURE__ */ t("i", { className: `bi bi-${u.icon || "dot"}`, "aria-hidden": "true" })
              }
            ),
            /* @__PURE__ */ d("span", { className: "flex-grow-1", children: [
              /* @__PURE__ */ t("span", { className: f("d-block", u.unread !== !1 && "fw-semibold"), style: { fontSize: ".8125rem" }, children: u.title }),
              u.description && /* @__PURE__ */ t("span", { className: "d-block text-secondary-soft", style: { fontSize: ".75rem" }, children: u.description }),
              u.time && /* @__PURE__ */ t("span", { className: "d-block uikit-helper mt-0", children: u.time })
            ] })
          ]
        },
        u.id || m
      )) })
    }
  );
}
Pe.propTypes = {
  icon: e.string,
  title: e.string,
  items: e.arrayOf(e.object),
  footerLabel: e.string,
  onFooterClick: e.func,
  onItemClick: e.func,
  className: e.string
};
const pe = {
  green: { label: "Green", primary: "#2fdf84", primaryDark: "#22c571", secondary: "#8944d7", onPrimary: "#0b3b23" },
  blue: { label: "Blue", primary: "#3b82f6", primaryDark: "#2563eb", secondary: "#8944d7", onPrimary: "#ffffff" },
  violet: { label: "Violet", primary: "#8944d7", primaryDark: "#7429c4", secondary: "#2fdf84", onPrimary: "#ffffff" },
  indigo: { label: "Indigo", primary: "#6366f1", primaryDark: "#4f46e5", secondary: "#06b6d4", onPrimary: "#ffffff" },
  orange: { label: "Orange", primary: "#f97316", primaryDark: "#ea580c", secondary: "#0ea5e9", onPrimary: "#ffffff" },
  rose: { label: "Rose", primary: "#f43f5e", primaryDark: "#e11d48", secondary: "#8944d7", onPrimary: "#ffffff" },
  teal: { label: "Teal", primary: "#14b8a6", primaryDark: "#0d9488", secondary: "#f59e0b", onPrimary: "#04312c" },
  slate: { label: "Slate", primary: "#475569", primaryDark: "#334155", secondary: "#0ea5e9", onPrimary: "#ffffff" }
}, Fa = ["light", "dark", "floating", "gradient", "transparent"], Ba = ["light", "dark", "transparent"], qa = ["sidebar", "horizontal", "boxed", "rail", "stacked"], Va = ["comfortable", "compact"], Ee = { sharp: "4px", default: "10px", rounded: "16px" }, Wa = ["light", "dark", "system"], fe = {
  mode: "light",
  color: "green",
  sidebarStyle: "light",
  navbarStyle: "light",
  layout: "sidebar",
  density: "comfortable",
  radius: "default",
  rtl: !1,
  contentWidth: "fluid"
};
function tt(a) {
  const n = a.replace("#", ""), i = n.length === 3 ? n.split("").map((r) => r + r).join("") : n;
  return [0, 2, 4].map((r) => parseInt(i.slice(r, r + 2), 16)).join(", ");
}
const ht = "admin-ui-kit:settings", bt = ga(null);
function Ka() {
  try {
    return { ...fe, ...JSON.parse(localStorage.getItem(ht) || "{}") };
  } catch {
    return { ...fe };
  }
}
function Ha(a, n) {
  if (typeof document > "u") return;
  const i = document.documentElement, r = pe[a.color] || pe.green;
  i.dataset.theme = n, i.setAttribute("data-bs-theme", n), i.dataset.density = a.density, i.dataset.sidebar = a.sidebarStyle, i.dataset.navbar = a.navbarStyle, i.dataset.layout = a.layout, i.dataset.width = a.contentWidth, i.dir = a.rtl ? "rtl" : "ltr", i.style.setProperty("--primary", r.primary), i.style.setProperty("--primary-dark", r.primaryDark), i.style.setProperty("--primary-rgb", tt(r.primary)), i.style.setProperty("--on-primary", r.onPrimary), i.style.setProperty("--secondary", r.secondary), i.style.setProperty("--secondary-rgb", tt(r.secondary)), i.style.setProperty("--border-radius", Ee[a.radius] || Ee.default);
}
function Ua({ defaultSettings: a, persist: n = !0, children: i }) {
  const [r, l] = x(
    () => n ? { ...Ka(), ...a } : { ...fe, ...a }
  ), s = te((m) => l((p) => ({ ...p, ...m })), []), o = te(() => l({ ...fe, ...a }), [a]), c = q(() => r.mode !== "system" ? r.mode : typeof window > "u" ? "light" : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light", [r.mode]);
  R(() => {
    if (n)
      try {
        localStorage.setItem(ht, JSON.stringify(r));
      } catch {
      }
  }, [r, n]), Ha(r, c), R(() => {
    if (r.mode !== "system" || typeof window > "u") return;
    const m = window.matchMedia("(prefers-color-scheme: dark)"), p = () => s({ mode: "system" });
    return m.addEventListener("change", p), () => m.removeEventListener("change", p);
  }, [r.mode, s]);
  const u = q(
    () => ({
      settings: r,
      set: s,
      reset: o,
      resolvedMode: c,
      isDark: c === "dark",
      toggleMode: () => s({ mode: c === "dark" ? "light" : "dark" }),
      palette: pe[r.color] || pe.green
    }),
    [r, s, o, c]
  );
  return /* @__PURE__ */ t(bt.Provider, { value: u, children: i });
}
function We() {
  const a = fa(bt);
  return a || {
    settings: fe,
    set: () => {
    },
    reset: () => {
    },
    resolvedMode: "light",
    isDark: !1,
    toggleMode: () => {
    },
    palette: pe.green
  };
}
Ua.propTypes = {
  defaultSettings: e.object,
  persist: e.bool,
  children: e.node
};
function ft({ size: a = "md", variant: n = "light" }) {
  const { isDark: i, toggleMode: r } = We();
  return /* @__PURE__ */ t(
    E,
    {
      icon: i ? "sun" : "moon-stars",
      size: a,
      variant: n,
      label: i ? "Switch to light mode" : "Switch to dark mode",
      onClick: r
    }
  );
}
ft.propTypes = { size: e.string, variant: e.string };
function $e({
  onToggleSidebar: a,
  search: n,
  onSearch: i,
  searchPlaceholder: r = "Search…",
  notifications: l = [],
  messages: s = [],
  user: o,
  userMenu: c = [],
  actions: u,
  brand: m,
  brandIcon: p = "grid-1x2-fill",
  showThemeToggle: h = !0,
  className: b
}) {
  return /* @__PURE__ */ d("header", { className: f("uikit-navbar", b), children: [
    /* @__PURE__ */ t(E, { icon: "list", variant: "light", label: "Toggle navigation", onClick: a }),
    m && /* @__PURE__ */ d("span", { className: "d-flex align-items-center gap-2 me-2", children: [
      /* @__PURE__ */ t("span", { className: "uikit-sidebar__brand-mark", style: { width: 30, height: 30, fontSize: 15 }, children: /* @__PURE__ */ t("i", { className: `bi bi-${p}`, "aria-hidden": "true" }) }),
      /* @__PURE__ */ t("span", { className: "fw-semibold d-none d-sm-block", children: m })
    ] }),
    i && /* @__PURE__ */ t("div", { className: "d-none d-md-block", children: /* @__PURE__ */ t(Ve, { value: n, onChange: i, placeholder: r, size: "sm", width: 280 }) }),
    /* @__PURE__ */ d("div", { className: "ms-auto d-flex align-items-center gap-2", children: [
      u,
      h && /* @__PURE__ */ t(ft, {}),
      s.length > 0 && /* @__PURE__ */ t(Pe, { icon: "envelope", title: "Messages", items: s }),
      l.length > 0 && /* @__PURE__ */ t(Pe, { icon: "bell", title: "Notifications", items: l }),
      o && /* @__PURE__ */ t(
        ae,
        {
          align: "end",
          items: c,
          header: /* @__PURE__ */ d("div", { children: [
            /* @__PURE__ */ t("div", { className: "fw-semibold text-body", children: o.name }),
            /* @__PURE__ */ t("div", { className: "text-secondary-soft text-lowercase", style: { fontSize: ".75rem" }, children: o.email })
          ] }),
          trigger: /* @__PURE__ */ d("span", { className: "d-flex align-items-center gap-2 cursor-pointer", children: [
            /* @__PURE__ */ t(Y, { name: o.name, src: o.avatar, size: 34 }),
            /* @__PURE__ */ d("span", { className: "d-none d-lg-block text-start", children: [
              /* @__PURE__ */ t("span", { className: "d-block fw-semibold", style: { fontSize: ".8125rem" }, children: o.name }),
              /* @__PURE__ */ t("span", { className: "d-block uikit-helper mt-0", children: o.role })
            ] }),
            /* @__PURE__ */ t("i", { className: "bi bi-chevron-down text-secondary-soft", style: { fontSize: ".7rem" } })
          ] })
        }
      )
    ] })
  ] });
}
$e.propTypes = {
  onToggleSidebar: e.func,
  search: e.string,
  onSearch: e.func,
  searchPlaceholder: e.string,
  notifications: e.array,
  messages: e.array,
  user: e.object,
  userMenu: e.array,
  actions: e.node,
  brand: e.node,
  brandIcon: e.string,
  showThemeToggle: e.bool,
  className: e.string
};
function Ya(a) {
  return /* @__PURE__ */ t($e, { ...a });
}
Ya.propTypes = $e.propTypes;
function gt({ brand: a = "Admin UI Kit", version: n, links: i = [], className: r }) {
  const l = (/* @__PURE__ */ new Date()).getFullYear();
  return /* @__PURE__ */ d("footer", { className: f("uikit-footer", r), children: [
    /* @__PURE__ */ d("span", { children: [
      "© ",
      l,
      " ",
      a,
      n ? ` · v${n}` : ""
    ] }),
    i.length > 0 && /* @__PURE__ */ t("nav", { className: "d-flex gap-3", children: i.map((s) => /* @__PURE__ */ t("a", { href: s.href || "#", className: "text-secondary-soft", children: s.label }, s.label)) })
  ] });
}
gt.propTypes = {
  brand: e.string,
  version: e.string,
  links: e.array,
  className: e.string
};
function yt({ items: a = [], className: n }) {
  return a.length ? /* @__PURE__ */ t("nav", { "aria-label": "Breadcrumb", children: /* @__PURE__ */ t("ol", { className: f("breadcrumb uikit-breadcrumb", n), children: a.map((i, r) => {
    const l = r === a.length - 1;
    return /* @__PURE__ */ t("li", { className: f("breadcrumb-item", l && "active"), "aria-current": l ? "page" : void 0, children: l || !i.path ? i.label : /* @__PURE__ */ t(dt, { to: i.path, children: i.label }) }, i.label);
  }) }) }) : null;
}
yt.propTypes = {
  items: e.arrayOf(e.object),
  className: e.string
};
function vt({ title: a, subtitle: n, breadcrumb: i = [], actions: r, className: l }) {
  return /* @__PURE__ */ t("div", { className: f("uikit-page-header", l), children: /* @__PURE__ */ d("div", { className: "d-flex flex-wrap align-items-center justify-content-between gap-3", children: [
    /* @__PURE__ */ d("div", { children: [
      /* @__PURE__ */ t("h1", { className: "uikit-page-header__title", children: a }),
      n && /* @__PURE__ */ t("p", { className: "uikit-page-header__subtitle", children: n }),
      i.length > 0 && /* @__PURE__ */ t("div", { className: "mt-2 ms-3", children: /* @__PURE__ */ t(yt, { items: i }) })
    ] }),
    r && /* @__PURE__ */ t("div", { className: "d-flex flex-wrap gap-2", children: r })
  ] }) });
}
vt.propTypes = {
  title: e.node,
  subtitle: e.node,
  breadcrumb: e.array,
  actions: e.node,
  className: e.string
};
function Ja({ title: a, subtitle: n, breadcrumb: i, actions: r, fluid: l = !0, className: s, children: o }) {
  return /* @__PURE__ */ t("div", { className: f("uikit-content", s), children: /* @__PURE__ */ d("div", { className: l ? "container-fluid px-0" : "container", children: [
    a && /* @__PURE__ */ t(vt, { title: a, subtitle: n, breadcrumb: i, actions: r }),
    o
  ] }) });
}
Ja.propTypes = {
  title: e.node,
  subtitle: e.node,
  breadcrumb: e.array,
  actions: e.node,
  fluid: e.bool,
  className: e.string,
  children: e.node
};
const Ga = { start: "width", end: "width", top: "height", bottom: "height" };
function Nt({
  open: a,
  onClose: n,
  placement: i = "end",
  title: r,
  size: l = 320,
  footer: s,
  backdrop: o = !0,
  closeOnBackdrop: c = !0,
  className: u,
  children: m
}) {
  if (R(() => {
    if (!a) return;
    const h = (b) => b.key === "Escape" && (n == null ? void 0 : n());
    return document.addEventListener("keydown", h), document.body.style.overflow = "hidden", () => {
      document.removeEventListener("keydown", h), document.body.style.overflow = "";
    };
  }, [a, n]), !a) return null;
  const p = Ga[i] || "width";
  return ge(
    /* @__PURE__ */ d(U, { children: [
      o && /* @__PURE__ */ t("div", { className: "uikit-backdrop", onClick: c ? n : void 0 }),
      /* @__PURE__ */ d(
        "aside",
        {
          className: f("uikit-drawer", `uikit-drawer--${i}`, u),
          style: { [p]: typeof l == "number" ? `${l}px` : l },
          role: "dialog",
          "aria-modal": "true",
          children: [
            (r || n) && /* @__PURE__ */ d("div", { className: "uikit-card__header", children: [
              /* @__PURE__ */ t("h5", { className: "uikit-card__title", children: r }),
              n && /* @__PURE__ */ t("button", { type: "button", className: "btn-close", "aria-label": "Close", onClick: n })
            ] }),
            /* @__PURE__ */ t("div", { className: "uikit-drawer__body", children: m }),
            s && /* @__PURE__ */ t("div", { className: "uikit-card__footer d-flex gap-2 justify-content-end", children: s })
          ]
        }
      )
    ] }),
    document.body
  );
}
Nt.propTypes = {
  open: e.bool,
  onClose: e.func,
  placement: e.oneOf(["start", "end", "top", "bottom"]),
  title: e.node,
  size: e.oneOfType([e.string, e.number]),
  footer: e.node,
  backdrop: e.bool,
  closeOnBackdrop: e.bool,
  className: e.string,
  children: e.node
};
function kt({
  id: a,
  label: n,
  description: i,
  checked: r,
  onChange: l,
  disabled: s = !1,
  reverse: o = !1,
  size: c = "md",
  className: u,
  ...m
}) {
  const p = F(), h = a || `switch-${p}`;
  return /* @__PURE__ */ d("div", { className: f("form-check form-switch", o && "form-check-reverse", u), children: [
    /* @__PURE__ */ t(
      "input",
      {
        id: h,
        type: "checkbox",
        role: "switch",
        className: "form-check-input",
        style: c === "lg" ? { width: "3em", height: "1.5em" } : void 0,
        checked: r,
        onChange: l,
        disabled: s,
        ...m
      }
    ),
    n && /* @__PURE__ */ d("label", { className: "form-check-label", htmlFor: h, children: [
      n,
      i && /* @__PURE__ */ t("div", { className: "uikit-helper mt-0", children: i })
    ] })
  ] });
}
kt.propTypes = {
  id: e.string,
  label: e.node,
  description: e.node,
  checked: e.bool,
  onChange: e.func,
  disabled: e.bool,
  reverse: e.bool,
  size: e.oneOf(["md", "lg"]),
  className: e.string
};
const Za = { xs: "btn-xs", sm: "btn-sm", md: "", lg: "btn-lg", xl: "btn-xl" };
function A({
  variant: a = "primary",
  tone: n = "solid",
  size: i = "md",
  shape: r = "default",
  icon: l,
  iconPosition: s = "start",
  outline: o = !1,
  block: c = !1,
  rounded: u = !1,
  loading: m = !1,
  disabled: p = !1,
  active: h = !1,
  type: b = "button",
  className: g,
  style: k,
  children: N,
  ...y
}) {
  const v = o ? "outline" : n, w = {
    solid: `btn-${a}`,
    outline: `btn-outline-${a}`,
    ghost: "uikit-btn--ghost",
    soft: "uikit-btn--soft",
    link: "btn-link",
    gradient: "uikit-btn--gradient"
  }[v], T = v === "soft" ? { background: `var(--${a}-soft, var(--surface-muted))`, color: `var(--${a})` } : v === "ghost" ? { color: `var(--${a})` } : void 0, C = m ? /* @__PURE__ */ t("span", { className: "spinner-border spinner-border-sm", role: "status", "aria-hidden": "true" }) : l ? /* @__PURE__ */ t("i", { className: `bi bi-${l}`, "aria-hidden": "true" }) : null;
  return /* @__PURE__ */ d(
    "button",
    {
      type: b,
      disabled: p || m,
      "aria-pressed": h || void 0,
      className: f(
        "btn d-inline-flex align-items-center justify-content-center gap-2",
        w,
        Za[i],
        (r === "pill" || u) && "rounded-pill",
        r === "square" && "uikit-btn--square",
        c && "w-100",
        h && "active",
        g
      ),
      style: { ...T, ...k },
      ...y,
      children: [
        s === "start" && C,
        N && /* @__PURE__ */ t("span", { children: N }),
        s === "end" && C
      ]
    }
  );
}
A.TONES = ["solid", "outline", "soft", "ghost", "link", "gradient"];
A.SIZES = ["xs", "sm", "md", "lg", "xl"];
A.SHAPES = ["default", "pill", "square"];
A.propTypes = {
  variant: e.string,
  tone: e.oneOf(["solid", "outline", "soft", "ghost", "link", "gradient"]),
  size: e.oneOf(["xs", "sm", "md", "lg", "xl"]),
  shape: e.oneOf(["default", "pill", "square"]),
  icon: e.string,
  iconPosition: e.oneOf(["start", "end"]),
  outline: e.bool,
  block: e.bool,
  rounded: e.bool,
  loading: e.bool,
  disabled: e.bool,
  active: e.bool,
  type: e.string,
  className: e.string,
  style: e.object,
  children: e.node
};
function ee({ label: a, options: n, value: i, onChange: r }) {
  return /* @__PURE__ */ d("div", { className: "mb-3", children: [
    /* @__PURE__ */ t("div", { className: "form-label", children: a }),
    /* @__PURE__ */ t("div", { className: "uikit-option-grid", children: n.map((l) => /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        className: f("uikit-option", i === l && "is-active"),
        onClick: () => r(l),
        children: l
      },
      l
    )) })
  ] });
}
ee.propTypes = {
  label: e.string,
  options: e.array,
  value: e.string,
  onChange: e.func
};
function wt({ defaultOpen: a = !1 }) {
  const [n, i] = x(a), { settings: r, set: l, reset: s } = We();
  return /* @__PURE__ */ d(U, { children: [
    /* @__PURE__ */ t("button", { type: "button", className: "uikit-customizer-toggle", onClick: () => i(!0), "aria-label": "Theme settings", children: /* @__PURE__ */ t("i", { className: "bi bi-sliders" }) }),
    /* @__PURE__ */ d(
      Nt,
      {
        open: n,
        onClose: () => i(!1),
        placement: "end",
        size: 320,
        title: "Theme settings",
        footer: /* @__PURE__ */ t(A, { variant: "light", size: "sm", icon: "arrow-counterclockwise", onClick: s, children: "Reset" }),
        children: [
          /* @__PURE__ */ t(ee, { label: "Mode", options: Wa, value: r.mode, onChange: (o) => l({ mode: o }) }),
          /* @__PURE__ */ d("div", { className: "mb-3", children: [
            /* @__PURE__ */ t("div", { className: "form-label", children: "Colour" }),
            /* @__PURE__ */ t("div", { className: "row g-2", children: Object.entries(pe).map(([o, c]) => /* @__PURE__ */ t("div", { className: "col-3", children: /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                title: c.label,
                "aria-label": c.label,
                className: f("uikit-swatch", r.color === o && "is-active"),
                style: { background: c.primary },
                onClick: () => l({ color: o })
              }
            ) }, o)) })
          ] }),
          /* @__PURE__ */ t(ee, { label: "Layout", options: qa, value: r.layout, onChange: (o) => l({ layout: o }) }),
          /* @__PURE__ */ t(ee, { label: "Sidebar", options: Fa, value: r.sidebarStyle, onChange: (o) => l({ sidebarStyle: o }) }),
          /* @__PURE__ */ t(ee, { label: "Navbar", options: Ba, value: r.navbarStyle, onChange: (o) => l({ navbarStyle: o }) }),
          /* @__PURE__ */ t(ee, { label: "Density", options: Va, value: r.density, onChange: (o) => l({ density: o }) }),
          /* @__PURE__ */ t(ee, { label: "Radius", options: Object.keys(Ee), value: r.radius, onChange: (o) => l({ radius: o }) }),
          /* @__PURE__ */ t(ee, { label: "Content width", options: ["fluid", "boxed"], value: r.contentWidth, onChange: (o) => l({ contentWidth: o }) }),
          /* @__PURE__ */ t("hr", {}),
          /* @__PURE__ */ t(kt, { label: "Right-to-left (RTL)", checked: r.rtl, onChange: (o) => l({ rtl: o.target.checked }) })
        ]
      }
    )
  ] });
}
wt.propTypes = { defaultOpen: e.bool };
function M({
  title: a,
  subtitle: n,
  icon: i,
  actions: r,
  footer: l,
  variant: s = "bordered",
  accentColor: o,
  image: c,
  imageHeight: u = 160,
  imageAlt: m = "",
  ribbon: p,
  ribbonVariant: h = "primary",
  padded: b = !0,
  hoverable: g = !1,
  flush: k = !1,
  bodyClassName: N,
  className: y,
  style: v,
  children: w,
  ...T
}) {
  const C = !!(a || n || r), z = {
    bordered: "",
    elevated: "uikit-card--elevated",
    flat: "uikit-card--flat",
    filled: "uikit-card--filled",
    gradient: "uikit-card--gradient",
    accent: "uikit-card--accent",
    glass: "uikit-card--glass",
    overlay: "uikit-card--overlay"
  }[s];
  return /* @__PURE__ */ d(
    "div",
    {
      className: f(
        "uikit-card",
        z,
        g && "uikit-card--hoverable",
        k && "uikit-card--flush",
        p && "position-relative",
        y
      ),
      style: { ...o ? { "--accent-color": o } : null, ...v },
      ...T,
      children: [
        p && /* @__PURE__ */ t("span", { className: "uikit-ribbon", style: { background: `var(--${h})` }, children: p }),
        c && /* @__PURE__ */ t("img", { src: c, alt: m, className: "uikit-card__media", style: { height: u, borderRadius: "var(--border-radius) var(--border-radius) 0 0" } }),
        C && /* @__PURE__ */ d("div", { className: "uikit-card__header", children: [
          /* @__PURE__ */ d("div", { className: "d-flex align-items-center gap-2", children: [
            i && /* @__PURE__ */ t("i", { className: `bi bi-${i} text-secondary-soft`, "aria-hidden": "true" }),
            /* @__PURE__ */ d("div", { children: [
              a && /* @__PURE__ */ t("h5", { className: "uikit-card__title", children: a }),
              n && /* @__PURE__ */ t("p", { className: "uikit-card__subtitle", children: n })
            ] })
          ] }),
          r && /* @__PURE__ */ t("div", { className: "d-flex align-items-center gap-2", children: r })
        ] }),
        /* @__PURE__ */ t("div", { className: f(b ? "uikit-card__body" : "", N), children: w }),
        l && /* @__PURE__ */ t("div", { className: "uikit-card__footer", children: l })
      ]
    }
  );
}
M.VARIANTS = ["bordered", "elevated", "flat", "filled", "gradient", "accent", "glass", "overlay"];
M.propTypes = {
  title: e.node,
  subtitle: e.node,
  icon: e.string,
  actions: e.node,
  footer: e.node,
  variant: e.oneOf(["bordered", "elevated", "flat", "filled", "gradient", "accent", "glass", "overlay"]),
  accentColor: e.string,
  image: e.string,
  imageHeight: e.oneOfType([e.string, e.number]),
  imageAlt: e.string,
  ribbon: e.node,
  ribbonVariant: e.string,
  padded: e.bool,
  hoverable: e.bool,
  flush: e.bool,
  bodyClassName: e.string,
  className: e.string,
  style: e.object,
  children: e.node
};
function xt({ value: a = 0, max: n = 100, variant: i = "primary", size: r = "md", label: l, showLabel: s = !1, striped: o = !1, className: c }) {
  const u = Math.min(100, Math.max(0, Number(a) / Number(n) * 100));
  return /* @__PURE__ */ d("div", { className: c, children: [
    (l || s) && /* @__PURE__ */ d("div", { className: "d-flex justify-content-between mb-1", style: { fontSize: ".75rem" }, children: [
      /* @__PURE__ */ t("span", { className: "text-secondary-soft", children: l }),
      s && /* @__PURE__ */ d("span", { className: "fw-semibold", children: [
        Math.round(u),
        "%"
      ] })
    ] }),
    /* @__PURE__ */ t(
      "div",
      {
        className: f("uikit-progress", r !== "md" && `uikit-progress--${r}`),
        role: "progressbar",
        "aria-valuenow": u,
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        children: /* @__PURE__ */ t(
          "div",
          {
            className: f("uikit-progress__bar", o && "progress-bar-striped progress-bar-animated"),
            style: { width: `${u}%`, background: `var(--${i})` }
          }
        )
      }
    )
  ] });
}
xt.propTypes = {
  value: e.number,
  max: e.number,
  variant: e.string,
  size: e.oneOf(["sm", "md", "lg"]),
  label: e.node,
  showLabel: e.bool,
  striped: e.bool,
  className: e.string
};
function _t({
  value: a = 0,
  max: n = 100,
  size: i = 96,
  thickness: r = 8,
  variant: l = "primary",
  label: s,
  showValue: o = !0,
  className: c
}) {
  const u = Math.min(100, Math.max(0, Number(a) / Number(n) * 100)), m = (i - r) / 2, p = 2 * Math.PI * m;
  return /* @__PURE__ */ d("div", { className: c, style: { width: i, position: "relative" }, children: [
    /* @__PURE__ */ d("svg", { width: i, height: i, className: "uikit-ring", children: [
      /* @__PURE__ */ t("circle", { className: "uikit-ring__track", cx: i / 2, cy: i / 2, r: m, fill: "none", strokeWidth: r }),
      /* @__PURE__ */ t(
        "circle",
        {
          className: "uikit-ring__value",
          cx: i / 2,
          cy: i / 2,
          r: m,
          fill: "none",
          strokeWidth: r,
          stroke: `var(--${l})`,
          strokeDasharray: p,
          strokeDashoffset: p - u / 100 * p
        }
      )
    ] }),
    /* @__PURE__ */ d("div", { className: "position-absolute top-50 start-50 translate-middle text-center", style: { pointerEvents: "none" }, children: [
      o && /* @__PURE__ */ d("div", { className: "fw-semibold", style: { fontSize: i / 5 }, children: [
        Math.round(u),
        "%"
      ] }),
      s && /* @__PURE__ */ t("div", { className: "uikit-helper mt-0", children: s })
    ] })
  ] });
}
_t.propTypes = {
  value: e.number,
  max: e.number,
  size: e.number,
  thickness: e.number,
  variant: e.string,
  label: e.node,
  showValue: e.bool,
  className: e.string
};
function Re({
  label: a,
  value: n,
  icon: i,
  variant: r = "primary",
  layout: l = "icon-left",
  trend: s,
  progress: o,
  progressLabel: c,
  spark: u,
  secondary: m,
  footer: p,
  onClick: h,
  className: b,
  children: g
}) {
  const k = (s == null ? void 0 : s.direction) !== "down", N = l === "gradient", y = i && /* @__PURE__ */ t(
    "span",
    {
      className: "uikit-stats__icon",
      style: { background: `var(--${r}-soft, var(--surface-muted))`, color: `var(--${r})` },
      children: /* @__PURE__ */ t("i", { className: `bi bi-${i}`, "aria-hidden": "true" })
    }
  ), v = /* @__PURE__ */ d("div", { className: "flex-grow-1", children: [
    /* @__PURE__ */ t("p", { className: "uikit-stats__label", children: a }),
    /* @__PURE__ */ t("h3", { className: "uikit-stats__value", children: n }),
    s && /* @__PURE__ */ d("div", { className: "d-flex align-items-center gap-1 mt-1", style: { fontSize: ".75rem" }, children: [
      /* @__PURE__ */ t(
        "i",
        {
          className: `bi bi-arrow-${k ? "up" : "down"}-right`,
          style: { color: N ? "#fff" : k ? "var(--success)" : "var(--danger)" },
          "aria-hidden": "true"
        }
      ),
      /* @__PURE__ */ t("span", { style: { color: N ? "#fff" : k ? "var(--success)" : "var(--danger)", fontWeight: 600 }, children: s.value }),
      s.label && /* @__PURE__ */ t("span", { className: N ? "text-white-50" : "text-secondary-soft", children: s.label })
    ] })
  ] });
  return /* @__PURE__ */ d(
    M,
    {
      hoverable: !!h,
      onClick: h,
      footer: p,
      className: f(
        l === "icon-top" && "uikit-stats--icon-top",
        l === "big" && "uikit-stats--big",
        N && "uikit-stats--gradient",
        h && "cursor-pointer",
        b
      ),
      children: [
        l === "split" ? /* @__PURE__ */ d("div", { className: "uikit-stats__split", children: [
          /* @__PURE__ */ t("div", { children: v }),
          /* @__PURE__ */ t("div", { className: "uikit-stats__split-divider" }),
          /* @__PURE__ */ d("div", { className: "text-center", children: [
            /* @__PURE__ */ t("p", { className: "uikit-stats__label", children: m == null ? void 0 : m.label }),
            /* @__PURE__ */ t("h3", { className: "uikit-stats__value", children: m == null ? void 0 : m.value })
          ] })
        ] }) : l === "ring" ? /* @__PURE__ */ d("div", { className: "d-flex align-items-center gap-3", children: [
          /* @__PURE__ */ t(_t, { value: o ?? 0, variant: r, size: 72, thickness: 7 }),
          v
        ] }) : l === "icon-right" ? /* @__PURE__ */ d("div", { className: "d-flex align-items-center gap-3", children: [
          v,
          y
        ] }) : l === "icon-top" ? /* @__PURE__ */ d("div", { children: [
          y,
          v
        ] }) : /* @__PURE__ */ d("div", { className: "d-flex align-items-center gap-3", children: [
          y,
          v
        ] }),
        l === "progress" && /* @__PURE__ */ t(xt, { className: "mt-3", value: o ?? 0, variant: r, label: c, showLabel: !0, size: "sm" }),
        l === "spark" && u && /* @__PURE__ */ t("div", { className: "uikit-stats__spark", children: u }),
        g
      ]
    }
  );
}
Re.LAYOUTS = ["icon-left", "icon-right", "icon-top", "big", "gradient", "progress", "ring", "spark", "split"];
Re.propTypes = {
  label: e.node,
  value: e.node,
  icon: e.string,
  variant: e.string,
  layout: e.oneOf(Re.LAYOUTS),
  trend: e.shape({ value: e.node, direction: e.oneOf(["up", "down"]), label: e.node }),
  progress: e.number,
  progressLabel: e.node,
  spark: e.node,
  secondary: e.object,
  footer: e.node,
  onClick: e.func,
  className: e.string,
  children: e.node
};
function Tt({ items: a = [], labelWidth: n = "40%", className: i }) {
  return /* @__PURE__ */ t("dl", { className: f("uikit-detail-list", i), children: a.map((r) => /* @__PURE__ */ d("div", { className: "uikit-detail-list__row", children: [
    /* @__PURE__ */ d("dt", { className: "uikit-detail-list__label", style: { flexBasis: n }, children: [
      r.icon && /* @__PURE__ */ t("i", { className: `bi bi-${r.icon} me-2`, "aria-hidden": "true" }),
      r.label
    ] }),
    /* @__PURE__ */ t("dd", { className: "uikit-detail-list__value mb-0", children: r.value ?? "—" })
  ] }, r.label)) });
}
Tt.propTypes = {
  items: e.arrayOf(e.object),
  labelWidth: e.string,
  className: e.string
};
function Qa({ title: a, subtitle: n, icon: i, items: r = [], actions: l, footer: s, className: o, children: c }) {
  return /* @__PURE__ */ d(M, { title: a, subtitle: n, icon: i, actions: l, footer: s, className: o, children: [
    r.length > 0 && /* @__PURE__ */ t(Tt, { items: r }),
    c
  ] });
}
Qa.propTypes = {
  title: e.node,
  subtitle: e.node,
  icon: e.string,
  items: e.array,
  actions: e.node,
  footer: e.node,
  className: e.string,
  children: e.node
};
function oe({
  variant: a = "primary",
  tone: n = "soft",
  shape: i = "pill",
  icon: r,
  dot: l = !1,
  counter: s = !1,
  className: o,
  style: c,
  children: u
}) {
  const m = {
    solid: { background: `var(--${a})`, color: a === "primary" ? "var(--on-primary)" : a === "warning" ? "#4a3c00" : "#fff" },
    soft: { background: `var(--${a}-soft, var(--surface-muted))`, color: `var(--${a})` },
    outline: { color: `var(--${a})` }
  }[n];
  return /* @__PURE__ */ d(
    "span",
    {
      className: f(
        "uikit-badge",
        n === "outline" && "uikit-badge--outline",
        i === "square" && "uikit-badge--square",
        s && "uikit-badge--counter",
        o
      ),
      style: { ...m, ...c },
      children: [
        l && /* @__PURE__ */ t("span", { className: "uikit-status-dot", style: { background: "currentColor" } }),
        r && /* @__PURE__ */ t("i", { className: `bi bi-${r}`, "aria-hidden": "true" }),
        u
      ]
    }
  );
}
oe.TONES = ["solid", "soft", "outline"];
oe.propTypes = {
  variant: e.string,
  tone: e.oneOf(["solid", "soft", "outline"]),
  shape: e.oneOf(["pill", "square"]),
  icon: e.string,
  dot: e.bool,
  counter: e.bool,
  className: e.string,
  style: e.object,
  children: e.node
};
function Xa({
  name: a,
  role: n,
  description: i,
  avatar: r,
  status: l,
  statusVariant: s = "success",
  stats: o = [],
  actions: c,
  meta: u = [],
  cover: m = !0,
  className: p
}) {
  return /* @__PURE__ */ d(M, { padded: !1, className: f("overflow-hidden", p), children: [
    m && /* @__PURE__ */ t("div", { className: "uikit-profile-cover" }),
    /* @__PURE__ */ d("div", { className: "uikit-card__body text-center", style: { marginTop: m ? -46 : 0 }, children: [
      /* @__PURE__ */ t(Y, { name: a, src: r, size: 80, className: "mb-2" }),
      /* @__PURE__ */ t("h5", { className: "mb-0", children: a }),
      n && /* @__PURE__ */ t("p", { className: "text-secondary-soft small mb-2", children: n }),
      l && /* @__PURE__ */ t(oe, { variant: s, dot: !0, children: l }),
      i && /* @__PURE__ */ t("p", { className: "text-secondary-soft small mt-3 mb-0", children: i }),
      u.length > 0 && /* @__PURE__ */ t("ul", { className: "list-unstyled text-start mt-3 mb-0 small", children: u.map((h) => /* @__PURE__ */ d("li", { className: "d-flex align-items-center gap-2 py-1 text-secondary-soft", children: [
        h.icon && /* @__PURE__ */ t("i", { className: `bi bi-${h.icon}`, "aria-hidden": "true" }),
        /* @__PURE__ */ t("span", { children: h.value })
      ] }, h.label)) }),
      o.length > 0 && /* @__PURE__ */ t("div", { className: "row g-0 text-center border-top mt-3 pt-3", children: o.map((h) => /* @__PURE__ */ d("div", { className: "col", children: [
        /* @__PURE__ */ t("div", { className: "fw-semibold", children: h.value }),
        /* @__PURE__ */ t("div", { className: "uikit-helper mt-0", children: h.label })
      ] }, h.label)) }),
      c && /* @__PURE__ */ t("div", { className: "d-flex justify-content-center gap-2 mt-3", children: c })
    ] })
  ] });
}
Xa.propTypes = {
  name: e.string,
  role: e.node,
  description: e.node,
  avatar: e.string,
  status: e.node,
  statusVariant: e.string,
  stats: e.array,
  actions: e.node,
  meta: e.array,
  cover: e.bool,
  className: e.string
};
function ei({ title: a, subtitle: n, toolbar: i, height: r = 280, legend: l, footer: s, className: o, children: c }) {
  return /* @__PURE__ */ d(M, { title: a, subtitle: n, actions: i, footer: s, className: o, children: [
    /* @__PURE__ */ t("div", { style: { height: r }, children: c }),
    l && /* @__PURE__ */ t("div", { className: "d-flex flex-wrap gap-3 justify-content-center mt-3 small", children: l })
  ] });
}
ei.propTypes = {
  title: e.node,
  subtitle: e.node,
  toolbar: e.node,
  height: e.oneOfType([e.string, e.number]),
  legend: e.node,
  footer: e.node,
  className: e.string,
  children: e.node
};
function ti({
  icon: a = "lightning-charge",
  title: n,
  description: i,
  action: r,
  variant: l = "primary",
  horizontal: s = !1,
  onClick: o,
  className: c
}) {
  return /* @__PURE__ */ d(M, { hoverable: !0, onClick: o, className: f(o && "cursor-pointer", c), children: [
    /* @__PURE__ */ d("div", { className: f(s ? "d-flex align-items-center gap-3 text-start" : "text-center"), children: [
      /* @__PURE__ */ t(
        "span",
        {
          className: "uikit-stats__icon",
          style: { background: `var(--${l}-soft, var(--surface-muted))`, color: `var(--${l})`, margin: s ? 0 : "0 auto 12px" },
          children: /* @__PURE__ */ t("i", { className: `bi bi-${a}`, "aria-hidden": "true" })
        }
      ),
      /* @__PURE__ */ d("div", { className: "flex-grow-1", children: [
        /* @__PURE__ */ t("h6", { className: "mb-1", children: n }),
        i && /* @__PURE__ */ t("p", { className: "text-secondary-soft small mb-0", children: i })
      ] })
    ] }),
    r && /* @__PURE__ */ t("div", { className: f("mt-3", !s && "text-center"), children: /* @__PURE__ */ t(A, { variant: l, size: "sm", icon: r.icon, onClick: r.onClick, children: r.label }) })
  ] });
}
ti.propTypes = {
  icon: e.string,
  title: e.node,
  description: e.node,
  action: e.shape({ label: e.string, icon: e.string, onClick: e.func }),
  variant: e.string,
  horizontal: e.bool,
  onClick: e.func,
  className: e.string
};
function ai(a = [], n = [], i = {}) {
  const { pageSize: r = 10, searchableKeys: l } = i, [s, o] = x(""), [c, u] = x({}), [m, p] = x({ key: null, direction: "asc" }), [h, b] = x(1), [g, k] = x(r), N = q(
    () => l || n.filter((S) => S.searchable !== !1).map((S) => S.key),
    [l, n]
  ), y = q(() => {
    let S = a;
    const $ = Object.entries(c).filter(([, P]) => P !== "" && P != null);
    if ($.length && (S = S.filter(
      (P) => $.every(([J, Z]) => String(G(P, J) ?? "") === String(Z))
    )), s.trim()) {
      const P = s.trim().toLowerCase();
      S = S.filter(
        (J) => N.some((Z) => String(G(J, Z) ?? "").toLowerCase().includes(P))
      );
    }
    if (m.key) {
      const P = m.direction === "desc" ? -1 : 1;
      S = [...S].sort((J, Z) => {
        const ne = G(J, m.key), re = G(Z, m.key);
        return ne == null ? 1 : re == null ? -1 : typeof ne == "number" && typeof re == "number" ? (ne - re) * P : String(ne).localeCompare(String(re), void 0, { numeric: !0 }) * P;
      });
    }
    return S;
  }, [a, c, s, N, m]), v = Math.max(1, Math.ceil(y.length / g)), w = Math.min(h, v), T = q(
    () => y.slice((w - 1) * g, w * g),
    [y, w, g]
  );
  return {
    query: s,
    search: (S) => {
      o(S), b(1);
    },
    filters: c,
    setFilter: (S, $) => {
      u((P) => ({ ...P, [S]: $ })), b(1);
    },
    setFilters: u,
    sort: m,
    toggleSort: (S) => p(
      ($) => $.key === S ? { key: S, direction: $.direction === "asc" ? "desc" : "asc" } : { key: S, direction: "asc" }
    ),
    page: w,
    setPage: b,
    pageSize: g,
    setPageSize: k,
    totalPages: v,
    total: y.length,
    rows: T,
    allFilteredRows: y
  };
}
function ii(a = []) {
  const [n, i] = x(() => a.filter((s) => s.hidden).map((s) => s.key));
  return { visible: q(() => a.filter((s) => !n.includes(s.key)), [a, n]), hidden: n, toggle: (s) => i((o) => o.includes(s) ? o.filter((c) => c !== s) : [...o, s]), setHidden: i };
}
function ni(a = [], n = []) {
  const i = (s) => {
    const o = s == null ? "" : String(s);
    return /[",\n]/.test(o) ? `"${o.replace(/"/g, '""')}"` : o;
  }, r = n.map((s) => i(s.label ?? s.key)).join(","), l = a.map((s) => n.map((o) => i(G(s, o.key))).join(","));
  return [r, ...l].join(`
`);
}
function ri(a, n, i = "export.csv") {
  const r = new Blob([`\uFEFF${ni(a, n)}`], { type: "text/csv;charset=utf-8;" }), l = URL.createObjectURL(r), s = document.createElement("a");
  s.href = l, s.download = i, document.body.appendChild(s), s.click(), document.body.removeChild(s), URL.revokeObjectURL(l);
}
function St({ value: a, onChange: n, placeholder: i = "Search records…", width: r = 260, className: l }) {
  return /* @__PURE__ */ t(
    Ve,
    {
      value: a,
      onChange: n,
      onClear: () => n == null ? void 0 : n(""),
      placeholder: i,
      size: "sm",
      width: r,
      className: l
    }
  );
}
St.propTypes = {
  value: e.string,
  onChange: e.func,
  placeholder: e.string,
  width: e.oneOfType([e.string, e.number]),
  className: e.string
};
function Ct({ filters: a = [], values: n = {}, onChange: i, className: r }) {
  return a.length ? /* @__PURE__ */ t("div", { className: f("d-flex flex-wrap gap-2", r), children: a.map((l) => /* @__PURE__ */ d(
    "select",
    {
      className: "form-select form-select-sm",
      style: { width: l.width || 160 },
      value: n[l.key] ?? "",
      onChange: (s) => i == null ? void 0 : i(l.key, s.target.value),
      "aria-label": l.label,
      children: [
        /* @__PURE__ */ t("option", { value: "", children: l.placeholder || `All ${l.label}` }),
        l.options.map((s) => {
          const o = typeof s == "object" ? s : { value: s, label: s };
          return /* @__PURE__ */ t("option", { value: o.value, children: o.label }, o.value);
        })
      ]
    },
    l.key
  )) }) : null;
}
Ct.propTypes = {
  filters: e.arrayOf(e.object),
  values: e.object,
  onChange: e.func,
  className: e.string
};
function $t({
  title: a,
  subtitle: n,
  search: i,
  onSearch: r,
  searchPlaceholder: l,
  filters: s = [],
  filterValues: o,
  onFilterChange: c,
  actions: u,
  selectedCount: m = 0,
  bulkActions: p,
  className: h
}) {
  return /* @__PURE__ */ t("div", { className: f("uikit-table-toolbar", h), children: /* @__PURE__ */ d("div", { className: "d-flex flex-wrap align-items-center justify-content-between gap-2", children: [
    /* @__PURE__ */ d("div", { className: "me-auto", children: [
      a && /* @__PURE__ */ t("h5", { className: "uikit-card__title", children: a }),
      n && /* @__PURE__ */ t("p", { className: "uikit-card__subtitle", children: n }),
      m > 0 && /* @__PURE__ */ d("p", { className: "uikit-card__subtitle", children: [
        m,
        " selected"
      ] })
    ] }),
    m > 0 && p ? /* @__PURE__ */ t("div", { className: "d-flex gap-2", children: p }) : /* @__PURE__ */ d(U, { children: [
      r && /* @__PURE__ */ t(St, { value: i, onChange: r, placeholder: l }),
      /* @__PURE__ */ t(Ct, { filters: s, values: o, onChange: c }),
      u && /* @__PURE__ */ t("div", { className: "d-flex gap-2", children: u })
    ] })
  ] }) });
}
$t.propTypes = {
  title: e.node,
  subtitle: e.node,
  search: e.string,
  onSearch: e.func,
  searchPlaceholder: e.string,
  filters: e.array,
  filterValues: e.object,
  onFilterChange: e.func,
  actions: e.node,
  selectedCount: e.number,
  bulkActions: e.node,
  className: e.string
};
function li(a, n, i = 1) {
  const r = /* @__PURE__ */ new Set([1, n]);
  for (let o = a - i; o <= a + i; o += 1)
    o > 0 && o <= n && r.add(o);
  const l = [...r].sort((o, c) => o - c), s = [];
  return l.forEach((o, c) => {
    c > 0 && o - l[c - 1] > 1 && s.push("…"), s.push(o);
  }), s;
}
function Ot({
  page: a = 1,
  totalPages: n = 1,
  onChange: i,
  size: r,
  siblings: l = 1,
  variant: s = "numbered",
  hasMore: o = !1,
  loading: c = !1,
  onLoadMore: u,
  loadMoreLabel: m = "Load more",
  className: p
}) {
  if (s === "load-more")
    return o ? /* @__PURE__ */ t("div", { className: f("text-center py-3", p), children: /* @__PURE__ */ d("button", { type: "button", className: "btn btn-light", disabled: c, onClick: u, children: [
      c ? /* @__PURE__ */ t("span", { className: "spinner-border spinner-border-sm me-2" }) : /* @__PURE__ */ t("i", { className: "bi bi-arrow-down-circle me-2" }),
      m
    ] }) }) : null;
  if (s === "simple")
    return /* @__PURE__ */ d("div", { className: f("d-flex align-items-center justify-content-between gap-3", p), children: [
      /* @__PURE__ */ d("button", { type: "button", className: "btn btn-light btn-sm", disabled: a === 1, onClick: () => i == null ? void 0 : i(a - 1), children: [
        /* @__PURE__ */ t("i", { className: "bi bi-chevron-left me-1" }),
        "Previous"
      ] }),
      /* @__PURE__ */ d("span", { className: "small text-secondary-soft", children: [
        "Page ",
        a,
        " of ",
        n
      ] }),
      /* @__PURE__ */ d("button", { type: "button", className: "btn btn-light btn-sm", disabled: a === n, onClick: () => i == null ? void 0 : i(a + 1), children: [
        "Next",
        /* @__PURE__ */ t("i", { className: "bi bi-chevron-right ms-1" })
      ] })
    ] });
  if (n <= 1) return null;
  const h = (b) => b >= 1 && b <= n && b !== a && (i == null ? void 0 : i(b));
  return /* @__PURE__ */ t("nav", { "aria-label": "Pagination", children: /* @__PURE__ */ d("ul", { className: f("pagination mb-0", r && `pagination-${r}`, p), children: [
    /* @__PURE__ */ t("li", { className: f("page-item", a === 1 && "disabled"), children: /* @__PURE__ */ t("button", { type: "button", className: "page-link", onClick: () => h(a - 1), "aria-label": "Previous", children: /* @__PURE__ */ t("i", { className: "bi bi-chevron-left" }) }) }),
    li(a, n, l).map(
      (b, g) => b === "…" ? /* @__PURE__ */ t("li", { className: "page-item disabled", children: /* @__PURE__ */ t("span", { className: "page-link", children: "…" }) }, `gap-${g}`) : /* @__PURE__ */ t("li", { className: f("page-item", b === a && "active"), children: /* @__PURE__ */ t("button", { type: "button", className: "page-link", onClick: () => h(b), children: b }) }, b)
    ),
    /* @__PURE__ */ t("li", { className: f("page-item", a === n && "disabled"), children: /* @__PURE__ */ t("button", { type: "button", className: "page-link", onClick: () => h(a + 1), "aria-label": "Next", children: /* @__PURE__ */ t("i", { className: "bi bi-chevron-right" }) }) })
  ] }) });
}
Ot.propTypes = {
  page: e.number,
  totalPages: e.number,
  onChange: e.func,
  size: e.oneOf(["sm", "lg"]),
  siblings: e.number,
  variant: e.oneOf(["numbered", "simple", "load-more"]),
  hasMore: e.bool,
  loading: e.bool,
  onLoadMore: e.func,
  loadMoreLabel: e.string,
  className: e.string
};
function At({
  page: a = 1,
  pageSize: n = 10,
  total: i = 0,
  totalPages: r = 1,
  onPageChange: l,
  onPageSizeChange: s,
  pageSizeOptions: o = [10, 25, 50, 100],
  className: c
}) {
  const u = i === 0 ? 0 : (a - 1) * n + 1, m = Math.min(a * n, i);
  return /* @__PURE__ */ d("div", { className: f("d-flex flex-wrap align-items-center justify-content-between gap-2 px-3 py-3 border-top", c), children: [
    /* @__PURE__ */ d("div", { className: "d-flex align-items-center gap-2 small text-secondary-soft", children: [
      /* @__PURE__ */ d("span", { children: [
        "Showing ",
        u,
        "–",
        m,
        " of ",
        i
      ] }),
      s && /* @__PURE__ */ t(
        "select",
        {
          className: "form-select form-select-sm",
          style: { width: 78 },
          value: n,
          onChange: (p) => s(Number(p.target.value)),
          "aria-label": "Rows per page",
          children: o.map((p) => /* @__PURE__ */ t("option", { value: p, children: p }, p))
        }
      )
    ] }),
    /* @__PURE__ */ t(Ot, { page: a, totalPages: r, onChange: l, size: "sm" })
  ] });
}
At.propTypes = {
  page: e.number,
  pageSize: e.number,
  total: e.number,
  totalPages: e.number,
  onPageChange: e.func,
  onPageSizeChange: e.func,
  pageSizeOptions: e.array,
  className: e.string
};
function Dt({ content: a, placement: n = "top", className: i, children: r }) {
  const [l, s] = x(!1);
  return /* @__PURE__ */ d(
    "span",
    {
      className: f("uikit-tooltip-wrap", i),
      onMouseEnter: () => s(!0),
      onMouseLeave: () => s(!1),
      onFocus: () => s(!0),
      onBlur: () => s(!1),
      children: [
        r,
        l && a && /* @__PURE__ */ t("span", { className: f("uikit-tooltip", `uikit-tooltip--${n}`), role: "tooltip", children: a })
      ]
    }
  );
}
Dt.propTypes = {
  content: e.node,
  placement: e.oneOf(["top", "bottom", "left", "right"]),
  className: e.string,
  children: e.node
};
function zt({ row: a, actions: n = [], as: i = "buttons", className: r }) {
  return n.length ? i === "menu" ? /* @__PURE__ */ t(
    ae,
    {
      align: "end",
      className: r,
      trigger: /* @__PURE__ */ t(E, { icon: "three-dots-vertical", size: "sm", variant: "light", label: "Actions" }),
      items: n.map((l) => ({
        label: l.label,
        icon: l.icon,
        danger: l.variant === "danger",
        onClick: () => {
          var s;
          return (s = l.onClick) == null ? void 0 : s.call(l, a);
        }
      }))
    }
  ) : /* @__PURE__ */ t("div", { className: f("d-flex gap-1 justify-content-end", r), children: n.map((l) => {
    var s;
    return /* @__PURE__ */ t(Dt, { content: l.label, children: /* @__PURE__ */ t(
      E,
      {
        icon: l.icon,
        size: "sm",
        variant: l.variant || "light",
        label: l.label,
        disabled: (s = l.disabled) == null ? void 0 : s.call(l, a),
        onClick: () => {
          var o;
          return (o = l.onClick) == null ? void 0 : o.call(l, a);
        }
      }
    ) }, l.label);
  }) }) : null;
}
zt.propTypes = {
  row: e.object,
  actions: e.arrayOf(e.object),
  as: e.oneOf(["buttons", "menu"]),
  className: e.string
};
function ye({
  icon: a = "inbox",
  title: n = "Nothing here yet",
  description: i,
  action: r,
  secondaryAction: l,
  className: s,
  children: o
}) {
  return /* @__PURE__ */ d("div", { className: f("uikit-empty", s), children: [
    /* @__PURE__ */ t("div", { className: "uikit-empty__icon", children: /* @__PURE__ */ t("i", { className: `bi bi-${a}`, "aria-hidden": "true" }) }),
    /* @__PURE__ */ t("h5", { className: "mb-1", children: n }),
    i && /* @__PURE__ */ t("p", { className: "mb-3 small", children: i }),
    o,
    (r || l) && /* @__PURE__ */ d("div", { className: "d-flex gap-2 justify-content-center mt-2", children: [
      r && /* @__PURE__ */ t(A, { variant: "primary", icon: r.icon, onClick: r.onClick, children: r.label }),
      l && /* @__PURE__ */ t(A, { variant: "light", icon: l.icon, onClick: l.onClick, children: l.label })
    ] })
  ] });
}
const at = e.shape({
  label: e.string,
  icon: e.string,
  onClick: e.func
});
ye.propTypes = {
  icon: e.string,
  title: e.node,
  description: e.node,
  action: at,
  secondaryAction: at,
  className: e.string,
  children: e.node
};
function I({ variant: a = "text", width: n, height: i, lines: r = 1, className: l }) {
  if (a === "text" && r > 1)
    return /* @__PURE__ */ t("div", { className: f("d-flex flex-column gap-2", l), children: Array.from({ length: r }).map((o, c) => /* @__PURE__ */ t(
      "div",
      {
        className: "uikit-skeleton",
        style: { height: i || 12, width: c === r - 1 ? "60%" : n || "100%" }
      },
      c
    )) });
  const s = {
    width: n || (a === "circle" ? 44 : "100%"),
    height: i || (a === "circle" ? 44 : a === "block" ? 96 : 12),
    borderRadius: a === "circle" ? "50%" : void 0
  };
  return /* @__PURE__ */ t("div", { className: f("uikit-skeleton", l), style: s });
}
I.propTypes = {
  variant: e.oneOf(["text", "circle", "block"]),
  width: e.oneOfType([e.string, e.number]),
  height: e.oneOfType([e.string, e.number]),
  lines: e.number,
  className: e.string
};
function Ke({ preset: a = "card", rows: n = 4, className: i }) {
  return a === "table" ? /* @__PURE__ */ d("div", { className: i, children: [
    /* @__PURE__ */ t("div", { className: "d-flex gap-3 py-2 border-bottom", children: Array.from({ length: 4 }).map((r, l) => /* @__PURE__ */ t(I, { height: 10 }, l)) }),
    Array.from({ length: n }).map((r, l) => /* @__PURE__ */ t("div", { className: "d-flex gap-3 py-3 border-bottom", children: Array.from({ length: 4 }).map((s, o) => /* @__PURE__ */ t(I, { height: 12 }, o)) }, l))
  ] }) : a === "list" ? /* @__PURE__ */ t("div", { className: i, children: Array.from({ length: n }).map((r, l) => /* @__PURE__ */ d("div", { className: "d-flex gap-3 align-items-center py-3 border-bottom", children: [
    /* @__PURE__ */ t(I, { variant: "circle", width: 38, height: 38 }),
    /* @__PURE__ */ t("div", { className: "flex-grow-1", children: /* @__PURE__ */ t(I, { lines: 2 }) }),
    /* @__PURE__ */ t(I, { width: 64, height: 12 })
  ] }, l)) }) : a === "profile" ? /* @__PURE__ */ t(M, { className: i, children: /* @__PURE__ */ d("div", { className: "text-center", children: [
    /* @__PURE__ */ t(I, { variant: "circle", width: 80, height: 80, className: "mx-auto mb-3" }),
    /* @__PURE__ */ t(I, { width: "50%", height: 14, className: "mx-auto mb-2" }),
    /* @__PURE__ */ t(I, { width: "35%", height: 10, className: "mx-auto mb-3" }),
    /* @__PURE__ */ t(I, { lines: 3 })
  ] }) }) : a === "chart" ? /* @__PURE__ */ d(M, { className: i, children: [
    /* @__PURE__ */ t(I, { width: "40%", height: 14, className: "mb-3" }),
    /* @__PURE__ */ t(I, { variant: "block", height: 200 })
  ] }) : a === "stats" ? /* @__PURE__ */ t("div", { className: `row g-3 ${i || ""}`, children: Array.from({ length: 4 }).map((r, l) => /* @__PURE__ */ t("div", { className: "col-6 col-xl-3", children: /* @__PURE__ */ t(M, { className: "mb-0", children: /* @__PURE__ */ d("div", { className: "d-flex gap-3 align-items-center", children: [
    /* @__PURE__ */ t(I, { variant: "circle", width: 56, height: 56 }),
    /* @__PURE__ */ t("div", { className: "flex-grow-1", children: /* @__PURE__ */ t(I, { lines: 2 }) })
  ] }) }) }, l)) }) : /* @__PURE__ */ d(M, { className: i, children: [
    /* @__PURE__ */ t(I, { width: "45%", height: 14, className: "mb-3" }),
    /* @__PURE__ */ t(I, { lines: n })
  ] });
}
Ke.PRESETS = ["card", "table", "list", "profile", "chart", "stats"];
Ke.propTypes = {
  preset: e.oneOf(["card", "table", "list", "profile", "chart", "stats"]),
  rows: e.number,
  className: e.string
};
function si({
  columns: a = [],
  data: n = [],
  rowKey: i = "id",
  title: r,
  subtitle: l,
  variant: s = "default",
  searchable: o = !1,
  searchPlaceholder: c,
  filters: u = [],
  sortable: m = !0,
  pagination: p = !1,
  pageSize: h = 10,
  selectable: b = !1,
  onSelectionChange: g,
  expandable: k = !1,
  renderExpanded: N,
  actions: y = [],
  actionsAs: v = "buttons",
  actionsLabel: w = "Actions",
  toolbarActions: T,
  bulkActions: C,
  loading: z = !1,
  striped: B = !1,
  hover: S = !0,
  compact: $ = !1,
  bordered: P = !1,
  stickyHeader: J = !1,
  maxHeight: Z,
  columnToggle: ne = !1,
  exportable: re = !1,
  exportFilename: Zt = "export.csv",
  showTotals: Qt = !1,
  editable: Xt = !1,
  onCellEdit: Oe,
  serverSide: Q = !1,
  total: ea,
  onQueryChange: Ae,
  emptyState: ta,
  onRowClick: De,
  className: aa
}) {
  const O = ai(Q ? [] : n, a, { pageSize: h }), { visible: he, hidden: ia, toggle: na } = ii(a), [X, ra] = x([]), [la, sa] = x([]), [me, ze] = x(null);
  R(() => {
    Q && (Ae == null || Ae({
      page: O.page,
      pageSize: O.pageSize,
      query: O.query,
      sort: O.sort,
      filters: O.filters
    }));
  }, [Q, O.page, O.pageSize, O.query, O.sort, O.filters]);
  const Ne = Q ? n : p ? O.rows : O.allFilteredRows, je = Q ? ea ?? n.length : O.total, oa = Q ? Math.max(1, Math.ceil(je / O.pageSize)) : O.totalPages, Le = (_, L) => G(_, i) ?? L, Je = (_) => {
    ra(_), g == null || g(_, n.filter((L, D) => _.includes(Le(L, D))));
  }, ca = (_) => Je(X.includes(_) ? X.filter((L) => L !== _) : [...X, _]), ke = Ne.map(Le), Ge = ke.length > 0 && ke.every((_) => X.includes(_)), da = () => Je(Ge ? X.filter((_) => !ke.includes(_)) : [.../* @__PURE__ */ new Set([...X, ...ke])]), ua = (_) => sa((L) => L.includes(_) ? L.filter((D) => D !== _) : [...L, _]), ma = /* @__PURE__ */ d(U, { children: [
    T,
    ne && /* @__PURE__ */ t(
      ae,
      {
        align: "end",
        trigger: /* @__PURE__ */ t(E, { icon: "layout-three-columns", size: "sm", variant: "light", label: "Columns" }),
        header: "Columns",
        children: a.map((_) => /* @__PURE__ */ d("label", { className: "uikit-dropdown__item mb-0", style: { cursor: "pointer" }, children: [
          /* @__PURE__ */ t("input", { type: "checkbox", className: "form-check-input m-0", checked: !ia.includes(_.key), onChange: () => na(_.key) }),
          /* @__PURE__ */ t("span", { className: "flex-grow-1", children: _.label })
        ] }, _.key))
      }
    ),
    re && /* @__PURE__ */ t(
      E,
      {
        icon: "download",
        size: "sm",
        variant: "light",
        label: "Export CSV",
        onClick: () => ri(Q ? n : O.allFilteredRows, he, Zt)
      }
    )
  ] }), pa = !!(r || l || o || u.length || T || ne || re), Ze = (b ? 1 : 0) + (k ? 1 : 0), Ie = he.length + Ze + (y.length ? 1 : 0), ha = Qt && /* @__PURE__ */ d("tr", { className: "fw-semibold", style: { background: "var(--surface-muted)" }, children: [
    Array.from({ length: Ze }).map((_, L) => /* @__PURE__ */ t("td", {}, `lead-${L}`)),
    he.map((_, L) => {
      const D = Q ? n : O.allFilteredRows;
      let W = L === 0 && !_.total ? "Total" : "";
      return _.total === "sum" && (W = D.reduce((j, le) => j + (Number(G(le, _.key)) || 0), 0)), _.total === "count" && (W = D.length), _.total === "avg" && (W = D.length ? (D.reduce((j, le) => j + (Number(G(le, _.key)) || 0), 0) / D.length).toFixed(2) : 0), typeof _.total == "function" && (W = _.total(D)), /* @__PURE__ */ t("td", { style: { textAlign: _.align }, children: _.formatTotal ? _.formatTotal(W) : W }, _.key);
    }),
    y.length > 0 && /* @__PURE__ */ t("td", {})
  ] });
  return /* @__PURE__ */ d("div", { className: f("uikit-card", aa), children: [
    pa && /* @__PURE__ */ t(
      $t,
      {
        title: r,
        subtitle: l,
        search: o ? O.query : void 0,
        onSearch: o ? O.search : void 0,
        searchPlaceholder: c,
        filters: u,
        filterValues: O.filters,
        onFilterChange: O.setFilter,
        actions: ma,
        selectedCount: X.length,
        bulkActions: C
      }
    ),
    /* @__PURE__ */ t(
      "div",
      {
        className: f("table-responsive", J && "uikit-table--sticky"),
        style: Z ? { maxHeight: Z, overflowY: "auto" } : void 0,
        children: /* @__PURE__ */ d(
          "table",
          {
            className: f(
              "table uikit-table",
              B && "table-striped",
              S && "table-hover",
              ($ || s === "dense") && "table-sm",
              P && "table-bordered",
              s === "cards" && "uikit-table--cards"
            ),
            children: [
              /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ d("tr", { children: [
                k && /* @__PURE__ */ t("th", { style: { width: 44 } }),
                b && /* @__PURE__ */ t("th", { style: { width: 44 }, children: /* @__PURE__ */ t("input", { type: "checkbox", className: "form-check-input", checked: Ge, onChange: da, "aria-label": "Select all rows" }) }),
                he.map((_) => {
                  const L = O.sort.key === _.key, D = m && _.sortable !== !1;
                  return /* @__PURE__ */ d(
                    "th",
                    {
                      style: { width: _.width, textAlign: _.align },
                      className: f(D && "uikit-table__sortable", L && "is-sorted"),
                      onClick: D ? () => O.toggleSort(_.key) : void 0,
                      children: [
                        _.label,
                        D && /* @__PURE__ */ t("i", { className: `bi bi-${L ? O.sort.direction === "asc" ? "sort-up" : "sort-down" : "arrow-down-up"}` })
                      ]
                    },
                    _.key
                  );
                }),
                y.length > 0 && /* @__PURE__ */ t("th", { className: "text-end", style: { width: v === "menu" ? 60 : 40 * y.length + 24 }, children: w })
              ] }) }),
              /* @__PURE__ */ d("tbody", { children: [
                z && /* @__PURE__ */ t("tr", { children: /* @__PURE__ */ t("td", { colSpan: Ie, className: "p-3", children: /* @__PURE__ */ t(Ke, { preset: "table", rows: 4 }) }) }),
                !z && Ne.length === 0 && /* @__PURE__ */ t("tr", { children: /* @__PURE__ */ t("td", { colSpan: Ie, children: ta || /* @__PURE__ */ t(ye, { icon: "inbox", title: "No records found", description: "Try adjusting your search or filters." }) }) }),
                !z && Ne.map((_, L) => {
                  const D = Le(_, L), W = la.includes(D);
                  return [
                    /* @__PURE__ */ d("tr", { className: f(De && "cursor-pointer"), onClick: De ? () => De(_) : void 0, children: [
                      k && /* @__PURE__ */ t("td", { onClick: (j) => j.stopPropagation(), children: /* @__PURE__ */ t(
                        E,
                        {
                          icon: W ? "chevron-down" : "chevron-right",
                          size: "sm",
                          variant: "light",
                          label: W ? "Collapse" : "Expand",
                          onClick: () => ua(D)
                        }
                      ) }),
                      b && /* @__PURE__ */ t("td", { onClick: (j) => j.stopPropagation(), children: /* @__PURE__ */ t("input", { type: "checkbox", className: "form-check-input", checked: X.includes(D), onChange: () => ca(D), "aria-label": "Select row" }) }),
                      he.map((j) => {
                        const le = G(_, j.key), Qe = Xt && j.editable !== !1 && !j.render, ba = (me == null ? void 0 : me.key) === D && (me == null ? void 0 : me.column) === j.key;
                        return /* @__PURE__ */ t(
                          "td",
                          {
                            style: { textAlign: j.align },
                            onDoubleClick: Qe ? () => ze({ key: D, column: j.key }) : void 0,
                            className: f(Qe && "uikit-table__editable"),
                            children: ba ? /* @__PURE__ */ t(
                              "input",
                              {
                                autoFocus: !0,
                                className: "form-control form-control-sm",
                                defaultValue: le ?? "",
                                onBlur: (se) => {
                                  Oe == null || Oe(_, j.key, se.target.value), ze(null);
                                },
                                onKeyDown: (se) => {
                                  se.key === "Enter" && se.currentTarget.blur(), se.key === "Escape" && ze(null);
                                },
                                onClick: (se) => se.stopPropagation()
                              }
                            ) : j.render ? j.render(le, _, L) : le ?? "—"
                          },
                          j.key
                        );
                      }),
                      y.length > 0 && /* @__PURE__ */ t("td", { onClick: (j) => j.stopPropagation(), children: /* @__PURE__ */ t(zt, { row: _, actions: y, as: v }) })
                    ] }, D),
                    k && W && /* @__PURE__ */ t("tr", { className: "uikit-table__expanded", children: /* @__PURE__ */ t("td", { colSpan: Ie, children: N == null ? void 0 : N(_) }) }, `${D}-expanded`)
                  ];
                }),
                !z && Ne.length > 0 && ha
              ] })
            ]
          }
        )
      }
    ),
    p && !z && je > 0 && /* @__PURE__ */ t(
      At,
      {
        page: O.page,
        pageSize: O.pageSize,
        total: je,
        totalPages: oa,
        onPageChange: O.setPage,
        onPageSizeChange: O.setPageSize
      }
    )
  ] });
}
si.propTypes = {
  columns: e.arrayOf(e.shape({
    key: e.string.isRequired,
    label: e.node,
    render: e.func,
    align: e.string,
    width: e.oneOfType([e.string, e.number]),
    sortable: e.bool,
    searchable: e.bool,
    editable: e.bool,
    hidden: e.bool,
    total: e.oneOfType([e.oneOf(["sum", "count", "avg"]), e.func])
  })),
  data: e.array,
  rowKey: e.string,
  title: e.node,
  subtitle: e.node,
  variant: e.oneOf(["default", "dense", "cards"]),
  searchable: e.bool,
  searchPlaceholder: e.string,
  filters: e.array,
  sortable: e.bool,
  pagination: e.bool,
  pageSize: e.number,
  selectable: e.bool,
  onSelectionChange: e.func,
  expandable: e.bool,
  renderExpanded: e.func,
  actions: e.array,
  actionsAs: e.oneOf(["buttons", "menu"]),
  actionsLabel: e.node,
  toolbarActions: e.node,
  bulkActions: e.node,
  loading: e.bool,
  striped: e.bool,
  hover: e.bool,
  compact: e.bool,
  bordered: e.bool,
  stickyHeader: e.bool,
  maxHeight: e.oneOfType([e.string, e.number]),
  columnToggle: e.bool,
  exportable: e.bool,
  exportFilename: e.string,
  showTotals: e.bool,
  editable: e.bool,
  onCellEdit: e.func,
  serverSide: e.bool,
  total: e.number,
  onQueryChange: e.func,
  emptyState: e.node,
  onRowClick: e.func,
  className: e.string
};
function V({ id: a, label: n, required: i, error: r, helperText: l, horizontal: s = !1, floating: o = !1, inline: c = !1, className: u, children: m }) {
  if (o)
    return /* @__PURE__ */ d("div", { className: f("form-floating mb-3", u), children: [
      m,
      n && /* @__PURE__ */ d("label", { htmlFor: a, children: [
        n,
        i && /* @__PURE__ */ t("span", { className: "uikit-required", children: "*" })
      ] }),
      r ? /* @__PURE__ */ t("div", { className: "uikit-error", children: r }) : l ? /* @__PURE__ */ t("div", { className: "uikit-helper", children: l }) : null
    ] });
  const p = n ? /* @__PURE__ */ d("label", { htmlFor: a, className: f("form-label", s && "col-sm-3 col-form-label mb-0"), children: [
    n,
    i && /* @__PURE__ */ t("span", { className: "uikit-required", children: "*" })
  ] }) : null, h = /* @__PURE__ */ d(U, { children: [
    m,
    r ? /* @__PURE__ */ t("div", { className: "uikit-error", children: r }) : l ? /* @__PURE__ */ t("div", { className: "uikit-helper", children: l }) : null
  ] });
  return s ? /* @__PURE__ */ d("div", { className: f("row align-items-start mb-3", u), children: [
    p,
    /* @__PURE__ */ t("div", { className: "col-sm-9", children: h })
  ] }) : c ? /* @__PURE__ */ d("div", { className: f("d-flex align-items-center gap-2 mb-3", u), children: [
    p,
    /* @__PURE__ */ t("div", { className: "flex-grow-1", children: h })
  ] }) : /* @__PURE__ */ d("div", { className: f("mb-3", u), children: [
    p,
    h
  ] });
}
V.propTypes = {
  id: e.string,
  label: e.node,
  required: e.bool,
  error: e.node,
  helperText: e.node,
  horizontal: e.bool,
  floating: e.bool,
  inline: e.bool,
  className: e.string,
  children: e.node
};
function H({
  id: a,
  label: n,
  type: i = "text",
  value: r,
  onChange: l,
  placeholder: s,
  required: o = !1,
  disabled: c = !1,
  readOnly: u = !1,
  error: m,
  helperText: p,
  size: h = "md",
  prefix: b,
  suffix: g,
  horizontal: k = !1,
  floating: N = !1,
  inline: y = !1,
  className: v,
  ...w
}) {
  const T = F(), C = a || `input-${T}`, z = /* @__PURE__ */ t(
    "input",
    {
      id: C,
      type: i,
      className: f("form-control", h !== "md" && `form-control-${h}`, m && "is-invalid", v),
      value: r,
      onChange: l,
      placeholder: s,
      required: o,
      disabled: c,
      readOnly: u,
      "aria-invalid": !!m,
      ...w
    }
  );
  return /* @__PURE__ */ t(V, { id: C, label: n, required: o, error: m, helperText: p, horizontal: k, floating: N, inline: y, children: b || g ? /* @__PURE__ */ d("div", { className: "input-group", children: [
    b && /* @__PURE__ */ t("span", { className: "input-group-text", children: typeof b == "string" ? /* @__PURE__ */ t("i", { className: `bi bi-${b}` }) : b }),
    z,
    g && /* @__PURE__ */ t("span", { className: "input-group-text", children: typeof g == "string" ? /* @__PURE__ */ t("i", { className: `bi bi-${g}` }) : g })
  ] }) : z });
}
H.propTypes = {
  id: e.string,
  label: e.node,
  type: e.string,
  value: e.any,
  onChange: e.func,
  placeholder: e.string,
  required: e.bool,
  disabled: e.bool,
  readOnly: e.bool,
  error: e.node,
  helperText: e.node,
  size: e.oneOf(["sm", "md", "lg"]),
  prefix: e.node,
  suffix: e.node,
  horizontal: e.bool,
  floating: e.bool,
  inline: e.bool,
  className: e.string
};
function oi({
  id: a,
  label: n,
  value: i,
  onChange: r,
  placeholder: l,
  rows: s = 4,
  required: o = !1,
  disabled: c = !1,
  error: u,
  helperText: m,
  size: p = "md",
  maxLength: h,
  showCount: b = !1,
  horizontal: g = !1,
  floating: k = !1,
  inline: N = !1,
  className: y,
  ...v
}) {
  const w = F(), T = a || `textarea-${w}`;
  return /* @__PURE__ */ d(V, { id: T, label: n, required: o, error: u, helperText: m, horizontal: g, floating: k, inline: N, children: [
    /* @__PURE__ */ t(
      "textarea",
      {
        id: T,
        rows: s,
        className: f("form-control", p !== "md" && `form-control-${p}`, u && "is-invalid", y),
        value: i,
        onChange: r,
        placeholder: l,
        required: o,
        disabled: c,
        maxLength: h,
        ...v
      }
    ),
    b && h && /* @__PURE__ */ d("div", { className: "uikit-helper text-end", children: [
      String(i || "").length,
      " / ",
      h
    ] })
  ] });
}
oi.propTypes = {
  id: e.string,
  label: e.node,
  value: e.any,
  onChange: e.func,
  placeholder: e.string,
  rows: e.number,
  required: e.bool,
  disabled: e.bool,
  error: e.node,
  helperText: e.node,
  size: e.oneOf(["sm", "md", "lg"]),
  maxLength: e.number,
  showCount: e.bool,
  horizontal: e.bool,
  floating: e.bool,
  inline: e.bool,
  className: e.string
};
const ci = [
  { command: "bold", icon: "type-bold", label: "Bold" },
  { command: "italic", icon: "type-italic", label: "Italic" },
  { command: "underline", icon: "type-underline", label: "Underline" },
  { command: "insertUnorderedList", icon: "list-ul", label: "Bullet list" },
  { command: "insertOrderedList", icon: "list-ol", label: "Numbered list" },
  { command: "removeFormat", icon: "eraser", label: "Clear formatting" }
];
function di({ label: a, value: n = "", onChange: i, minHeight: r = 160, disabled: l, error: s, helperText: o, className: c }) {
  const u = ie(null), m = (p) => {
    var h, b;
    document.execCommand(p, !1, null), (h = u.current) == null || h.focus(), i == null || i(((b = u.current) == null ? void 0 : b.innerHTML) ?? "");
  };
  return /* @__PURE__ */ d("div", { className: f("mb-3", c), children: [
    a && /* @__PURE__ */ t("div", { className: "form-label", children: a }),
    /* @__PURE__ */ d("div", { className: f("border rounded overflow-hidden", s && "border-danger"), style: { borderColor: "var(--border)" }, children: [
      /* @__PURE__ */ t("div", { className: "d-flex gap-1 p-2 border-bottom", style: { background: "var(--surface-muted)" }, children: ci.map((p) => /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          className: "btn btn-sm btn-light border-0",
          title: p.label,
          "aria-label": p.label,
          disabled: l,
          onMouseDown: (h) => h.preventDefault(),
          onClick: () => m(p.command),
          children: /* @__PURE__ */ t("i", { className: `bi bi-${p.icon}` })
        },
        p.command
      )) }),
      /* @__PURE__ */ t(
        "div",
        {
          ref: u,
          contentEditable: !l,
          suppressContentEditableWarning: !0,
          className: "p-3",
          style: { minHeight: r, outline: "none", background: "var(--surface)" },
          onInput: (p) => i == null ? void 0 : i(p.currentTarget.innerHTML),
          dangerouslySetInnerHTML: { __html: n }
        }
      )
    ] }),
    s ? /* @__PURE__ */ t("div", { className: "uikit-error", children: s }) : o ? /* @__PURE__ */ t("div", { className: "uikit-helper", children: o }) : null
  ] });
}
di.propTypes = {
  label: e.node,
  value: e.string,
  onChange: e.func,
  minHeight: e.number,
  disabled: e.bool,
  error: e.node,
  helperText: e.node,
  className: e.string
};
function ui({
  id: a,
  label: n,
  options: i = [],
  value: r,
  onChange: l,
  placeholder: s = "Select an option",
  required: o = !1,
  disabled: c = !1,
  error: u,
  helperText: m,
  size: p = "md",
  multiple: h = !1,
  horizontal: b = !1,
  floating: g = !1,
  inline: k = !1,
  className: N,
  ...y
}) {
  const v = F(), w = a || `select-${v}`, T = i.map(
    (C) => typeof C == "object" ? C : { value: C, label: C }
  );
  return /* @__PURE__ */ t(V, { id: w, label: n, required: o, error: u, helperText: m, horizontal: b, floating: g, inline: k, children: /* @__PURE__ */ d(
    "select",
    {
      id: w,
      className: f("form-select", p !== "md" && `form-select-${p}`, u && "is-invalid", N),
      value: r,
      onChange: l,
      required: o,
      disabled: c,
      multiple: h,
      ...y,
      children: [
        !h && /* @__PURE__ */ t("option", { value: "", children: s }),
        T.map((C) => /* @__PURE__ */ t("option", { value: C.value, disabled: C.disabled, children: C.label }, C.value))
      ]
    }
  ) });
}
ui.propTypes = {
  id: e.string,
  label: e.node,
  options: e.array,
  value: e.any,
  onChange: e.func,
  placeholder: e.string,
  required: e.bool,
  disabled: e.bool,
  error: e.node,
  helperText: e.node,
  size: e.oneOf(["sm", "md", "lg"]),
  multiple: e.bool,
  horizontal: e.bool,
  floating: e.bool,
  inline: e.bool,
  className: e.string
};
function mi({
  id: a,
  label: n,
  options: i = [],
  value: r = [],
  onChange: l,
  placeholder: s = "Select options",
  required: o,
  disabled: c,
  error: u,
  helperText: m,
  searchable: p = !0,
  className: h
}) {
  const b = F(), g = a || `multiselect-${b}`, k = ie(null), [N, y] = x(!1), [v, w] = x("");
  Ce(k, () => y(!1), N);
  const T = i.map((S) => typeof S == "object" ? S : { value: S, label: S }), C = v ? T.filter((S) => S.label.toLowerCase().includes(v.toLowerCase())) : T, z = (S) => l == null ? void 0 : l(r.includes(S.value) ? r.filter(($) => $ !== S.value) : [...r, S.value]), B = r.length ? T.filter((S) => r.includes(S.value)).map((S) => S.label).join(", ") : s;
  return /* @__PURE__ */ t(V, { id: g, label: n, required: o, error: u, helperText: m, className: h, children: /* @__PURE__ */ d("div", { className: "uikit-dropdown w-100", ref: k, children: [
    /* @__PURE__ */ t(
      "button",
      {
        id: g,
        type: "button",
        disabled: c,
        className: f("form-select text-start", u && "is-invalid"),
        onClick: () => y((S) => !S),
        children: /* @__PURE__ */ t("span", { className: f("d-block text-truncate", !r.length && "text-secondary-soft"), children: B })
      }
    ),
    N && /* @__PURE__ */ d("div", { className: "uikit-dropdown__menu uikit-dropdown__menu--start w-100", style: { maxHeight: 260, overflowY: "auto" }, children: [
      p && /* @__PURE__ */ t(
        "input",
        {
          className: "form-control form-control-sm mb-2",
          placeholder: "Search…",
          value: v,
          onChange: (S) => w(S.target.value)
        }
      ),
      C.map((S) => /* @__PURE__ */ d("label", { className: "uikit-dropdown__item mb-0", style: { cursor: "pointer" }, children: [
        /* @__PURE__ */ t(
          "input",
          {
            type: "checkbox",
            className: "form-check-input m-0",
            checked: r.includes(S.value),
            onChange: () => z(S)
          }
        ),
        /* @__PURE__ */ t("span", { className: "flex-grow-1", children: S.label })
      ] }, S.value)),
      !C.length && /* @__PURE__ */ t("div", { className: "uikit-dropdown__item text-secondary-soft", children: "No matches" })
    ] })
  ] }) });
}
mi.propTypes = {
  id: e.string,
  label: e.node,
  options: e.array,
  value: e.array,
  onChange: e.func,
  placeholder: e.string,
  required: e.bool,
  disabled: e.bool,
  error: e.node,
  helperText: e.node,
  searchable: e.bool,
  className: e.string
};
function pi({
  id: a,
  label: n,
  options: i = [],
  value: r,
  onChange: l,
  placeholder: s = "Start typing…",
  required: o,
  disabled: c,
  error: u,
  helperText: m,
  emptyText: p = "No matches",
  maxItems: h = 8,
  className: b
}) {
  const g = F(), k = a || `autocomplete-${g}`, N = ie(null), y = q(
    () => i.map(($) => typeof $ == "object" ? $ : { value: $, label: $ }),
    [i]
  ), v = y.find(($) => $.value === r), [w, T] = x((v == null ? void 0 : v.label) ?? ""), [C, z] = x(!1);
  Ce(N, () => z(!1), C);
  const B = q(() => {
    const $ = w.trim().toLowerCase();
    return ($ ? y.filter((J) => J.label.toLowerCase().includes($)) : y).slice(0, h);
  }, [w, y, h]), S = ($) => {
    T($.label), z(!1), l == null || l($.value, $);
  };
  return /* @__PURE__ */ t(V, { id: k, label: n, required: o, error: u, helperText: m, className: b, children: /* @__PURE__ */ d("div", { className: "uikit-dropdown w-100", ref: N, children: [
    /* @__PURE__ */ t(
      "input",
      {
        id: k,
        className: f("form-control", u && "is-invalid"),
        value: w,
        placeholder: s,
        disabled: c,
        autoComplete: "off",
        onChange: ($) => {
          T($.target.value), z(!0);
        },
        onFocus: () => z(!0)
      }
    ),
    C && /* @__PURE__ */ d("div", { className: "uikit-dropdown__menu uikit-dropdown__menu--start w-100", children: [
      B.length === 0 && /* @__PURE__ */ t("div", { className: "uikit-dropdown__item text-secondary-soft", children: p }),
      B.map(($) => /* @__PURE__ */ d("button", { type: "button", className: "uikit-dropdown__item", onClick: () => S($), children: [
        /* @__PURE__ */ d("span", { className: "flex-grow-1", children: [
          $.label,
          $.description && /* @__PURE__ */ t("span", { className: "d-block uikit-helper mt-0", children: $.description })
        ] }),
        $.value === r && /* @__PURE__ */ t("i", { className: "bi bi-check2" })
      ] }, $.value))
    ] })
  ] }) });
}
pi.propTypes = {
  id: e.string,
  label: e.node,
  options: e.array,
  value: e.any,
  onChange: e.func,
  placeholder: e.string,
  required: e.bool,
  disabled: e.bool,
  error: e.node,
  helperText: e.node,
  emptyText: e.string,
  maxItems: e.number,
  className: e.string
};
function hi({
  id: a,
  label: n,
  value: i = [],
  onChange: r,
  placeholder: l = "Add and press Enter",
  required: s,
  disabled: o,
  error: c,
  helperText: u,
  max: m,
  variant: p = "primary",
  className: h
}) {
  const b = F(), g = a || `tags-${b}`, [k, N] = x(""), y = (w) => {
    const T = w.trim().replace(/,$/, "");
    !T || i.includes(T) || m && i.length >= m || (r == null || r([...i, T]), N(""));
  }, v = (w) => r == null ? void 0 : r(i.filter((T) => T !== w));
  return /* @__PURE__ */ t(V, { id: g, label: n, required: s, error: c, helperText: u, className: h, children: /* @__PURE__ */ d("div", { className: f("form-control d-flex flex-wrap gap-2 align-items-center", c && "is-invalid"), style: { minHeight: 40, height: "auto" }, children: [
    i.map((w) => /* @__PURE__ */ d(
      "span",
      {
        className: "uikit-badge",
        style: { background: `var(--${p}-soft)`, color: `var(--${p})` },
        children: [
          w,
          !o && /* @__PURE__ */ t("button", { type: "button", className: "btn btn-link p-0 border-0 lh-1", style: { color: "inherit" }, onClick: () => v(w), "aria-label": `Remove ${w}`, children: /* @__PURE__ */ t("i", { className: "bi bi-x" }) })
        ]
      },
      w
    )),
    /* @__PURE__ */ t(
      "input",
      {
        id: g,
        className: "border-0 flex-grow-1 bg-transparent",
        style: { outline: "none", minWidth: 120, color: "inherit" },
        value: k,
        disabled: o,
        placeholder: i.length ? "" : l,
        onChange: (w) => N(w.target.value),
        onKeyDown: (w) => {
          (w.key === "Enter" || w.key === ",") && (w.preventDefault(), y(k)), w.key === "Backspace" && !k && i.length && v(i[i.length - 1]);
        },
        onBlur: () => y(k)
      }
    )
  ] }) });
}
hi.propTypes = {
  id: e.string,
  label: e.node,
  value: e.array,
  onChange: e.func,
  placeholder: e.string,
  required: e.bool,
  disabled: e.bool,
  error: e.node,
  helperText: e.node,
  max: e.number,
  variant: e.string,
  className: e.string
};
function He({
  id: a,
  label: n,
  checked: i,
  onChange: r,
  name: l,
  value: s,
  required: o = !1,
  disabled: c = !1,
  error: u,
  helperText: m,
  inline: p = !1,
  className: h,
  ...b
}) {
  const g = F(), k = a || `check-${g}`;
  return /* @__PURE__ */ d("div", { className: f("form-check", p && "form-check-inline", h), children: [
    /* @__PURE__ */ t(
      "input",
      {
        id: k,
        type: "checkbox",
        className: f("form-check-input", u && "is-invalid"),
        checked: i,
        onChange: r,
        name: l,
        value: s,
        required: o,
        disabled: c,
        ...b
      }
    ),
    n && /* @__PURE__ */ d("label", { className: "form-check-label", htmlFor: k, children: [
      n,
      o && /* @__PURE__ */ t("span", { className: "uikit-required", children: "*" })
    ] }),
    u ? /* @__PURE__ */ t("div", { className: "uikit-error", children: u }) : m ? /* @__PURE__ */ t("div", { className: "uikit-helper", children: m }) : null
  ] });
}
He.propTypes = {
  id: e.string,
  label: e.node,
  checked: e.bool,
  onChange: e.func,
  name: e.string,
  value: e.any,
  required: e.bool,
  disabled: e.bool,
  error: e.node,
  helperText: e.node,
  inline: e.bool,
  className: e.string
};
function jt({ id: a, label: n, name: i, value: r, checked: l, onChange: s, disabled: o = !1, inline: c = !1, className: u, ...m }) {
  const p = F(), h = a || `radio-${p}`;
  return /* @__PURE__ */ d("div", { className: f("form-check", c && "form-check-inline", u), children: [
    /* @__PURE__ */ t(
      "input",
      {
        id: h,
        type: "radio",
        className: "form-check-input",
        name: i,
        value: r,
        checked: l,
        onChange: s,
        disabled: o,
        ...m
      }
    ),
    n && /* @__PURE__ */ t("label", { className: "form-check-label", htmlFor: h, children: n })
  ] });
}
function bi({
  label: a,
  name: n,
  options: i = [],
  value: r,
  onChange: l,
  required: s = !1,
  disabled: o = !1,
  error: c,
  helperText: u,
  inline: m = !1,
  className: p
}) {
  const h = i.map((b) => typeof b == "object" ? b : { value: b, label: b });
  return /* @__PURE__ */ d("div", { className: f("mb-3", p), children: [
    a && /* @__PURE__ */ d("label", { className: "form-label d-block", children: [
      a,
      s && /* @__PURE__ */ t("span", { className: "uikit-required", children: "*" })
    ] }),
    /* @__PURE__ */ t("div", { className: m ? "d-flex flex-wrap gap-3" : void 0, children: h.map((b) => /* @__PURE__ */ t(
      jt,
      {
        name: n,
        value: b.value,
        label: b.label,
        checked: String(r) === String(b.value),
        onChange: l,
        disabled: o || b.disabled,
        inline: m
      },
      b.value
    )) }),
    c ? /* @__PURE__ */ t("div", { className: "uikit-error", children: c }) : u ? /* @__PURE__ */ t("div", { className: "uikit-helper", children: u }) : null
  ] });
}
jt.propTypes = {
  id: e.string,
  label: e.node,
  name: e.string,
  value: e.any,
  checked: e.bool,
  onChange: e.func,
  disabled: e.bool,
  inline: e.bool,
  className: e.string
};
bi.propTypes = {
  label: e.node,
  name: e.string,
  options: e.array,
  value: e.any,
  onChange: e.func,
  required: e.bool,
  disabled: e.bool,
  error: e.node,
  helperText: e.node,
  inline: e.bool,
  className: e.string
};
function Fe({ mode: a = "date", ...n }) {
  const i = { date: "date", time: "time", datetime: "datetime-local", month: "month", week: "week" }[a] || "date";
  return /* @__PURE__ */ t(H, { type: i, ...n });
}
Fe.propTypes = {
  mode: e.oneOf(["date", "time", "datetime", "month", "week"])
};
function fi({
  label: a,
  value: n = {},
  onChange: i,
  fromLabel: r = "From",
  toLabel: l = "To",
  required: s,
  disabled: o,
  error: c,
  helperText: u,
  className: m
}) {
  const p = (h) => (b) => i == null ? void 0 : i({ ...n, [h]: b.target.value });
  return /* @__PURE__ */ d("div", { className: f("mb-3", m), children: [
    a && /* @__PURE__ */ d("div", { className: "form-label", children: [
      a,
      s && /* @__PURE__ */ t("span", { className: "uikit-required", children: "*" })
    ] }),
    /* @__PURE__ */ d("div", { className: "row g-2", children: [
      /* @__PURE__ */ t("div", { className: "col-6", children: /* @__PURE__ */ t(Fe, { className: "mb-0", label: r, value: n.from || "", onChange: p("from"), disabled: o, max: n.to || void 0 }) }),
      /* @__PURE__ */ t("div", { className: "col-6", children: /* @__PURE__ */ t(Fe, { className: "mb-0", label: l, value: n.to || "", onChange: p("to"), disabled: o, min: n.from || void 0 }) })
    ] }),
    c ? /* @__PURE__ */ t("div", { className: "uikit-error", children: c }) : u ? /* @__PURE__ */ t("div", { className: "uikit-helper", children: u }) : null
  ] });
}
fi.propTypes = {
  label: e.node,
  value: e.object,
  onChange: e.func,
  fromLabel: e.string,
  toLabel: e.string,
  required: e.bool,
  disabled: e.bool,
  error: e.node,
  helperText: e.node,
  className: e.string
};
function gi(a) {
  if (!a && a !== 0) return "";
  const n = ["B", "KB", "MB", "GB"];
  let i = a, r = 0;
  for (; i >= 1024 && r < n.length - 1; )
    i /= 1024, r += 1;
  return `${i.toFixed(r === 0 ? 0 : 1)} ${n[r]}`;
}
function yi({
  label: a,
  hint: n = "Drag & drop files here, or click to browse",
  accept: i,
  multiple: r = !1,
  disabled: l = !1,
  error: s,
  helperText: o,
  onChange: c,
  className: u
}) {
  const m = ie(null), [p, h] = x([]), [b, g] = x(!1), k = (y) => {
    const v = r ? [...p, ...Array.from(y)] : Array.from(y).slice(0, 1);
    h(v), c == null || c(v);
  }, N = (y) => {
    const v = p.filter((w, T) => T !== y);
    h(v), c == null || c(v);
  };
  return /* @__PURE__ */ d("div", { className: f("mb-3", u), children: [
    a && /* @__PURE__ */ t("label", { className: "form-label d-block", children: a }),
    /* @__PURE__ */ d(
      "div",
      {
        className: f("uikit-dropzone", b && "is-dragging", l && "opacity-50"),
        onClick: () => {
          var y;
          return !l && ((y = m.current) == null ? void 0 : y.click());
        },
        onDragOver: (y) => {
          y.preventDefault(), g(!0);
        },
        onDragLeave: () => g(!1),
        onDrop: (y) => {
          y.preventDefault(), g(!1), l || k(y.dataTransfer.files);
        },
        role: "button",
        tabIndex: 0,
        onKeyDown: (y) => {
          var v;
          return y.key === "Enter" && ((v = m.current) == null ? void 0 : v.click());
        },
        children: [
          /* @__PURE__ */ t("i", { className: "bi bi-cloud-arrow-up fs-2 text-secondary-soft d-block mb-2", "aria-hidden": "true" }),
          /* @__PURE__ */ t("div", { className: "fw-medium", children: n }),
          i && /* @__PURE__ */ d("div", { className: "uikit-helper", children: [
            "Accepted: ",
            i
          ] }),
          /* @__PURE__ */ t(
            "input",
            {
              ref: m,
              type: "file",
              className: "d-none",
              accept: i,
              multiple: r,
              disabled: l,
              onChange: (y) => k(y.target.files)
            }
          )
        ]
      }
    ),
    p.length > 0 && /* @__PURE__ */ t("ul", { className: "list-unstyled mt-2 mb-0", children: p.map((y, v) => /* @__PURE__ */ d("li", { className: "d-flex align-items-center gap-2 py-2 border-bottom", children: [
      /* @__PURE__ */ t("i", { className: "bi bi-file-earmark text-secondary-soft", "aria-hidden": "true" }),
      /* @__PURE__ */ t("span", { className: "flex-grow-1 text-truncate small", children: y.name }),
      /* @__PURE__ */ t("span", { className: "uikit-helper mt-0", children: gi(y.size) }),
      /* @__PURE__ */ t(E, { icon: "x", size: "sm", variant: "light", label: "Remove", onClick: () => N(v) })
    ] }, `${y.name}-${v}`)) }),
    s ? /* @__PURE__ */ t("div", { className: "uikit-error", children: s }) : o ? /* @__PURE__ */ t("div", { className: "uikit-helper", children: o }) : null
  ] });
}
yi.propTypes = {
  label: e.node,
  hint: e.node,
  accept: e.string,
  multiple: e.bool,
  disabled: e.bool,
  error: e.node,
  helperText: e.node,
  onChange: e.func,
  className: e.string
};
function vi(a = "") {
  let n = 0;
  return a.length >= 8 && (n += 1), a.length >= 12 && (n += 1), /[A-Z]/.test(a) && /[a-z]/.test(a) && (n += 1), /\d/.test(a) && (n += 1), /[^A-Za-z0-9]/.test(a) && (n += 1), Math.min(n, 4);
}
const Ni = ["Very weak", "Weak", "Fair", "Strong", "Very strong"], it = ["var(--danger)", "var(--danger)", "var(--warning)", "var(--info)", "var(--success)"];
function _e({
  id: a,
  label: n = "Password",
  value: i = "",
  onChange: r,
  placeholder: l = "••••••••",
  required: s,
  disabled: o,
  error: c,
  helperText: u,
  size: m = "md",
  strength: p = !1,
  className: h,
  ...b
}) {
  const g = F(), k = a || `password-${g}`, [N, y] = x(!1), v = vi(i);
  return /* @__PURE__ */ d(V, { id: k, label: n, required: s, error: c, helperText: u, children: [
    /* @__PURE__ */ d("div", { className: "input-group", children: [
      /* @__PURE__ */ t(
        "input",
        {
          id: k,
          type: N ? "text" : "password",
          className: f("form-control", m !== "md" && `form-control-${m}`, c && "is-invalid", h),
          value: i,
          onChange: r,
          placeholder: l,
          required: s,
          disabled: o,
          ...b
        }
      ),
      /* @__PURE__ */ t("button", { type: "button", className: "btn btn-light border", onClick: () => y((w) => !w), "aria-label": N ? "Hide password" : "Show password", children: /* @__PURE__ */ t("i", { className: `bi bi-${N ? "eye-slash" : "eye"}` }) })
    ] }),
    p && i && /* @__PURE__ */ d("div", { className: "mt-2", children: [
      /* @__PURE__ */ t("div", { className: "d-flex gap-1", children: [0, 1, 2, 3].map((w) => /* @__PURE__ */ t(
        "span",
        {
          style: { height: 4, flex: 1, borderRadius: 2, background: w < v ? it[v] : "var(--surface-muted)" }
        },
        w
      )) }),
      /* @__PURE__ */ t("div", { className: "uikit-helper", style: { color: it[v] }, children: Ni[v] })
    ] })
  ] });
}
_e.propTypes = {
  id: e.string,
  label: e.node,
  value: e.string,
  onChange: e.func,
  placeholder: e.string,
  required: e.bool,
  disabled: e.bool,
  error: e.node,
  helperText: e.node,
  size: e.string,
  strength: e.bool,
  className: e.string
};
function Lt({ length: a = 6, value: n = "", onChange: i, disabled: r, error: l, label: s, className: o }) {
  const c = ie([]), u = n.padEnd(a).split("").slice(0, a), m = (p, h) => {
    var g;
    const b = u.map((k, N) => N === p ? h : k).join("").trimEnd();
    i == null || i(b), h && p < a - 1 && ((g = c.current[p + 1]) == null || g.focus());
  };
  return /* @__PURE__ */ d("div", { className: f("mb-3", o), children: [
    s && /* @__PURE__ */ t("div", { className: "form-label", children: s }),
    /* @__PURE__ */ t("div", { className: "d-flex gap-2", children: Array.from({ length: a }).map((p, h) => {
      var b;
      return /* @__PURE__ */ t(
        "input",
        {
          ref: (g) => {
            c.current[h] = g;
          },
          className: f("form-control text-center fw-semibold", l && "is-invalid"),
          style: { width: 46, height: 52, fontSize: "1.25rem" },
          inputMode: "numeric",
          maxLength: 1,
          disabled: r,
          value: ((b = u[h]) == null ? void 0 : b.trim()) || "",
          onChange: (g) => m(h, g.target.value.replace(/\D/g, "").slice(-1)),
          onKeyDown: (g) => {
            var k, N;
            g.key === "Backspace" && !((k = u[h]) != null && k.trim()) && h > 0 && ((N = c.current[h - 1]) == null || N.focus());
          },
          onPaste: (g) => {
            g.preventDefault();
            const k = g.clipboardData.getData("text").replace(/\D/g, "").slice(0, a);
            i == null || i(k);
          }
        },
        h
      );
    }) }),
    l && /* @__PURE__ */ t("div", { className: "uikit-error", children: l })
  ] });
}
Lt.propTypes = {
  length: e.number,
  value: e.string,
  onChange: e.func,
  disabled: e.bool,
  error: e.node,
  label: e.node,
  className: e.string
};
function ki({
  id: a,
  label: n,
  value: i = 0,
  onChange: r,
  min: l = 0,
  max: s = 100,
  step: o = 1,
  disabled: c,
  error: u,
  helperText: m,
  showValue: p = !0,
  format: h = (g) => g,
  className: b
}) {
  const g = F(), k = a || `range-${g}`;
  return /* @__PURE__ */ t(V, { id: k, label: n, error: u, helperText: m, className: b, children: /* @__PURE__ */ d("div", { className: "d-flex align-items-center gap-3", children: [
    /* @__PURE__ */ t(
      "input",
      {
        id: k,
        type: "range",
        className: "form-range",
        min: l,
        max: s,
        step: o,
        value: i,
        disabled: c,
        onChange: r
      }
    ),
    p && /* @__PURE__ */ t("span", { className: "uikit-badge", style: { background: "var(--primary-soft)", color: "var(--primary-dark)", minWidth: 48, justifyContent: "center" }, children: h(i) })
  ] }) });
}
ki.propTypes = {
  id: e.string,
  label: e.node,
  value: e.any,
  onChange: e.func,
  min: e.number,
  max: e.number,
  step: e.number,
  disabled: e.bool,
  error: e.node,
  helperText: e.node,
  showValue: e.bool,
  format: e.func,
  className: e.string
};
function wi({
  label: a,
  value: n = 0,
  onChange: i,
  max: r = 5,
  size: l = 20,
  icon: s = "star",
  variant: o = "warning",
  readOnly: c = !1,
  showValue: u = !1,
  className: m
}) {
  const [p, h] = x(0), b = p || n;
  return /* @__PURE__ */ d("div", { className: f("mb-3", m), children: [
    a && /* @__PURE__ */ t("div", { className: "form-label", children: a }),
    /* @__PURE__ */ d("div", { className: "d-flex align-items-center gap-1", children: [
      Array.from({ length: r }).map((g, k) => {
        const N = k + 1;
        return /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            disabled: c,
            "aria-label": `${N} of ${r}`,
            className: "btn p-0 border-0 bg-transparent lh-1",
            style: { fontSize: l, color: N <= b ? `var(--${o})` : "var(--border)", cursor: c ? "default" : "pointer" },
            onMouseEnter: () => !c && h(N),
            onMouseLeave: () => !c && h(0),
            onClick: () => !c && (i == null ? void 0 : i(N)),
            children: /* @__PURE__ */ t("i", { className: `bi bi-${N <= b ? `${s}-fill` : s}` })
          },
          N
        );
      }),
      u && /* @__PURE__ */ d("span", { className: "ms-2 small text-secondary-soft", children: [
        n,
        " / ",
        r
      ] })
    ] })
  ] });
}
wi.propTypes = {
  label: e.node,
  value: e.number,
  onChange: e.func,
  max: e.number,
  size: e.number,
  icon: e.string,
  variant: e.string,
  readOnly: e.bool,
  showValue: e.bool,
  className: e.string
};
const xi = ["#2fdf84", "#8944d7", "#009ce7", "#f8d62b", "#f73164", "#22c571", "#f97316", "#2c323f"];
function _i({
  id: a,
  label: n,
  value: i = "#2fdf84",
  onChange: r,
  swatches: l = xi,
  disabled: s,
  error: o,
  helperText: c,
  className: u
}) {
  const m = F(), p = a || `color-${m}`, h = (b) => r == null ? void 0 : r({ target: { value: b } }, b);
  return /* @__PURE__ */ d(V, { id: p, label: n, error: o, helperText: c, className: u, children: [
    /* @__PURE__ */ d("div", { className: "d-flex align-items-center gap-2 mb-2", children: [
      /* @__PURE__ */ t(
        "input",
        {
          id: p,
          type: "color",
          className: "form-control form-control-color",
          value: i,
          disabled: s,
          onChange: (b) => h(b.target.value)
        }
      ),
      /* @__PURE__ */ t(
        "input",
        {
          className: "form-control",
          value: i,
          disabled: s,
          onChange: (b) => h(b.target.value),
          style: { maxWidth: 130, fontFamily: "var(--font-mono)" }
        }
      )
    ] }),
    /* @__PURE__ */ t("div", { className: "d-flex flex-wrap gap-2", children: l.map((b) => /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        "aria-label": b,
        className: f("uikit-swatch", (i == null ? void 0 : i.toLowerCase()) === b.toLowerCase() && "is-active"),
        style: { background: b, width: 26, height: 26, aspectRatio: "auto" },
        onClick: () => h(b)
      },
      b
    )) })
  ] });
}
_i.propTypes = {
  id: e.string,
  label: e.node,
  value: e.string,
  onChange: e.func,
  swatches: e.array,
  disabled: e.bool,
  error: e.node,
  helperText: e.node,
  className: e.string
};
function Ti({
  id: a,
  label: n,
  value: i = 0,
  onChange: r,
  min: l = 0,
  max: s = 1 / 0,
  step: o = 1,
  disabled: c,
  error: u,
  helperText: m,
  size: p = "md",
  suffix: h,
  className: b
}) {
  const g = F(), k = a || `stepper-${g}`, N = (y) => r == null ? void 0 : r(Math.min(s, Math.max(l, y)));
  return /* @__PURE__ */ t(V, { id: k, label: n, error: u, helperText: m, className: b, children: /* @__PURE__ */ d("div", { className: f("input-group", p !== "md" && `input-group-${p}`), style: { maxWidth: 200 }, children: [
    /* @__PURE__ */ t("button", { type: "button", className: "btn btn-light border", disabled: c || i <= l, onClick: () => N(Number(i) - o), "aria-label": "Decrease", children: /* @__PURE__ */ t("i", { className: "bi bi-dash-lg" }) }),
    /* @__PURE__ */ t(
      "input",
      {
        id: k,
        type: "number",
        className: f("form-control text-center", u && "is-invalid"),
        value: i,
        min: l,
        max: s === 1 / 0 ? void 0 : s,
        step: o,
        disabled: c,
        onChange: (y) => N(Number(y.target.value))
      }
    ),
    h && /* @__PURE__ */ t("span", { className: "input-group-text", children: h }),
    /* @__PURE__ */ t("button", { type: "button", className: "btn btn-light border", disabled: c || i >= s, onClick: () => N(Number(i) + o), "aria-label": "Increase", children: /* @__PURE__ */ t("i", { className: "bi bi-plus-lg" }) })
  ] }) });
}
Ti.propTypes = {
  id: e.string,
  label: e.node,
  value: e.any,
  onChange: e.func,
  min: e.number,
  max: e.number,
  step: e.number,
  disabled: e.bool,
  error: e.node,
  helperText: e.node,
  size: e.string,
  suffix: e.node,
  className: e.string
};
const It = {
  phone: { pattern: "(###) ###-####", digitsOnly: !0 },
  mobile: { pattern: "+## ### ### ####", digitsOnly: !0 },
  date: { pattern: "##/##/####", digitsOnly: !0 },
  card: { pattern: "#### #### #### ####", digitsOnly: !0 },
  time: { pattern: "##:##", digitsOnly: !0 },
  zip: { pattern: "####", digitsOnly: !0 }
};
function Si(a, n) {
  const i = String(a).replace(/\D/g, "");
  let r = "", l = 0;
  for (const s of n) {
    if (l >= i.length) break;
    s === "#" ? (r += i[l], l += 1) : r += s;
  }
  return r;
}
function Ci(a, { locale: n = "en-US", currency: i } = {}) {
  const r = String(a).replace(/[^\d.]/g, "");
  if (!r) return "";
  const l = Number(r);
  return Number.isNaN(l) ? "" : new Intl.NumberFormat(n, i ? { style: "currency", currency: i } : { minimumFractionDigits: 0 }).format(l);
}
function Mt({ mask: a = "phone", pattern: n, currency: i, locale: r, value: l = "", onChange: s, ...o }) {
  return /* @__PURE__ */ t(H, { value: l, onChange: (u) => {
    var h;
    const m = u.target.value, p = a === "currency" ? Ci(m, { locale: r, currency: i }) : Si(m, n || ((h = It[a]) == null ? void 0 : h.pattern) || "####");
    s == null || s({ ...u, target: { ...u.target, value: p } }, p);
  }, inputMode: "numeric", ...o });
}
Mt.MASKS = [...Object.keys(It), "currency", "pattern"];
Mt.propTypes = {
  mask: e.string,
  pattern: e.string,
  currency: e.string,
  locale: e.string,
  value: e.string,
  onChange: e.func
};
function $i({
  label: a,
  value: n = [],
  onChange: i,
  renderRow: r,
  emptyRow: l = {},
  addLabel: s = "Add row",
  min: o = 0,
  max: c = 1 / 0,
  helperText: u,
  className: m
}) {
  const p = (g, k) => i == null ? void 0 : i(n.map((N, y) => y === g ? { ...N, ...k } : N)), h = () => n.length < c && (i == null ? void 0 : i([...n, { ...l }])), b = (g) => n.length > o && (i == null ? void 0 : i(n.filter((k, N) => N !== g)));
  return /* @__PURE__ */ d("div", { className: f("mb-3", m), children: [
    a && /* @__PURE__ */ t("div", { className: "form-label", children: a }),
    n.map((g, k) => /* @__PURE__ */ d("div", { className: "d-flex gap-2 align-items-start mb-2", children: [
      /* @__PURE__ */ t("div", { className: "flex-grow-1", children: r == null ? void 0 : r(g, (N) => p(k, N), k) }),
      /* @__PURE__ */ t(
        E,
        {
          icon: "trash3",
          variant: "light",
          size: "sm",
          label: "Remove row",
          className: "mt-1",
          disabled: n.length <= o,
          onClick: () => b(k)
        }
      )
    ] }, g.id ?? k)),
    /* @__PURE__ */ t(A, { size: "sm", tone: "soft", variant: "primary", icon: "plus-lg", onClick: h, disabled: n.length >= c, children: s }),
    u && /* @__PURE__ */ t("div", { className: "uikit-helper", children: u })
  ] });
}
$i.propTypes = {
  label: e.node,
  value: e.array,
  onChange: e.func,
  renderRow: e.func,
  emptyRow: e.object,
  addLabel: e.string,
  min: e.number,
  max: e.number,
  helperText: e.node,
  className: e.string
};
function Oi({ title: a, subtitle: n, description: i, onSubmit: r, actions: l, columns: s = 1, className: o, children: c }) {
  return /* @__PURE__ */ t(M, { title: a, subtitle: n, footer: l, className: o, children: /* @__PURE__ */ d("form", { onSubmit: r, noValidate: !0, children: [
    i && /* @__PURE__ */ t("p", { className: "text-secondary-soft small mb-3", children: i }),
    s > 1 ? /* @__PURE__ */ t("div", { className: "row", children: c }) : c
  ] }) });
}
Oi.propTypes = {
  title: e.node,
  subtitle: e.node,
  description: e.node,
  onSubmit: e.func,
  actions: e.node,
  columns: e.number,
  className: e.string,
  children: e.node
};
function Ue({ steps: a = [], current: n = 0, variant: i = "horizontal", onStepClick: r, className: l }) {
  var o;
  if (i === "dots")
    return /* @__PURE__ */ t("div", { className: f("d-flex align-items-center justify-content-center gap-2", l), children: a.map((c, u) => /* @__PURE__ */ t(
      "span",
      {
        title: c.label,
        className: "uikit-status-dot",
        style: {
          width: u === n ? 22 : 8,
          height: 8,
          borderRadius: 4,
          background: u <= n ? "var(--primary)" : "var(--border)",
          transition: "var(--transition)"
        }
      },
      c.key || c.label || u
    )) });
  if (i === "progress") {
    const c = a.length > 1 ? n / (a.length - 1) * 100 : 0;
    return /* @__PURE__ */ d("div", { className: l, children: [
      /* @__PURE__ */ d("div", { className: "d-flex justify-content-between mb-2", style: { fontSize: ".75rem" }, children: [
        /* @__PURE__ */ t("span", { className: "fw-semibold", children: (o = a[n]) == null ? void 0 : o.label }),
        /* @__PURE__ */ d("span", { className: "text-secondary-soft", children: [
          "Step ",
          n + 1,
          " of ",
          a.length
        ] })
      ] }),
      /* @__PURE__ */ t("div", { className: "uikit-progress", children: /* @__PURE__ */ t("div", { className: "uikit-progress__bar", style: { width: `${c}%` } }) })
    ] });
  }
  return /* @__PURE__ */ t("ol", { className: f("uikit-stepper", i === "vertical" && "uikit-stepper--vertical", l), children: a.map((c, u) => {
    const m = u < n ? "done" : u === n ? "current" : "todo";
    return /* @__PURE__ */ d("li", { className: f("uikit-stepper__item", `is-${m}`), children: [
      /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          className: "uikit-stepper__marker",
          disabled: !r,
          onClick: () => r == null ? void 0 : r(u),
          "aria-current": m === "current" ? "step" : void 0,
          children: m === "done" ? /* @__PURE__ */ t("i", { className: "bi bi-check-lg" }) : c.icon ? /* @__PURE__ */ t("i", { className: `bi bi-${c.icon}` }) : u + 1
        }
      ),
      /* @__PURE__ */ d("div", { className: "uikit-stepper__text", children: [
        /* @__PURE__ */ t("div", { className: "uikit-stepper__label", children: c.label }),
        c.description && /* @__PURE__ */ t("div", { className: "uikit-helper mt-0", children: c.description })
      ] })
    ] }, c.key || c.label || u);
  }) });
}
Ue.VARIANTS = ["horizontal", "vertical", "dots", "progress"];
Ue.propTypes = {
  steps: e.array,
  current: e.number,
  variant: e.oneOf(["horizontal", "vertical", "dots", "progress"]),
  onStepClick: e.func,
  className: e.string
};
function Ai({
  steps: a = [],
  onFinish: n,
  orientation: i = "horizontal",
  title: r,
  subtitle: l,
  finishLabel: s = "Finish",
  nextLabel: o = "Next",
  backLabel: c = "Back",
  className: u
}) {
  const [m, p] = x(0), [h, b] = x(null), g = a[m], k = m === a.length - 1, N = () => {
    const v = g != null && g.validate ? g.validate() : !0;
    if (v !== !0) {
      b(typeof v == "string" ? v : "Please complete this step.");
      return;
    }
    b(null), k ? n == null || n() : p((w) => w + 1);
  }, y = /* @__PURE__ */ t(
    Ue,
    {
      steps: a,
      current: m,
      variant: i === "vertical" ? "vertical" : "horizontal",
      onStepClick: (v) => v < m && p(v)
    }
  );
  return /* @__PURE__ */ t(
    M,
    {
      title: r,
      subtitle: l,
      className: u,
      footer: /* @__PURE__ */ d("div", { className: "d-flex justify-content-between", children: [
        /* @__PURE__ */ t(A, { variant: "light", icon: "arrow-left", disabled: m === 0, onClick: () => p((v) => v - 1), children: c }),
        /* @__PURE__ */ t(A, { variant: k ? "success" : "primary", icon: k ? "check2" : "arrow-right", iconPosition: "end", onClick: N, children: k ? s : o })
      ] }),
      children: i === "vertical" ? /* @__PURE__ */ d("div", { className: "row g-4", children: [
        /* @__PURE__ */ t("div", { className: "col-md-4", children: y }),
        /* @__PURE__ */ d("div", { className: "col-md-8", children: [
          h && /* @__PURE__ */ t("div", { className: "uikit-error mb-2", children: h }),
          g == null ? void 0 : g.content
        ] })
      ] }) : /* @__PURE__ */ d(U, { children: [
        /* @__PURE__ */ t("div", { className: "mb-4", children: y }),
        h && /* @__PURE__ */ t("div", { className: "uikit-error mb-2", children: h }),
        g == null ? void 0 : g.content
      ] })
    }
  );
}
Ai.propTypes = {
  steps: e.array,
  onFinish: e.func,
  orientation: e.oneOf(["horizontal", "vertical"]),
  title: e.node,
  subtitle: e.node,
  finishLabel: e.string,
  nextLabel: e.string,
  backLabel: e.string,
  className: e.string
};
const Te = {
  create: { icon: "plus-lg", variant: "primary", label: "Add New" },
  edit: { icon: "pencil-square", variant: "info", label: "Edit" },
  delete: { icon: "trash3", variant: "danger", label: "Delete" },
  view: { icon: "eye", variant: "secondary", label: "View" },
  save: { icon: "check2", variant: "success", label: "Save" },
  cancel: { icon: "x-lg", variant: "light", label: "Cancel" },
  export: { icon: "download", variant: "light", label: "Export" },
  import: { icon: "upload", variant: "light", label: "Import" },
  print: { icon: "printer", variant: "light", label: "Print" },
  refresh: { icon: "arrow-clockwise", variant: "light", label: "Refresh" },
  filter: { icon: "funnel", variant: "light", label: "Filter" }
};
function Pt({ action: a = "create", label: n, children: i, ...r }) {
  const l = Te[a] || Te.create;
  return /* @__PURE__ */ t(A, { variant: l.variant, icon: l.icon, ...r, children: i || n || l.label });
}
Pt.ACTIONS = Object.keys(Te);
Pt.propTypes = {
  action: e.oneOf(Object.keys(Te)),
  label: e.string,
  children: e.node
};
function Di({ size: a, vertical: n = !1, ariaLabel: i = "Button group", className: r, children: l }) {
  return /* @__PURE__ */ t(
    "div",
    {
      role: "group",
      "aria-label": i,
      className: f(n ? "btn-group-vertical" : "btn-group", a && `btn-group-${a}`, r),
      children: l
    }
  );
}
Di.propTypes = {
  size: e.oneOf(["sm", "lg"]),
  vertical: e.bool,
  ariaLabel: e.string,
  className: e.string,
  children: e.node
};
function zi({ label: a, icon: n, variant: i = "primary", size: r = "md", onClick: l, items: s = [], align: o = "end", className: c }) {
  return /* @__PURE__ */ d("div", { className: f("btn-group", c), children: [
    /* @__PURE__ */ t(A, { variant: i, size: r, icon: n, onClick: l, children: a }),
    /* @__PURE__ */ t(
      ae,
      {
        align: o,
        items: s,
        trigger: /* @__PURE__ */ t("button", { type: "button", className: f("btn", `btn-${i}`, r !== "md" && `btn-${r}`), "aria-label": "More actions", children: /* @__PURE__ */ t("i", { className: "bi bi-caret-down-fill", style: { fontSize: ".7rem" } }) })
      }
    )
  ] });
}
zi.propTypes = {
  label: e.node,
  icon: e.string,
  variant: e.string,
  size: e.string,
  onClick: e.func,
  items: e.array,
  align: e.oneOf(["start", "end"]),
  className: e.string
};
function ji({ icon: a = "plus-lg", label: n, variant: i = "primary", inline: r = !1, className: l, ...s }) {
  return /* @__PURE__ */ t(
    "button",
    {
      type: "button",
      "aria-label": n || a,
      title: n,
      className: f("uikit-fab", r && "uikit-fab--inline", l),
      style: { background: `var(--${i})`, color: i === "primary" ? "var(--on-primary)" : "#fff" },
      ...s,
      children: /* @__PURE__ */ t("i", { className: `bi bi-${a}`, "aria-hidden": "true" })
    }
  );
}
ji.propTypes = {
  icon: e.string,
  label: e.string,
  variant: e.string,
  inline: e.bool,
  className: e.string
};
function Li({ options: a = [], value: n, defaultValue: i, onChange: r, className: l }) {
  var p;
  const s = a.map((h) => typeof h == "object" ? h : { value: h, label: h }), [o, c] = x(i ?? ((p = s[0]) == null ? void 0 : p.value)), u = n ?? o, m = (h) => {
    n === void 0 && c(h), r == null || r(h);
  };
  return /* @__PURE__ */ t("div", { className: f("uikit-toggle-group", l), role: "group", children: s.map((h) => /* @__PURE__ */ d(
    "button",
    {
      type: "button",
      "aria-pressed": h.value === u,
      className: f("uikit-toggle-group__item", h.value === u && "is-active"),
      onClick: () => m(h.value),
      children: [
        h.icon && /* @__PURE__ */ t("i", { className: `bi bi-${h.icon} me-1` }),
        h.label
      ]
    },
    h.value
  )) });
}
Li.propTypes = {
  options: e.array,
  value: e.any,
  defaultValue: e.any,
  onChange: e.func,
  className: e.string
};
function Ii({ value: a, label: n = "Copy", copiedLabel: i = "Copied", size: r = "sm", variant: l = "light", tone: s = "solid", className: o }) {
  const [c, u] = x(!1);
  return /* @__PURE__ */ t(A, { size: r, variant: c ? "success" : l, tone: s, icon: c ? "check2" : "clipboard", onClick: async () => {
    try {
      await navigator.clipboard.writeText(String(a ?? "")), u(!0), window.setTimeout(() => u(!1), 1600);
    } catch {
    }
  }, className: o, children: c ? i : n });
}
Ii.propTypes = {
  value: e.any,
  label: e.string,
  copiedLabel: e.string,
  size: e.string,
  variant: e.string,
  tone: e.string,
  className: e.string
};
const Se = {
  google: { icon: "google", color: "#ea4335", label: "Google" },
  facebook: { icon: "facebook", color: "#1877f2", label: "Facebook" },
  github: { icon: "github", color: "#24292f", label: "GitHub" },
  microsoft: { icon: "microsoft", color: "#00a4ef", label: "Microsoft" },
  apple: { icon: "apple", color: "#000000", label: "Apple" },
  twitter: { icon: "twitter-x", color: "#000000", label: "X" },
  linkedin: { icon: "linkedin", color: "#0a66c2", label: "LinkedIn" }
};
function Et({ brand: a = "google", label: n, filled: i = !1, block: r = !1, className: l, ...s }) {
  const o = Se[a] || Se.google;
  return /* @__PURE__ */ d(
    "button",
    {
      type: "button",
      className: f("btn d-inline-flex align-items-center justify-content-center gap-2", r && "w-100", l),
      style: i ? { background: o.color, color: "#fff", border: 0 } : { background: "var(--surface)", color: "var(--text-primary)", border: "1px solid var(--border)" },
      ...s,
      children: [
        /* @__PURE__ */ t("i", { className: `bi bi-${o.icon}`, style: i ? void 0 : { color: o.color }, "aria-hidden": "true" }),
        /* @__PURE__ */ t("span", { children: n || `Continue with ${o.label}` })
      ]
    }
  );
}
Et.BRANDS = Object.keys(Se);
Et.propTypes = {
  brand: e.oneOf(Object.keys(Se)),
  label: e.string,
  filled: e.bool,
  block: e.bool,
  className: e.string
};
const nt = {
  primary: "info-circle-fill",
  secondary: "info-circle-fill",
  success: "check-circle-fill",
  danger: "exclamation-octagon-fill",
  warning: "exclamation-triangle-fill",
  info: "info-circle-fill"
};
function Ye({
  variant: a = "primary",
  tone: n = "soft",
  title: i,
  icon: r,
  showIcon: l = !0,
  actions: s,
  banner: o = !1,
  onClose: c,
  className: u,
  children: m
}) {
  const p = {
    solid: { background: `var(--${a})`, color: a === "warning" ? "#4a3c00" : "#fff", border: 0 },
    soft: { background: `var(--${a}-soft, var(--surface-muted))`, color: `var(--${a})`, border: "1px solid transparent" },
    outline: { background: "transparent", color: `var(--${a})`, border: `1px solid var(--${a})` }
  }[n];
  return /* @__PURE__ */ d(
    "div",
    {
      className: f("alert d-flex gap-3", o && "rounded-0 mb-0", c && "alert-dismissible", u),
      style: p,
      role: "alert",
      children: [
        l && /* @__PURE__ */ t("i", { className: `bi bi-${r || nt[a] || nt.primary} fs-5 lh-1 mt-1`, "aria-hidden": "true" }),
        /* @__PURE__ */ d("div", { className: "flex-grow-1", children: [
          i && /* @__PURE__ */ t("div", { className: "fw-semibold mb-1", children: i }),
          m && /* @__PURE__ */ t("div", { className: "small", children: m }),
          s && /* @__PURE__ */ t("div", { className: "d-flex gap-2 mt-2", children: s })
        ] }),
        c && /* @__PURE__ */ t("button", { type: "button", className: "btn-close", "aria-label": "Close", onClick: c })
      ]
    }
  );
}
Ye.TONES = ["solid", "soft", "outline"];
Ye.propTypes = {
  variant: e.string,
  tone: e.oneOf(["solid", "soft", "outline"]),
  actions: e.node,
  banner: e.bool,
  title: e.node,
  icon: e.string,
  showIcon: e.bool,
  onClose: e.func,
  className: e.string,
  children: e.node
};
function Mi({ variant: a = "success", size: n = 8, pulse: i = !1, label: r, className: l }) {
  const s = /* @__PURE__ */ t(
    "span",
    {
      className: f("uikit-status-dot", i && "uikit-status-dot--pulse", l),
      style: { width: n, height: n, background: `var(--${a})`, color: `var(--${a})` }
    }
  );
  return r ? /* @__PURE__ */ d("span", { className: "d-inline-flex align-items-center gap-2", style: { fontSize: ".8125rem" }, children: [
    s,
    r
  ] }) : s;
}
Mi.propTypes = {
  variant: e.string,
  size: e.number,
  pulse: e.bool,
  label: e.node,
  className: e.string
};
const rt = { sm: "1rem", md: "1.75rem", lg: "2.75rem" };
function Pi({ size: a = "md", variant: n = "primary", label: i, center: r = !1, grow: l = !1, className: s }) {
  const o = rt[a] || rt.md, c = /* @__PURE__ */ t(
    "div",
    {
      className: f(l ? "spinner-grow" : "spinner-border", s),
      role: "status",
      style: { width: o, height: o, color: `var(--${n})` },
      children: /* @__PURE__ */ t("span", { className: "visually-hidden", children: i || "Loading" })
    }
  );
  return !r && !i ? c : /* @__PURE__ */ d("div", { className: f("d-flex flex-column align-items-center gap-2", r && "justify-content-center py-4"), children: [
    c,
    i && /* @__PURE__ */ t("span", { className: "small text-secondary-soft", children: i })
  ] });
}
Pi.propTypes = {
  size: e.oneOf(["sm", "md", "lg"]),
  variant: e.string,
  label: e.string,
  center: e.bool,
  grow: e.bool,
  className: e.string
};
function Ei({
  code: a,
  title: n = "Something went wrong",
  description: i = "The request could not be completed. Please try again.",
  onRetry: r,
  ...l
}) {
  return /* @__PURE__ */ t(
    ye,
    {
      icon: "exclamation-octagon",
      title: a ? `${a} — ${n}` : n,
      description: i,
      action: r ? { label: "Try again", icon: "arrow-clockwise", onClick: r } : void 0,
      ...l
    }
  );
}
Ei.propTypes = {
  code: e.oneOfType([e.string, e.number]),
  title: e.node,
  description: e.node,
  onRetry: e.func
};
const lt = {
  primary: "bell-fill",
  success: "check-circle-fill",
  danger: "exclamation-octagon-fill",
  warning: "exclamation-triangle-fill",
  info: "info-circle-fill",
  secondary: "bell-fill"
};
function Rt({ title: a, message: n, variant: i = "primary", icon: r, onDismiss: l, className: s }) {
  return /* @__PURE__ */ d("div", { className: f("uikit-toast", s), role: "status", style: { borderLeftColor: `var(--${i})` }, children: [
    /* @__PURE__ */ t(
      "i",
      {
        className: `bi bi-${r || lt[i] || lt.primary} fs-5 lh-1`,
        style: { color: `var(--${i})` },
        "aria-hidden": "true"
      }
    ),
    /* @__PURE__ */ d("div", { className: "flex-grow-1", children: [
      a && /* @__PURE__ */ t("div", { className: "fw-semibold", style: { fontSize: ".8125rem" }, children: a }),
      n && /* @__PURE__ */ t("div", { className: "small text-secondary-soft", children: n })
    ] }),
    l && /* @__PURE__ */ t("button", { type: "button", className: "btn-close btn-sm", "aria-label": "Close", onClick: l })
  ] });
}
function Ri({ toasts: a = [], onDismiss: n, position: i = "top-end" }) {
  return a.length ? /* @__PURE__ */ t("div", { className: f("uikit-toast-stack", `uikit-toast-stack--${i}`), children: a.map((r) => /* @__PURE__ */ t(Rt, { ...r, onDismiss: n ? () => n(r.id) : void 0 }, r.id)) }) : null;
}
Rt.propTypes = {
  title: e.node,
  message: e.node,
  variant: e.string,
  icon: e.string,
  onDismiss: e.func,
  className: e.string
};
Ri.propTypes = {
  toasts: e.arrayOf(e.object),
  onDismiss: e.func,
  position: e.oneOf(["top-end", "top-start", "bottom-end"])
};
function Ft({
  open: a,
  onClose: n,
  title: i,
  size: r = "md",
  footer: l,
  closeOnBackdrop: s = !0,
  scrollable: o = !1,
  children: c,
  className: u
}) {
  return R(() => {
    if (!a) return;
    const m = (p) => p.key === "Escape" && (n == null ? void 0 : n());
    return document.addEventListener("keydown", m), document.body.style.overflow = "hidden", () => {
      document.removeEventListener("keydown", m), document.body.style.overflow = "";
    };
  }, [a, n]), a ? ge(
    /* @__PURE__ */ d("div", { className: "uikit-modal", role: "dialog", "aria-modal": "true", "aria-label": typeof i == "string" ? i : "Dialog", children: [
      /* @__PURE__ */ t("div", { className: "uikit-backdrop", onClick: s ? n : void 0 }),
      /* @__PURE__ */ t("div", { className: f("uikit-modal__dialog", r !== "md" && `uikit-modal__dialog--${r}`, u), children: /* @__PURE__ */ d("div", { className: "uikit-modal__content", children: [
        (i || n) && /* @__PURE__ */ d("div", { className: "uikit-card__header", children: [
          /* @__PURE__ */ t("h5", { className: "uikit-card__title", children: i }),
          n && /* @__PURE__ */ t("button", { type: "button", className: "btn-close", "aria-label": "Close", onClick: n })
        ] }),
        /* @__PURE__ */ t("div", { className: "uikit-card__body", style: o ? { maxHeight: "60vh", overflowY: "auto" } : void 0, children: c }),
        l && /* @__PURE__ */ t("div", { className: "uikit-card__footer d-flex justify-content-end gap-2", children: l })
      ] }) })
    ] }),
    document.body
  ) : null;
}
Ft.propTypes = {
  open: e.bool,
  onClose: e.func,
  title: e.node,
  size: e.oneOf(["sm", "md", "lg", "xl", "fullscreen"]),
  footer: e.node,
  closeOnBackdrop: e.bool,
  scrollable: e.bool,
  children: e.node,
  className: e.string
};
function Fi({
  open: a,
  onClose: n,
  onConfirm: i,
  title: r = "Are you sure?",
  message: l = "This action cannot be undone.",
  confirmLabel: s = "Confirm",
  cancelLabel: o = "Cancel",
  variant: c = "danger",
  icon: u = "exclamation-triangle",
  loading: m = !1
}) {
  return /* @__PURE__ */ t(
    Ft,
    {
      open: a,
      onClose: n,
      size: "sm",
      title: null,
      footer: /* @__PURE__ */ d(U, { children: [
        /* @__PURE__ */ t(A, { variant: "light", onClick: n, children: o }),
        /* @__PURE__ */ t(A, { variant: c, loading: m, onClick: i, children: s })
      ] }),
      children: /* @__PURE__ */ d("div", { className: "text-center py-2", children: [
        /* @__PURE__ */ t(
          "div",
          {
            className: "d-inline-flex align-items-center justify-content-center mb-3",
            style: {
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: `var(--${c}-soft, var(--surface-muted))`,
              color: `var(--${c})`,
              fontSize: 28
            },
            children: /* @__PURE__ */ t("i", { className: `bi bi-${u}`, "aria-hidden": "true" })
          }
        ),
        /* @__PURE__ */ t("h5", { className: "mb-2", children: r }),
        /* @__PURE__ */ t("p", { className: "text-secondary-soft small mb-0", children: l })
      ] })
    }
  );
}
Fi.propTypes = {
  open: e.bool,
  onClose: e.func,
  onConfirm: e.func,
  title: e.node,
  message: e.node,
  confirmLabel: e.string,
  cancelLabel: e.string,
  variant: e.string,
  icon: e.string,
  loading: e.bool
};
function Bi({ title: a, content: n, placement: i = "top", trigger: r = "click", width: l = 240, className: s, children: o }) {
  const [c, u] = x(!1), m = ie(null);
  Ce(m, () => u(!1), c && r === "click");
  const p = r === "hover" ? { onMouseEnter: () => u(!0), onMouseLeave: () => u(!1) } : { onClick: () => u((h) => !h) };
  return /* @__PURE__ */ d("span", { className: f("uikit-tooltip-wrap", s), ref: m, ...p, children: [
    o,
    c && /* @__PURE__ */ d("span", { className: f("uikit-popover", `uikit-tooltip--${i}`), style: { width: l }, role: "dialog", children: [
      a && /* @__PURE__ */ t("span", { className: "uikit-popover__title", children: a }),
      /* @__PURE__ */ t("span", { className: "uikit-popover__body", children: n })
    ] })
  ] });
}
Bi.propTypes = {
  title: e.node,
  content: e.node,
  placement: e.oneOf(["top", "bottom", "left", "right"]),
  trigger: e.oneOf(["click", "hover"]),
  width: e.oneOfType([e.string, e.number]),
  className: e.string,
  children: e.node
};
function qi({ items: a = [], disabled: n = !1, className: i, children: r }) {
  const [l, s] = x(null);
  return R(() => {
    if (!l) return;
    const o = () => s(null);
    return document.addEventListener("click", o), document.addEventListener("scroll", o, !0), () => {
      document.removeEventListener("click", o), document.removeEventListener("scroll", o, !0);
    };
  }, [l]), /* @__PURE__ */ d(U, { children: [
    /* @__PURE__ */ t(
      "div",
      {
        className: i,
        onContextMenu: (o) => {
          n || (o.preventDefault(), s({ x: o.clientX, y: o.clientY }));
        },
        children: r
      }
    ),
    l && ge(
      /* @__PURE__ */ t(
        "div",
        {
          className: "uikit-dropdown__menu",
          style: { position: "fixed", top: l.y, left: l.x, minWidth: 190 },
          children: a.map(
            (o, c) => o.divider ? /* @__PURE__ */ t("hr", { className: "my-1" }, `divider-${c}`) : /* @__PURE__ */ d(
              "button",
              {
                type: "button",
                className: f("uikit-dropdown__item", o.danger && "is-danger"),
                onClick: () => {
                  var u;
                  (u = o.onClick) == null || u.call(o), s(null);
                },
                children: [
                  o.icon && /* @__PURE__ */ t("i", { className: `bi bi-${o.icon}` }),
                  /* @__PURE__ */ t("span", { className: "flex-grow-1", children: o.label }),
                  o.shortcut && /* @__PURE__ */ t("kbd", { className: "uikit-kbd", children: o.shortcut })
                ]
              },
              o.label
            )
          )
        }
      ),
      document.body
    )
  ] });
}
qi.propTypes = {
  items: e.array,
  disabled: e.bool,
  className: e.string,
  children: e.node
};
function Vi({
  commands: a = [],
  open: n,
  onOpenChange: i,
  placeholder: r = "Type a command or search…",
  hotkey: l = "k"
}) {
  const [s, o] = x(!1), c = n ?? s, u = (v) => {
    o(v), i == null || i(v);
  }, [m, p] = x(""), [h, b] = x(0);
  R(() => {
    const v = (w) => {
      (w.metaKey || w.ctrlKey) && w.key.toLowerCase() === l && (w.preventDefault(), u(!c)), w.key === "Escape" && c && u(!1);
    };
    return document.addEventListener("keydown", v), () => document.removeEventListener("keydown", v);
  });
  const g = q(() => {
    const v = m.trim().toLowerCase();
    return a.filter((w) => !v || `${w.label} ${w.group || ""} ${w.keywords || ""}`.toLowerCase().includes(v));
  }, [a, m]), k = q(() => {
    const v = /* @__PURE__ */ new Map();
    return g.forEach((w) => {
      const T = w.group || "Commands";
      v.has(T) || v.set(T, []), v.get(T).push(w);
    }), [...v.entries()];
  }, [g]);
  if (!c) return null;
  const N = (v) => {
    var w;
    u(!1), p(""), (w = v.onRun) == null || w.call(v, v);
  };
  let y = -1;
  return ge(
    /* @__PURE__ */ d("div", { className: "uikit-modal", role: "dialog", "aria-modal": "true", "aria-label": "Command palette", children: [
      /* @__PURE__ */ t("div", { className: "uikit-backdrop", onClick: () => u(!1) }),
      /* @__PURE__ */ t("div", { className: "uikit-modal__dialog uikit-modal__dialog--lg", style: { marginTop: "12vh", maxWidth: 620 }, children: /* @__PURE__ */ d("div", { className: "uikit-modal__content overflow-hidden", children: [
        /* @__PURE__ */ d("div", { className: "d-flex align-items-center gap-2 px-3 py-3 border-bottom", children: [
          /* @__PURE__ */ t("i", { className: "bi bi-search text-secondary-soft" }),
          /* @__PURE__ */ t(
            "input",
            {
              autoFocus: !0,
              className: "border-0 flex-grow-1 bg-transparent",
              style: { outline: "none", color: "inherit", fontSize: ".9375rem" },
              placeholder: r,
              value: m,
              onChange: (v) => {
                p(v.target.value), b(0);
              },
              onKeyDown: (v) => {
                v.key === "ArrowDown" && (v.preventDefault(), b((w) => Math.min(w + 1, g.length - 1))), v.key === "ArrowUp" && (v.preventDefault(), b((w) => Math.max(w - 1, 0))), v.key === "Enter" && g[h] && N(g[h]);
              }
            }
          ),
          /* @__PURE__ */ t("kbd", { className: "uikit-kbd", children: "esc" })
        ] }),
        /* @__PURE__ */ d("div", { className: "uikit-scroll-y p-2", style: { maxHeight: 380 }, children: [
          g.length === 0 && /* @__PURE__ */ t("div", { className: "text-center text-secondary-soft py-4 small", children: "No commands found" }),
          k.map(([v, w]) => /* @__PURE__ */ d("div", { children: [
            /* @__PURE__ */ t("div", { className: "uikit-dropdown__header", children: v }),
            w.map((T) => {
              y += 1;
              const C = y;
              return /* @__PURE__ */ d(
                "button",
                {
                  type: "button",
                  className: f("uikit-dropdown__item", C === h && "is-active-command"),
                  onMouseEnter: () => b(C),
                  onClick: () => N(T),
                  children: [
                    T.icon && /* @__PURE__ */ t("i", { className: `bi bi-${T.icon}` }),
                    /* @__PURE__ */ t("span", { className: "flex-grow-1", children: T.label }),
                    T.shortcut && /* @__PURE__ */ t("kbd", { className: "uikit-kbd", children: T.shortcut })
                  ]
                },
                T.label
              );
            })
          ] }, v))
        ] })
      ] }) })
    ] }),
    document.body
  );
}
Vi.propTypes = {
  commands: e.array,
  open: e.bool,
  onOpenChange: e.func,
  placeholder: e.string,
  hotkey: e.string
};
function Bt({ images: a = [], index: n = 0, open: i, onClose: r }) {
  const [l, s] = x(n);
  if (R(() => s(n), [n]), R(() => {
    if (!i) return;
    const c = (u) => {
      u.key === "Escape" && (r == null || r()), u.key === "ArrowRight" && s((m) => (m + 1) % a.length), u.key === "ArrowLeft" && s((m) => (m - 1 + a.length) % a.length);
    };
    return document.addEventListener("keydown", c), () => document.removeEventListener("keydown", c);
  }, [i, a.length, r]), !i || !a.length) return null;
  const o = a[l];
  return ge(
    /* @__PURE__ */ d("div", { className: "uikit-lightbox", role: "dialog", "aria-modal": "true", children: [
      /* @__PURE__ */ t("button", { type: "button", className: "uikit-lightbox__close btn-close btn-close-white", "aria-label": "Close", onClick: r }),
      /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          className: "uikit-lightbox__nav uikit-lightbox__nav--prev",
          "aria-label": "Previous",
          onClick: () => s((c) => (c - 1 + a.length) % a.length),
          children: /* @__PURE__ */ t("i", { className: "bi bi-chevron-left" })
        }
      ),
      /* @__PURE__ */ d("figure", { className: "uikit-lightbox__figure", children: [
        /* @__PURE__ */ t("img", { src: o.src, alt: o.alt || "" }),
        o.caption && /* @__PURE__ */ t("figcaption", { children: o.caption }),
        /* @__PURE__ */ d("span", { className: "uikit-lightbox__count", children: [
          l + 1,
          " / ",
          a.length
        ] })
      ] }),
      /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          className: "uikit-lightbox__nav uikit-lightbox__nav--next",
          "aria-label": "Next",
          onClick: () => s((c) => (c + 1) % a.length),
          children: /* @__PURE__ */ t("i", { className: "bi bi-chevron-right" })
        }
      )
    ] }),
    document.body
  );
}
Bt.propTypes = {
  images: e.array,
  index: e.number,
  open: e.bool,
  onClose: e.func
};
function Wi({ items: a = [], activeKey: n, defaultActiveKey: i, onChange: r, variant: l = "underline", fill: s = !1, className: o }) {
  var b;
  const [c, u] = x(i || ((b = a[0]) == null ? void 0 : b.key)), m = n ?? c, p = a.find((g) => g.key === m) || a[0], h = (g) => {
    n === void 0 && u(g), r == null || r(g);
  };
  return /* @__PURE__ */ d("div", { className: f(l === "vertical" && "d-flex gap-3", o), children: [
    /* @__PURE__ */ t(
      "div",
      {
        className: f(
          "uikit-tabs",
          l === "pills" && "uikit-tabs--pills",
          l === "boxed" && "uikit-tabs--boxed",
          l === "vertical" && "uikit-tabs--vertical",
          l === "icons" && "uikit-tabs--icons",
          s && "w-100"
        ),
        role: "tablist",
        children: a.map((g) => /* @__PURE__ */ d(
          "button",
          {
            type: "button",
            role: "tab",
            "aria-selected": g.key === m,
            disabled: g.disabled,
            title: l === "icons" ? g.label : void 0,
            className: f("uikit-tabs__item d-inline-flex align-items-center gap-2", s && "flex-fill justify-content-center", g.key === m && "is-active"),
            onClick: () => h(g.key),
            children: [
              g.icon && /* @__PURE__ */ t("i", { className: `bi bi-${g.icon}`, "aria-hidden": "true" }),
              l !== "icons" && g.label,
              g.badge
            ]
          },
          g.key
        ))
      }
    ),
    (p == null ? void 0 : p.content) && /* @__PURE__ */ t("div", { className: l === "vertical" ? "flex-grow-1" : "pt-3", role: "tabpanel", children: p.content })
  ] });
}
Wi.propTypes = {
  items: e.arrayOf(e.object),
  activeKey: e.string,
  defaultActiveKey: e.string,
  onChange: e.func,
  variant: e.oneOf(["underline", "pills", "boxed", "vertical", "icons"]),
  fill: e.bool,
  className: e.string
};
function Ki({ items: a = [], defaultOpenKeys: n = [], allowMultiple: i = !1, className: r }) {
  const [l, s] = x(n), o = (c) => s((u) => u.includes(c) ? u.filter((m) => m !== c) : i ? [...u, c] : [c]);
  return /* @__PURE__ */ t("div", { className: r, children: a.map((c) => {
    const u = l.includes(c.key);
    return /* @__PURE__ */ d("div", { className: "uikit-accordion__item", children: [
      /* @__PURE__ */ d(
        "button",
        {
          type: "button",
          className: f("uikit-accordion__header", u && "is-open"),
          onClick: () => o(c.key),
          "aria-expanded": u,
          children: [
            c.icon && /* @__PURE__ */ t("i", { className: `bi bi-${c.icon}`, "aria-hidden": "true" }),
            /* @__PURE__ */ t("span", { className: "flex-grow-1", children: c.title }),
            /* @__PURE__ */ t("i", { className: `bi bi-chevron-${u ? "up" : "down"}`, style: { fontSize: ".75rem" }, "aria-hidden": "true" })
          ]
        }
      ),
      u && /* @__PURE__ */ t("div", { className: "uikit-accordion__body", children: c.content })
    ] }, c.key);
  }) });
}
Ki.propTypes = {
  items: e.arrayOf(e.object),
  defaultOpenKeys: e.arrayOf(e.string),
  allowMultiple: e.bool,
  className: e.string
};
Sa.register(
  Ca,
  $a,
  Oa,
  Aa,
  Da,
  za,
  ja,
  La,
  Ia,
  Ma
);
function K(a, n = "#2fdf84") {
  if (typeof window > "u") return n;
  const i = getComputedStyle(document.documentElement).getPropertyValue(a);
  return (i == null ? void 0 : i.trim()) || n;
}
function ce() {
  return [
    K("--primary", "#2fdf84"),
    K("--secondary", "#8944d7"),
    K("--info", "#009ce7"),
    K("--warning", "#f8d62b"),
    K("--danger", "#f73164"),
    K("--success", "#22c571"),
    "#7366ff",
    "#ff9f43"
  ];
}
const Dn = ["#2fdf84", "#8944d7", "#009ce7", "#f8d62b", "#f73164", "#22c571", "#7366ff", "#ff9f43"];
function ve(a, n) {
  if (a.startsWith("rgb")) return a.replace(/rgba?\(([^)]+)\)/, (c, u) => `rgba(${u.split(",").slice(0, 3).join(",")}, ${n})`);
  const i = a.replace("#", ""), r = i.length === 3 ? i.split("").map((c) => c + c).join("") : i, [l, s, o] = [0, 2, 4].map((c) => parseInt(r.slice(c, c + 2), 16));
  return `rgba(${l}, ${s}, ${o}, ${n})`;
}
function de({ legend: a = !0, legendPosition: n = "bottom", grid: i = !0, stacked: r = !1, radial: l = !1 } = {}) {
  const s = K("--border-soft", "#eaeaea"), o = K("--text-muted", "#9aa2ab"), c = K("--surface-inverse", "#2c323f"), u = {
    responsive: !0,
    maintainAspectRatio: !1,
    interaction: { intersect: !1, mode: "index" },
    plugins: {
      legend: {
        display: a,
        position: n,
        labels: { usePointStyle: !0, boxWidth: 8, font: { size: 11 }, color: o }
      },
      tooltip: {
        backgroundColor: c,
        padding: 10,
        cornerRadius: 6,
        titleFont: { size: 12 },
        bodyFont: { size: 11 }
      }
    }
  };
  return l ? (u.scales = {
    r: {
      grid: { color: s },
      angleLines: { color: s },
      pointLabels: { color: o, font: { size: 11 } },
      ticks: { display: !1, backdropColor: "transparent" }
    }
  }, u) : (i && (u.scales = {
    x: { stacked: r, grid: { display: !1 }, ticks: { color: o, font: { size: 11 } } },
    y: { stacked: r, beginAtZero: !0, grid: { color: s }, border: { display: !1 }, ticks: { color: o, font: { size: 11 } } }
  }), u);
}
function Hi({ labels: a = [], datasets: n = [], area: i = !1, smooth: r = !0, legend: l = !0, options: s }) {
  const o = ce(), c = {
    labels: a,
    datasets: n.map((u, m) => {
      const p = u.color || o[m % o.length];
      return {
        tension: r ? 0.4 : 0,
        borderWidth: 2,
        pointRadius: 3,
        pointHoverRadius: 5,
        pointBackgroundColor: "#fff",
        borderColor: p,
        backgroundColor: i ? ve(p, 0.14) : p,
        fill: i,
        ...u
      };
    })
  };
  return /* @__PURE__ */ t(ut, { data: c, options: { ...de({ legend: l }), ...s } });
}
Hi.propTypes = {
  labels: e.array,
  datasets: e.array,
  area: e.bool,
  smooth: e.bool,
  legend: e.bool,
  options: e.object
};
function Ui({ labels: a = [], datasets: n = [], stacked: i = !1, horizontal: r = !1, legend: l = !0, options: s }) {
  const o = ce(), c = {
    labels: a,
    datasets: n.map((u, m) => ({
      backgroundColor: u.color || o[m % o.length],
      borderRadius: 6,
      borderSkipped: !1,
      barPercentage: 0.7,
      categoryPercentage: 0.7,
      ...u
    }))
  };
  return /* @__PURE__ */ t(
    mt,
    {
      data: c,
      options: {
        ...de({ legend: l, stacked: i }),
        indexAxis: r ? "y" : "x",
        ...s
      }
    }
  );
}
Ui.propTypes = {
  labels: e.array,
  datasets: e.array,
  stacked: e.bool,
  horizontal: e.bool,
  legend: e.bool,
  options: e.object
};
function Yi({ labels: a = [], data: n = [], colors: i, legend: r = !0, legendPosition: l = "bottom", options: s }) {
  const o = ce(), c = {
    labels: a,
    datasets: [{
      data: n,
      backgroundColor: i || o.slice(0, n.length),
      borderColor: "var(--surface)",
      borderWidth: 2
    }]
  };
  return /* @__PURE__ */ t(Na, { data: c, options: { ...de({ legend: r, legendPosition: l, grid: !1 }), ...s } });
}
Yi.propTypes = {
  labels: e.array,
  data: e.array,
  colors: e.array,
  legend: e.bool,
  legendPosition: e.string,
  options: e.object
};
function Ji({
  labels: a = [],
  data: n = [],
  colors: i,
  cutout: r = "68%",
  legend: l = !0,
  legendPosition: s = "bottom",
  centerLabel: o,
  centerValue: c,
  options: u
}) {
  const m = ce(), p = {
    labels: a,
    datasets: [{
      data: n,
      backgroundColor: i || m.slice(0, n.length),
      borderColor: "var(--surface)",
      borderWidth: 2
    }]
  }, h = /* @__PURE__ */ t(ka, { data: p, options: { ...de({ legend: l, legendPosition: s, grid: !1 }), cutout: r, ...u } });
  return !c && !o ? h : /* @__PURE__ */ d("div", { className: "position-relative h-100", children: [
    h,
    /* @__PURE__ */ d(
      "div",
      {
        className: "position-absolute top-50 start-50 translate-middle text-center",
        style: { pointerEvents: "none", marginTop: l && s === "bottom" ? -14 : 0 },
        children: [
          /* @__PURE__ */ t("div", { className: "fw-semibold", style: { fontSize: "1.25rem" }, children: c }),
          o && /* @__PURE__ */ t("div", { className: "uikit-helper mt-0", children: o })
        ]
      }
    )
  ] });
}
Ji.propTypes = {
  labels: e.array,
  data: e.array,
  colors: e.array,
  cutout: e.string,
  legend: e.bool,
  legendPosition: e.string,
  centerLabel: e.node,
  centerValue: e.node,
  options: e.object
};
function Gi({ labels: a = [], datasets: n = [], legend: i = !0, options: r }) {
  const l = ce(), s = {
    labels: a,
    datasets: n.map((o, c) => {
      const u = o.color || l[c % l.length];
      return {
        borderColor: u,
        backgroundColor: ve(u, 0.18),
        pointBackgroundColor: u,
        borderWidth: 2,
        ...o
      };
    })
  };
  return /* @__PURE__ */ t(wa, { data: s, options: { ...de({ legend: i, radial: !0 }), ...r } });
}
Gi.propTypes = { labels: e.array, datasets: e.array, legend: e.bool, options: e.object };
function Zi({ labels: a = [], data: n = [], legend: i = !0, options: r }) {
  const l = ce(), s = {
    labels: a,
    datasets: [{ data: n, backgroundColor: n.map((o, c) => ve(l[c % l.length], 0.7)), borderWidth: 0 }]
  };
  return /* @__PURE__ */ t(xa, { data: s, options: { ...de({ legend: i, radial: !0 }), ...r } });
}
Zi.propTypes = { labels: e.array, data: e.array, legend: e.bool, options: e.object };
function Qi({ datasets: a = [], bubble: n = !1, legend: i = !0, options: r }) {
  const l = ce(), s = n ? _a : Ta, o = {
    datasets: a.map((c, u) => {
      const m = c.color || l[u % l.length];
      return { backgroundColor: ve(m, 0.6), borderColor: m, ...c };
    })
  };
  return /* @__PURE__ */ t(s, { data: o, options: { ...de({ legend: i }), ...r } });
}
Qi.propTypes = { datasets: e.array, bubble: e.bool, legend: e.bool, options: e.object };
function Xi({ data: a = [], color: n, variant: i = "line", height: r = 42, area: l = !0 }) {
  const s = n || K("--primary"), o = i === "bar" ? mt : ut, c = {
    labels: a.map((m, p) => p),
    datasets: [{
      data: a,
      borderColor: s,
      backgroundColor: i === "bar" ? s : l ? ve(s, 0.18) : "transparent",
      fill: i !== "bar" && l,
      tension: 0.4,
      borderWidth: 2,
      pointRadius: 0,
      borderRadius: i === "bar" ? 3 : void 0
    }]
  };
  return /* @__PURE__ */ t("div", { style: { height: r }, children: /* @__PURE__ */ t(o, { data: c, options: {
    responsive: !0,
    maintainAspectRatio: !1,
    plugins: { legend: { display: !1 }, tooltip: { enabled: !1 } },
    scales: { x: { display: !1 }, y: { display: !1 } },
    elements: { line: { borderJoinStyle: "round" } }
  } }) });
}
Xi.propTypes = {
  data: e.array,
  color: e.string,
  variant: e.oneOf(["line", "bar"]),
  height: e.number,
  area: e.bool
};
function qt({ users: a = [], max: n = 4, size: i = 34, className: r }) {
  const l = a.slice(0, n), s = a.length - l.length;
  return /* @__PURE__ */ d("div", { className: f("uikit-avatar-group", r), children: [
    l.map((o, c) => /* @__PURE__ */ t(
      Y,
      {
        name: o.name,
        src: o.avatar,
        size: i,
        style: c === 0 ? void 0 : { marginLeft: -Math.round(i / 3.4) }
      },
      o.id || o.name || c
    )),
    s > 0 && /* @__PURE__ */ d(
      "span",
      {
        className: "uikit-avatar",
        style: { width: i, height: i, fontSize: Math.max(10, i * 0.32), marginLeft: -Math.round(i / 3.4), background: "var(--surface-muted)", color: "var(--text-secondary)" },
        children: [
          "+",
          s
        ]
      }
    )
  ] });
}
qt.propTypes = {
  users: e.array,
  max: e.number,
  size: e.number,
  className: e.string
};
function Vt({
  items: a = [],
  variant: n = "simple",
  onItemClick: i,
  checked: r = [],
  onCheck: l,
  hoverable: s = !0,
  className: o
}) {
  return /* @__PURE__ */ t("ul", { className: f("uikit-list", o), children: a.map((c, u) => {
    const m = c.id ?? c.title ?? u;
    return /* @__PURE__ */ d(
      "li",
      {
        className: f("uikit-list__item", s && "is-hoverable", i && "cursor-pointer"),
        onClick: i ? () => i(c) : void 0,
        children: [
          n === "checklist" && /* @__PURE__ */ t(
            "input",
            {
              type: "checkbox",
              className: "form-check-input mt-0",
              checked: r.includes(m),
              onChange: () => l == null ? void 0 : l(m, c),
              onClick: (p) => p.stopPropagation()
            }
          ),
          n === "avatar" && /* @__PURE__ */ t(Y, { name: c.title, src: c.avatar, size: 38, status: c.status }),
          c.icon && n !== "avatar" && /* @__PURE__ */ t(
            "span",
            {
              className: "uikit-stats__icon",
              style: { width: 34, height: 34, fontSize: 15, background: `var(--${c.variant || "primary"}-soft)`, color: `var(--${c.variant || "primary"})` },
              children: /* @__PURE__ */ t("i", { className: `bi bi-${c.icon}` })
            }
          ),
          /* @__PURE__ */ d("div", { className: "flex-grow-1 min-width-0", children: [
            /* @__PURE__ */ t("div", { className: f("fw-semibold text-truncate", r.includes(m) && "text-decoration-line-through text-secondary-soft"), style: { fontSize: ".8125rem" }, children: c.title }),
            c.subtitle && /* @__PURE__ */ t("div", { className: "uikit-helper mt-0 text-truncate", children: c.subtitle })
          ] }),
          c.meta && /* @__PURE__ */ t("span", { className: "uikit-helper mt-0 text-nowrap", children: c.meta }),
          c.badge,
          n === "actions" && c.actions && /* @__PURE__ */ t("div", { className: "d-flex gap-1", onClick: (p) => p.stopPropagation(), children: c.actions })
        ]
      },
      m
    );
  }) });
}
Vt.VARIANTS = ["simple", "actions", "avatar", "checklist"];
Vt.propTypes = {
  items: e.array,
  variant: e.oneOf(["simple", "actions", "avatar", "checklist"]),
  onItemClick: e.func,
  checked: e.array,
  onCheck: e.func,
  hoverable: e.bool,
  className: e.string
};
function Wt({ items: a = [], variant: n = "vertical", className: i }) {
  return /* @__PURE__ */ t("ul", { className: f("uikit-timeline", n !== "vertical" && `uikit-timeline--${n}`, i), children: a.map((r, l) => /* @__PURE__ */ d("li", { className: "uikit-timeline__item", children: [
    /* @__PURE__ */ t(
      "span",
      {
        className: "uikit-timeline__dot",
        style: { background: `var(--${r.variant || "primary"})`, color: `var(--${r.variant || "primary"}-soft, var(--surface-muted))` }
      }
    ),
    /* @__PURE__ */ d("div", { className: "d-flex justify-content-between gap-2 align-items-start", children: [
      /* @__PURE__ */ d("div", { children: [
        /* @__PURE__ */ d("div", { className: "fw-semibold", style: { fontSize: ".8125rem" }, children: [
          r.icon && /* @__PURE__ */ t("i", { className: `bi bi-${r.icon} me-2`, "aria-hidden": "true" }),
          r.title
        ] }),
        r.description && /* @__PURE__ */ t("div", { className: "text-secondary-soft small", children: r.description })
      ] }),
      r.time && /* @__PURE__ */ t("span", { className: "uikit-timeline__time text-nowrap", children: r.time })
    ] })
  ] }, r.id || l)) });
}
Wt.VARIANTS = ["vertical", "horizontal", "alternating"];
Wt.propTypes = {
  items: e.arrayOf(e.object),
  variant: e.oneOf(["vertical", "horizontal", "alternating"]),
  className: e.string
};
function en({ items: a = [], maxHeight: n, emptyText: i = "No recent activity", className: r }) {
  return a.length ? /* @__PURE__ */ t("div", { className: f("uikit-scroll-y", r), style: n ? { maxHeight: n } : void 0, children: a.map((l, s) => /* @__PURE__ */ d("div", { className: "uikit-feed__item", children: [
    l.icon ? /* @__PURE__ */ t(
      "span",
      {
        className: "uikit-stats__icon",
        style: { width: 36, height: 36, fontSize: 16, background: `var(--${l.variant || "primary"}-soft, var(--surface-muted))`, color: `var(--${l.variant || "primary"})` },
        children: /* @__PURE__ */ t("i", { className: `bi bi-${l.icon}`, "aria-hidden": "true" })
      }
    ) : /* @__PURE__ */ t(Y, { name: l.user, src: l.avatar, size: 36 }),
    /* @__PURE__ */ d("div", { className: "flex-grow-1", children: [
      /* @__PURE__ */ d("div", { style: { fontSize: ".8125rem" }, children: [
        /* @__PURE__ */ t("span", { className: "fw-semibold", children: l.user }),
        " ",
        l.action,
        " ",
        l.target && /* @__PURE__ */ t("span", { className: "fw-semibold", children: l.target })
      ] }),
      l.time && /* @__PURE__ */ t("div", { className: "uikit-helper mt-0", children: l.time })
    ] })
  ] }, l.id || s)) }) : /* @__PURE__ */ t(ye, { icon: "activity", title: i });
}
en.propTypes = {
  items: e.arrayOf(e.object),
  maxHeight: e.oneOfType([e.string, e.number]),
  emptyText: e.string,
  className: e.string
};
function tn({ items: a = [], onSelect: n, maxHeight: i, className: r }) {
  return a.length ? /* @__PURE__ */ t("div", { className: f("uikit-scroll-y", r), style: i ? { maxHeight: i } : void 0, children: a.map((l, s) => /* @__PURE__ */ d(
    "button",
    {
      type: "button",
      onClick: () => n == null ? void 0 : n(l),
      className: "uikit-feed__item w-100 border-0 bg-transparent text-start",
      style: { borderBottom: "1px solid var(--border-soft)" },
      children: [
        /* @__PURE__ */ t(Y, { name: l.from, src: l.avatar, size: 38, status: l.status }),
        /* @__PURE__ */ d("div", { className: "flex-grow-1 min-width-0", children: [
          /* @__PURE__ */ d("div", { className: "d-flex justify-content-between gap-2", children: [
            /* @__PURE__ */ t("span", { className: f("text-truncate", l.unread ? "fw-semibold" : ""), style: { fontSize: ".8125rem" }, children: l.from }),
            /* @__PURE__ */ t("span", { className: "uikit-helper mt-0 text-nowrap", children: l.time })
          ] }),
          l.subject && /* @__PURE__ */ t("div", { className: "small text-truncate", children: l.subject }),
          l.preview && /* @__PURE__ */ t("div", { className: "uikit-helper mt-0", children: Ra(l.preview, 64) })
        ] }),
        l.unread && /* @__PURE__ */ t(oe, { variant: "primary", tone: "soft", children: "New" })
      ]
    },
    l.id || s
  )) }) : /* @__PURE__ */ t(ye, { icon: "chat-left-text", title: "No messages" });
}
tn.propTypes = {
  items: e.arrayOf(e.object),
  onSelect: e.func,
  maxHeight: e.oneOfType([e.string, e.number]),
  className: e.string
};
const an = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], nn = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], Me = (a) => `${a.getFullYear()}-${String(a.getMonth() + 1).padStart(2, "0")}-${String(a.getDate()).padStart(2, "0")}`;
function rn(a, n) {
  const i = new Date(a, n, 1), r = new Date(a, n, 1 - i.getDay());
  return Array.from(
    { length: 6 },
    (l, s) => Array.from({ length: 7 }, (o, c) => {
      const u = new Date(r);
      return u.setDate(r.getDate() + s * 7 + c), u;
    })
  );
}
function ln({ value: a, events: n = {}, onSelect: i, onMonthChange: r, className: l }) {
  const s = a ? new Date(a) : /* @__PURE__ */ new Date(), [o, c] = x(new Date(s.getFullYear(), s.getMonth(), 1)), [u, m] = x(a ? Me(new Date(a)) : null), p = q(() => rn(o.getFullYear(), o.getMonth()), [o]), h = Me(/* @__PURE__ */ new Date()), b = (g) => {
    const k = new Date(o.getFullYear(), o.getMonth() + g, 1);
    c(k), r == null || r(k);
  };
  return /* @__PURE__ */ d("div", { className: f("uikit-calendar", l), children: [
    /* @__PURE__ */ d("div", { className: "d-flex align-items-center justify-content-between mb-2", children: [
      /* @__PURE__ */ t(E, { icon: "chevron-left", size: "sm", variant: "light", label: "Previous month", onClick: () => b(-1) }),
      /* @__PURE__ */ d("strong", { style: { fontSize: ".875rem" }, children: [
        nn[o.getMonth()],
        " ",
        o.getFullYear()
      ] }),
      /* @__PURE__ */ t(E, { icon: "chevron-right", size: "sm", variant: "light", label: "Next month", onClick: () => b(1) })
    ] }),
    /* @__PURE__ */ d("table", { children: [
      /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ t("tr", { children: an.map((g) => /* @__PURE__ */ t("th", { children: g }, g)) }) }),
      /* @__PURE__ */ t("tbody", { children: p.map((g, k) => /* @__PURE__ */ t("tr", { children: g.map((N) => {
        const y = Me(N);
        return /* @__PURE__ */ t("td", { children: /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            className: f(
              "uikit-calendar__day",
              N.getMonth() !== o.getMonth() && "is-muted",
              y === h && "is-today",
              y === u && "is-selected",
              n[y] && "has-event"
            ),
            onClick: () => {
              m(y), i == null || i(N, n[y]);
            },
            children: N.getDate()
          }
        ) }, y);
      }) }, k)) })
    ] })
  ] });
}
ln.propTypes = {
  value: e.oneOfType([e.string, e.instanceOf(Date)]),
  events: e.object,
  onSelect: e.func,
  onMonthChange: e.func,
  className: e.string
};
function sn({
  title: a = "Invoice",
  reference: n,
  issuedOn: i,
  dueOn: r,
  from: l = {},
  to: s = {},
  items: o = [],
  currency: c = "USD",
  taxRate: u = 0,
  notes: m,
  actions: p,
  className: h
}) {
  const b = o.reduce((y, v) => y + Number(v.quantity || 0) * Number(v.price || 0), 0), g = b * (Number(u) / 100), k = b + g, N = (y, v) => {
    var w;
    return /* @__PURE__ */ d("div", { children: [
      /* @__PURE__ */ t("div", { className: "uikit-helper mt-0 text-uppercase", children: v }),
      /* @__PURE__ */ t("div", { className: "fw-semibold", children: y.name }),
      (w = y.lines) == null ? void 0 : w.map((T) => /* @__PURE__ */ t("div", { className: "small text-secondary-soft", children: T }, T))
    ] });
  };
  return /* @__PURE__ */ d(M, { className: h, actions: p, title: null, children: [
    /* @__PURE__ */ d("div", { className: "d-flex flex-wrap justify-content-between gap-3 mb-4", children: [
      /* @__PURE__ */ d("div", { children: [
        /* @__PURE__ */ t("h4", { className: "mb-1", children: a }),
        n && /* @__PURE__ */ d("div", { className: "text-secondary-soft small", children: [
          "Ref. ",
          n
        ] })
      ] }),
      /* @__PURE__ */ d("div", { className: "text-end small", children: [
        i && /* @__PURE__ */ d("div", { children: [
          /* @__PURE__ */ t("span", { className: "text-secondary-soft", children: "Issued:" }),
          " ",
          i
        ] }),
        r && /* @__PURE__ */ d("div", { children: [
          /* @__PURE__ */ t("span", { className: "text-secondary-soft", children: "Due:" }),
          " ",
          r
        ] })
      ] })
    ] }),
    /* @__PURE__ */ d("div", { className: "row g-3 mb-4", children: [
      /* @__PURE__ */ t("div", { className: "col-sm-6", children: N(l, "From") }),
      /* @__PURE__ */ t("div", { className: "col-sm-6 text-sm-end", children: N(s, "Bill to") })
    ] }),
    /* @__PURE__ */ t("div", { className: "table-responsive", children: /* @__PURE__ */ d("table", { className: "table uikit-table", children: [
      /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ d("tr", { children: [
        /* @__PURE__ */ t("th", { children: "Description" }),
        /* @__PURE__ */ t("th", { className: "text-end", style: { width: 90 }, children: "Qty" }),
        /* @__PURE__ */ t("th", { className: "text-end", style: { width: 130 }, children: "Price" }),
        /* @__PURE__ */ t("th", { className: "text-end", style: { width: 140 }, children: "Amount" })
      ] }) }),
      /* @__PURE__ */ t("tbody", { children: o.map((y, v) => /* @__PURE__ */ d("tr", { children: [
        /* @__PURE__ */ t("td", { children: y.description }),
        /* @__PURE__ */ t("td", { className: "text-end", children: y.quantity }),
        /* @__PURE__ */ t("td", { className: "text-end", children: be(y.price, c) }),
        /* @__PURE__ */ t("td", { className: "text-end fw-semibold", children: be(Number(y.quantity) * Number(y.price), c) })
      ] }, y.id || v)) })
    ] }) }),
    /* @__PURE__ */ t("div", { className: "d-flex justify-content-end mt-3", children: /* @__PURE__ */ d("div", { style: { minWidth: 260 }, children: [
      /* @__PURE__ */ d("div", { className: "d-flex justify-content-between py-1 small", children: [
        /* @__PURE__ */ t("span", { className: "text-secondary-soft", children: "Subtotal" }),
        /* @__PURE__ */ t("span", { children: be(b, c) })
      ] }),
      u > 0 && /* @__PURE__ */ d("div", { className: "d-flex justify-content-between py-1 small", children: [
        /* @__PURE__ */ d("span", { className: "text-secondary-soft", children: [
          "Tax (",
          u,
          "%)"
        ] }),
        /* @__PURE__ */ t("span", { children: be(g, c) })
      ] }),
      /* @__PURE__ */ d("div", { className: "d-flex justify-content-between py-2 border-top fw-semibold", children: [
        /* @__PURE__ */ t("span", { children: "Total" }),
        /* @__PURE__ */ t("span", { children: be(k, c) })
      ] })
    ] }) }),
    m && /* @__PURE__ */ t("div", { className: "border-top pt-3 mt-3 small text-secondary-soft", children: m })
  ] });
}
sn.propTypes = {
  title: e.string,
  reference: e.string,
  issuedOn: e.string,
  dueOn: e.string,
  from: e.object,
  to: e.object,
  items: e.array,
  currency: e.string,
  taxRate: e.number,
  notes: e.node,
  actions: e.node,
  className: e.string
};
function on({ columns: a = [], onChange: n, onCardClick: i, onAddCard: r, className: l }) {
  const [s, o] = x(null), [c, u] = x(null), m = (p) => {
    if (u(null), !s || s.from === p) {
      o(null);
      return;
    }
    const h = a.map((b) => b.key === s.from ? { ...b, cards: b.cards.filter((g) => g.id !== s.card.id) } : b.key === p ? { ...b, cards: [...b.cards, s.card] } : b);
    n == null || n(h), o(null);
  };
  return /* @__PURE__ */ t("div", { className: f("uikit-kanban", l), children: a.map((p) => {
    var h;
    return /* @__PURE__ */ d(
      "section",
      {
        className: f("uikit-kanban__column", c === p.key && "is-over"),
        onDragOver: (b) => {
          b.preventDefault(), u(p.key);
        },
        onDragLeave: () => u(null),
        onDrop: () => m(p.key),
        children: [
          /* @__PURE__ */ d("header", { className: "uikit-kanban__header", children: [
            /* @__PURE__ */ t("span", { className: "uikit-status-dot", style: { background: `var(--${p.variant || "primary"})` } }),
            /* @__PURE__ */ t("span", { className: "fw-semibold", style: { fontSize: ".8125rem" }, children: p.title }),
            /* @__PURE__ */ t(oe, { tone: "soft", variant: "light", counter: !0, children: ((h = p.cards) == null ? void 0 : h.length) || 0 }),
            r && /* @__PURE__ */ t("button", { type: "button", className: "btn btn-sm btn-light ms-auto", onClick: () => r(p), "aria-label": `Add to ${p.title}`, children: /* @__PURE__ */ t("i", { className: "bi bi-plus-lg" }) })
          ] }),
          /* @__PURE__ */ t("div", { className: "uikit-kanban__cards", children: (p.cards || []).map((b) => {
            var g, k, N;
            return /* @__PURE__ */ d(
              "article",
              {
                draggable: !0,
                onDragStart: () => o({ card: b, from: p.key }),
                onDragEnd: () => o(null),
                onClick: () => i == null ? void 0 : i(b, p),
                className: f("uikit-kanban__card", ((g = s == null ? void 0 : s.card) == null ? void 0 : g.id) === b.id && "is-dragging"),
                children: [
                  ((k = b.tags) == null ? void 0 : k.length) > 0 && /* @__PURE__ */ t("div", { className: "d-flex flex-wrap gap-1 mb-2", children: b.tags.map((y) => /* @__PURE__ */ t(oe, { variant: y.variant || "primary", tone: "soft", children: typeof y == "string" ? y : y.label }, typeof y == "string" ? y : y.label)) }),
                  /* @__PURE__ */ t("div", { className: "fw-semibold", style: { fontSize: ".8125rem" }, children: b.title }),
                  b.description && /* @__PURE__ */ t("p", { className: "uikit-helper mt-1 mb-0", children: b.description }),
                  /* @__PURE__ */ d("footer", { className: "d-flex align-items-center justify-content-between mt-2", children: [
                    b.due && /* @__PURE__ */ d("span", { className: "uikit-helper mt-0", children: [
                      /* @__PURE__ */ t("i", { className: "bi bi-calendar3 me-1" }),
                      b.due
                    ] }),
                    ((N = b.assignees) == null ? void 0 : N.length) > 0 && /* @__PURE__ */ t(qt, { users: b.assignees, size: 24, max: 3 })
                  ] })
                ]
              },
              b.id
            );
          }) })
        ]
      },
      p.key
    );
  }) });
}
on.propTypes = {
  columns: e.array,
  onChange: e.func,
  onCardClick: e.func,
  onAddCard: e.func,
  className: e.string
};
const we = {
  folder: "folder-fill",
  pdf: "file-earmark-pdf",
  image: "file-earmark-image",
  doc: "file-earmark-word",
  sheet: "file-earmark-spreadsheet",
  zip: "file-earmark-zip",
  video: "file-earmark-play",
  code: "file-earmark-code",
  file: "file-earmark"
}, st = {
  folder: "warning",
  pdf: "danger",
  image: "info",
  doc: "primary",
  sheet: "success",
  zip: "secondary",
  video: "secondary",
  code: "info",
  file: "secondary"
};
function cn({ items: a = [], view: n = "grid", onOpen: i, actions: r = [], className: l }) {
  const s = (o) => r.map((c) => ({ ...c, onClick: () => {
    var u;
    return (u = c.onClick) == null ? void 0 : u.call(c, o);
  } }));
  return n === "list" ? /* @__PURE__ */ t("div", { className: f("uikit-list", l), children: a.map((o) => /* @__PURE__ */ d("div", { className: "uikit-list__item is-hoverable cursor-pointer", onClick: () => i == null ? void 0 : i(o), children: [
    /* @__PURE__ */ t("i", { className: `bi bi-${we[o.type] || we.file} fs-5`, style: { color: `var(--${st[o.type] || "secondary"})` } }),
    /* @__PURE__ */ t("span", { className: "flex-grow-1 text-truncate", style: { fontSize: ".8125rem" }, children: o.name }),
    /* @__PURE__ */ t("span", { className: "uikit-helper mt-0 text-nowrap", children: o.size }),
    /* @__PURE__ */ t("span", { className: "uikit-helper mt-0 text-nowrap d-none d-md-block", children: o.modified }),
    r.length > 0 && /* @__PURE__ */ t("span", { onClick: (c) => c.stopPropagation(), children: /* @__PURE__ */ t(ae, { align: "end", items: s(o), trigger: /* @__PURE__ */ t(E, { icon: "three-dots-vertical", size: "sm", variant: "light", label: "Actions" }) }) })
  ] }, o.id || o.name)) }) : /* @__PURE__ */ t("div", { className: f("uikit-file-grid", l), children: a.map((o) => /* @__PURE__ */ d("div", { className: "uikit-file-tile", onDoubleClick: () => i == null ? void 0 : i(o), children: [
    r.length > 0 && /* @__PURE__ */ t("span", { className: "uikit-file-tile__menu", onClick: (c) => c.stopPropagation(), children: /* @__PURE__ */ t(ae, { align: "end", items: s(o), trigger: /* @__PURE__ */ t(E, { icon: "three-dots-vertical", size: "sm", variant: "light", label: "Actions" }) }) }),
    /* @__PURE__ */ t("i", { className: `bi bi-${we[o.type] || we.file}`, style: { fontSize: 34, color: `var(--${st[o.type] || "secondary"})` } }),
    /* @__PURE__ */ t("div", { className: "fw-semibold text-truncate w-100 mt-2", style: { fontSize: ".8125rem" }, children: o.name }),
    /* @__PURE__ */ t("div", { className: "uikit-helper mt-0", children: o.size || o.modified })
  ] }, o.id || o.name)) });
}
cn.propTypes = {
  items: e.array,
  view: e.oneOf(["grid", "list"]),
  onOpen: e.func,
  actions: e.array,
  className: e.string
};
function dn({
  messages: a = [],
  onSend: n,
  placeholder: i = "Write a message…",
  height: r = 420,
  header: l,
  disabled: s = !1,
  className: o
}) {
  const [c, u] = x(""), m = ie(null);
  R(() => {
    var h;
    (h = m.current) == null || h.scrollIntoView({ block: "end" });
  }, [a.length]);
  const p = (h) => {
    h.preventDefault(), c.trim() && (n == null || n(c.trim()), u(""));
  };
  return /* @__PURE__ */ d("div", { className: f("d-flex flex-column", o), style: { height: r }, children: [
    l && /* @__PURE__ */ t("div", { className: "uikit-card__header", children: l }),
    /* @__PURE__ */ d("div", { className: "flex-grow-1 uikit-scroll-y p-3 d-flex flex-column gap-3", children: [
      a.map((h) => /* @__PURE__ */ d("div", { className: f("d-flex gap-2", h.own && "flex-row-reverse"), children: [
        /* @__PURE__ */ t(Y, { name: h.author, src: h.avatar, size: 32 }),
        /* @__PURE__ */ d("div", { className: f("uikit-bubble", h.own && "uikit-bubble--own"), children: [
          !h.own && /* @__PURE__ */ t("div", { className: "fw-semibold mb-1", style: { fontSize: ".75rem" }, children: h.author }),
          /* @__PURE__ */ t("div", { style: { fontSize: ".8125rem" }, children: h.text }),
          h.time && /* @__PURE__ */ t("div", { className: "uikit-bubble__time", children: h.time })
        ] })
      ] }, h.id)),
      /* @__PURE__ */ t("div", { ref: m })
    ] }),
    /* @__PURE__ */ d("form", { className: "d-flex gap-2 p-3 border-top", onSubmit: p, children: [
      /* @__PURE__ */ t(
        "input",
        {
          className: "form-control",
          placeholder: i,
          value: c,
          disabled: s,
          onChange: (h) => u(h.target.value)
        }
      ),
      /* @__PURE__ */ t("button", { type: "submit", className: "btn btn-primary", disabled: s || !c.trim(), "aria-label": "Send", children: /* @__PURE__ */ t("i", { className: "bi bi-send" }) })
    ] })
  ] });
}
dn.propTypes = {
  messages: e.array,
  onSend: e.func,
  placeholder: e.string,
  height: e.oneOfType([e.string, e.number]),
  header: e.node,
  disabled: e.bool,
  className: e.string
};
function Kt({ comments: a = [], onReply: n, depth: i = 0, className: r }) {
  return /* @__PURE__ */ t("div", { className: f(i > 0 && "uikit-comment__children", r), children: a.map((l) => /* @__PURE__ */ t(Ht, { comment: l, onReply: n, depth: i }, l.id)) });
}
function Ht({ comment: a, onReply: n, depth: i }) {
  var c;
  const [r, l] = x(!1), [s, o] = x("");
  return /* @__PURE__ */ t("div", { className: "uikit-comment", children: /* @__PURE__ */ d("div", { className: "d-flex gap-3", children: [
    /* @__PURE__ */ t(Y, { name: a.author, src: a.avatar, size: 36 }),
    /* @__PURE__ */ d("div", { className: "flex-grow-1", children: [
      /* @__PURE__ */ d("div", { className: "d-flex align-items-baseline gap-2", children: [
        /* @__PURE__ */ t("span", { className: "fw-semibold", style: { fontSize: ".8125rem" }, children: a.author }),
        /* @__PURE__ */ t("span", { className: "uikit-helper mt-0", children: a.time })
      ] }),
      /* @__PURE__ */ t("p", { className: "mb-1 mt-1", style: { fontSize: ".8125rem" }, children: a.text }),
      n && /* @__PURE__ */ d("button", { type: "button", className: "btn btn-link btn-sm p-0", onClick: () => l((u) => !u), children: [
        /* @__PURE__ */ t("i", { className: "bi bi-reply me-1" }),
        "Reply"
      ] }),
      r && /* @__PURE__ */ d("div", { className: "d-flex gap-2 mt-2", children: [
        /* @__PURE__ */ t("input", { className: "form-control form-control-sm", placeholder: "Write a reply…", value: s, onChange: (u) => o(u.target.value) }),
        /* @__PURE__ */ t(A, { size: "sm", onClick: () => {
          n == null || n(a, s), o(""), l(!1);
        }, children: "Send" })
      ] }),
      ((c = a.replies) == null ? void 0 : c.length) > 0 && /* @__PURE__ */ t(Kt, { comments: a.replies, onReply: n, depth: i + 1 })
    ] })
  ] }) });
}
Kt.propTypes = { comments: e.array, onReply: e.func, depth: e.number, className: e.string };
Ht.propTypes = { comment: e.object, onReply: e.func, depth: e.number };
function un({
  name: a,
  price: n,
  period: i = "/month",
  description: r,
  features: l = [],
  featured: s = !1,
  badge: o,
  action: c,
  variant: u = "primary",
  className: m
}) {
  return /* @__PURE__ */ d(
    M,
    {
      variant: s ? "elevated" : "bordered",
      ribbon: s ? o || "Popular" : void 0,
      ribbonVariant: u,
      className: f("h-100 text-center", s && "uikit-pricing--featured", m),
      children: [
        /* @__PURE__ */ t("h6", { className: "text-uppercase text-secondary-soft", style: { letterSpacing: ".06em" }, children: a }),
        /* @__PURE__ */ d("div", { className: "my-3", children: [
          /* @__PURE__ */ t("span", { className: "fw-bold", style: { fontSize: "2rem", color: "var(--text-heading)" }, children: n }),
          /* @__PURE__ */ d("span", { className: "text-secondary-soft", children: [
            " ",
            i
          ] })
        ] }),
        r && /* @__PURE__ */ t("p", { className: "text-secondary-soft small", children: r }),
        /* @__PURE__ */ t("ul", { className: "list-unstyled text-start my-4", children: l.map((p) => {
          const h = typeof p == "object" ? p : { label: p, included: !0 };
          return /* @__PURE__ */ d("li", { className: "d-flex align-items-start gap-2 py-1", style: { fontSize: ".8125rem" }, children: [
            /* @__PURE__ */ t(
              "i",
              {
                className: `bi bi-${h.included === !1 ? "x-lg" : "check-lg"}`,
                style: { color: h.included === !1 ? "var(--text-muted)" : `var(--${u})` }
              }
            ),
            /* @__PURE__ */ t("span", { className: h.included === !1 ? "text-secondary-soft text-decoration-line-through" : void 0, children: h.label })
          ] }, h.label);
        }) }),
        c && /* @__PURE__ */ t(A, { block: !0, variant: u, tone: s ? "solid" : "outline", onClick: c.onClick, children: c.label })
      ]
    }
  );
}
un.propTypes = {
  name: e.node,
  price: e.node,
  period: e.node,
  description: e.node,
  features: e.array,
  featured: e.bool,
  badge: e.node,
  action: e.object,
  variant: e.string,
  className: e.string
};
function mn({ images: a = [], columns: n = 4, ratio: i = "1 / 1", className: r }) {
  const [l, s] = x(!1), [o, c] = x(0);
  return /* @__PURE__ */ d(U, { children: [
    /* @__PURE__ */ t("div", { className: f("uikit-gallery", r), style: { gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }, children: a.map((u, m) => /* @__PURE__ */ d(
      "button",
      {
        type: "button",
        className: "uikit-gallery__item",
        style: { aspectRatio: i },
        onClick: () => {
          c(m), s(!0);
        },
        children: [
          /* @__PURE__ */ t("img", { src: u.src, alt: u.alt || "" }),
          /* @__PURE__ */ t("span", { className: "uikit-gallery__zoom", children: /* @__PURE__ */ t("i", { className: "bi bi-zoom-in" }) })
        ]
      },
      u.src || m
    )) }),
    /* @__PURE__ */ t(Bt, { images: a, index: o, open: l, onClose: () => s(!1) })
  ] });
}
mn.propTypes = { images: e.array, columns: e.number, ratio: e.string, className: e.string };
function ue({ brand: a = "Admin Kit", brandIcon: n = "grid-1x2-fill", title: i, subtitle: r, footer: l, showBrand: s = !0, className: o, children: c }) {
  return /* @__PURE__ */ d(M, { className: f("uikit-auth__card", o), children: [
    /* @__PURE__ */ d("div", { className: "text-center mb-4", children: [
      s && /* @__PURE__ */ t("span", { className: "uikit-sidebar__brand-mark mx-auto mb-2", style: { width: 44, height: 44, fontSize: 20 }, children: /* @__PURE__ */ t("i", { className: `bi bi-${n}`, "aria-hidden": "true" }) }),
      /* @__PURE__ */ t("h5", { className: "mb-1", children: i }),
      r && /* @__PURE__ */ t("p", { className: "text-secondary-soft small mb-0", children: r }),
      s && /* @__PURE__ */ t("div", { className: "uikit-helper", children: a })
    ] }),
    c,
    l && /* @__PURE__ */ t("div", { className: "text-center small mt-3", children: l })
  ] });
}
ue.propTypes = {
  brand: e.node,
  brandIcon: e.string,
  title: e.node,
  subtitle: e.node,
  footer: e.node,
  showBrand: e.bool,
  className: e.string,
  children: e.node
};
function pn({ onSubmit: a, loading: n = !1, error: i, footer: r, ...l }) {
  const [s, o] = x({ email: "", password: "", remember: !1 }), c = (u) => (m) => o((p) => ({ ...p, [u]: m.target.type === "checkbox" ? m.target.checked : m.target.value }));
  return /* @__PURE__ */ t(ue, { title: "Sign in", subtitle: "Enter your credentials to continue", footer: r, ...l, children: /* @__PURE__ */ d(
    "form",
    {
      onSubmit: (u) => {
        u.preventDefault(), a == null || a(s);
      },
      noValidate: !0,
      children: [
        /* @__PURE__ */ t(
          H,
          {
            label: "Email",
            type: "email",
            placeholder: "you@example.com",
            prefix: "envelope",
            value: s.email,
            onChange: c("email"),
            required: !0,
            error: i == null ? void 0 : i.email
          }
        ),
        /* @__PURE__ */ t(
          H,
          {
            label: "Password",
            type: "password",
            placeholder: "••••••••",
            prefix: "lock",
            value: s.password,
            onChange: c("password"),
            required: !0,
            error: i == null ? void 0 : i.password
          }
        ),
        /* @__PURE__ */ d("div", { className: "d-flex align-items-center justify-content-between mb-3", children: [
          /* @__PURE__ */ t(He, { label: "Remember me", checked: s.remember, onChange: c("remember") }),
          /* @__PURE__ */ t("a", { href: "#forgot", className: "small", children: "Forgot password?" })
        ] }),
        /* @__PURE__ */ t(A, { type: "submit", variant: "primary", block: !0, loading: n, children: "Sign in" })
      ]
    }
  ) });
}
pn.propTypes = {
  onSubmit: e.func,
  loading: e.bool,
  error: e.object,
  footer: e.node
};
function hn({ onSubmit: a, loading: n = !1, error: i, footer: r, ...l }) {
  const [s, o] = x({ name: "", email: "", password: "", confirm: "", terms: !1 }), c = (u) => (m) => o((p) => ({ ...p, [u]: m.target.type === "checkbox" ? m.target.checked : m.target.value }));
  return /* @__PURE__ */ t(ue, { title: "Create account", subtitle: "It only takes a minute", footer: r, ...l, children: /* @__PURE__ */ d("form", { onSubmit: (u) => {
    u.preventDefault(), a == null || a(s);
  }, noValidate: !0, children: [
    /* @__PURE__ */ t(H, { label: "Full name", placeholder: "John Doe", prefix: "person", value: s.name, onChange: c("name"), required: !0, error: i == null ? void 0 : i.name }),
    /* @__PURE__ */ t(H, { label: "Email", type: "email", placeholder: "you@example.com", prefix: "envelope", value: s.email, onChange: c("email"), required: !0, error: i == null ? void 0 : i.email }),
    /* @__PURE__ */ d("div", { className: "row", children: [
      /* @__PURE__ */ t("div", { className: "col-sm-6", children: /* @__PURE__ */ t(H, { label: "Password", type: "password", placeholder: "••••••••", value: s.password, onChange: c("password"), required: !0 }) }),
      /* @__PURE__ */ t("div", { className: "col-sm-6", children: /* @__PURE__ */ t(H, { label: "Confirm", type: "password", placeholder: "••••••••", value: s.confirm, onChange: c("confirm"), required: !0, error: i == null ? void 0 : i.confirm }) })
    ] }),
    /* @__PURE__ */ t(He, { className: "mb-3", label: "I agree to the terms and privacy policy", checked: s.terms, onChange: c("terms") }),
    /* @__PURE__ */ t(A, { type: "submit", variant: "primary", block: !0, loading: n, children: "Create account" })
  ] }) });
}
hn.propTypes = {
  onSubmit: e.func,
  loading: e.bool,
  error: e.object,
  footer: e.node
};
function bn({ onSubmit: a, loading: n = !1, sent: i = !1, error: r, footer: l, ...s }) {
  const [o, c] = x("");
  return /* @__PURE__ */ d(ue, { title: "Reset password", subtitle: "We'll email you a reset link", footer: l, ...s, children: [
    i && /* @__PURE__ */ t(Ye, { variant: "success", title: "Check your inbox", children: "A reset link is on its way." }),
    /* @__PURE__ */ d("form", { onSubmit: (u) => {
      u.preventDefault(), a == null || a(o);
    }, noValidate: !0, children: [
      /* @__PURE__ */ t(
        H,
        {
          label: "Email",
          type: "email",
          placeholder: "you@example.com",
          prefix: "envelope",
          value: o,
          onChange: (u) => c(u.target.value),
          required: !0,
          error: r
        }
      ),
      /* @__PURE__ */ t(A, { type: "submit", variant: "primary", block: !0, loading: n, children: "Send reset link" })
    ] })
  ] });
}
bn.propTypes = {
  onSubmit: e.func,
  loading: e.bool,
  sent: e.bool,
  error: e.node,
  footer: e.node
};
function fn({ onSubmit: a, loading: n = !1, error: i, footer: r, ...l }) {
  const [s, o] = x({ password: "", confirm: "" }), c = s.confirm && s.password !== s.confirm;
  return /* @__PURE__ */ t(ue, { title: "Set a new password", subtitle: "Choose a strong password you'll remember", footer: r, ...l, children: /* @__PURE__ */ d("form", { onSubmit: (u) => {
    u.preventDefault(), a == null || a(s);
  }, noValidate: !0, children: [
    /* @__PURE__ */ t(
      _e,
      {
        label: "New password",
        strength: !0,
        value: s.password,
        onChange: (u) => o((m) => ({ ...m, password: u.target.value })),
        required: !0,
        error: i == null ? void 0 : i.password
      }
    ),
    /* @__PURE__ */ t(
      _e,
      {
        label: "Confirm password",
        value: s.confirm,
        onChange: (u) => o((m) => ({ ...m, confirm: u.target.value })),
        required: !0,
        error: c ? "Passwords do not match" : i == null ? void 0 : i.confirm
      }
    ),
    /* @__PURE__ */ t(A, { type: "submit", block: !0, loading: n, disabled: c, children: "Update password" })
  ] }) });
}
fn.propTypes = { onSubmit: e.func, loading: e.bool, error: e.object, footer: e.node };
function gn({
  onSubmit: a,
  onResend: n,
  length: i = 6,
  sentTo: r = "your email",
  loading: l = !1,
  error: s,
  footer: o,
  ...c
}) {
  const [u, m] = x("");
  return /* @__PURE__ */ t(ue, { title: "Verify your identity", subtitle: `We sent a ${i}-digit code to ${r}`, footer: o, ...c, children: /* @__PURE__ */ d("form", { onSubmit: (p) => {
    p.preventDefault(), a == null || a(u);
  }, noValidate: !0, children: [
    /* @__PURE__ */ t("div", { className: "d-flex justify-content-center", children: /* @__PURE__ */ t(Lt, { length: i, value: u, onChange: m, error: s }) }),
    /* @__PURE__ */ t(A, { type: "submit", block: !0, loading: l, disabled: u.length < i, children: "Verify" }),
    n && /* @__PURE__ */ t("div", { className: "text-center mt-3", children: /* @__PURE__ */ t("button", { type: "button", className: "btn btn-link btn-sm p-0", onClick: n, children: "Resend code" }) })
  ] }) });
}
gn.propTypes = {
  onSubmit: e.func,
  onResend: e.func,
  length: e.number,
  sentTo: e.string,
  loading: e.bool,
  error: e.node,
  footer: e.node
};
function yn({ user: a = {}, onUnlock: n, onSwitchUser: i, loading: r = !1, error: l, ...s }) {
  const [o, c] = x("");
  return /* @__PURE__ */ d(
    ue,
    {
      title: a.name || "Locked",
      subtitle: "Enter your password to continue",
      showBrand: !1,
      ...s,
      footer: i && /* @__PURE__ */ t("button", { type: "button", className: "btn btn-link btn-sm p-0", onClick: i, children: "Sign in as a different user" }),
      children: [
        /* @__PURE__ */ t("div", { className: "text-center mb-3", children: /* @__PURE__ */ t(Y, { name: a.name, src: a.avatar, size: 72 }) }),
        /* @__PURE__ */ d("form", { onSubmit: (u) => {
          u.preventDefault(), n == null || n(o);
        }, noValidate: !0, children: [
          /* @__PURE__ */ t(_e, { label: null, value: o, onChange: (u) => c(u.target.value), error: l }),
          /* @__PURE__ */ t(A, { type: "submit", block: !0, icon: "unlock", loading: r, children: "Unlock" })
        ] })
      ]
    }
  );
}
yn.propTypes = {
  user: e.object,
  onUnlock: e.func,
  onSwitchUser: e.func,
  loading: e.bool,
  error: e.node
};
function Ut({ code: a = "", language: n = "jsx", className: i }) {
  const [r, l] = x(!1), s = async () => {
    try {
      await navigator.clipboard.writeText(a), l(!0), window.setTimeout(() => l(!1), 1600);
    } catch {
      l(!1);
    }
  };
  return /* @__PURE__ */ d("div", { className: f("position-relative", i), children: [
    /* @__PURE__ */ d(
      "button",
      {
        type: "button",
        className: "btn btn-sm btn-dark position-absolute",
        style: { top: 8, right: 8, opacity: 0.85 },
        onClick: s,
        children: [
          /* @__PURE__ */ t("i", { className: `bi bi-${r ? "check2" : "clipboard"}`, "aria-hidden": "true" }),
          /* @__PURE__ */ t("span", { className: "ms-1", children: r ? "Copied" : "Copy" })
        ]
      }
    ),
    /* @__PURE__ */ t("pre", { className: "uikit-code", children: /* @__PURE__ */ t("code", { "data-language": n, children: a.trim() }) })
  ] });
}
Ut.propTypes = {
  code: e.string,
  language: e.string,
  className: e.string
};
function Yt({ code: a, muted: n = !1, stageClassName: i, className: r, children: l }) {
  const [s, o] = x(!1);
  return /* @__PURE__ */ d("div", { className: f("uikit-preview", r), children: [
    /* @__PURE__ */ t("div", { className: f("uikit-preview__stage", n && "uikit-preview__stage--muted", i), children: l }),
    a && /* @__PURE__ */ d(U, { children: [
      /* @__PURE__ */ d("div", { className: "uikit-preview__bar", children: [
        /* @__PURE__ */ t("span", { children: "Usage" }),
        /* @__PURE__ */ d("button", { type: "button", className: "btn btn-sm btn-light", onClick: () => o((c) => !c), children: [
          /* @__PURE__ */ t("i", { className: `bi bi-chevron-${s ? "up" : "down"} me-1`, "aria-hidden": "true" }),
          s ? "Hide code" : "Show code"
        ] })
      ] }),
      s && /* @__PURE__ */ t(Ut, { code: a })
    ] })
  ] });
}
Yt.propTypes = {
  code: e.string,
  muted: e.bool,
  stageClassName: e.string,
  className: e.string,
  children: e.node
};
function Jt({ rows: a = [] }) {
  return a.length ? /* @__PURE__ */ t("div", { className: "table-responsive mt-3", children: /* @__PURE__ */ d("table", { className: "table uikit-table uikit-prop-table", children: [
    /* @__PURE__ */ t("thead", { children: /* @__PURE__ */ d("tr", { children: [
      /* @__PURE__ */ t("th", { style: { width: 160 }, children: "Prop" }),
      /* @__PURE__ */ t("th", { style: { width: 200 }, children: "Type" }),
      /* @__PURE__ */ t("th", { style: { width: 120 }, children: "Default" }),
      /* @__PURE__ */ t("th", { children: "Description" })
    ] }) }),
    /* @__PURE__ */ t("tbody", { children: a.map((n) => /* @__PURE__ */ d("tr", { children: [
      /* @__PURE__ */ t("td", { children: /* @__PURE__ */ t("code", { children: n.name }) }),
      /* @__PURE__ */ t("td", { className: "text-secondary-soft", children: n.type }),
      /* @__PURE__ */ t("td", { className: "text-secondary-soft", children: n.default ?? "—" }),
      /* @__PURE__ */ t("td", { children: n.description })
    ] }, n.name)) })
  ] }) }) : null;
}
Jt.propTypes = { rows: e.arrayOf(e.object) };
function vn({ id: a, title: n, description: i, variants: r = [], code: l, props: s = [], muted: o, children: c }) {
  return /* @__PURE__ */ d("section", { className: "uikit-doc-section", id: a, children: [
    /* @__PURE__ */ d("div", { className: "uikit-doc-section__head d-flex flex-wrap align-items-center gap-2", children: [
      /* @__PURE__ */ d("div", { className: "me-auto", children: [
        /* @__PURE__ */ t("h2", { className: "uikit-doc-section__title", children: n }),
        i && /* @__PURE__ */ t("p", { className: "uikit-doc-section__desc", children: i })
      ] }),
      r.map((u) => /* @__PURE__ */ t(oe, { tone: "soft", variant: "secondary", children: u }, u))
    ] }),
    /* @__PURE__ */ t(Yt, { code: l, muted: o, children: c }),
    /* @__PURE__ */ t(Jt, { rows: s })
  ] });
}
vn.propTypes = {
  id: e.string,
  title: e.node,
  description: e.node,
  variants: e.arrayOf(e.string),
  code: e.string,
  props: e.array,
  muted: e.bool,
  children: e.node
};
function ot(a) {
  const [n, i] = x(
    () => typeof window < "u" && window.matchMedia(a).matches
  );
  return R(() => {
    if (typeof window > "u") return;
    const r = window.matchMedia(a), l = (s) => i(s.matches);
    return i(r.matches), r.addEventListener("change", l), () => r.removeEventListener("change", l);
  }, [a]), n;
}
function Nn({
  navigation: a = [],
  brand: n = "Admin UI Kit",
  brandIcon: i = "grid-1x2-fill",
  user: r,
  userMenu: l = [],
  notifications: s = [],
  messages: o = [],
  onSearch: c,
  footerLinks: u = [],
  navbarActions: m,
  showCustomizer: p = !0,
  showThemeToggle: h = !0,
  children: b
}) {
  const { settings: g } = We(), k = ot("(max-width: 991.98px)"), N = ot("(max-width: 1199.98px)"), y = g.layout === "horizontal" || g.layout === "stacked", [v, w] = x(g.layout === "rail"), [T, C] = x(!1);
  R(() => {
    w(g.layout === "rail" || N && !k), k || C(!1);
  }, [N, k, g.layout]);
  const z = () => k || y ? C((B) => !B) : w((B) => !B);
  return /* @__PURE__ */ d("div", { className: f("uikit-shell", v && !y && "is-collapsed", T && "is-open"), children: [
    /* @__PURE__ */ t(
      pt,
      {
        items: a,
        brand: n,
        brandIcon: i,
        collapsed: v && !k && !y,
        onNavigate: () => k && C(!1)
      }
    ),
    k && T && /* @__PURE__ */ t("div", { className: "uikit-backdrop", onClick: () => C(!1) }),
    /* @__PURE__ */ t(
      $e,
      {
        onToggleSidebar: z,
        onSearch: c,
        user: r,
        userMenu: l,
        notifications: s,
        messages: o,
        actions: m,
        showThemeToggle: h,
        brand: y ? n : void 0,
        brandIcon: i
      }
    ),
    y && /* @__PURE__ */ t("div", { className: "uikit-topmenu", children: /* @__PURE__ */ t(qe, { items: a, horizontal: !0 }) }),
    /* @__PURE__ */ d("main", { className: "uikit-main", children: [
      b || /* @__PURE__ */ t(Be, {}),
      /* @__PURE__ */ t(gt, { brand: n, links: u, version: "2.0.0" })
    ] }),
    p && /* @__PURE__ */ t(wt, {})
  ] });
}
Nn.propTypes = {
  navigation: e.array,
  brand: e.node,
  brandIcon: e.string,
  user: e.object,
  userMenu: e.array,
  notifications: e.array,
  messages: e.array,
  onSearch: e.func,
  footerLinks: e.array,
  navbarActions: e.node,
  showCustomizer: e.bool,
  showThemeToggle: e.bool,
  children: e.node
};
function Gt({
  variant: a = "centered",
  image: n,
  headline: i,
  tagline: r,
  brand: l = "Admin UI Kit",
  brandIcon: s = "grid-1x2-fill",
  footer: o,
  className: c,
  children: u
}) {
  const m = u || /* @__PURE__ */ t(Be, {});
  return a === "split" ? /* @__PURE__ */ d("div", { className: f("uikit-auth-split", c), children: [
    /* @__PURE__ */ t("aside", { className: "uikit-auth-split__aside", style: n ? { backgroundImage: `url(${n})` } : void 0, children: /* @__PURE__ */ d("div", { className: "uikit-auth-split__overlay", children: [
      /* @__PURE__ */ d("div", { className: "d-flex align-items-center gap-2 mb-auto", children: [
        /* @__PURE__ */ t("span", { className: "uikit-sidebar__brand-mark", children: /* @__PURE__ */ t("i", { className: `bi bi-${s}` }) }),
        /* @__PURE__ */ t("span", { className: "fw-semibold text-white", children: l })
      ] }),
      i && /* @__PURE__ */ t("h2", { className: "text-white mb-2", children: i }),
      r && /* @__PURE__ */ t("p", { className: "text-white-50 mb-0", children: r })
    ] }) }),
    /* @__PURE__ */ t("main", { className: "uikit-auth-split__main", children: /* @__PURE__ */ t("div", { className: "w-100", style: { maxWidth: 420 }, children: m }) })
  ] }) : a === "full" ? /* @__PURE__ */ t("div", { className: f("uikit-auth", c), style: { padding: 0 }, children: /* @__PURE__ */ t("div", { className: "w-100 h-100 d-flex align-items-center justify-content-center p-4", children: /* @__PURE__ */ t("div", { className: "w-100", style: { maxWidth: 460 }, children: m }) }) }) : a === "minimal" ? /* @__PURE__ */ t("div", { className: f("d-flex align-items-center justify-content-center min-vh-100 p-4", c), style: { background: "var(--surface)" }, children: /* @__PURE__ */ t("div", { className: "w-100", style: { maxWidth: 400 }, children: m }) }) : /* @__PURE__ */ t("div", { className: f("uikit-auth", c), children: /* @__PURE__ */ d("div", { className: "w-100 d-flex flex-column align-items-center", children: [
    m,
    o && /* @__PURE__ */ t("div", { className: "mt-3 small text-secondary-soft", children: o })
  ] }) });
}
Gt.VARIANTS = ["centered", "split", "full", "minimal"];
Gt.propTypes = {
  variant: e.oneOf(["centered", "split", "full", "minimal"]),
  image: e.string,
  headline: e.node,
  tagline: e.node,
  brand: e.node,
  brandIcon: e.string,
  footer: e.node,
  className: e.string,
  children: e.node
};
function kn({ centered: a = !1, children: n }) {
  return /* @__PURE__ */ t("div", { className: a ? "d-flex align-items-center justify-content-center min-vh-100 p-3" : "p-3", children: n || /* @__PURE__ */ t(Be, {}) });
}
kn.propTypes = { centered: e.bool, children: e.node };
function zn(a = !1) {
  const [n, i] = x(a), r = te(() => i(!0), []), l = te(() => i(!1), []), s = te(() => i((o) => !o), []);
  return { value: n, setValue: i, open: r, close: l, toggle: s };
}
let ct = 0;
function jn(a = 4e3) {
  const [n, i] = x([]), r = te((o) => {
    i((c) => c.filter((u) => u.id !== o));
  }, []), l = te(
    (o) => {
      ct += 1;
      const c = `toast-${ct}`, u = o.duration ?? a;
      return i((m) => [...m, { id: c, variant: "primary", ...o }]), u > 0 && window.setTimeout(() => r(c), u), c;
    },
    [a, r]
  ), s = te(() => i([]), []);
  return { toasts: n, push: l, dismiss: r, clear: s };
}
const Ln = [
  {
    section: "Overview",
    items: [
      { label: "Overview", icon: "speedometer2", path: "/" },
      { label: "All Components", icon: "grid", path: "/components" },
      { label: "Templates", icon: "layout-text-window-reverse", path: "/templates" }
    ]
  },
  {
    section: "Components",
    items: [
      { label: "Layout", icon: "layout-sidebar", path: "/components/layout" },
      { label: "Cards", icon: "window-stack", path: "/components/cards" },
      { label: "Forms", icon: "input-cursor-text", path: "/components/forms" },
      { label: "Tables", icon: "table", path: "/components/tables" },
      { label: "Buttons", icon: "hand-index-thumb", path: "/components/buttons" },
      { label: "Feedback", icon: "chat-square-dots", path: "/components/feedback" },
      { label: "Navigation", icon: "signpost-split", path: "/components/navigation" },
      { label: "Overlays", icon: "layers", path: "/components/overlays" },
      { label: "Charts", icon: "bar-chart-line", path: "/components/charts" },
      { label: "Data Display", icon: "ui-checks-grid", path: "/components/display" },
      { label: "Authentication", icon: "shield-lock", path: "/components/auth" }
    ]
  },
  {
    section: "Templates",
    items: [
      {
        label: "Dashboards",
        icon: "speedometer2",
        children: [
          { label: "Analytics", path: "/templates/analytics" },
          { label: "Sales", path: "/templates/sales" },
          { label: "Project", path: "/templates/project" },
          { label: "Minimal", path: "/templates/minimal" },
          { label: "Monitoring", path: "/templates/monitoring" }
        ]
      },
      {
        label: "CRUD",
        icon: "table",
        children: [
          { label: "List page", path: "/templates/list" },
          { label: "Form page", path: "/templates/form" },
          { label: "Detail page", path: "/templates/detail" },
          { label: "Wizard", path: "/templates/wizard" }
        ]
      },
      {
        label: "Records",
        icon: "person-badge",
        children: [
          { label: "Profile", path: "/templates/profile" },
          { label: "Settings", path: "/templates/settings" },
          { label: "Audit log", path: "/templates/audit" }
        ]
      },
      {
        label: "Work",
        icon: "kanban",
        children: [
          { label: "Kanban board", path: "/templates/kanban" },
          { label: "Calendar", path: "/templates/calendar" },
          { label: "Inbox / chat", path: "/templates/inbox" },
          { label: "File manager", path: "/templates/files" }
        ]
      },
      {
        label: "Documents",
        icon: "receipt",
        children: [
          { label: "Invoice list", path: "/templates/invoices" },
          { label: "Invoice view", path: "/templates/invoice-view" },
          { label: "Report", path: "/templates/report" },
          { label: "Pricing", path: "/templates/pricing" }
        ]
      },
      {
        label: "Auth & errors",
        icon: "shield-lock",
        children: [
          { label: "Sign in", path: "/templates/sign-in" },
          { label: "Sign up", path: "/templates/sign-up" },
          { label: "404", path: "/templates/404" },
          { label: "403", path: "/templates/403" },
          { label: "500", path: "/templates/500" },
          { label: "Maintenance", path: "/templates/maintenance" }
        ]
      }
    ]
  },
  {
    section: "Reference",
    items: [
      { label: "Design Tokens", icon: "palette", path: "/tokens" },
      { label: "Cheatsheet", icon: "journal-code", path: "/cheatsheet" },
      { label: "Icons", icon: "emoji-smile", path: "/icons" }
    ]
  }
], In = [
  { id: 1, name: "John Doe", email: "john.doe@example.com", role: "Administrator", department: "Operations", status: "Active", amount: 4200, createdAt: "2026-01-12" },
  { id: 2, name: "Jane Smith", email: "jane.smith@example.com", role: "Manager", department: "Finance", status: "Active", amount: 3150, createdAt: "2026-01-28" },
  { id: 3, name: "Alex Morgan", email: "alex.morgan@example.com", role: "Editor", department: "Marketing", status: "Pending", amount: 1890, createdAt: "2026-02-04" },
  { id: 4, name: "Maria Cruz", email: "maria.cruz@example.com", role: "Viewer", department: "Support", status: "Inactive", amount: 760, createdAt: "2026-02-15" },
  { id: 5, name: "Daniel Reyes", email: "daniel.reyes@example.com", role: "Manager", department: "Operations", status: "Active", amount: 5320, createdAt: "2026-02-21" },
  { id: 6, name: "Priya Nair", email: "priya.nair@example.com", role: "Editor", department: "Marketing", status: "Active", amount: 2440, createdAt: "2026-03-02" },
  { id: 7, name: "Tom Baker", email: "tom.baker@example.com", role: "Viewer", department: "Finance", status: "Pending", amount: 980, createdAt: "2026-03-11" },
  { id: 8, name: "Grace Lim", email: "grace.lim@example.com", role: "Administrator", department: "Support", status: "Active", amount: 6110, createdAt: "2026-03-19" },
  { id: 9, name: "Oscar Diaz", email: "oscar.diaz@example.com", role: "Editor", department: "Operations", status: "Inactive", amount: 1370, createdAt: "2026-04-01" },
  { id: 10, name: "Hana Sato", email: "hana.sato@example.com", role: "Manager", department: "Marketing", status: "Active", amount: 4890, createdAt: "2026-04-09" },
  { id: 11, name: "Luis Fernandez", email: "luis.fernandez@example.com", role: "Viewer", department: "Finance", status: "Active", amount: 2010, createdAt: "2026-04-18" },
  { id: 12, name: "Amina Yusuf", email: "amina.yusuf@example.com", role: "Editor", department: "Support", status: "Pending", amount: 1620, createdAt: "2026-04-27" },
  { id: 13, name: "Peter Novak", email: "peter.novak@example.com", role: "Administrator", department: "Operations", status: "Active", amount: 7250, createdAt: "2026-05-06" },
  { id: 14, name: "Sofia Rossi", email: "sofia.rossi@example.com", role: "Manager", department: "Marketing", status: "Inactive", amount: 3300, createdAt: "2026-05-14" },
  { id: 15, name: "Kevin Tan", email: "kevin.tan@example.com", role: "Viewer", department: "Finance", status: "Active", amount: 1150, createdAt: "2026-05-23" }
], Mn = ["Active", "Pending", "Inactive"], Pn = ["Administrator", "Manager", "Editor", "Viewer"], En = ["Operations", "Finance", "Marketing", "Support"], Rn = [
  { user: "Jane Smith", action: "created a new record in", target: "Registry", time: "5 minutes ago", icon: "plus-circle", variant: "primary" },
  { user: "Alex Morgan", action: "updated", target: "Item #2481", time: "32 minutes ago", icon: "pencil-square", variant: "info" },
  { user: "John Doe", action: "approved", target: "Request #114", time: "2 hours ago", icon: "check-circle", variant: "success" },
  { user: "Maria Cruz", action: "archived", target: "3 documents", time: "Yesterday", icon: "archive", variant: "warning" },
  { user: "Daniel Reyes", action: "deleted", target: "Draft #77", time: "2 days ago", icon: "trash3", variant: "danger" }
], Fn = [
  { title: "Record created", description: "Initial entry submitted by John Doe", time: "09:14", variant: "primary" },
  { title: "Reviewed", description: "Checked by Jane Smith", time: "10:02", variant: "info" },
  { title: "Approved", description: "Signed off by Alex Morgan", time: "11:45", variant: "success" },
  { title: "Archived", description: "Moved to long-term storage", time: "16:20", variant: "secondary" }
], Bn = [
  { title: "New record submitted", description: "A new entry is waiting for review", time: "3 min ago", icon: "file-earmark-plus", variant: "primary" },
  { title: "Report generated", description: "Monthly summary is ready", time: "1 hour ago", icon: "file-bar-graph", variant: "info" },
  { title: "Storage almost full", description: "92% of quota used", time: "3 hours ago", icon: "hdd", variant: "warning", unread: !1 }
], qn = [
  { from: "Jane Smith", subject: "Re: Weekly summary", preview: "Thanks — the numbers look right to me, forwarding to the team now.", time: "10:24", unread: !0, status: "online" },
  { from: "Alex Morgan", subject: "Draft attached", preview: "Left a couple of comments in the second section.", time: "Yesterday", unread: !0, status: "away" },
  { from: "John Doe", subject: "Access request", preview: "Could you add me to the reporting group?", time: "Mon", status: "offline" }
], Vn = [
  { description: "Service item A", quantity: 3, price: 250 },
  { description: "Service item B", quantity: 1, price: 1200 },
  { description: "Service item C", quantity: 6, price: 85 }
], Wn = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"], Kn = [
  { label: "Series A", data: [32, 48, 41, 62, 55, 74, 68, 89] },
  { label: "Series B", data: [18, 26, 34, 29, 44, 39, 52, 61] }
], Hn = [
  { label: "Created", data: [12, 19, 14, 22, 18, 26, 21, 30] },
  { label: "Resolved", data: [9, 15, 12, 20, 16, 23, 19, 27] }
], Un = ["Category A", "Category B", "Category C", "Category D"], Yn = [38, 27, 21, 14], Jn = ["Completed", "In progress", "Pending"], Gn = [58, 27, 15];
export {
  Ki as Accordion,
  Pt as ActionButton,
  ti as ActionCard,
  en as ActivityFeed,
  Nn as AdminLayout,
  Ye as Alert,
  ue as AuthCard,
  Gt as AuthLayout,
  pi as Autocomplete,
  Y as Avatar,
  qt as AvatarGroup,
  oe as Badge,
  Ui as BarChart,
  kn as BlankLayout,
  yt as Breadcrumb,
  A as Button,
  Di as ButtonGroup,
  Dn as CHART_COLORS,
  pe as COLOR_THEMES,
  ln as CalendarWidget,
  M as Card,
  ei as ChartCard,
  dn as ChatPanel,
  He as Checkbox,
  _t as CircularProgress,
  Ut as CodeBlock,
  _i as ColorPicker,
  Vi as CommandPalette,
  Kt as CommentThread,
  Fi as ConfirmModal,
  Ja as ContentWrapper,
  qi as ContextMenu,
  Ii as CopyButton,
  fe as DEFAULT_SETTINGS,
  Va as DENSITIES,
  si as DataTable,
  Fe as DateInput,
  fi as DateRangePicker,
  Tt as DetailList,
  Ji as DoughnutChart,
  Nt as Drawer,
  ae as Dropdown,
  ye as EmptyState,
  Ei as ErrorState,
  ji as Fab,
  cn as FileManager,
  yi as FileUpload,
  gt as Footer,
  bn as ForgotPasswordCard,
  Oi as FormCard,
  V as FormGroup,
  Ai as FormWizard,
  mn as Gallery,
  Ya as Header,
  E as IconButton,
  Qa as InfoCard,
  sn as InvoiceLayout,
  on as KanbanBoard,
  qa as LAYOUT_PRESETS,
  Bt as Lightbox,
  Hi as LineChart,
  Vt as ListGroup,
  yn as LockScreenCard,
  pn as LoginCard,
  Wa as MODES,
  Mt as MaskedInput,
  tn as MessageList,
  Ft as Modal,
  mi as MultiSelect,
  Ba as NAVBAR_STYLES,
  qe as NavMenu,
  $e as Navbar,
  Pe as NotificationDropdown,
  Ti as NumberStepper,
  Lt as OTPInput,
  gn as OTPVerifyCard,
  vt as PageHeader,
  Ot as Pagination,
  _e as PasswordInput,
  Yi as PieChart,
  Zi as PolarChart,
  Bi as Popover,
  Yt as Preview,
  un as PricingCard,
  Xa as ProfileCard,
  xt as Progress,
  Jt as PropsTable,
  Ee as RADII,
  Gi as RadarChart,
  jt as Radio,
  bi as RadioGroup,
  ki as RangeSlider,
  wi as Rating,
  hn as RegisterCard,
  $i as RepeaterField,
  fn as ResetPasswordCard,
  di as RichTextArea,
  Fa as SIDEBAR_STYLES,
  Qi as ScatterChart,
  Ve as SearchInput,
  ui as SelectInput,
  vn as ShowcaseSection,
  pt as Sidebar,
  I as Skeleton,
  Ke as SkeletonPreset,
  Et as SocialButton,
  Xi as Sparkline,
  Pi as Spinner,
  zi as SplitButton,
  Re as StatsCard,
  Mi as StatusDot,
  Ue as Stepper,
  kt as Switch,
  zt as TableActions,
  Ct as TableFilter,
  At as TablePagination,
  St as TableSearch,
  $t as TableToolbar,
  Wi as Tabs,
  hi as TagsInput,
  oi as TextArea,
  H as TextInput,
  wt as ThemeCustomizer,
  Ua as ThemeProvider,
  ft as ThemeToggle,
  Wt as Timeline,
  Rt as Toast,
  Ri as ToastContainer,
  Li as ToggleGroup,
  Dt as Tooltip,
  Hn as barDatasets,
  de as baseOptions,
  ce as chartColors,
  f as classNames,
  f as cn,
  En as departmentOptions,
  Gn as doughnutData,
  Jn as doughnutLabels,
  ri as downloadCsv,
  be as formatCurrency,
  An as formatDate,
  On as formatNumber,
  G as getValue,
  tt as hexToRgb,
  Ea as initialsOf,
  Kn as lineDatasets,
  Wn as months,
  Ln as navigationData,
  Yn as pieData,
  Un as pieLabels,
  Pn as roleOptions,
  Rn as sampleActivity,
  Vn as sampleInvoiceItems,
  qn as sampleMessages,
  Bn as sampleNotifications,
  In as sampleRows,
  Fn as sampleTimeline,
  Mn as statusOptions,
  ni as toCsv,
  K as token,
  Ra as truncate,
  Ce as useClickOutside,
  ii as useColumnVisibility,
  ot as useMediaQuery,
  ai as useTableData,
  We as useTheme,
  jn as useToasts,
  zn as useToggle,
  ve as withAlpha
};

import { useState, useRef, useCallback, useEffect } from "react";

// ============================================================
// BLOCK TYPES & DEFAULTS
// ============================================================
const BLOCK_TYPES = [
  { type: "hero", label: "히어로 배너", icon: "⬛", category: "레이아웃" },
  { type: "heading", label: "제목", icon: "H", category: "텍스트" },
  { type: "text", label: "본문 텍스트", icon: "¶", category: "텍스트" },
  { type: "image", label: "이미지", icon: "🖼", category: "미디어" },
  { type: "button", label: "버튼", icon: "⬭", category: "액션" },
  { type: "divider", label: "구분선", icon: "—", category: "레이아웃" },
  { type: "columns", label: "2단 컬럼", icon: "⫿", category: "레이아웃" },
  { type: "product", label: "상품 정보", icon: "🏷", category: "상거래" },
  { type: "review", label: "리뷰 카드", icon: "★", category: "상거래" },
  { type: "badge", label: "배지/태그", icon: "◈", category: "액션" },
];

const createBlock = (type) => ({
  id: `block_${Date.now()}_${Math.random().toString(36).slice(2)}`,
  type,
  props: getDefaultProps(type),
});

function getDefaultProps(type) {
  switch (type) {
    case "hero":
      return {
        title: "강력한 헤드라인을 입력하세요",
        subtitle: "고객의 마음을 사로잡는 서브 문구",
        bg: "#1a1a2e",
        color: "#ffffff",
        align: "center",
        height: 320,
      };
    case "heading":
      return { text: "섹션 제목", level: "h2", color: "#111827", align: "left", size: 32 };
    case "text":
      return {
        text: "상품에 대한 설명을 여기에 입력하세요. 고객이 궁금해 할 내용을 자세히 작성해 보세요.",
        color: "#374151",
        align: "left",
        size: 16,
        lineHeight: 1.8,
      };
    case "image":
      return {
        src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
        alt: "이미지",
        width: "100%",
        radius: 12,
        caption: "",
      };
    case "button":
      return {
        label: "지금 구매하기",
        bg: "#4f46e5",
        color: "#ffffff",
        radius: 8,
        size: "md",
        align: "center",
        url: "#",
        fullWidth: false,
      };
    case "divider":
      return { style: "solid", color: "#e5e7eb", margin: 24 };
    case "columns":
      return {
        left: "왼쪽 컬럼 내용을 입력하세요.",
        right: "오른쪽 컬럼 내용을 입력하세요.",
        gap: 24,
        bg: "#f9fafb",
        radius: 12,
      };
    case "product":
      return {
        name: "프리미엄 상품명",
        price: "89,000",
        originalPrice: "120,000",
        desc: "이 상품의 주요 특징과 장점을 간결하게 설명하세요.",
        badge: "BEST",
        badgeColor: "#ef4444",
      };
    case "review":
      return {
        name: "김민지",
        rating: 5,
        text: "정말 만족스러운 상품이에요! 배송도 빠르고 품질도 너무 좋아요.",
        date: "2024.03.15",
        verified: true,
      };
    case "badge":
      return { text: "신상품", bg: "#4f46e5", color: "#fff", radius: 20, size: 14 };
    default:
      return {};
  }
}

// ============================================================
// BLOCK RENDERER
// ============================================================
function BlockRenderer({ block, selected, onSelect, onClick }) {
  const p = block.props;
  const base = {
    cursor: "pointer",
    outline: selected ? "2px solid #4f46e5" : "2px solid transparent",
    outlineOffset: 2,
    borderRadius: 8,
    transition: "outline 0.15s",
    position: "relative",
  };

  const wrap = (children) => (
    <div style={base} onClick={(e) => { e.stopPropagation(); onSelect(); onClick && onClick(); }}>
      {selected && (
        <div style={{
          position: "absolute", top: -24, left: 0, background: "#4f46e5",
          color: "#fff", fontSize: 11, padding: "2px 8px", borderRadius: "4px 4px 0 0",
          fontFamily: "monospace", zIndex: 10,
        }}>
          {BLOCK_TYPES.find(b => b.type === block.type)?.label}
        </div>
      )}
      {children}
    </div>
  );

  switch (block.type) {
    case "hero":
      return wrap(
        <div style={{
          background: p.bg, color: p.color, padding: "48px 32px",
          textAlign: p.align, minHeight: p.height, display: "flex",
          flexDirection: "column", justifyContent: "center", borderRadius: 8,
        }}>
          <div style={{ fontSize: 36, fontWeight: 800, marginBottom: 12, lineHeight: 1.2 }}>{p.title}</div>
          <div style={{ fontSize: 18, opacity: 0.8 }}>{p.subtitle}</div>
        </div>
      );
    case "heading":
      const Tag = p.level || "h2";
      return wrap(
        <div style={{ color: p.color, textAlign: p.align, fontSize: p.size, fontWeight: 700, lineHeight: 1.3, padding: "4px 0" }}>
          {p.text}
        </div>
      );
    case "text":
      return wrap(
        <p style={{ color: p.color, textAlign: p.align, fontSize: p.size, lineHeight: p.lineHeight, margin: 0, padding: "2px 0" }}>
          {p.text}
        </p>
      );
    case "image":
      return wrap(
        <div style={{ textAlign: "center" }}>
          <img src={p.src} alt={p.alt} style={{ width: p.width, borderRadius: p.radius, display: "block", margin: "0 auto" }} />
          {p.caption && <div style={{ marginTop: 8, fontSize: 13, color: "#9ca3af" }}>{p.caption}</div>}
        </div>
      );
    case "button":
      const sizes = { sm: "12px 24px", md: "14px 32px", lg: "18px 48px" };
      return wrap(
        <div style={{ textAlign: p.align }}>
          <span style={{
            display: "inline-block", background: p.bg, color: p.color,
            padding: sizes[p.size], borderRadius: p.radius, fontWeight: 600,
            fontSize: p.size === "lg" ? 18 : p.size === "sm" ? 13 : 15,
            width: p.fullWidth ? "100%" : "auto", textAlign: "center",
          }}>
            {p.label}
          </span>
        </div>
      );
    case "divider":
      return wrap(<hr style={{ border: "none", borderTop: `1px ${p.style} ${p.color}`, margin: `${p.margin}px 0` }} />);
    case "columns":
      return wrap(
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: p.gap, background: p.bg, padding: 24, borderRadius: p.radius }}>
          <div style={{ background: "#fff", padding: 20, borderRadius: 8, fontSize: 14, color: "#374151" }}>{p.left}</div>
          <div style={{ background: "#fff", padding: 20, borderRadius: 8, fontSize: 14, color: "#374151" }}>{p.right}</div>
        </div>
      );
    case "product":
      return wrap(
        <div style={{ background: "#fff", border: "1px solid #f3f4f6", borderRadius: 12, padding: "24px", boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ fontWeight: 800, fontSize: 22, color: "#111827" }}>{p.name}</div>
            {p.badge && <span style={{ background: p.badgeColor, color: "#fff", fontSize: 11, padding: "3px 10px", borderRadius: 20, fontWeight: 700 }}>{p.badge}</span>}
          </div>
          <div style={{ marginTop: 12, display: "flex", alignItems: "baseline", gap: 10 }}>
            <span style={{ fontWeight: 800, fontSize: 28, color: "#4f46e5" }}>₩{p.price}</span>
            {p.originalPrice && <span style={{ fontSize: 15, color: "#9ca3af", textDecoration: "line-through" }}>₩{p.originalPrice}</span>}
          </div>
          <div style={{ marginTop: 12, fontSize: 14, color: "#6b7280", lineHeight: 1.7 }}>{p.desc}</div>
        </div>
      );
    case "review":
      return wrap(
        <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 12, padding: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <div style={{ width: 36, height: 36, background: "#fbbf24", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "#fff" }}>
                {p.name[0]}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#111827" }}>{p.name}</div>
                <div style={{ fontSize: 12, color: "#fbbf24" }}>{"★".repeat(p.rating)}{"☆".repeat(5 - p.rating)}</div>
              </div>
            </div>
            <div style={{ fontSize: 12, color: "#9ca3af" }}>
              {p.date}
              {p.verified && <span style={{ marginLeft: 6, background: "#d1fae5", color: "#059669", padding: "2px 6px", borderRadius: 10, fontSize: 11 }}>구매확인</span>}
            </div>
          </div>
          <div style={{ fontSize: 14, color: "#374151", lineHeight: 1.7 }}>{p.text}</div>
        </div>
      );
    case "badge":
      return wrap(
        <div style={{ padding: "4px 0" }}>
          <span style={{ background: p.bg, color: p.color, fontSize: p.size, padding: "5px 14px", borderRadius: p.radius, fontWeight: 700 }}>
            {p.text}
          </span>
        </div>
      );
    default:
      return null;
  }
}

// ============================================================
// PROPERTY PANEL
// ============================================================
function PropPanel({ block, onChange }) {
  if (!block) return (
    <div style={{ padding: 24, color: "#9ca3af", fontSize: 13, textAlign: "center", marginTop: 40 }}>
      <div style={{ fontSize: 32, marginBottom: 12 }}>←</div>
      블록을 클릭하면<br />속성을 편집할 수 있어요
    </div>
  );

  const p = block.props;
  const set = (key, val) => onChange({ ...p, [key]: val });

  const Field = ({ label, children }) => (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>{label}</label>
      {children}
    </div>
  );
  const Input = ({ k, type = "text", ...rest }) => (
    <input value={p[k] ?? ""} type={type} onChange={e => set(k, type === "number" ? Number(e.target.value) : e.target.value)}
      style={{ width: "100%", padding: "8px 10px", border: "1px solid #e5e7eb", borderRadius: 6, fontSize: 13, boxSizing: "border-box", background: "#fff" }}
      {...rest} />
  );
  const ColorField = ({ k, label }) => (
    <Field label={label}>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <input type="color" value={p[k] || "#000000"} onChange={e => set(k, e.target.value)}
          style={{ width: 40, height: 36, border: "1px solid #e5e7eb", borderRadius: 6, cursor: "pointer", padding: 2 }} />
        <input value={p[k] || ""} onChange={e => set(k, e.target.value)}
          style={{ flex: 1, padding: "8px 10px", border: "1px solid #e5e7eb", borderRadius: 6, fontSize: 13 }} />
      </div>
    </Field>
  );
  const Textarea = ({ k }) => (
    <textarea value={p[k] ?? ""} onChange={e => set(k, e.target.value)} rows={3}
      style={{ width: "100%", padding: "8px 10px", border: "1px solid #e5e7eb", borderRadius: 6, fontSize: 13, resize: "vertical", boxSizing: "border-box" }} />
  );
  const Select = ({ k, options }) => (
    <select value={p[k] ?? ""} onChange={e => set(k, e.target.value)}
      style={{ width: "100%", padding: "8px 10px", border: "1px solid #e5e7eb", borderRadius: 6, fontSize: 13 }}>
      {options.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
    </select>
  );

  return (
    <div style={{ padding: "20px 16px" }}>
      <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 20, color: "#111827", paddingBottom: 12, borderBottom: "1px solid #f3f4f6" }}>
        {BLOCK_TYPES.find(b => b.type === block.type)?.icon} {BLOCK_TYPES.find(b => b.type === block.type)?.label} 설정
      </div>

      {block.type === "hero" && <>
        <Field label="제목"><Textarea k="title" /></Field>
        <Field label="부제목"><Input k="subtitle" /></Field>
        <ColorField k="bg" label="배경색" />
        <ColorField k="color" label="텍스트 색상" />
        <Field label="높이(px)"><Input k="height" type="number" /></Field>
        <Field label="정렬"><Select k="align" options={[{ v: "left", l: "왼쪽" }, { v: "center", l: "가운데" }, { v: "right", l: "오른쪽" }]} /></Field>
      </>}

      {block.type === "heading" && <>
        <Field label="텍스트"><Input k="text" /></Field>
        <Field label="태그"><Select k="level" options={[{ v: "h1", l: "H1" }, { v: "h2", l: "H2" }, { v: "h3", l: "H3" }]} /></Field>
        <Field label="크기(px)"><Input k="size" type="number" /></Field>
        <ColorField k="color" label="색상" />
        <Field label="정렬"><Select k="align" options={[{ v: "left", l: "왼쪽" }, { v: "center", l: "가운데" }, { v: "right", l: "오른쪽" }]} /></Field>
      </>}

      {block.type === "text" && <>
        <Field label="본문"><Textarea k="text" /></Field>
        <Field label="크기(px)"><Input k="size" type="number" /></Field>
        <Field label="줄간격"><Input k="lineHeight" type="number" /></Field>
        <ColorField k="color" label="색상" />
        <Field label="정렬"><Select k="align" options={[{ v: "left", l: "왼쪽" }, { v: "center", l: "가운데" }, { v: "right", l: "오른쪽" }]} /></Field>
      </>}

      {block.type === "image" && <>
        <Field label="이미지 URL"><Input k="src" /></Field>
        <Field label="대체 텍스트"><Input k="alt" /></Field>
        <Field label="캡션"><Input k="caption" /></Field>
        <Field label="모서리 반경(px)"><Input k="radius" type="number" /></Field>
      </>}

      {block.type === "button" && <>
        <Field label="버튼 텍스트"><Input k="label" /></Field>
        <Field label="링크 URL"><Input k="url" /></Field>
        <ColorField k="bg" label="배경색" />
        <ColorField k="color" label="텍스트 색상" />
        <Field label="크기"><Select k="size" options={[{ v: "sm", l: "작게" }, { v: "md", l: "중간" }, { v: "lg", l: "크게" }]} /></Field>
        <Field label="모서리 반경(px)"><Input k="radius" type="number" /></Field>
        <Field label="정렬"><Select k="align" options={[{ v: "left", l: "왼쪽" }, { v: "center", l: "가운데" }, { v: "right", l: "오른쪽" }]} /></Field>
      </>}

      {block.type === "divider" && <>
        <Field label="선 스타일"><Select k="style" options={[{ v: "solid", l: "실선" }, { v: "dashed", l: "점선" }, { v: "dotted", l: "점" }]} /></Field>
        <ColorField k="color" label="색상" />
        <Field label="상하 여백(px)"><Input k="margin" type="number" /></Field>
      </>}

      {block.type === "columns" && <>
        <Field label="왼쪽 내용"><Textarea k="left" /></Field>
        <Field label="오른쪽 내용"><Textarea k="right" /></Field>
        <ColorField k="bg" label="배경색" />
        <Field label="간격(px)"><Input k="gap" type="number" /></Field>
      </>}

      {block.type === "product" && <>
        <Field label="상품명"><Input k="name" /></Field>
        <Field label="판매가"><Input k="price" /></Field>
        <Field label="원가"><Input k="originalPrice" /></Field>
        <Field label="설명"><Textarea k="desc" /></Field>
        <Field label="배지 텍스트"><Input k="badge" /></Field>
        <ColorField k="badgeColor" label="배지 색상" />
      </>}

      {block.type === "review" && <>
        <Field label="이름"><Input k="name" /></Field>
        <Field label="평점 (1-5)"><Input k="rating" type="number" min="1" max="5" /></Field>
        <Field label="리뷰 내용"><Textarea k="text" /></Field>
        <Field label="날짜"><Input k="date" /></Field>
      </>}

      {block.type === "badge" && <>
        <Field label="텍스트"><Input k="text" /></Field>
        <ColorField k="bg" label="배경색" />
        <ColorField k="color" label="텍스트 색상" />
        <Field label="크기(px)"><Input k="size" type="number" /></Field>
        <Field label="반경(px)"><Input k="radius" type="number" /></Field>
      </>}
    </div>
  );
}

// ============================================================
// MAIN APP
// ============================================================
export default function PageEditor() {
  const [blocks, setBlocks] = useState([
    createBlock("hero"),
    createBlock("product"),
    createBlock("text"),
    createBlock("button"),
  ]);
  const [selected, setSelected] = useState(null);
  const [dragOver, setDragOver] = useState(null);
  const [dragging, setDragging] = useState(null);
  const [sidebarTab, setSidebarTab] = useState("blocks");
  const [previewMode, setPreviewMode] = useState(false);
  const [showHtml, setShowHtml] = useState(false);
  const dragItem = useRef(null);
  const dragType = useRef(null); // "block" | "new"

  // ---- Drag from palette ----
  const onPaletteDragStart = (type) => {
    dragType.current = "new";
    dragItem.current = type;
  };

  // ---- Drag existing block ----
  const onBlockDragStart = (id) => {
    dragType.current = "block";
    dragItem.current = id;
    setDragging(id);
  };

  const onDrop = (targetIdx) => {
    if (dragType.current === "new") {
      const nb = createBlock(dragItem.current);
      setBlocks(prev => {
        const arr = [...prev];
        arr.splice(targetIdx, 0, nb);
        return arr;
      });
      setSelected(nb.id);
    } else if (dragType.current === "block") {
      const fromIdx = blocks.findIndex(b => b.id === dragItem.current);
      if (fromIdx === -1 || fromIdx === targetIdx) return;
      setBlocks(prev => {
        const arr = [...prev];
        const [moved] = arr.splice(fromIdx, 1);
        const insertIdx = fromIdx < targetIdx ? targetIdx - 1 : targetIdx;
        arr.splice(insertIdx, 0, moved);
        return arr;
      });
    }
    setDragOver(null);
    setDragging(null);
  };

  const deleteBlock = (id) => {
    setBlocks(prev => prev.filter(b => b.id !== id));
    if (selected === id) setSelected(null);
  };

  const updateBlock = (id, props) => {
    setBlocks(prev => prev.map(b => b.id === id ? { ...b, props } : b));
  };

  const selectedBlock = blocks.find(b => b.id === selected);

  // Categories for sidebar
  const categories = [...new Set(BLOCK_TYPES.map(b => b.category))];

  const generateHtml = () => {
    return `<!DOCTYPE html>\n<html lang="ko">\n<head>\n  <meta charset="UTF-8">\n  <title>상세페이지</title>\n  <style>body{margin:0;font-family:sans-serif;max-width:800px;margin:0 auto;padding:20px}</style>\n</head>\n<body>\n${blocks.map(b => `  <!-- ${b.type} block -->`).join("\n")}\n</body>\n</html>`;
  };

  const DropZone = ({ idx }) => (
    <div
      onDragOver={e => { e.preventDefault(); setDragOver(idx); }}
      onDragLeave={() => setDragOver(null)}
      onDrop={() => onDrop(idx)}
      style={{
        height: dragOver === idx ? 40 : 8,
        margin: "2px 0",
        borderRadius: 6,
        background: dragOver === idx ? "#e0e7ff" : "transparent",
        border: dragOver === idx ? "2px dashed #4f46e5" : "2px solid transparent",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.15s",
        fontSize: 12, color: "#6366f1",
      }}
    >
      {dragOver === idx && "여기에 놓기"}
    </div>
  );

  return (
    <div style={{ display: "flex", height: "100vh", background: "#f1f5f9", fontFamily: "'Segoe UI', sans-serif", overflow: "hidden" }}>
      {/* ===== LEFT SIDEBAR ===== */}
      {!previewMode && (
        <div style={{ width: 220, background: "#18181b", display: "flex", flexDirection: "column", flexShrink: 0 }}>
          {/* Logo */}
          <div style={{ padding: "16px 18px", borderBottom: "1px solid #27272a" }}>
            <div style={{ color: "#fff", fontWeight: 800, fontSize: 15, letterSpacing: -0.5 }}>
              <span style={{ color: "#6366f1" }}>◈</span> PageCraft
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", borderBottom: "1px solid #27272a" }}>
            {["blocks", "layers"].map(tab => (
              <button key={tab} onClick={() => setSidebarTab(tab)}
                style={{
                  flex: 1, padding: "10px 0", background: sidebarTab === tab ? "#27272a" : "transparent",
                  color: sidebarTab === tab ? "#fff" : "#71717a", border: "none", cursor: "pointer",
                  fontSize: 12, fontWeight: 600,
                }}>
                {tab === "blocks" ? "블록" : "레이어"}
              </button>
            ))}
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: "12px 0" }}>
            {sidebarTab === "blocks" ? (
              categories.map(cat => (
                <div key={cat}>
                  <div style={{ padding: "8px 16px 4px", fontSize: 10, fontWeight: 700, color: "#52525b", textTransform: "uppercase", letterSpacing: 1 }}>{cat}</div>
                  {BLOCK_TYPES.filter(b => b.category === cat).map(bt => (
                    <div key={bt.type}
                      draggable
                      onDragStart={() => onPaletteDragStart(bt.type)}
                      onClick={() => {
                        const nb = createBlock(bt.type);
                        setBlocks(prev => [...prev, nb]);
                        setSelected(nb.id);
                      }}
                      style={{
                        padding: "8px 16px", display: "flex", alignItems: "center", gap: 10,
                        cursor: "grab", color: "#d4d4d8", fontSize: 13,
                        transition: "background 0.1s",
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = "#27272a"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                    >
                      <span style={{ fontSize: 16, width: 20, textAlign: "center" }}>{bt.icon}</span>
                      {bt.label}
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <div style={{ padding: "8px 0" }}>
                {blocks.map((b, i) => (
                  <div key={b.id}
                    onClick={() => setSelected(b.id)}
                    style={{
                      padding: "8px 16px", display: "flex", alignItems: "center", gap: 8,
                      background: selected === b.id ? "#27272a" : "transparent",
                      cursor: "pointer", color: selected === b.id ? "#fff" : "#a1a1aa", fontSize: 12,
                    }}>
                    <span>{BLOCK_TYPES.find(bt => bt.type === b.type)?.icon}</span>
                    <span>{BLOCK_TYPES.find(bt => bt.type === b.type)?.label}</span>
                    <span style={{ marginLeft: "auto", fontSize: 10, color: "#52525b" }}>#{i + 1}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ===== CENTER CANVAS ===== */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Toolbar */}
        <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "10px 20px", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ fontWeight: 700, fontSize: 13, color: "#111827", marginRight: "auto" }}>
            상세페이지 에디터 · {blocks.length}개 블록
          </div>
          <button onClick={() => setPreviewMode(!previewMode)}
            style={{ padding: "6px 16px", background: previewMode ? "#4f46e5" : "#fff", color: previewMode ? "#fff" : "#374151", border: "1px solid #e5e7eb", borderRadius: 6, cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
            {previewMode ? "✏️ 편집" : "👁 미리보기"}
          </button>
          <button onClick={() => setShowHtml(!showHtml)}
            style={{ padding: "6px 16px", background: "#fff", color: "#374151", border: "1px solid #e5e7eb", borderRadius: 6, cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
            {"</>"} HTML
          </button>
        </div>

        {/* Canvas or HTML view */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
          {showHtml ? (
            <div style={{ background: "#1e1e2e", borderRadius: 12, padding: 24, maxWidth: 800, margin: "0 auto" }}>
              <pre style={{ color: "#cdd6f4", fontSize: 12, margin: 0, whiteSpace: "pre-wrap", lineHeight: 1.7 }}>
                {generateHtml()}
              </pre>
            </div>
          ) : (
            <div style={{ maxWidth: 800, margin: "0 auto" }}
              onClick={() => !previewMode && setSelected(null)}>
              <div style={{ background: "#fff", borderRadius: 12, padding: "32px", boxShadow: "0 2px 20px rgba(0,0,0,0.08)", minHeight: 400 }}>
                {blocks.length === 0 && (
                  <div
                    onDragOver={e => { e.preventDefault(); setDragOver(-1); }}
                    onDragLeave={() => setDragOver(null)}
                    onDrop={() => onDrop(0)}
                    style={{
                      textAlign: "center", padding: "80px 0", color: "#9ca3af",
                      border: "2px dashed #e5e7eb", borderRadius: 12,
                    }}>
                    <div style={{ fontSize: 40, marginBottom: 12 }}>+</div>
                    왼쪽에서 블록을 드래그해서 시작하세요
                  </div>
                )}

                {!previewMode && <DropZone idx={0} />}

                {blocks.map((block, i) => (
                  <div key={block.id}>
                    <div
                      draggable={!previewMode}
                      onDragStart={() => !previewMode && onBlockDragStart(block.id)}
                      onDragEnd={() => setDragging(null)}
                      style={{ opacity: dragging === block.id ? 0.4 : 1, position: "relative" }}
                    >
                      {!previewMode && (
                        <div style={{
                          position: "absolute", right: 0, top: 0, zIndex: 20,
                          display: selected === block.id ? "flex" : "none",
                          gap: 4,
                        }}
                          onMouseEnter={e => e.currentTarget.style.display = "flex"}
                        >
                          <button
                            onClick={e => { e.stopPropagation(); deleteBlock(block.id); }}
                            style={{ background: "#ef4444", color: "#fff", border: "none", borderRadius: 4, padding: "3px 8px", cursor: "pointer", fontSize: 11 }}>
                            ✕ 삭제
                          </button>
                        </div>
                      )}
                      <div
                        onMouseEnter={e => { if (!previewMode) e.currentTarget.querySelector("[data-actions]") && (e.currentTarget.querySelector("[data-actions]").style.display = "flex"); }}
                      >
                        <BlockRenderer
                          block={block}
                          selected={!previewMode && selected === block.id}
                          onSelect={() => !previewMode && setSelected(block.id)}
                        />
                      </div>
                    </div>
                    {!previewMode && <DropZone idx={i + 1} />}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ===== RIGHT PANEL ===== */}
      {!previewMode && (
        <div style={{ width: 260, background: "#fff", borderLeft: "1px solid #e5e7eb", overflowY: "auto", flexShrink: 0 }}>
          <div style={{ padding: "14px 16px", borderBottom: "1px solid #f3f4f6", fontWeight: 700, fontSize: 13, color: "#111827" }}>
            속성 편집
          </div>
          <PropPanel
            block={selectedBlock}
            onChange={(props) => selectedBlock && updateBlock(selectedBlock.id, props)}
          />
        </div>
      )}
    </div>
  );
}

import { useState, useRef, useEffect } from "react";

// oz_page.css 직접 삽입 (외부 URL 로딩 없이 미리보기 적용)
const OZ_PAGE_CSS = `
* {margin:0;padding:0;}
.wp{display: block;}
.mp{display: none;}
.detail-page { text-align:left; font-family:'Montserrat','NotoSansKR',Malgun Gothic,'맑은 고딕',Dotum,'돋움',sans-serif; word-break: break-all; max-width:800px; margin:70px auto;}
.detail-page img { border:0; line-height:100%;}
.detail-page .img img {width:100%;}
.detail-page .opac20 { opacity: 0.2; filter: alpha(opacity=20); }
.detail-page .opac50 { opacity: 0.5; filter: alpha(opacity=50); }
.detail-page .opac80 { opacity: 0.8; filter: alpha(opacity=80); }
.detail-page .opac100 { opacity: 1.0; filter: alpha(opacity=100); }
.detail-page .a-tit {font-size:36px; font-weight:300; color:#222222; line-height:1.4em; letter-spacing:-0.02em; margin:25px; text-align:center; }
.detail-page .b-tit {font-size:26px; font-weight:300; color:#222222; line-height:1.5em; letter-spacing:-0.02em; margin:25px 10px; text-align:center; }
.detail-page .c-tit {font-size:24px; font-weight:300; color:#222222; line-height:1.5em; letter-spacing:-0.02em; margin:10px; text-align:center; }
.detail-page .txt {font-size:17px; font-weight:400; color:#3b3b3b; line-height:1.6em; letter-spacing:-0.02em; margin:10px; text-align:center; }
.detail-page .main-tit {font-size: 50px; font-weight:900; color:#222222; line-height:1.3em; letter-spacing:-0.02em; margin:25px; text-align:center;}
.detail-page .b { font-weight:800; }
.detail-page .left { text-align:left; }
.detail-page .hr {border-top:1px solid #ddd; margin: 150px auto; }
.detail-page .hr-d {border-top:1px dashed #ddd; margin: 150px auto; }
.detail-page .gap150 {height:150px;}
.detail-page .gap130 {height:130px;}
.detail-page .gap100 {height:100px;}
.detail-page .gap70 {height:70px;}
.detail-page .gap90 {height:90px;}
.detail-page .gap50 {height:50px;}
.detail-page .gap40 {height:40px;}
.detail-page .gap30 {height:30px;}
.detail-page .gap20 {height:20px;}
.detail-page .gap10 {height:10px;}
.detail-page .gap5 {height:5px;}
.detail-page .dot { text-emphasis-style: dot; text-emphasis-position: over left; -webkit-text-emphasis-style: dot; -webkit-text-emphasis-position: over; }
.detail-page .say {}
.detail-page .say::before { display: block; content:"\\275D"; }
.detail-page .say::after { display: block; content:"\\275E"; line-height: 2em; }
.detail-page .cont {padding: 0 10px;}
.tbl-type01 { background-color: #fcfcfc; border-collapse: collapse; border-spacing: 0px; width:100% !important; }
.tbl-type01 thead th { background-color: #f7f7f7; border-bottom:1px solid #fcfcfc; padding: 17px 0; text-align:center; letter-spacing:-0.02em; font-weight:700; line-height:1.5em; font-size:15px; color:#4C4C4C; }
.tbl-type01 tbody th { background-color: #f7f7f7; border-bottom:1px solid #fcfcfc; padding: 17px 0; text-align:center; letter-spacing:-0.02em; font-weight:700; line-height:1.5em; font-size:15px; color:#4C4C4C; }
.tbl-type01 tbody td { background-color: #fcfcfc; border-bottom:1px solid #fcfcfc; padding: 17px 0; text-align:center; letter-spacing:-0.02em; font-weight:400; line-height:1.5em; font-size:15px; color:#4C4C4C; }
.tbl-type01 .bg-on { background-color:#E6101B; border-radius: 30px; color: #ffffff; padding: 6px 10px;}
.tbl-type03 { background-color: #fcfcfc; border-collapse: collapse; border-spacing: 0px; width:100% !important; }
.tbl-type03 thead th { background-color: #f7f7f7; border-bottom:1px solid #fcfcfc; padding: 13px 25px; text-align:left; letter-spacing:-0.02em; font-weight:700; line-height:1.5em; font-size:15px; color:#3b3b3b; }
.tbl-type03 tbody th { background-color: #f7f7f7; border-bottom:1px solid #fcfcfc; padding: auto 0; text-align:center; vertical-align: middle; letter-spacing:-0.02em; font-weight:700; line-height:1.5em; font-size:15px; color:#4C4C4C; }
.tbl-type03 tbody td { background-color: #fcfcfc; border-bottom:1px solid #fcfcfc; padding: 15px 10px; text-align:left; letter-spacing:-0.02em; font-weight:400; line-height:1.5em; font-size:15px; color:#4C4C4C; }
.tbl-type03 .img { width:35% !important; margin:0 auto;}
.tbl-type04 { background-color: #fcfcfc; border-collapse: collapse; border-spacing: 0px; width:100% !important;}
.tbl-type04 thead th { background-color: #f7f7f7; text-align:center; margin-top: 8px;}
.tbl-type04 thead td { background-color: #f7f7f7; text-align:center; line-height:1.3em; font-size:14px; padding-bottom: 10px; }
.tbl-type04 tbody td { background-color: #fcfcfc; border-bottom:1px solid #fcfcfc; padding: 17px 0; text-align:center; letter-spacing:-0.02em; font-weight:400; line-height:1.5em; font-size:15px; color:#4C4C4C; }
.tbl-type04 .img { text-align:center; width:35% !important; margin: 10px auto;}
.tbl-type04 .bg-on { background-color:#E6101B; border-radius: 30px; color: #ffffff; padding: 5px;}
.detail-page .m-size {margin-top: 10px;}
.detail-page .m-size > ul > h2 {font-size:18px; font-weight:700; color:#3b3b3b; line-height:1.4em; letter-spacing:-0.02em; margin:10px 10px; text-align:left;}
.detail-page .m-size > ul > li {font-size:16px; font-weight:400; color:#3b3b3b; line-height:1.6em; letter-spacing:-0.02em; margin-left:27px; text-align:left; list-style: disc !important;}
.detail-page ul > h2 {font-size:20px; font-weight:700; color:#4C4C4C; line-height:1.4em; letter-spacing:-0.02em; margin:10px 10px; text-align:left;}
.detail-page ul > li {font-size:16px; color:#4C4C4C; font-weight:400; line-height:1.5em; letter-spacing:-0.02em; margin-left:24px; text-align:left; list-style: disc !important;}
@media only screen and (max-width:680px){
  .wp{display: none;} .mp{display: block;}
  .detail-page .gap150 {height:100px;}
  .tbl-type01 thead th, .tbl-type01 tbody td, .tbl-type01 tbody th { padding:14px 0; font-size:14px;}
  .tbl-type04 thead th { font-size:12px; }
  .tbl-type04 thead td { font-size:14px; }
  .tbl-type04 tbody td { padding:14px 0; font-size:14px; }
  .tbl-type04 .img { width:40% !important; text-align:center !important; margin-top: 10px; }
}
`;

// ── 세탁 아이콘 옵션 ──────────────────────────────────────────
const WASH_ICONS = [
  { id: "washing-machine", src: "https://ozkiz.com/web/upload/oz_base/icon/wash/042-washing-machine.png", label: "세탁기가능" },
  { id: "hand-wash", src: "https://ozkiz.com/web/upload/oz_base/icon/wash/014-hand-wash.png", label: "손세탁" },
  { id: "dry-clean", src: "https://ozkiz.com/web/upload/oz_base/icon/wash/021-dry-clean.png", label: "드라이클리닝" },
  { id: "temperature", src: "https://ozkiz.com/web/upload/oz_base/icon/wash/035-temperature.png", label: "찬물세탁" },
  { id: "softener", src: "https://ozkiz.com/web/upload/oz_base/icon/wash/013-softener.png", label: "중성세제", dimmed: true },
  { id: "dry", src: "https://ozkiz.com/web/upload/oz_base/icon/wash/052-dry.png", label: "건조기불가" },
  { id: "iron", src: "https://ozkiz.com/web/upload/oz_base/icon/wash/025-iron.png", label: "다림질가능" },
  { id: "no-iron", src: "https://ozkiz.com/web/upload/oz_base/icon/wash/026-no-iron.png", label: "다림질불가" },
];

const PRODUCT_INFO_ROWS = [
  { key: "season", label: "계절감", options: ["봄/가을", "여름", "겨울"] },
  { key: "stretch", label: "신축성", options: ["좋음", "보통", "없음"] },
  { key: "lining", label: "안감", options: ["전체", "부분", "없음"] },
  { key: "transparency", label: "비침", options: ["있음", "약간", "없음"] },
  { key: "sizing", label: "사이즈", options: ["작게나옴", "정사이즈", "크게나옴"] },
];

const SIZE_ROWS = ["어깨너비", "가슴둘레", "총길이", "권장연령"];
const SIZE_COLS = ["100", "110", "120", "130", "140"];

const DEFAULT_SIZE_DATA = {
  "어깨너비": ["23.5", "25", "26.5", "28", "29.5"],
  "가슴둘레": ["62", "66", "70", "74", "78"],
  "총길이": ["52", "56.5", "61", "65.5", "70"],
  "권장연령": ["3세초과", "4-5세", "5-6세", "6-7세", "7-8세"],
};

// ── 초기 상태 ──────────────────────────────────────────────────
const initState = () => ({
  // 기본 정보
  productCode: "",
  imageBaseUrl: "https://ozkizonline.cafe24.com/ozkiz/wear/",
  // 이미지 (로컬 업로드 또는 URL)
  images: [
    { key: "main", label: "메인 이미지", file: null, preview: "", url: "" },
    { key: "02", label: "착용 이미지", file: null, preview: "", url: "" },
    { key: "04", label: "체크포인트 이미지", file: null, preview: "", url: "" },
    { key: "1080", label: "컬러 이미지", file: null, preview: "", url: "" },
  ],
  // 텍스트
  mainTitle: "새하얀 꽃잎이\n내려앉은 여름",
  productNameBold: "코튼플로럴",
  productNameNormal: "원피스 가디건",
  description: "단추를 모두 잠그면 청초한 원피스로,\n단추를 열면 가벼운 민소매 코튼 가디건으로 변신하는\n다재다능한 아이템이에요!",
  checkpoints: "섬세한 아일렛 펀칭 레이스\n마법 같은 2-way 버튼다운\n로맨틱한 허리 셔링 주름",
  colorInfo: "화이트 / white",
  colorDot: "#f7f7f7",
  // 사이즈
  sizeType: "상의",
  sizeData: DEFAULT_SIZE_DATA,
  // 제품정보
  productInfo: { season: "여름", stretch: "없음", lining: "없음", transparency: "약간", sizing: "정사이즈" },
  // 세탁
  washIcons: ["washing-machine", "hand-wash", "temperature", "softener", "dry"],
  washNote: "면 혼방 소재 제품의 특성상\n찬물 세탁 및 색상별 구분 세탁을 권해드리며,\n건조기 사용시 변형이 있을 수 있으니 자연건조 해주세요.",
  // 제품 상세
  productNumber: "",
  material: "주원단:면100%",
  manufacturer: "(주)오픈한 오즈키즈",
  madeIn: "중국",
});

// ── HTML 생성 함수 ─────────────────────────────────────────────
function generateHTML(s) {
  const getImgSrc = (img) => {
    if (img.url) return img.url;
    if (img.file) return `[이미지: ${img.file.name}]`;
    const code = s.productCode;
    const map = { main: `${code}_main_01.jpg`, "02": `${code}_02.jpg`, "04": `${code}_04.jpg`, "1080": `${code}_1080.jpg` };
    return s.imageBaseUrl + (map[img.key] || "");
  };

  const mainTitleHtml = s.mainTitle.split("\n").join("<br>\n\t\t");
  const descHtml = s.description.split("\n").join("<br>\n\t\t");
  const checkHtml = s.checkpoints.split("\n").map(l => `· ${l}`).join("<br>\n\t\t");

  const sizeRows = SIZE_ROWS.map(row =>
    `\t\t\t\t\t<tr>\n\t\t\t\t\t\t<th>${row}</th>\n${SIZE_COLS.map((_, i) => `\t\t\t\t\t\t<td>${s.sizeData[row]?.[i] || ""}</td>`).join("\n")}\n\t\t\t\t\t</tr>`
  ).join("\n");

  const productInfoRows = PRODUCT_INFO_ROWS.map(row => {
    const selected = s.productInfo[row.key];
    const cells = row.options.map(opt =>
      opt === selected ? `<td><span class="bg-on">${opt}</span></td>` : `<td>${opt}</td>`
    ).join("\n\t\t\t\t\t\t");
    return `\t\t\t\t\t<tr>\n\t\t\t\t\t\t<th>${row.label}</th>\n\t\t\t\t\t\t${cells}\n\t\t\t\t\t</tr>`;
  }).join("\n");

  const selectedWashIcons = s.washIcons.map(id => WASH_ICONS.find(w => w.id === id)).filter(Boolean);
  const washIconsHtml = selectedWashIcons.map(w =>
    `\t\t\t\t\t<th>\n\t\t\t\t\t\t<div class="img ${w.dimmed ? "opac20" : "opac80"}"><img src="${w.src}" alt=""></div>\n\t\t\t\t\t</th>`
  ).join("\n");
  const washLabelsHtml = selectedWashIcons.map(w =>
    `\t\t\t\t\t<td><span class="${w.dimmed ? "opac20" : "opac100 b"}">${w.label}</span></td>`
  ).join("\n");
  const colW = Math.round(100 / selectedWashIcons.length);
  const washColgroup = selectedWashIcons.map(() => `\t\t\t\t<col width="${colW}%">`).join("\n");
  const washNoteHtml = s.washNote.split("\n").join("<br>\n\t\t\t\t\t\t\t");

  return `<!-- 스타일시트 링크 -->
<link rel="stylesheet" href="https://ozkiz1.cafe24.com/web/upload/oz_base/css/oz_page.css" type="text/css">

<!-- s: detail-page -->
<div class="detail-page" style="max-width: 860px;">

\t<h2 class="a-tit b say" style="margin: 100px auto;">
\t\t${mainTitleHtml}
\t</h2>

\t<div class="img" id="onlyimg">
\t\t<img alt="오즈키즈 아동복" src="${getImgSrc(s.images[0])}">
\t</div>

\t<div class="gap150"></div>

\t<h1 class="a-tit">
\t\t<span class="b" style="color: #000000;">${s.productNameBold}</span>
\t\t<br>${s.productNameNormal}
\t</h1>

\t<div class="gap50"></div>

\t<div class="txt">
\t\t${descHtml}
\t</div>

\t<div class="gap150"></div>

\t<div class="img" id="onlyimg">
\t\t<img alt="오즈키즈 아동복" src="${getImgSrc(s.images[1])}">
\t</div>

\t<div class="gap150"></div>

\t<h4 class="b-tit left b">체크포인트</h4>
\t<div class="txt left">
\t\t${checkHtml}
\t</div>

\t<div class="gap50"></div>

\t<div class="img" id="onlyimg">
\t\t<img alt="오즈키즈 아동복" src="${getImgSrc(s.images[2])}">
\t</div>

\t<h4 class="b-tit left b">컬러정보</h4>
\t<div class="txt left"><span class="b" style="color: ${s.colorDot};">●</span> ${s.colorInfo}
\t</div>
\t<div class="img" id="onlyimg">
\t\t<img alt="오즈키즈 아동복" src="${getImgSrc(s.images[3])}">
\t</div>

\t<div class="gap150"></div>

\t<h4 class="b-tit left b">사이즈 정보</h4>
\t<p class="txt left">
\t\t상세 사이즈의 치수는 측정 방법과 위치에 따라 1-3cm 정도의 오차가 발생할 수 있습니다.<br>
\t\t구매 시 상세 사이즈를 확인 바랍니다.
\t</p>
\t<div class="cont">
\t\t<p class="txt b left">${s.sizeType} 사이즈</p>
\t\t<table class="tbl-type01">
\t\t\t<colgroup>
\t\t\t\t<col width="16%">
${SIZE_COLS.map(() => `\t\t\t\t<col width="15%">`).join("\n")}
\t\t\t</colgroup>
\t\t\t<thead>
\t\t\t\t<tr>
\t\t\t\t\t<th>사이즈</th>
${SIZE_COLS.map(c => `\t\t\t\t\t<th>${c}</th>`).join("\n")}
\t\t\t\t</tr>
\t\t\t</thead>
\t\t\t<tbody>
${sizeRows}
\t\t\t</tbody>
\t\t</table>
\t</div>

\t<div class="gap150"></div>

\t<h4 class="b-tit left b">제품정보 보기</h4>
\t<div class="cont">
\t\t<table class="tbl-type01">
\t\t\t<colgroup>
\t\t\t\t<col width="25%"><col width="25%"><col width="25%"><col width="25%">
\t\t\t</colgroup>
\t\t\t<tbody>
${productInfoRows}
\t\t\t</tbody>
\t\t</table>
\t</div>

\t<div class="gap150"></div>

\t<h4 class="b-tit left b">세탁안내</h4>
\t<div class="cont">
\t\t<table class="tbl-type04">
\t\t\t<colgroup>
${washColgroup}
\t\t\t</colgroup>
\t\t\t<thead>
\t\t\t\t<tr>
${washIconsHtml}
\t\t\t\t</tr>
\t\t\t\t<tr>
${washLabelsHtml}
\t\t\t\t</tr>
\t\t\t</thead>
\t\t\t<tbody>
\t\t\t\t<tr>
\t\t\t\t\t<td colspan="${selectedWashIcons.length}">
\t\t\t\t\t\t${washNoteHtml}
\t\t\t\t\t</td>
\t\t\t\t</tr>
\t\t\t</tbody>
\t\t</table>
\t</div>

\t<div class="gap150"></div>

\t<h4 class="b-tit left b">제품상세 정보 보기</h4>
\t<div class="cont">
\t\t<table class="tbl-type01">
\t\t\t<colgroup>
\t\t\t\t<col width="25%"><col width="*">
\t\t\t</colgroup>
\t\t\t<tbody>
\t\t\t\t<tr><th>제품 번호</th><td>${s.productNumber}</td></tr>
\t\t\t\t<tr><th>제품 소재</th><td>${s.material.split("\n").join("<br>")}</td></tr>
\t\t\t\t<tr><th>제조사/수입사</th><td>${s.manufacturer}</td></tr>
\t\t\t\t<tr><th>제조국</th><td>${s.madeIn}</td></tr>
\t\t\t</tbody>
\t\t</table>
\t</div>

\t<div class="gap150"></div>

\t<h4 class="b-tit left b">인증정보</h4>
\t<div class="cont">
\t\t<table class="tbl-type01">
\t\t\t<colgroup>
\t\t\t\t<col width="20%"><col width="*">
\t\t\t</colgroup>
\t\t\t<tbody>
\t\t\t\t<tr>
\t\t\t\t\t<th><img src="https://ozkiz.com/web/upload/oz_kc_256.png" style="width: 40%;"></th>
\t\t\t\t\t<td>
\t\t\t\t\t\t<p class="left" style="margin: auto 10px;">
\t\t\t\t\t\t\t본 제품은 FITI 시험 연구원을 통해 <span class="b">공급자 적합성 확인 인증</span>을 받은 안전한 소재로 제작된 안전한 제품입니다.
\t\t\t\t\t\t</p>
\t\t\t\t\t</td>
\t\t\t\t</tr>
\t\t\t</tbody>
\t\t</table>
\t</div>

\t<div class="gap150"></div>

</div>
<!-- e: detail-page //-->`;
}

// ── UI 컴포넌트 ────────────────────────────────────────────────
const Section = ({ title, children }) => (
  <div style={{ marginBottom: 32 }}>
    <div style={{ fontWeight: 700, fontSize: 13, color: "#4f46e5", marginBottom: 16, paddingBottom: 8, borderBottom: "2px solid #e0e7ff", letterSpacing: 0.5 }}>
      {title}
    </div>
    {children}
  </div>
);

const Field = ({ label, children, hint }) => (
  <div style={{ marginBottom: 14 }}>
    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 5 }}>{label}</label>
    {hint && <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 4 }}>{hint}</div>}
    {children}
  </div>
);

const Input = ({ value, onChange, placeholder }) => (
  <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
    style={{ width: "100%", padding: "8px 10px", border: "1px solid #e5e7eb", borderRadius: 6, fontSize: 13, boxSizing: "border-box" }} />
);

const Textarea = ({ value, onChange, rows = 3, placeholder }) => (
  <textarea value={value} onChange={e => onChange(e.target.value)} rows={rows} placeholder={placeholder}
    style={{ width: "100%", padding: "8px 10px", border: "1px solid #e5e7eb", borderRadius: 6, fontSize: 13, resize: "vertical", boxSizing: "border-box", lineHeight: 1.6 }} />
);

// ── 이미지 업로드 컴포넌트 ─────────────────────────────────────
function ImageUploader({ image, onChange }) {
  const inputRef = useRef();
  const [dragOver, setDragOver] = useState(false);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const preview = URL.createObjectURL(file);
    onChange({ ...image, file, preview, url: "" });
  };

  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 6 }}>{image.label}</div>
      <div
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={e => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
        onClick={() => inputRef.current.click()}
        style={{
          border: `2px dashed ${dragOver ? "#4f46e5" : "#d1d5db"}`,
          borderRadius: 8, padding: 12, cursor: "pointer", textAlign: "center",
          background: dragOver ? "#eef2ff" : "#fafafa", transition: "all 0.15s",
          minHeight: 80, display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
        }}
      >
        {image.preview ? (
          <>
            <img src={image.preview} alt="" style={{ height: 60, objectFit: "contain", borderRadius: 4 }} />
            <span style={{ fontSize: 12, color: "#6b7280" }}>{image.file?.name}</span>
          </>
        ) : (
          <div>
            <div style={{ fontSize: 20, marginBottom: 4 }}>🖼</div>
            <div style={{ fontSize: 12, color: "#9ca3af" }}>드래그앤드롭 또는 클릭해서 업로드</div>
          </div>
        )}
      </div>
      <input ref={inputRef} type="file" accept="image/*" style={{ display: "none" }}
        onChange={e => handleFile(e.target.files[0])} />
      <div style={{ marginTop: 6 }}>
        <input value={image.url} onChange={e => onChange({ ...image, url: e.target.value, file: null, preview: "" })}
          placeholder="또는 이미지 URL 직접 입력"
          style={{ width: "100%", padding: "6px 10px", border: "1px solid #e5e7eb", borderRadius: 6, fontSize: 12, boxSizing: "border-box", color: "#6b7280" }} />
      </div>
    </div>
  );
}

// ── 메인 앱 ───────────────────────────────────────────────────
export default function OzkizGenerator() {
  const [s, setS] = useState(initState());
  const [tab, setTab] = useState("edit");
  const [copied, setCopied] = useState(false);
  const iframeRef = useRef(null);
  const iframeReady = useRef(false);
  const [savingJpg, setSavingJpg] = useState(false);

  const set = (key, val) => setS(prev => ({ ...prev, [key]: val }));
  const html = generateHTML(s);

  // 미리보기: 스크롤 위치 유지하면서 내용 업데이트
  useEffect(() => {
    if (tab !== "preview") return;
    const iframe = iframeRef.current;
    if (!iframe) return;

    const inject = () => {
      try {
        const win = iframe.contentWindow;
        const doc = win.document;
        const scrollY = win.scrollY || 0;
        // CSS가 없으면 주입
        if (!doc.head.querySelector("style[data-oz]")) {
          const style = doc.createElement("style");
          style.setAttribute("data-oz", "1");
          style.textContent = OZ_PAGE_CSS;
          doc.head.appendChild(style);
        }
        doc.body.innerHTML = html;
        win.scrollTo(0, scrollY);
        iframeReady.current = true;
      } catch (e) {}
    };

    // iframe이 아직 로드 안된 경우 대비
    if (iframe.contentDocument && iframe.contentDocument.readyState === "complete") {
      inject();
    } else {
      iframe.onload = inject;
    }
  }, [html, tab]);

  const handleIframeLoad = () => {};

  const handleCopy = () => {
    navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${s.productCode || "detail"}_page.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSaveJpg = async () => {
    setSavingJpg(true);
    try {
      // html2canvas를 메인 페이지에 로드
      await new Promise((resolve, reject) => {
        if (window.html2canvas) { resolve(); return; }
        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });

      // iframe 내용을 숨겨진 div에 복제해서 캡처
      const iframe = iframeRef.current;
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      const fullHtml = `<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8"><style>${OZ_PAGE_CSS}</style></head><body style="margin:0;background:#fff;">${html}</body></html>`;

      // 숨겨진 iframe으로 전체 페이지 렌더링
      const hiddenIframe = document.createElement("iframe");
      hiddenIframe.style.cssText = "position:fixed;left:-9999px;top:0;width:860px;height:auto;border:none;visibility:hidden;";
      document.body.appendChild(hiddenIframe);

      await new Promise(resolve => {
        hiddenIframe.onload = resolve;
        hiddenIframe.srcdoc = fullHtml;
      });

      // 전체 높이로 iframe 설정
      const hiddenDoc = hiddenIframe.contentDocument;
      const fullHeight = hiddenDoc.documentElement.scrollHeight;
      hiddenIframe.style.height = fullHeight + "px";
      hiddenIframe.style.visibility = "visible";

      // 잠깐 대기 후 캡처 (이미지 로딩 대기)
      await new Promise(r => setTimeout(r, 800));

      const canvas = await window.html2canvas(hiddenDoc.body, {
        useCORS: true,
        allowTaint: true,
        scale: 2,
        width: 860,
        height: fullHeight,
        windowWidth: 860,
        windowHeight: fullHeight,
        scrollX: 0,
        scrollY: 0,
        backgroundColor: "#ffffff",
        foreignObjectRendering: false,
      });

      document.body.removeChild(hiddenIframe);

      // 새 탭에서 이미지 열기 (다운로드 차단 우회)
      const dataUrl = canvas.toDataURL("image/jpeg", 0.95);
      const newTab = window.open();
      newTab.document.write(`
        <html><head><title>${s.productCode || "detail"}_page.jpg</title></head>
        <body style="margin:0;background:#000;display:flex;flex-direction:column;align-items:center;">
          <div style="padding:12px;background:#222;width:100%;text-align:center;position:sticky;top:0;z-index:9">
            <span style="color:#fff;font-size:14px;margin-right:16px;">👇 이미지를 우클릭 → 다른 이름으로 저장</span>
            <a href="${dataUrl}" download="${s.productCode || "detail"}_page.jpg" 
               style="background:#4f46e5;color:#fff;padding:8px 20px;border-radius:6px;text-decoration:none;font-size:14px;font-weight:700;">
              ⬇ 다운로드
            </a>
          </div>
          <img src="${dataUrl}" style="max-width:100%;display:block;" />
        </body></html>
      `);
      newTab.document.close();
    } catch (e) {
      alert("이미지 저장 중 오류가 발생했어요:\n" + e.message);
      console.error(e);
    }
    setSavingJpg(false);
  };

  const updateImage = (idx, newImg) => {
    const imgs = [...s.images];
    imgs[idx] = newImg;
    set("images", imgs);
  };

  const updateSizeData = (row, colIdx, val) => {
    const newData = { ...s.sizeData, [row]: [...(s.sizeData[row] || [])] };
    newData[row][colIdx] = val;
    set("sizeData", newData);
  };

  const toggleWash = (id) => {
    const cur = s.washIcons;
    set("washIcons", cur.includes(id) ? cur.filter(w => w !== id) : [...cur, id]);
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "'Segoe UI', sans-serif", background: "#f8fafc", overflow: "hidden" }}>

      {/* ── 왼쪽: 입력 패널 ── */}
      <div style={{ width: 400, background: "#fff", borderRight: "1px solid #e5e7eb", display: "flex", flexDirection: "column", flexShrink: 0 }}>
        {/* 헤더 */}
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #f3f4f6", background: "#18181b" }}>
          <div style={{ color: "#fff", fontWeight: 800, fontSize: 15 }}>
            <span style={{ color: "#6366f1" }}>◈</span> 오즈키즈 상세페이지 생성기
          </div>
          <div style={{ color: "#71717a", fontSize: 11, marginTop: 2 }}>입력하면 HTML이 자동으로 만들어져요</div>
        </div>

        {/* 입력 폼 */}
        <div style={{ flex: 1, overflowY: "auto", padding: 20 }}>

          <Section title="① 기본 정보">
            <Field label="상품 코드" hint="예: o500, p123">
              <Input value={s.productCode} onChange={v => set("productCode", v)} placeholder="o500" />
            </Field>
            <Field label="이미지 서버 주소" hint="이미지 URL 자동 생성에 사용">
              <Input value={s.imageBaseUrl} onChange={v => set("imageBaseUrl", v)} />
            </Field>
          </Section>

          <Section title="② 이미지">
            {s.images.map((img, i) => (
              <ImageUploader key={img.key} image={img} onChange={newImg => updateImage(i, newImg)} />
            ))}
          </Section>

          <Section title="③ 텍스트">
            <Field label="메인 타이틀" hint="줄바꿈은 Enter로">
              <Textarea value={s.mainTitle} onChange={v => set("mainTitle", v)} rows={2} />
            </Field>
            <Field label="상품명 (굵은 부분)">
              <Input value={s.productNameBold} onChange={v => set("productNameBold", v)} placeholder="코튼플로럴" />
            </Field>
            <Field label="상품명 (일반 부분)">
              <Input value={s.productNameNormal} onChange={v => set("productNameNormal", v)} placeholder="원피스 가디건" />
            </Field>
            <Field label="상품 설명" hint="줄바꿈은 Enter로">
              <Textarea value={s.description} onChange={v => set("description", v)} rows={4} />
            </Field>
            <Field label="체크포인트" hint="항목마다 Enter로 구분">
              <Textarea value={s.checkpoints} onChange={v => set("checkpoints", v)} rows={3} />
            </Field>
            <Field label="컬러 정보">
              <div style={{ display: "flex", gap: 8 }}>
                <input type="color" value={s.colorDot} onChange={e => set("colorDot", e.target.value)}
                  style={{ width: 40, height: 36, border: "1px solid #e5e7eb", borderRadius: 6, padding: 2, cursor: "pointer" }} />
                <input value={s.colorInfo} onChange={e => set("colorInfo", e.target.value)}
                  placeholder="화이트 / white"
                  style={{ flex: 1, padding: "8px 10px", border: "1px solid #e5e7eb", borderRadius: 6, fontSize: 13 }} />
              </div>
            </Field>
          </Section>

          <Section title="④ 사이즈 정보">
            <Field label="사이즈 유형">
              <Input value={s.sizeType} onChange={v => set("sizeType", v)} placeholder="상의 / 하의" />
            </Field>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                <thead>
                  <tr>
                    <th style={{ background: "#f3f4f6", padding: "6px 8px", border: "1px solid #e5e7eb" }}></th>
                    {SIZE_COLS.map(c => <th key={c} style={{ background: "#f3f4f6", padding: "6px 8px", border: "1px solid #e5e7eb", fontWeight: 700 }}>{c}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {SIZE_ROWS.map(row => (
                    <tr key={row}>
                      <td style={{ background: "#f9fafb", padding: "4px 8px", border: "1px solid #e5e7eb", fontWeight: 600, whiteSpace: "nowrap" }}>{row}</td>
                      {SIZE_COLS.map((_, i) => (
                        <td key={i} style={{ border: "1px solid #e5e7eb", padding: 2 }}>
                          <input value={s.sizeData[row]?.[i] || ""} onChange={e => updateSizeData(row, i, e.target.value)}
                            style={{ width: "100%", padding: "4px 6px", border: "none", fontSize: 12, textAlign: "center", background: "transparent" }} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section title="⑤ 제품정보">
            {PRODUCT_INFO_ROWS.map(row => (
              <Field key={row.key} label={row.label}>
                <div style={{ display: "flex", gap: 8 }}>
                  {row.options.map(opt => (
                    <button key={opt} onClick={() => set("productInfo", { ...s.productInfo, [row.key]: opt })}
                      style={{
                        flex: 1, padding: "7px 0", border: "1px solid", borderRadius: 6, fontSize: 12, cursor: "pointer", fontWeight: 600,
                        borderColor: s.productInfo[row.key] === opt ? "#4f46e5" : "#e5e7eb",
                        background: s.productInfo[row.key] === opt ? "#4f46e5" : "#fff",
                        color: s.productInfo[row.key] === opt ? "#fff" : "#374151",
                      }}>
                      {opt}
                    </button>
                  ))}
                </div>
              </Field>
            ))}
          </Section>

          <Section title="⑥ 세탁 안내">
            <Field label="세탁 아이콘 선택">
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {WASH_ICONS.map(w => (
                  <div key={w.id} onClick={() => toggleWash(w.id)}
                    style={{
                      display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                      padding: "8px 10px", border: "2px solid", borderRadius: 8, cursor: "pointer",
                      borderColor: s.washIcons.includes(w.id) ? "#4f46e5" : "#e5e7eb",
                      background: s.washIcons.includes(w.id) ? "#eef2ff" : "#fff",
                      minWidth: 60,
                    }}>
                    <img src={w.src} alt={w.label} style={{ width: 28, opacity: w.dimmed ? 0.3 : 0.8 }} />
                    <span style={{ fontSize: 10, color: "#374151", textAlign: "center" }}>{w.label}</span>
                  </div>
                ))}
              </div>
            </Field>
            <Field label="세탁 안내 문구">
              <Textarea value={s.washNote} onChange={v => set("washNote", v)} rows={3} />
            </Field>
          </Section>

          <Section title="⑦ 제품 상세">
            <Field label="제품 번호"><Input value={s.productNumber} onChange={v => set("productNumber", v)} placeholder="O26SB03G" /></Field>
            <Field label="소재" hint="줄바꿈으로 구분"><Textarea value={s.material} onChange={v => set("material", v)} rows={2} /></Field>
            <Field label="제조사/수입사"><Input value={s.manufacturer} onChange={v => set("manufacturer", v)} /></Field>
            <Field label="제조국"><Input value={s.madeIn} onChange={v => set("madeIn", v)} /></Field>
          </Section>

        </div>
      </div>

      {/* ── 오른쪽: 결과 패널 ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* 툴바 */}
        <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "12px 20px", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ display: "flex", gap: 2, background: "#f3f4f6", borderRadius: 8, padding: 3 }}>
            {["edit", "preview"].map(t => (
              <button key={t} onClick={() => setTab(t)}
                style={{
                  padding: "6px 16px", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600,
                  background: tab === t ? "#fff" : "transparent",
                  color: tab === t ? "#111827" : "#6b7280",
                  boxShadow: tab === t ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                }}>
                {t === "edit" ? "💻 HTML 코드" : "👁 미리보기"}
              </button>
            ))}
          </div>
          <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
            <button onClick={handleCopy}
              style={{ padding: "8px 20px", background: copied ? "#059669" : "#fff", color: copied ? "#fff" : "#374151", border: "1px solid #e5e7eb", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
              {copied ? "✓ 복사됨!" : "📋 코드 복사"}
            </button>
            <button onClick={handleDownload}
              style={{ padding: "8px 20px", background: "#4f46e5", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 700 }}>
              ⬇ HTML 다운로드
            </button>
            <button onClick={handleSaveJpg} disabled={savingJpg || tab !== "preview"}
              style={{ padding: "8px 20px", background: savingJpg ? "#9ca3af" : (tab !== "preview" ? "#e5e7eb" : "#059669"), color: "#fff", border: "none", borderRadius: 8, cursor: tab !== "preview" ? "not-allowed" : "pointer", fontSize: 13, fontWeight: 700, whiteSpace: "nowrap" }}>
              {savingJpg ? "⏳ 저장 중..." : "🖼 JPG 내보내기"}
            </button>
          </div>
        </div>

        {/* 내용 */}
        <div style={{ flex: 1, overflowY: "auto", padding: 24 }}>
          {tab === "edit" ? (
            <div style={{ background: "#1e1e2e", borderRadius: 12, padding: 24 }}>
              <pre style={{ color: "#cdd6f4", fontSize: 12, margin: 0, whiteSpace: "pre-wrap", lineHeight: 1.7, fontFamily: "monospace" }}>
                {html}
              </pre>
            </div>
          ) : (
            <div style={{ background: "#f1f5f9", borderRadius: 12, overflow: "hidden", maxWidth: 900, margin: "0 auto" }}>
              <div style={{ background: "#e2e8f0", padding: "8px 16px", fontSize: 12, color: "#64748b", display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ef4444", display: "inline-block" }}></span>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#fbbf24", display: "inline-block" }}></span>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#22c55e", display: "inline-block" }}></span>
                <span style={{ marginLeft: 8 }}>oz_page.css 스타일 적용 미리보기</span>
              </div>
              <iframe
                ref={iframeRef}
                src="about:blank"
                onLoad={handleIframeLoad}
                style={{ width: "100%", height: "80vh", border: "none", background: "#fff" }}
                title="preview"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

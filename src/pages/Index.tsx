import { useState, useEffect } from "react";

const ALPHABET = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ".split("");
const NUMBERS = [1,2,3,4,5,6,7,8,9,10];

const COLORS = [
  { name: "Красный",    hex: "#FF4D6D" },
  { name: "Оранжевый", hex: "#FF9A3C" },
  { name: "Жёлтый",    hex: "#FFE045" },
  { name: "Зелёный",   hex: "#4ADE80" },
  { name: "Синий",     hex: "#60A5FA" },
  { name: "Фиолетовый",hex: "#C084FC" },
  { name: "Розовый",   hex: "#F472B6" },
  { name: "Белый",     hex: "#F1F5F9" },
];

const SHAPES = [
  { name: "Круг",          svg: <circle cx="40" cy="40" r="35" />, planet: "🪐" },
  { name: "Квадрат",       svg: <rect x="7" y="7" width="66" height="66" rx="6" />, planet: "🛸" },
  { name: "Треугольник",   svg: <polygon points="40,5 75,75 5,75" />, planet: "🚀" },
  { name: "Прямоугольник", svg: <rect x="5" y="20" width="70" height="40" rx="6" />, planet: "🌍" },
  { name: "Овал",          svg: <ellipse cx="40" cy="40" rx="38" ry="24" />, planet: "🌙" },
  { name: "Ромб",          svg: <polygon points="40,5 75,40 40,75 5,40" />, planet: "⭐" },
];

const WORDS = [
  { word: "РА-КЕ-ТА",    emoji: "🚀" },
  { word: "КОС-МОС",     emoji: "🌌" },
  { word: "ЗВЕ-ЗДА",     emoji: "⭐" },
  { word: "ПЛА-НЕ-ТА",   emoji: "🪐" },
  { word: "КОС-МО-НАВТ", emoji: "👨‍🚀" },
  { word: "ЛУ-НА",       emoji: "🌕" },
];

const LETTER_SPACE: Record<string, string> = {
  А:"🚀", Б:"🌌", В:"⭐", Г:"🪐", Д:"🌙",
  Е:"☄️", Ё:"🛸", Ж:"💫", З:"🌟", И:"🌍",
  Й:"🌎", К:"🌏", Л:"🔭", М:"🛰️", Н:"👨‍🚀",
  О:"👩‍🚀", П:"🪐", Р:"🚀", С:"⭐", Т:"🌠",
  У:"🌌", Ф:"💥", Х:"🌑", Ц:"🌒", Ч:"🌓",
  Ш:"🌔", Щ:"🌕", Ъ:"🌖", Ы:"🌗", Ь:"🌘",
  Э:"☀️", Ю:"🪐", Я:"🌟",
};

const NUMBER_SPACE: Record<number, { emoji: string; label: string }> = {
  1:  { emoji:"🚀",                                      label:"ракета" },
  2:  { emoji:"🪐🪐",                                    label:"планеты" },
  3:  { emoji:"⭐⭐⭐",                                  label:"звезды" },
  4:  { emoji:"🌙🌙🌙🌙",                               label:"луны" },
  5:  { emoji:"👨‍🚀👨‍🚀👨‍🚀👨‍🚀👨‍🚀",              label:"космонавты" },
  6:  { emoji:"💫💫💫💫💫💫",                           label:"вспышки" },
  7:  { emoji:"🌍🌎🌏🌍🌎🌏🌍",                         label:"планет" },
  8:  { emoji:"☄️☄️☄️☄️☄️☄️☄️☄️",                    label:"кометы" },
  9:  { emoji:"🌟🌟🌟🌟🌟🌟🌟🌟🌟",                    label:"звёзд" },
  10: { emoji:"🛸🛸🛸🛸🛸🛸🛸🛸🛸🛸",                  label:"тарелок" },
};

const SHAPE_COLORS = ["#818CF8","#F472B6","#34D399","#60A5FA","#FBBF24","#C084FC"];

type Group = "middle" | "senior" | "prep";

const groupMeta = {
  middle: { label: "Средняя группа",   age: "4–5 лет", accent: "#818CF8", glow: "#818CF855", emoji: "🌙" },
  senior: { label: "Старшая группа",   age: "5–6 лет", accent: "#34D399", glow: "#34D39955", emoji: "⭐" },
  prep:   { label: "Подготовительная", age: "6–7 лет", accent: "#F472B6", glow: "#F472B655", emoji: "🚀" },
};

const STARS = Array.from({ length: 120 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2.5 + 0.5,
  delay: Math.random() * 4,
  dur: Math.random() * 2 + 2,
}));

export default function Index() {
  const [activeGroup, setActiveGroup] = useState<Group>("middle");
  const [flipped, setFlipped] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const meta = groupMeta[activeGroup];

  useEffect(() => { setMounted(true); }, []);

  return (
    <div className="min-h-screen font-nunito relative overflow-x-hidden"
      style={{ background: "linear-gradient(160deg, #06080F 0%, #0D1B3E 50%, #0A0F2E 100%)" }}>

      {/* Звёздное небо */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {STARS.map(s => (
          <div key={s.id} className="absolute rounded-full"
            style={{
              left: `${s.x}%`, top: `${s.y}%`,
              width: s.size, height: s.size,
              background: "#fff",
              opacity: mounted ? 0.7 : 0,
              animation: `twinkle ${s.dur}s ${s.delay}s infinite alternate`,
            }} />
        ))}
      </div>

      <style>{`
        @keyframes twinkle { from { opacity:0.2; transform:scale(0.8); } to { opacity:1; transform:scale(1.3); } }
        @keyframes float   { 0%,100% { transform:translateY(0px); } 50% { transform:translateY(-12px); } }
        .float { animation: float 4s ease-in-out infinite; }
        .glow-text { text-shadow: 0 0 20px currentColor; }
      `}</style>

      {/* HEADER */}
      <header className="relative z-10 text-center pt-12 pb-6 px-4">
        <div className="float inline-block text-6xl mb-3">🚀</div>
        <h1 className="font-kavoon text-4xl md:text-6xl glow-text mb-2"
          style={{ color: "#E2E8FF", letterSpacing: 2 }}>
          Учимся в Космосе
        </h1>
        <p className="text-indigo-300 font-nunito text-lg">Обучающий стенд детского сада</p>

        <div className="flex justify-center gap-3 mt-8 flex-wrap">
          {(Object.entries(groupMeta) as [Group, typeof meta][]).map(([key, g]) => (
            <button key={key}
              onClick={() => { setActiveGroup(key); setFlipped(null); }}
              className="px-5 py-3 rounded-2xl font-bold text-base transition-all duration-300"
              style={{
                background: activeGroup === key ? g.accent : "rgba(255,255,255,0.07)",
                color: activeGroup === key ? "#06080F" : "#CBD5E1",
                transform: activeGroup === key ? "scale(1.07)" : "scale(1)",
                boxShadow: activeGroup === key ? `0 0 24px ${g.accent}` : "none",
                border: `2px solid ${activeGroup === key ? g.accent : "rgba(255,255,255,0.12)"}`,
              }}>
              {g.emoji} {g.label}
              <span className="ml-2 text-xs opacity-70">{g.age}</span>
            </button>
          ))}
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-4 pb-20 space-y-10">

        {/* ───── СРЕДНЯЯ ───── */}
        {activeGroup === "middle" && (
          <>
            <SpaceSection title="Космический алфавит" emoji="🔤" color={meta.accent} glow={meta.glow}>
              <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-9 gap-3">
                {ALPHABET.map((letter) => (
                  <div key={letter}
                    onClick={() => setFlipped(flipped === letter ? null : letter)}
                    className="cursor-pointer rounded-2xl flex flex-col items-center justify-center gap-1 py-3 transition-all duration-200 select-none"
                    style={{
                      background: flipped === letter ? meta.accent : "rgba(255,255,255,0.06)",
                      color: flipped === letter ? "#06080F" : "#E2E8FF",
                      boxShadow: flipped === letter ? `0 0 20px ${meta.accent}` : "none",
                      transform: flipped === letter ? "scale(1.15)" : "scale(1)",
                      border: `1.5px solid ${flipped === letter ? meta.accent : "rgba(255,255,255,0.1)"}`,
                    }}>
                    <span className="text-2xl font-kavoon">{letter}</span>
                    <span className="text-lg">{LETTER_SPACE[letter] || "✨"}</span>
                  </div>
                ))}
              </div>
              <p className="text-center text-xs text-indigo-400 mt-3">Нажми на букву, чтобы выделить</p>
            </SpaceSection>

            <SpaceSection title="Цвета галактики" emoji="🌈" color={meta.accent} glow={meta.glow}>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-5">
                {COLORS.map((c) => (
                  <div key={c.name} className="flex flex-col items-center gap-2 group cursor-pointer">
                    <div className="w-14 h-14 rounded-full border-4 transition-all duration-200 group-hover:scale-125"
                      style={{ background: c.hex, borderColor: "rgba(255,255,255,0.2)", boxShadow: `0 0 18px ${c.hex}99` }} />
                    <span className="text-xs font-bold text-indigo-200 text-center">{c.name}</span>
                  </div>
                ))}
              </div>
            </SpaceSection>

            <SpaceSection title="Космические фигуры" emoji="🔷" color={meta.accent} glow={meta.glow}>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-6">
                {SHAPES.map((s, i) => (
                  <div key={s.name} className="flex flex-col items-center gap-2 group cursor-pointer">
                    <div className="relative">
                      <svg viewBox="0 0 80 80" className="w-16 h-16 group-hover:scale-110 transition-transform"
                        style={{ filter: `drop-shadow(0 0 8px ${SHAPE_COLORS[i]})` }}>
                        <g fill={SHAPE_COLORS[i]}>{s.svg}</g>
                      </svg>
                      <span className="absolute -top-2 -right-2 text-sm">{s.planet}</span>
                    </div>
                    <span className="text-xs font-bold text-indigo-200">{s.name}</span>
                  </div>
                ))}
              </div>
            </SpaceSection>
          </>
        )}

        {/* ───── СТАРШАЯ ───── */}
        {activeGroup === "senior" && (
          <>
            <SpaceSection title="Цифры в космосе" emoji="🔢" color={meta.accent} glow={meta.glow}>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                {NUMBERS.map((n) => (
                  <div key={n}
                    onClick={() => setFlipped(flipped === String(n) ? null : String(n))}
                    className="rounded-3xl p-4 flex flex-col items-center gap-2 cursor-pointer transition-all duration-200"
                    style={{
                      background: flipped === String(n) ? meta.accent : "rgba(255,255,255,0.06)",
                      color: flipped === String(n) ? "#06080F" : "#E2E8FF",
                      boxShadow: flipped === String(n) ? `0 0 28px ${meta.accent}` : "none",
                      transform: flipped === String(n) ? "scale(1.08)" : "scale(1)",
                      border: `1.5px solid ${flipped === String(n) ? meta.accent : "rgba(255,255,255,0.1)"}`,
                    }}>
                    <span className="font-kavoon text-5xl leading-none" style={{ color: flipped === String(n) ? "#06080F" : meta.accent }}>{n}</span>
                    <div className="text-lg flex flex-wrap justify-center max-w-[90px] leading-tight">
                      {NUMBER_SPACE[n].emoji}
                    </div>
                    <span className="text-xs opacity-70 font-bold">{NUMBER_SPACE[n].label}</span>
                  </div>
                ))}
              </div>
              <p className="text-center text-xs text-emerald-400 mt-3">Нажми на цифру, чтобы выделить</p>
            </SpaceSection>

            <SpaceSection title="Фигуры планет" emoji="🪐" color={meta.accent} glow={meta.glow}>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
                {SHAPES.map((s, i) => (
                  <div key={s.name} className="flex flex-col items-center gap-3 rounded-2xl p-4 cursor-pointer group"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <svg viewBox="0 0 80 80" className="w-20 h-20 group-hover:scale-110 transition-transform"
                      style={{ filter: `drop-shadow(0 0 10px ${SHAPE_COLORS[i]})` }}>
                      <g fill={SHAPE_COLORS[i]}>{s.svg}</g>
                    </svg>
                    <span className="font-bold text-sm text-indigo-200">{s.name}</span>
                    <span className="text-2xl">{s.planet}</span>
                  </div>
                ))}
              </div>
            </SpaceSection>

            <SpaceSection title="Цвета звёзд" emoji="🌟" color={meta.accent} glow={meta.glow}>
              <div className="flex flex-wrap justify-center gap-6">
                {COLORS.map((c) => (
                  <div key={c.name} className="flex flex-col items-center gap-2 group cursor-pointer">
                    <div className="w-16 h-16 rounded-2xl border-4 group-hover:scale-110 transition-all duration-200"
                      style={{ background: c.hex, borderColor: "rgba(255,255,255,0.15)", boxShadow: `0 0 22px ${c.hex}99` }} />
                    <span className="text-sm font-bold text-indigo-200">{c.name}</span>
                  </div>
                ))}
              </div>
            </SpaceSection>
          </>
        )}

        {/* ───── ПОДГОТОВИТЕЛЬНАЯ ───── */}
        {activeGroup === "prep" && (
          <>
            <SpaceSection title="Алфавит космонавта" emoji="👨‍🚀" color={meta.accent} glow={meta.glow}>
              <div className="grid grid-cols-6 sm:grid-cols-9 md:grid-cols-11 gap-2">
                {ALPHABET.map((letter) => (
                  <div key={letter}
                    onClick={() => setFlipped(flipped === letter ? null : letter)}
                    className="cursor-pointer rounded-xl flex flex-col items-center justify-center gap-0.5 py-2 px-1 transition-all duration-200 select-none"
                    style={{
                      background: flipped === letter ? meta.accent : "rgba(255,255,255,0.06)",
                      color: flipped === letter ? "#06080F" : "#E2E8FF",
                      boxShadow: flipped === letter ? `0 0 16px ${meta.accent}` : "none",
                      border: `1px solid ${flipped === letter ? meta.accent : "rgba(255,255,255,0.1)"}`,
                    }}>
                    <span className="text-xl font-kavoon">{letter}</span>
                    <span className="text-xs">{LETTER_SPACE[letter] || "✨"}</span>
                  </div>
                ))}
              </div>
            </SpaceSection>

            <SpaceSection title="Читаем слова" emoji="📖" color={meta.accent} glow={meta.glow}>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {WORDS.map((w) => (
                  <div key={w.word}
                    className="rounded-2xl p-5 flex flex-col items-center gap-3 hover:scale-105 transition-transform cursor-pointer"
                    style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", boxShadow: `0 0 20px ${meta.glow}` }}>
                    <span className="text-5xl float">{w.emoji}</span>
                    <span className="font-kavoon text-2xl glow-text" style={{ color: meta.accent }}>{w.word}</span>
                  </div>
                ))}
              </div>
            </SpaceSection>

            <div className="grid sm:grid-cols-2 gap-8">
              <SpaceSection title="Цифры 1–10" emoji="🔢" color={meta.accent} glow={meta.glow}>
                <div className="grid grid-cols-5 gap-2">
                  {NUMBERS.map((n) => (
                    <div key={n}
                      className="rounded-2xl py-3 flex flex-col items-center gap-1 hover:scale-110 transition-all cursor-pointer"
                      style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                      <span className="font-kavoon text-3xl glow-text" style={{ color: meta.accent }}>{n}</span>
                      <span className="text-base">{["🚀","🪐","⭐","🌙","👨‍🚀","💫","🌍","☄️","🌟","🛸"][n-1]}</span>
                    </div>
                  ))}
                </div>
              </SpaceSection>

              <SpaceSection title="Фигуры" emoji="🔷" color={meta.accent} glow={meta.glow}>
                <div className="grid grid-cols-3 gap-3">
                  {SHAPES.map((s, i) => (
                    <div key={s.name} className="flex flex-col items-center gap-2 group cursor-pointer">
                      <svg viewBox="0 0 80 80" className="w-14 h-14 group-hover:scale-110 transition-transform"
                        style={{ filter: `drop-shadow(0 0 8px ${SHAPE_COLORS[i]})` }}>
                        <g fill={SHAPE_COLORS[i]}>{s.svg}</g>
                      </svg>
                      <span className="text-xs font-bold text-indigo-200">{s.name}</span>
                    </div>
                  ))}
                </div>
              </SpaceSection>
            </div>

            <SpaceSection title="Цвета вселенной" emoji="🌌" color={meta.accent} glow={meta.glow}>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-4">
                {COLORS.map((c) => (
                  <div key={c.name} className="flex flex-col items-center gap-2 group cursor-pointer">
                    <div className="w-12 h-12 rounded-xl border-4 group-hover:scale-125 transition-transform"
                      style={{ background: c.hex, borderColor: "rgba(255,255,255,0.15)", boxShadow: `0 0 16px ${c.hex}88` }} />
                    <span className="text-xs font-bold text-indigo-200 text-center">{c.name}</span>
                  </div>
                ))}
              </div>
            </SpaceSection>
          </>
        )}
      </main>

      <footer className="relative z-10 text-center pb-8 text-sm text-indigo-400 font-nunito">
        🌌 Обучающий стенд детского сада · Познаём вселенную вместе
      </footer>
    </div>
  );
}

function SpaceSection({ title, emoji, color, glow, children }: {
  title: string; emoji: string; color: string; glow: string; children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl p-6 md:p-8"
      style={{
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: `0 0 40px ${glow}`,
      }}>
      <h2 className="font-kavoon text-2xl md:text-3xl mb-6 flex items-center gap-3 glow-text" style={{ color }}>
        <span className="text-3xl">{emoji}</span>
        {title}
      </h2>
      {children}
    </section>
  );
}

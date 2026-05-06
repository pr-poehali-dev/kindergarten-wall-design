import { useState } from "react";

const ALPHABET = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ".split("");
const NUMBERS = [1,2,3,4,5,6,7,8,9,10];
const COLORS = [
  { name: "Красный", hex: "#EF4444" },
  { name: "Оранжевый", hex: "#F97316" },
  { name: "Жёлтый", hex: "#EAB308" },
  { name: "Зелёный", hex: "#22C55E" },
  { name: "Синий", hex: "#3B82F6" },
  { name: "Фиолетовый", hex: "#A855F7" },
  { name: "Розовый", hex: "#EC4899" },
  { name: "Коричневый", hex: "#92400E" },
];
const SHAPES = [
  { name: "Круг", svg: <circle cx="40" cy="40" r="35" /> },
  { name: "Квадрат", svg: <rect x="7" y="7" width="66" height="66" rx="4" /> },
  { name: "Треугольник", svg: <polygon points="40,5 75,75 5,75" /> },
  { name: "Прямоугольник", svg: <rect x="5" y="20" width="70" height="40" rx="4" /> },
  { name: "Овал", svg: <ellipse cx="40" cy="40" rx="38" ry="25" /> },
  { name: "Ромб", svg: <polygon points="40,5 75,40 40,75 5,40" /> },
];

const WORDS = [
  { word: "МА-МА", emoji: "👩" },
  { word: "ПА-ПА", emoji: "👨" },
  { word: "ДОМ", emoji: "🏠" },
  { word: "КОТ", emoji: "🐱" },
  { word: "СОЛ-НЦЕ", emoji: "☀️" },
  { word: "КНИ-ГА", emoji: "📚" },
];

const LETTER_ANIMALS: Record<string, string> = {
  А: "🦊", Б: "🐻", В: "🐺", Г: "🦆", Д: "🐬",
  Е: "🦔", Ё: "🦌", Ж: "🐞", З: "🐢", И: "🦃",
  Й: "🦜", К: "🐨", Л: "🦁", М: "🐒", Н: "🦭",
  О: "🦦", П: "🐧", Р: "🦩", С: "🐘", Т: "🐯",
  У: "🦆", Ф: "🦋", Х: "🐹", Ц: "🐓", Ч: "🐡",
  Ш: "🐛", Щ: "🦎", Ъ: "🦕", Ы: "🐊", Ь: "🦔",
  Э: "🦅", Ю: "🦒", Я: "🐸",
};

const NUMBER_OBJECTS: Record<number, string> = {
  1: "⭐", 2: "🍎🍎", 3: "🌸🌸🌸", 4: "🦋🦋🦋🦋",
  5: "🍓🍓🍓🍓🍓", 6: "⚽⚽⚽⚽⚽⚽", 7: "🌈🌈🌈🌈🌈🌈🌈",
  8: "🐝🐝🐝🐝🐝🐝🐝🐝", 9: "🍄🍄🍄🍄🍄🍄🍄🍄🍄",
  10: "🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈",
};

const SHAPE_COLORS = ["#EF4444","#F97316","#EAB308","#22C55E","#3B82F6","#A855F7"];

type Group = "middle" | "senior" | "prep";

const groupMeta = {
  middle: { label: "Средняя группа", age: "4–5 лет", bg: "from-amber-50 to-orange-50", accent: "#F97316", badge: "bg-orange-400", emoji: "🌻" },
  senior: { label: "Старшая группа", age: "5–6 лет", bg: "from-emerald-50 to-teal-50", accent: "#10B981", badge: "bg-emerald-500", emoji: "🌿" },
  prep:   { label: "Подготовительная", age: "6–7 лет", bg: "from-violet-50 to-blue-50", accent: "#6366F1", badge: "bg-indigo-500", emoji: "🚀" },
};

export default function Index() {
  const [activeGroup, setActiveGroup] = useState<Group>("middle");
  const [flipped, setFlipped] = useState<string | null>(null);
  const meta = groupMeta[activeGroup];

  return (
    <div className="min-h-screen font-nunito" style={{ background: "linear-gradient(135deg, #FFF9F0 0%, #F0F7FF 100%)" }}>
      {/* HEADER */}
      <header className="text-center pt-10 pb-6 px-4">
        <div className="font-kavoon text-4xl md:text-5xl mb-2" style={{ color: "#2D3748", letterSpacing: 1 }}>
          🎨 Учимся играя
        </div>
        <p className="text-gray-500 font-nunito text-lg">Обучающий уголок детского сада</p>

        {/* Group tabs */}
        <div className="flex justify-center gap-3 mt-8 flex-wrap">
          {(Object.entries(groupMeta) as [Group, typeof meta][]).map(([key, g]) => (
            <button
              key={key}
              onClick={() => { setActiveGroup(key); setFlipped(null); }}
              className="px-5 py-3 rounded-2xl font-bold text-base transition-all duration-300 shadow-sm"
              style={{
                background: activeGroup === key ? g.accent : "#fff",
                color: activeGroup === key ? "#fff" : "#4B5563",
                transform: activeGroup === key ? "scale(1.06)" : "scale(1)",
                boxShadow: activeGroup === key ? `0 4px 20px ${g.accent}55` : "0 2px 8px #0001",
              }}
            >
              {g.emoji} {g.label}
              <span className="ml-2 text-xs opacity-80">{g.age}</span>
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pb-16 space-y-12">

        {/* ───────── СРЕДНЯЯ: АЛФАВИТ ───────── */}
        {activeGroup === "middle" && (
          <>
            <Section title="Русский алфавит" emoji="🔤" color={meta.accent}>
              <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-9 gap-3">
                {ALPHABET.map((letter) => (
                  <div
                    key={letter}
                    onClick={() => setFlipped(flipped === letter ? null : letter)}
                    className="cursor-pointer rounded-2xl flex flex-col items-center justify-center gap-1 py-3 transition-all duration-200 select-none"
                    style={{
                      background: flipped === letter ? meta.accent : "#fff",
                      color: flipped === letter ? "#fff" : "#2D3748",
                      boxShadow: flipped === letter ? `0 6px 20px ${meta.accent}55` : "0 2px 8px #0001",
                      transform: flipped === letter ? "scale(1.12)" : "scale(1)",
                    }}
                  >
                    <span className="text-2xl font-kavoon">{letter}</span>
                    <span className="text-lg">{LETTER_ANIMALS[letter] || "🐾"}</span>
                  </div>
                ))}
              </div>
              <p className="text-center text-sm text-gray-400 mt-3">Нажми на букву, чтобы выделить её</p>
            </Section>

            <Section title="Цвета" emoji="🎨" color={meta.accent}>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-4">
                {COLORS.map((c) => (
                  <div key={c.name} className="flex flex-col items-center gap-2">
                    <div
                      className="w-14 h-14 rounded-full shadow-lg border-4 border-white transition-transform hover:scale-110 cursor-pointer"
                      style={{ background: c.hex }}
                    />
                    <span className="text-xs font-bold text-gray-600 text-center">{c.name}</span>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Формы" emoji="🔷" color={meta.accent}>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
                {SHAPES.map((s, i) => (
                  <div key={s.name} className="flex flex-col items-center gap-2">
                    <svg viewBox="0 0 80 80" className="w-16 h-16 drop-shadow-md hover:scale-110 transition-transform cursor-pointer">
                      <g fill={SHAPE_COLORS[i % SHAPE_COLORS.length]}>{s.svg}</g>
                    </svg>
                    <span className="text-xs font-bold text-gray-600">{s.name}</span>
                  </div>
                ))}
              </div>
            </Section>
          </>
        )}

        {/* ───────── СТАРШАЯ: ЦИФРЫ + СЧЁТ ───────── */}
        {activeGroup === "senior" && (
          <>
            <Section title="Цифры и счёт" emoji="🔢" color={meta.accent}>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                {NUMBERS.map((n) => (
                  <div
                    key={n}
                    onClick={() => setFlipped(flipped === String(n) ? null : String(n))}
                    className="rounded-3xl p-4 flex flex-col items-center gap-2 cursor-pointer transition-all duration-200"
                    style={{
                      background: flipped === String(n) ? meta.accent : "#fff",
                      color: flipped === String(n) ? "#fff" : "#2D3748",
                      boxShadow: flipped === String(n) ? `0 8px 24px ${meta.accent}55` : "0 2px 10px #0001",
                      transform: flipped === String(n) ? "scale(1.08)" : "scale(1)",
                    }}
                  >
                    <span className="font-kavoon text-5xl leading-none">{n}</span>
                    <div className="text-xl flex flex-wrap justify-center max-w-[100px]">
                      {NUMBER_OBJECTS[n]}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-center text-sm text-gray-400 mt-3">Нажми на цифру, чтобы выделить</p>
            </Section>

            <Section title="Формы и их названия" emoji="🔷" color={meta.accent}>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
                {SHAPES.map((s, i) => (
                  <div
                    key={s.name}
                    className="flex flex-col items-center gap-3 rounded-2xl p-4 hover:shadow-md transition-all"
                    style={{ background: "#fff" }}
                  >
                    <svg viewBox="0 0 80 80" className="w-20 h-20 drop-shadow-md">
                      <g fill={SHAPE_COLORS[i % SHAPE_COLORS.length]}>{s.svg}</g>
                    </svg>
                    <span className="font-bold text-sm text-gray-700">{s.name}</span>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Цвета радуги" emoji="🌈" color={meta.accent}>
              <div className="flex flex-wrap justify-center gap-5">
                {COLORS.map((c) => (
                  <div key={c.name} className="flex flex-col items-center gap-2 group cursor-pointer">
                    <div
                      className="w-16 h-16 rounded-2xl shadow-lg group-hover:scale-110 transition-transform border-4 border-white"
                      style={{ background: c.hex }}
                    />
                    <span className="text-sm font-bold text-gray-700">{c.name}</span>
                  </div>
                ))}
              </div>
            </Section>
          </>
        )}

        {/* ───────── ПОДГОТОВИТЕЛЬНАЯ: ВСЁ ВМЕСТЕ ───────── */}
        {activeGroup === "prep" && (
          <>
            <Section title="Алфавит" emoji="📖" color={meta.accent}>
              <div className="grid grid-cols-6 sm:grid-cols-9 md:grid-cols-11 gap-2">
                {ALPHABET.map((letter) => (
                  <div
                    key={letter}
                    onClick={() => setFlipped(flipped === letter ? null : letter)}
                    className="cursor-pointer rounded-xl flex flex-col items-center justify-center gap-0.5 py-2 px-1 transition-all duration-200 select-none"
                    style={{
                      background: flipped === letter ? meta.accent : "#fff",
                      color: flipped === letter ? "#fff" : "#2D3748",
                      boxShadow: flipped === letter ? `0 4px 16px ${meta.accent}55` : "0 2px 6px #0001",
                    }}
                  >
                    <span className="text-xl font-kavoon">{letter}</span>
                    <span className="text-xs">{LETTER_ANIMALS[letter] || "🐾"}</span>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Чтение по слогам" emoji="📝" color={meta.accent}>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {WORDS.map((w) => (
                  <div
                    key={w.word}
                    className="rounded-2xl p-4 flex flex-col items-center gap-2 hover:scale-105 transition-transform cursor-pointer"
                    style={{ background: "#fff", boxShadow: "0 2px 12px #0001" }}
                  >
                    <span className="text-4xl">{w.emoji}</span>
                    <span className="font-kavoon text-2xl text-gray-800">{w.word}</span>
                  </div>
                ))}
              </div>
            </Section>

            <div className="grid sm:grid-cols-2 gap-8">
              <Section title="Цифры 1–10" emoji="🔢" color={meta.accent}>
                <div className="grid grid-cols-5 gap-2">
                  {NUMBERS.map((n) => (
                    <div
                      key={n}
                      className="rounded-2xl py-3 flex flex-col items-center gap-1 hover:scale-105 transition-all cursor-pointer"
                      style={{ background: "#fff", boxShadow: "0 2px 8px #0001" }}
                    >
                      <span className="font-kavoon text-3xl" style={{ color: meta.accent }}>{n}</span>
                      <span className="text-lg">{["⭐","🍎","🌸","🦋","🍓","⚽","🌈","🐝","🍄","🎈"][n-1]}</span>
                    </div>
                  ))}
                </div>
              </Section>

              <Section title="Фигуры" emoji="🔷" color={meta.accent}>
                <div className="grid grid-cols-3 gap-3">
                  {SHAPES.map((s, i) => (
                    <div key={s.name} className="flex flex-col items-center gap-2">
                      <svg viewBox="0 0 80 80" className="w-14 h-14 hover:scale-110 transition-transform cursor-pointer">
                        <g fill={SHAPE_COLORS[i % SHAPE_COLORS.length]}>{s.svg}</g>
                      </svg>
                      <span className="text-xs font-bold text-gray-600">{s.name}</span>
                    </div>
                  ))}
                </div>
              </Section>
            </div>

            <Section title="Цвета" emoji="🎨" color={meta.accent}>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-4">
                {COLORS.map((c) => (
                  <div key={c.name} className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-xl shadow-md hover:scale-110 transition-transform cursor-pointer border-4 border-white"
                      style={{ background: c.hex }} />
                    <span className="text-xs font-bold text-gray-600 text-center">{c.name}</span>
                  </div>
                ))}
              </div>
            </Section>
          </>
        )}
      </main>

      <footer className="text-center pb-8 text-sm text-gray-400 font-nunito">
        🎒 Обучающий стенд детского сада
      </footer>
    </div>
  );
}

function Section({ title, emoji, color, children }: {
  title: string; emoji: string; color: string; children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl p-6 md:p-8 shadow-sm" style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(8px)" }}>
      <h2 className="font-kavoon text-2xl md:text-3xl mb-6 flex items-center gap-3" style={{ color }}>
        <span className="text-3xl">{emoji}</span>
        {title}
      </h2>
      {children}
    </section>
  );
}

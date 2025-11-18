// "use client";

// import React, { useEffect, useRef, useState } from "react";

// const FOODS = ["🍔", "🍕", "🥐", "🍟", "🌮", "🍩", "🍪", "🥗"];

// type FoodItem = {
//   id: string;
//   x: number;
//   y: number;
//   emoji: string;
// };

// type Particle = {
//   id: string;
//   x: number;
//   y: number;
//   emoji: string;
//   life: number;
// };

// export default function NotFound() {
//   const gameRef = useRef<HTMLDivElement | null>(null);

//   const [playerX, setPlayerX] = useState(250);
//   const playerXRef = useRef(250);
//   const [items, setItems] = useState<FoodItem[]>([]);
//   const [particles, setParticles] = useState<Particle[]>([]);
//   const [speed, setSpeed] = useState(4);
//   const [score, setScore] = useState(0);
//   const [lives, setLives] = useState(3);
//   const [gameOver, setGameOver] = useState(false);
//   const [bounce, setBounce] = useState(false);

//   const GAME_WIDTH = 900;
//   const GAME_HEIGHT = 450;

//   // Spawn food
//   useEffect(() => {
//     if (gameOver) return;
//     const interval = setInterval(() => {
//       setItems((prev) => [
//         ...prev,
//         {
//           id: crypto.randomUUID(),
//           x: Math.random() * (GAME_WIDTH - 40),
//           y: -40,
//           emoji: FOODS[Math.floor(Math.random() * FOODS.length)],
//         },
//       ]);
//     }, 900);
//     return () => clearInterval(interval);
//   }, [gameOver]);

//   // Falling loop
//   useEffect(() => {
//     if (gameOver) return;
//     const loop = setInterval(() => {
//       setItems((prev) =>
//         prev
//           .map((item) => {
//             const newY = item.y + speed;
//             const caught =
//               newY > 340 &&
//               newY < 380 &&
//               Math.abs(item.x - playerXRef.current) < 55;

//             if (caught) {
//               setScore((s) => s + 1);
//               setSpeed((spd) => Math.min(spd + 0.2, 12));
//               setBounce(true);

//               const newParticles = Array.from({ length: 5 }).map(() => ({
//                 id: crypto.randomUUID(),
//                 x: item.x + Math.random() * 20 - 10,
//                 y: item.y + Math.random() * 10 - 5,
//                 emoji: FOODS[Math.floor(Math.random() * FOODS.length)],
//                 life: 20,
//               }));
//               setParticles((p) => [...p, ...newParticles]);
//               return null;
//             }

//             if (newY > GAME_HEIGHT - 20) {
//               setLives((l) => {
//                 const remaining = l - 1;
//                 if (remaining <= 0) setGameOver(true);
//                 return remaining;
//               });
//               return null;
//             }

//             return { ...item, y: newY };
//           })
//           .filter(Boolean)
//       );

//       setParticles((prev) =>
//         prev
//           .map((p) => ({ ...p, y: p.y - 1, life: p.life - 1 }))
//           .filter((p) => p.life > 0)
//       );

//       if (bounce) setBounce(false);
//     }, 20);

//     return () => clearInterval(loop);
//   }, [speed, gameOver, bounce]);

//   const movePlayer = (clientX: number) => {
//     if (!gameRef.current) return;
//     const rect = gameRef.current.getBoundingClientRect();
//     let x = clientX - rect.left - 50; // adjust for basket width
//     x = Math.max(0, Math.min(x, GAME_WIDTH - 100));
//     setPlayerX(x);
//     playerXRef.current = x;
//   };

//   const restart = () => {
//     setPlayerX(GAME_WIDTH / 2 - 50);
//     playerXRef.current = GAME_WIDTH / 2 - 50;
//     setItems([]);
//     setParticles([]);
//     setSpeed(4);
//     setScore(0);
//     setLives(3);
//     setGameOver(false);
//     setBounce(false);
//   };

//   return (
//     <div className="w-full h-screen flex items-center justify-center text-white select-none">
//       <div
//         ref={gameRef}
//         onMouseMove={(e) => movePlayer(e.clientX)}
//         onTouchMove={(e) => movePlayer(e.touches[0].clientX)}
//         className="relative rounded-2xl overflow-hidden shadow-2xl"
//         style={{
//           width: GAME_WIDTH,
//           height: GAME_HEIGHT,
//           background: "#b8dfe0",
//         }}
//       >
//         {/* Score */}
//         <div className="absolute top-3 left-3 text-lg font-semibold">
//           Score: {score}
//         </div>

//         {/* Lives */}
//         <div className="absolute top-3 right-3 text-lg font-semibold space-x-1">
//           {Array.from({ length: lives }).map((_, i) => (
//             <span key={i} className="text-red-500">
//               ❤️
//             </span>
//           ))}
//         </div>

//         {/* Player Basket (better design) */}
//         <div
//           className={`absolute bottom-5 transition-all duration-150`}
//           style={{ left: playerX }}
//         >
//           <div className="w-24 h-12 bg-yellow-500 rounded-b-xl relative flex justify-center items-center shadow-lg">
//             <div className="absolute top-0 w-24 h-2 bg-orange-500 rounded-t-xl"></div>
//             <div className="w-16 h-1 bg-brown-700 rounded mt-1"></div>
//           </div>
//         </div>

//         {/* Falling Food */}
//         {items.map((item) => (
//           <div
//             key={item.id}
//             className="absolute w-10 h-10 text-4xl transition-transform duration-75"
//             style={{ top: item.y, left: item.x }}
//           >
//             {item.emoji}
//           </div>
//         ))}

//         {/* Catch Particles */}
//         {particles.map((p) => (
//           <div
//             key={p.id}
//             className="absolute w-6 h-6 text-2xl transition-transform duration-75"
//             style={{ top: p.y, left: p.x, opacity: p.life / 20 }}
//           >
//             {p.emoji}
//           </div>
//         ))}

//         {/* Game Over */}
//         {gameOver && (
//           <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center p-4">
//             <h2 className="text-3xl font-bold mb-3">Game Over</h2>
//             <p className="text-lg mb-4">Final Score: {score}</p>
//             <button
//               onClick={restart}
//               className="px-6 py-3 bg-green-500 rounded-xl text-black font-semibold text-lg hover:bg-green-400 transition"
//             >
//               Restart
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

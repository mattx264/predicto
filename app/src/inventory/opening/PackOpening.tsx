// import React, { useState, useEffect } from "react";
// import "./PackOpening.css";
// import PackCard from "../../cards/PackCard";

// interface Card {
//   id: string;
//   name: string;
//   rarity: "bronze" | "silver" | "gold" | "diamond" | "legendary";
//   rating: number;
//   position: string;
//   image: string;
// }

// interface PackOpeningProps {
//   rarity: "bronze" | "silver" | "gold" | "diamond" | "legendary";
//   onComplete: (cards: Card[]) => void;
//   onClose: () => void;
// }

// const PackOpening: React.FC<PackOpeningProps> = ({
//   rarity,
//   onComplete,
//   onClose,
// }) => {
//   const [stage, setStage] = useState<
//     "idle" | "opening" | "revealing" | "complete"
//   >("idle");
//   const [revealedCards, setRevealedCards] = useState<Card[]>([]);
//   const [currentCardIndex, setCurrentCardIndex] = useState(0);

//   const generatedCards: Card[] = [
//     {
//       id: "card-1",
//       name: "Robert Lewandowski",
//       rarity: "gold",
//       rating: 89,
//       position: "ST",
//       image: "/card-image/gold-card.png",
//     },
//     {
//       id: "card-2",
//       name: "Kylian Mbappé",
//       rarity: "legendary",
//       rating: 92,
//       position: "ST",
//       image: "/card-image/platinum-card.png",
//     },
//     {
//       id: "card-3",
//       name: "Virgil van Dijk",
//       rarity: "gold",
//       rating: 87,
//       position: "CB",
//       image: "/card-image/gold-card.png",
//     },
//   ];

//   useEffect(() => {
//     if (stage === "idle") {
//       const timer = setTimeout(() => setStage("opening"), 500);
//       return () => clearTimeout(timer);
//     }

//     if (stage === "opening") {
//       const timer = setTimeout(() => {
//         setStage("revealing");
//       }, 3000);
//       return () => clearTimeout(timer);
//     }

//     if (stage === "revealing" && currentCardIndex < generatedCards.length) {
//       const timer = setTimeout(() => {
//         setRevealedCards((prev) => [...prev, generatedCards[currentCardIndex]]);
//         setCurrentCardIndex((prev) => prev + 1);
//       }, 800);
//       return () => clearTimeout(timer);
//     }

//     if (stage === "revealing" && currentCardIndex >= generatedCards.length) {
//       setStage("complete");
//     }
//   }, [stage, currentCardIndex, generatedCards.length]);

//   const handleComplete = () => {
//     onComplete(revealedCards);
//     onClose();
//   };

//   return (
//     <div className="pack-opening-overlay">
//       <div className="pack-opening-container">
//         {/* Stage 1: Pack Display */}
//         {stage === "idle" && (
//           <div className="pack-display fade-in">
//             <PackCard rarity={rarity} rating={65} position="PACK" />
//           </div>
//         )}

//         {/* Stage 2: Opening Animation */}
//         {stage === "opening" && (
//           <div className="pack-opening-animation">
//             <div className={`pack-shake ${rarity}`}>
//               <PackCard rarity={rarity} rating={65} position="PACK" />
//             </div>
//             <div className="opening-text">
//               <h2>OTWIERANIE...</h2>
//               <div className="loading-dots">
//                 <span></span>
//                 <span></span>
//                 <span></span>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Stage 3: Card Revealing */}
//         {stage === "revealing" && (
//           <div className="cards-reveal-container">
//             <div className="cards-grid">
//               {revealedCards.map((card, index) => (
//                 <div
//                   key={card.id}
//                   className={`revealed-card ${card.rarity} card-appear`}
//                   style={{ animationDelay: `${index * 0.2}s` }}
//                 >
//                   <div className="card-glow"></div>
//                   <img
//                     src={card.image}
//                     alt={card.name}
//                     className="card-image"
//                   />
//                   <div className="card-info">
//                     <div className="card-rating">{card.rating}</div>
//                     <div className="card-name">{card.name}</div>
//                     <div className="card-position">{card.position}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {currentCardIndex < generatedCards.length && (
//               <div className="revealing-text">
//                 <p>Odkrywanie kart...</p>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Stage 4: Complete */}
//         {stage === "complete" && (
//           <div className="pack-complete">
//             <div className="cards-grid">
//               {revealedCards.map((card) => (
//                 <div key={card.id} className={`revealed-card ${card.rarity}`}>
//                   <div className="card-glow"></div>
//                   <img
//                     src={card.image}
//                     alt={card.name}
//                     className="card-image"
//                   />
//                   <div className="card-info">
//                     <div className="card-rating">{card.rating}</div>
//                     <div className="card-name">{card.name}</div>
//                     <div className="card-position">{card.position}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="complete-actions">
//               <button className="complete-btn primary" onClick={handleComplete}>
//                 Dodaj do ekwipunku
//               </button>
//               <button className="complete-btn secondary" onClick={onClose}>
//                 Zamknij
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Skip button */}
//         {(stage === "opening" || stage === "revealing") && (
//           <button
//             className="skip-button"
//             onClick={() => {
//               setRevealedCards(generatedCards);
//               setStage("complete");
//             }}
//           >
//             Pomiń animację
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PackOpening;

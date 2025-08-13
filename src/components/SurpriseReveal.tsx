import React, { useState } from 'react';
import { Gift, Sparkles } from 'lucide-react';

interface SurpriseRevealProps {
  title: string;
  content: string;
}

const SurpriseReveal: React.FC<SurpriseRevealProps> = ({ title, content }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // New state for error message

  const correctPasscode = "I Will Love You Forever"; // Change this to your desired passcode
  // const correctPasscode = " "; // Change this to your desired passcode

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode == correctPasscode) {
      handleReveal();
      setIsModalOpen(false);
      setPasscode("");
      setErrorMessage("");
    } else {
      setErrorMessage("I Love You Dear! 💔 Solve the puzzle at home first!");
    }
  };

  const handleReveal = () => {
    setIsRevealed(true);

    // Create sparkle effect
    const sparkleContainer = document.getElementById('sparkle-container');
    if (sparkleContainer) {
      for (let i = 0; i < 20; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'absolute pointer-events-none animate-ping';
        sparkle.style.left = `${Math.random() * 100}%`;
        sparkle.style.top = `${Math.random() * 100}%`;
        sparkle.innerHTML = '✨';
        sparkle.style.animationDelay = `${Math.random() * 2}s`;
        sparkleContainer.appendChild(sparkle);

        setTimeout(() => {
          sparkle.remove();
        }, 3000);
      }
    }
  };

  return (
    <div className="relative" id="sparkle-container">
      {!isRevealed ? (
        <button
          onClick={() => {
            setIsModalOpen(true);
            setErrorMessage(""); // Reset error when opening modal
          }}
          className="group bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-8 py-4 rounded-full text-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-3"
        >
          <Gift className="group-hover:animate-bounce" size={24} />
          {title}
          <Sparkles className="group-hover:animate-spin" size={20} />
        </button>
      ) : (
        <div className="animate-fadeIn bg-white/95 backdrop-blur-sm rounded-lg p-8 shadow-xl border border-pink-200">
          <div className="text-center">
            <div className="text-6xl mb-4 animate-bounce">🌟</div>
            <p className="text-xl text-gray-700 italic leading-relaxed">
              {content}
              <img
                src="/gift.jpeg"
                alt="gift"
                className="mx-auto mt-2 w-64 h-44 sm:w-80 sm:h-60 rounded-lg object-cover"
              />
            </p>
            <p>Look at the box of your মিনি ছাতা।</p>
            <div className="mt-6 text-4xl animate-pulse">💕✨💖✨💕</div>
          </div>

        </div>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-80 max-w-full shadow-lg relative">
            <h2 className="text-2xl font-bold mb-4 text-center text-pink-600">Enter Passcode 💖</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="password"
                placeholder="Enter passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
              {errorMessage && (
                <p className="text-red-500 text-sm text-center">{errorMessage}</p>
              )}
              <button
                type="submit"
                className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 mt-2"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SurpriseReveal;

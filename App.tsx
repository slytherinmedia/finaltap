
import React, { useState, useEffect } from 'react';
import HabitForm from './components/HabitForm';
import ResultDashboard from './components/ResultDashboard';
import { UserHabits, PredictionResult } from './types';
import { calculateLongevity } from './geminiService';

const QUOTES = [
  "The two most important days in your life are the day you are born and the day you find out why. – Mark Twain",
  "Life is not measured by the number of breaths we take, but by the moments that take our breath away. – Maya Angelou",
  "Your time is limited, so don't waste it living someone else's life. – Steve Jobs",
  "Life is what happens when you're busy making other plans. – John Lennon",
  "In the end, it's not the years in your life that count. It's the life in your years. – Abraham Lincoln",
  "The purpose of our lives is to be happy. – Dalai Lama",
  "Life is short, and it is up to you to make it sweet. – Sarah Louise Delany",
  "Get busy living or get busy dying. – Stephen King",
  "Life is a long lesson in humility. – James M. Barrie",
  "The unexamined life is not worth living. – Socrates",
  "Life is a succession of lessons which must be lived to be understood. – Helen Keller",
  "Don't count the days, make the days count. – Muhammad Ali",
  "Life shrinks or expands in proportion to one's courage. – Anaïs Nin",
  "The only way to do great work is to love what you do. – Steve Jobs",
  "Everything you’ve ever wanted is on the other side of fear. – George Addair",
  "You only live once, but if you do it right, once is enough. – Mae West",
  "Life is a journey, not a destination. – Ralph Waldo Emerson",
  "To live is the rarest thing in the world. Most people exist, that is all. – Oscar Wilde",
  "Be where you are; otherwise you will miss your life. – Buddha",
  "The secret of life, though, is to fall seven times and to get up eight times. – Paulo Coelho"
];

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'Home' | 'Calculation' | 'About' | 'Contact'>('Home');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % QUOTES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleGenerate = async (habits: UserHabits) => {
    setLoading(true);
    setError(null);
    try {
      const prediction = await calculateLongevity(habits);
      setResult(prediction);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error(err);
      setError("The connection to the Abyss was severed. Try your invocation again.");
    } finally {
      setLoading(false);
    }
  };

  const NavItem = ({ page, label }: { page: typeof currentPage; label: string }) => (
    <button 
      onClick={() => { setCurrentPage(page); setResult(null); }}
      className={`font-hell text-sm tracking-widest transition-all ${currentPage === page ? 'text-red-500 underline' : 'text-zinc-500 hover:text-red-400'}`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen pb-20 selection:bg-red-900/40 relative">
      {/* AI Styled Hellish Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <img 
          src="https://images.unsplash.com/photo-1518173946687-a4c8a9b749f5?auto=format&fit=crop&q=80&w=2070" 
          className="w-full h-full object-cover opacity-20 filter grayscale contrast-125"
          alt="Hell Background"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-red-950/20 to-black"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-red-950/20 fire-glow rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-8">
        {/* Navigation Bar */}
        <nav className="flex justify-center gap-8 mb-16 border-b border-red-900/20 pb-4">
          <NavItem page="Home" label="ASCENSION" />
          <NavItem page="Calculation" label="THE LEDGER" />
          <NavItem page="About" label="THE LORE" />
          <NavItem page="Contact" label="SUMMON" />
        </nav>

        {currentPage === 'Home' && (
          <div className="animate-in fade-in duration-1000">
            <header className="text-center mb-16">
              <h1 className="text-6xl md:text-9xl font-hell text-white tracking-widest mb-6">
                FINAL<span className="text-red-700">TAP</span>
              </h1>
              <div className="h-24 md:h-32 flex items-center justify-center">
                <p className="text-2xl md:text-4xl text-red-200/80 italic font-serif transition-opacity duration-1000">
                  "{QUOTES[quoteIndex]}"
                </p>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="p-8 bg-zinc-950/50 border border-red-900/30 rounded-3xl text-center group hover:border-red-500/50 transition-all">
                <i className="fas fa-hourglass-start text-4xl text-red-600 mb-4"></i>
                <h3 className="text-xl font-hell text-white mb-2">PRECISION</h3>
                <p className="text-zinc-500 text-sm italic">Every sin, every drop of water, every digital hour accounted for.</p>
              </div>
              <div className="p-8 bg-zinc-950/50 border border-red-900/30 rounded-3xl text-center group hover:border-red-500/50 transition-all">
                <i className="fas fa-ghost text-4xl text-orange-600 mb-4"></i>
                <h3 className="text-xl font-hell text-white mb-2">DESTINY</h3>
                <p className="text-zinc-500 text-sm italic">Look into the eyes of the Ancient Scribe and learn your cycle count.</p>
              </div>
              <div className="p-8 bg-zinc-950/50 border border-red-900/30 rounded-3xl text-center group hover:border-red-500/50 transition-all">
                <i className="fas fa-bolt text-4xl text-emerald-600 mb-4"></i>
                <h3 className="text-xl font-hell text-white mb-2">ALTERATION</h3>
                <p className="text-zinc-500 text-sm italic">Discover the rituals required to delay the final tap.</p>
              </div>
            </div>

            <div className="mt-16 text-center">
              <button 
                onClick={() => setCurrentPage('Calculation')}
                className="px-12 py-5 bg-red-800 hover:bg-red-700 text-white rounded-full font-hell tracking-widest transition-all shadow-[0_0_40px_rgba(153,27,27,0.5)] transform hover:scale-110"
              >
                BEGIN THE AUDIT
              </button>
            </div>
          </div>
        )}

        {currentPage === 'Calculation' && (
          <main className="relative">
            {error && (
              <div className="mb-12 p-6 bg-red-950/30 border border-red-500/30 rounded-3xl text-red-400 text-center font-hell animate-bounce shadow-2xl">
                <i className="fas fa-skull mr-3"></i> {error}
              </div>
            )}

            {!result ? (
              <div className="bg-zinc-950/40 backdrop-blur-xl border border-red-950/30 rounded-[3rem] p-10 md:p-16 shadow-2xl">
                <HabitForm onSubmit={handleGenerate} isLoading={loading} />
              </div>
            ) : (
              <ResultDashboard result={result} onReset={() => setResult(null)} />
            )}
          </main>
        )}

        {currentPage === 'About' && (
          <div className="animate-in slide-in-from-right duration-700 bg-zinc-950/50 p-12 rounded-[3rem] border border-red-900/30">
            <h2 className="text-4xl font-hell text-red-600 mb-8">THE LEGEND OF FINALTAP</h2>
            <div className="space-y-6 text-zinc-400 font-serif text-lg leading-relaxed">
              <p>Founded in the deep echelons of the Infernal Bureaucracy, FinalTap serves as a mirror to the mortal coil. We believe that life is a temporary lease, and like any lease, it must be audited with cold, demonic precision.</p>
              <p>Our algorithms analyze the subtle decay caused by digital screens, the rejuvenating effects of H2O, and the metabolic impact of sugar consumption. We don't just calculate your death; we calculate the efficiency of your living.</p>
              <p>FinalTap is a tool for the brave. Only those who truly value their limited time dare to see the date on their tap.</p>
            </div>
          </div>
        )}

        {currentPage === 'Contact' && (
          <div className="animate-in slide-in-from-left duration-700 bg-zinc-950/50 p-12 rounded-[3rem] border border-red-900/30 text-center">
            <h2 className="text-4xl font-hell text-orange-600 mb-8">SUMMON THE SCRIBES</h2>
            <div className="space-y-8">
              <p className="text-zinc-400 italic font-serif">Reach out through the digital void if your ledger is incorrect or you wish to negotiate a longer lease.</p>
              <div className="flex flex-col items-center gap-4">
                <div className="p-4 bg-black border border-red-900/50 rounded-xl w-full max-w-md">
                  <label className="block text-red-500 text-xs font-hell mb-2">YOUR MORTAL IDENTIFIER (EMAIL)</label>
                  <input type="email" placeholder="soul@void.com" className="w-full bg-transparent outline-none text-white border-b border-red-900 py-2" />
                </div>
                <div className="p-4 bg-black border border-red-900/50 rounded-xl w-full max-w-md">
                  <label className="block text-red-500 text-xs font-hell mb-2">YOUR INVOCATION</label>
                  <textarea rows={4} placeholder="Speak your truth..." className="w-full bg-transparent outline-none text-white border-b border-red-900 py-2" />
                </div>
                <button className="px-10 py-4 bg-orange-800 hover:bg-orange-700 text-white rounded-full font-hell tracking-widest transition-all">
                  SEND INVOCATION
                </button>
              </div>
            </div>
          </div>
        )}

        <footer className="mt-24 text-center">
          <div className="flex justify-center gap-10 text-zinc-700 mb-6">
            <a href="#" className="hover:text-red-600 transition-all transform hover:scale-110"><i className="fab fa-github text-xl"></i></a>
            <a href="#" className="hover:text-orange-600 transition-all transform hover:scale-110"><i className="fas fa-fire-alt text-xl"></i></a>
            <a href="#" className="hover:text-red-800 transition-all transform hover:scale-110"><i className="fas fa-skull text-xl"></i></a>
          </div>
          <p className="text-[10px] text-zinc-800 uppercase tracking-[0.5em] font-hell mb-2">STAY UNTIL THE TAP</p>
          <p className="text-[9px] text-zinc-900 font-mono italic">"The value of life is not in its duration, but in its use."</p>
        </footer>
      </div>
    </div>
  );
};

export default App;

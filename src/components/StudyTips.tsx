export function StudyTips() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto">
      
      <div className="text-center space-y-3 mb-12">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#4A4A40]">How to actually remember this stuff</h2>
        <p className="text-[#8B8B7A] text-sm md:text-base font-medium">Stop just reading your notes. Here are the required methods to study for your half-yearlies.</p>
      </div>

      <div className="space-y-6">
        <div className="bg-[#5A5A40] text-white p-8 rounded-[32px] shadow-md transform transition hover:scale-[1.01]">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-[#D4A373] text-white w-12 h-12 flex items-center justify-center rounded-2xl text-2xl font-bold\">1</div>
            <h3 className="text-lg md:text-xl font-bold\">Active Recall (The Best!)</h3>
          </div>
          <p className="text-white/80 text-sm mb-4 italic">This works 3x better than just reading. Reading gives you an illusion of competence.</p>
          <div className="bg-white/10 border border-white/20 p-5 rounded-2xl space-y-2">
            <ol className="list-decimal list-inside text-white/90 font-medium space-y-2 text-sm">
              <li>Cover the answer.</li>
              <li>Try to say it out loud.</li>
              <li>Uncover and check.</li>
            </ol>
          </div>
          <div className="mt-4 text-[#F2E8CF] text-xs font-bold flex items-center gap-2 uppercase tracking-widest">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 5 5L20 7"/></svg>
            Use the Flashcards tab in this app to do this!
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#F2E8CF] border border-[#DAE3C5] p-6 rounded-[32px] shadow-sm">
             <div className="flex items-center gap-3 mb-4">
              <div className="border-2 border-[#386641] text-[#386641] w-10 h-10 flex items-center justify-center rounded-xl text-lg font-bold">2</div>
              <h3 className="text-lg font-bold text-[#386641] leading-tight">Spaced Repetition</h3>
            </div>
            <p className="text-[#386641]/80 text-xs mb-4 font-medium">Your brain forgets things exponentially. You need to interrupt the forgetting curve.</p>
            <ul className="text-xs font-bold text-[#386641] space-y-1 bg-white/40 border border-white/60 p-4 rounded-2xl">
              <li>• Review Today</li>
              <li>• Review Tomorrow</li>
              <li>• Review in 3 days</li>
              <li>• Review in 1 week</li>
            </ul>
          </div>

          <div className="bg-white border border-[#E5E5DB] p-6 rounded-[32px] shadow-sm">
             <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#E5E5DB] text-[#5A5A40] w-10 h-10 flex items-center justify-center rounded-xl text-lg font-bold">3</div>
              <h3 className="text-lg font-bold text-[#4A4A40]">Teach Someone Else</h3>
            </div>
            <p className="text-[#4A4A40]/70 text-xs mb-4 font-medium">The Feynman Technique. If you can't explain it simply, you don't understand it well enough.</p>
            <p className="text-[#D4A373] bg-[#FEFAE0] border border-[#E9EDC9] p-4 rounded-2xl text-xs font-bold">Explain it to your parent, your friend, or even a stuffed toy!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

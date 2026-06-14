import { useState } from 'react';
import { flashcards } from '../data/flashcards';
import { algebraProblems, probabilityScenarios } from '../data/practice';

interface SearchResultsProps {
  query: string;
}

export function SearchResults({ query }: SearchResultsProps) {
  const lowerQuery = query.toLowerCase();

  const matchingFlashcards = flashcards.filter(
    f => f.question.toLowerCase().includes(lowerQuery) || f.answer.toLowerCase().includes(lowerQuery) || f.category.toLowerCase().includes(lowerQuery)
  );

  const matchingAlgebra = algebraProblems.filter(
    p => p.q.toLowerCase().includes(lowerQuery) || p.a.toLowerCase().includes(lowerQuery) || p.exp.toLowerCase().includes(lowerQuery)
  );

  const matchingProbability = probabilityScenarios.filter(
    s => s.q.toLowerCase().includes(lowerQuery) || s.desc.toLowerCase().includes(lowerQuery) || s.a.toLowerCase().includes(lowerQuery) || s.title.toLowerCase().includes(lowerQuery)
  );

  const totalResults = matchingFlashcards.length + matchingAlgebra.length + matchingProbability.length;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight text-[#4A4A40] dark:text-[#E0E0D8]">Search Results for "{query}"</h2>
        <p className="text-[#8B8B7A] dark:text-[#A0A096] text-sm mt-1">{totalResults} {totalResults === 1 ? 'item' : 'items'} found</p>
      </div>

      {matchingFlashcards.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-[#5A5A40] dark:text-[#EAE6D8] border-b border-[#E5E5DB] dark:border-[#3A3A30] pb-2">Flashcards ({matchingFlashcards.length})</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {matchingFlashcards.map(f => (
              <div key={f.id} className="bg-white dark:bg-[#2A2A22] p-5 rounded-xl border border-[#E5E5DB] dark:border-[#3A3A30]">
                <span className="text-[10px] font-bold uppercase text-[#D4A373] dark:text-[#BC6C25] mb-2 block">{f.category}</span>
                <p className="font-bold text-sm text-[#4A4A40] dark:text-[#EAE6D8] mb-2">{f.question}</p>
                <p className="font-mono text-xs text-[#386641] dark:text-[#A7C890]">{f.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {matchingAlgebra.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-[#5A5A40] dark:text-[#EAE6D8] border-b border-[#E5E5DB] dark:border-[#3A3A30] pb-2">Practice: Algebra ({matchingAlgebra.length})</h3>
          <div className="grid grid-cols-1 gap-4">
            {matchingAlgebra.map((p, i) => (
              <div key={i} className="bg-white dark:bg-[#2A2A22] p-5 rounded-xl border border-[#E5E5DB] dark:border-[#3A3A30]">
                <p className="font-bold text-sm text-[#4A4A40] dark:text-[#EAE6D8] mb-2">{p.q}</p>
                <p className="font-mono text-sm text-[#386641] dark:text-[#A7C890] mb-2">{p.a}</p>
                <p className="text-xs text-[#8B8B7A] dark:text-[#A0A096] italic">{p.exp}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {matchingProbability.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-[#5A5A40] dark:text-[#EAE6D8] border-b border-[#E5E5DB] dark:border-[#3A3A30] pb-2">Practice: Probability ({matchingProbability.length})</h3>
          <div className="grid grid-cols-1 gap-4">
            {matchingProbability.map((s, i) => (
              <div key={i} className="bg-white dark:bg-[#2A2A22] p-5 rounded-xl border border-[#E5E5DB] dark:border-[#3A3A30]">
                <span className="text-[10px] font-bold uppercase text-[#D4A373] dark:text-[#BC6C25] mb-1 block">{s.title}</span>
                <p className="text-xs text-[#8B8B7A] dark:text-[#A0A096] mb-2">{s.desc}</p>
                <p className="font-bold text-sm text-[#4A4A40] dark:text-[#EAE6D8] mb-2">{s.q}</p>
                <div className="bg-[#FBFBF8] dark:bg-[#32322A] p-3 rounded-lg border border-[#F0F0E8] dark:border-[#404035]">
                  <p className="font-mono text-sm text-[#386641] dark:text-[#A7C890] mb-1">{s.a}</p>
                  <p className="font-mono text-[10px] text-[#5A5A40] dark:text-[#E0E0D8]">{s.formula}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {totalResults === 0 && (
        <div className="text-center p-12 text-[#8B8B7A] dark:text-[#A0A096]">
          <p>No matches found for "{query}". Try checking your spelling or use different keywords.</p>
        </div>
      )}
    </div>
  );
}

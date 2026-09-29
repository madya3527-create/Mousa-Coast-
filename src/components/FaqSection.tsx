import React, { useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { FAQ_DATA } from '../data/resortData';
import { HelpCircle, ChevronDown } from 'lucide-react';

interface FaqSectionProps {
  lang: Language;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ lang }) => {
  const [openId, setOpenId] = useState<string | null>(FAQ_DATA[0].id);
  const t = TRANSLATIONS[lang];

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>{lang === 'ar' ? 'معلومات تهمك' : 'Important Details'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            {t.faqTitle}
          </h2>
          <p className="mt-3 text-stone-600 text-base sm:text-lg leading-relaxed">
            {t.faqSubtitle}
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-3">
          {FAQ_DATA.map((item) => {
            const isOpen = openId === item.id;
            const question = lang === 'ar' ? item.questionAr : item.questionEn;
            const answer = lang === 'ar' ? item.answerAr : item.answerEn;

            return (
              <div
                key={item.id}
                className="border border-stone-200 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(item.id)}
                  className="w-full p-5 text-start flex items-center justify-between gap-4 bg-stone-50 hover:bg-stone-100 transition-colors cursor-pointer"
                >
                  <span className="font-bold text-stone-900 text-sm sm:text-base">
                    {question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-stone-500 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-amber-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="p-5 bg-white border-t border-stone-100 text-stone-600 text-sm leading-relaxed animate-in fade-in duration-200">
                    {answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

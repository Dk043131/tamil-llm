export const tamilScriptData = {
  vowels: [
    {
      id: 'a',
      letter: 'அ',
      name: 'A',
      type: 'uyir',
      transliteration: 'a',
      sound: 'short a as in america',
      mnemonic: "Looks like a graceful loop starting with a small circle — say 'a' as in 'app'.",
      distinctionTips: "Don't confuse with ஆ (Aaa) which adds a downward loop at the end for a longer vowel sound.",
      sampleWords: [{ tamil: 'அம்மா', Tanglish: 'Amma', english: 'Mother' }, { tamil: 'அன்பு', Tanglish: 'Anbu', english: 'Love' }]
    },
    {
      id: 'aa',
      letter: 'ஆ',
      name: 'Aa',
      type: 'uyir',
      transliteration: 'aa',
      sound: 'long aa as in father',
      mnemonic: "Same as அ but with an extra curve extended to the right to stretch the sound 'Aaa'.",
      distinctionTips: "Longer vowel sound than அ. Open your mouth wide like at the doctor's!",
      sampleWords: [{ tamil: 'ஆடு', Tanglish: 'Aadu', english: 'Goat' }, { tamil: 'ஆலயம்', Tanglish: 'Aalayam', english: 'Temple' }]
    },
    {
      id: 'i',
      letter: 'இ',
      name: 'I',
      type: 'uyir',
      transliteration: 'i',
      sound: 'short i as in pin',
      mnemonic: "Looks like a fish hook with a top coil — say 'i' like squeezing your lips in a smile.",
      distinctionTips: "Short 'i' sound. Notice the inner loop going upward.",
      sampleWords: [{ tamil: 'இலை', Tanglish: 'Ilai', english: 'Leaf' }, { tamil: 'இனிப்பு', Tanglish: 'Inippu', english: 'Sweet' }]
    },
    {
      id: 'ii',
      letter: 'ஈ',
      name: 'Ii',
      type: 'uyir',
      transliteration: 'ee',
      sound: 'long ee as in feel',
      mnemonic: "Has two standing pillars with two dots inside — looks like a fly ('Ee' in Tamil means fly!).",
      distinctionTips: "Easiest character to identify! The dots represent eyes of the fly.",
      sampleWords: [{ tamil: 'ஈ', Tanglish: 'Ee', english: 'Fly / Give' }, { tamil: 'ஈட்டி', Tanglish: 'Eetti', english: 'Spear' }]
    },
    {
      id: 'u',
      letter: 'உ',
      name: 'U',
      type: 'uyir',
      transliteration: 'u',
      sound: 'short u as in put',
      mnemonic: "Resembles the number 2 with a flat bottom bar. Smooth short 'U'.",
      distinctionTips: "Compare with ஊ which adds a special 'ள' loop sign on top.",
      sampleWords: [{ tamil: 'உலகம்', Tanglish: 'Ulagam', english: 'World' }, { tamil: 'உணவு', Tanglish: 'Unavu', english: 'Food' }]
    }
  ],
  consonants: [
    {
      id: 'ka',
      letter: 'க்',
      name: 'Ik / Ka',
      baseLetter: 'க',
      type: 'mei',
      transliteration: 'k / g',
      sound: 'k as in duck / g as in sugar',
      mnemonic: "Cross-like loop structure. The pull-dot (Pulli) on top makes it a silent consonant 'Ik'.",
      distinctionTips: "Without the dot, க is pronounced 'Ka' or 'Ga'.",
      sampleWords: [{ tamil: 'கண்', Tanglish: 'Kann', english: 'Eye' }, { tamil: 'கப்பல்', Tanglish: 'Kappal', english: 'Ship' }]
    },
    {
      id: 'zha',
      letter: 'ழ்',
      name: 'Izh / Zha',
      baseLetter: 'ழ',
      type: 'mei',
      transliteration: 'zha / ḻ',
      sound: 'special retroflex liquid sound (curl tongue back to palate)',
      mnemonic: "The unique jewel of Tamil! Look at the curling lower loop representing your curled tongue.",
      distinctionTips: "ழ vs ள vs ல:\n• ழ (Zha): Curl tongue all the way back without touching teeth!\n• ள (Lla): Retroflex L (tongue touches hard palate).\n• ல (La): Light dental L (tongue touches front upper teeth).",
      sampleWords: [{ tamil: 'தமிழ்', Tanglish: 'Tamizh', english: 'Tamil Language' }, { tamil: 'வாழை', Tanglish: 'Vaazhai', english: 'Banana' }]
    },
    {
      id: 'lla',
      letter: 'ள்',
      name: 'Ill / Lla',
      baseLetter: 'ள',
      type: 'mei',
      transliteration: 'lla / ḷ',
      sound: 'hard retroflex l',
      mnemonic: "Looks like a twin loop. Press tongue against roof of mouth.",
      distinctionTips: "Don't confuse with ல. ள is heavy and retroflex, used in words like பள்ளி (School).",
      sampleWords: [{ tamil: 'பள்ளி', Tanglish: 'Palli', english: 'School' }, { tamil: 'அவள்', Tanglish: 'Aval', english: 'She' }]
    },
    {
      id: 'la',
      letter: 'ல்',
      name: 'Il / La',
      baseLetter: 'ல',
      type: 'mei',
      transliteration: 'la',
      sound: 'light l as in love',
      mnemonic: "Light and simple loop. Touch tip of tongue to front upper teeth.",
      distinctionTips: "Lightest L sound in Tamil. Used in பால் (Milk).",
      sampleWords: [{ tamil: 'பால்', Tanglish: 'Paal', english: 'Milk' }, { tamil: 'காலம்', Tanglish: 'Kaalam', english: 'Time' }]
    }
  ]
};

export const commonTutorQuestions = [
  {
    keywords: ['difference', 'zha', 'lla', 'la', 'ழ', 'ள', 'ல'],
    question: "How do I pronounce ழ vs ள vs ல?",
    answer: "Here is Selvi's golden rule for the 3 L's:\n\n1. ழ (Zha): Curl your tongue BACK to the roof of your mouth without touching it. Produces the iconic sound in 'Tamizh'.\n2. ள (Lla): Touch the middle roof of your mouth. Heavy sound (e.g. பள்ளி - Palli).\n3. ல (La): Light sound! Tip of tongue touches behind front teeth (e.g. பால் - Paal)."
  },
  {
    keywords: ['pulli', 'dot', 'dot on top', 'புள்ளி'],
    question: "What does the dot on top of Tamil letters mean?",
    answer: "That dot is called a **Pulli** (புள்ளி)! It turns a syllabic letter into a pure consonant sound. For example, க is 'Ka', but with a dot (க்) it becomes 'Ik'."
  },
  {
    keywords: ['mnemonic', 'remember', 'easy', 'trick'],
    question: "How can I remember letter shapes easily?",
    answer: "Tamil letters are like little pictures! For example:\n• இ looks like a curly fish hook\n• ஈ looks like a fly with two eyes (dots)\n• ழ has a bottom loop showing your tongue curling back!"
  }
];

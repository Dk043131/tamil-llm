/**
 * Selvi - Tamil AI Tutor Service
 */

const commonCache = new Map();

// Initialize cache with known character distinction & mnemonic tips
const CACHED_RESPONSES = {
  'zha_mnemonic': "Struggling with ழ? Notice how the lower loop curls inward — that's your visual hint! To pronounce ழ (Zha), curl your tongue back towards the roof of your mouth without touching it. Try saying 'Tamizh'!",
  'zha_vs_lla': "The 3 L's in Tamil can be tricky!\n• ழ (Zha): Tongue rolled back (as in Tamizh)\n• ள (Lla): Hard L with tongue pressed against palate (Palli - School)\n• ல (La): Soft L behind upper teeth (Paal - Milk)",
  'a_mnemonic': "For அ (A), start with the small left circle, loop upwards and sweep across. It makes the short 'a' sound like in 'America'.",
  'pulli_explanation': "The dot on top is called 'Pulli'. It removes the vowel sound! 'க' is 'Ka', but 'க்' with a dot is silent 'Ik'.",
  'general_encouragement': "Don't worry! Tamil script logic takes a few practice strokes. You're building muscle memory!"
};

const SYSTEM_PROMPT = `
You are Selvi, a warm, encouraging, and expert Tamil AI Tutor. 
Your goal is to guide learners through Tamil script (Uyir and Mei letters), pronunciation, stroke logic, and mnemonics.
Guidelines:
- Tone: Extremely supportive, friendly, concise (2-4 sentences max).
- Style: Use English mixed with Tanglish and clear Tamil script characters.
- Use easy analogies and mouth/tongue position guides for tricky sounds like ழ, ள, ண.
`;

/**
 * Handle AI tutor query
 */
async function getTutorAdvice({ letter, queryType, attemptCount = 0, userQuestion = '', context = {} }) {
  // 1. Check cache first
  const cacheKey = `${letter || 'general'}_${queryType}_${userQuestion.toLowerCase().trim()}`;
  if (commonCache.has(cacheKey)) {
    return { advice: commonCache.get(cacheKey), cached: true };
  }

  // Check matching predefined answers for common queries
  if (userQuestion.toLowerCase().includes('difference') || userQuestion.toLowerCase().includes('ழ')) {
    return { advice: CACHED_RESPONSES['zha_vs_lla'], cached: true };
  }

  if (letter === 'ழ' && attemptCount >= 3) {
    return { advice: CACHED_RESPONSES['zha_mnemonic'], cached: true };
  }

  // 2. Check for optional LLM API Key (Anthropic or OpenAI)
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  const openAIKey = process.env.OPENAI_API_KEY;

  if (anthropicKey) {
    try {
      // Fetch dynamic LLM response via Anthropic
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': anthropicKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-haiku-20240307',
          max_tokens: 200,
          system: SYSTEM_PROMPT,
          messages: [
            {
              role: 'user',
              content: `User is practicing Tamil letter '${letter}'. Attempt count: ${attemptCount}. Question: '${userQuestion}'. Provide a short, helpful hint or mnemonic as Selvi.`
            }
          ]
        })
      });

      if (response.ok) {
        const data = await response.json();
        const adviceText = data.content?.[0]?.text || '';
        if (adviceText) {
          commonCache.set(cacheKey, adviceText);
          return { advice: adviceText, cached: false, provider: 'claude' };
        }
      }
    } catch (err) {
      console.warn('Anthropic API call failed, using fallback engine:', err.message);
    }
  }

  // 3. Fallback AI Rule Engine (Zero external dependency required)
  let fallbackAdvice = "";

  if (queryType === 'proactive_hint') {
    fallbackAdvice = `Hi there! I noticed you've tried drawing '${letter}' ${attemptCount} times. Here is Selvi's tip: Start slowly from the left loop and keep your stroke continuous! You've got this!`;
  } else if (queryType === 'mnemonic') {
    fallbackAdvice = `Selvi's Mnemonic for '${letter}': Think of this character as a flowing ribbon. Master the top curve first, then sweep downwards!`;
  } else if (userQuestion) {
    fallbackAdvice = `Great question about '${letter}'! In Tamil, characters are formed logically from basic stroke curves. Keep practicing '${letter}' and notice how it combines with vowels!`;
  } else {
    fallbackAdvice = CACHED_RESPONSES['general_encouragement'];
  }

  // Cache fallback response
  commonCache.set(cacheKey, fallbackAdvice);
  return { advice: fallbackAdvice, cached: false, provider: 'selvi-rule-engine' };
}

module.exports = {
  getTutorAdvice
};

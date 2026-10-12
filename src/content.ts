/**
 * ─────────────────────────────────────────────────────────────
 *  EVERYTHING YOU MIGHT WANT TO CHANGE LIVES IN THIS FILE.
 *  Names, every line of text, and music.
 *  Save the file and the site updates on its own.
 * ─────────────────────────────────────────────────────────────
 */

export type PromiseIcon = 'decision' | 'communication' | 'love' | 'responsibility'

export const content = {
  names: {
    me: 'Your Darling', // ← your name, signs the note
    partner: '', // ← his name (optional), shown as "For ___" under the title
  },

  /**
   * Music is OFF until he taps the sound button.
   * Leave `src` empty for the built-in soft melody,
   * or put an mp3 in /public and set src: '/our-song.mp3'
   */
  music: {
    src: '',
    volume: 0.5, // 0 to 1
  },

  title: 'Let Me Show You My Love ❤️',
  subtitle: 'Not just with words. With everything I do.',

  opening: {
    eyebrow: '', // optional small line above the envelope
    lines: ['Hey Honeybee'],
    button: 'Open My Heart ❤️',
  },

  hero: {
    scrollHint: 'Scroll down',
  },

  handwritten: {
    eyebrow: 'What I want you to know',
    text: 'My love, our life together is only just beginning, and I am all in. I love you loudly, proudly, and without any fear. I am not hiding it, and I am not holding back. You are my man, my choice, and my forever. So take my hand, because our best days start now.',
    signoff: 'With all my love,',
    /** Used only when names.me is empty. */
    signatureFallback: 'Yours',
  },

  promises: {
    eyebrow: 'I can. And I will.',
    title: 'Here are some of my promises for you',
    hint: 'Tap a card to turn it over',
    cards: [
      {
        icon: 'decision' as PromiseIcon,
        title: 'I will do it',
        promise: 'I will decide, I will lead, and I will take the first step. Nothing is too hard for me.',
        detail: 'Ask me for anything. Then watch me do it.',
      },
      {
        icon: 'love' as PromiseIcon,
        title: 'I will take care of you',
        promise: 'Your heart, your health and your peace are safe with me, every single day.',
        detail: 'You have looked after so much. Now it is my turn to look after you.',
      },
      {
        icon: 'responsibility' as PromiseIcon,
        title: 'Give your future to me',
        promise: 'Trust me with your dreams. I will work for them like they are my own, until they come true.',
        detail: 'Your success is my goal too, and I do not stop halfway.',
      },
      {
        icon: 'communication' as PromiseIcon,
        title: 'When failure comes',
        promise: 'I will be right there. We will talk it through, get back up, and move on from it together.',
        detail: 'No setback can break us. We will turn it into a superb life.',
      },
    ],
  },

  fun: {
    eyebrow: 'And one more thing',
    title: 'We are going to have so much fun',
    text: 'Lots of laughter, lots of enjoyment, lots of memories. Life with me will never be boring.',
    question: 'So tell me, where are we going first?',
    options: [
      {
        label: 'Dubai ✈️',
        reply: 'Dubai it is! City lights, desert rides, and you beside me. I will plan everything.',
      },
      {
        label: 'Sri Lanka 🌴',
        reply: 'Sri Lanka it is! Beaches, green hills, and you beside me. Leave the planning to me.',
      },
    ],
  },

  finale: {
    lines: ['This is me, standing in front of you.', 'Ready for everything.', 'All I need is your hand.'],
    question: 'Will you give us the chance to keep growing together? ❤️',
    choices: {
      future: {
        label: "Let's Build Our Future Together ❤️",
        response: 'Then hold my hand. I will make every day of our life worth it. You and me, always.',
      },
      talk: {
        label: "Let's Talk From the Heart 💌",
        response:
          'I am here. I want to listen to everything you feel. Your heart matters to me too.',
      },
    },
    back: 'Go back',
    replay: 'Read it again',
  },
}

export type Content = typeof content

export interface EssayPlan {
  point: string;
  eta1: string;
  eta2: string;
  link: string;
}

export interface QuizQuestion {
  q: string;
  options: string[];
  answer: number;
  exp: string;
}

export interface TrueFalseQuestion {
  q: string;
  answer: boolean;
  exp: string;
}

export interface Chapter {
  id: number;
  title: string;
  summary: string;
  themes: string[];
  quote: string;
  speaker: string;
  analysis: string;
  technique: string;
  mcq: QuizQuestion[];
  trueFalse: TrueFalseQuestion[];
  essayPrompt: string;
  exemplarPlan: EssayPlan;
}

export const BOOK_CHAPTERS: Chapter[] = [
  {
    id: 1,
    title: "Chapter 1: A Monster Calls",
    summary: "Conor O'Malley is awakened at exactly 12:07 AM by a voice calling his name from outside his window. Conor is expecting the terrifying nightmare that has plagued his sleep for months, but instead finds a giant woodland Monster formed from the ancient Yew Tree in the churchyard. Rather than screaming or fleeing, Conor remains completely unfazed. He tells the Monster he has seen far worse in his own sleep, revealing to the reader that he carries a deep, hidden internal trauma.",
    themes: ["Denial", "Trauma", "Repression", "The Uncanny"],
    quote: "\"I'm not afraid of you,\" Conor said, holding his ground. \"Most boys would run away,\" said the Monster. \"I've seen worse,\" Conor whispered.",
    speaker: "Conor O'Malley",
    technique: "Subtle Dialogue & Juxtaposition",
    analysis: "Conor's striking lack of fear toward a roaring, physical monster establishes the central paradox of the novel: the external, supernatural threat is nothing compared to the quiet, internal torture of his mother's terminal cancer and his buried psychological guilt. His whisper 'I've seen worse' acts as an understatement that sets the stage for his coming journey.",
    mcq: [
      {
        q: "What exact time does the Monster always appear to Conor?",
        options: ["11:59 PM", "12:00 AM", "12:07 AM", "3:00 AM"],
        answer: 2,
        exp: "The Monster consistently manifests at 12:07 AM, which is a symbolic link to the moment of Conor's ultimate truth and mother's departure."
      },
      {
        q: "Why is Conor NOT afraid of the colossal Yew Tree Monster?",
        options: [
          "He thinks he is having a lucid dream he can control",
          "He has experienced a far more terrifying internal nightmare",
          "He has a weapon hidden under his pillow",
          "The Monster looks like his beloved grandfather"
        ],
        answer: 1,
        exp: "Conor's suppression of his true nightmare—witnessing his mother slip into the abyss—renders all external, physical monsters harmless in comparison."
      },
      {
        q: "What does the Yew Tree historically represent in European mythology and medicine?",
        options: [
          "Deceit, trickery, and the arrival of winter",
          "Life, death, regeneration, and powerful healing remedies",
          "Wealth, prosperity, and academic intelligence",
          "Navigation, stars, and sea voyages"
        ],
        answer: 1,
        exp: "Yew trees represent both death (often planted in graveyards) and healing/life (used in modern cancer medications), mirroring the dual nature of Conor's mother's struggle."
      }
    ],
    trueFalse: [
      {
        q: "Conor immediately runs to his grandmother's room when he hears the Monster call his name.",
        answer: false,
        exp: "Conor actually stays in his room and goes to his window alone, remaining remarkably calm and independent."
      },
      {
        q: "The Monster tells Conor that it has been summoned by his deep, unspoken request.",
        answer: true,
        exp: "The Monster hints that Conor's repressed feelings and urgent need for the truth are what drew it from the earth."
      }
    ],
    essayPrompt: "Discuss how Ness uses the introduction of the Yew Tree Monster in Chapter 1 to establish the theme of internal trauma versus external reality.",
    exemplarPlan: {
      point: "In Chapter 1, Ness uses the introduction of the Yew Tree Monster to contrast Conor's manageable external reality with his overwhelming, repressed internal trauma.",
      eta1: "Ness utilizes dramatic dialogue when Conor tells the colossal creature, 'I'm not afraid of you.' The juxtaposition between the towering, roar-filled monster and Conor's unimpressed response highlights that his internal torment is significantly more threatening.",
      eta2: "The symbolic recurrence of the time 12:07 AM represents a temporal sanctuary where Conor's subconscious boundaries dissolve, allowing his trauma to manifest physically as the Yew Tree.",
      link: "Therefore, the monster's debut proves that Conor's psychological battles have completely detached him from standard fears, forcing him to engage with the natural world as a mirror for his inner grief."
    }
  },
  {
    id: 2,
    title: "Chapter 3: School",
    summary: "At school, Conor experiences a different kind of monster. He is bullied physically and verbally by a classmate named Harry and his sidekicks. However, the physical bullying is not the worst part. What isolates Conor completely is the 'pity barrier' erected by his teachers and peers. They walk on eggshells around him, refuse to punish him when he fails to do homework, and treat him like an outcast. This treatment turns Conor into a ghost, isolating his identity and making him feel entirely invisible.",
    themes: ["Invisibility", "Isolation", "Social Pity", "Loss of Identity"],
    quote: "\"Your mother is sick, Conor. We must make allowances.\" Miss Sharkey's voice was gentle, which was the worst part of all.",
    speaker: "Miss Sharkey (Headmistress)",
    technique: "Tone of Pity & Internal Monologue",
    analysis: "The gentle voice of authority is 'the worst part' because it treats Conor as terminal by association. By removing the normal consequences of school life (grades, punishments, expectations), the boarding staff and peers push Conor out of the human circle of life, sealing his profound, exhausting isolation.",
    mcq: [
      {
        q: "What is the primary reason the pity Conor receives from teachers is painful to him?",
        options: [
          "It makes him feel special and better than his classmates",
          "It reminds him that others are constantly whispering about his mother's imminent death, alienating him from normal life",
          "It means he will get bad grades at the end of the term",
          "He wants teachers to give him harder homework to distract him"
        ],
        answer: 1,
        exp: "The teachers' special treatment constantly reminds him of the impending tragedy and denies him the normalcy he desperately craves to cope."
      },
      {
        q: "How does Harry, the school bully, interact with Conor?",
        options: [
          "He ignores him completely from the very first day",
          "He physically attacks him but respects him in class",
          "He targets Conor because Conor is the only student who doesn't look at him with fear, exploiting Conor's active desire for pain",
          "He tries to become Conor's best friend to steal his lunch money"
        ],
        answer: 2,
        exp: "Harry is highly observant. He recognizes that Conor feels guilty and wants to be punished, and so Harry punishes Conor to satisfy that subconscious need."
      },
      {
        q: "Who is Lily, and what is her conflict with Conor?",
        options: [
          "Conor's older sister who refuses to help with chores",
          "A childhood friend who revealed Conor's mother's secret illness to the whole school, breaching his trust",
          "A competitive student trying to beat him in English",
          "The school nurse who gives him medicine"
        ],
        answer: 1,
        exp: "Lily was Conor's closest friend, but her mother and Conor's mother was friendly, and she leaked the info about Conor's mum's cancer, causing Conor's social isolation."
      }
    ],
    trueFalse: [
      {
        q: "Harry bullies Conor because Conor is loud and constantly boasts in class.",
        answer: false,
        exp: "Conor is actually very quiet, withdrawn, and passive. Harry bullies him because Conor doesn't show fear, which offends Harry's dominance."
      },
      {
        q: "Miss Sharkey gives Conor a detention for failing to submit his creative writing task.",
        answer: false,
        exp: "Miss Sharkey 'makes allowances' and lets Conor off the hook, which only deepens his feelings of isolation and feeling like a non-person."
      }
    ],
    essayPrompt: "How does Conor's experience at school illustrate how pity can be a more destructive force than direct hostility?",
    exemplarPlan: {
      point: "In *A Monster Calls*, school life illustrates that pity is an isolating, destructive force that strips Conor of his agency and humanity far more than direct hostility.",
      eta1: "Ness highlights this through Miss Sharkey's gentle assertion: 'We must make allowances.' The high modality of 'must' and 'allowances' shows that authority figures treat Conor as an fragile, fragile outlier who cannot handle reality, detaching him from the social contract.",
      eta2: "While Harry's violent punches are painful, Conor actively invites them because they are regular touchpoints of human contact. The teachers' sympathetic gazes, conversely, act as a metaphoric wall that keeps him invisible and untouchable.",
      link: "In summary, Ness demonstrates that while physical bullying acknowledges Conor's existence, sympathetic isolation denies his capacity for normal life, exacerbating his internal grief."
    }
  },
  {
    id: 3,
    title: "Chapter 8: The First Tale",
    summary: "The Monster visits Conor to tell him the first of three stories. It is a fairy tale about an old, dying King, a beloved Prince who falls in love with a farm girl, and a stepmother Queen rumoured to be an evil witch. When the King dies, the Prince murders his sleeping bride under the ancient Yew Tree, framing the Queen to seize the crown. The Monster surprises Conor by pulling the Queen/witch away from being burned at the stake, saving her life despite her selfishness, while letting the murderous Prince become a celebrated ruler. Conor is angry, demanding a moral where the 'bad guy' is punished. The Monster explains that real humans are too complex for simplistic narratives.",
    themes: ["Complexity of Truth", "Moral Ambiguity", "Gray Motives", "Denial"],
    quote: "\"There is not always a good guy. Nor is there always a bad one. Most people are somewhere in between.\"",
    speaker: "Yew Tree Monster",
    technique: "Paradox & Parable Structure",
    analysis: "This quote serves as Conor's first psychological lesson. He wants a world of black-and-white, where his mother is pure good, her illness is pure evil, and his own secret thoughts are either completely justified or deeply wicked. The parable teaches him that people have conflicting impulses, breaking down the binary thinking that feeds his denial.",
    mcq: [
      {
        q: "Why did the Monster save the Queen/witch from being burned at the stake?",
        options: [
          "Because she promised to give the Monster her gold",
          "Because she was actually a kind woman who loved children",
          "Because she was not a murderer, unlike the Prince who framed her for her own political survival",
          "Because the Monster is secretly her familiar"
        ],
        answer: 2,
        exp: "The Queen was selfish and greedy, but she did not commit the murder. The Prince committed first-degree murder for power. The Monster acts on objective truth, not reputations."
      },
      {
        q: "What is Conor's reaction to the conclusion of the First Tale?",
        options: [
          "He is delighted and writes it down for school",
          "He is deeply frustrated because the murderous Prince gets away with his crime and is praised",
          "He falls asleep bored halfway through",
          "He tells the Monster that the story is too simple"
        ],
        answer: 1,
        exp: "Conor is outraged because the Prince is praised as a hero despite being a cold-blooded killer. Conor wants stories to have clear, neat black-and-white moral endings."
      },
      {
        q: "How does the First Tale relate to Conor's feelings about his grandmother?",
        options: [
          "He realizes his grandmother is secretly a witch planning to steal his mother's house",
          "It forces him to see that while his grandmother is strict and annoying, she is not 'evil' and cares about his family in her own complex way",
          "He decides to run away to live in the forest",
          "It makes him believe his father is a perfect hero"
        ],
        answer: 1,
        exp: "The tale of the gray stepmother helps Conor understand that people he dislikes (like his grandmum) can still be well-intentioned, preparing him to accept complicated family relationships."
      }
    ],
    trueFalse: [
      {
        q: "The Prince in the First Tale killed his own bride to gain control of the kingdom.",
        answer: true,
        exp: "Yes, the Prince cold-bloodedly killed his sleeping lover under the Yew tree to frame the Queen and start a popular rebellion."
      },
      {
        q: "The Monster tells Conor that stories are gentle, safe things meant to comfort children before they sleep.",
        answer: false,
        exp: "The Monster asserts that 'Stories are wild creatures. When you let them loose, who knows what havoc they might wreak?'"
      }
    ],
    essayPrompt: "How does the moral ambiguity in the Monster's first tale challenge Conor's simplified view of good and evil?",
    exemplarPlan: {
      point: "The moral ambiguity of the first tale directly challenges Conor's black-and-white view of morality, forcing him to engage with the uncomfortable complexity of human nature.",
      eta1: "Ness uses the paradox 'There is not always a good guy...' spoken by the Monster. This didactic statement serves as an analytical threshold, confronting Conor's belief that his grandmother's strictness is purely evil, and that his own split desires must be sinful.",
      eta2: "The narrative subversion of saving the selfish Queen while the murdering Prince rules successfully serves as a metaphor for the unfair, unpredictable nature of real life and death, illustrating that cancer does not check for moral standing.",
      link: "Ultimately, Ness shows that letting go of binary expectations is the first step for Conor to reconcile his deep-seated guilt and accept grey emotional truths."
    }
  },
  {
    id: 4,
    title: "Chapter 11: The Third Tale",
    summary: "At school, Harry corners Conor in the dining hall and says 'I no longer see you.' This chilling phrase threatens Conor with permanent, total invisibility. Instantly, the Monster speaks in Conor's ears, telling a short parable of an invisible man who decided to make the world see him by summoning an ancient storm. Consumed by rage, Conor attacks Harry violently, smashing dinner trays and beating him to a pulp. When he comes to, the school is in shock. However, in Miss Sharkey's office, Conor is not expelled or punished; instead, Miss Sharkey tells him he won't be disciplined because of his mother. This lack of boundaries reinforces his tragic invisibility.",
    themes: ["Rage", "The Desire for Punishment", "Visible Existence", "The Climax of Isolation"],
    quote: "\"He was invisible because people refused to see him... But he screamed, 'Behold!' and struck out, demanding to be seen!\"",
    speaker: "Yew Tree Monster / Conor's Subconscious",
    technique: "Climactic Imagery & High Modality Dialogue",
    analysis: "The invisible man story is Conor's own scream against annihilation. By attacking Harry, Conor is desperately demanding that the world hold him to normal standards, look him in the eye, and punish him. When the school system refuses to punish him, it acts as the ultimate confirmation that his 'pity shield' is impenetrable, leaving him more isolated and invisible than before.",
    mcq: [
      {
        q: "What does Harry do that triggers Conor's violent outburst in the cafeteria?",
        options: [
          "He throws a plate of food at Conor",
          "He tells Conor that his mother's treatment is failing",
          "He shakes Conor's hand and says, 'I no longer see you,' refusing to even play the game of bullying Conor anymore",
          "He steals Conor's school bag and throws it in the bin"
        ],
        answer: 2,
        exp: "By declaring Conor invisible, Harry threatens to completely erase Conor's social existence, which triggers Conor's primal urge to strike out."
      },
      {
        q: "What is the physical outcome of Conor's attack on Harry?",
        options: [
          "Harry easily beats Conor and laughs at him",
          "Conor has a panic attack and passes out before touching Harry",
          "Conor possesses supernatural strength from the Monster and hospitalizes Harry with severe injuries",
          "A teacher steps in and stops the fight before any punches land"
        ],
        answer: 2,
        exp: "Conor, channeled by his untamed rage (and symbolically the Monster), destroys the dining room and beats Harry so severely that Harry requires emergency medical attention."
      },
      {
        q: "How does Miss Sharkey react to Conor's dangerous violence?",
        options: [
          "She expels him permanently and calls the police",
          "She holds his hand and cries with him",
          "She refuses to punish him, citing 'extraordinary circumstances,' which drives Conor's sense of isolation even deeper",
          "She gives him a medal for standing up to bullying"
        ],
        answer: 2,
        exp: "Miss Sharkey tells Conor that on any other day he would be expelled, but under the tragic circumstances, they will do nothing. This lack of punishment alienates Conor further."
      }
    ],
    trueFalse: [
      {
        q: "Conor feels immense relief and joy when Miss Sharkey tells him he will not be punished.",
        answer: false,
        exp: "Conor actually feels devastated. He desperately wanted boundaries and punishment to feel like a real, accountable human being."
      },
      {
        q: "During the attack on Harry, Conor feels like the Monster is physically there, slamming Harry for him.",
        answer: true,
        exp: "The text describes Conor feeling as though he has overgrown his skin, with the giant roots and branches of the Monster smashing the dining hall."
      }
    ],
    essayPrompt: "Examine how Conor's assault on Harry serves as a physical manifestation of his desire to break through his psychological invisibility.",
    exemplarPlan: {
      point: "Conor's brutal assault on Harry in Chapter 11 represents a desperate, physical strike against the psychological invisibility imposed on him by a pitying society.",
      eta1: "Ness uses the Monster's words: 'He screamed, \"Behold!\" and demand to be seen!' to illustrate Conor's core desire. The high-modality command 'Behold!' and the active verb 'demanding' show Conor's transition from passive victimhood to violent assertion of existence.",
      eta2: "The brutal destruction of the school cafeteria serves as symbolic imagery of Conor destroying the 'egg-shell' barrier of pity. However, the subsequent refusal of authority to punish him acts as a bitter situational irony, reinforcing his isolation.",
      link: "Thus, Conor's physical rage highlights that to be ignored and pitied is a fate far more terrifying to Conor's identity than to be hated, driving him closer to his final truth."
    }
  },
  {
    id: 5,
    title: "Chapter 12: Conor's Truth",
    summary: "In the climax of the novel, Conor is pulled into the deep, swirling vortex of his recurring nightmare. His mother hangs over the edge of a deep black cliff, and Conor is holding onto her hands. Suddenly, a dark shadow rises to pull her down. Conor's grip fails, and she falls into the void. The Monster forces Conor to speak his absolute truth: Conor did not drop her because he lacked strength. He dropped her because he wanted the agonizing, endless waiting to be over, even if it meant she died. Conor breaks down, believing he is a monster who deserves to die. The Yew Tree Monster catches him, comforting him and explaining that wanting the suffering to end is the most natural, human response to grief.",
    themes: ["Catharsis", "Guilt", "Grief & Acceptance", "The Reality of Death"],
    quote: "\"I can't stand it anymore!\" Conor cried out. \"I let her go. I let her die.\" \"You only wanted the pain to end,\" the Monster said. \"The most human wish of all.\"",
    speaker: "Conor & The Yew Tree Monster",
    technique: "Climactic Katharsis & High Modality Dialogue",
    analysis: "The climax of *A Monster Calls* delivers the central resolution. Conor's self-punishment was caused by a natural human paradox: loving his mother deeply while simultaneously wishing for the horrific waiting to end. The confession is Conor's emotional catharsis, allowing him to discard his self-punishment, accept his complex feelings, and say a true goodbye to his mother.",
    mcq: [
      {
        q: "What is the 'truth' that Conor has been running from all this time?",
        options: [
          "He secretly hates his mother for being sick",
          "He let his mother slip into the void in his nightmare because he could no longer stand the emotional pain of holding on",
          "He wanted his father to take him to America without his mother",
          "He was the one who poisoned the Yew Tree"
        ],
        answer: 1,
        exp: "Conor's truth is that he let go of her hands because he wanted the endless, draining, painful waiting of her terminal illness to end. His guilt over this secret wish is what tortured him."
      },
      {
        q: "How does the Monster react to Conor's agonizing admission of 'guilt'?",
        options: [
          "It agrees that Conor is a monster and abandons him",
          "It explains that holding conflicting thoughts—wanting the pain to end while loving someone deeply—is a natural, human paradox",
          "It tells Conor that his mother will get better now that he has spoken the truth",
          "It tells Conor that he should have held on tighter"
        ],
        answer: 1,
        exp: "The Monster acts as Conor's therapist, reassuring him that human minds hold complex, opposing thoughts and that wanting the pain to end is normal and forgivable."
      },
      {
        q: "What is the therapeutic effect of Conor's painful confession (the catharsis)?",
        options: [
          "It makes him forget his mother entirely",
          "It frees him from his self-imposed prison of guilt, allowing him to hold his mother in her final moments with pure love",
          "It causes him to sleep for three whole days",
          "It makes him hate his grandmother even more"
        ],
        answer: 1,
        exp: "By releasing the heavy burden of guilt, Conor is able to be fully present with his grandmother and offer his mother genuine, unburdened love as she passes away."
      }
    ],
    trueFalse: [
      {
        q: "Conor let his mother fall in the nightmare because he was physically too weak to pull her up.",
        answer: false,
        exp: "No, Conor had the strength to hold on, but his mind let go because he couldn't bear the agonizing emotional torture of holding on any longer."
      },
      {
        q: "The Monster explains that the human mind constantly believes comforting lies while simultaneously knowing painful truths.",
        answer: true,
        exp: "Exactly. This paradox is what Conor has been struggling with: wanting his mother to survive (comforting hope) versus knowing she will die and wanting her pain (and his) to end (painful truth)."
      }
    ],
    essayPrompt: "How does Conor's confrontation with his nightmare in Chapter 12 illustrate the psychological concept of catharsis and the acceptance of complex grief?",
    exemplarPlan: {
      point: "In Chapter 12, Conor's climactic confrontation with his nightmare serves as a powerful psychological catharsis, enabling him to accept the complex, paradoxical nature of grief.",
      eta1: "The high-modality dialogue 'I let her go. I let her die.' is a linguistic release of his repressed guilt. The repetition of the active construction 'I let' represents Conor's brave transition from helpless survivor to owning his complex thoughts.",
      eta2: "The Monster's comforting reassurance that wanting the pain to end is 'the most human wish' resolves the inner conflict. The tree itself, representing ancient wisdom, acts as a therapeutic anchor that validates Conor's paradox.",
      link: "Therefore, Ness reveals that true healing does not come from denying painful realities or holding on to guilt, but from speaking the truth and accepting the conflicting emotions of loss."
    }
  }
];

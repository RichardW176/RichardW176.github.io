---
title: Overdawn
image: /assets/images/overdawn.png
order: 1
role: Lead Narrative, Lead Designer, Artist, Usability Consultant
description: 2.5D bullet hell set in a voxelized cyberpunk world.
docs:
  - title: "Overdawn Documentation"
    file: /assets/overdawn-rev-design-document.pdf
    preview: true
scripts:
  - title: "Wasteland Dialogue"
    file: /assets/scripts/overdawn/wasteland-dialogue.yarn
    format: "Yarn Script"
    content: |
      title: WastelandTVNoise
      tags:
      ---
      TV: Next up... #line:04ffeb6
      <<CallEvent "TVBroken">>
      TV: D..dFdfWar! Wadf...r! Wardd.. #line:06581fe
      <<wait 1>>
      TV: tita..n.. dFortqui..Nn. #line:0c81476
      TV: ... #line:0912151
      ===

      title: WastelandIntro
      tags:
      ---
      [speed=27/]One morning, the sun bled out on the horizon... [speed=10/][pause=0.3/]Gone.   #line:0dad476
      Gone were the winds, clouds... [pause=0.3/]<shake>[titan]Gods[/titan].   #line:0e666ce
      But humanity remained in the wasteland they created.   #line:0cf17d7
      Left alone to pick up their <shake>[deadly]Sins[/deadly].   #line:05b833b
      So... [speed=10/][pause=0.7/] Pick it up... [speed=22.5/] Your weapon.   #line:03834e5
      Until the sun sets and rises again... [speed=10/][pause=0.3/] <shake> You're <shake> not <shake> done. #line:08888c5
      <<CallEvent "DialogEnd">>
      ===

      title: WastelandTitan
      tags:
      ---
      Titan: Can you see it?[pause/]  #line:08ca591
      Titan: The ashes of [Andrean]Andrean City[/Andrean].  #line:0081602
      Titan: Its insides burned by its own [Augusto]makers[/Augusto]... #line:085aa55
      Titan: Its outsides mauled by foreign dogs. #line:09f4c66
      Titan: [speed=20/]We know why you're here, [transplant]Child of The Void[/transplant]. #line:06a36b9
      Titan: We only hope that you remember too. #line:0b5acfe
      <<CallEvent "TitanDialogEnd">>
      Titan: Go... and return our future to us, [Koi/]Koi. #line:02885ca
      ===
media:
  - file: /assets/images/overdawn-andrean-slums.jpg
    alt: Overdawn screenshot of the Andrean slums
    description: Andrean slums environment shot highlighting Overdawn's dense urban lighting and cyberpunk atmosphere.
  - file: /assets/images/overdawn-archangel.jpg
    alt: Overdawn screenshot of the Archangel encounter
    description: Archangel set piece showcasing the game's large-scale encounter framing and high-contrast palette.
  - file: /assets/images/overdawn-doyama-lobby.jpg
    alt: Overdawn screenshot of the Doyama lobby
    description: Doyama lobby interior featuring Overdawn's stylized architectural spaces and warm neon glow.
  - file: /assets/images/overdawn-gangster-hideout.jpg
    alt: Overdawn screenshot of the gangster hideout
    description: Combat screenshot from the gangster hideout emphasizing top-down action, enemy pressure, and readable effects.
---

Lead Narrative, Lead Design, and Usability Consultant for *Overdawn*, a start-up game project developed by an independent LA based studio.

- Narrative: Implementing dialogues using Yarnspinner and behavior trees, worldbuilding, character briefs, scriptwriting, delegating tasks, and scheduling meetings.
- Design: Boss design, combat design, level design, cutscene and animation implementation, UI/UX design using Figma.
- Art: Creating 25+ voxelized assets using MagicaVoxel, post-processing, asset implementation in-engine, storyboarding for animated trailer.
- Usability: Playtesting and weekly bug tracking reports.

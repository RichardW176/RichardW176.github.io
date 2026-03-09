---
title: Overdawn
image: /assets/images/overdawn.jpg
order: 1
role: Lead Narrative Designer, Lead Designer, Artist, Usability Consultant
description: 2.5D bullet hell set in a voxelized cyberpunk world.
awards:
  - title: "GWB"
    file: /assets/images/GWB.avif
    alt: Overdawn award image for GWB
  - title: "Tencet"
    file: /assets/images/tencet.avif
    alt: Overdawn award image for Tencet
docs:
  - title: "Rev Boss Design Document"
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
  - title: "Theo Fight Dialogue"
    file: /assets/scripts/overdawn/theo-fight-dialogue.yarn
    format: "Yarn Script"
  - title: "Elevator Intro"
    file: /assets/scripts/overdawn/elevator-intro.yarn
    format: "Yarn Script"
  - title: "City Radio"
    file: /assets/scripts/overdawn/city-radio.yarn
    format: "Yarn Script"
  - title: "Wasteland Ending"
    file: /assets/scripts/overdawn/wasteland-ending.yarn
    format: "Yarn Script"
  - title: "Archangel Ending"
    file: /assets/scripts/overdawn/archangel-ending.yarn
    format: "Yarn Script"
media:
  - file: /assets/images/overdawn-andrean-slums.jpg
    alt: Overdawn screenshot of the Andrean slums
    description: 'Andrean Slums: Level, environment, and sequence design for "Andrean Slums" area (7 levels).'
  - file: /assets/images/overdawn-archangel.jpg
    alt: Overdawn screenshot of the Archangel encounter
    description: 'Archangel: Directed narrative, design, and art for secret final boss "Archangel".'
  - file: /assets/images/overdawn-doyama-lobby.jpg
    alt: Overdawn screenshot of the Doyama lobby
    description: 'Doyama: Level and environment design for "Doyama" restaurant area (7 levels).'
  - file: /assets/images/overdawn-gangster-hideout.jpg
    alt: Overdawn screenshot of the gangster hideout
    description: 'Rev: Led boss, narrative design, and usability for boss "Rev".'
---

<!-- intentionally blank -->

// Blog posts, newest first. Each post carries its own English and Spanish text: long-form copy is easier to
// keep in sync side by side than spread across en.js and es.js, and vue-i18n would read "@", "{" and "|"
// in prose as message syntax. Blocks: h (heading), p, quote, photo (an AssetSlot id from slots.js; `tall`
// for portrait shots) and gallery (two or more portrait photos side by side). Optional `badges` per language:
// results shown as chips under the title and on the /blog card, `{ text }` with a trophy or
// `{ text, note, medal: 'bronze', place }` with a medal and a small line above the text.

export const posts = [
  {
    slug: 'kavak-openai-hackathon',
    date: '2026-11-10',
    cover: 'blog-hack26-team',
    en: {
      title: 'Every miss becomes a check',
      kicker: 'Kavak x OpenAI x Primero AI hackathon',
      badges: [{ text: '3rd place overall', note: 'RSI Hackathon 2026', medal: 'bronze', place: 3 }],
      description:
        'Third place overall and first in the AI category at the Kavak x OpenAI x Primero AI hackathon: how four engineers from Culiacán built BREACH in one day, continuous security testing that learns from what it misses.',
      lede:
        'We won third place overall and first place in the AI category at the Kavak x OpenAI x Primero AI hackathon. On November 9 we spent ten hours at Kavak\'s offices on Reforma, in Mexico City, building a system that gets better at finding security holes every time it misses one. This is how it went.',
      blocks: [
        { type: 'h', text: 'Outsiders in Mexico City' },
        {
          type: 'p',
          text: 'The hackathon was organized by Kavak, OpenAI and Primero AI, and the theme was recursive self-improvement (RSI) and agentic systems. There were around 20 teams, and as far as we could tell every other one was from Mexico City. We came from Culiacán, Sinaloa. We were the outsiders, and we said so in the pitch.',
        },
        {
          type: 'p',
          text: 'We were four: Nicolás Cárdenas, José Daniel Sainz, Gustavo Aispuro and me. A very multidisciplinary team, with very different backgrounds, which turned out to be exactly what a ten-hour build needs.',
        },
        {
          type: 'gallery',
          photos: [
            { slot: 'blog-hack26-poster', caption: 'The brief for the day: agent systems that learn and build new systems' },
            { slot: 'blog-hack26-notebook', caption: 'My desk at Kavak: the agent working on screen, the event notebook beside it' },
          ],
        },

        { type: 'h', text: 'The problem' },
        {
          type: 'p',
          text: "We've seen several cyberattacks up close, at very large companies. I won't name them. What they taught us is that keeping a company's infrastructure and products safe from attackers matters more now than ever, and the AI boom made it worse. Today anyone, working 24/7 with AI, can find a vulnerability and attack it.",
        },
        {
          type: 'p',
          text: "AI made writing code almost free, but it didn't make reviewing it free. Companies pick fast and good, and give up safe. Apps get shipped every day, and a security audit once a year arrives already out of date.",
        },
        {
          type: 'quote',
          text: "A smarter model doesn't know what's broken in your app today. You only get that by touching the target.",
          cite: 'From our pitch',
        },

        { type: 'h', text: 'What we built' },
        {
          type: 'p',
          text: 'We called it BREACH: continuous security testing for live apps you are authorized to test. Every run executes a library of checks and confirms each finding by reproducing it, so a result is evidence, not a model\'s opinion. It only runs against targets with a written scope, and anything outside that scope gets rejected.',
        },
        {
          type: 'p',
          text: 'I focused on the agent harness: how the agents are organized, which tools they get, and what they can and can\'t touch. I also took all of the infrastructure, so what we showed was running live, and the knowledge graph of known vulnerabilities, which comes up again in a moment.',
        },

        { type: 'h', text: 'Where the RSI comes in' },
        {
          type: 'p',
          text: 'To me, RSI is the ability of agents to go back over a problem they already worked on and do it better, by improving their prompts, their tools, the agents themselves, the models they use or the effort they spend. The key is that it isn\'t retrying the same prompt until it gets lucky.',
        },
        {
          type: 'p',
          text: 'In BREACH it works like this. We measure the system against an exam of known weaknesses on test apps. When it misses one, that miss becomes a work order: an AI author writes a new check, a safety gate validates it, a person approves it, and the next run finds what the previous one missed. The expensive reasoning happens once and stays behind as a cheap test that reruns forever.',
        },
        {
          type: 'p',
          text: 'During the day what it found went from 1 to 4, 8, 9, 10 and finally 12 of 51 known weaknesses, while the exam itself grew from 9 cases to 51. Zero false alarms on the trap cases we planted. And two of those checks were written by the loop itself, in production: the team only approved them.',
        },

        { type: 'h', text: 'The conversation that changed the day' },
        {
          type: 'p',
          text: 'The key moment was a conversation with Paco Melker, one of the mentors. He gave us a very clear insight on which models to use and how to put it all together, and one idea in particular: we needed a knowledge graph of vulnerabilities to detect them faster.',
        },
        {
          type: 'p',
          text: "That's the piece I ended up owning. Every known vulnerability and incident lives there, including the ones being exploited in real attacks, so the agents start from what's already known instead of figuring it out from scratch. And when a known weakness isn't covered by any check yet, it becomes another gap for the loop to close. His feedback and mentorship were a big part of why this project actually came together.",
        },

        { type: 'h', text: 'The pitch and the result' },
        {
          type: 'p',
          text: 'We presented as what we were: outsiders from Culiacán who had seen the problem from up close. What convinced the judges, as far as we can tell, was how viable the product was and how far along it was for something we had started only a few hours earlier.',
        },
        {
          type: 'p',
          text: 'We took third place overall and first place in the AI category.',
        },
        { type: 'photo', slot: 'blog-hack26-team', caption: 'The four of us, each holding a piece of BREACH: the landing page, the coverage curve, the vulnerability map and the architecture' },

        { type: 'h', text: 'What came after' },
        {
          type: 'p',
          text: 'Two points are not a curve, and an honest judge will say so. So after the event I kept going on the loop. Now it runs unattended for several iterations: measure, pick a miss, write a check, pass the gate, measure again. A third of the exam is held out and never shown to the author, so we can see whether a check written for one case also catches cases it never saw. And there is a control that doesn\'t learn, so if the curve goes up, it went up because of the learning and not because of luck.',
        },

        { type: 'h', text: 'What I take home' },
        {
          type: 'p',
          text: 'Many things, but mostly my teammates. We had very different expertise, and even so, or maybe because of it, we made a great team and delivered a great project together.',
        },
        {
          type: 'p',
          text: 'We hope this opportunity has an impact, both on organizations that need to keep up with their own security and on our own lives.',
        },
      ],
    },
    es: {
      title: 'Cada falla se vuelve un check',
      kicker: 'Hackathon Kavak x OpenAI x Primero AI',
      badges: [{ text: '3er lugar general', note: 'RSI Hackathon 2026', medal: 'bronze', place: 3 }],
      description:
        'Tercer lugar general y primero en la categoría de AI en el hackathon de Kavak x OpenAI x Primero AI: cómo cuatro ingenieros de Culiacán construimos BREACH en un día, pruebas de seguridad continuas que aprenden de lo que se les escapa.',
      lede:
        'Ganamos el tercer lugar general y el primer lugar en la categoría de AI en el hackathon de Kavak x OpenAI x Primero AI. El 9 de noviembre pasamos diez horas en el corporativo de Kavak, en Reforma, Ciudad de México, construyendo un sistema que mejora para encontrar huecos de seguridad cada vez que se le escapa uno. Así fue.',
      blocks: [
        { type: 'h', text: 'Outsiders en la Ciudad de México' },
        {
          type: 'p',
          text: 'El hackathon lo organizaron Kavak, OpenAI y Primero AI, y el tema fue recursive self-improvement (RSI) y sistemas agénticos. Había alrededor de 20 equipos y, hasta donde vimos, todos los demás eran de la Ciudad de México. Nosotros veníamos de Culiacán, Sinaloa. Éramos los outsiders, y así lo dijimos en el pitch.',
        },
        {
          type: 'p',
          text: 'Fuimos cuatro: Nicolás Cárdenas, José Daniel Sainz, Gustavo Aispuro y yo. Un equipo muy multidisciplinario, con experiencias muy distintas, que resultó ser justo lo que necesita una construcción de diez horas.',
        },
        {
          type: 'gallery',
          photos: [
            { slot: 'blog-hack26-poster', caption: 'La consigna del día: sistemas de agentes que aprenden y construyen nuevos sistemas' },
            { slot: 'blog-hack26-notebook', caption: 'Mi lugar en Kavak: el agente trabajando en pantalla y la libreta del evento a un lado' },
          ],
        },

        { type: 'h', text: 'El problema' },
        {
          type: 'p',
          text: 'Hemos visto de cerca varios ciberataques en empresas muy grandes. No voy a decir cuáles. Lo que nos dejaron claro es que mantener a salvo la infraestructura y los productos de una empresa importa hoy más que nunca, y con el boom de la IA creció bastante. Ahora cualquier persona, operando 24/7 con IA, puede encontrar una vulnerabilidad y atacarla.',
        },
        {
          type: 'p',
          text: 'La IA hizo que escribir código sea casi gratis, pero no hizo que revisarlo sea gratis. Las empresas eligen rápido y bueno, y sacrifican seguro. Las apps salen todos los días, y una auditoría de seguridad una vez al año ya llega vieja.',
        },
        {
          type: 'quote',
          text: 'Un modelo más listo no sabe qué está roto en tu app hoy. Eso solo se obtiene tocando el objetivo.',
          cite: 'De nuestro pitch',
        },

        { type: 'h', text: 'Lo que construimos' },
        {
          type: 'p',
          text: 'Le pusimos BREACH: pruebas de seguridad continuas para apps en producción que estás autorizado a probar. Cada corrida ejecuta una biblioteca de checks y confirma cada hallazgo reproduciéndolo, así que un resultado es evidencia, no la opinión de un modelo. Solo corre contra objetivos con un alcance por escrito, y todo lo que esté fuera de ese alcance se rechaza.',
        },
        {
          type: 'p',
          text: 'Yo me enfoqué en el harness del agente: cómo se organizan los agentes, qué herramientas reciben y qué pueden y qué no pueden tocar. También llevé toda la infraestructura, para que lo que mostramos estuviera corriendo en vivo, y el knowledge graph de vulnerabilidades conocidas, del que hablo en un momento.',
        },

        { type: 'h', text: 'Dónde entra el RSI' },
        {
          type: 'p',
          text: 'Para mí, RSI es la capacidad de los agentes de regresar a un problema que ya atendieron y resolverlo mejor, mejorando sus prompts, sus herramientas, los agentes mismos, los modelos que usan o el esfuerzo que le dedican. La clave es que no se trata de reintentar el mismo prompt hasta que salga bien por suerte.',
        },
        {
          type: 'p',
          text: 'En BREACH funciona así. Medimos el sistema contra un examen de debilidades conocidas en apps de prueba. Cuando se le escapa una, esa falla se vuelve una orden de trabajo: un autor con IA escribe un check nuevo, una compuerta de seguridad lo valida, una persona lo aprueba y la siguiente corrida encuentra lo que la anterior no vio. El razonamiento caro se paga una vez y queda como un test barato que se repite siempre.',
        },
        {
          type: 'p',
          text: 'Durante el día lo encontrado pasó de 1 a 4, 8, 9, 10 y al final 12 de 51 debilidades conocidas, mientras el examen mismo crecía de 9 casos a 51. Cero falsas alarmas en los casos trampa que pusimos. Y dos de esos checks los escribió el propio loop, en producción: el equipo solo los aprobó.',
        },

        { type: 'h', text: 'La plática que cambió el día' },
        {
          type: 'p',
          text: 'El momento clave fue cuando hablamos con Paco Melker, uno de los mentores. Nos dio un insight muy claro sobre qué tipo de modelos usar y cómo armar todo esto, y una idea en particular: teníamos que tener un knowledge graph de vulnerabilidades para ser más rápidos en detectarlas.',
        },
        {
          type: 'p',
          text: 'Esa fue la pieza que terminé llevando yo. Ahí viven las vulnerabilidades e incidencias conocidas, incluidas las que se están explotando en ataques reales, así que los agentes arrancan de lo que ya se sabe en lugar de descubrirlo desde cero. Y cuando una debilidad conocida todavía no la cubre ningún check, se vuelve otro hueco que el loop tiene que cerrar. Su feedback y su mentoría fueron clave para que este proyecto se materializara.',
        },

        { type: 'h', text: 'El pitch y el resultado' },
        {
          type: 'p',
          text: 'Nos presentamos como lo que éramos: outsiders de Culiacán que habíamos visto el problema de cerca. Lo que convenció a los jueces, hasta donde entendemos, fue la viabilidad del producto y lo avanzado que estaba para algo que habíamos empezado apenas unas horas antes.',
        },
        {
          type: 'p',
          text: 'Quedamos en tercer lugar general y en primer lugar en la categoría de AI.',
        },
        { type: 'photo', slot: 'blog-hack26-team', caption: 'Los cuatro, cada uno con una parte de BREACH: la landing, la curva de cobertura, el mapa de vulnerabilidades y la arquitectura' },

        { type: 'h', text: 'Lo que vino después' },
        {
          type: 'p',
          text: 'Dos puntos no son una curva, y un juez honesto te lo va a decir. Así que después del evento seguí con el loop. Ahora corre solo durante varias iteraciones: mide, escoge una falla, escribe un check, pasa la compuerta y vuelve a medir. Un tercio del examen se aparta y el autor nunca lo ve, para saber si un check escrito para un caso también atrapa casos que no conocía. Y hay un control que no aprende, así que si la curva sube, subió por el aprendizaje y no por suerte.',
        },

        { type: 'h', text: 'Lo que me llevo' },
        {
          type: 'p',
          text: 'Bastantes cosas, pero sobre todo a mis compañeros. Teníamos expertise muy distinta y aun así, o tal vez por eso, hicimos un gran equipo y entre todos entregamos un gran proyecto.',
        },
        {
          type: 'p',
          text: 'Esperamos que esta oportunidad genere impacto, tanto en las organizaciones que necesitan mantener su seguridad al día como en nuestra propia vida.',
        },
      ],
    },
  },
  {
    slug: 'ai-engineer-2026',
    date: '2026-10-28',
    cover: 'blog-aie26-stage',
    en: {
      title: 'More hands, same products',
      kicker: 'AI Engineer 2026',
      description:
        'Notes from AI Engineer 2026 in New York and a few days of conversations in San Francisco: hallway talks with Big Tech, the rise of the product engineer, and what being an AI engineer means to me.',
      lede:
        'In October I went back to New York for AI Engineer, and this time the trip kept going to San Francisco. These are my notes, written a couple of weeks later, once the jet lag and the noise wore off.',
      blocks: [
        { type: 'h', text: 'Second time in New York' },
        {
          type: 'p',
          text: 'Last year we went to the AI Engineer Code Summit in New York on our own initiative. We decided to go in 2025, and Zazpay backed us once they knew we were going. This year was different: Zazpay offered to send us, fully covered.',
        },
        {
          type: 'p',
          text: 'We went as an engineering team: our CTO, our CDO, and the two lead engineers, Nicolás Cárdenas and me. Before getting on the plane I had one thought on repeat: this is one of the most important and relevant events in the AI world, so make it count.',
        },
        {
          type: 'p',
          text: "I'm an enthusiast, so I always show up well prepared and with an open mind. Ready to get feedback, to hear opinions, and to trade ideas with engineers from other parts of the world.",
        },
        {
          type: 'gallery',
          photos: [
            { slot: 'blog-aie26-sign', caption: 'Day one, at the AIE letters' },
            { slot: 'blog-aie26-badge', caption: 'Badge on, workshop day' },
          ],
        },

        { type: 'h', text: 'The hallway is half the conference' },
        {
          type: 'p',
          text: 'The talks were good, honestly almost all of them. But a lot of what I remember happened between them. I talked with engineers from JPMorgan Chase, Amazon, Google and plenty of other very big companies.',
        },
        {
          type: 'p',
          text: 'One conversation stuck with me. An engineer from Amazon told me he did way too much, that he felt overwhelmed even with everything he was already doing. His job in Big Tech was, practically, keeping the Prime badge working. That was his whole gig. Then he walked me through all the engineering behind a button that simple, and it was anything but simple.',
        },
        {
          type: 'p',
          text: "It made me think about scale. At a company our size you own whole flows, end to end. At Amazon's size a single badge is a product of its own, with its own team and its own pressure. Both are real engineering. They just stretch you in different directions.",
        },
        { type: 'photo', slot: 'blog-aie26-datadog', caption: "Datadog's office in New York", tall: true },

        { type: 'h', text: 'The talk I keep coming back to' },
        {
          type: 'p',
          text: 'If I had to pick one, it would be The Rise of the Product Engineer by Laurie Voss, co-founder of npm and now at Arize AI. His argument is that the product engineer is something new, and that the methodologies we had before are becoming a bit obsolete with AI.',
        },
        {
          type: 'quote',
          text: 'The cost of producing plausible code has collapsed while the cost of knowing whether to trust that code has stayed exactly the same.',
          cite: 'Laurie Voss, Arize AI',
        },
        {
          type: 'p',
          text: "The way I understood it, writing code is no longer the hard part. The hard part is figuring out what a specific customer actually needs and writing down what \"good\" looks like. That knowledge isn't in a model's weights, it lives in people's heads. He had a line I wrote down right away: \"Nobody teaches go sit with a baker for a week and come back with a spec.\"",
        },
        {
          type: 'p',
          text: "For people like me, software engineers with some years in, I think this is great news. We stop worrying so much about the code and start focusing more on the product. And it gets the engineer more involved in the operation: the person using the app, the team answering the phone, what really happens after we ship.",
        },

        { type: 'h', text: 'More hands, same products' },
        {
          type: 'p',
          text: "If one idea kept coming back in different forms, it was this one. Before AI and after AI, applications haven't changed that much. We have more capacity, more hands, and yet a lot of products look alike. Everyone does the same thing.",
        },
        {
          type: 'p',
          text: "Tariq Shaukat, Sonar's CEO, put numbers on it. In one study, async coding agents meant 2,450% more lines of code, but only 30% more releases. More code is not more product. In the same talk he described something he called cognitive surrender: people agree with the AI 93% of the time when it's right, and 4 out of 5 times when it's wrong.",
        },
        {
          type: 'p',
          text: 'Even the name of our job keeps moving. Jediah Katz from Cursor traced it: prompt engineer in 2023, context engineer in mid-2025, harness engineer in 2026. Three titles in three years.',
        },
        {
          type: 'p',
          text: "So what I took home is that something has to change in our heads, in the methodology all of us engineers use, to really back up all the power AI is giving us. These are huge technological shifts that change the game completely, and our habits haven't caught up yet.",
        },
        { type: 'photo', slot: 'blog-aie26-stage', caption: 'The main stage at AI Engineer, New York' },

        { type: 'h', text: 'San Francisco is another world' },
        {
          type: 'p',
          text: 'New York was speakers, networking, talking to as many people as possible. San Francisco was more intimate: small rooms, sharing secrets, and introductions to new faces and new companies in the software world.',
        },
        {
          type: 'p',
          text: "The two cities feel different too. New York is much more cosmopolitan, much more focused on big banks and high finance. San Francisco is a completely different world, starting with how open-minded everyone is. People share, up to a point. Everyone likes to build, everyone is building something, and that gets me excited.",
        },
        {
          type: 'p',
          text: 'Between meetings we also did the pilgrimage. We biked into Stanford, saw the first computer Google used, stood in front of the garage where its founders started, and found the plaque at the first Facebook office. Very ordinary-looking places where something huge began.',
        },
        {
          type: 'gallery',
          photos: [
            { slot: 'blog-aie26-stanford', caption: 'Biking into Stanford' },
            { slot: 'blog-aie26-google-server', caption: 'The first computer Google used, Lego case included' },
            { slot: 'blog-aie26-google-garage', caption: "The garage where Google's founders started" },
            { slot: 'blog-aie26-facebook', caption: '471 Emerson, Palo Alto, the first Facebook office' },
          ],
        },
        {
          type: 'p',
          text: 'One story from those days stayed with me. In 2008 a group of Mexican executives toured the Tesla factory when the company was close to bankruptcy. All their questions were customer questions, like when they could open a dealership in Mexico. Nobody asked about investing. The way it was told to us fit in one line: "They had the means but not the mindset."',
        },

        { type: 'h', text: 'What changed when we got back' },
        {
          type: 'p',
          text: "Of course the way we work changed when we came back, and quite a lot. I won't go into details, because some of those things are ours and at Zazpay we respect that a lot. But it changed.",
        },

        { type: 'h', text: 'What an AI engineer is, to me' },
        {
          type: 'p',
          text: "Funny enough, I was asking myself this right before the trip. I don't think an AI engineer is only someone who builds agents or knows how to make an algorithm work in their favor. An AI engineer is someone who uses AI as the core of their workflow, and with it builds solutions that weren't possible before these models existed.",
        },
        {
          type: 'p',
          text: "I do consider myself one, and the title means a lot to me. It's one of the areas that has interested me most, and one where I can grow the most, at Zazpay and anywhere else.",
        },

        { type: 'h', text: 'Did I feel behind?' },
        {
          type: 'p',
          text: "At Zazpay we've worked hard to stay on the cutting edge with AI, and honestly, I didn't feel very far behind. Sure, a lot of people in the US come out of top universities. But I saw that we have the same problems. The difference is that they've already been able to solve them, or at least talk about them openly.",
        },
        {
          type: 'p',
          text: 'I think Mexico has a huge opportunity here, because we have very capable people who are dedicated to what they do. So, did I feel behind? I could say yes. But honestly, no.',
        },
      ],
    },
    es: {
      title: 'Más manos, mismos productos',
      kicker: 'AI Engineer 2026',
      description:
        'Notas de AI Engineer 2026 en Nueva York y unos días de pláticas en San Francisco: conversaciones de pasillo con Big Tech, el auge del product engineer y lo que significa para mí ser AI engineer.',
      lede:
        'En octubre regresé a Nueva York para AI Engineer, y esta vez el viaje siguió hasta San Francisco. Estas son mis notas, escritas un par de semanas después, cuando ya se habían pasado el jet lag y el ruido.',
      blocks: [
        { type: 'h', text: 'Segunda vez en Nueva York' },
        {
          type: 'p',
          text: 'El año pasado fuimos al AI Engineer Code Summit en Nueva York por iniciativa nuestra. Lo decidimos en 2025, y Zazpay nos apoyó sabiendo que íbamos a ir. Este año fue distinto: Zazpay nos ofreció ir completamente cubiertos.',
        },
        {
          type: 'p',
          text: 'Fuimos como equipo de ingeniería: el CTO, el CDO y los dos lead engineers, Nicolás Cárdenas y yo. Antes de subirme al avión tenía una idea en la cabeza: hay que aprovechar esta oportunidad de estar en uno de los eventos más importantes y relevantes del mundo de la IA.',
        },
        {
          type: 'p',
          text: 'Como el entusiasta que soy, siempre voy muy bien preparado y con la mente abierta. Listo para recibir feedback, escuchar opiniones e incluso compartir ideas con ingenieros de otras partes del mundo.',
        },
        {
          type: 'gallery',
          photos: [
            { slot: 'blog-aie26-sign', caption: 'Primer día, en las letras de AIE' },
            { slot: 'blog-aie26-badge', caption: 'Con el gafete puesto, día de workshops' },
          ],
        },

        { type: 'h', text: 'El pasillo es la mitad de la conferencia' },
        {
          type: 'p',
          text: 'Las charlas estuvieron bastante bien, la verdad casi todas. Pero mucho de lo que recuerdo pasó entre una y otra. Platiqué con ingenieros de JP Morgan Chase, Amazon, Google y muchas empresas muy grandes.',
        },
        {
          type: 'p',
          text: 'Una plática se me quedó grabada. Un ingeniero de Amazon me dijo que hacía demasiado, que se sentía bastante abrumado con todo lo que hacía. Su chamba en Big Tech era, prácticamente, mantener el badge de Amazon Prime. Esa era su única chamba. Y luego me explicó toda la ingeniería que hay detrás de un botón tan simple, y de simple no tenía nada.',
        },
        {
          type: 'p',
          text: 'Me puso a pensar en la escala. En una empresa de nuestro tamaño eres dueño de flujos completos, de punta a punta. Al tamaño de Amazon, un solo badge es un producto en sí mismo, con su propio equipo y su propia presión. Las dos son ingeniería de verdad, solo que te estiran hacia lados distintos.',
        },
        { type: 'photo', slot: 'blog-aie26-datadog', caption: 'Las oficinas de Datadog en Nueva York', tall: true },

        { type: 'h', text: 'La charla a la que sigo regresando' },
        {
          type: 'p',
          text: 'Si tuviera que escoger una, sería The Rise of the Product Engineer, de Laurie Voss, cofundador de npm y ahora en Arize AI. Su idea es que el product engineer es algo nuevo, y que las metodologías que teníamos antes se están volviendo un poco obsoletas con la IA.',
        },
        {
          type: 'quote',
          text: 'The cost of producing plausible code has collapsed while the cost of knowing whether to trust that code has stayed exactly the same.',
          cite: 'Laurie Voss, Arize AI',
        },
        {
          type: 'p',
          text: 'Como yo lo entendí: escribir código ya no es la parte difícil. Lo difícil es entender qué necesita de verdad un cliente en específico y dejar por escrito qué significa que algo esté "bien". Eso no está en los pesos de un modelo, está en la cabeza de las personas. Tuvo una frase que anoté en ese momento: "Nobody teaches go sit with a baker for a week and come back with a spec." Nadie te enseña a sentarte una semana con un panadero y regresar con una especificación.',
        },
        {
          type: 'p',
          text: 'Para personas como yo, que somos software engineers de años, creo que esto es un avance bastante bueno. Nos dejamos de preocupar tanto por el código y nos empezamos a enfocar más en el producto. Y hace que el ingeniero se involucre más en la operación: en quien usa la app, en el equipo que contesta el teléfono, en lo que de verdad pasa después de que sacamos algo a producción.',
        },

        { type: 'h', text: 'Más manos, mismos productos' },
        {
          type: 'p',
          text: 'Si hubo una idea que regresaba una y otra vez, fue esta. Antes de la IA y después de la IA, las aplicaciones no han cambiado demasiado. Tenemos más capacidad, tenemos más manos, pero sentimos que todos los productos se ven similares. Todos hacen la misma cosa.',
        },
        {
          type: 'p',
          text: 'Tariq Shaukat, CEO de Sonar, le puso números. En un estudio, los agentes de código asíncronos significaron 2,450% más líneas de código, pero solo 30% más releases. Más código no es más producto. En la misma charla habló de algo que llamó cognitive surrender: la gente le da la razón a la IA el 93% de las veces cuando tiene razón, y 4 de cada 5 veces cuando está equivocada.',
        },
        {
          type: 'p',
          text: 'Hasta el nombre de nuestro trabajo cambia. Jediah Katz, de Cursor, lo resumió así: prompt engineer en 2023, context engineer a mediados de 2025, harness engineer en 2026. Tres títulos en tres años.',
        },
        {
          type: 'p',
          text: 'Lo que me traje de regreso es que algo tiene que cambiar en la mente, en la metodología que manejamos todos los ingenieros, para poder respaldar todo el poder que nos da la inteligencia artificial. Son cambios tecnológicos abismales que cambian el juego por completo, y nuestros hábitos todavía no los alcanzan.',
        },
        { type: 'photo', slot: 'blog-aie26-stage', caption: 'El escenario principal de AI Engineer, Nueva York' },

        { type: 'h', text: 'San Francisco es otro mundo' },
        {
          type: 'p',
          text: 'Nueva York fue de conferencistas, de networking, de platicar con toda la gente posible. San Francisco fue más de charlas íntimas, de compartir secretos, e incluso de conocer caras nuevas y empresas nuevas del mundo del software.',
        },
        {
          type: 'p',
          text: 'Las dos ciudades también se sienten distintas. Nueva York es mucho más cosmopolita, mucho más enfocada en los bancos grandes y las altas finanzas. San Francisco es un mundo completamente distinto, empezando porque todos son muy open-minded. La gente comparte, hasta cierto punto. A todos les gusta construir, todos están construyendo algo, y eso me emociona.',
        },
        {
          type: 'p',
          text: 'Entre reuniones también hicimos el recorrido obligado. Entramos en bici a Stanford, vimos la primera computadora que usó Google, nos paramos frente al garage donde empezaron sus fundadores y encontramos la placa de la primera oficina de Facebook. Lugares que se ven de lo más normales, donde empezó algo enorme.',
        },
        {
          type: 'gallery',
          photos: [
            { slot: 'blog-aie26-stanford', caption: 'Entrando en bici a Stanford' },
            { slot: 'blog-aie26-google-server', caption: 'La primera computadora que usó Google, con todo y su caja de Lego' },
            { slot: 'blog-aie26-google-garage', caption: 'El garage donde empezaron los fundadores de Google' },
            { slot: 'blog-aie26-facebook', caption: '471 Emerson, Palo Alto, la primera oficina de Facebook' },
          ],
        },
        {
          type: 'p',
          text: 'Una historia de esos días se me quedó. En 2008, un grupo de ejecutivos mexicanos recorrió la fábrica de Tesla cuando la empresa estaba cerca de la quiebra. Todas sus preguntas fueron de cliente, como cuándo podían abrir una agencia en México. Nadie preguntó por invertir. Como nos lo contaron, cabe en una línea: "They had the means but not the mindset." Tenían los medios, pero no la mentalidad.',
        },

        { type: 'h', text: 'Lo que cambió al regresar' },
        {
          type: 'p',
          text: 'Claro que cambió la forma de trabajar cuando regresamos, y bastante. No voy a entrar en detalles, porque son cosas nuestras y en Zazpay las respetamos mucho. Pero sí cambió.',
        },

        { type: 'h', text: 'Qué es, para mí, un AI engineer' },
        {
          type: 'p',
          text: 'Curiosamente, me hice esta pregunta justo antes del viaje. Creo que un AI engineer no es solo alguien que construye agentes o que sabe usar un algoritmo a su favor. Un AI engineer es quien usa la IA como parte central de su flujo de trabajo, y con eso construye soluciones que antes no eran posibles sin estos modelos.',
        },
        {
          type: 'p',
          text: 'Sí me considero un AI engineer, y el título significa bastante para mí. Es de las áreas que más me han interesado y en las que más me puedo desarrollar, en Zazpay y en cualquier otro lugar.',
        },

        { type: 'h', text: '¿Me sentí atrás?' },
        {
          type: 'p',
          text: 'En Zazpay nos hemos mantenido mucho a la vanguardia con la inteligencia artificial, y la verdad no me sentí muy atrás. Claro, mucha gente en Estados Unidos sale de universidades muy top. Pero vi que tenemos los mismos problemas. La diferencia es que ellos ya los han podido solucionar, o por lo menos ya los han podido platicar abiertamente.',
        },
        {
          type: 'p',
          text: 'Creo que en México hay una gran área de oportunidad, porque tenemos gente muy capaz y muy dedicada a lo que hace. Entonces, ¿me sentí atrás? Podría decir que sí. Pero la verdad, no.',
        },
      ],
    },
  },
]

export function findPost(slug) {
  return posts.find((post) => post.slug === slug)
}

// ~230 words a minute, rounded up.
export function readMinutes(entry) {
  const words = [entry.lede, ...entry.blocks.map((b) => b.text ?? '')].join(' ').split(/\s+/).length
  return Math.max(1, Math.ceil(words / 230))
}

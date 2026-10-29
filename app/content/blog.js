// Blog posts, newest first. Each post carries its own English and Spanish text: long-form copy is easier to
// keep in sync side by side than spread across en.js and es.js, and vue-i18n would read "@", "{" and "|"
// in prose as message syntax. Blocks: h (heading), p, quote, photo (an AssetSlot id from slots.js; `tall`
// for portrait shots) and gallery (two or more portrait photos side by side).

export const posts = [
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

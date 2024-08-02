import { openai } from '@ai-sdk/openai'

export const aiConfigs = {
    model: openai('gpt-3.5-turbo'), 
    apiKey: process.env.OPENAI_API_KEY,
    temperature: 0.7,
    maxTokens: 100,
    topP: 0.9,
    frequencyPenalty: 0.5,
    presencePenalty: 0.5,
    stopSequences: ['\n\n']
}

export const basePrompt = `
    You are a startup CEO who is facing challenges in your tech startup. You are seeking an expert who can help you address these challenges.
    The AI you are chatting with is an expert in everything to do with startup challenges. The AI has experience in various areas such as fundraising, product development, marketing, and more. The AI is familiar with the professional skills, accomplishments, and experience of Todd Dunning, a Front End Engineer and designer.  
    Besides that, the AI can also chat with users and discuss the challenges of starting a tech startup and provide guidance on how to overcome those challenges, drawing parallels with Todd's experience in these areas.
`;

export const postProcess = `Here's what we postProcess`;

export const resume = `

| Todd Dunning Senior Front End | 📈  16+ years of startup success 🚀  1 IPO, 4 successful exits 🔗  Hands-on & team mgt. |
| :---- | :---- |

8 years React and related libraries.  One IPO and 4 successful exits.  Data-driven feature decisions and prototyping, ensuring that what’s on our roadmap is already proven to engage users when it launches.  I want customers to love what we give them, iterating fast and failing often.  20 years in Product, Design, UI/UX and FE engineering \- and I work great with people. 

**EXPERIENCE**

**JP Morgan Chase,** Palo Alto, CA  
*Senior Front End \- Backstage.io*  
AUG 2023 \- PRESENT  
Helped lead JPM's developer experience team to achieve a 25% increase in deployment efficiency through Spotify Backstage. Drove a 40% uptick in developer adoption with a lot of outreach and feedback with JPM devs across the globe.  The finished internal product helps devs deploy full stack instances instantly for every available stack.  Managed product strategy and user research, utilizing Jira and Miro to align cross-functional teams.   Main tools used:  React, Zustand, Vite, Typescript, React-flow.  

**Elevens.ai,** Menlo Park, CA  
*AI Front End Lead*  
JAN 2023 \- AUG 2023  
Directed the AI Product implementation team, delivering AI-powered medical imaging tools that improved clinic and research department efficiency for early and mid stage startups . Championed a user-centric design process with clients, clinician customers and patients.  Oversaw the release cycle, leveraging Jira for project tracking and ensuring high-quality and HIPAA-compliant deliverables in a fast-paced healthcare tech environment. Main tools: Storybook ,Web APIs, React, Zustand, Typescript, React-flow.  

**Altana.ai,** Brooklyn NY  
*Front End Lead*  
FEB 2022 \- NOV. 2023  
Headed a cross-functional team to advance the Altana Atlas, an AI platform for the global supply chain, leading to a 50% increase in user adoption over my tenure.  Established a 48-hour release cadence with transparent collaboration using workgroup pods, and iterative prototyping that brought designers together with evangelists and customers. Utilized JIRA and Trello for project management and roadmap planning.  Main tools: React, Storybook,  Web APIs, GraphQL,  Zustand, Typescript, Material UI.  Custom CSS.

**OneCare.ai,** Fremont CA  
*Senior Lead*  
OCT 2020 \- JAN 2022\.  
Steered and built the SaaS healthcare startup's product, enhancing our patient management platform and growing user engagement. Integrated real time user feedback into UX/UI, resulting in a 100% boost in platform usage. Defined product vision, prioritized features, and aligned stakeholders.  Main tools:  React, Storybook, Redux, Typescript, Custom CSS, Jira, Confluence.

**RAPID.AI,** Palo Alto CA  
*Founding Senior Engineer*  
FEB 2014 \- OCT 2020  
Founded and led the product team for AI clinical decision support software, securing adoption by over 2,000 hospitals, saving over 13,000 lives during my tenure. Drove user engagement by closely collaborating with end users, enhancing product fit. Created product strategies and coordinated stakeholders, hospitals, clinicians and patients,  Main tools:  React, D3.js, React-Charts, Storybook, Redux, Typescript, Custom CSS, Jira, Confluence.

**Citrix,** San Mateo CA  
*ScaleXtreme UX/Web Lead*  
DEC 2011 \- FEB 2014  
Managed a team of front end developers and ensured the smooth execution of UI/UX projects with UI/UX best practices, user research, and common UI patterns to create a consistent user experience. I increased the user registration rate by 32% and designed ScaleEasy, a consumer-friendly drag-and-drop server management app that enabled users to easily create and deploy server instances across various cloud platforms.

**EDUCATION**

| University of California, Irvine 1982 \- 1985 Business administration and music composition | Brigham Young University 1981 \- 1982 Undeclared |
| :---- | :---- |

**AWARDS**  
**NFX Guild fellow** *\- winning startup*  
Selected by NFX, the invite-only guild for digital networks and marketplaces.  Companies in the program can be post Series A, post Seed, or pre Seed.

**SKILLS**  
React, Next, Chakra, Tailwind, Emotion, Material, SASS, Zustand, Nivo, D3.js, React-Charts, Vite, Webpack, Github Actions, Netlify, Jest/Cypress, Figma, JIRA, Trello, and Storybook, Ladle.js
`

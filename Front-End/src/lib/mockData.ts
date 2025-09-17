import { IPost, IComment, IUser } from "@/types";
import { mockUsers } from "./mockAuth";

// Sample posts with realistic academic content
export const mockPosts: IPost[] = [
  {
    id: "post-1",
    title: "Introduction to Computational Linguistics",
    content: `# Understanding the Intersection of Language and Technology

Computational linguistics represents a fascinating interdisciplinary field that combines traditional linguistics with computer science. In this post, we'll explore the fundamental concepts that make natural language processing possible.

## Key Areas of Study

1. **Syntax Analysis**: Understanding sentence structure and grammar rules
2. **Semantic Processing**: Extracting meaning from text
3. **Pragmatics**: Context-dependent interpretation
4. **Phonetics**: Sound pattern analysis

The field has evolved tremendously with the advent of machine learning and deep neural networks. Modern applications include translation systems, chatbots, and sentiment analysis tools.

## Practical Applications

Students often ask about real-world applications. Consider these examples:
- Search engines understanding query intent
- Voice assistants processing spoken commands
- Automatic translation services
- Text summarization tools

Understanding these fundamentals opens doors to exciting career opportunities in tech, research, and academia.`,
    author: {
      _id: "1",
      name: "María González",
    },
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "post-2",
    title: "Effective Study Strategies for Language Learning",
    content: `# Maximizing Your Language Learning Journey

As a student in the linguistics program, I've discovered several techniques that have dramatically improved my learning efficiency. Here are my top recommendations:

## Spaced Repetition Systems

The science is clear: spaced repetition is one of the most effective learning techniques. I use Anki for vocabulary building and have seen remarkable results.

### My Daily Routine:
- 30 minutes of flashcard review in the morning
- Active recall sessions during lunch breaks
- Evening review of challenging concepts

## Immersion Techniques

Creating an immersive environment doesn't require traveling abroad. Here's what I do:

1. **Media Consumption**: Watch films and series in target language
2. **Language Exchange**: Regular conversations with native speakers
3. **Reading Practice**: Start with simple texts, gradually increase complexity
4. **Journaling**: Daily writing practice in the target language

## Tracking Progress

I maintain a learning journal where I record:
- New vocabulary acquired daily
- Grammar concepts mastered
- Speaking confidence levels
- Cultural insights gained

The key is consistency over intensity. Small daily efforts compound into significant progress over time.`,
    author: {
      id: "2",
      name: "João Silva",
    },
    createdAt: "2024-01-12T14:15:00Z",
    updatedAt: "2024-01-12T14:15:00Z",
  },
  {
    id: "post-3",
    title: "Digital Humanities: Bridging Technology and Literature",
    content: `# The Digital Revolution in Literary Studies

The intersection of technology and humanities has opened unprecedented opportunities for research and analysis. Digital humanities tools are transforming how we approach literary criticism and cultural studies.

## Text Analysis Tools

Modern computational methods allow us to:
- Analyze linguistic patterns across large corpora
- Visualize thematic developments in literature
- Track stylistic evolution in authors' works
- Identify intertextual relationships

## Case Study: Victorian Literature

In my recent research project, I used Python scripts to analyze sentiment patterns in Victorian novels. The results revealed fascinating insights about social attitudes during different periods.

### Tools Used:
- **NLTK** for natural language processing
- **Pandas** for data manipulation
- **Matplotlib** for visualization
- **Jupyter Notebooks** for reproducible research

## Challenges and Opportunities

While digital tools offer powerful capabilities, they also present challenges:
- Ensuring data quality and accuracy
- Maintaining interpretive nuance
- Balancing quantitative and qualitative analysis
- Addressing ethical considerations in data use

The future of humanities scholarship lies in effectively combining traditional methodologies with innovative technological approaches.`,
    author: {
      id: "5",
      name: "Sofia Chen",
    },
    createdAt: "2024-01-10T09:45:00Z",
    updatedAt: "2024-01-10T09:45:00Z",
  },
  {
    id: "post-4",
    title: "Campus Resources for International Students",
    content: `# Navigating University Life as an International Student

Starting university in a new country can be overwhelming, but LingroomTC offers excellent support systems. Here's a comprehensive guide to resources that have helped me thrive.

## Academic Support Services

### Writing Center
- Free one-on-one tutoring sessions
- Help with essays, research papers, and presentations
- Specialized support for non-native English speakers
- Online scheduling system available 24/7

### Library Resources
- Extensive digital databases
- Quiet study spaces
- Research assistance from librarians
- Access to international academic journals

## Social Integration

### International Student Association
The ISA organizes monthly events including:
- Cultural exchange dinners
- Study groups for major courses
- City exploration trips
- Holiday celebrations from various cultures

### Language Exchange Program
I participated in the buddy system and gained:
- Improved conversational skills
- Cultural insights from local students
- Lasting friendships
- Academic networking opportunities

## Practical Support

### Student Services
- Visa and immigration guidance
- Health insurance navigation
- Banking and financial advice
- Housing assistance

The key is to actively engage with these resources early in your academic journey. Don't hesitate to ask for help – the staff and fellow students are incredibly supportive!`,
    author: {
      id: "4",
      name: "Carlos Mendoza",
    },
    createdAt: "2024-01-08T16:20:00Z",
    updatedAt: "2024-01-08T16:20:00Z",
  },
  {
    id: "post-5",
    title: "Research Methodologies in Applied Linguistics",
    content: `# Designing Robust Research in Applied Linguistics

Conducting meaningful research in applied linguistics requires careful consideration of methodology. This post outlines key approaches and considerations for graduate students embarking on research projects.

## Quantitative vs. Qualitative Approaches

### Quantitative Methods
Best suited for:
- Large-scale language acquisition studies
- Statistical analysis of linguistic phenomena
- Experimental design with control groups
- Correlation studies

### Qualitative Methods
Ideal for:
- In-depth case studies
- Ethnographic research
- Narrative analysis
- Phenomenological studies

## Mixed Methods Research

The most comprehensive approach often combines both:
1. **Sequential Design**: Quantitative phase followed by qualitative exploration
2. **Concurrent Design**: Simultaneous data collection and analysis
3. **Transformative Framework**: Addressing social justice issues in language education

## Data Collection Strategies

### Primary Sources
- Surveys and questionnaires
- Interviews and focus groups
- Classroom observations
- Language proficiency tests
- Corpus data collection

### Secondary Sources
- Academic literature reviews
- Existing datasets
- Historical documents
- Policy analysis

## Ethical Considerations

Always ensure:
- Informed consent from participants
- Confidentiality and anonymity
- Cultural sensitivity
- Institutional Review Board approval
- Fair representation of findings

Remember: good research takes time. Plan accordingly and don't rush the process.`,
    author: {
      id: "1",
      name: "María González",
    },
    createdAt: "2024-01-05T11:00:00Z",
    updatedAt: "2024-01-05T11:00:00Z",
  },
  {
    id: "post-6",
    title: "Career Paths in Linguistics and Language Technology",
    content: `# Exploring Professional Opportunities

Many students wonder about career prospects after completing linguistics studies. The field offers diverse and rewarding paths across multiple industries.

## Academic Careers

### Traditional Academia
- University professor positions
- Research scientist roles
- Postdoctoral research opportunities
- Academic administration

### Requirements:
- PhD in relevant field
- Published research portfolio
- Teaching experience
- Grant writing skills

## Industry Applications

### Technology Sector
- Natural Language Processing engineer
- Computational linguist
- User experience researcher
- Voice technology developer
- Machine translation specialist

### Education Industry
- Curriculum designer
- Language assessment specialist
- Educational technology developer
- Corporate training consultant

### Government and Non-Profit
- Policy analyst
- International development coordinator
- Cultural liaison officer
- Translation and interpretation services

## Emerging Fields

The intersection of linguistics with other disciplines creates new opportunities:
- **Digital forensics**: Authorship analysis and text authentication
- **Healthcare**: Speech pathology and assistive technologies
- **Marketing**: Consumer behavior analysis through language patterns
- **Legal**: Forensic linguistics and expert testimony

## Building Your Professional Profile

1. **Develop technical skills**: Python, R, statistical analysis
2. **Gain practical experience**: Internships and research projects
3. **Build networks**: Professional associations and conferences
4. **Create portfolios**: Showcase your research and projects
5. **Stay current**: Follow industry trends and new technologies

The linguistics field is expanding rapidly. Position yourself strategically for the opportunities ahead!`,
    author: {
      id: "5",
      name: "Sofia Chen",
    },
    createdAt: "2024-01-03T13:30:00Z",
    updatedAt: "2024-01-03T13:30:00Z",
  },
];

// Sample comments with realistic academic discussions
export const mockComments: Comment[] = [
  {
    id: "comment-1",
    content:
      "This is an excellent introduction to computational linguistics! I particularly appreciate how you've broken down the key areas. As someone new to the field, I found the practical applications section really helpful. Could you recommend any specific resources for getting started with syntax analysis?",
    author: {
      id: "2",
      name: "João Silva",
    },
    postId: "post-1",
    createdAt: "2024-01-15T11:15:00Z",
    updatedAt: "2024-01-15T11:15:00Z",
  },
  {
    id: "comment-2",
    content:
      'Great question! For syntax analysis, I highly recommend starting with Jurafsky & Martin\'s "Speech and Language Processing." Also, the NLTK book has excellent practical exercises. Would you like me to share some specific Python exercises that helped my students?',
    author: {
      id: "1",
      name: "María González",
    },
    postId: "post-1",
    parentId: "comment-1",
    createdAt: "2024-01-15T12:30:00Z",
    updatedAt: "2024-01-15T12:30:00Z",
  },
  {
    id: "comment-3",
    content:
      "That would be amazing! I'm always looking for hands-on practice opportunities. Thank you for being so helpful, Professor González!",
    author: {
      id: "2",
      name: "João Silva",
    },
    postId: "post-1",
    parentId: "comment-2",
    createdAt: "2024-01-15T13:00:00Z",
    updatedAt: "2024-01-15T13:00:00Z",
  },
  {
    id: "comment-4",
    content:
      "This resonates so much with my own language learning journey! The spaced repetition system you mentioned has been game-changing for me too. I'm curious about your language exchange experiences - how did you find reliable conversation partners?",
    author: {
      id: "4",
      name: "Carlos Mendoza",
    },
    postId: "post-2",
    createdAt: "2024-01-12T15:45:00Z",
    updatedAt: "2024-01-12T15:45:00Z",
  },
  {
    id: "comment-5",
    content:
      "I found HelloTalk and Tandem to be excellent apps for finding language exchange partners. Also, our university's conversation groups meet every Wednesday evening in the language center. Have you tried those yet?",
    author: {
      id: "2",
      name: "João Silva",
    },
    postId: "post-2",
    parentId: "comment-4",
    createdAt: "2024-01-12T16:20:00Z",
    updatedAt: "2024-01-12T16:20:00Z",
  },
  {
    id: "comment-6",
    content:
      "The digital humanities approach you've outlined is fascinating! I'm working on a similar project analyzing 19th-century poetry. Could you share more details about your Python workflow? Specifically, how did you handle the preprocessing of historical texts?",
    author: {
      id: "1",
      name: "María González",
    },
    postId: "post-3",
    createdAt: "2024-01-10T14:20:00Z",
    updatedAt: "2024-01-10T14:20:00Z",
  },
  {
    id: "comment-7",
    content:
      "Historical text preprocessing is definitely tricky! I used a combination of regular expressions and manual cleaning. For Victorian texts, you have to account for archaic spelling and punctuation variations. I'd be happy to share my preprocessing script - it might save you some time!",
    author: {
      id: "5",
      name: "Sofia Chen",
    },
    postId: "post-3",
    parentId: "comment-6",
    createdAt: "2024-01-10T15:30:00Z",
    updatedAt: "2024-01-10T15:30:00Z",
  },
  {
    id: "comment-8",
    content:
      "This is incredibly helpful! As a new international student, I was feeling quite overwhelmed. I didn't know about the Writing Center - that sounds perfect for my needs. Is it necessary to book appointments far in advance?",
    author: {
      id: "2",
      name: "João Silva",
    },
    postId: "post-4",
    createdAt: "2024-01-08T17:10:00Z",
    updatedAt: "2024-01-08T17:10:00Z",
  },
  {
    id: "comment-9",
    content:
      "You can usually get an appointment within a few days, but during midterms and finals it fills up quickly. I recommend booking at least a week ahead during busy periods. Also, they offer drop-in hours on Tuesday afternoons!",
    author: {
      id: "4",
      name: "Carlos Mendoza",
    },
    postId: "post-4",
    parentId: "comment-8",
    createdAt: "2024-01-08T18:00:00Z",
    updatedAt: "2024-01-08T18:00:00Z",
  },
  {
    id: "comment-10",
    content:
      "This is exactly what I needed for my thesis planning! I'm leaning towards a mixed methods approach for my research on bilingual education. The sequential design you mentioned seems most appropriate. Do you have any recommendations for balancing the quantitative and qualitative components?",
    author: {
      id: "4",
      name: "Carlos Mendoza",
    },
    postId: "post-5",
    createdAt: "2024-01-05T14:30:00Z",
    updatedAt: "2024-01-05T14:30:00Z",
  },
  {
    id: "comment-11",
    content:
      'For bilingual education research, I\'d suggest starting with quantitative data collection (test scores, surveys) and then using qualitative interviews to explore the "why" behind the patterns. The ratio depends on your research questions, but 60/40 quant/qual often works well. Happy to discuss this further in office hours!',
    author: {
      id: "1",
      name: "María González",
    },
    postId: "post-5",
    parentId: "comment-10",
    createdAt: "2024-01-05T15:45:00Z",
    updatedAt: "2024-01-05T15:45:00Z",
  },
  {
    id: "comment-12",
    content:
      "The career paths you've outlined are so encouraging! I'm particularly interested in the NLP engineering track. What programming languages would you recommend focusing on beyond Python? And are there any specific certifications that employers value?",
    author: {
      id: "2",
      name: "João Silva",
    },
    postId: "post-6",
    createdAt: "2024-01-03T16:15:00Z",
    updatedAt: "2024-01-03T16:15:00Z",
  },
  {
    id: "comment-13",
    content:
      "For NLP engineering, Python is definitely the foundation, but also consider learning R for statistical analysis and JavaScript for web applications. As for certifications, Google Cloud's ML certification and AWS ML specialty are highly valued. GitHub contributions and personal projects often matter more than certificates though!",
    author: {
      id: "5",
      name: "Sofia Chen",
    },
    postId: "post-6",
    parentId: "comment-12",
    createdAt: "2024-01-03T17:30:00Z",
    updatedAt: "2024-01-03T17:30:00Z",
  },
];

// Organize comments by post and build reply structure
export const getCommentsForPost = (postId: string): Comment[] => {
  const postComments = mockComments.filter(
    (comment) => comment.postId === postId
  );

  // Build reply structure
  const topLevelComments = postComments.filter((comment) => !comment.parentId);

  const buildReplies = (comment: Comment): Comment => {
    const replies = postComments.filter(
      (reply) => reply.parentId === comment.id
    );
    return {
      ...comment,
      replies: replies.map(buildReplies),
    };
  };

  return topLevelComments.map(buildReplies);
};

// Helper function to get all users (combines mock auth users with any additional ones)
export const getAllMockUsers = (): User[] => {
  return mockUsers.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  }));
};

// Helper function to get posts by author
export const getPostsByAuthor = (authorId: string): Post[] => {
  return mockPosts.filter((post) => post.author.id === authorId);
};

// Helper function to search posts
export const searchMockPosts = (query: string): Post[] => {
  const searchTerm = query.toLowerCase().trim();
  if (!searchTerm) return mockPosts;

  return mockPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm) ||
      post.content.toLowerCase().includes(searchTerm) ||
      post.author.name.toLowerCase().includes(searchTerm)
  );
};

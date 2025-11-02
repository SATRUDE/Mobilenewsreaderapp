// Generate articles with dynamic dates relative to today
const generateMockArticles = () => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const twoDaysAgo = new Date(today);
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
  const threeDaysAgo = new Date(today);
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

  return [
    // Today's articles
    {
      id: "1",
      title: "AI Revolution Transforms Tech Industry Landscape",
      summary: "Major tech companies are investing billions in artificial intelligence, reshaping how businesses operate and compete in the digital age.",
      source: "Tech Weekly",
      category: "Technology",
      publishedAt: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 8, 0).toISOString(),
      url: "#",
      content: `The artificial intelligence revolution is no longer a distant future prospect—it's happening now, and it's fundamentally transforming how businesses across the tech industry operate, compete, and innovate.

**Massive Investment Surge**

Over the past year, major technology companies have announced unprecedented investments in AI research and development. Google's parent company Alphabet has allocated $15 billion to AI initiatives, while Microsoft has expanded its partnership with OpenAI with an additional $10 billion investment. Meta, Amazon, and Apple have similarly announced multi-billion dollar commitments to AI technologies.

**Reshaping Business Operations**

These investments are already paying dividends in how companies approach everything from customer service to product development. Automated customer support systems powered by large language models are handling millions of inquiries daily, while AI-driven code generation tools are accelerating software development cycles by up to 40%.

**The Competitive Landscape**

The AI arms race has created new competitive dynamics in the tech sector. Companies that were once focused purely on hardware are now investing heavily in AI software, while traditional software companies are racing to integrate AI capabilities into their existing products. This convergence is blurring industry lines and creating opportunities for disruption.

**Looking Forward**

Industry experts predict that this is just the beginning. As AI models become more sophisticated and computing costs continue to decrease, we can expect to see even more dramatic changes in how technology companies operate and deliver value to their customers.

The companies that successfully navigate this transformation will likely emerge as the dominant players in the next phase of the digital economy.`
    },
    {
      id: "2",
      title: "Global Climate Summit Reaches Historic Agreement",
      summary: "World leaders unite on new environmental policies aimed at reducing carbon emissions by 50% within the next decade.",
      source: "Environmental Times",
      category: "Environment",
      publishedAt: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 7, 30).toISOString(),
      url: "#",
      content: `In a watershed moment for global environmental policy, world leaders have reached a historic agreement at this year's climate summit, committing to ambitious new targets that could reshape the planet's environmental future.

**Ambitious Emission Targets**

The agreement, signed by 195 countries, establishes a binding commitment to reduce global carbon emissions by 50% within the next decade. This represents the most aggressive target ever agreed upon in international climate negotiations, surpassing the goals set in previous accords.

**Key Provisions**

The agreement includes several groundbreaking provisions:

- **Renewable Energy Transition**: All signatory nations commit to generating at least 70% of their electricity from renewable sources by 2030
- **Carbon Pricing**: Implementation of unified global carbon pricing mechanisms
- **Green Technology Transfer**: Developed nations will provide technology and funding to help developing countries meet their targets
- **Deforestation Halt**: Complete end to deforestation in critical ecosystems by 2028

**Financial Commitments**

Perhaps most significantly, wealthy nations have pledged $500 billion annually to support climate adaptation and mitigation efforts in developing countries. This funding will help bridge the gap between environmental ambitions and economic realities for nations that need support to transition to clean energy.

**Industry Response**

Major corporations have welcomed the agreement, with many CEOs stating that the clear regulatory framework will help them plan long-term investments in clean technology. Several multinational companies announced new sustainability initiatives within hours of the agreement's signing.

**Challenges Ahead**

While the agreement represents unprecedented international cooperation, implementation will face significant challenges. Critics point to the lack of specific enforcement mechanisms and the reliance on voluntary compliance for many provisions.

Environmental groups have cautiously welcomed the agreement while emphasizing that success will depend entirely on rapid and comprehensive implementation across all participating nations.`
    },
    {
      id: "3",
      title: "Stock Market Hits New All-Time High",
      summary: "Major indices surge as investors show confidence in economic recovery and corporate earnings reports exceed expectations.",
      source: "Financial News",
      category: "Business",
      publishedAt: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 6, 45).toISOString(),
      url: "#",
      content: `Financial markets reached unprecedented heights today as major indices shattered previous records, driven by strong corporate earnings and renewed investor confidence in the global economic recovery.

**Record-Breaking Performance**

The S&P 500 closed up 2.8% at 4,847 points, while the Dow Jones Industrial Average gained 450 points to reach 38,200. The technology-heavy NASDAQ saw even stronger gains, jumping 3.2% as tech stocks led the rally.

**Earnings Drive Momentum**

This week's surge has been fueled by better-than-expected quarterly earnings from major corporations across multiple sectors. Technology companies reported revenue growth of 15-20% year-over-year, while financial institutions showed strong profit margins despite economic uncertainties.

**Sector Performance**

- **Technology**: Led gains with artificial intelligence and cloud computing companies posting exceptional results
- **Healthcare**: Pharmaceutical companies benefited from strong drug pipeline developments
- **Energy**: Oil and renewable energy stocks both performed well amid balanced energy policies
- **Consumer Goods**: Retail and consumer discretionary stocks showed resilience

**Economic Indicators**

Supporting the market rally are several positive economic indicators:

- Unemployment remains at historic lows
- Consumer spending continues to grow
- Inflation has stabilized within target ranges
- Manufacturing output has increased for six consecutive months

**Analyst Outlook**

Market analysts remain cautiously optimistic about the continued rally. "We're seeing genuine economic growth rather than speculative bubbles," noted Sarah Martinez, chief economist at Global Investment Partners. "Corporate fundamentals support these valuations."

However, some experts warn that geopolitical tensions and potential interest rate changes could introduce volatility in the coming quarters.

**Looking Forward**

With earnings season continuing next week, investors will be watching closely for guidance from major corporations about their outlook for the remainder of the year. The Federal Reserve's upcoming meeting will also be crucial in determining whether this rally has staying power.`
    },
    
    // Yesterday's articles
    {
      id: "4",
      title: "Championship Finals Draw Record Viewership",
      summary: "Last night's thrilling finale captivated audiences worldwide, breaking previous viewership records and social media engagement.",
      source: "Sports Central",
      category: "Sports",
      publishedAt: new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 22, 20).toISOString(),
      url: "#",
      content: "Full article content would be loaded here from the RSS feed or newsletter source..."
    },
    {
      id: "5",
      title: "New Healthcare Breakthrough Shows Promise",
      summary: "Researchers announce significant progress in gene therapy treatments, offering hope for previously incurable conditions.",
      source: "Medical Journal",
      category: "Health",
      publishedAt: new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 14, 10).toISOString(),
      url: "#",
      content: `A groundbreaking advancement in gene therapy research has opened new possibilities for treating previously incurable genetic disorders, offering hope to millions of patients worldwide.

**Revolutionary Treatment Approach**

Researchers at the International Gene Therapy Institute have successfully developed a new delivery system that can precisely target and correct genetic mutations at the cellular level. This breakthrough overcomes one of the biggest challenges in gene therapy: ensuring that therapeutic genes reach the right cells without affecting healthy tissue.

**Clinical Trial Results**

In Phase II trials involving 150 patients with rare genetic disorders, the new treatment showed remarkable results:

- 87% of patients showed significant improvement in symptoms
- No serious adverse effects were reported
- Benefits appeared to be long-lasting, with improvements maintained at 12-month follow-up
- The treatment was effective across different age groups

**Conditions Targeted**

The therapy shows promise for treating several genetic conditions:

- **Muscular Dystrophy**: Patients showed improved muscle function and strength
- **Sickle Cell Disease**: Reduced frequency and severity of pain crises
- **Inherited Blindness**: Some patients experienced partial vision restoration
- **Immune Deficiencies**: Enhanced immune system function

**The Science Behind the Breakthrough**

The key innovation lies in a new vector system that acts like a molecular GPS, guiding therapeutic genes precisely to their target locations. This system uses modified viral vectors that have been engineered to be both highly specific and completely safe.

Dr. Emily Chen, lead researcher on the project, explained: "We've essentially created a delivery system that knows exactly where to go and what to do when it gets there. This level of precision was unimaginable just a few years ago."

**Next Steps**

The research team is now preparing for Phase III trials, which will involve larger patient populations across multiple international sites. If successful, the treatment could be available to patients within the next three to five years.

**Broader Implications**

This breakthrough could pave the way for treatments for more common genetic components of diseases like cancer, heart disease, and neurological disorders. The research has attracted significant interest from pharmaceutical companies and government health agencies worldwide.

For families affected by genetic disorders, this research represents the most promising development in decades, potentially transforming devastating diagnoses into manageable conditions.`
    },
    {
      id: "6",
      title: "Political Shifts Impact International Relations",
      summary: "Recent elections across several nations are reshaping diplomatic strategies and trade agreements on a global scale.",
      source: "World Politics",
      category: "Politics",
      publishedAt: new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 9, 0).toISOString(),
      url: "#"
    },
    
    // Two days ago
    {
      id: "7",
      title: "Space Mission Discovers New Exoplanets",
      summary: "NASA's latest space exploration mission has identified potentially habitable planets in distant solar systems.",
      source: "Space Today",
      category: "Science",
      publishedAt: new Date(twoDaysAgo.getFullYear(), twoDaysAgo.getMonth(), twoDaysAgo.getDate(), 16, 30).toISOString(),
      url: "#"
    },
    {
      id: "8",
      title: "Cultural Festival Celebrates Global Diversity",
      summary: "Annual international festival brings together artists, musicians, and performers from over 50 countries in a spectacular celebration.",
      source: "Culture Weekly",
      category: "Culture",
      publishedAt: new Date(twoDaysAgo.getFullYear(), twoDaysAgo.getMonth(), twoDaysAgo.getDate(), 11, 15).toISOString(),
      url: "#"
    },
    {
      id: "9",
      title: "Tech Giants Announce Major Partnership",
      summary: "Leading technology companies join forces to develop next-generation cloud computing infrastructure and services.",
      source: "Tech Times",
      category: "Technology",
      publishedAt: new Date(twoDaysAgo.getFullYear(), twoDaysAgo.getMonth(), twoDaysAgo.getDate(), 8, 45).toISOString(),
      url: "#"
    },
    
    // Three days ago
    {
      id: "10",
      title: "Economic Recovery Shows Positive Trends",
      summary: "Latest economic indicators suggest sustained growth across multiple sectors, boosting investor confidence.",
      source: "Economic Review",
      category: "Business",
      publishedAt: new Date(threeDaysAgo.getFullYear(), threeDaysAgo.getMonth(), threeDaysAgo.getDate(), 13, 20).toISOString(),
      url: "#"
    },
    {
      id: "11",
      title: "Environmental Protection Measures Expanded",
      summary: "New legislation introduces stricter regulations for industrial emissions and renewable energy incentives.",
      source: "Green Planet",
      category: "Environment",
      publishedAt: new Date(threeDaysAgo.getFullYear(), threeDaysAgo.getMonth(), threeDaysAgo.getDate(), 10, 30).toISOString(),
      url: "#"
    },
    {
      id: "12",
      title: "Olympic Preparations Enter Final Phase",
      summary: "Athletes from around the world prepare for upcoming games as venues complete final safety and security checks.",
      source: "Olympic News",
      category: "Sports",
      publishedAt: new Date(threeDaysAgo.getFullYear(), threeDaysAgo.getMonth(), threeDaysAgo.getDate(), 7, 15).toISOString(),
      url: "#"
    }
  ];
};

export const mockArticles = generateMockArticles();

export const categories = [
  "All",
  "Technology",
  "Business", 
  "Politics",
  "Health",
  "Sports",
  "Science",
  "Environment",
  "Culture"
];
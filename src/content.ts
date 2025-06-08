const TRIGGER_PHRASES = [
  "i'm happy to help",
  "it's important to note that",
  "here are some ways you can",
  "let me know if you'd like more details",
  "that being said",
  "to summarize",
  "in conclusion",
  "on the one hand",
  "on the other hand",
  "you might consider",
  "a few options include",
  "keep in mind that",
  "based on your question",
  "it's worth mentioning that",
  "according to available information",
  "you can try the following",
  "some common approaches include",
  "if you're looking for",
  "it's difficult to say for certain",
  "it's also possible that",
  "one potential explanation is",
  "this depends on the context",
  "generally speaking",
  "as mentioned earlier",
  "as of my knowledge cutoff",
  "while i can't provide personal opinions",
  "for example, you could",
  "it's always a good idea to",
  "please note that",
  "you may want to consult",
  "another perspective is",
  "consider the following",
  "let's break this down",
  "in other words",
  "the following steps can help",
  "the key takeaway is",
  "thanks for your question",
  "hope this helps",
  "feel free to ask if you need more help",
  "let me explain",
  "the best approach depends on",
  "if we break this down",
  "as a general rule",
  "in this context",
  "it's not possible to know for sure",
  "based on current knowledge",
  "there are several factors to consider",
  "let's take a closer look",
  "you could try the following steps",
  "if that's the case",
  "from a technical standpoint",
  "it may be helpful to",
  "let's explore this further",
  "it seems likely that",
  "one thing to keep in mind",
  "it's commonly believed that",
  "here's a simple explanation",
  "that's a great question",
  "another way to think about this is",
  "this is a complex topic",
  "depending on your needs",
  "the main idea is",
  "to better understand this",
  "it's common to",
  "let's walk through an example",
  "generally, this involves",
  "you can think of it as",
  "in layman's terms",
  "from a high-level perspective",
  "it's also worth noting",
  "you might be wondering",
  "there are pros and cons",
  "you may encounter situations where",
  "let me break it down",
  "in technical terms",
  "to put it simply",
  "here's how it works",
  "let's say, for example",
  "when it comes to",
  "this brings us to",
  "you'll want to ensure that",
  "the goal here is to",
  "it's helpful to understand that",
  "let's consider a scenario",
  "you might find it useful to",
  "to clarify further",
  "this raises an interesting point",
  "from a broader perspective",
  "if we consider the fundamentals",
  "to answer your question directly",
  "here's what typically happens",
  "you're not alone in wondering this",
  "it's a nuanced issue",
  "it's generally understood that",
  "it's beneficial to",
  "let's look at the bigger picture",
  "here's a breakdown",
  "there's no one-size-fits-all answer",
  "here's a quick overview",
  "you're correct to ask that",
  "let's walk through the logic",
  "the underlying idea is",
  "this topic often leads to confusion",
  "we can approach this in multiple ways",
  "a simple analogy might help",
  "to address your concern",
  "as previously discussed",
  "looking at this from a practical standpoint",
  "let's approach this step by step",
  "you'll notice that",
  "with that in mind",
  "this highlights the importance of",
  "before diving in, let's consider",
  "spearheaded",
  " — ",
];

const HIGHLIGHTED_BORDER_COLOR = "#1d89e4";

// Regex to test against trigger phrases
const regex = new RegExp(TRIGGER_PHRASES.join("|"), "gi");

// Create resuable function to highlight text
function highlightText(element: HTMLElement | null) {
  if (!element) return;
  const text = element.innerText;
  // Test the text against the regex and add a border if it matches
  if (regex.test(text)) {
    element.style.borderRight = `4px solid ${HIGHLIGHTED_BORDER_COLOR}`;
  }
  // Get the text matches and add a border bottom to each match
  const matches = text.match(regex);
  if (matches && matches.length) {
    // Unique matches to avoid redundant replacements
    const uniqueMatches = [...new Set(matches)];
    let html = element.innerHTML;
    uniqueMatches.forEach((match) => {
      const safeMatch = match.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const highlightRegex = new RegExp(safeMatch, "gi");
      html = html.replace(
        highlightRegex,
        `<span style="border-bottom: 2px solid ${HIGHLIGHTED_BORDER_COLOR};">$&</span>`
      );
    });

    element.innerHTML = html;
  }
  // Mark this comment as processed to avoid re-processing
  element.setAttribute("data-ai-checked", "true");
}

// Function to check and highlight suspected AI text
function highlightAIResponses() {
  const post = document.querySelector<HTMLElement>(
    '[slot="text-body"]:not([data-ai-checked="true"])'
  );
  const comments = document.querySelectorAll<HTMLElement>(
    '[slot="comment"]:not([data-ai-checked="true"])'
  );

  highlightText(post);
  comments.forEach(highlightText);
}

// Run initially
highlightAIResponses();

// Debounced mutation observer to highlight text when the page is updated
let debounceTimer: number | null = null;

const observer = new MutationObserver(() => {
  if (debounceTimer) clearTimeout(debounceTimer);
  // Throttle to 300ms to avoid excessive re-renders
  debounceTimer = window.setTimeout(() => {
    highlightAIResponses();
  }, 300);
});

// Observe the body for changes and highlight text when the page is updated
observer.observe(document.body, {
  childList: true,
  subtree: true,
});

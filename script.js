// Micro AI Assistant — a fake-AI portfolio chatbot.
// It feels conversational but answers from prepared, curated content.

(function () {
  "use strict";

  // --- Prepared knowledge base ---------------------------------------------
  // Each intent has trigger keywords and a canned answer. The first intent
  // whose keywords match the visitor's message wins.
  const knowledge = [
    {
      id: "greeting",
      keywords: ["hi", "hello", "hey", "yo", "greetings", "good morning", "good afternoon"],
      answer:
        "Hi there! 👋 I'm Henry's portfolio assistant. Ask me about his skills, experience, projects, or how to get in touch.",
    },
    {
      id: "skills",
      keywords: ["technolog", "skill", "stack", "tools", "languages", "framework", "tech"],
      answer:
        "Henry works primarily in the .NET ecosystem: <strong>C#, ASP.NET Core, Razor Pages, Entity Framework Core, and SQL Server</strong>. " +
        "He also builds <strong>RESTful APIs</strong> and works with <strong>JavaScript, React, Power Automate, Azure, Git, and GitHub</strong>.",
    },
    {
      id: "experience",
      keywords: ["experience", "work history", "job", "career", "background", "years", "employ"],
      answer:
        "Henry has <strong>2+ years</strong> of professional experience as a Software Developer at Solid Technology Solutions (2024–2026). " +
        "He designs, develops, tests, deploys, and supports enterprise web applications, REST APIs, workflow automation, and database-driven systems.",
    },
    {
      id: "education",
      keywords: ["education", "school", "degree", "study", "nait", "diploma", "university", "college"],
      answer:
        "Henry studied at NAIT: a <strong>Bachelor of Applied Information Systems Technology (2022–2024)</strong> " +
        "and a <strong>Digital Media and IT Diploma (2019–2022)</strong>.",
    },
    {
      id: "projects",
      keywords: ["project", "built", "build", "portfolio piece", "what has he made", "work on"],
      answer:
        "A few of Henry's featured projects:<br>" +
        "• <strong>Enterprise Workflow Management Platform</strong> (ASP.NET Core, SQL Server, EF Core)<br>" +
        "• <strong>Business Process Automation Solution</strong> (Power Automate, Azure, REST APIs)<br>" +
        "• <strong>Inventory & Data Management System</strong> (ASP.NET Core, API integrations)<br>" +
        "• <strong>AI-Powered Communication Application</strong> (ASP.NET Core, AI integration)",
    },
    {
      id: "learning",
      keywords: ["learning", "currently learning", "studying now", "improving", "growing"],
      answer:
        "Right now Henry is learning <strong>AI Agents, Claude Code, Cursor AI development, Azure Cloud Services, and modern React</strong>.",
    },
    {
      id: "resume",
      keywords: ["resume", "cv", "download", "pdf"],
      answer:
        'You can download Henry\'s resume here: <a href="resume.pdf" download="Henry-Zhou-Resume.pdf">Download Resume (PDF)</a>.',
    },
    {
      id: "contact",
      keywords: ["contact", "email", "reach", "linkedin", "github", "get in touch", "hire", "connect"],
      answer:
        "You can reach Henry here:<br>" +
        '• Email: <a href="mailto:zyhhenry42@gmail.com">zyhhenry42@gmail.com</a><br>' +
        '• GitHub: <a href="https://github.com/HenryZhou42" target="_blank" rel="noopener">github.com/HenryZhou42</a><br>' +
        '• LinkedIn: <a href="https://www.linkedin.com/in/henry-zhou-17abb6192" target="_blank" rel="noopener">linkedin.com/in/henry-zhou-17abb6192</a>',
    },
    {
      id: "thanks",
      keywords: ["thank", "thanks", "appreciate", "cheers"],
      answer: "You're welcome! Feel free to ask anything else about Henry. 😊",
    },
  ];

  const fallback =
    "I'm not sure about that one, but I can help with Henry's <strong>technologies</strong>, " +
    "<strong>experience</strong>, <strong>projects</strong>, <strong>resume</strong>, or <strong>contact</strong> info. Try one of the buttons above!";

  const suggestions = [
    "What technologies does Henry use?",
    "What experience does Henry have?",
    "What projects has Henry worked on?",
    "How can I contact Henry?",
    "Can I download Henry's resume?",
  ];

  // --- DOM references -------------------------------------------------------
  const toggle = document.getElementById("chat-toggle");
  const windowEl = document.getElementById("chat-window");
  const closeBtn = document.getElementById("chat-close");
  const messagesEl = document.getElementById("chat-messages");
  const suggestionsEl = document.getElementById("chat-suggestions");
  const form = document.getElementById("chat-form");
  const input = document.getElementById("chat-input");

  let greeted = false;

  // --- Helpers --------------------------------------------------------------
  function addMessage(html, sender) {
    const msg = document.createElement("div");
    msg.className = "chat-msg " + sender;
    msg.innerHTML = html;
    messagesEl.appendChild(msg);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return msg;
  }

  function showTyping() {
    const typing = document.createElement("div");
    typing.className = "chat-msg bot typing";
    typing.innerHTML = "<span></span><span></span><span></span>";
    messagesEl.appendChild(typing);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return typing;
  }

  function findAnswer(text) {
    const q = text.toLowerCase();
    for (const intent of knowledge) {
      if (intent.keywords.some((k) => q.includes(k))) {
        return intent.answer;
      }
    }
    return fallback;
  }

  function botRespond(text) {
    const typing = showTyping();
    setTimeout(() => {
      typing.remove();
      addMessage(findAnswer(text), "bot");
    }, 600);
  }

  function handleUserMessage(text) {
    const trimmed = text.trim();
    if (!trimmed) return;
    addMessage(trimmed, "user");
    botRespond(trimmed);
  }

  function renderSuggestions() {
    suggestionsEl.innerHTML = "";
    suggestions.forEach((s) => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "chat-chip";
      chip.textContent = s;
      chip.addEventListener("click", () => handleUserMessage(s));
      suggestionsEl.appendChild(chip);
    });
  }

  function openChat() {
    windowEl.classList.add("open");
    windowEl.setAttribute("aria-hidden", "false");
    toggle.classList.add("hidden");
    if (!greeted) {
      greeted = true;
      addMessage(
        "Hi! 👋 I'm Henry's portfolio assistant. What would you like to know?",
        "bot"
      );
      renderSuggestions();
    }
    input.focus();
  }

  function closeChat() {
    windowEl.classList.remove("open");
    windowEl.setAttribute("aria-hidden", "true");
    toggle.classList.remove("hidden");
  }

  // --- Events ---------------------------------------------------------------
  toggle.addEventListener("click", openChat);
  closeBtn.addEventListener("click", closeChat);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    handleUserMessage(input.value);
    input.value = "";
  });
})();

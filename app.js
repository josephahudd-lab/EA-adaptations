// ============================================================
// Climate Adaptation Options — Interactive 9-Step Matcher
// ============================================================

// ── Step and Category configuration ───────────────────────────
const STEPS = [
  {
    key: 'Type of Measure',
    title: 'Type of Measure',
    desc: 'What type of adaptation action are you looking for?',
    icon: 'layers',
    options: {
      'Economic/financial': { label: 'Economic & Financial', desc: 'Grants, insurance schemes, subsidies, or pricing mechanisms.', icon: 'banknote' },
      'Ecosystem (nature-based)': { label: 'Ecosystem & Nature', desc: 'Nature-based solutions using natural processes, green spaces, or wetlands.', icon: 'sprout' },
      'Governance/institutional': { label: 'Governance & Policy', desc: 'Government frameworks, policies, planning guidelines, and targets.', icon: 'landmark' },
      'Knowledge and behavioural': { label: 'Knowledge & Data', desc: 'Climate risk platforms, GIS mapping, monitoring, and community planning.', icon: 'book-open' },
      'Physical/technological': { label: 'Physical & Tech', desc: 'Engineered physical infrastructure, barriers, cooling, or digital twin tools.', icon: 'wrench' }
    }
  },
  {
    key: 'Timing of Measure',
    title: 'Timing of Measure',
    desc: 'When should this adaptation measure be implemented?',
    icon: 'clock',
    options: {
      'Anticipatory': { label: 'Anticipatory', desc: 'Proactive actions taken in advance to prevent climate damages before they occur.', icon: 'compass' },
      'Reactive': { label: 'Reactive', desc: 'Responsive actions taken during or after extreme climate events.', icon: 'zap' }
    }
  },
  {
    key: 'Depth of Change',
    title: 'Depth of Change',
    desc: 'How fundamental is the change to the system?',
    icon: 'trending-up',
    options: {
      'Incremental': { label: 'Incremental', desc: 'Modifying existing structures and practices without changing the core system.', icon: 'git-commit' },
      'Transformational': { label: 'Transformational', desc: 'Systemic transitions that alter the fundamental essence of the environment.', icon: 'sparkles' }
    }
  },
  {
    key: 'Governance and Actor Level',
    title: 'Governance Level',
    desc: 'Who has the primary responsibility for implementation?',
    icon: 'users',
    options: {
      'Household/private sector': { label: 'Private & Household', desc: 'Private individuals, businesses, and private landowners.', icon: 'home' },
      'Local authority': { label: 'Local Authority', desc: 'City councils, local planning boards, and community partners.', icon: 'map' },
      'National/multi-level': { label: 'National & Multi-Level', desc: 'National government departments, statutory agencies, and country-wide frameworks.', icon: 'globe' }
    }
  },
  {
    key: 'Implementation Readiness',
    title: 'Readiness Level',
    desc: 'How ready is the solution for immediate deployment?',
    icon: 'hammer',
    options: {
      'Shovel-ready': { label: 'Shovel-Ready', desc: 'Proven, standard methods ready for immediate deployment and rollout.', icon: 'check-circle' },
      'Developmental': { label: 'Developmental', desc: 'Emerging concepts requiring further planning, research, or bespoke design.', icon: 'hourglass' }
    }
  },
  {
    key: 'Adaptability and Robustness',
    title: 'Adaptability',
    desc: 'How flexible is this solution as future conditions change?',
    icon: 'sliders',
    options: {
      'Flexible/modular': { label: 'Flexible & Modular', desc: 'Easy to modify, scale up, or adjust as climate conditions evolve.', icon: 'layers' },
      'Locked-in/fixed': { label: 'Locked-In & Fixed', desc: 'Permanent structural investments that cannot be easily altered once built.', icon: 'lock' }
    }
  },
  {
    key: 'Spatial Scope',
    title: 'Spatial Scope',
    desc: 'What geographic scale does the measure cover?',
    icon: 'grid',
    options: {
      'Catchment/system-wide': { label: 'Catchment & System', desc: 'Solutions covering entire river basins, regions, or national networks.', icon: 'droplet' },
      'Site-Specific': { label: 'Site-Specific', desc: 'Localized interventions tailored to a single property, facility, or street.', icon: 'map-pin' }
    }
  },
  {
    key: 'Cost-Benefit Complexity',
    title: 'Cost-Benefit Complexity',
    desc: 'How complex is it to measure costs and benefits?',
    icon: 'calculator',
    options: {
      'Directly Quantifiable': { label: 'Directly Quantifiable', desc: 'Financial costs and benefits are clear, standardized, and easily priced.', icon: 'line-chart' },
      'Complex/intangible': { label: 'Complex & Intangible', desc: 'Benefits involve social, ecosystem, or long-term values hard to price.', icon: 'help-circle' }
    }
  },
  {
    key: 'Adaptation Function',
    title: 'Adaptation Function',
    desc: 'What is the primary role of this measure?',
    icon: 'shield',
    options: {
      'Adaptive Capacity Building': { label: 'Capacity Building', desc: 'Developing guidelines, monitoring models, data, and training to enable others to adapt.', icon: 'award' },
      'Direct Adaptation Action': { label: 'Direct Action', desc: 'Intervening on the ground to physically reduce vulnerability and block hazards.', icon: 'shield-alert' }
    }
  }
];

const MEASURE_COLORS = {
  'Economic/financial': '#9b4d0f', // Warm Amber
  'Ecosystem (nature-based)': '#2d6a4f', // Green
  'Governance/institutional': '#1d4e89', // Blue
  'Knowledge and behavioural': '#1a6b7c', // Cyan/Teal
  'Physical/technological': '#5c5c52' // Grey
};

// ── Mythological Risk Classes Configurations ───────────────────
const MYTHOLOGICAL_CLASSES = ['Damocles', 'Cyclops', 'Pythia', 'Pandora', 'Cassandra', 'Medusa'];

const RISK_CLASSES_CONFIG = {
  'Damocles':  { color: '#b91c1c', icon: 'shield-alert', kicker: 'Low Probability, Huge Damage' },
  'Cyclops':   { color: '#d97706', icon: 'eye',          kicker: 'Unknown Probability, High Impact' },
  'Pythia':    { color: '#6d28d9', icon: 'sparkles',     kicker: 'Deep Double Uncertainty (P + E)' },
  'Pandora':   { color: '#c2410c', icon: 'archive',      kicker: 'Slow Accumulating, Irreversible' },
  'Cassandra': { color: '#0f766e', icon: 'bell',         kicker: 'Known Serious Risk, Delayed Action' },
  'Medusa':    { color: '#be185d', icon: 'users',        kicker: 'Low Risk, High Public Concern' }
};

// ── Unique Icon Mapping Rules ─────────────────────────────────
const ICON_RULES = [
  { words: ['tree', 'forest', 'woodland', 'afforestation'], icon: 'tree-pine' },
  { words: ['wetland', 'peatland', 'restore', 'habitat', 'soil', 'agriculture', 'farming', 'crop', 'wheat', 'suds', 'greening', 'green infrastructure', 'vegetation', 'roof'], icon: 'sprout' },
  { words: ['barrier', 'defence', 'sea wall', 'dike', 'coastal defense'], icon: 'shield' },
  { words: ['water', 'drainage', 'river', 'stream', 'flow', 'reservoir', 'sewer', 'rain', 'drought', 'aquatic'], icon: 'droplet' },
  { words: ['pricing', 'finance', 'funding', 'tax', 'subsidy', 'insurance', 'market', 'premium', 'incentive'], icon: 'banknote' },
  { words: ['digital twin', 'twin', 'model', 'gis', 'data', 'platform', 'mapping', 'virtual', 'visualisation'], icon: 'cpu' },
  { words: ['warning', 'monitoring', 'sensor', 'iot', 'alert', 'gauge', 'tracking'], icon: 'bell' },
  { words: ['plan', 'policy', 'strategy', 'targets', 'law', 'regulation', 'appraisal', 'audit', 'guidance', 'report'], icon: 'file-text' },
  { words: ['community', 'volunteer', 'public', 'social', 'household', 'education', 'training'], icon: 'users' },
  { words: ['emergency', 'response', 'crisis', 'contingency'], icon: 'shield-alert' },
  { words: ['cooling', 'temperature', 'heat', 'thermal', 'cooling rollout'], icon: 'thermometer-sun' }
];

function getUniqueIconForMethod(name, description) {
  const text = (name + ' ' + (description || '')).toLowerCase();
  for (const rule of ICON_RULES) {
    for (const word of rule.words) {
      if (text.includes(word)) return rule.icon;
    }
  }
  return 'circle-dot'; // Fallback icon
}

const URL_KEYS = {
  'type': 'Type of Measure',
  'timing': 'Timing of Measure',
  'depth': 'Depth of Change',
  'gov': 'Governance and Actor Level',
  'readiness': 'Implementation Readiness',
  'adaptability': 'Adaptability and Robustness',
  'scope': 'Spatial Scope',
  'complexity': 'Cost-Benefit Complexity',
  'function': 'Adaptation Function'
};

// ── State variables ───────────────────────────────────────────
let allData = [];
let riskData = []; // To hold parsed Risk Archetype rows

let currentMode = 'matcher'; // 'matcher' or 'risk'
let activeRiskClass = 'Damocles'; // Selected class in Risk Mode

let currentStep = 0; // 0 = Start, 1..9 = Wizard questions, 10 = Results
let previousStep = 0;
let selectedRisk = 'All';
const totalSteps = STEPS.length;

// Distribution matrix axis configuration
let matrixYKey = 'Type of Measure';
let matrixXKey = 'Spatial Scope';

// Live Search Query
let searchQuery = '';

// User selections: key = CSV Column name, value = selected value (or null for Any)
const selections = {
  'Type of Measure': null,
  'Timing of Measure': null,
  'Depth of Change': null,
  'Governance and Actor Level': null,
  'Implementation Readiness': null,
  'Adaptability and Robustness': null,
  'Spatial Scope': null,
  'Cost-Benefit Complexity': null,
  'Adaptation Function': null
};

// ── Boot ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  restoreStateFromURL();
  
  // Bind Mode Toggle Button
  const modeBtn = document.getElementById('mode-toggle-btn');
  if (modeBtn) {
    modeBtn.addEventListener('click', () => {
      currentMode = currentMode === 'matcher' ? 'risk' : 'matcher';
      renderApp();
    });
  }

  // Load both databases asynchronously
  const fetchAdaptations = fetch('./adaptation_options.csv').then(r => r.text());
  const fetchRisks = fetch('./risk_classes.csv').then(r => r.text());

  Promise.all([fetchAdaptations, fetchRisks])
    .then(([adaptText, riskText]) => {
      allData = parseCSV(adaptText).filter(r => r['Method Name']);
      riskData = parseCSV(riskText).filter(r => MYTHOLOGICAL_CLASSES.includes(r['Class']));
      renderApp();
    })
    .catch(err => {
      document.getElementById('app-container').innerHTML =
        `<div class="error-state">
          <h3>Failed to load database</h3>
          <p>Please run the application on a local server.<br><code>Error: ${err.message}</code></p>
        </div>`;
    });
});

// ── CSV Parser ────────────────────────────────────────────────
function parseCSV(text) {
  const lines   = text.trim().split('\n');
  const headers = parseLine(lines[0]);
  return lines.slice(1).map(line => {
    const vals = parseLine(line);
    const row  = {};
    headers.forEach((h, i) => row[h.trim()] = (vals[i] || '').trim());
    return row;
  });
}

// ── CSV Line Parser ───────────────────────────────────────────
function parseLine(line) {
  const res = []; let cur = '', inQ = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') { inQ = !inQ; continue; }
    if (c === ',' && !inQ) { res.push(cur); cur = ''; continue; }
    cur += c;
  }
  res.push(cur);
  return res;
}

// ── URL State Sync ────────────────────────────────────────────
function updateURL() {
  const params = new URLSearchParams();
  
  if (currentMode === 'risk') {
    params.set('mode', 'risk');
    params.set('class', activeRiskClass);
  } else {
    Object.keys(URL_KEYS).forEach(paramKey => {
      const csvKey = URL_KEYS[paramKey];
      const val = selections[csvKey];
      if (val !== null) {
        params.set(paramKey, val);
      }
    });
    if (currentStep > 0) {
      params.set('step', currentStep);
    }
    if (searchQuery) {
      params.set('q', searchQuery);
    }
  }
  
  const queryStr = params.toString();
  const newURL = window.location.pathname + (queryStr ? '?' + queryStr : '');
  window.history.replaceState(null, '', newURL);
}

function restoreStateFromURL() {
  const params = new URLSearchParams(window.location.search);
  
  if (params.has('mode') && params.get('mode') === 'risk') {
    currentMode = 'risk';
    if (params.has('class')) {
      activeRiskClass = params.get('class');
    }
  } else {
    currentMode = 'matcher';
    Object.keys(URL_KEYS).forEach(paramKey => {
      const csvKey = URL_KEYS[paramKey];
      if (params.has(paramKey)) {
        selections[csvKey] = params.get(paramKey);
      }
    });
    if (params.has('step')) {
      currentStep = parseInt(params.get('step'), 10) || 0;
    }
    if (params.has('q')) {
      searchQuery = params.get('q');
    }
  }
}

// ── Dynamic Theme Morphing ───────────────────────────────────
function updateThemeColor() {
  if (currentMode === 'risk') {
    const config = RISK_CLASSES_CONFIG[activeRiskClass];
    if (config) {
      document.documentElement.style.setProperty('--primary', config.color);
      document.documentElement.style.setProperty('--primary-bg', config.color + '14');
      document.documentElement.style.setProperty('--primary-border', config.color + '40');
      return;
    }
  }
  
  const type = selections['Type of Measure'];
  if (type && MEASURE_COLORS[type]) {
    const color = MEASURE_COLORS[type];
    document.documentElement.style.setProperty('--primary', color);
    document.documentElement.style.setProperty('--primary-bg', color + '14'); // ~8% opacity
    document.documentElement.style.setProperty('--primary-border', color + '40'); // ~25% opacity
  } else {
    // Default blue theme
    document.documentElement.style.setProperty('--primary', '#1d4e89');
    document.documentElement.style.setProperty('--primary-bg', 'rgba(29, 78, 137, 0.08)');
    document.documentElement.style.setProperty('--primary-border', 'rgba(29, 78, 137, 0.25)');
  }
}

// ── Pathway Profile Generator ──────────────────────────────────
function getPathwayProfile() {
  const timing = selections['Timing of Measure'] === 'Anticipatory' ? 'Proactive' : (selections['Timing of Measure'] === 'Reactive' ? 'Responsive' : '');
  
  const typeMap = {
    'Economic/financial': 'Financial',
    'Ecosystem (nature-based)': 'Nature-Based',
    'Governance/institutional': 'Policy-Led',
    'Knowledge and behavioural': 'Data-Driven',
    'Physical/technological': 'Engineering'
  };
  const type = typeMap[selections['Type of Measure']] || '';
  
  const scope = selections['Spatial Scope'] === 'Catchment/system-wide' ? 'System-Wide' : (selections['Spatial Scope'] === 'Site-Specific' ? 'Localized' : '');
  
  const parts = [timing, type, scope].filter(Boolean);
  const profileName = parts.length > 0 ? parts.join(' • ') + ' Pathway' : 'Custom Adaptation Pathway';
  
  const activeCount = STEPS.filter(s => selections[s.key] !== null).length;
  const specificityPct = Math.round((activeCount / totalSteps) * 100);
  
  return { profileName, specificityPct, activeCount };
}

// ── Matching Engine ───────────────────────────────────────────
function getActiveMatchCount() {
  return allData.filter(item => {
    // Only filter by selections up to the current step (if in wizard)
    const bound = currentStep > totalSteps ? totalSteps : currentStep;
    for (let i = 0; i < bound; i++) {
      const step = STEPS[i];
      const selectedVal = selections[step.key];
      if (selectedVal !== null && item[step.key] !== selectedVal) return false;
    }
    return true;
  }).length;
}

// ── Option-Based Match Counter ────────────────────────────────
function getMatchCountForOption(key, value) {
  const stepIdx = STEPS.findIndex(s => s.key === key);
  return allData.filter(item => {
    // Only filter by selections made in steps BEFORE this one
    for (let i = 0; i < stepIdx; i++) {
      const stepKey = STEPS[i].key;
      const selectedVal = selections[stepKey];
      if (selectedVal !== null && item[stepKey] !== selectedVal) return false;
    }
    // Then check the proposed value for the current step
    if (value !== null && item[key] !== value) return false;
    return true;
  }).length;
}

// ── Smart Closest Match Fallback ──────────────────────────────
function getClosestMatches() {
  const activeFilters = STEPS.filter(s => selections[s.key] !== null);
  
  if (activeFilters.length === 0) {
    return { matches: allData, perfect: true, score: 0, maxPossible: 0 };
  }

  const scored = allData.map(item => {
    let score = 0;
    activeFilters.forEach(step => {
      if (item[step.key] === selections[step.key]) score++;
    });
    return { item, score };
  });

  scored.sort((a, b) => b.score - a.score || a.item['Method Name'].localeCompare(b.item['Method Name']));

  const maxScore = scored[0].score;
  const perfectCount = scored.filter(s => s.score === activeFilters.length).length;

  if (perfectCount > 0) {
    return {
      matches: scored.filter(s => s.score === activeFilters.length).map(s => s.item),
      perfect: true,
      score: activeFilters.length,
      maxPossible: activeFilters.length
    };
  } else {
    return {
      matches: scored.filter(s => s.score === maxScore).map(s => s.item),
      perfect: false,
      score: maxScore,
      maxPossible: activeFilters.length
    };
  }
}

// ── Application Views ──────────────────────────────────────────
function renderApp() {
  updateThemeColor();
  updateURL();

  const container = document.getElementById('app-container');
  const statsBar  = document.getElementById('header-stats');
  const statsCount = document.getElementById('hstat-count');
  const modeBtnText = document.getElementById('mode-toggle-text');
  const modeBtnIcon = document.getElementById('mode-toggle-icon');
  
  // Ensure layout contracted by default
  container.classList.remove('expanded-width');
  const headerInner = document.querySelector('.header-inner');
  if (headerInner) headerInner.classList.remove('expanded-width');

  if (currentMode === 'risk') {
    statsBar.style.display = 'none';
    if (modeBtnText) modeBtnText.textContent = 'Matcher Mode';
    if (modeBtnIcon) modeBtnIcon.setAttribute('data-lucide', 'compass');
    renderRiskIdentificationScreen(container);
  } else {
    if (modeBtnText) modeBtnText.textContent = 'Risk Mode';
    if (modeBtnIcon) modeBtnIcon.setAttribute('data-lucide', 'shield-alert');
    
    const activeMatches = getActiveMatchCount();
    statsCount.textContent = activeMatches;
    
    let slideClass = '';
    if (currentStep > 0 && currentStep <= totalSteps) {
      if (previousStep < currentStep) {
        slideClass = 'slide-forward';
      } else if (previousStep > currentStep) {
        slideClass = 'slide-backward';
      }
    }
    previousStep = currentStep;

    if (currentStep === 0) {
      statsBar.style.display = 'none';
      renderStartScreen(container);
    } else if (currentStep > 0 && currentStep <= totalSteps) {
      statsBar.style.display = 'flex';
      renderWizardScreen(container, slideClass);
    } else {
      statsBar.style.display = 'none';
      renderResultsScreen(container);
    }
  }
  
  if (window.lucide) lucide.createIcons();
}

// ── 1. Start Screen ───────────────────────────────────────────
function renderStartScreen(container) {
  container.innerHTML = `
    <div class="start-screen">
      <div class="start-card">
        <div class="start-badge"><i data-lucide="sparkles"></i> Decision Support</div>
        <h2 class="start-title">Find Your Climate Adaptation Pathway</h2>
        <p class="start-desc">
          Answer 9 quick questions about your scope, timing, depth of change, governance, and cost complexity. 
          Our matching engine will filter through <strong>92 adaptation options</strong> to find the most suitable projects and policy targets.
        </p>
        <div class="start-stats">
          <div class="start-stat-item">
            <span class="stat-number">${allData.length}</span>
            <span class="stat-label">Adaptation Options</span>
          </div>
          <div class="start-stat-item-sep"></div>
          <div class="start-stat-item">
            <span class="stat-number">${totalSteps}</span>
            <span class="stat-label">Key Categories</span>
          </div>
        </div>
        <div class="start-actions">
          <button id="start-btn" class="btn btn-primary start-btn">
            Start Guided Matcher <i data-lucide="arrow-right"></i>
          </button>
          <button id="review-all-btn" class="btn btn-outline start-btn">
            Review All Options <i data-lucide="list"></i>
          </button>
        </div>
      </div>
    </div>
  `;
  
  document.getElementById('start-btn').addEventListener('click', () => {
    currentStep = 1;
    renderApp();
  });

  document.getElementById('review-all-btn').addEventListener('click', () => {
    Object.keys(selections).forEach(k => selections[k] = null);
    currentStep = totalSteps + 1; // Skip wizard steps
    renderApp();
  });
}

// ── 2. Wizard Screen ──────────────────────────────────────────
function renderWizardScreen(container, slideClass) {
  const step = STEPS[currentStep - 1];
  const activeMatches = getActiveMatchCount();
  const anyMatchCount = getMatchCountForOption(step.key, null);
  
  let optionCardsHTML = '';
  Object.keys(step.options).forEach(val => {
    const opt = step.options[val];
    const isSelected = selections[step.key] === val;
    const matchCount = getMatchCountForOption(step.key, val);
    const isDisabled = matchCount === 0 && !isSelected;
    
    const examples = allData
      .filter(item => item[step.key] === val)
      .slice(0, 3)
      .map(item => item['Method Name']);
      
    let examplesHTML = '';
    if (examples.length > 0) {
      examplesHTML = `
        <div class="card-examples-panel" style="display: none">
          <div class="examples-title">Typical Options:</div>
          <ul class="examples-list">
            ${examples.map(ex => `<li>${ex}</li>`).join('')}
          </ul>
        </div>
      `;
    }
    
    optionCardsHTML += `
      <div class="option-card ${isSelected ? 'active' : ''} ${isDisabled ? 'disabled' : ''}" 
           data-val="${val}" 
           role="button" 
           tabindex="0">
        
        <button class="card-info-btn" title="View Examples" aria-label="View examples" style="${isDisabled ? 'display:none' : ''}">
          <i class="icon-info" data-lucide="info"></i>
          <i class="icon-close" data-lucide="x" style="display: none"></i>
        </button>

        <div class="card-check">
          <i data-lucide="${isSelected ? 'check-circle-2' : 'circle'}"></i>
        </div>
        <div class="card-icon">
          <i data-lucide="${opt.icon}"></i>
        </div>
        <div class="card-details">
          <div class="card-label">${opt.label}</div>
          <div class="card-description">${opt.desc}</div>
        </div>
        <div class="card-match-count">${matchCount} matches</div>
        ${examplesHTML}
      </div>
    `;
  });
  
  const isAnyActive = selections[step.key] === null;

  container.innerHTML = `
    <div class="wizard-screen ${slideClass}">
      <!-- Progress Bar -->
      <div class="wizard-progress-wrap">
        <div class="wizard-progress-bar">
          <div class="wizard-progress-fill" style="width: ${((currentStep) / totalSteps) * 100}%"></div>
        </div>
        <div class="wizard-steps-text">
          <span>Question ${currentStep} of ${totalSteps}</span>
          <span class="category-name">${step.title}</span>
        </div>
      </div>

      <!-- Question Header -->
      <div class="wizard-question-header">
        <div class="question-icon-wrap">
          <i data-lucide="${step.icon}"></i>
        </div>
        <div class="question-title-wrap">
          <h2 class="question-title">${step.desc}</h2>
        </div>
      </div>

      <!-- Option Cards Grid -->
      <div class="wizard-cards-grid">
        ${optionCardsHTML}
        
        <!-- Any Card -->
        <div class="option-card any-card ${isAnyActive ? 'active' : ''}" data-val="any" role="button" tabindex="0">
          <div class="card-check">
            <i data-lucide="${isAnyActive ? 'check-circle-2' : 'circle'}"></i>
          </div>
          <div class="card-icon">
            <i data-lucide="help-circle"></i>
          </div>
          <div class="card-details">
            <div class="card-label">Any / Don't Care</div>
            <div class="card-description">Do not filter by this category. Show all remaining options.</div>
          </div>
          <div class="card-match-count">${anyMatchCount} matches</div>
        </div>
      </div>

      <!-- Navigation Footer -->
      <div class="wizard-footer">
        <button id="back-btn" class="btn btn-outline">
          <i data-lucide="arrow-left"></i> Back
        </button>
        
        <div class="footer-match-indicator">
          <span class="indicator-pulse"></span>
          <span class="indicator-text"><strong>${activeMatches}</strong> matching options</span>
        </div>
        
        <button id="next-btn" class="btn btn-primary">
          ${currentStep === totalSteps ? 'Show Matches' : 'Next'} <i data-lucide="arrow-right"></i>
        </button>
      </div>
    </div>
  `;
  
  // Wire clicks (including keydown navigation for WCAG/accessibility compliance)
  const cards = container.querySelectorAll('.option-card');
  cards.forEach(card => {
    if (card.classList.contains('disabled')) return;
    
    card.addEventListener('click', () => {
      const val = card.dataset.val;
      selections[step.key] = val === 'any' ? null : val;
      
      for (let i = currentStep; i < totalSteps; i++) {
        selections[STEPS[i].key] = null;
      }
      
      cards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      
      setTimeout(() => {
        if (currentStep < totalSteps) {
          currentStep++;
        } else {
          currentStep = totalSteps + 1;
        }
        renderApp();
      }, 350);
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  container.querySelectorAll('.card-info-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      
      const card = btn.closest('.option-card');
      const panel = card.querySelector('.card-examples-panel');
      const isExpanded = card.classList.contains('expanded');
      
      if (isExpanded) {
        card.classList.remove('expanded');
        panel.style.display = 'none';
      } else {
        card.classList.add('expanded');
        panel.style.display = 'block';
      }
    });
  });
  
  document.getElementById('back-btn').addEventListener('click', () => {
    if (currentStep > 1) {
      currentStep--;
      renderApp();
    } else {
      currentStep = 0;
      Object.keys(selections).forEach(k => selections[k] = null);
      renderApp();
    }
  });
  
  document.getElementById('next-btn').addEventListener('click', () => {
    if (currentStep < totalSteps) {
      currentStep++;
    } else {
      currentStep = totalSteps + 1;
    }
    renderApp();
  });
}

// ── 3. Results Screen ──────────────────────────────────────────
function renderResultsScreen(container) {
  const resultData = getClosestMatches();
  const { matches, perfect, score, maxPossible } = resultData;
  const profile = getPathwayProfile();

  const uniqueRisks = ['All', ...new Set(matches.map(item => item['Key Risk Prevented']).filter(Boolean))].sort();
  if (!uniqueRisks.includes(selectedRisk)) {
    selectedRisk = 'All';
  }

  const filteredMatches = selectedRisk === 'All' 
    ? matches 
    : matches.filter(item => item['Key Risk Prevented'] === selectedRisk);
  
  let activeFiltersHTML = '';
  STEPS.forEach(step => {
    const val = selections[step.key];
    if (val !== null) {
      const label = step.options[val] ? step.options[val].label : val;
      activeFiltersHTML += `
        <div class="filter-badge" data-key="${step.key}">
          <span class="badge-label">${step.title}:</span>
          <span class="badge-val">${label}</span>
          <button class="badge-remove" aria-label="Remove filter">&times;</button>
        </div>
      `;
    }
  });
  
  if (!activeFiltersHTML) {
    activeFiltersHTML = `<span class="no-filters-msg">All categories set to "Any" (Viewing all ${allData.length} options)</span>`;
  }
  
  let riskSlicersHTML = '';
  if (uniqueRisks.length > 2) {
    riskSlicersHTML += `
      <div class="risk-slicer-wrap">
        <span class="risk-slicer-label">Refine by Risk:</span>
        <div class="risk-slicer-btns">
    `;
    uniqueRisks.forEach(risk => {
      const isActive = selectedRisk === risk;
      const count = risk === 'All' ? matches.length : matches.filter(item => item['Key Risk Prevented'] === risk).length;
      riskSlicersHTML += `
        <button class="risk-btn ${isActive ? 'active' : ''}" data-risk="${risk}">
          ${risk} <span class="risk-count">(${count})</span>
        </button>
      `;
    });
    riskSlicersHTML += `
        </div>
      </div>
    `;
  }

  let resultsListHTML = '';
  if (filteredMatches.length === 0) {
    resultsListHTML = `
      <div class="results-empty">
        <h3>No matching options</h3>
        <p>Try clearing some filters above or selecting a different risk category.</p>
        <button id="reset-wizard-btn-empty" class="btn btn-primary">Reset Matcher</button>
      </div>
    `;
  } else {
    filteredMatches.forEach(row => {
      const type = row['Type of Measure'];
      const accentColor = MEASURE_COLORS[type] || '#5c5c52';
      const iconName = getUniqueIconForMethod(row['Method Name'], row['Description / Application']);
      
      resultsListHTML += `
        <div class="result-accordion" data-method="${row['Method Name']}">
          <div class="accordion-trigger">
            <div class="trigger-left">
              <div class="result-icon-wrap" style="--accent-color: ${accentColor}">
                <i data-lucide="${iconName}"></i>
              </div>
              <div class="result-title-group">
                <h3 class="result-name">${row['Method Name']}</h3>
                <span class="result-risk-tag">${row['Key Risk Prevented'] || 'Mixed / General'}</span>
              </div>
            </div>
            <div class="trigger-right">
              <span class="tag-badge" style="border-color: ${accentColor}; color: ${accentColor}">${type}</span>
              <i class="chevron-icon" data-lucide="chevron-down"></i>
            </div>
          </div>
          
          <div class="accordion-content" style="display: none">
            <div class="accordion-content-inner">
              <div class="desc-section">
                <h4>Description &amp; Application</h4>
                <p>${row['Description / Application'] || 'No description available.'}</p>
              </div>
              
              <div class="details-meta-grid">
                <div class="meta-item">
                  <span class="meta-label">Equivalent Project / UK Project</span>
                  <span class="meta-value">${row['Equivalent Project'] || '—'}</span>
                </div>
                <div class="meta-item">
                  <span class="meta-label">Source / Location</span>
                  <span class="meta-value">${row['Source / Location'] || '—'}</span>
                </div>
                <div class="meta-item">
                  <span class="meta-label">Adaptation Function</span>
                  <span class="meta-value">${row['Adaptation Function'] || '—'}</span>
                </div>
                <div class="meta-item">
                  <span class="meta-label">Governance &amp; Actor</span>
                  <span class="meta-value">${row['Governance and Actor Level'] || '—'}</span>
                </div>
                <div class="meta-item">
                  <span class="meta-label">Readiness</span>
                  <span class="meta-value">${row['Implementation Readiness'] || '—'}</span>
                </div>
                <div class="meta-item">
                  <span class="meta-label">Adaptability</span>
                  <span class="meta-value">${row['Adaptability and Robustness'] || '—'}</span>
                </div>
                <div class="meta-item">
                  <span class="meta-label">Spatial Scope</span>
                  <span class="meta-value">${row['Spatial Scope'] || '—'}</span>
                </div>
                <div class="meta-item">
                  <span class="meta-label">Cost-Benefit Complexity</span>
                  <span class="meta-value">${row['Cost-Benefit Complexity'] || '—'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    });
  }
  
  container.innerHTML = `
    <div class="results-screen">
      <!-- Pathway Profile Summary -->
      <div class="profile-card">
        <div class="profile-icon-wrap">
          <i data-lucide="compass"></i>
        </div>
        <div class="profile-details">
          <span class="profile-kicker">Your Selection Profile</span>
          <h3 class="profile-name">${profile.profileName}</h3>
          <p class="profile-meta">Specificity Score: <strong>${profile.specificityPct}%</strong> (${profile.activeCount} of 9 criteria locked)</p>
        </div>
      </div>

      <!-- Title Area -->
      <div class="results-header-section">
        <h2 class="results-title">
          ${perfect ? `Perfect Matches Found` : `Closest Matches Found`}
        </h2>
        <p class="results-subtitle">
          ${perfect 
            ? `We found <strong>${matches.length}</strong> adaptation options matching all your criteria.` 
            : `No exact matches exist. Showing <strong>${matches.length}</strong> options matching <strong>${score}</strong> of your <strong>${maxPossible}</strong> criteria.`
          }
        </p>

        <!-- Selected filter tags -->
        <div class="active-filters-wrap">
          <span class="filters-label">Active filters:</span>
          <div class="filter-badges-list">
            ${activeFiltersHTML}
          </div>
          <button id="reset-wizard-btn" class="btn-reset-link">Start Over</button>
        </div>
      </div>

      <!-- Live Keyword Search Bar -->
      <div class="results-search-wrap">
        <i data-lucide="search" class="search-icon"></i>
        <input type="text" id="results-search-input" placeholder="Search matched options by keyword (e.g. peat, policy, flood)..." value="${searchQuery}" aria-label="Search matched options">
        <button id="search-clear-btn" class="search-clear-btn" style="display: ${searchQuery ? 'block' : 'none'}">&times;</button>
      </div>

      <!-- Toggle View Tabs -->
      <div class="results-tabs-wrap">
        <button class="tab-btn active" data-tab="list">
          <i data-lucide="list"></i> List View
        </button>
        <button class="tab-btn" data-tab="viz">
          <i data-lucide="grid"></i> Distribution Grid
        </button>
      </div>

      <!-- Content panels -->
      <div id="results-list-panel" class="tab-panel">
        <!-- Risk Filter Slicer Tabs -->
        ${riskSlicersHTML}

        <!-- Empty search results placeholder -->
        <div id="search-empty-msg" class="results-empty" style="display: none; padding: 2.5rem 1rem;">
          <h3 style="font-family: var(--font-d); font-size:1.3rem; margin-bottom:0.4rem;">No keyword matches</h3>
          <p style="font-size:0.88rem; color:var(--ink-3);">Try searching for a different keyword or clear the search input.</p>
        </div>

        <!-- Result list -->
        <div class="results-list-wrap">
          ${resultsListHTML}
        </div>
      </div>

      <div id="results-viz-panel" class="tab-panel" style="display: none;">
        <!-- Matrix is injected dynamically here -->
      </div>
    </div>
  `;
  
  const resetBtn = document.getElementById('reset-wizard-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', resetWizard);
  }
  const resetBtnEmpty = document.getElementById('reset-wizard-btn-empty');
  if (resetBtnEmpty) {
    resetBtnEmpty.addEventListener('click', resetWizard);
  }
  
  document.querySelectorAll('.filter-badge').forEach(badge => {
    badge.querySelector('.badge-remove').addEventListener('click', () => {
      const key = badge.dataset.key;
      selections[key] = null;
      renderApp();
    });
  });
  
  document.querySelectorAll('.risk-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      selectedRisk = btn.dataset.risk;
      renderApp();
    });
  });

  // Wire search input listeners
  const searchInput = container.querySelector('#results-search-input');
  const clearBtn = container.querySelector('#search-clear-btn');
  
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    filterElements(searchQuery);
    clearBtn.style.display = searchQuery ? 'block' : 'none';
  });
  
  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    searchQuery = '';
    filterElements('');
    clearBtn.style.display = 'none';
    searchInput.focus();
  });

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const tab = btn.dataset.tab;
      const appContainer = document.getElementById('app-container');
      const headerInner = document.querySelector('.header-inner');
      
      if (tab === 'list') {
        document.getElementById('results-list-panel').style.display = 'block';
        document.getElementById('results-viz-panel').style.display = 'none';
        
        if (appContainer) appContainer.classList.remove('expanded-width');
        if (headerInner) headerInner.classList.remove('expanded-width');
      } else {
        document.getElementById('results-list-panel').style.display = 'none';
        document.getElementById('results-viz-panel').style.display = 'block';
        
        if (appContainer) appContainer.classList.add('expanded-width');
        if (headerInner) headerInner.classList.add('expanded-width');
        
        drawMatrixGrid(filteredMatches);
      }
    });
  });
  
  document.querySelectorAll('.result-accordion').forEach(acc => {
    const trigger = acc.querySelector('.accordion-trigger');
    const content = acc.querySelector('.accordion-content');
    
    trigger.addEventListener('click', () => {
      const isExpanded = acc.classList.contains('active');
      
      document.querySelectorAll('.result-accordion.active').forEach(activeAcc => {
        if (activeAcc !== acc) {
          activeAcc.classList.remove('active');
          activeAcc.querySelector('.accordion-content').style.display = 'none';
        }
      });
      
      if (isExpanded) {
        acc.classList.remove('active');
        content.style.display = 'none';
      } else {
        acc.classList.add('active');
        content.style.display = 'block';
        acc.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  });

  // Apply search query filters immediately if it exists from previous state
  if (searchQuery) {
    filterElements(searchQuery);
  }
}

// ── Dynamic Live Elements Search Filters ───────────────────────
function filterElements(query) {
  const cleanQuery = query.toLowerCase().trim();
  
  // 1. Filter accordion list items in List View
  const accordions = document.querySelectorAll('.result-accordion');
  let visibleAccCount = 0;
  accordions.forEach(acc => {
    const methodName = acc.dataset.method;
    const item = allData.find(r => r['Method Name'] === methodName);
    if (!item) return;
    
    const name = (item['Method Name'] || '').toLowerCase();
    const desc = (item['Description / Application'] || '').toLowerCase();
    const eq = (item['Equivalent Project'] || '').toLowerCase();
    const matches = name.includes(cleanQuery) || desc.includes(cleanQuery) || eq.includes(cleanQuery);
    
    if (matches) {
      acc.style.display = 'block';
      visibleAccCount++;
    } else {
      acc.style.display = 'none';
    }
  });
  
  // Toggle empty warnings in List View
  const emptyMsg = document.getElementById('search-empty-msg');
  if (emptyMsg) {
    emptyMsg.style.display = (visibleAccCount === 0 && accordions.length > 0) ? 'block' : 'none';
  }
  
  // 2. Filter dot-matrix items in Distribution Grid
  const dots = document.querySelectorAll('.matrix-dot');
  dots.forEach(dot => {
    const methodName = dot.dataset.method;
    const item = allData.find(r => r['Method Name'] === methodName);
    if (!item) return;
    
    const name = (item['Method Name'] || '').toLowerCase();
    const desc = (item['Description / Application'] || '').toLowerCase();
    const eq = (item['Equivalent Project'] || '').toLowerCase();
    const matches = name.includes(cleanQuery) || desc.includes(cleanQuery) || eq.includes(cleanQuery);
    
    dot.style.display = matches ? 'flex' : 'none';
  });
}

// ── Interactive Coordinate Dot-Matrix Grid Implementation ─────
function drawMatrixGrid(data) {
  const container = document.getElementById('results-viz-panel');
  container.innerHTML = '';
  
  if (data.length === 0) {
    container.innerHTML = `<p class="no-filters-msg">No matched options to display.</p>`;
    return;
  }

  let tooltip = document.getElementById('matrix-tooltip');
  if (!tooltip) {
    tooltip = document.createElement('div');
    tooltip.id = 'matrix-tooltip';
    tooltip.className = 'matrix-tooltip';
    tooltip.style.display = 'none';
    tooltip.style.position = 'absolute';
    document.body.appendChild(tooltip);
  }

  const yStep = STEPS.find(s => s.key === matrixYKey);
  const xStep = STEPS.find(s => s.key === matrixXKey);

  const yCategories = Object.keys(yStep.options);
  const xCategories = Object.keys(xStep.options);

  const grid = {};
  yCategories.forEach(y => {
    grid[y] = {};
    xCategories.forEach(x => {
      grid[y][x] = [];
    });
  });

  data.forEach(item => {
    const yVal = item[matrixYKey];
    const xVal = item[matrixXKey];
    if (grid[yVal] && grid[yVal][xVal]) {
      grid[yVal][xVal].push(item);
    }
  });

  const gridMinWidth = 200 + xCategories.length * 150;

  let matrixHTML = `
    <div class="matrix-wrapper">
      <div class="matrix-controls">
        <div class="control-group">
          <label for="matrix-y-select">Rows (Y-Axis):</label>
          <select id="matrix-y-select" class="matrix-select">
            ${STEPS.map(s => `<option value="${s.key}" ${s.key === matrixYKey ? 'selected' : ''}>${s.title}</option>`).join('')}
          </select>
        </div>
        <div class="control-group">
          <label for="matrix-x-select">Columns (X-Axis):</label>
          <select id="matrix-x-select" class="matrix-select">
            ${STEPS.map(s => `<option value="${s.key}" ${s.key === matrixXKey ? 'selected' : ''}>${s.title}</option>`).join('')}
          </select>
        </div>
      </div>

      <div class="matrix-info-note">
        <i data-lucide="info"></i>
        <span>Each dot represents an option. Hover to inspect; click to scroll to detailed listing.</span>
      </div>

      <div class="matrix-grid" style="grid-template-columns: 200px repeat(${xCategories.length}, 1fr); min-width: ${gridMinWidth}px;">
        <div class="matrix-cell header-empty"></div>
  `;

  xCategories.forEach(xVal => {
    const opt = xStep.options[xVal];
    matrixHTML += `
      <div class="matrix-cell header-col">
        <div class="header-col-title">${opt.label}</div>
        <div class="header-col-desc">${opt.desc}</div>
      </div>
    `;
  });

  yCategories.forEach(yVal => {
    const yOpt = yStep.options[yVal];
    const color = MEASURE_COLORS[yVal] || '#5c5c52';

    matrixHTML += `
      <div class="matrix-cell header-row" style="border-left-color: ${color}">
        <div class="header-row-title">${yOpt.label}</div>
      </div>
    `;

    xCategories.forEach(xVal => {
      const items = grid[yVal][xVal];
      let dotsHTML = '';

      if (items.length === 0) {
        dotsHTML = `<span class="matrix-dot-empty">—</span>`;
      } else {
        items.forEach(item => {
          const itemColor = MEASURE_COLORS[item['Type of Measure']] || '#5c5c52';
          const iconName = getUniqueIconForMethod(item['Method Name'], item['Description / Application']);
          dotsHTML += `
            <div class="matrix-dot" 
                 data-method="${item['Method Name']}" 
                 style="--dot-color: ${itemColor}"
                 role="button"
                 tabindex="0"
                 aria-label="${item['Method Name']}">
              <i data-lucide="${iconName}"></i>
            </div>
          `;
        });
      }

      matrixHTML += `
        <div class="matrix-cell cell-content">
          <div class="matrix-dots-wrap">
            ${dotsHTML}
          </div>
        </div>
      `;
    });
  });

  matrixHTML += `
      </div>
    </div>
  `;

  container.innerHTML = matrixHTML;

  const ySelect = container.querySelector('#matrix-y-select');
  ySelect.addEventListener('change', () => {
    matrixYKey = ySelect.value;
    drawMatrixGrid(data);
  });

  const xSelect = container.querySelector('#matrix-x-select');
  xSelect.addEventListener('change', () => {
    matrixXKey = xSelect.value;
    drawMatrixGrid(data);
  });

  container.querySelectorAll('.matrix-dot').forEach(dot => {
    dot.addEventListener('mouseenter', (e) => {
      const methodName = dot.dataset.method;
      const item = data.find(r => r['Method Name'] === methodName);
      if (!item) return;

      tooltip.style.display = 'block';
      tooltip.innerHTML = `
        <div class="tooltip-title" style="color: ${MEASURE_COLORS[item['Type of Measure']] || 'var(--primary)'}">${item['Method Name']}</div>
        <div class="tooltip-risk">Risk: <strong>${item['Key Risk Prevented'] || 'General'}</strong></div>
        <div class="tooltip-desc">${item['Description / Application'] || ''}</div>
      `;
    });

    dot.addEventListener('mousemove', (e) => {
      tooltip.style.left = (e.pageX + 15) + 'px';
      tooltip.style.top = (e.pageY - 15) + 'px';
    });

    dot.addEventListener('mouseleave', () => {
      tooltip.style.display = 'none';
    });

    dot.addEventListener('click', () => {
      tooltip.style.display = 'none';
      const methodName = dot.dataset.method;

      document.querySelectorAll('.tab-btn').forEach(btn => {
        if (btn.dataset.tab === 'list') {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
      document.getElementById('results-list-panel').style.display = 'block';
      document.getElementById('results-viz-panel').style.display = 'none';

      const appContainer = document.getElementById('app-container');
      const headerInner = document.querySelector('.header-inner');
      if (appContainer) appContainer.classList.remove('expanded-width');
      if (headerInner) headerInner.classList.remove('expanded-width');

      const acc = document.querySelector(`.result-accordion[data-method="${methodName}"]`);
      if (acc) {
        document.querySelectorAll('.result-accordion.active').forEach(activeAcc => {
          if (activeAcc !== acc) {
            activeAcc.classList.remove('active');
            activeAcc.querySelector('.accordion-content').style.display = 'none';
          }
        });

        const content = acc.querySelector('.accordion-content');
        acc.classList.add('active');
        content.style.display = 'block';

        setTimeout(() => {
          acc.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      }
    });
  });

  if (window.lucide) lucide.createIcons();

  // Re-apply search filter to newly rendered dots in Distribution Grid
  if (searchQuery) {
    filterElements(searchQuery);
  }
}

// ── 4. Risk Identification Mode Screen ────────────────────────
function renderRiskIdentificationScreen(container) {
  const activeClassData = riskData.find(r => r['Class'] === activeRiskClass) || riskData[0];
  if (!activeClassData) {
    container.innerHTML = `<p class="no-filters-msg">Loading risk profiles...</p>`;
    return;
  }
  
  const activeConfig = RISK_CLASSES_CONFIG[activeRiskClass] || RISK_CLASSES_CONFIG['Damocles'];
  
  // Build sidebar list of 6 Risk Classes
  let sidebarHTML = '';
  riskData.forEach(row => {
    const className = row['Class'];
    const isActive = className === activeRiskClass;
    const config = RISK_CLASSES_CONFIG[className] || { color: '#5c5c52', icon: 'shield', kicker: '' };
    
    sidebarHTML += `
      <button class="risk-sidebar-card ${isActive ? 'active' : ''}" 
              style="--risk-color: ${config.color}" 
              data-class="${className}"
              role="tab"
              aria-selected="${isActive ? 'true' : 'false'}">
        <div class="risk-card-icon">
          <i data-lucide="${config.icon}"></i>
        </div>
        <div class="risk-card-text">
          <span class="risk-card-name">${className}</span>
          <span class="risk-card-kicker">${config.kicker}</span>
        </div>
      </button>
    `;
  });

  // Build detail metrics grid
  const metrics = [
    { label: 'Damage Level (E)', key: 'Damage Level (E)' },
    { label: 'Probability (P)', key: 'Probability (P)' },
    { label: 'Uncertainty', key: 'Uncertainty' },
    { label: 'Damage Speed', key: 'Damage Rate (speed)' },
    { label: 'Reversibility', key: 'Reversibility' },
    { label: 'Spatial Scope', key: 'Spatial Scale' },
    { label: 'Time Delay', key: 'Time Delay' },
    { label: 'Perceived Risk', key: 'Perceived Risk' }
  ];

  let metricsHTML = '';
  metrics.forEach(m => {
    metricsHTML += `
      <div class="risk-metric-card">
        <div class="risk-metric-label">${m.label}</div>
        <div class="risk-metric-value">${activeClassData[m.key] || '—'}</div>
      </div>
    `;
  });

  container.innerHTML = `
    <div class="risk-screen">
      <!-- Intro Section -->
      <div style="margin-bottom: 2rem; border-bottom: 1px solid var(--rule); padding-bottom: 1.5rem;">
        <span class="logo-kicker">Scientific Archetypes</span>
        <h2 style="font-family: var(--font-d); font-size: 2.2rem; font-weight: 400; line-height: 1.1; margin-bottom: 0.5rem;">The Mythology of Risk</h2>
        <p style="color: var(--ink-3); font-size: 0.95rem; max-width: 720px;">
          Climate threat management classifies policy challenges using mythological archetypes. Select a profile below to evaluate its scientific traits, core logic, and direct adaptation options.
        </p>
      </div>

      <!-- Split Layout -->
      <div class="risk-portfolio-wrap">
        <!-- Left Sidebar -->
        <div class="risk-sidebar" role="tablist" aria-label="Risk Classes">
          ${sidebarHTML}
        </div>

        <!-- Right Detail Panel -->
        <div class="risk-details-panel" style="--risk-color: ${activeConfig.color}">
          <div class="risk-detail-header">
            <h3 class="risk-detail-class">
              <i data-lucide="${activeConfig.icon}"></i> ${activeRiskClass}
            </h3>
            <div class="risk-detail-feature">${activeClassData['Key Feature']}</div>
          </div>

          <!-- Policy Logic blockquote -->
          <div class="risk-logic-box">
            <div class="risk-logic-title">General Policy Logic</div>
            <div class="risk-logic-text">"${activeClassData['General Policy Approach (Design Logic)']}"</div>
          </div>

          <!-- Risk Characteristics Profile -->
          <div>
            <div class="risk-detail-section-title">Scientific Characteristics Profile</div>
            <div class="risk-metrics-grid">
              ${metricsHTML}
            </div>
          </div>

          <!-- Specific adaptation examples list -->
          <div class="risk-examples-wrap" style="margin-bottom: 0.5rem;">
            <div class="risk-examples-title">Specific Adaptation Options (Examples)</div>
            <div class="risk-examples-list">${activeClassData['Specific Policy Options (Examples)']}</div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Bind Sidebar selectors
  container.querySelectorAll('.risk-sidebar-card').forEach(btn => {
    btn.addEventListener('click', () => {
      activeRiskClass = btn.dataset.class;
      renderApp();
    });
  });
}

function resetWizard() {
  currentStep = 0;
  selectedRisk = 'All';
  searchQuery = ''; // Reset search query on wizard reset
  currentMode = 'matcher'; // Return to matcher mode
  Object.keys(selections).forEach(k => selections[k] = null);
  renderApp();
}

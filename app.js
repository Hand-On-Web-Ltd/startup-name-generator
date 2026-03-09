const words = {
  tech: {
    prefixes: ['Neo', 'Byte', 'Code', 'Data', 'Net', 'Pixel', 'Cloud', 'Sync', 'Logic', 'Core'],
    roots: ['Stack', 'Hub', 'Lab', 'Base', 'Mind', 'Grid', 'Pulse', 'Link', 'Forge', 'Bolt'],
    suffixes: ['ify', 'ly', 'io', 'ware', 'bit', 'dev', 'ops', 'ai', 'x', 'zen'],
  },
  food: {
    prefixes: ['Fresh', 'Tasty', 'Quick', 'Golden', 'Green', 'Honest', 'Daily', 'Pure', 'Bright', 'Sweet'],
    roots: ['Bite', 'Grub', 'Plate', 'Fork', 'Bowl', 'Feast', 'Harvest', 'Kitchen', 'Pantry', 'Table'],
    suffixes: ['ly', 'ery', 'box', 'spot', 'hub', 'co', 'bar', 'dash', 'club', 'pop'],
  },
  health: {
    prefixes: ['Vital', 'Well', 'Calm', 'Pure', 'True', 'Glow', 'Zen', 'Clear', 'Rise', 'Peak'],
    roots: ['Life', 'Mind', 'Body', 'Path', 'Core', 'Flow', 'Bloom', 'Pulse', 'Root', 'Spring'],
    suffixes: ['fit', 'ly', 'care', 'lab', 'well', 'co', 'plus', 'way', 'up', 'zen'],
  },
  finance: {
    prefixes: ['True', 'Clear', 'Safe', 'Smart', 'Fair', 'Bold', 'Prime', 'Solid', 'Open', 'First'],
    roots: ['Fund', 'Ledger', 'Coin', 'Vault', 'Capital', 'Wealth', 'Trust', 'Pay', 'Cash', 'Worth'],
    suffixes: ['fy', 'ly', 'io', 'wise', 'co', 'hub', 'ai', 'pro', 'point', 'bridge'],
  },
  education: {
    prefixes: ['Bright', 'Sharp', 'Open', 'Quick', 'Smart', 'True', 'Fresh', 'Deep', 'Clear', 'Next'],
    roots: ['Learn', 'Mind', 'Skill', 'Class', 'Study', 'Think', 'Brain', 'Book', 'Path', 'Desk'],
    suffixes: ['ly', 'ify', 'hub', 'pad', 'lab', 'co', 'ed', 'box', 'camp', 'quest'],
  },
  creative: {
    prefixes: ['Bold', 'Wild', 'Vivid', 'True', 'Raw', 'Pure', 'Fresh', 'Bright', 'Open', 'Free'],
    roots: ['Craft', 'Studio', 'Ink', 'Canvas', 'Muse', 'Form', 'Sketch', 'Hue', 'Frame', 'Type'],
    suffixes: ['ly', 'ify', 'co', 'lab', 'works', 'house', 'den', 'press', 'room', 'box'],
  },
  retail: {
    prefixes: ['Quick', 'Smart', 'True', 'Fair', 'Fresh', 'Good', 'Best', 'Top', 'Fast', 'Easy'],
    roots: ['Shop', 'Cart', 'Store', 'Market', 'Deal', 'Pick', 'Shelf', 'Trade', 'Pack', 'Haul'],
    suffixes: ['ly', 'ify', 'co', 'hub', 'spot', 'zone', 'box', 'bay', 'pop', 'now'],
  },
  services: {
    prefixes: ['Pro', 'Swift', 'True', 'Peak', 'Clear', 'Prime', 'Sure', 'Top', 'Key', 'First'],
    roots: ['Work', 'Task', 'Plan', 'Edge', 'Point', 'Scope', 'Field', 'Bridge', 'Path', 'Base'],
    suffixes: ['ly', 'ify', 'co', 'hub', 'pro', 'works', 'group', 'team', 'hq', 'now'],
  },
};

const styleRules = {
  modern: { patterns: ['prefix+root', 'root+suffix', 'prefix+suffix'], transform: name => name },
  classic: { patterns: ['prefix+root', 'root+suffix'], transform: name => name + (Math.random() > 0.5 ? ' & Co' : '') },
  playful: { patterns: ['prefix+root', 'root+suffix', 'prefix+suffix'], transform: name => {
    const tweaks = [
      n => n.replace(/e$/, 'y'),
      n => n.replace(/er$/, 'r'),
      n => n + 'o',
      n => n,
    ];
    return tweaks[Math.floor(Math.random() * tweaks.length)](name);
  }},
  techy: { patterns: ['prefix+root', 'root+suffix', 'prefix+suffix'], transform: name => {
    const tweaks = [
      n => n.replace(/[aeiou]([^aeiou]*)$/, '$1'),
      n => n + '.io',
      n => n.toLowerCase(),
      n => n,
    ];
    return tweaks[Math.floor(Math.random() * tweaks.length)](name);
  }},
};

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function generateNames() {
  const industry = document.getElementById('industry').value;
  const style = document.getElementById('style').value;
  const wordSet = words[industry];
  const rules = styleRules[style];
  const results = new Set();

  let attempts = 0;
  while (results.size < 20 && attempts < 200) {
    attempts++;
    const pattern = pick(rules.patterns);
    let name = '';

    if (pattern === 'prefix+root') {
      name = pick(wordSet.prefixes) + pick(wordSet.roots);
    } else if (pattern === 'root+suffix') {
      name = pick(wordSet.roots) + pick(wordSet.suffixes);
    } else {
      name = pick(wordSet.prefixes) + pick(wordSet.suffixes);
    }

    name = rules.transform(name);
    if (name.length >= 4 && name.length <= 20) {
      results.add(name);
    }
  }

  const container = document.getElementById('results');
  container.innerHTML = '';

  results.forEach(name => {
    const domainName = name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    const card = document.createElement('div');
    card.className = 'name-card';
    card.innerHTML = `
      <span class="name-text">${name}</span>
      <a class="check-domain" href="https://www.namecheap.com/domains/registration/results/?domain=${domainName}" target="_blank" rel="noopener">Check Domain →</a>
    `;
    container.appendChild(card);
  });
}

// Generate on load
generateNames();

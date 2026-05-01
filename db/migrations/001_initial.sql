CREATE TABLE IF NOT EXISTS customers (
  id TEXT PRIMARY KEY,
  name TEXT,
  email TEXT,
  created_at TEXT
);

CREATE TABLE IF NOT EXISTS bookings (
  id TEXT PRIMARY KEY,
  name TEXT,
  email TEXT,
  event_type TEXT,
  package TEXT,
  date TEXT,
  guests INTEGER,
  city TEXT,
  notes TEXT,
  status TEXT DEFAULT 'pending',
  operator_id TEXT,
  created_at TEXT
);

CREATE TABLE IF NOT EXISTS operators (
  id TEXT PRIMARY KEY,
  name TEXT,
  email TEXT,
  password_hash TEXT,
  phone TEXT,
  city TEXT,
  state TEXT,
  status TEXT DEFAULT 'pending',
  commission_rate REAL DEFAULT 0.85,
  total_earnings REAL DEFAULT 0,
  why_join TEXT,
  joined_at TEXT
);

CREATE TABLE IF NOT EXISTS events (
  id TEXT PRIMARY KEY,
  booking_id TEXT,
  operator_id TEXT,
  status TEXT DEFAULT 'assigned',
  operator_notes TEXT,
  payout_amount REAL,
  paid_out INTEGER DEFAULT 0,
  created_at TEXT
);

CREATE TABLE IF NOT EXISTS training_modules (
  id TEXT PRIMARY KEY,
  title TEXT,
  step_order INTEGER,
  content TEXT,
  type TEXT DEFAULT 'checklist',
  required INTEGER DEFAULT 1
);

CREATE TABLE IF NOT EXISTS operator_progress (
  id TEXT PRIMARY KEY,
  operator_id TEXT,
  module_id TEXT,
  completed_at TEXT
);

-- Seed training modules
INSERT OR IGNORE INTO training_modules (id, title, step_order, content, type, required) VALUES
(
  'mod-001',
  'Welcome to Lassi Aura',
  1,
  'Understand our brand story and values.

**Our story:** Lassi Aura was founded to bring the art of authentic lassi to events across the country. We believe in premium ingredients, live preparation, and memorable experiences.

**Our values:**
- Quality over speed — every glass is made with care
- Authenticity — we honour traditional recipes while innovating presentation
- Professionalism — we represent the brand at every event
- Guest-first — the guest experience is everything

**Your role as an operator:** You are the face of Lassi Aura at every event. Your professionalism, passion, and presentation define how guests perceive us.

**Checklist:**
- [ ] I have read and understood the Lassi Aura brand story
- [ ] I understand my role as a brand representative
- [ ] I commit to upholding Lassi Aura values at every event',
  'checklist',
  1
),
(
  'mod-002',
  'Ingredient sourcing and quality standards',
  2,
  'Learn our ingredient standards and quality requirements.

**Core ingredients:**
- Full-fat yogurt (minimum 3.5% fat content) — sourced fresh, never more than 2 days old
- Real fruit — seasonal, fresh, no concentrates or artificial flavours
- Authentic spices — cumin for salted, cardamom for sweet, from trusted suppliers
- Rose water — food-grade, imported
- Pure cane sugar — never artificial sweeteners

**Quality checks before every event:**
- [ ] Yogurt is within use-by date and smells fresh
- [ ] All fruit is ripe, undamaged, and washed
- [ ] Spices are stored in airtight containers
- [ ] All equipment is clean and sanitised
- [ ] Cold storage maintained below 4°C during transport

**Never acceptable:**
- Pre-made or reconstituted yogurt bases
- Artificial colouring or flavouring
- Substituting ingredients without admin approval',
  'checklist',
  1
),
(
  'mod-003',
  'The preparation guide — classic sweet lassi',
  3,
  'Master our signature sweet lassi recipe.

**Classic Sweet Lassi (per 400ml serving):**
- 240ml full-fat yogurt
- 80ml cold water or milk
- 2 tbsp sugar (adjust to taste)
- 2 drops rose water
- Pinch of cardamom
- Ice cubes

**Preparation steps:**
1. Chill all ingredients before the event (minimum 2 hours)
2. Add yogurt to the blending vessel first
3. Add sugar, rose water, and cardamom
4. Add water/milk and blend for 45 seconds
5. Add ice and blend for 15 more seconds
6. Pour using the high-pour technique from 30cm height
7. Garnish with a sprinkle of cardamom or dried rose petals

**The high-pour technique:**
Pour from height to aerate the lassi and create a visible froth. This is our signature visual moment.

**Checklist:**
- [ ] I can prepare a classic sweet lassi to standard
- [ ] I have practised the high-pour technique
- [ ] I understand the correct ratios
- [ ] I can adjust sweetness and consistency on request',
  'checklist',
  1
),
(
  'mod-004',
  'Booth setup and presentation standards',
  4,
  'Set up your booth to Lassi Aura brand standards.

**Setup checklist (arrive 90 minutes before event):**
- [ ] Table positioned in agreed location — ideally visible from guest entry
- [ ] Branded tablecloth in terracotta/ivory laid flat with no creases
- [ ] Lassi Aura sign/banner erected and straight
- [ ] All ingredients stored at correct temperature
- [ ] Glassware polished and arranged in neat rows
- [ ] Blending equipment tested and working
- [ ] Waste bin positioned out of guest sight
- [ ] Personal appearance: clean Lassi Aura apron, hair tied back, hands washed

**During the event:**
- Keep the booth clean and tidy at all times
- Wipe surfaces between every 10 glasses served
- Restock ice every 30 minutes
- Smile, make eye contact, and engage guests

**Teardown:**
- Pack all equipment within 30 minutes of event end
- Leave the venue cleaner than you found it
- Report any issues to admin via the app within 24 hours',
  'checklist',
  1
),
(
  'mod-005',
  'Serving etiquette and customer interaction',
  5,
  'Deliver the Lassi Aura experience to every guest.

**The guest interaction script:**
1. Greet warmly: "Welcome! Would you like a Lassi Aura?"
2. Present options: "We have classic sweet, mango, salted, and today''s special — [seasonal flavour]"
3. Prepare with visible care and the high-pour technique
4. Present with both hands: "Here you go — I hope you enjoy it"
5. Invite feedback: "Let me know if you''d like it sweeter or different"

**Handling special requests:**
- Dietary restrictions: always check ingredients, never guess
- No dairy alternatives unless pre-approved for this event
- Children: reduce sugar on request, half portion is fine
- Unhappy guests: replace without question, report to admin

**What never to say:**
- "I don''t know" — say "Let me find out for you"
- "We''re out of that" without offering an alternative
- Never check your phone while serving

**Completing this module:**
- [ ] I understand the guest interaction script
- [ ] I know how to handle common special requests
- [ ] I commit to the Lassi Aura service standard
- [ ] I am ready to represent the brand at events',
  'checklist',
  1
);

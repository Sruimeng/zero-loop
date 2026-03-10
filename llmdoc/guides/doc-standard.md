---
id: doc-standard
type: guide
---

# Doc Standard

Goal: High-signal, zero-noise documentation for ZeroLoop.

## 4 Laws

**Law 1 — Frontmatter Mandatory**
Every doc MUST start with YAML frontmatter: `id` + `type`.
Types: `guide` | `reference` | `strategy` | `skill` | `context`

**Law 2 — Type-First**
Define interfaces/types BEFORE logic.
Data shape drives implementation, not prose.

**Law 3 — Pseudocode Logic**
Complex flows → pseudocode, not paragraphs.
Format: `IF condition THEN action ELSE action`

**Law 4 — No Meta-talk**
BANNED: "In this section...", "I will now...", "Here is..."
BANNED: Introductions, conclusions, summaries of summaries.
REQUIRED: The fact. The type. The rule.

## Structure Template

```
---
id: <kebab-case-id>
type: <type>
---

# <Title>

Goal: <one line>

## Data Model
<types first>

## Logic
<pseudocode>

## Rules
<bullet constraints>
```

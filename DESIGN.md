# Design Brief: EduAI v24 — Grade & Knowledge Surface Separation + Text Opacity & Glass Utilities

## Tone
Sovereign, institutional, powerful academy. EDDI is the single unified intelligence model. Trustworthy K-12. Dark obsidian + gold + teal, full glassmorphism. Grade performance and curriculum knowledge are visually distinct by color — gold for grades, teal for knowledge. Text opacity hierarchy ensures readability hierarchy: primary (90%) for critical content, secondary (70%) for context, tertiary (50%) for supporting info, disabled (40%) for inactive states.

## Surface Distinction Strategy
Grade Vault surfaces (gold-tinted glass) visually isolate student performance data: mastery scores, grade reports, achievement tracking, recognition events. Knowledge surfaces (teal-tinted glass) isolate curriculum content: subjects, lessons, learning materials, standards. Clear visual separation prevents cognitive load when switching contexts. Gold = performance tracking. Teal = knowledge/learning content. Concept maps layer mastery states with distinct OKLCH hues: expert (gold ~70deg), learning (teal ~155deg), cold (grey), hot (cyan ~200deg).

## Text Opacity Hierarchy
| Level | OKLCH | Usage |
| --- | --- | --- |
| Primary | white/90 (rgba(255,255,255,0.9)) | Main headings, active labels, critical content |
| Secondary | white/70 (rgba(255,255,255,0.7)) | Subheadings, descriptions, supporting info |
| Tertiary | white/50 (rgba(255,255,255,0.5)) | Metadata, timestamps, auxiliary labels |
| Disabled | white/40 (rgba(255,255,255,0.4)) | Inactive states, placeholder text, locked content |

## Glass Card Variants & Utilities
| Class | Surface | Tint OKLCH | Border | Glow | Usage |
| --- | --- | --- | --- | --- | --- |
| `.glass-grade-vault` | Grade Vault | `0.76 0.18 84` (gold) | rgba(255,185,0,0.25) | rgba(255,185,0,0.18) | Performance, mastery, grades, achievements |
| `.glass-knowledge-surface` | Knowledge | `0.72 0.17 155` (teal) | rgba(0,220,130,0.25) | rgba(0,220,130,0.18) | Curriculum, subjects, lessons, materials |
| `.glass-quiz-card` | Quiz Context | `0.76 0.18 84` (gold, quiz variant) | rgba(255,185,0,0.20) | rgba(255,185,0,0.12) | Quiz questions, answer cards, results |
| `.glass-queued-card` | Queue State | `0.72 0.17 155` (teal, queue variant) | rgba(0,220,130,0.20) | rgba(0,220,130,0.12) | Queued content, pending lessons, waiting state |
| `.glass-subject-pill` | Subject Tag | Adaptive (gold/teal) | rgba(255,255,255,0.10) | none | Subject badges, topic labels |
| `.glass-active-vault` | Active Mode | `0.72 0.17 155` (teal) | rgba(0,220,130,0.30) | rgba(0,220,130,0.25) | Active session indicator, live session glass |

## Concept Map Mastery Colors
| State | OKLCH | Hue | Usage |
| --- | --- | --- | --- |
| Expert | `0.76 0.18 84` | ~70° gold | Mastered concepts, high performance |
| Learning | `0.72 0.17 155` | ~155° teal | Active learning, in-progress concepts |
| Cold | `0.40 0.06 280` | ~280° grey | Untouched, not yet learned |
| Hot | `0.65 0.22 200` | ~200° cyan | Recently accessed, warm-up state |

## Session Mode Tokens
| Mode | Accent OKLCH | Usage |
| --- | --- | --- |
| Work (Night Study) | `0.68 0.20 40` | Orange accent, late-night focus sessions |
| Free (Afternoon) | `0.65 0.22 200` | Cyan accent, relaxed afternoon study |

## Progress Heatmap 8-Step Gradient
| Step | OKLCH | Description |
| --- | --- | --- |
| `--heatmap-1` | `0.07 0.01 260` | No progress (deep cold) |
| `--heatmap-2` | `0.20 0.10 240` | 12% progress |
| `--heatmap-3` | `0.30 0.15 220` | 25% progress |
| `--heatmap-4` | `0.40 0.18 200` | 37% progress (cyan shift) |
| `--heatmap-5` | `0.55 0.20 155` | 50% progress (teal) |
| `--heatmap-6` | `0.65 0.19 120` | 62% progress (warm teal) |
| `--heatmap-7` | `0.72 0.18 84` | 75% progress (gold) |
| `--heatmap-8` | `0.80 0.20 70` | 100% mastery (bright gold) |

## Glassmorphism Layers
| Depth | Blur | Opacity | Usage |
| --- | --- | --- | --- |
| Surface | 24px | 72% | EDDI orb, hero sections |
| Primary | 16px | 70% | Grade Vault & Knowledge cards, navigation |
| Secondary | 12px | 55% | Subtle panels, secondary content |
| Tertiary | 8px | 40% | Hover states, interactive layers |

## Color Palette
| Element | OKLCH | Context |
| --- | --- | --- |
| Grade Vault Accent | `0.76 0.18 84` | Performance surfaces, gold highlights |
| Knowledge Accent | `0.72 0.17 155` | Curriculum surfaces, teal highlights |
| Session Work Accent | `0.68 0.20 40` | Night study, warm orange |
| Session Free Accent | `0.65 0.22 200` | Afternoon study, cool cyan |
| Background | `0.07 0.01 260` | Deep obsidian, dark sovereign OS |
| Card Base | `0.1 0.012 260` | Glass depth, neutral |

## Typography
| Role | Font | Scale | Usage |
| --- | --- | --- | --- |
| Display | GeneralSans | 6–68px PHI scale | Headers, mode labels, emphasis |
| Body | Figtree | 16px base | Content, descriptions, metadata |
| Mono | JetBrainsMono | 10px | Codes, formulas, technical |

## Spacing (Fibonacci only)
| Value | Pixel | Usage |
| --- | --- | --- |
| XS | 3px | Micro-gaps, borders |
| SM | 5px | Small padding |
| MD | 8px | Standard gap |
| LG | 13px | Card padding, section gap |
| XL | 21px | Section spacing |
| 2XL | 34px | Major sections |
| 3XL | 55px | Hero sections |

## Structural Zones
- **Grade Vault Cards**: `.glass-grade-vault` for student performance, mastery heatmaps, grade reports, recognition milestones. Gold-tinted gradient, gold border, gold glow.
- **Knowledge Surface Cards**: `.glass-knowledge-surface` for curriculum content, subject materials, learning modules, standards. Teal-tinted gradient, teal border, teal glow.
- **Quiz Context**: `.glass-quiz-card` for quiz questions, answers, results. Gold variant for assessment context.
- **Queued Content**: `.glass-queued-card` for pending lessons, waiting states. Teal variant for queue awareness.
- **Subject Pills**: `.glass-subject-pill` for subject/topic badges. Adaptive gold/teal per subject.
- **Active Session**: `.glass-active-vault` for live session indicator. Bright teal with enhanced glow.
- **Concept Maps**: Layer mastery states with OKLCH hues (expert/learning/cold/hot). Nodes and edges reflect mastery progression.
- **Standard Glass**: `.glass-portal-*` for navigation, meta UI, portal-specific chrome.

## Constraints
Full glassmorphism everywhere — no flat white, no solid colors. OKLCH tokens only, no hex/rgb. Glass depth layering enforced. Mobile-first Student/Teacher, desktop-first Principal/IT. All glass surfaces have 0.5–1px bright inner border for depth. Grade and Knowledge surfaces must use distinct tints — never mix gold and teal on same card. PHI grid layout on all pages. Text opacity hierarchy (primary/secondary/tertiary/disabled) applied consistently across all text. Concept map mastery states visually distinct by OKLCH hue, never by saturation alone.

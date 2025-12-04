---
inclusion: always
---

# Project Structure

## Current Organization

```
emochild/
├── .git/              # Git version control
├── .vscode/           # VSCode workspace settings
├── LICENSE            # MIT License
└── README.md          # Project overview
```

## Future Structure Recommendations

When implementing the application, consider organizing by feature:

```
emochild/
├── src/
│   ├── components/    # UI components (creature display, emotion input)
│   ├── features/      # Feature modules (emotion tracking, creature growth)
│   ├── services/      # Business logic and data services
│   ├── utils/         # Shared utilities
│   └── assets/        # Images, animations, sounds
├── tests/             # Test files
└── docs/              # Additional documentation
```

## Conventions

- Keep emotional data handling privacy-focused and secure
- Maintain clear separation between UI and business logic
- Document emotional wellness features with care and sensitivity

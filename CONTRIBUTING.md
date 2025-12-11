# Contributing to Limey Forum

Thank you for your interest in contributing to Limey Forum! This document provides guidelines and instructions for contributing.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Limey.git
   cd Limey
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Create a branch** for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### Running Locally

```bash
npm run dev
```

This starts the development server at `http://localhost:5173`

### Making Changes

1. Make your changes in the appropriate files
2. Test your changes locally
3. Build to ensure no errors:
   ```bash
   npm run build
   ```

### Code Style

- Use TypeScript for all new files
- Follow the existing code structure
- Use functional components with hooks
- Keep components small and focused
- Use meaningful variable and function names

### File Organization

```
src/
├── components/     # Reusable UI components
│   ├── layout/    # Layout components (Header, Sidebar, etc.)
│   └── ui/        # Basic UI components (Buttons, Cards, etc.)
├── pages/         # Page components
├── context/       # React Context providers
├── firebase/      # Firebase configuration and utilities
└── data/          # Mock data and constants
```

## Commit Guidelines

### Commit Messages

Use clear, descriptive commit messages:

```
feat: Add user profile page
fix: Resolve dark mode toggle issue
docs: Update Firebase setup instructions
style: Format code with prettier
refactor: Simplify theme context logic
test: Add tests for ContentCard component
```

### Commit Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

## Pull Request Process

1. **Update documentation** if needed
2. **Ensure the build passes**:
   ```bash
   npm run build
   ```
3. **Push your changes**:
   ```bash
   git push origin feature/your-feature-name
   ```
4. **Create a Pull Request** on GitHub
5. **Fill out the PR template** with:
   - Description of changes
   - Related issue numbers
   - Screenshots (if UI changes)
   - Testing steps

### PR Review

- PRs require at least one approval
- Address review comments promptly
- Keep PRs focused on a single feature/fix
- Rebase on main if conflicts arise

## Testing

Currently, the project uses manual testing. When adding tests:

```bash
npm run test  # (once test infrastructure is added)
```

## Adding Features

### Before Starting

1. **Check existing issues** to avoid duplicate work
2. **Open an issue** to discuss major changes
3. **Get feedback** before investing significant time

### Common Features to Add

- Authentication integration
- Real-time data updates
- Search functionality
- Comment system
- User profiles
- Notifications
- Markdown editor

## Firebase Integration

When adding Firebase features:

1. Test with a development Firebase project
2. Update security rules in documentation
3. Add error handling
4. Document new Firestore collections/schemas

## Documentation

Update documentation when:

- Adding new features
- Changing configuration
- Adding dependencies
- Modifying project structure

Key documentation files:
- `README.md` - Main documentation
- `FIREBASE_SETUP.md` - Firebase instructions
- `QUICKSTART.md` - Quick start guide
- This file (`CONTRIBUTING.md`)

## Code Review Checklist

Before submitting your PR, ensure:

- [ ] Code builds without errors
- [ ] No console errors in browser
- [ ] Works in light and dark mode
- [ ] Responsive on mobile devices
- [ ] Follows existing code style
- [ ] Documentation is updated
- [ ] No sensitive data (API keys, etc.) committed

## Need Help?

- **Questions?** Open an issue with the `question` label
- **Bug?** Open an issue with the `bug` label
- **Feature idea?** Open an issue with the `enhancement` label

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Limey Forum! 🎉

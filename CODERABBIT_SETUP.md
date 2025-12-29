# CodeRabbit AI Code Review Setup

This document explains how to set up and use CodeRabbit AI-powered code reviews for your GitHub repository.

## What is CodeRabbit?

CodeRabbit is an AI-powered code review assistant that:
- 🤖 Automatically reviews pull requests
- 🔍 Identifies bugs, security issues, and code smells
- 💡 Suggests improvements and best practices
- 📝 Provides detailed explanations
- 💬 Answers questions about your code
- ✅ Runs automated checks (ESLint, TypeScript, Prettier)

---

## Setup Steps

### 1. Install CodeRabbit GitHub App

1. Go to [CodeRabbit's GitHub App page](https://github.com/apps/coderabbitai)
2. Click **"Install"** or **"Configure"**
3. Select your repository: `jntuh-results-the-skypedia`
4. Grant the required permissions:
   - ✅ Read access to code
   - ✅ Read and write access to pull requests
   - ✅ Read and write access to issues and comments

5. Click **"Install & Authorize"**

### 2. Verify Configuration

After installation, CodeRabbit will use the configuration in `.coderabbit.yaml`:

✅ **Already configured** - The `.coderabbit.yaml` file is already in your repository with:
- Assertive review profile (detailed feedback)
- Auto-review enabled for PRs
- Path-based instructions for different file types
- Project-specific knowledge base
- Custom guidelines for your stack

### 3. GitHub Actions Workflow

✅ **Already configured** - The workflow file `.github/workflows/coderabbit.yml` has been created with:
- ESLint checks
- TypeScript type checking
- Prettier formatting verification
- Build verification
- Automated PR comments with results

---

## How It Works

### Automatic Reviews

When you create or update a pull request:

1. **CodeRabbit AI** analyzes your changes
2. **GitHub Actions** runs automated checks:
   - ESLint (code quality)
   - TypeScript (type safety)
   - Prettier (formatting)
   - Build (compilation)

3. **Results posted** as PR comments with:
   - Code review feedback
   - Suggested improvements
   - Automated check results

### Interactive Chat

You can ask CodeRabbit questions in PR comments:

```
@coderabbit What does this function do?
```

```
@coderabbit How can I improve this component's performance?
```

```
@coderabbit Is this secure?
```

---

## Configuration Details

### Review Profile: Assertive

CodeRabbit is configured with an **assertive** review profile, which means:
- ✅ Detailed feedback on issues
- ✅ Suggests specific improvements
- ✅ Points out potential problems
- ✅ Provides code examples

### Path-Based Instructions

Different file types get specialized reviews:

| Path Pattern | Focus Areas |
|--------------|-------------|
| `src/components/**/*.tsx` | React best practices, hooks, accessibility, TypeScript |
| `src/app/**/*.tsx` | Server/Client components, SEO, error handling |
| `src/app/api/**/*.ts` | Input validation, security, error handling |
| `**/*.config.{js,ts}` | Security, environment variables, best practices |
| `**/*.{css,scss}` | Unused styles, responsive design, accessibility |

### Knowledge Base

CodeRabbit knows about your project:
- Next.js 16 App Router architecture
- React 19 Server Components
- Authentication is currently disabled
- Uses Tailwind CSS + shadcn/ui
- AdSense integration is critical
- pnpm as package manager

### Custom Guidelines

CodeRabbit follows these guidelines:
✅ Prioritize performance and mobile-first design
✅ Ensure WCAG 2.1 AA accessibility
✅ Maintain consistent code style
✅ Always include proper TypeScript types
✅ Follow Next.js 16 best practices
✅ Check for security vulnerabilities
✅ Verify proper error handling
✅ Ensure responsive design
✅ Review SEO impacts

---

## Using CodeRabbit

### Creating a Pull Request

1. **Create a branch** for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** and commit:
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

3. **Push to GitHub**:
   ```bash
   git push origin feature/your-feature-name
   ```

4. **Open a PR** on GitHub

5. **Wait for review**:
   - CodeRabbit will analyze within 1-2 minutes
   - GitHub Actions checks run automatically
   - Results appear as PR comments

### Interacting with CodeRabbit

**Ask questions:**
```
@coderabbit explain this function
```

**Request specific reviews:**
```
@coderabbit review this for security issues
```

**Get suggestions:**
```
@coderabbit how can I optimize this?
```

**Check performance:**
```
@coderabbit are there any performance issues?
```

### Responding to Feedback

When CodeRabbit suggests changes:

1. **Review the suggestion** - Read the explanation
2. **Make changes** if you agree
3. **Push updates** to the same branch
4. **Reply to comments** if you disagree or have questions
5. **Mark as resolved** when fixed

---

## GitHub Actions Checks

Every PR runs these automated checks:

### 1. ESLint Check
```bash
pnpm lint
```
**Checks for:**
- Code quality issues
- Unused variables
- React hooks violations
- TypeScript errors

### 2. TypeScript Check
```bash
pnpm type-check
```
**Checks for:**
- Type errors
- Missing types
- Type mismatches

### 3. Prettier Check
```bash
pnpm format:check
```
**Checks for:**
- Code formatting consistency
- Style violations

### 4. Build Check
```bash
pnpm build
```
**Checks for:**
- Compilation errors
- Build failures
- Runtime errors

### Results Format

All results are posted as a comment on your PR:

```markdown
## 🤖 Automated Code Review Results

### ESLint Results
✅ No issues found

### TypeScript Results
✅ Type check passed

### Prettier Results
⚠️ 3 files need formatting

### Build Status
✅ Build successful (47/47 pages)
```

---

## Best Practices

### Before Opening PR

1. **Run checks locally:**
   ```bash
   pnpm lint
   pnpm type-check
   pnpm format
   pnpm build
   ```

2. **Fix issues** before pushing

3. **Write descriptive PR titles:**
   - ✅ `feat: add CGPA calculator validation`
   - ❌ `update code`

4. **Include PR description** explaining what changed and why

### During Review

1. **Respond to comments** promptly
2. **Ask questions** if feedback is unclear
3. **Request re-review** after making changes
4. **Don't rush** - take time to understand suggestions

### Merging PR

1. **All checks must pass** (ESLint, TypeScript, Prettier, Build)
2. **Address CodeRabbit feedback** or explain why you're not
3. **Get human review** for major changes
4. **Squash commits** if needed
5. **Merge** when approved

---

## Troubleshooting

### CodeRabbit Not Reviewing

**Problem**: CodeRabbit doesn't comment on your PR

**Solutions**:
1. Check if the GitHub App is installed correctly
2. Verify repository permissions
3. Check if `.coderabbit.yaml` exists
4. Try commenting `@coderabbit review` to trigger manually

### GitHub Actions Failing

**Problem**: Automated checks fail

**Solutions**:
1. Check the Actions tab for detailed logs
2. Run checks locally to reproduce
3. Fix issues and push again
4. Check if secrets/env variables are set

### Too Many Comments

**Problem**: CodeRabbit is too verbose

**Solutions**:
1. Edit `.coderabbit.yaml` and change profile to `chill`
2. Add more patterns to the `ignore` section
3. Disable specific tools if not needed

### False Positives

**Problem**: CodeRabbit flags correct code

**Solutions**:
1. Reply explaining why it's correct
2. Add project-specific context to `knowledge_base` in `.coderabbit.yaml`
3. Use inline comments to explain complex logic

---

## Configuration Reference

### `.coderabbit.yaml` Options

```yaml
# Review profile: chill, assertive, or pythonic
profile: assertive

# When to request changes: auto, never, always
request_changes_workflow: auto

# Enable/disable auto-review
auto_review:
  enabled: true
  drafts: false

# Enable/disable tools
tools:
  eslint:
    enabled: true
  tsc:
    enabled: true
  prettier:
    enabled: true

# Ignore patterns
ignore:
  - "node_modules/**"
  - ".next/**"
```

### Environment Variables

GitHub Actions workflow uses these secrets:
- `GITHUB_TOKEN` - Automatically provided by GitHub
- No additional secrets needed!

---

## Cost

CodeRabbit offers:
- ✅ **Free tier** - Available for open source projects
- 💰 **Paid plans** - For private repositories with more features

This project is configured to use the free tier.

---

## Benefits

### For You
✅ **Faster reviews** - Get feedback in minutes, not hours
✅ **Learn best practices** - CodeRabbit teaches as it reviews
✅ **Catch bugs early** - Before they reach production
✅ **Consistent quality** - Every PR gets thorough review
✅ **Time savings** - Less time fixing bugs later

### For the Project
✅ **Higher code quality** - Automated standards enforcement
✅ **Better documentation** - CodeRabbit suggests improvements
✅ **Security** - Catches vulnerabilities early
✅ **Maintainability** - Enforces best practices
✅ **Onboarding** - New contributors get instant feedback

---

## Example Review

### Before CodeRabbit
```tsx
const getData = async () => {
  const res = await fetch(url);
  return res.json();
}
```

### CodeRabbit Feedback
> ⚠️ Missing error handling for fetch request.
>
> **Suggestion:**
> ```tsx
> const getData = async () => {
>   try {
>     const res = await fetch(url);
>     if (!res.ok) {
>       throw new Error(`HTTP error! status: ${res.status}`);
>     }
>     return await res.json();
>   } catch (error) {
>     console.error('Failed to fetch data:', error);
>     throw error;
>   }
> }
> ```
>
> **Why:** This prevents unhandled promise rejections and provides better error messages.

### After Implementing
```tsx
const getData = async () => {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error('Failed to fetch data:', error);
    throw error;
  }
}
```

---

## Next Steps

1. ✅ **Install CodeRabbit** - Follow setup steps above
2. ✅ **Create a test PR** - Try it out with a small change
3. ✅ **Review the feedback** - See what CodeRabbit suggests
4. ✅ **Customize config** - Adjust `.coderabbit.yaml` to your needs
5. ✅ **Use regularly** - Make it part of your workflow

---

## Learn More

- 📚 [CodeRabbit Documentation](https://docs.coderabbit.ai/)
- 🎥 [CodeRabbit Demo Videos](https://coderabbit.ai/demos)
- 💬 [CodeRabbit Community](https://github.com/coderabbitai/discussions)
- 🐛 [Report Issues](https://github.com/coderabbitai/coderabbit-cli/issues)

---

## Support

Need help?
- 📧 Email: support@coderabbit.ai
- 💬 Discord: Join the CodeRabbit community
- 📖 Docs: https://docs.coderabbit.ai
- 🐛 GitHub: Open an issue in the CodeRabbit repository

---

**Happy Coding with AI-Powered Reviews! 🚀**

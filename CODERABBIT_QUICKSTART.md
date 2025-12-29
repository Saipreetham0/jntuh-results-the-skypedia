# CodeRabbit Quick Start Guide

Get AI-powered code reviews in **5 minutes**! 🚀

## Step 1: Install CodeRabbit (2 minutes)

1. Go to: https://github.com/apps/coderabbitai
2. Click **"Install"**
3. Select repository: `jntuh-results-the-skypedia`
4. Click **"Install & Authorize"**

✅ Done! CodeRabbit is now installed.

---

## Step 2: Test It (3 minutes)

### Create a Test PR

```bash
# 1. Create a test branch
git checkout -b test/coderabbit-demo

# 2. Make a small change (e.g., add a comment)
echo "// Testing CodeRabbit" >> src/app/page.tsx

# 3. Commit and push
git add .
git commit -m "test: try CodeRabbit review"
git push origin test/coderabbit-demo

# 4. Open PR on GitHub
# Go to: https://github.com/YOUR_USERNAME/jntuh-results-the-skypedia/compare
```

### What Happens Next

Within **1-2 minutes**:
1. ✅ CodeRabbit analyzes your changes
2. ✅ GitHub Actions runs automated checks
3. ✅ Results appear as PR comments

---

## Step 3: Interact

### Ask Questions

Comment on your PR:
```
@coderabbit explain this change
```

```
@coderabbit review for security
```

```
@coderabbit suggest improvements
```

---

## Configuration Already Done! ✅

The following files are already configured:
- ✅ `.coderabbit.yaml` - CodeRabbit settings
- ✅ `.github/workflows/coderabbit.yml` - Automated checks

---

## What Gets Reviewed?

Every PR gets checked for:
- ✅ **ESLint** - Code quality
- ✅ **TypeScript** - Type safety
- ✅ **Prettier** - Formatting
- ✅ **Build** - Compilation
- ✅ **AI Review** - Best practices, bugs, security

---

## Results Example

You'll see comments like:

> ## 🤖 Automated Code Review Results
>
> ### ESLint Results
> ✅ No issues found
>
> ### TypeScript Results
> ✅ Type check passed
>
> ### Prettier Results
> ✅ All files formatted correctly
>
> ### Build Status
> ✅ Build successful (47/47 pages)

Plus CodeRabbit's AI feedback on your code!

---

## Need Help?

📖 Full docs: [CODERABBIT_SETUP.md](CODERABBIT_SETUP.md)

---

That's it! You now have AI-powered code reviews! 🎉

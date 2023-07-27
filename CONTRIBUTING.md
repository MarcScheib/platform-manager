# Contributing

Here are the guidelines you want to follow:

- [Submission Guidelines](#submit)
- [Coding Rules](#rules)
- [Commit Message Guidelines](#commit)

## <a name="submit"></a> Submission Guidelines

### Resolving Issues

- Make your changes in a new git branch:

  ```shell
  git checkout -b my-fix-branch main
  ```

- Create your patch, **including appropriate test cases**.
- Follow our [Coding Rules](#rules).
- Commit your changes using a descriptive commit message that follows our
  [commit message conventions](#commit-message-format). Adherence to
  the [commit message conventions](#commit-message-format)
  is required because release notes are automatically generated from these messages.

  ```shell
  git commit -a
  ```

  Note: the optional commit `-a` command line option will automatically "add" and "rm" edited files.

- Build your changes locally to ensure all the tests pass:

  ```shell
  npm run test
  ```

- Push your branch:

  ```shell
  git push origin my-fix-branch
  ```

- Create a review.

- If changes are suggested:
  - Make the required updates.
  - Commit your changes to your branch (e.g. `my-fix-branch`).
  - Push the changes.

If your branch gets too outdated, you may have to rebase and force push to update it:

```shell
git rebase main -i
git push origin my-fix-branch -f
```

_WARNING. Squashing or reverting commits and forced push thereafter may remove comments
on code that were previously made by you and others in your commits._

#### After your branch is merged

After your branch is merged, you can safely delete your branch and pull the changes
from the main (upstream) repository:

- Delete the remote branch e.g. via your local shell as follows:

  ```shell
  git push origin --delete my-fix-branch
  ```

- Check out the main branch:

  ```shell
  git checkout main -f
  ```

- Delete the local branch:

  ```shell
  git branch -D my-fix-branch
  ```

- Update your main with the latest upstream version:

  ```shell
  git pull --ff upstream main
  ```

## <a name="rules"></a> Coding Rules

To ensure consistency throughout the source code, keep these rules in mind as you are working:

- All features or bug fixes **must be tested** by one or more specs.
- Code should be checked against our **lint rules**: `npm run lint`.
- Code should be formatted using Prettier. This is automatically executed when committing
  via local git hooks.

## <a name="commit"></a> Git Commit Guidelines

We have very precise rules over how our git commit messages can be formatted. This leads to **more
readable messages** that are easy to follow when looking through the **project history**. But also,
we use the git commit messages to **generate the change logs**.

### Commit Message Format

Each commit message consists of a **header** and a **body**. The header has a special
format that includes a **type**, a **scope**, and a **subject**:

```
<type>(<scope>?): <subject>
<BLANK LINE>
<body>
```

The **header** is mandatory and the **scope** of the header is optional.

The header line cannot be longer than 50 characters, any other line
cannot be longer than 72 characters! This allows
the message to be easier to read in various git tools.

### Revert

If the commit reverts a previous commit, it should begin with `revert:`,
followed by the header of the reverted commit. In the body it should
say: `This reverts commit <hash>.`, where the hash is the SHA of the commit being reverted.

### Type

Must be one of the following:

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing
  semi-colons, etc)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests
- **chore**: Changes to the build process or auxiliary tools and libraries such as documentation
  generation
- **revert**: Revert a previous made commit.
- **ci**: Changes that do affect the continuous integration, e.g. Jenkins pipeline changes.
- **build**: Changes that do affect the build process of the apps, e.g. to Maven or custom scripts.

### Scope

The scope could be anything specifying place of the commit change.

### Subject

The subject contains succinct description of the change:

- use the imperative, present tense: "change" not "changed" nor "changes"
- don't capitalize first letter
- no dot (.) at the end

### Body

Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

**Breaking Changes** should start with the word `BREAKING CHANGE:` with a space or two newlines.
The rest of the commit message is then used for this.

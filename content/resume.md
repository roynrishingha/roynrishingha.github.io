+++
title = "Resume | Nrishinghananda Roy"
description = "Professional Experience and Resume of Nrishinghananda Roy"
template = "resume.html"

[extra]
summary = "Software Engineer with production experience building backend systems in Rust. Delivered a Java-to-Rust microservice migration reducing response times from 3 seconds to under 200ms, and built document processing pipelines handling PDF, image, and DOCX formats in Rust."

[[extra.skills]]
category = "Languages"
items = ["Rust", "TypeScript"]

[[extra.skills]]
category = "Backend Systems"
items = ["REST API (axum, tokio)", "PostgreSQL"]

[[extra.skills]]
category = "Cloud and Infrastructure"
items = ["Docker", "AWS (EC2)", "Terraform"]

[[extra.opensource]]
title = "Rust Clippy"
url = "http://github.com/rust-lang/rust-clippy"
description = "Contributed lints and improvements to the official Rust linter used by the entire Rust ecosystem."
pr_url = "https://github.com/rust-lang/rust-clippy/pulls?q=author:roynrishingha"

[[extra.projects]]
title = "lsmdb: LSM-Tree Key-Value Database"
github_url = "https://github.com/roynrishingha/lsmdb"
crates_url = "http://crates.io/crates/lsmdb"
blog_url = "https://roynrishingha.com/blog/lsmdb/"
description = "Persistent, crash-safe key-value storage engine built on Log-Structured Merge Tree architecture in Rust. Published on crates.io as both a library and CLI binary."

[[extra.experiences]]
title = "Software Engineer"
company = "Freelance"
date = "Nov 2024 - Present"
bullets = [
    "Identified and reverse engineered a multi-stage credential-stealing malware delivered via a fake recruitment process. Performed static analysis of obfuscated JavaScript payloads, decoded XOR-encrypted strings, and documented findings in two published technical posts.",
    "Built and deployed a cross-platform mobile app (React Native, Expo, Firebase) to the Apple App Store for ISKCON Phoenix USA. Handled App Store submission and resolved review conflicts independently to achieve production deployment."
]

[[extra.experiences]]
title = "Software Engineer"
company = "Codefy GmbH | Remote, Germany"
date = "Nov 2023 - Oct 2024"
bullets = [
    "Eliminated a critical performance bottleneck by replacing a third-party Java microservice with an in-house Rust service built with **axum (Rust)** and **PostgreSQL**. Analyzed the open-source Java codebase and replicated its behavior in Rust, reducing response times from 3+ seconds to under **200ms**.",
    "Built document processing pipelines in Rust for automated legal workflows, including PDF editing, image transformation, and DOCX generation from Jinja template. Used **lopdf** and **image** libraries to handle format conversion, page-level image placement, and document compilation, reducing manual effort significantly.",
    "**Built end-to-end features** for a legal case management system used in production by legal teams. Worked extensively across **React/TypeScript** frontend and **Rust (axum)** backend to ship client intake, document automation, case tracking, and sales workflows."
]

[[extra.experiences]]
title = "Associate Software Engineer"
company = "Dhiway | Remote, India"
date = "Apr 2023 - Oct 2023"
bullets = [
    "Developed systems components in **Rust**, including custom runtime modules, unit tests, and performance benchmarks for a high-throughput transaction processing system.",
    "Provisioned and managed a globally distributed network of 60+ nodes across **AWS EC2** and **GCP** using **Terraform**, enabling reliable production infrastructure across multiple regions.",
    "Executed a full cloud migration from **AWS** to **GCP**, maintaining infrastructure parity while minimising service disruption."
]

[[extra.experiences]]
title = "Frontend Developer"
company = "Trustforum | Remote, France"
date = "Jan 2022 - Mar 2023"
bullets = [
    "Built a scalable component system using React and TypeScript for an early-stage community platform."
]
+++

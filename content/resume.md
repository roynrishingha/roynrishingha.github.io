+++
title = "Resume | Nrishinghananda Roy"
description = "Professional Experience and Resume of Nrishinghananda Roy"
template = "resume.html"

[extra]
summary = "Systems-focused Software Engineer specializing in high-throughput backend architecture and low-level performance optimization. Demonstrated expertise in Rust, delivering critical legacy-to-Rust migrations that reduced system latency by over 90%."

[[extra.skills]]
category = "Languages"
items = ["Rust", "C", "Python"]

[[extra.skills]]
category = "Backend Systems"
items = ["REST API", "gRPC", "WebSocket", "PostgreSQL"]

[[extra.skills]]
category = "Cloud"
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
    "Built and deployed a cross-platform mobile app (React Native, Expo, Firebase) to the Apple App Store for ISKCON Phoenix USA. Handled App Store submission and resolved review conflicts independently to achieve production deployment."
]

[[extra.experiences]]
title = "Software Engineer"
company = "Codefy GmbH | Remote, Germany"
date = "Nov 2023 - Oct 2024"
bullets = [
    "Eliminated a critical performance bottleneck by replacing a third-party Java microservice with an in-house Rust service built with **axum (Rust)** and **PostgreSQL**. Analyzed the open-source Java codebase and replicated its behavior in Rust, reducing response times **from 3+ seconds to under 200ms**.",
    "Built document processing pipelines in Rust for automated legal workflows, including PDF editing, image transformation, and DOCX generation from Jinja template. Used **lopdf** and **image** libraries to handle format conversion, page-level image placement, and document compilation, reducing manual effort significantly.",
    "Engineered a **Python** web scraper to systematically extract and compile a comprehensive directory of German courts, automating the validation of 100,000 potential postal codes (PLZ) and associated cities (Ort) to aggregate the data into a structured CSV format.",
    "**Built end-to-end features** for a legal case management system used in production by legal teams. Worked extensively across **React** and **TypeScript** frontend and **Rust (axum)** backend to ship client intake, document automation, case tracking, and sales workflows."
]

[[extra.experiences]]
title = "Associate Software Engineer"
company = "Dhiway | Remote, India"
date = "Apr 2023 - Oct 2023"
bullets = [
    "Developed systems components in **Rust**, including custom runtime modules, unit tests, and performance benchmarks for a high-throughput transaction processing system.",
    "Provisioned and managed a globally distributed network of **60+ nodes across AWS EC2 and GCP using **Terraform**, enabling reliable production infrastructure across multiple regions.",
    "Executed a full cloud migration from **AWS** to **GCP**, maintaining infrastructure parity while minimising service disruption."
]

[[extra.experiences]]
title = "Python Developer"
company = "Trustforum | Remote, France"
date = "Jan 2022 - Mar 2023"
bullets = [
    "Designed and implemented backend REST API using **Python** and **FastAPI** to manage core business logic, user authentication, and data synchronization."
]
+++

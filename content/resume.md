+++
title = "Resume | Nrishinghananda Roy"
description = "Professional Experience and Resume of Nrishinghananda Roy"
template = "resume.html"

[extra]
summary = "Platform Engineer with a strong foundation in Rust and Python, specializing in building secure, highly scalable cloud infrastructure and automated developer workflows. Proven expertise in Infrastructure as Code (Terraform), multi-cloud migrations (AWS/GCP), and containerized deployments."

[[extra.skills]]
category = "Infrastructure & Cloud"
items = ["Docker", "AWS", "Terraform"]

[[extra.skills]]
category = "Backend"
items = [ "Rust (axum, tokio)", "Python", "REST API", "gRPC API", "WebSocket", "PostgreSQL"]

[[extra.skills]]
category = "SysAdmin"
items = ["Linux (Debian, Fedora)", "Bash", "Nginx"]

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
title = "Platform Engineer"
company = "Freelance"
date = "Nov 2024 - Present"
bullets = [
    "Architected and deployed containerized infrastructure for independent client applications, designing automated CI/CD pipelines to ensure zero-downtime releases.",
    "Reverse-engineered multi-stage malware, publishing technical research on attack vectors and payload delivery to drive DevSecOps and Operations Security best practices."
]

[[extra.experiences]]
title = "Software Engineer"
company = "Codefy GmbH | Remote, Germany"
date = "Nov 2023 - Oct 2024"
bullets = [
    "Eliminated a critical performance bottleneck by replacing a third-party Java microservice with an in-house Rust service built with **axum (Rust)** and **PostgreSQL**. Analyzed the open-source Java codebase and replicated its behavior in Rust, reducing response times **from 3+ seconds to under 200ms**.",
    "Built document processing pipelines in Rust for automated legal workflows, including PDF editing, image transformation, and DOCX generation from Jinja template. Used **lopdf** and **image** libraries to handle format conversion, page-level image placement, and document compilation, reducing manual effort significantly.",
    "Engineered a **Python** web scraper to systematically extract and compile a comprehensive directory of German courts, automating the validation of 100,000 potential postal codes (PLZ) and associated cities (Ort) to aggregate the data into a structured CSV format."
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
title = "Linux System Administrator"
company = "Trustforum | Remote, France"
date = "Jan 2022 - Mar 2023"
bullets = [
    "Managed and maintained Linux server environments, handling user permissions, package management, and system updates to ensure high availability for an early-stage community platform.",
    "Automated routine maintenance tasks, log rotation, and system backups using Bash shell scripting, reducing manual administrative overhead."
]
+++

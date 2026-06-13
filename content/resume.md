+++
title = "Resume | Nrishinghananda Roy"
description = "Professional Experience and Resume of Nrishinghananda Roy"
template = "resume.html"

[extra]
summary = "Site Reliability Engineer (SRE) specializing in helping startups build scalable, highly reliable, zero-downtime infrastructure. I leverage deep expertise in AWS, Kubernetes, and GitOps to automate deployments and accelerate product delivery."

[[extra.skills]]
category = "Infrastructure"
items = [ "Docker", "Kubernetes", "Helm", "Terraform", "GitHub Actions", "ArgoCD", "Prometheus", "Loki", "Grafana" ]

[[extra.skills]]
category = "AWS"
items = ["IAM", "EC2", "Lambda", "Route53", "VPC", "ECS", "EKS", "S3", "RDS"]

[[extra.skills]]
category = "Languages"
items = [ "Rust", "Python", "Bash" ]

[[extra.skills]]
category = "Systems"
items = ["Linux (Debian, Fedora)", "Systemd", "Nginx"]

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
title = "Site Reliability Engineer (SRE)"
company = "Independent"
date = "Nov 2024 - Present"
bullets = [
    "Reverse-engineered a zero-click supply chain attack targeting cloud infrastructure credentials, utilizing AST manipulation to decrypt XOR-obfuscation and isolate a live C2 exploitation framework; leveraged this threat intelligence to design resilient DevSecOps architectures, actively mitigating systemic data exfiltration risks by enforcing strict network egress controls, ephemeral secrets management, and hardened zero-trust CI/CD pipelines."
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
    "Provisioned and managed a highly available AWS infrastructure of **60+ EC2** utilizing **Terraform**, implementing strict resource tagging and instance right-sizing to reduce monthly cloud compute **expenditure by 28%**.",
    "Engineered a zero-trust secrets management architecture using **HashiCorp Vault**, replacing static AWS credentials with dynamic, TTL-bound IAM roles to actively mitigate unauthorized access risks across the production environment.",
    "Deployed a centralized telemetry and log aggregation pipeline utilizing the **Prometheus, Grafana, and Loki** stack, configuring targeted alerting matrices that reduced Mean Time to Resolution (MTTR) for critical infrastructure **incidents by over 35%**."
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

+++
title = "Resume | Nrishinghananda Roy"
description = "Professional Experience and Resume of Nrishinghananda Roy"
template = "resume.html"

[extra]
summary = "DevOps Engineer specializing in reliable cloud infrastructure and kubernetes. Proven track record of optimizing operations and delivering solutions for startups."

[[extra.skills]]
category = "Infrastructure"
items = [ "Docker", "Kubernetes", "Helm", "Terraform", "ArgoCD", "GitHub Actions", "Linux" ]

[[extra.skills]]
category = "Observability & Security"
items = ["Prometheus", "Grafana", "Trivy"]

[[extra.skills]]
category = "Cloud"
items = [ "AWS (IAM, EC2, Lambda, Route53, VPC, EKS, S3, RDS)"]

[[extra.skills]]
category = "Languages"
items = [ "Bash", "Python", "Rust" ]

[[extra.projects]]
title = "lsmdb: LSM-Tree Key-Value Database"
github_url = "https://github.com/roynrishingha/lsmdb"
crates_url = "http://crates.io/crates/lsmdb"
blog_url = "https://roynrishingha.com/blog/lsmdb/"
description = "Persistent, crash-safe key-value storage engine built on Log-Structured Merge Tree architecture in Rust. Published on crates.io as both a library and CLI binary."

[[extra.experiences]]
title = "DevOps Engineer"
company = "Independent"
date = "Nov 2024 - Present"
bullets = []

[[extra.experiences]]
title = "Software Engineer"
company = "Codefy GmbH | Germany, Remote"
date = "Nov 2023 - Oct 2024"
bullets = [
    "Eliminated a critical performance bottleneck by replacing a third-party Java microservice with an in-house Rust service built with **axum (Rust)** and **PostgreSQL**. Analyzed the open-source Java codebase and replicated its behavior in Rust, reducing response times **from 3+ seconds to under 200ms**.",
    "Built document processing pipelines in Rust for automated legal workflows, including PDF editing, image transformation, and DOCX generation from Jinja template. Used **lopdf** and **image** libraries to handle format conversion, page-level image placement, and document compilation, reducing manual effort significantly.",
    "Engineered a **Python** web scraper to systematically extract and compile a comprehensive directory of German courts, automating the validation of 100,000 potential postal codes (PLZ) and associated cities (Ort) to aggregate the data into a structured CSV format."
]

[[extra.experiences]]
title = "Associate Software Engineer"
company = "Dhiway | India, Remote"
date = "Apr 2023 - Oct 2023"
bullets = [
    "Provisioned and managed a production multi-cloud blockchain infrastructure on **AWS (EC2)** and **GCP (Compute Engine)** utilizing **Terraform** for consistent environment replication.",
    "Configured robust monitoring and telemetry for **60+ distributed blockchain nodes** using **Prometheus**, and **Grafana** to track system performance, network latency."
]

[[extra.experiences]]
title = "System Administrator"
company = "Independent | France, Remote"
date = "Jan 2022 - Mar 2023"
bullets = [
    "Configured and maintained production Linux servers, routine system health checks, log rotation, and data backups using Bash scripts, effectively eliminating manual overhead."
]
+++

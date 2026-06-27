+++
title = "recon"
description = "A fast, concurrent port scanner CLI built in Rust for active network reconnaissance."
weight = 2

[extra]
languages = ["rust"]
image = "/blog_imgs/recon_cover.png"
github_url = "https://github.com/roynrishingha/recon"
keywords = [
  "rust",
  "port scanner",
  "network",
  "reconnaissance",
  "cybersecurity",
  "cli",
  "tool",
  "concurrency"
]
+++

**Recon** is a lightweight, concurrent port scanner built in Rust for active network reconnaissance. It is designed to quickly scan target IP addresses and discover open ports, providing essential visibility for security assessments and infrastructure mapping.

Leveraging Rust's fearless concurrency and low-level network primitives, the tool executes high-speed parallel scans while maintaining a minimal memory footprint. 

This project was originally built to explore network programming and concurrency models in Rust, directly informing how I handle high-throughput network services and socket programming in production environments.

+++
title = "lsmdb"
description = "A persistent, crash-safe key-value storage engine built from scratch in Rust on an LSM-Tree architecture."
weight = 1

[extra]
languages = ["rust"]
image = "/blog_imgs/lsmdb.png"
github_url = "https://github.com/roynrishingha/lsmdb"
keywords = [
  "rust",
  "lsm-tree",
  "storage engine",
  "database",
  "key-value store",
  "infrastructure",
  "memtable"
]
+++

A persistent, crash-safe key-value storage engine built from scratch in Rust on an LSM-Tree architecture. Implements a Write-Ahead Log, Bloom Filters, LRU block cache, and a custom arena-allocated SkipList MemTable. Published on crates.io as a library and CLI binary.

I built this to understand how storage engines fail under pressure. That understanding directly informs how I reason about data tier architecture and I/O latency in production infrastructure.

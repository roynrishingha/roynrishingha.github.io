document.addEventListener("DOMContentLoaded", () => {
    const lsmdbDiagramContainer = document.querySelector("#lsmdb-diagram-container");
    if (lsmdbDiagramContainer) {
        lsmdbDiagramContainer.textContent =
            `
 Write path                          Read path
 ──────────                          ──────────
  put(key, value)                     get(key)
       │                                  │
       ▼                                  ▼
 ┌───────────┐                    ┌───────────────┐
 │    WAL    │ (crash durability) │ Active MemTbl │  1. freshest writes
 └─────┬─────┘                    └───────┬───────┘
       │                                  │ miss
       ▼                                  ▼
 ┌───────────────┐                ┌───────────────┐
 │ Active MemTbl │                │  Immutable    │  2. flushing
 │  (SkipList)   │                │   MemTable    │
 └────────┬──────┘                └───────┬───────┘
  full?   │                               │ miss
          ▼                               ▼
 ┌───────────────┐                ┌───────────────┐
 │  Immutable    │ background     │  Block Cache  │  3. hot blocks
 │   MemTable    │ flush thread   │  (LRU, RAM)   │
 └────────┬──────┘                └───────┬───────┘
          │                               │ miss
          ▼                               ▼
 ┌─────────────────────────────┐  ┌─────────────────────────────┐
 │  SSTable  L0  (newest)      │  │  SSTable  L0 → L1 → L2…    │
 │  SSTable  L1                │  │  Bloom Filter → Index Block  │
 │  SSTable  L2  …             │  │  → Data Block (mmap)         │
 └─────────────────────────────┘  └─────────────────────────────┘
          ▲
     Compaction: size-tiered, multi-level,
     merges SSTables, resolves tombstones, frees disk
`
            ;
    }
});

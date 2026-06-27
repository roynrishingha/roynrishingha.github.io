/**
 * diagram.js — LSMDB architecture diagram text injection
 * Homepage only.
 */

(function () {
  var container = document.querySelector("#lsmdb-diagram-container");
  if (!container) return;

  container.textContent =
    "\n" +
    " Write path                          Read path\n" +
    " ──────────                          ──────────\n" +
    "  put(key, value)                     get(key)\n" +
    "       │                                  │\n" +
    "       ▼                                  ▼\n" +
    " ┌───────────┐                    ┌───────────────┐\n" +
    " │    WAL    │ (crash durability) │ Active MemTbl │  1. freshest writes\n" +
    " └─────┬─────┘                    └───────┬───────┘\n" +
    "       │                                  │ miss\n" +
    "       ▼                                  ▼\n" +
    " ┌───────────────┐                ┌───────────────┐\n" +
    " │ Active MemTbl │                │  Immutable    │  2. flushing\n" +
    " │  (SkipList)   │                │   MemTable    │\n" +
    " └────────┬──────┘                └───────┬───────┘\n" +
    "  full?   │                               │ miss\n" +
    "          ▼                               ▼\n" +
    " ┌───────────────┐                ┌───────────────┐\n" +
    " │  Immutable    │ background     │  Block Cache  │  3. hot blocks\n" +
    " │   MemTable    │ flush thread   │  (LRU, RAM)   │\n" +
    " └────────┬──────┘                └───────┬───────┘\n" +
    "          │                               │ miss\n" +
    "          ▼                               ▼\n" +
    " ┌─────────────────────────────┐  ┌─────────────────────────────┐\n" +
    " │  SSTable  L0  (newest)      │  │  SSTable  L0 → L1 → L2…    │\n" +
    " │  SSTable  L1                │  │  Bloom Filter → Index Block  │\n" +
    " │  SSTable  L2  …             │  │  → Data Block (mmap)         │\n" +
    " └─────────────────────────────┘  └─────────────────────────────┘\n" +
    "          ▲\n" +
    "     Compaction: size-tiered, multi-level,\n" +
    "     merges SSTables, resolves tombstones, frees disk\n";
})();

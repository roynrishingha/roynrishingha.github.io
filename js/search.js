/**
 * search.js — Blog search with lazy-loaded elasticlunr
 * Loaded only on blog.html.
 */

(function () {
  var $searchInput = document.getElementById("search");
  var $searchResults = document.querySelector(".search-results");
  var $searchResultsItems = document.querySelector(".search-results__items");

  if (!$searchInput) return;

  var index = null;

  function loadElasticlunr() {
    return new Promise(function (resolve, reject) {
      if (typeof elasticlunr !== "undefined") {
        resolve();
        return;
      }
      var script = document.createElement("script");
      script.src = "/js/elasticlunr.min.js";
      script.onload = function () {
        resolve();
      };
      script.onerror = function () {
        reject(new Error("Failed to load elasticlunr"));
      };
      document.head.appendChild(script);
    });
  }

  function loadSearchIndex() {
    return new Promise(function (resolve, reject) {
      if (window.searchIndex) {
        resolve();
        return;
      }
      var script = document.createElement("script");
      script.src = "/search_index.en.js";
      script.onload = resolve;
      script.onerror = function () {
        reject(new Error("Failed to load search index script"));
      };
      document.head.appendChild(script);
    });
  }

  function initSearch() {
    if (index !== null) return;

    loadElasticlunr()
      .then(function () {
        return loadSearchIndex();
      })
      .then(function () {
        if (window.searchIndex) {
          try {
            index = elasticlunr.Index.load(window.searchIndex);
          } catch (e) {
            console.warn("Failed to load pre-built index:", e);
          }
        }
      })
      .catch(function (error) {
        console.error("Search index configuration failed:", error);
      });
  }

  $searchInput.addEventListener("focus", initSearch);

  $searchInput.addEventListener("input", function (e) {
    var term = e.target.value.trim();
    if (term === "") {
      $searchResults.style.display = "none";
      return;
    }

    if (index === null) return;

    var results = index.search(term, {
      bool: "OR",
      expand: true,
    });

    if (results.length === 0) {
      $searchResults.style.display = "block";
      $searchResultsItems.innerHTML = "";

      var emptyLi = document.createElement("li");
      emptyLi.className = "search-results__empty";
      emptyLi.textContent = "No results found for \u201C" + term + "\u201D";
      $searchResultsItems.appendChild(emptyLi);
    } else {
      $searchResults.style.display = "block";
      $searchResultsItems.innerHTML = "";

      results.slice(0, 8).forEach(function (result) {
        var doc = index.documentStore.getDoc(result.ref);
        if (!doc) return;

        var li = document.createElement("li");
        li.className = "search-results__item";

        var link = document.createElement("a");
        link.href = result.ref;

        var titleDiv = document.createElement("div");
        titleDiv.className = "search-results__title";
        titleDiv.textContent = doc.title || "Untitled";

        var previewDiv = document.createElement("div");
        previewDiv.className = "search-results__preview";
        previewDiv.textContent = (doc.body || "").substring(0, 120) + "\u2026";

        link.appendChild(titleDiv);
        link.appendChild(previewDiv);
        li.appendChild(link);
        $searchResultsItems.appendChild(li);
      });
    }
  });

  document.addEventListener("click", function (event) {
    if (
      !$searchInput.contains(event.target) &&
      !$searchResults.contains(event.target)
    ) {
      $searchResults.style.display = "none";
    }
  });
})();

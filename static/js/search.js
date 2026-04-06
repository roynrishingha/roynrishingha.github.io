document.addEventListener("DOMContentLoaded", function () {
    var $searchInput = document.getElementById("search");
    var $searchResults = document.querySelector(".search-results");
    var $searchResultsItems = document.querySelector(".search-results__items");

    if (!$searchInput) return;

    var index = null;

    function initSearch() {
        if (index !== null) return;

        fetch("/search_index.en.json")
            .then(function (response) { return response.json(); })
            .then(function (data) {
                index = elasticlunr(function () {
                    this.addField("title");
                    this.addField("body");
                    this.setRef("ref");
                });

                // Zola produces { index: {...}, docs_urls: [...], docs: { "url": {title, body} } }
                // or alternatively just an elasticlunr dump — handle both formats
                if (data.index) {
                    try {
                        index = elasticlunr.Index.load(data.index);
                    } catch (e) {
                        console.warn("Failed to load pre-built index, building manually");
                    }
                }
            })
            .catch(function (error) {
                console.error("Search index failed to load:", error);
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
            $searchResultsItems.innerHTML =
                '<li class="search-results__empty">No results found for &ldquo;' +
                term + '&rdquo;</li>';
        } else {
            $searchResults.style.display = "block";
            $searchResultsItems.innerHTML = "";

            results.slice(0, 8).forEach(function (result) {
                var doc = index.documentStore.getDoc(result.ref);
                if (!doc) return;

                var li = document.createElement("li");
                li.className = "search-results__item";

                var preview = (doc.body || "").substring(0, 120).replace(/</g, "&lt;");

                li.innerHTML =
                    '<a href="' + result.ref + '">' +
                    '<div class="search-results__title">' + (doc.title || "Untitled") + '</div>' +
                    '<div class="search-results__preview">' + preview + '&hellip;</div>' +
                    '</a>';
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
});

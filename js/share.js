/**
 * share.js - Native Web Share and Clipboard fallback
 */

document.addEventListener("DOMContentLoaded", () => {
    const shareButtons = document.querySelectorAll(".share-button");

    shareButtons.forEach(button => {
        button.addEventListener("click", async (e) => {
            e.preventDefault();
            e.stopPropagation(); // prevent navigation if inside an <a> tag

            const title = button.getAttribute("data-title");
            const url = button.getAttribute("data-url");

            // Define share data
            const shareData = {
                title: title,
                url: url
            };

            // Attempt Native Web Share
            if (navigator.share) {
                try {
                    await navigator.share(shareData);
                } catch (err) {
                    if (err.name !== 'AbortError') {
                        console.error('Error sharing:', err);
                        fallbackShare(url, button);
                    }
                }
            } else {
                // Fallback to Clipboard
                fallbackShare(url, button);
            }
        });
    });

    function fallbackShare(url, button) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(url).then(() => {
                showToast(button);
            }).catch(err => {
                console.error('Could not copy link: ', err);
            });
        } else {
            // Very old browser path
            const dummy = document.createElement('input');
            document.body.appendChild(dummy);
            dummy.value = url;
            dummy.select();
            document.execCommand('copy');
            document.body.removeChild(dummy);
            showToast(button);
        }
    }

    function showToast(button) {
        const existingToast = button.querySelector('.share-toast');
        if (existingToast) return;

        const toast = document.createElement("span");
        toast.className = "share-toast";
        toast.textContent = "Link copied!";
        
        button.appendChild(toast);
        button.classList.add('shared');

        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
            button.classList.remove('shared');
        }, 2000);
    }
});

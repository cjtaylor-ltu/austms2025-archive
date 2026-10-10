document.querySelectorAll(".nav-dropdown-button").forEach((button) => {
    button.addEventListener("click", () => {
        const dropdown = button.closest(".nav-dropdown");
        const menu = dropdown.querySelector(".nav-dropdown-menu");

        if (getComputedStyle(menu).display !== "none") {
            return;
        }

        dropdown.classList.add("open");
        button.setAttribute("aria-expanded", "true");
    });
});

document.addEventListener("click", (event) => {
    document.querySelectorAll(".nav-dropdown.open").forEach((dropdown) => {
        if (!dropdown.contains(event.target)) {
            dropdown.classList.remove("open");

            const button = dropdown.querySelector(".nav-dropdown-button");
            button.setAttribute("aria-expanded", "false");
        }
    });
});

document.querySelectorAll("dialog").forEach((dialog) => {
	dialog.tabIndex = -1;
    dialog.addEventListener("click", (event) => {
        if (event.target === dialog) {
            dialog.close();
        }
    });
});

document.querySelectorAll("[data-dialog-open]").forEach((button) => {
    button.addEventListener("click", () => {
        const dialogId = button.dataset.dialogOpen;
        const dialog = document.getElementById(dialogId);

        dialog.showModal();
		dialog.focus();
    });
});

document.querySelectorAll("[data-dialog-close]").forEach((button) => {
    button.addEventListener("click", () => {
        button.closest("dialog").close();
    });
});


document.querySelectorAll(".scam-warning").forEach((warning) => {
    const id = warning.dataset.warningId;
    const closeButton = warning.querySelector("[data-warning-close]");

    if (sessionStorage.getItem(`warning-${id}-dismissed`)) {
        warning.remove();
        return;
    }

    closeButton?.addEventListener("click", () => {
        sessionStorage.setItem(`warning-${id}-dismissed`, "true");
        warning.remove();
    });
});

document.querySelectorAll(".accordion").forEach((accordion) => {
    const triggers = accordion.querySelectorAll("[data-accordion-trigger]");
    const panels = accordion.querySelectorAll("[data-accordion-panel]");

    triggers.forEach((trigger) => {
        trigger.addEventListener("click", () => {
            const target = trigger.dataset.accordionTrigger;
            const targetPanel = accordion.querySelector(
                `[data-accordion-panel="${target}"]`
            );
            const alreadyOpen = targetPanel.classList.contains("open");

            panels.forEach((panel) => {
                panel.classList.remove("open");
            });

            triggers.forEach((other) => {
                other.classList.remove("active");
				other.setAttribute("aria-expanded", "false");
            });

            if (!alreadyOpen) {
                targetPanel.classList.add("open");
                trigger.classList.add("active");
				trigger.setAttribute("aria-expanded", "true");
            }
        });
    });
});

const artDialog = document.getElementById("art-dialog");

if (artDialog) {
    const artDialogBody = artDialog.querySelector(".art-dialog-body");

    document.querySelectorAll(".art-image-open").forEach(button => {
        button.addEventListener("click", () => {
            const clone = button.closest(".art-box").cloneNode(true);

            const clonedButton = clone.querySelector(".art-image-open");
            clonedButton.replaceWith(...clonedButton.childNodes);

            artDialogBody.replaceChildren(clone);
            artDialog.showModal();
			artDialog.focus();
			artDialog.scrollTop = 0;
        });
    });

    artDialog.querySelector(".overlay-close").addEventListener("click", () => {
        artDialog.close();
    });
}

document.querySelectorAll(".photo-carousel").forEach(carousel => {
    carousel.splide = new Splide(carousel, {
        perPage: 3,
        perMove: 3,
        gap: "1rem",
        pagination: true,
        arrows: true,
        rewind: true,
    });

    carousel.splide.mount();
});

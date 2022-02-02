/** Generates the navbar */
function genNav() {
	const nav = document.querySelector("#navbar");
	if (!nav) return;

	const current = location.pathname.split("/").pop().replace(".html", "");
	const pages = ["home", "features", "updates", "download", "credits"];

	pages.forEach(page => {
		const link = document.createElement("a");
		link.href = `${page}.html`;
		link.innerText = page;
		link.className = page === current ? "selected" : "";

		nav.appendChild(link)
	})
}



function splitImages() {
	const splits = document.querySelectorAll(".img-split");
	if (!splits) return;

	splits.forEach(split => {
		split.addEventListener("click", () => {
			if (split.classList.contains("active")) {
				split.classList.remove("active");
				split.classList.add("inactive");
			} else if (split.classList.contains("inactive")) {
				split.classList.remove("inactive");
				split.classList.add("active");
			} else {
				split.classList.add("active");
			}
		})
	})
}
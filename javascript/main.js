/** Generates the navbar */
(function() {
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
})();

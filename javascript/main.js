/**
 * Generates the navbar based on the current page.
 */
function genNav() {
	const nav = document.querySelector("#navbar");
	if (!nav) return;

	const current = location.pathname.split("/").pop().replace(".html", "");
	const pages = ["index", "features", "updates", "download", "credits"];

	pages.forEach(page => {
		const link = document.createElement("a");
		link.href = `${page}.html`;
		link.innerText = page;
		link.className = page === current ? "selected" : "";

		nav.appendChild(link)
	})
}


/**
 * Sets the listener to all the splitted images.
 */
function setSplitImages() {
	const splits = document.querySelectorAll(".img-split");

	splits.forEach(split => {
		split.addEventListener("click", () => {
			if (split.classList.contains("active")) {
				split.classList.remove("active");
				split.classList.add("inactive");
			} else if (split.classList.contains("inactive")) {
				split.classList.remove("inactive");
				split.classList.add("active");
			} else
				split.classList.add("active");
		})
	})
}


/**
 * Applies the source to all video tags based on their src attribute. It
 * also adds certain attributes specified.
 * Basically, "<video src='...'>" becomes "<video autoplay muted loop><source src='...'></video>"
 * @param {string[]} attrs - The list of attributes to apply to the each video
 */
function setVideos(attrs = ["autoplay", "loop", "muted"]) {
	const videos = document.querySelectorAll("video");

	videos.forEach(video => {
		attrs.forEach(attr => video.setAttribute(attr, "true"));
		const source = document.createElement("source");
		source.src = video.src;
		video.appendChild(source);
		video.removeAttribute("src");

		// we apply this to the parent because the text in the cell can take a lot of space
		video.parentElement.addEventListener("mouseover", () => video.play());
		video.parentElement.addEventListener("mouseout", () => video.pause());
	})
}


/**
 * Sets the listeners to all the patch notes.
 */
function addPatches() {
	const patches = Array.from(document.querySelectorAll(".patch"));

	// The first patch note will be be active by default
	patches[0].classList.toggle("active");

	patches.forEach(patch => {
		patch.querySelector("h1").addEventListener("click", () => {
			patches.forEach(p => {
				if (p === patch)
					p.classList.toggle("active");
				else
					p.classList.remove("active");
			})
		})

		// Use spaces instead of tabs for the notes
		const pre = patch.querySelector("pre");
		pre.innerHTML = pre.innerHTML.replaceAll("\t", "   ");
	})
}
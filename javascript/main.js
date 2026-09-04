/**
 * Generates the navbar based on the current page.
 */
function genNav() {
	const nav = document.querySelector("#navbar");
	if (!nav) return;

	const current = location.pathname.split("/").pop().replace(".html", "");
	const pages = ["index", "features", "updates", "download", "credits", "tools"];

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
function addPatches(show_first) {
	const patches = Array.from(document.querySelectorAll(".patch:not(.changelog)"));

	if (show_first)
	{
		// The first patch note will be be active by default
		patches[0].classList.toggle("active");
	}

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

/**
 * Sets up the Tools++ stuff
 */
function setupToolsPlusPlus() {
	const section = document.querySelector(".toolspp");
	if (!section) return;

	// use spaces instead of tabs
	section.querySelectorAll(".slide pre, .toolspp-install pre").forEach(pre => {
		pre.innerHTML = pre.innerHTML.replaceAll("\t", "   ");
	})

	// changelogs
	const changelogs = Array.from(section.querySelectorAll(".patch.changelog"));
	let changelogOpen = false;

	changelogs.forEach(changelog => {
		changelog.querySelector("h1").addEventListener("click", () => {
			changelogOpen = !changelogOpen;
			changelogs.forEach(c => c.classList.toggle("active", changelogOpen));
		})
	})

	// one gallery per tool
	section.querySelectorAll(".gallery").forEach(gallery => setupGallery(gallery));

	// carosel
	const tabs = Array.from(section.querySelectorAll(".carousel-tab"));
	const slides = Array.from(section.querySelectorAll(".slide"));
	let index = 0;

	const select = i => {
		index = (i + slides.length) % slides.length;
		tabs.forEach((t, n) => t.classList.toggle("selected", n === index));
		slides.forEach((s, n) => s.classList.toggle("selected", n === index));
	};

	tabs.forEach((tab, i) => tab.addEventListener("click", () => select(i)));
	section.querySelectorAll(".carousel-arrow").forEach(arrow => {
		arrow.addEventListener("click", () => select(index + Number(arrow.dataset.dir)));
	})

	// show this by default
	select(Math.max(0, tabs.findIndex(t => t.dataset.tool === "VRAD++")));
}


/**
 * Cycles the images of a single gallery on a timer
 */
function setupGallery(gallery, interval = 5000) {
	const images = Array.from(gallery.querySelectorAll(".gallery-image"));
	if (images.length < 2) return;

	const dots = Array.from(gallery.querySelectorAll(".gallery-dot"));
	let index = 0;
	let timer = null;

	const select = i => {
		index = (i + images.length) % images.length;
		images.forEach((img, n) => img.classList.toggle("selected", n === index));
		dots.forEach((dot, n) => dot.classList.toggle("selected", n === index));
	};

	const restart = () => {
		clearInterval(timer);
		timer = setInterval(() => select(index + 1), interval);
	};

	const goto = i => {
		select(i);
		restart();
	};

	gallery.querySelectorAll(".gallery-arrow").forEach(arrow => {
		arrow.addEventListener("click", () => goto(index + Number(arrow.dataset.dir)));
	})
	dots.forEach((dot, i) => dot.addEventListener("click", () => goto(i)));

	// don't slide while hovered
	gallery.addEventListener("mouseenter", () => clearInterval(timer));
	gallery.addEventListener("mouseleave", restart);

	restart();
}

function setupOtherTools() {
	const section = document.querySelector(".other-tools");
	if (!section) return;

	// colapse by default
	section.querySelector(".other-tools-toggle").addEventListener("click", () => {
		section.classList.toggle("active");
	})
}

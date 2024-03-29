let comments;
let lockedVisible = false;
let ignoreNextCommentsVisibilityChange = true;

setInterval(() => {
	const conflicts = document.querySelectorAll(".docs-gm-sidebars .docos-streamdocoview .docos-action-text.docos-body-action-text");
	for (const conflict of conflicts) {
		const conflictAuthor = conflict.closest(".docos-streamdocoview").querySelector(".docos-docoview-rootreply .docos-author").textContent;
		const conflictResolver = conflict.parentElement.querySelector(".docos-author").textContent;
		if (conflictResolver === conflictAuthor) {
			conflict.closest(".docos-streamdocoview").classList.add("resolved-by-self");
		}

		const match = conflict.textContent.match(/Suggestion (accepted|rejected)|Marked as resolved/);
		if (match) {
			conflict.closest(".docos-streamreplyview").classList.add("resolution-message");
			conflict.closest(".docos-streamdocoview").classList.add("really-truly-resolved", match[1]);
		}
	}

	// custom keyboard shortcuts
	const editingIFrame = document.querySelector("iframe.docs-texteventtarget-iframe");
	if (editingIFrame) {
		editingIFrame.contentDocument.addEventListener("keydown", onKeydown, false);
	}

	// on opening comments
	const commentsButton = document.getElementById("docs-docos-commentsbutton");
	const commentsButtonWrapper = commentsButton && commentsButton.parentElement;
	if (!commentsButtonWrapper.classList.contains("added-event-listener")) {
		commentsButtonWrapper.classList.add("added-event-listener");
		commentsButtonWrapper.addEventListener("click", () => {
			if (!lockedVisible) return;
			lockedVisible = false;
			ignoreNextCommentsVisibilityChange = true;
			comments.classList.remove("locked-visible");
			commentsButtonWrapper.classList.remove("locked-visible");
			simulateEvent(commentsButton, "mousedown");
			commentsButton.classList.remove("jfk-button-hover");
			recenterDocument();
		});
	}
	comments = document.querySelector(".docs-docos-activitybox");
}, 500);

let lastCommentsVisibility;
setInterval(() => {
	if (!comments) return;
	if (!lockedVisible && comments.style.visibility !== lastCommentsVisibility) {
		lastCommentsVisibility = comments.style.visibility;
		if (ignoreNextCommentsVisibilityChange) {
			ignoreNextCommentsVisibilityChange = false;
			return;
		}

		// opening comments
		lockedVisible = true;
		comments.classList.add("locked-visible");
		const commentsButton = document.getElementById("docs-docos-commentsbutton");
		const commentsButtonWrapper = commentsButton && commentsButton.parentElement;
		commentsButtonWrapper.classList.add("locked-visible");

		recenterDocument();
	}
}, 0);

function recenterDocument() {
	for (const element of document.querySelectorAll("#docs-editor, #docs-chrome")) {
		const commentsWidth = lockedVisible ? comments.clientWidth : 0;
		element.style.setProperty("--real-width", `calc(100vw - ${commentsWidth}px)`);
	}
	// const doc = document.querySelector(".kix-zoomdocumentplugin-outer"); 
	// const comment = document.querySelector(".kix-appview-editor .docos-docoview-tesla-conflict");;
	// const commentWidth = comment ? comment.clientWidth : 0;
	// const docX = document.getElementById("docs-editor").clientWidth / 2 - (doc.clientWidth + commentWidth) / 2;
	// doc.style.left = docX + "px"; 
	// document.querySelector(".kix-discussion-plugin").style.left = docX + doc.clientWidth + "px";
	const appSwitcherButton = document.querySelector(".companion-collapser-button-container .app-switcher-button");
	simulateClick(appSwitcherButton);
	simulateClick(appSwitcherButton);
	simulateEvent(appSwitcherButton, "blur");
	appSwitcherButton.classList.remove("app-switcher-button-hover");
}

window.addEventListener("resize", recenterDocument);





// Event handler for keydowns

function onKeydown(event) {
}



// utilities

async function sleep(ms = 0) {
	return new Promise(resolve => setTimeout(resolve, ms));
}


// Event simulation utilities

function simulateClick(element) {
	simulateEvent(element, "mousedown");
	simulateEvent(element, "mouseup");
	simulateEvent(element, "mouseup");
}

function simulateEvent(element, eventName) {
	var options = extend(defaultOptions, arguments[2] || {});
	var oEvent, eventType = null;

	for (var name in eventMatchers) {
		if (eventMatchers[name].test(eventName)) { eventType = name; break; }
	}

	if (!eventType)
		throw new SyntaxError('Only HTMLEvents and MouseEvents interfaces are supported');

	if (document.createEvent) {
		oEvent = document.createEvent(eventType);
		if (eventType == 'HTMLEvents') {
			oEvent.initEvent(eventName, options.bubbles, options.cancelable);
		}
		else {
			oEvent.initMouseEvent(eventName, options.bubbles, options.cancelable, document.defaultView,
				options.button, options.pointerX, options.pointerY, options.pointerX, options.pointerY,
				options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.button, element);
		}
		element.dispatchEvent(oEvent);
	}
	else {
		options.clientX = options.pointerX;
		options.clientY = options.pointerY;
		var evt = document.createEventObject();
		oEvent = extend(evt, options);
		element.fireEvent('on' + eventName, oEvent);
	}
	return element;
}

function extend(destination, source) {
	for (var property in source)
		destination[property] = source[property];
	return destination;
}

var eventMatchers = {
	'HTMLEvents': /^(?:load|unload|abort|error|select|change|submit|reset|focus|blur|resize|scroll)$/,
	'MouseEvents': /^(?:click|dblclick|mouse(?:down|up|over|move|out))$/
}
var defaultOptions = {
	pointerX: 0,
	pointerY: 0,
	button: 0,
	ctrlKey: false,
	altKey: false,
	shiftKey: false,
	metaKey: false,
	bubbles: true,
	cancelable: true
}

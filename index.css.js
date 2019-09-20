const style = document.createElement("style");
style.id = "docs-comments-drawer-styles";
style.textContent = `.docos-streampane-header {
    display: none;
}

.docs-titlebar-buttons .docs-docos-activitybox {
    height: 100vh !important;
    width: 680px;
    max-width: 35vw;
    position: fixed;
    top: 0;
    right: 0;
    border-top: none;
    border-bottom: none;
}

.docos-enable-docs-header .docos-stream-view {
    max-height: none;
    height: 100%;
    position: relative;
}

.docos-streampane-content {
    max-height: 100%;
    position: absolute;
    width: 100%;
    height: 100%;
}

.docs-docos-activitybox-inner {
    position: relative;
}

.docs-gm-sidebars .docos-streamdocoview-inputcontainer {
    padding: 0;
    /*transition: margin .3s ease-in-out .4s, opacity .1s ease-in-out .7s;*/
    transition: margin 0s ease-in-out .4s, opacity .1s ease-in-out .45s;
}

.docs-gm-sidebars .docos-streamdocoview-input-pane .docos-input-textarea {
    border: none !important;
    margin-left: 10px;
    width: calc(100% - 10px);
    padding: 7px 8px !important;
}

.docs-gm-sidebars .docos-streamdocoview-inputcontainer .docos-streamreplyview-avatar {
    top: 5px;
}

.docs-gm-sidebars .docos-streamdocoview-inputcontainer:focus-within {
    border-color: #1a73e8;
    box-shadow: 0 0 0 1px #1a73e8;
}

.docs-gm-sidebars .docos-input-buttons {
    padding-bottom: 10px;
}

.docos-input.docos-docoview-input-pane.docos-streamdocoview-input-pane:not(.docos-input-typing) {
    height: 43px;
}

.docos-input.docos-docoview-input-pane.docos-streamdocoview-input-pane:not(.docos-input-typing) .docos-input-textarea {
    height: 43px;
    padding-top: 12px !important;
}

.docs-gm-sidebars .resolution-message {
    display: none;
}

.docs-gm-sidebars .docos-streamdocoview.really-truly-resolved {
    background-color: #f6f6f6;
}

.docs-gm-sidebars .docos-streamdocoview.really-truly-resolved.accepted {
    background-color: #eef7ee;
    border-color: #b7d3b7;
}

.docs-gm-sidebars .docos-streamdocoview.really-truly-resolved.rejected {
    background-color: #f7eeee;
    border-color: #d3b7b7;
}

.docs-gm-sidebars .docos-streamdocoview:not(:hover):not(:focus-within) .docos-streamdocoview-inputcontainer {
    margin-top: -60px;
    opacity: 0;
    transition: margin 0s ease-in-out .1s, opacity .1s ease-in-out 0s;
}

.docs-gm-sidebars .docos-streamdocoview.resolved-by-self {
	display: none !important;
}


.goog-inline-block.locked-visible > #docs-docos-commentsbutton {
    pointer-events: none;
}

.docs-docos-activitybox.locked-visible {
	visibility: visible !important;
	display: block !important;
}

#docs-editor, #docs-chrome {
	width: var(--real-width, 100vw) !important;
}
`;

let interval = setInterval(() => {
    if (!document.body) return;

    document.head.appendChild(style);

    clearInterval(interval);

    setInterval(refresh, 100);
});

function refresh() {
    if (style.parentElement.lastElementChild !== style) {
        style.parentElement.appendChild(style);
    }
}

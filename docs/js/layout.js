async function applyLayout() {
    try {
        const resp = await fetch('master.html');
        if (!resp.ok) throw new Error(`Fetch failed: ${resp.status}`);
        const html = await resp.text();

        // Parse the fetched HTML into a Document
        const doc = new DOMParser().parseFromString(html, 'text/html');

        // Find the <template id="layout"> inside that fetched document
        const layoutTemplate = doc.querySelector('template#layout');
        if (!layoutTemplate) {
            console.error('No <template id="layout"> found in master.html');
            return;
        }

        // Find the slot inside the template where page content should go
        const contentSlot = layoutTemplate.content.querySelector('#content');
        if (!contentSlot) {
            console.error('No element with id="content" inside the template.');
            return;
        }

        // Find page's content block and clone it (so we don't remove it from the page)
        const pageContent = document.querySelector('[data-include-content]');
        if (!pageContent) {
            console.error('No element with [data-include-content] found in page.');
            return;
        }
        const pageContentClone = pageContent.cloneNode(true);

        // Insert cloned page content into template slot
        contentSlot.appendChild(pageContentClone);

        // Remove the original page content from the document
        pageContent.remove();

        // Append the template's content to the current document body
        document.body.appendChild(layoutTemplate.content.cloneNode(true));

    } catch (err) {
        console.error('Error applying layout:', err);
    }
}

applyLayout();
// Function to load the content of a specific page
function loadPage(page) {
    fetch(page)
        .then(response => response.text())
        .then(data => {
            // Parse the fetched HTML content into a DOM object
            let pageContent = new DOMParser().parseFromString(data, 'text/html');
            
            // Extract the body content and inject it into the SPA container
            let pageBody = pageContent.querySelector('body');
            document.getElementById('page-content').innerHTML = pageBody.innerHTML;

            // Copy meta tags and append them to the SPA's head
            let metaTags = pageContent.querySelectorAll('meta');
            metaTags.forEach(meta => {
                document.head.appendChild(meta.cloneNode(true));
            });

            // Load external JS and CSS resources from the fetched page
            loadExternalResources(pageContent);
        })
        .catch(error => {
            console.error('Error loading page:', error);
        });
}

// Function to dynamically load external JS and CSS files (if required)
function loadExternalResources(pageContent) {
    // Load external JS files
    const externalJS = pageContent.querySelectorAll('script[src]');
    externalJS.forEach(script => {
        const newScript = document.createElement('script');
        newScript.src = script.src;
        newScript.onload = () => console.log(`${script.src} loaded successfully.`);
        newScript.onerror = (error) => console.error(`Error loading script: ${script.src}`, error);
        document.body.appendChild(newScript);
    });

    // Load external CSS files
    const externalCSS = pageContent.querySelectorAll('link[rel="stylesheet"]');
    externalCSS.forEach(link => {
        const newLink = document.createElement('link');
        newLink.rel = 'stylesheet';
        newLink.href = link.href;
        newLink.onload = () => console.log(`${link.href} loaded successfully.`);
        newLink.onerror = (error) => console.error(`Error loading CSS: ${link.href}`, error);
        document.head.appendChild(newLink);
    });
}

// Load the initial page on startup (can be a default page)
loadPage('/Glo-SPA/page1.html');

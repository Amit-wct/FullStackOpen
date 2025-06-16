sequenceDiagram
participant browser
participant server

    browser->>server: GET /exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET /exampleapp/main.css
    activate server
    server-->>browser: CSS file
    deactivate server

    browser->>server: GET /exampleapp/main.js
    activate server
    server-->>browser: JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches JSON from the server

    browser->>server: GET /exampleapp/data.json
    activate server
    server-->>browser: JSON data (e.g. [{ "content": "HTML is easy", "date": "2023-1-1" }, ...])
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes

<?php
// Use URL rewriting so that all requests go through index.php
$request = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

$routes = array(
    '/' => 'views/home.php',
    '/about'    => 'views/about.php',
    '/feedback' => 'views/feedback.php',
    '/privacy'  => 'views/privacy.php',
);

function handleRequest($request)
{
    global $routes;
    if (array_key_exists($request, $routes)) {
        include $routes[$request];
    } else {
        http_response_code(404);
        echo "404 Not Found";
    }
}

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Text Comparison Tool</title>
    <link rel="stylesheet" href="style.css">
    <style>
        footer {
            padding-bottom: 2rem;
        }
        footer nav ul {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        footer nav ul li {
            margin: 0 15px;
        }
    </style>
</head>

<body>
    <div class="loader" id="loader">
        <div class="spinner"></div>
    </div>
    <header>
        <h1><a href='/'>Text Comparison Tool</a></h1>
        <div class="controls">
            <button id="compareBtn" class="btn primary">Compare</button>
            <button id="toggleResultBtn" class="btn secondary">Show/Hide Result</button>
        </div>
    </header>
    <?php handleRequest($request); ?>
    <footer>
        <nav>
            <ul>
                <li><a href="/about">About</a></li>
                <li><a href="/feedback">Feedback</a></li>
                <li><a href="/privacy">Privacy</a></li>
            </ul>
        </nav>
    </footer>
</body>

</html>
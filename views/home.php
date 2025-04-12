<div class="container" style="padding-bottom: 0;">
    <!-- <div d style="height: 80px;"></div> -->

    <div id="notification"></div>

    <div class="comparison-result">
        <div class="result-container">
            <div class="result-column">
                <h3>Text 1</h3>
                <div class="result-lines" id="result1"></div>
            </div>
            <div class="result-column">
                <h3>Text 2</h3>
                <div class="result-lines" id="result2"></div>
            </div>
        </div>
    </div>


    <div class="editors-header">
        <div class="dropdown">
            <button class="dropbtn">Edit texts</button>
            <div class="dropdown-content">
                <button onclick="toLowerCase()">To lowercase</button>
                <button onclick="sortLines()">Sort lines</button>
                <button onclick="replaceLineBreaks()">Replace line breaks with spaces</button>
                <button onclick="removeExcessWhitespace()">Remove excess white space</button>
            </div>
        </div>
        <button id="clearAllBtn" class="btn-clean-all">Clear All</button>
    </div>
    <div class="editors-container">
        <?php for ($i = 1; $i < 3; $i++): ?>
            <div class="editor-wrapper" data-index="<?= $i ?>">
                <div class="editor-header">
                    <span class="editor-title">Text <?= $i ?></span>
                    <div class="editor-actions">
                        <button class="btn-icon clear-text" onclick="clearText(this)" title="Clear text">✕</button>
                    </div>
                </div>
                <div class="editor-content">
                    <div class="editor">
                        <textarea class="text-editor" placeholder="Enter or drop text here..."></textarea>
                    </div>
                </div>
            </div>
        <?php endfor ?>
    </div>
</div>
<script src="script.js"></script>
const compareBtn = document.getElementById("compareBtn");
const loader = document.getElementById("loader");
const textareas = document.querySelectorAll(".text-editor");
const result1 = document.getElementById("result1");
const result2 = document.getElementById("result2");

document.addEventListener("click", function () {
  updateNotification("");
});

compareBtn.addEventListener("click", async function () {
  loader.classList.add("active");
  try {
    const text1 = textareas[0].value;
    const text2 = textareas[1].value;
    if (text1 == "" || text2 == "") {
      setTimeout(() => {
        updateNotification("No text to compare makes my life easy!");
      }, 0);
    } else {
      await displayComparisonResult(text1, text2);
      document.querySelector(".comparison-result").style.display = "block";
    }
  } catch (e) {
    console.log(e);
  }
  loader.classList.remove("active");
});

async function displayComparisonResult(text1, text2) {
  result1.innerHTML = ""; // Clear previous results
  result2.innerHTML = ""; // Clear previous results

  let lines1 = text1.split("\n");
  let lines2 = text2.split("\n");
  let maxLines = Math.max(lines1.length, lines2.length);

  for (let i = 0; i < maxLines; i++) {
    let line1 = lines1[i] || "";
    let line2 = lines2[i] || "";

    // Hiển thị kết quả cho Text 1
    const lineElement1 = createLineElement(i + 1, line1, line2);
    result1.appendChild(lineElement1);

    // Hiển thị kết quả cho Text 2
    const lineElement2 = createLineElement(i + 1, line2, line1);
    result2.appendChild(lineElement2);
  }
}

function createLineElement(lineNumber, line, otherLine) {
  const lineElement = document.createElement("div");
  lineElement.classList.add("line");

  // Add line number
  const lineNumberElement = document.createElement("div");
  lineNumberElement.classList.add("line-number");
  lineNumberElement.textContent = lineNumber;

  // Check if this line has a diff
  if (line !== otherLine) {
    lineNumberElement.classList.add("diff");
  }

  lineElement.appendChild(lineNumberElement);

  // Add line content
  const lineContentElement = document.createElement("div");
  lineContentElement.classList.add("line-content");

  for (let i = 0; i < Math.max(line.length, otherLine.length); i++) {
    const char1 = line[i] || "";
    const char2 = otherLine[i] || "";

    const span = document.createElement("span");
    span.textContent = char1;

    if (char1 !== char2) {
      span.classList.add("diff");
    }

    lineContentElement.appendChild(span);
  }

  lineElement.appendChild(lineContentElement);
  return lineElement;
}

// textareas.forEach((textarea) => {
//   textarea.addEventListener("paste", function (event) {
//     event.preventDefault();
//     let text = (event.clipboardData || window.clipboardData).getData("text");
//     textarea.value += text;
//   });
// });

const clearAllTextarea = document.getElementById("clearAllBtn");
clearAllTextarea.addEventListener("click", function () {
  document.querySelectorAll(".text-editor").forEach((item) => {
    item.value = "";
  });
});
window.clearText = function (btn) {
  let editorWrapper = btn.closest(".editor-wrapper");
  if (!editorWrapper) return;

  let textarea = editorWrapper.querySelector(".text-editor");
  if (!textarea) return;

  textarea.value = "";
};

const toggleResultBtn = document.getElementById("toggleResultBtn");
const comparisonResult = document.querySelector(".comparison-result");

// Ẩn kết quả khi mới load trang
comparisonResult.style.display = "none";

toggleResultBtn.addEventListener("click", function () {
  if (comparisonResult.style.display === "none") {
    comparisonResult.style.display = "block";
    toggleResultBtn.textContent = "Hide Result";
  } else {
    comparisonResult.style.display = "none";
    toggleResultBtn.textContent = "Show Result";
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const dropdown = document.querySelector(".dropdown");
  const dropbtn = document.querySelector(".dropbtn");

  // Toggle dropdown khi click vào nút
  dropbtn.addEventListener("mouseover", function (event) {
    event.stopPropagation();
    dropdown.classList.toggle("active");
  });

  // Đóng dropdown khi click ra ngoài
  document.addEventListener("mouseout", function (event) {
    if (!dropdown.contains(event.target)) {
      dropdown.classList.remove("active");
    }
  });
});

async function updateNotification(message) {
  let notification = document.getElementById("notification");
  notification.textContent = message;
  notification.style.display = message ? "block" : "none";
}

function closeEditText() {
  document.querySelector(".dropdown").classList.remove("active");
}

function toLowerCase() {
  document.querySelectorAll(".text-editor").forEach((textarea) => {
    textarea.value = textarea.value.toLowerCase();
  });
  closeEditText();
}

function sortLines() {
  document.querySelectorAll(".text-editor").forEach((textarea) => {
    let lines = textarea.value.split("\n").sort();
    textarea.value = lines.join("\n");
  });
  closeEditText();
}

function replaceLineBreaks() {
  document.querySelectorAll(".text-editor").forEach((textarea) => {
    textarea.value = textarea.value.replace(/\n/g, " ");
  });
  closeEditText();
}

function removeExcessWhitespace() {
  document.querySelectorAll(".text-editor").forEach((textarea) => {
    textarea.value = textarea.value.replace(/\s+/g, " ").trim();
  });
  closeEditText();
}

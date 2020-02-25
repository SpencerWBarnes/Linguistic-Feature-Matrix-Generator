// These functions are courtesy of this Stack Overflow: 
//  https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript

// A lesser supported but less finicky way of copying
function fallbackCopyTextToClipboard(text) {
  // Create a dummy area
  var textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position="fixed";  //avoid scrolling to bottom
  document.body.appendChild(textArea);

  // Make the user "highlight" the text
  textArea.focus();
  textArea.select();

  // Force the user to copy the highlighted text 
  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Fallback: Copying text command was ' + msg);
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }

  // Remove dummy item
  document.body.removeChild(textArea);
}

// A better smoother well supported way of copying, requires https
function copyTextToClipboard(text) {
  // If I cannot copy the test
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }

  // Copy the text
  navigator.clipboard.writeText(text).then(function() {
    console.log('Async: Copying to clipboard was successful!');
  }, function(err) {
    console.error('Async: Could not copy text: ', err);
  });
}

function getWordCompatibleEquation()
{
  let equationFrame = document.getElementById("equation-Frame");
  if (equationFrame == null)
  {
    return;
  }

  // Necessary to tell Word how to interpret data, ref: https://tex.stackexchange.com/questions/25223/embed-latex-math-equations-into-microsoft-word 
  let wordCompatibleEquation = "<?xml version=\"1.0\"?>";
  wordCompatibleEquation += equationFrame.getAttribute("data-mathml");

  // Render braces as key word
  wordCompatibleEquation = wordCompatibleEquation.replace(/\{/g, "\\left{");
  wordCompatibleEquation = wordCompatibleEquation.replace(/\}/g, "\\right}");
  
  copyTextToClipboard(wordCompatibleEquation);
}
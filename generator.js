// Enum and global to interpret matrix seperator
var matrixMode = 0;
// abs(matrixMode) : Num of nested matrices
// matrixMode > 0 : In matrix interpretation, convert separators to <&>

// To be run on each key press
function keyUpEvent(event, equation)
{
  let output = "";

  // Apply intellisense, which may add characters to input box
  equation = inputIntellisense(event.keyCode, equation);
  // Adjust input window height if needed
  autosize(document.getElementById("input"));

  // Store between sessions
  sessionStorage.setItem("input", equation);

  matrixMode = 0;
  // Split each 'word' so it can be syntactically interpretted
  let separated = splitEquation(equation);
  separated.forEach(word => 
    {
      // Build up Tex equation
      output += interpretWord(word);
      console.log(output);
    });
  
  // Store between sessions
  sessionStorage.setItem("equation", output);
  runMathJaxInterpreter(output);
}

// Add intellisense assistance
function inputIntellisense(keyCode, equation)
{
  let input = document.getElementById("input");
  let cursorPosition = input.selectionEnd;
  console.log(cursorPosition);

  // Since intellisense is focussed aroudn cursor, build left and right halves
  //  independently then merge 
  let leftOfCursor = equation.substring(0, cursorPosition);
  let rightOfCursor = equation.substring(cursorPosition);
  
  // Interpret relative 'depth' into nested brackets
  let bracketDepth = 0;
  bracketDepth = (leftOfCursor.match(/\[/g) || []).length - (leftOfCursor.match(/]/g) || []).length;

  // More opened than closed brackets
  if ((equation.match(/\[/g) || []).length > (equation.match(/]/g) || []).length)
  {
    rightOfCursor = ']'+rightOfCursor;
  }

  // More opened than closed subscript parenthsis
  if ((equation.match(/\(/g) || []).length > (equation.match(/\)/g) || []).length)
  {
    rightOfCursor = ')'+rightOfCursor;
  }

  // More opened than closed braces
  if ((equation.match(/\{/g) || []).length > (equation.match(/\}/g) || []).length)
  {
    rightOfCursor = '}'+rightOfCursor;
  }

  // More opened than closed corner brackets
  if ((equation.match(/\</g) || []).length > (equation.match(/\>/g) || []).length)
  {
    rightOfCursor = '>'+rightOfCursor;
  }

  // Add tabbing relative to 'depth' on newline
  if (keyCode == '13' && bracketDepth > 1)
  {
    for (i = 1; i < bracketDepth; i++)
    {
      leftOfCursor += '\t';
      cursorPosition++;
    }
  }
  
  // Reflow input
  input.value = leftOfCursor + rightOfCursor;
  // Reposition cursor
  input.selectionEnd = cursorPosition;
  return leftOfCursor + rightOfCursor;
}

// Divide input into interpretable 'words'
function splitEquation(equation)
{
  let output;
  // Isolate <,> <\n> <[> <]> <(> <)> <{> <}> '<' '>' and <->
  output = equation.replace(/,/g, " , ");
  output = output.replace(/\n/g, " \n ");
  output = output.replace(/\[/g, " [ ");
  output = output.replace(/]/g, " ] ");
  output = output.replace(/-/g, " - ");
  output = output.replace(/\(/g, " ( ");
  output = output.replace(/\)/g, " ) ");
  output = output.replace(/\{/g, " { ");
  output = output.replace(/\}/g, " } ");
  output = output.replace(/\</g, " < ");
  output = output.replace(/\>/g, " > ");

  return output.split(" ");
}

// Convert 'words' into Tex syntax
function interpretWord(word)
{
  let output = "";

  switch(word)
    {
      // Begin matrix
      case "[":
        // If in protected mode, switch
        if (matrixMode < 0)
        {
          matrixMode *= -1;
        }
        // 'Depth' increase
        matrixMode++;
        output += "\\begin{bmatrix}";
        break;
      // End matrix
      case "]":
        // 'Depth' decrease
        matrixMode--;
        output += "\\end{bmatrix}";
        break;

      // Begin subscript
      case "(":
        output += "_{";
        break;
      // End subscript
      case ")":
        output += "}";
        break;

      // Begin braces
      case "{":
        // If in matrix mode, switch to protected
        if (matrixMode > 0)
        {
          matrixMode *= -1;
        }
        output += "\\left\\{ ";
        output += "\\begin{matrix}";
        break;
      // End braces
      case "}":
        // If in protected mode, switch
        if (matrixMode < 0)
        {
          matrixMode *= -1;
        }
        output += "\\end{matrix} ";
        output += "\\right\\}";
        break;

      // Begin corner brackets
      case "<":
        // If in matrix mode, switch to protected
        if (matrixMode > 0)
        {
          matrixMode *= -1;
        }
        output += "\\left< ";
        output += "\\begin{matrix}";
        break;
      // End corner brackets
      case ">":
        // If in protected mode, switch
        if (matrixMode < 0)
        {
          matrixMode *= -1;
        }
        output += "\\end{matrix} ";
        output += "\\right>";
        break;

      // Seperator
      case ",":
        // If in matrix mode, act as separator
        if (matrixMode > 0)
        {
          output += "&";
        }
        // If outside of matrix or in protected mode, act as comma
        else
        {
          output += word;
        }
        break;
      // Separate elements into different rows
      case ";":
      case "\n":
        output += "\\\\";
        break;

      // Add greek lowercase phi
      case "phi":
      case "Phi":
      case "PHI":
        output += "\\varphi";
        break;
      // Add logician's negation
      case "not":
      case "Not":
      case "NOT":
        output += "\\neg";
        break;
      
      // Ignore tabs
      case "\t":
      // Ignore empty words or spaces
      case "":
        break;

      // Non syntactic words are appended as is
      default:
        output += word;
        break;
    }
  // Separate each syntactic unit with a space
  output += " ";
  return output;
}

// Dynamically reinterpret TeX code
function runMathJaxInterpreter(equation)
{
  // Grab MathJax object
  let mathJaxObj = MathJax.Hub.getAllJax("equation")[0];
  // Reflow object with new equation?
  MathJax.Hub.queue.Push(["Text",mathJaxObj,"\\displaystyle{"+equation+"}"]);
}
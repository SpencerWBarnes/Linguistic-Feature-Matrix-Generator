function keyUpEvent(event, equation)
{
  let output = "";

  autosize(document.getElementById("input"));
  equation = inputIntellisense(event.keyCode, equation);

  sessionStorage.setItem("input", equation);

  let separated = splitEquation(equation);
  separated.forEach(word => 
    {
      output += interpretWord(word);
      console.log(output);
    });
  
  sessionStorage.setItem("equation", output);
  UpdateMath(output);
}

function inputIntellisense(keyCode, equation)
{
  let input = document.getElementById("input");
  let cursorPosition = input.selectionEnd;
  console.log(cursorPosition);

  let bracketDepth = 0;
  let leftOfCursor = equation.substring(0, cursorPosition);
  let rightOfCursor = equation.substring(cursorPosition);
  bracketDepth = (leftOfCursor.match(/\[/g) || []).length - (leftOfCursor.match(/]/g) || []).length;

  if ((equation.match(/\[/g) || []).length > (equation.match(/]/g) || []).length)
  {
    rightOfCursor = ']'+rightOfCursor;
  }
  if (keyCode == '13' && bracketDepth > 1)
  {
    for (i = 1; i < bracketDepth; i++)
    {
      leftOfCursor += '\t';
      cursorPosition++;
    }
  }
  
  input.value = leftOfCursor + rightOfCursor;
  input.selectionEnd = cursorPosition;
  return leftOfCursor + rightOfCursor;
}

function splitEquation(equation)
{
  let output;
  output = equation.replace(/,/g, " , ");
  output = output.replace(/\n/g, " \n ");
  output = output.replace(/\[/g, " [ ");
  output = output.replace(/]/g, " ] ");
  output = output.replace(/-/g, " - ");

  return output.split(" ");
}

function interpretWord(word)
{
  let output = "";

  switch(word)
    {
      // Begin matrix
      case "[":
        output += "\\begin{bmatrix}";
        break;
      // End matrix
      case "]":
        output += "\\end{bmatrix}";
        break;

      // Separate elements into different columns
      case ",":
        output += "&";
        break;
      // Separate elements into different rows
      case ";":
      case "\n":
        output += "\\\\";
        break;

      // Add greek lowercase phi
      case "phi":
      case "PHI":
        output += "\\varphi";
        break;
      // Add logician's negation
      case "not":
      case "NOT":
        output += "\\neg";
        break;
      
      // Ignore tabs
      case "\t":
      // Ignore empty words
      case "":
        break;

      // Non syntactic words
      default:
        output += word;
        break;
    }
  output += " ";
  return output;
}
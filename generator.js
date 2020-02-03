function keyUpEvent(equation)
{
  let output = "";

  sessionStorage.setItem("input", equation);

  let separated = splitEquation(equation);
  separated.forEach(word => 
    {
      output += interpretWord(word);
      console.log(output);
    });
  
  sessionStorage.setItem("equation", output);
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
        output += "&not";
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
<!DOCTYPE html>
<html lang="en">
    <head>
        <title> 
            Matrice tester
        </title>
        <meta charset="utf-8">
        <script type="text/x-mathjax-config">
          MathJax.Hub.Config({
            tex2jax: {
              inlineMath: [["$","$"],["\\(","\\)"]]
            }
          });
        </script>
        <script type="text/javascript"
          src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
        </script>
        <script src="https://rawgit.com/jackmoore/autosize/master/dist/autosize.min.js"></script>
        
        <script src="generator.js"></script>

        <link rel="stylesheet" type="text/css" href="static/css/bootstrap.min.css">
    </head>
    <body>
      <div class="container">

        <textarea id="input" class="col-12" onkeyup="keyUpEvent(event, this.value)"> </textarea> 

        <script type="math/tex; mode=display" id="equation">

        </script>

      </div>

      <script>
        let equation = sessionStorage.getItem("equation");
        document.getElementById("equation").innerText = equation
      </script>

      <script>
        let input = sessionStorage.getItem("input");
        document.getElementById("input").innerText = input;
      </script>

      <script>
        //
        //  Use a closure to hide the local variables from the
        //  global namespace
        //
        (function () {
          var QUEUE = MathJax.Hub.queue;  // shorthand for the queue
          var math = null;                // the element jax for the math output.
      
          //
          //  Get the element jax when MathJax has produced it.
          //
          QUEUE.Push(function () {
            math = MathJax.Hub.getAllJax("equation")[0];
          });
      
          //
          //  The onchange event handler that typesets the
          //  math entered by the user
          //
          window.UpdateMath = function (TeX) {
            QUEUE.Push(["Text",math,"\\displaystyle{"+TeX+"}"]);
          }
        })();
      </script>

    </body>
</html>
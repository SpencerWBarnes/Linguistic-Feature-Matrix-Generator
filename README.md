<!-- Begin matrix generator code -->

<!-- Get MathJax and autosize functionality -->
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>
<script src="https://rawgit.com/jackmoore/autosize/master/dist/autosize.min.js"></script>

<!-- Generator code -->
<script src="generator.js"></script>
<!-- bootstrap -->
<link rel="stylesheet" type="text/css" href="static/css/bootstrap.min.css">

<div class="container">

  <!-- User's input area -->
  <textarea id="input" placeholder="Type here" class="col-12" onkeyup="keyUpEvent(event, this.value)"></textarea>

  <!-- Helper legend for syntax -->
  <div class="card text-center">
    <div class="card-body">
      <p class="card-text">
        <code>[</code> and <code>]</code> to start or end a matrix bracket <br>
        <code>,</code> to add space between words in a row <br>
        <kbd>Enter</kbd> or <code>;</code> to go down a line <br>
        <code>not</code> followed by a space to place a &not symbol <br>
        <code>phi</code> followed by a space to place a &phi; symbol <br>
      </p>
      <!-- Button to show modal with an example? -->
      <!-- <button class="btn btn-secondary align-center" onclick="example()">Examples</button> -->
    </div>
  </div>

  <!-- The script to be interpreted as Tex -->
  <script type="math/tex; mode=display" id="equation"></script>

</div>

<!-- Load previous values into input and equation output -->
<script>
  let equation = sessionStorage.getItem("equation");
  document.getElementById("equation").innerText = equation
  let input = sessionStorage.getItem("input");
  document.getElementById("input").value = input;
</script>

<!-- End matrix generator code -->
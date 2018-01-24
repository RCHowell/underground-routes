function processForm(e) {
  if (e.preventDefault) e.preventDefault();

  var name = document.getElementById('name').value;
  var setter = document.getElementById('setter').value;
  var grade = document.getElementById('grade').value;
  var image = document.getElementById('image').value;

  console.log(name, setter, grade, image);

  var anHttpRequest = new XMLHttpRequest();
  var base = "https://api.mlab.com/api/1/databases/underground-routes";
  var key = "?apiKey=";
  var url = base + '/collections/routes' + key;
  
  $.ajax({ url: url,
    data: JSON.stringify({
      "name": name,
      "setter": setter,
      "grade": grade,
      "image": image
    }),
    type: "POST",
    contentType: "application/json"
  }).done(function() {
    var current = window.location.href;
    var newLoc = current.replace('/new.html', '/index.html');
    window.location.href = newLoc;
  });

  return false;
}

var form = document.getElementById('my-form');
if (form.attachEvent) {
  form.attachEvent("submit", processForm);
} else {
  form.addEventListener("submit", processForm);
}

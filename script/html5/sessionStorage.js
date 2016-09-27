(function() {
sessionStorage.setItem('barthel', barthel);
sessionStorage.setItem('medical_evaluation', window.escape(JSON.stringify(window.medical_evaluation)));
sessionStorage.setItem('medical_evaluation_template', window.escape(JSON.stringify(window.medical_evaluation_template)));


try {
  var record = JSON.parse(window.unescape(sessionStorage.getItem("local_record")));
} catch(err) {
  return console.log(err);
}

})();
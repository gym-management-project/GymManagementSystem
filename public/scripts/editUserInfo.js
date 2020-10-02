function editButton() {

  $(".form-control").removeAttr("disabled");



  document.getElementById("editBtn").hidden = true;
  document.getElementById("saveBtn").hidden = false;
  document.getElementById("userInfo").setAttribute("method", "post");


  return false;

}

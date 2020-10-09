function editButton() {

  $(".form-control").removeAttr("disabled");



  document.getElementById("editBtn").hidden = true;
    document.getElementById("editButton").hidden = true;
    document.getElementById("deleteBtn").hidden = false;
      document.getElementById("delBtn").hidden = false;
  document.getElementById("saveBtn").hidden = false;
  document.getElementById("userInfo").setAttribute("method", "post");


  return false;

}

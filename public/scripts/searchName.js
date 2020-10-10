// $(function(){
//   $("#searchName").autocomplete({
//     source : function(res,req){
//       $.ajax({
//         url : "/autocomplete",
//         dataType : "jsonp",
//         method : "GET",
//         data : req,
//         success : (data) =>{
//             console.log(data);
//             res(data);
//         },
//         error : (err) =>{
//           console.log(err.status);
//         }
//
//       });
//     },
//     minLength : 1,
//     select : (event ,ui) =>{
//       if(ui.item){
//         $("#searchName").val(ui.item.label);
//       }
//     }
//   });
// });

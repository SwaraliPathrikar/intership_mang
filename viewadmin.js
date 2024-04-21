function sortTable(table, column, ascending) {
    var rows = table.rows;
    var sortedRows = Array.from(rows).slice(1).sort(function (a, b) {
      var keyA = a.cells[column].textContent;
      var keyB = b.cells[column].textContent;
  
      if (ascending) {
        return keyA < keyB ? -1 : keyA > keyB ? 1 : 0;
      } else {
        return keyA > keyB ? -1 : keyA < keyB ? 1 : 0;
      }
    });
  
    for (var i = 0; i < sortedRows.length; i++) {
      table.appendChild(sortedRows[i]);
    }
  }
  
  var table = document.getElementById("myTable");
  sortTable(table, 0, true); // sort by roll number (column 0) in ascending order
import "./styles.css";

fetch("https://api.instantwebtools.net/v1/passenger?page=0&size=10")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });

class Pagination {
  constructor(elem, pageSize) {
    this.pagination = elem;
    this.pageSize = pageSize;
    this.totalPage = null;
    this.curPage = 0;
    this.init();
  }
  init() {
    this.buildTable();
    this.updateTable();
    this.bindEvent();
  }

  fetchTable(curPage, pageSize) {
    let baseUrl =
      "https://api.instantwebtools.net/v1/passenger?" +
      "page=" +
      curPage +
      "&size=" +
      pageSize;
    return fetch(baseUrl)
      .then((response) => response.json())
      .catch((error) => {
        console.log(error);
      });
  }

  buildTable() {
    let htmlStr = "";

    for (let i = 0; i < this.pageSize; i++) {
      htmlStr += "<tr><td></td><td></td><td></td></tr>";
    }
    this.pagination.insertAdjacentHTML("beforeend", htmlStr);
  }
  updateTable() {
    this.fetchTable(this.curPage, this.pageSize).then((data) => {
      this.totalPage = data.totalPages;
      for (let i = 0; i < this.pageSize; i++) {
        let { _id, name, airline } = data.data[i];
        this.pagination.querySelectorAll("table tr").forEach((row, idx) => {
          console.log("sfdfdf", row.classList);
          if (row.classList.contains("tr-title")) return;
          else {
            let tds = row.querySelectorAll("td");
            tds[0].innerText = _id;
            tds[1].innerText = name;
            tds[2].innerText = airline[0].name;
          }
        });
      }
    });
  }
  bindEvent() {
    document.querySelectorAll(".page-num button").forEach((item) => {
      item.addEventListener("click", (e) => {
        let direction = e.target.innerText === "previous" ? -1 : 1;
        console.log("222222", direction);
        if (
          (this.curPage === 0 && direction === -1) ||
          (this.curPage === this.totalPage && direction === 1)
        )
          return;
        console.log("1111111", direction);
        this.curPage = this.curPage + direction;
        document.querySelector(
          ".page-num .current-num"
        ).innerText = this.curPage;
        this.updateTable();
      });
    });
  }
}

var pag = new Pagination(document.querySelector("table"), 10);

const searchInputEl = document.getElementById("search-input");
const titleListEl = document.querySelectorAll(".title-list");
const mountYearEl = document.querySelectorAll(".mount-year");
const alertEl = document.querySelector(".alert.alert-danger");

searchInputEl.addEventListener("input", filter);

function filter() {
  const searchValue = searchInputEl.value.toLowerCase();
  let result = false;

  if (searchValue.length === 0) {
    // menghapus semua title bulan dan tahun
    mountYearEl.forEach((el) => {
      el.style.display = "block";
    });
  } else {
    mountYearEl.forEach((el) => {
      el.style.display = "none";
    });
  }

  titleListEl.forEach((title) => {
    if (
      !title
        .querySelector("h5 a")
        .innerHTML.toLowerCase()
        .includes(searchValue) &&
      !title
        .querySelector(".text-right.margin-bottom-none")
        .innerHTML.includes(searchValue)
    ) {
      title.style.display = "none";
    } else {
      title.style.display = "flex";
      result = true;
    }
  });

  if (!result) {
    alertEl.style.display = "block";
  } else {
    alertEl.style.display = "none";
  }
}

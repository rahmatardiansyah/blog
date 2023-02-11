const buttons = document.querySelectorAll(".load-image-button");
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function() {
    const imageId = this.getAttribute("data-image-id");
    const image = document.getElementById(imageId);
    image.style.display = "block";
    image.src = this.getAttribute("data-image-src");
    image.alt = this.getAttribute("alt");
    image.classList = this.getAttribute("img-class");
    this.remove();
  });
}

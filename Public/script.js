const image = document.querySelector('.image_upload')
var upload_image = ""

image.addEventListener("change", ()=>{
    const reader = new FileReader();
    reader.addEventListener("load", ()=>{
        upload_image = reader.result
        console.log(reader);
        document.querySelector('.display_image').style.backgroundImage = `url(${upload_image})`
    })
    reader.readAsDataURL(this.files[0]);
})
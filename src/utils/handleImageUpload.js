//image here is the file data
async function handleImageUpload(image, uploadPreset = "instagram") {
  // the file data is going to be collected in the form data constructor
  const data = new FormData();
  data.append("file", image);
  data.append("upload_preset", uploadPreset); //this upload preset is from cloudinary;s upload tab under settings
  data.append("cloud_name", "dzrzvld6q"); // cloudinary name
  const response = await fetch(
    "https://api.cloudinary.com/v1_1/dzrzvld6q/image/upload",
    {
      method: "POST",
      accept: "application/json ",
      body: data,
    }
  );

  const jsonResponse = await response.json();
  return jsonResponse.url;
}

export default handleImageUpload;

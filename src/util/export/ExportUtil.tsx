export const downloadJSON = (data: object, filename: string) => {
  // Convert the object to a JSON string
  const jsonString = JSON.stringify(data, null, 2);

  // Create a Blob from the JSON string
  const blob = new Blob([jsonString], { type: "application/json" });

  // Create a link element
  const link = document.createElement("a");

  // Set the download attribute with the desired file name
  link.download = `${filename}.json`;

  // Create a URL for the Blob and set it as the href attribute
  link.href = URL.createObjectURL(blob);

  // Append the link to the document body
  document.body.appendChild(link);

  // Trigger the download by simulating a click
  link.click();

  // Clean up and remove the link from the document
  document.body.removeChild(link);
};

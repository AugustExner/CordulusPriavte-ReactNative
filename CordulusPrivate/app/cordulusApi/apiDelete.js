export const deleteGardenbed = async (id) => {
  try {
    const response = await fetch("http://165.22.75.121:3000/delete", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        id: parseInt(id),
      }),
    });

    // Check for successful response
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    // Handle the successful response with data
    console.log("Delete post successfully:", data);
  } catch (error) {
    console.error("Error adding post:", error);
    // Handle errors here, for example, display an error message to the user
  }
};

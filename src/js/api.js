const BASE_URL = `https://68b9c31b6aaf059a5b58b010.mockapi.io/`;

export async function createTodo(todo) {
  try {
    const response = await fetch(`${BASE_URL}/todos`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(todo),
    });
    const data = await response.json();
    console.log("todo created :", data);
  } catch (error) {}
}

export  async function getTodos() {
      try {
    const response = await fetch(`${BASE_URL}/todos`, {
      method: "GET",
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
   return data
  } catch (error) {}
}

// export async function deleteTodo(params) {
//         try {
//     const response = await fetch(`${BASE_URL}/todos`, {
//       method: "DELETE",
//       headers: { "content-type": "application/json" },
//     });
//     const data = await response.json();
//    return data
//   } catch (error) {}
// }
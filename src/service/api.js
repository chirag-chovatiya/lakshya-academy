import { BASE_URl } from "./constant/api-constant";

export async function get(endpoint) {
  try {
    const header = {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
    };

    const response = await fetch(
      `${BASE_URl}${endpoint}?_=${new Date().getTime()}`,
      {
        headers: header,
        cache: "no-store",
      }
    );

    const mainData = await response.json();
    return mainData;
  } catch (error) {
    return { noData: true, data: [] };
  }
}

export async function post(endpoint, body, formdata = false, token = null) {
  const url = `${BASE_URl}${endpoint}`;
  
  const options = {
    method: "POST",
    headers: {
      "Cache-Control": "no-store",
      Pragma: "no-cache",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: formdata ? body : JSON.stringify(body),
  };

  if (!formdata) {
    options.headers["Content-Type"] = "application/json";
  }

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return await response.json();
}

export async function del(endpoint) {
  try {
    const header = {
      "Content-Type": "application/json",
      cache: "no-store",
    };
    const response = await fetch(`${BASE_URl}${endpoint}`, {
      method: "DELETE",
      headers: header,
    });
    if (response.ok) {
      return { success: true };
    } else {
      const errorData = await response.json();
      return { success: false, error: errorData };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
}

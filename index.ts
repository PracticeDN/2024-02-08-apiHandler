type GenericResponse = any;

class ApiHandler<T> {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async fetchData(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    } catch (error) {
      throw new Error(`Fetching data failed: ${error}`);
    }
  }
}

async function app() {
  const apiHandler = new ApiHandler<GenericResponse>(
    "https://jsonplaceholder.typicode.com/"
  );
  try {
    const data = await apiHandler.fetchData("/posts");
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

app();

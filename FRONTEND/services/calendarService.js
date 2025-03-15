export async function getHelloWorld() {
    const response = await fetch('http://localhost:5129');
    return response.text();
}
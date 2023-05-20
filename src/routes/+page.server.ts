export async function load({ fetch }) {
    const res = await fetch("https://www.youtube.com/")
    const data = await res.text()

    return {
        web_code: data
    }
}
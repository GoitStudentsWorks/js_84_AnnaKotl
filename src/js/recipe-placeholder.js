async function getData() {
    const response = await fetch('');
    const data = await response.json();
    return data;
}
async function main() {
    const postdData = await getData();
    let currentPage = 1;
    let rows = 9;
    let colns = 3;
    function displayList(arrData, rowPerPega, page) {
        const postsEl = document.querySelector('.posts');
        const start = rowPerPega * page;
        const end = start + rowPerPega;
        const paginatedData = arrData.slice(start, end);
        paginatedData.array.forEach( (el) => {
            const postEl = document.createElement('.div')
        });
    }

}
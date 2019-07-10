Array.from(document.querySelectorAll('.searchable')).forEach(searcheable => {
    const searchInputs = Array.from(searcheable.querySelectorAll('.search'));
    console.log(searchInputs);
    searchInputs.forEach(searchInput => {
        searchInput.addEventListener('keyup', event => {

            console.time('search');
            const query = event.target.value;
            Array.from(searcheable.querySelectorAll('.searchitem')).forEach(item => {
                if (!query || item.innerText.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });

            console.timeEnd('search');
        })
    })
});
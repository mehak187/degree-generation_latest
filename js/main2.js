let currentPage = 1;

function updatePagination() {
    const pages = document.querySelectorAll('.pagination .page-item');
    pages.forEach(page => {
        const pageNumber = parseInt(page.getAttribute('data-page'));
        page.classList.toggle('active', pageNumber === currentPage);
    });

    // Enable/disable Previous and Next buttons
    document.getElementById('prev').classList.toggle('disabled', currentPage === 1);
    document.getElementById('next').classList.toggle('disabled', currentPage === pages.length);
}

document.querySelectorAll('.pagination .page-item[data-page]').forEach(page => {
    page.addEventListener('click', () => {
        currentPage = parseInt(page.getAttribute('data-page'));
        updatePagination();
    });
});

document.getElementById('prev').addEventListener('click', (e) => {
    e.preventDefault();
    if (currentPage > 1) currentPage--;
    updatePagination();
});

document.getElementById('next').addEventListener('click', (e) => {
    e.preventDefault();
    if (currentPage < 3) { // Change 3 to total number of pages
        currentPage++;
    }
    updatePagination();
});

updatePagination(); // Initialize pagination





 // Get the 'select all' checkbox element
 const selectAllCheckbox = document.getElementById('selectAll');
        
 // Get all the row checkboxes
 const rowCheckboxes = document.querySelectorAll('.select-row');
 
 // Add event listener to the 'select all' checkbox
 selectAllCheckbox.addEventListener('change', function() {
     rowCheckboxes.forEach(function(checkbox) {
         checkbox.checked = selectAllCheckbox.checked;
     });
 });
 
 // Add event listener to each row checkbox to update the 'select all' checkbox
 rowCheckboxes.forEach(function(checkbox) {
     checkbox.addEventListener('change', function() {
         if (!checkbox.checked) {
             selectAllCheckbox.checked = false;
         } else if (Array.from(rowCheckboxes).every(checkbox => checkbox.checked)) {
             selectAllCheckbox.checked = true;
         }
     });
 });

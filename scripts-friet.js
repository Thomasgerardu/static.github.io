$(document).ready(function () {
    // Parse CSV and populate the fries table
    Papa.parse("friet.csv", {
        download: true,
        header: true,
        complete: function (results) {
            const data = results.data;

            // Add rows to the table dynamically
            const tbody = $('#frietTable tbody');
            const locationSet = new Set();

            data.forEach(row => {
                const imgTag = `<img src="${row.Picture}" alt="${row.Frituur}" width="50">`;
                const tableRow = `
                    <tr>
                        <td>${row.Frituur}</td>
                        <td>${row["Stad/Dorp"]}</td>
                        <td>${row.Datum}</td>
                        <td>${imgTag}</td>
                        <td>${row.Rating}</td>
                        <td>${row.Opmerking}</td>
                    </tr>
                `;
                tbody.append(tableRow);

                // Collect unique values for filters
                locationSet.add(row["Stad/Dorp"]);
            });

            // Populate Stad/Dorp Filter
            const locationFilter = $('#locationFilter');
            Array.from(locationSet).sort().forEach(location => {
                locationFilter.append(`<option value="${location}">${location}</option>`);
            });

            // Initialize DataTables
            const table = $('#frietTable').DataTable();

            // Custom filtering for Stad/Dorp
            $('#locationFilter').on('change', function () {
                const location = $(this).val();
                table.column(1).search(location).draw(); // Column index 1 is "Stad/Dorp"
            });
        }
    });
});

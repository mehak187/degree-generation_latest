$(document).ready(function () {
$("#hideButton").click(function () {
    $(".main-board").hide();
  });
  $("#bars").click(function () {
    $(".main-board").show();
  });
  flatpickr("#datepicker", {
    dateFormat: "l, d F Y", // Format: Day, DD Month YYYY
    defaultDate: "2021-05-17", // Default date (YYYY-MM-DD format)
    onReady: function(selectedDates, dateStr, instance) {
        // Ensure the input is populated with the default date on load
        instance.input.value = dateStr;
    },
    onChange: function(selectedDates, dateStr, instance) {
        console.log("Selected date: ", dateStr);
    }
});
});

const dropArea = document.getElementById('dropArea');
const browseInput = document.getElementById('browse');
const previewImage = document.getElementById('previewImage');

// Prevent default behaviors for drag-and-drop events
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

// Add drag-and-drop events for highlighting drop area
['dragenter', 'dragover'].forEach(eventName => {
  dropArea.addEventListener(eventName, () => dropArea.classList.add('highlight'), false);
});

['dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, () => dropArea.classList.remove('highlight'), false);
});

// Handle drop event
dropArea.addEventListener('drop', handleDrop, false);

function handleDrop(e) {
  const dt = e.dataTransfer;
  const files = dt.files;
  handleFiles(files);
}

// Handle browse file input
browseInput.addEventListener('change', (e) => {
  const files = e.target.files;
  handleFiles(files);
});

function handleFiles(files) {
  const file = files[0];
  
  if (file && isValidFileType(file)) {
    previewFile(file);
  } else {
    alert('Unsupported file format. Only JPG, PNG, and HIEV files are allowed.');
  }
}

function isValidFileType(file) {
  const validTypes = ['image/jpeg', 'image/png'];
  return validTypes.includes(file.type);
}

function previewFile(file) {
  const reader = new FileReader();
  
  reader.onloadend = function() {
    previewImage.src = reader.result;
  };
  
  reader.readAsDataURL(file);
}


var ctx = document.getElementById('myLineChart').getContext('2d');
        
        // Create a gradient
        var gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(1, 'rgba(0, 158, 82, 1)');
        gradient.addColorStop(0, 'rgba(241, 237, 255, 0)');
    
        // Create the line chart
        var myLineChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
              label: 'Monthly Sales',
              data: [10, 25, 15, 30, 20, 35, 40],
              borderColor: 'rgba(0, 158, 82, 1)',
              backgroundColor: gradient, // Use gradient as background
              borderWidth: 2,
              tension: 0.5,
              fill: true,
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                        display: false
                },
            },
            scales: {
              x: {
                beginAtZero: true,
                grid: {
                  display: false
                }
              },
              y: {
                beginAtZero: true,
                grid: {
                    display: false,
                }
              }
            }
          }
        });

 // First Doughnut Chart
var ctxDoughnutChart1 = document.getElementById('myDoughnutChart1').getContext('2d');

// Create the first doughnut chart
var doughnutChart1 = new Chart(ctxDoughnutChart1, {
  type: 'doughnut',
  data: {
    labels: ['Students', 'Faculty', 'Admin'],
    datasets: [{
      label: 'Dataset 1',
      data: [12, 19, 10],
      backgroundColor: [
        '#00B7FE',
        '#00C568',
        '#9747FF',
      ],
      borderColor: [
        '#00B7FE',
        '#00C568',
        '#9747FF',
      ],
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '80%',
    plugins: {
      legend: {
        position: 'left',
        labels: {
          generateLabels: function(chart) {
            const data = chart.data;
            return data.labels.map((label, i) => {
              const dataset = data.datasets[0];
              const total = dataset.data.reduce((acc, val) => acc + val, 0);
              const value = dataset.data[i];
              const percentage = ((value / total) * 100).toFixed(2) + '%';
              return {
                text: label + ': ' + percentage,
                fillStyle: dataset.backgroundColor[i]
              };
            });
          },
          boxWidth: 10
        }
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            const dataset = tooltipItem.dataset;
            const total = dataset.data.reduce((acc, val) => acc + val, 0);
            const value = tooltipItem.raw;
            const percentage = ((value / total) * 100).toFixed(2) + '%';
            return tooltipItem.label + ': ' + percentage;
          }
        }
      }
    }
  }
});

// Add custom legend to the page for the first chart
document.getElementById('chartLegend1').innerHTML = doughnutChart1.generateLegend();



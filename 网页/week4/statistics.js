// Tab switch logic
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const targetTab = btn.dataset.tab;
    // Remove active
    tabButtons.forEach(b => b.classList.remove('active'));
    tabPanels.forEach(p => p.classList.remove('active'));
    // Activate selected
    btn.classList.add('active');
    document.getElementById(targetTab).classList.add('active');
  })
})

// Bar Chart
const barCtx = document.getElementById('barChart').getContext('2d');
new Chart(barCtx, {
  type: 'bar',
  data: {
    labels: ['Library', 'Classroom', 'Sports Field'],
    datasets: [{
      label: 'Monthly Visitors',
      data: [280, 420, 190],
      backgroundColor: [
        '#7455e9',
        '#5944c2',
        '#b3a4f0'
      ],
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins:{
      legend:{
        position:'top'
      }
    },
    scales:{
      y:{
        beginAtZero:true,
        title:{
          display:true,
          text:"Visitor Count"
        }
      }
    }
  }
});

// Line Chart
const lineCtx = document.getElementById('lineChart').getContext('2d');
new Chart(lineCtx, {
  type: 'line',
  data: {
    labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    datasets: [{
      label: 'Monthly Visits',
      data: [120,145,220,290,310,270,160,130,250,300,240,180],
      borderColor:'#7455e9',
      backgroundColor:'rgba(116,85,233,0.15)',
      fill:true,
      tension:0.3
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins:{
      legend:{
        position:'top'
      }
    },
    scales:{
      y:{
        beginAtZero:true,
        title:{
          display:true,
          text:"Visit Number"
        }
      }
    }
  }
});

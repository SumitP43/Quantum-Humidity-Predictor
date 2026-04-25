// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadModelInfo();
    loadPerformanceMetrics();
    initializeCharts();
    setupFileUpload();
});

// Load Model Information
async function loadModelInfo() {
    try {
        const response = await fetch('/api/model-info');
        const data = await response.json();
        
        document.getElementById('model-name').textContent = data.name;
        document.getElementById('model-version').textContent = 'v' + data.version;
        document.getElementById('model-status').textContent = data.status;
        document.getElementById('model-accuracy').textContent = (data.accuracy * 100).toFixed(1) + '%';
        document.getElementById('status-text').textContent = 'Online';
        
        updateLastUpdate();
    } catch (error) {
        console.error('Error loading model info:', error);
    }
}

// Get Prediction
async function getPrediction() {
    const btn = document.querySelector('.predict-btn');
    btn.disabled = true;
    btn.textContent = '🔄 Generating...';
    
    try {
        const response = await fetch('/api/predict');
        const data = await response.json();
        
        // Display prediction result
        const resultDiv = document.getElementById('prediction-result');
        resultDiv.innerHTML = `
            <div>
                <div class="result-value">${data.prediction} ${data.unit}</div>
                <p style="margin-top: 10px; color: #a0a0a0;">
                    <strong>Confidence:</strong> <span style="color: #00ff64;">${data.confidence}%</span>
                </p>
            </div>
        `;
        
        // Display input parameters
        displayInputParameters(data.inputs);
        
        updateLastUpdate();
    } catch (error) {
        console.error('Error getting prediction:', error);
        document.getElementById('prediction-result').innerHTML = 
            '<p style="color: #ff6464;">Error getting prediction</p>';
    } finally {
        btn.disabled = false;
        btn.textContent = '🔮 Generate Prediction';
    }
}

// Display Input Parameters
function displayInputParameters(inputs) {
    const grid = document.getElementById('inputs-grid');
    const parameterNames = {
        'desiccant_thickness': 'δd (mm)',
        'length': 'L (mm)',
        'particle_diameter': 'd (mm)',
        'spacing': 'x (mm)',
        'inlet_temp': 'Twi (°C)',
        'ambient_temp': 'Tai (°C)',
        'inlet_humidity': 'Wai (g/kg)',
        'mass_flow': 'ṁa (kg/s)',
        'cycle_time': 'tc (s)'
    };
    
    let html = '';
    for (const [key, value] of Object.entries(inputs)) {
        const name = parameterNames[key] || key;
        html += `
            <div class="input-item">
                <span class="input-name">${name}</span>
                <span class="input-value">${value}</span>
            </div>
        `;
    }
    
    grid.innerHTML = html;
}

// Load Performance Metrics
async function loadPerformanceMetrics() {
    try {
        const response = await fetch('/api/performance');
        const data = await response.json();
        
        document.getElementById('metric-mae').textContent = data.metrics.mae.toFixed(2);
        document.getElementById('metric-rmse').textContent = data.metrics.rmse.toFixed(2);
        document.getElementById('metric-r2').textContent = data.metrics.r_squared.toFixed(2);
        document.getElementById('metric-mape').textContent = data.metrics.mape.toFixed(2) + '%';
        
        document.getElementById('arch-info').textContent = 
            `${data.quantum_layers} Quantum Layers + Classical I/O (${data.classical_inputs} inputs → ${data.classical_outputs} output)`;
        document.getElementById('size-info').textContent = data.model_size;
        
    } catch (error) {
        console.error('Error loading performance metrics:', error);
    }
}

// Initialize Charts
function initializeCharts() {
    // Architecture Chart
    const architectureCtx = document.getElementById('architectureChart');
    if (architectureCtx) {
        new Chart(architectureCtx, {
            type: 'bar',
            data: {
                labels: ['Input Layer', 'Quantum Layer 1', 'Quantum Layer 2', 'Quantum Layer 3', 'Output Layer'],
                datasets: [{
                    label: 'Nodes/Qubits',
                    data: [9, 5, 5, 5, 1],
                    backgroundColor: [
                        'rgba(100, 200, 255, 0.7)',
                        'rgba(0, 255, 100, 0.7)',
                        'rgba(0, 255, 100, 0.7)',
                        'rgba(0, 255, 100, 0.7)',
                        'rgba(255, 100, 200, 0.7)'
                    ],
                    borderColor: [
                        'rgba(100, 200, 255, 1)',
                        'rgba(0, 255, 100, 1)',
                        'rgba(0, 255, 100, 1)',
                        'rgba(0, 255, 100, 1)',
                        'rgba(255, 100, 200, 1)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        labels: {
                            color: '#a0a0a0'
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(100, 200, 255, 0.1)'
                        },
                        ticks: {
                            color: '#a0a0a0'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(100, 200, 255, 0.1)'
                        },
                        ticks: {
                            color: '#a0a0a0'
                        }
                    }
                }
            }
        });
    }
    
    // Parameters Chart
    const parametersCtx = document.getElementById('parametersChart');
    if (parametersCtx) {
        new Chart(parametersCtx, {
            type: 'radar',
            data: {
                labels: ['Desiccant', 'Length', 'Diameter', 'Spacing', 'Inlet Temp', 'Ambient Temp', 'Humidity', 'Flow Rate', 'Cycle Time'],
                datasets: [{
                    label: 'Normalized Parameter Values',
                    data: [0.6, 0.8, 0.4, 0.5, 0.7, 0.65, 0.55, 0.5, 0.75],
                    borderColor: 'rgba(100, 200, 255, 1)',
                    backgroundColor: 'rgba(100, 200, 255, 0.2)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(0, 255, 100, 1)',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        labels: {
                            color: '#a0a0a0'
                        }
                    }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 1,
                        grid: {
                            color: 'rgba(100, 200, 255, 0.1)'
                        },
                        ticks: {
                            color: '#a0a0a0',
                            backdropColor: 'transparent'
                        }
                    }
                }
            }
        });
    }
}

// Update Last Update Time
function updateLastUpdate() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit'
    });
    document.getElementById('last-update').textContent = timeString;
}

// Setup File Upload
function setupFileUpload() {
    const uploadBox = document.getElementById('upload-box');
    const fileInput = document.getElementById('file-input');
    
    // Click to upload
    uploadBox.addEventListener('click', () => fileInput.click());
    
    // File input change
    fileInput.addEventListener('change', (e) => handleFileUpload(e.target.files[0]));
    
    // Drag and drop
    uploadBox.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadBox.classList.add('drag-over');
    });
    
    uploadBox.addEventListener('dragleave', () => {
        uploadBox.classList.remove('drag-over');
    });
    
    uploadBox.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadBox.classList.remove('drag-over');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileUpload(files[0]);
        }
    });
}

// Handle File Upload
async function handleFileUpload(file) {
    if (!file) return;
    
    if (!file.name.endsWith('.csv') && !file.name.endsWith('.txt')) {
        alert('Please upload a CSV or TXT file');
        return;
    }
    
    const uploadBox = document.getElementById('upload-box');
    uploadBox.style.pointerEvents = 'none';
    uploadBox.style.opacity = '0.6';
    uploadBox.innerHTML = '<p>⏳ Processing file...</p>';
    
    const formData = new FormData();
    formData.append('file', file);
    
    try {
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Upload failed');
        }
        
        displayUploadResults(data);
        uploadBox.style.pointerEvents = 'auto';
        uploadBox.style.opacity = '1';
        
    } catch (error) {
        console.error('Error uploading file:', error);
        alert('Error uploading file: ' + error.message);
        uploadBox.style.pointerEvents = 'auto';
        uploadBox.style.opacity = '1';
        uploadBox.innerHTML = `
            <p class="upload-icon">📁</p>
            <p class="upload-text">Drag & drop your CSV/TXT file here</p>
            <p class="upload-subtext">or click to browse</p>
        `;
    }
}

// Display Upload Results
function displayUploadResults(data) {
    const resultsDiv = document.getElementById('upload-results');
    const resultsContent = document.getElementById('results-content');
    
    let html = `
        <div class="upload-success">
            <strong>✅ File processed successfully!</strong>
            <br>Filename: ${data.filename}
            <br>Total predictions: ${data.total_predictions}
        </div>
        <table class="results-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Prediction (g/kg)</th>
                    <th>Confidence</th>
                    <th>Inlet Temp (°C)</th>
                    <th>Humidity (g/kg)</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    data.predictions.forEach((pred, index) => {
        html += `
            <tr>
                <td>${index + 1}</td>
                <td><strong style="color: #00ff64;">${pred.prediction}</strong></td>
                <td>${pred.confidence}%</td>
                <td>${pred.inputs.inlet_temp}</td>
                <td>${pred.inputs.inlet_humidity}</td>
            </tr>
        `;
    });
    
    html += `
            </tbody>
        </table>
        <div style="margin-top: 15px; text-align: center;">
            <button class="predict-btn" onclick="resetUpload()" style="background: rgba(100, 200, 255, 0.5);">
                🔄 Upload Another File
            </button>
        </div>
    `;
    
    resultsContent.innerHTML = html;
    resultsDiv.style.display = 'block';
    updateLastUpdate();
}

// Reset Upload
function resetUpload() {
    const uploadBox = document.getElementById('upload-box');
    const fileInput = document.getElementById('file-input');
    const resultsDiv = document.getElementById('upload-results');
    
    uploadBox.innerHTML = `
        <p class="upload-icon">📁</p>
        <p class="upload-text">Drag & drop your CSV/TXT file here</p>
        <p class="upload-subtext">or click to browse</p>
    `;
    fileInput.value = '';
    resultsDiv.style.display = 'none';
}

// Auto-refresh model info every 10 seconds
setInterval(loadModelInfo, 10000);

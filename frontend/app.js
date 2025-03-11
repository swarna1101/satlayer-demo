// SatLayer MVP
// app.js

// Contract addresses
const CONTRACTS = {
    bvsdirectory: {
        name: 'BVSDirectory',
        address: 'bbn1f803xuwl6l7e8jm9ld0kynvvjfhfs5trax8hmrn4wtnztglpzw0sm72xua',
        functionality: 'Lists and manages registered services'
    },
    statebank: {
        name: 'StateBank',
        address: 'bbn1h9zjs2zr2xvnpngm9ck8ja7lz2qdt5mcw55ud7wkteycvn7aa4pqpghx2q',
        functionality: 'Maintains the state of the BVS system'
    },
    bvsdriver: {
        name: 'BVSDriver',
        address: 'bbn18x5lx5dda7896u074329fjk4sflpr65s036gva65m4phavsvs3rqk5e59c',
        functionality: 'Handles service execution and callbacks'
    },
    strategymanager: {
        name: 'StrategyManager',
        address: 'bbn1mju0w4qagjcgtrgepr796zmg083qurq9sngy0eyxm8wzf78cjt3qzfq7qy',
        functionality: 'Manages staking strategies'
    }
};

// Simulated services data
const SERVICES = [
    {
        id: 1,
        name: 'Bitcoin-backed Storage',
        address: 'bbn1abc123...',
        type: 'storage',
        description: 'Decentralized storage backed by Bitcoin security',
        status: 'active'
    },
    {
        id: 2,
        name: 'Secure Messaging',
        address: 'bbn1def456...',
        type: 'messaging',
        description: 'End-to-end encrypted messaging service',
        status: 'active'
    },
    {
        id: 3,
        name: 'Prediction Market',
        address: 'bbn1ghi789...',
        type: 'prediction',
        description: 'Decentralized prediction markets with BTC finality',
        status: 'active'
    }
];

// BVS sample state
const BVS_STATE = {
    totalServices: 3,
    activeServices: 3,
    totalTransactions: 142,
    lastUpdate: '2025-03-11T08:23:45Z',
    chainHeight: 15243,
    btcCheckpointHeight: 842301
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Set up event listeners
    setupEventListeners();

    // Initialize UI
    updateStatusInfo();

    // Simulate network activity
    simulateNetworkActivity();
});

// Set up event listeners for interactive elements
function setupEventListeners() {
    // Tab navigation
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // Remove active class from all links
            navLinks.forEach(link => {
                link.parentElement.classList.remove('active');
            });

            // Add active class to clicked link
            this.parentElement.classList.add('active');

            // Show corresponding panel
            const targetId = this.getAttribute('href').substring(1);
            showPanel(targetId);
        });
    });

    // Contract interaction button
    const fetchContractButton = document.getElementById('fetch-contract');
    if (fetchContractButton) {
        fetchContractButton.addEventListener('click', handleContractInteraction);
    }

    // Refresh services button
    const refreshServicesButton = document.getElementById('refresh-services');
    if (refreshServicesButton) {
        refreshServicesButton.addEventListener('click', handleRefreshServices);
    }

    // Register service form
    const registerServiceForm = document.getElementById('register-service-form');
    if (registerServiceForm) {
        registerServiceForm.addEventListener('submit', handleRegisterService);
    }

    // Network info modal
    const networkInfoButton = document.getElementById('network-info-button');
    const networkModal = document.getElementById('network-modal');
    const closeModalButton = document.querySelector('.close-modal');

    if (networkInfoButton && networkModal && closeModalButton) {
        networkInfoButton.addEventListener('click', function(e) {
            e.preventDefault();
            networkModal.classList.remove('hidden');
        });

        closeModalButton.addEventListener('click', function() {
            networkModal.classList.add('hidden');
        });

        // Close modal when clicking outside
        window.addEventListener('click', function(e) {
            if (e.target === networkModal) {
                networkModal.classList.add('hidden');
            }
        });
    }

    // Service detail buttons
    const viewServiceButtons = document.querySelectorAll('.service-actions .icon-button');
    viewServiceButtons.forEach(button => {
        button.addEventListener('click', function() {
            const serviceItem = this.closest('.service-item');
            const serviceName = serviceItem.querySelector('h3').textContent;
            alert(`Service details for ${serviceName}`);
        });
    });

    // Copy address buttons
    setupCopyButtons();
}

// Show panel and hide others
function showPanel(panelId) {
    const panels = document.querySelectorAll('.panel');
    panels.forEach(panel => {
        if (panel.id === panelId) {
            panel.style.display = 'block';
        } else {
            panel.style.display = 'none';
        }
    });
}

// Handle contract interaction
function handleContractInteraction() {
    const contractInfo = document.getElementById('contract-info');
    const contractDetails = document.querySelector('.contract-details');
    const loadingIndicator = document.querySelector('.loading-indicator');
    const selectedContract = document.getElementById('contract-selector').value;

    if (!contractInfo || !contractDetails || !loadingIndicator) return;

    // Show loading state
    loadingIndicator.classList.remove('hidden');
    contractDetails.classList.add('hidden');

    // Simulate API call delay
    setTimeout(() => {
        loadingIndicator.classList.add('hidden');
        contractDetails.classList.remove('hidden');

        const contract = CONTRACTS[selectedContract];

        if (contract) {
            let detailsHTML = `
                <h3>${contract.name}</h3>
                <div class="info-row">
                    <span class="info-label">Address</span>
                    <div class="address-container">
                        <code>${contract.address}</code>
                        <button class="copy-button" title="Copy address">
                            <i class="fas fa-copy"></i>
                        </button>
                    </div>
                </div>
                <div class="info-row">
                    <span class="info-label">Functionality</span>
                    <span class="info-value">${contract.functionality}</span>
                </div>
            `;

            // Add contract-specific details
            if (selectedContract === 'bvsdirectory') {
                detailsHTML += `
                    <div class="info-row">
                        <span class="info-label">Registered Services</span>
                        <span class="info-value">${SERVICES.length}</span>
                    </div>
                `;
            } else if (selectedContract === 'statebank') {
                detailsHTML += `
                    <div class="info-row">
                        <span class="info-label">Last State Update</span>
                        <span class="info-value">${BVS_STATE.lastUpdate}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Chain Height</span>
                        <span class="info-value">${BVS_STATE.chainHeight}</span>
                    </div>
                `;
            }

            contractDetails.innerHTML = detailsHTML;

            // Setup new copy buttons
            setupCopyButtons();
        } else {
            contractDetails.innerHTML = '<p>Contract information not available.</p>';
        }
    }, 1500);
}

// Set up copy buttons
function setupCopyButtons() {
    const copyButtons = document.querySelectorAll('.copy-button');
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const addressElement = this.parentElement.querySelector('code');
            if (addressElement) {
                navigator.clipboard.writeText(addressElement.textContent)
                    .then(() => {
                        const originalIcon = this.innerHTML;
                        this.innerHTML = '<i class="fas fa-check"></i>';
                        setTimeout(() => {
                            this.innerHTML = originalIcon;
                        }, 2000);
                    })
                    .catch(err => {
                        console.error('Could not copy text: ', err);
                    });
            }
        });
    });
}

// Handle refresh services
function handleRefreshServices() {
    const button = document.getElementById('refresh-services');
    if (!button) return;

    const originalText = button.innerHTML;

    // Show loading state
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Refreshing...';
    button.disabled = true;

    // Simulate API call delay
    setTimeout(() => {
        // Restore button state
        button.innerHTML = originalText;
        button.disabled = false;

        // Create a toast notification
        showToast('Services refreshed successfully!', 'success');
    }, 2000);
}

// Handle register service
function handleRegisterService(e) {
    e.preventDefault();

    const serviceName = document.getElementById('service-name').value;
    const serviceAddress = document.getElementById('service-address').value;
    const serviceType = document.getElementById('service-type').value;

    if (!serviceName || !serviceAddress) {
        showToast('Please fill in all required fields', 'error');
        return;
    }

    // Show loading state on the submit button
    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Registering...';
    submitButton.disabled = true;

    // Simulate API call delay
    setTimeout(() => {
        // Restore button state
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;

        // Add to services (in a real app, this would come from API response)
        const newService = {
            id: SERVICES.length + 1,
            name: serviceName,
            address: serviceAddress,
            type: serviceType,
            description: document.getElementById('service-description')?.value || `${serviceName} service`,
            status: 'pending'
        };

        // Show success notification
        showToast(`Service "${serviceName}" registered successfully!`, 'success');

        // Reset form
        e.target.reset();
    }, 2000);
}

// Update status information
function updateStatusInfo() {
    // Update chain status in header
    const chainStatus = document.querySelector('.chain-status');
    if (chainStatus) {
        chainStatus.textContent = `Chain Height: ${BVS_STATE.chainHeight}`;
    }

    // Update Bitcoin checkpoint info
    const btcValue = document.querySelector('.btc-icon + .status-content .status-value');
    if (btcValue) {
        btcValue.textContent = `Block #${BVS_STATE.btcCheckpointHeight}`;
    }

    // Update registered services count
    const servicesValue = document.querySelector('.status-cards .status-value');
    if (servicesValue) {
        servicesValue.textContent = SERVICES.length;
    }
}

// Simulate network activity
function simulateNetworkActivity() {
    // Simulate random network latency
    setInterval(() => {
        const statusIndicator = document.querySelector('.status-indicator');
        if (!statusIndicator) return;

        // Randomly toggle between active and latency states
        if (Math.random() > 0.8) {
            statusIndicator.style.backgroundColor = 'var(--warning)';
            setTimeout(() => {
                statusIndicator.style.backgroundColor = 'var(--success)';
            }, 2000);
        }
    }, 10000);

    // Simulate updated checkpoint every minute (shortened for demo)
    setInterval(() => {
        BVS_STATE.btcCheckpointHeight++;
        BVS_STATE.chainHeight += Math.floor(Math.random() * 5) + 1;
        BVS_STATE.lastUpdate = new Date().toISOString();

        updateStatusInfo();
    }, 60000);
}

// Show toast notification
function showToast(message, type = 'info') {
    // Create toast container if it doesn't exist
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);

        // Add toast container styles dynamically
        const style = document.createElement('style');
        style.textContent = `
            .toast-container {
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 9999;
            }
            .toast {
                min-width: 250px;
                margin-top: 10px;
                padding: 12px 16px;
                border-radius: var(--radius);
                font-size: 14px;
                display: flex;
                align-items: center;
                box-shadow: var(--shadow-md);
                transform: translateY(100px);
                opacity: 0;
                transition: all 0.3s ease;
            }
            .toast.show {
                transform: translateY(0);
                opacity: 1;
            }
            .toast i {
                margin-right: 10px;
                font-size: 16px;
            }
            .toast.success {
                background-color: rgba(72, 187, 120, 0.9);
                color: white;
            }
            .toast.error {
                background-color: rgba(245, 101, 101, 0.9);
                color: white;
            }
            .toast.info {
                background-color: rgba(66, 153, 225, 0.9);
                color: white;
            }
        `;
        document.head.appendChild(style);
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    // Set icon based on type
    let icon = 'info-circle';
    if (type === 'success') icon = 'check-circle';
    if (type === 'error') icon = 'exclamation-circle';

    toast.innerHTML = `<i class="fas fa-${icon}"></i> ${message}`;
    toastContainer.appendChild(toast);

    // Show toast with animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// Initialize when document is loaded
if (document.readyState === 'complete') {
    setupEventListeners();
    updateStatusInfo();
    simulateNetworkActivity();
}
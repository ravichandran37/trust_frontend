import React, { useState, useEffect } from 'react';
import { X, Heart, Shield, Award, CheckCircle, CreditCard, Sparkles } from 'lucide-react';
import { addDonation } from '../utils/localStorageHelper';

const loadRazorpay = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

export default function QuickDonateModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState('2500');
  const [isCustom, setIsCustom] = useState(false);
  const [frequency, setFrequency] = useState('one-time');
  const [donorDetails, setDonorDetails] = useState({
    name: '',
    email: '',
    phone: '',
    pan: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [campaignId, setCampaignId] = useState('camp_general');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setStep(1);
      setAmount('2500');
      setIsCustom(false);
      setDonorDetails({ name: '', email: '', phone: '', pan: '' });
      setCampaignId('camp_general');
      setErrors({});
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const presets = ['500', '1000', '2500', '5000', '10000'];

  const handleAmountSelect = (val) => {
    setIsCustom(false);
    setAmount(val);
  };

  const handleCustomAmountChange = (e) => {
    setIsCustom(true);
    setAmount(e.target.value.replace(/\D/g, ''));
  };

  const validateStep2 = () => {
    const errs = {};
    if (!donorDetails.name.trim()) errs.name = 'Full name is required';
    if (!donorDetails.email.trim()) {
      errs.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(donorDetails.email)) {
      errs.email = 'Enter a valid email';
    }
    if (!donorDetails.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(donorDetails.phone.replace(/\D/g, ''))) {
      errs.phone = 'Enter a valid 10-digit phone number';
    }
    if (donorDetails.pan.trim() && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i.test(donorDetails.pan)) {
      errs.pan = 'Enter a valid PAN (Format: ABCDE1234F) for 80G tax benefit';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!amount || parseInt(amount, 10) <= 0) {
        setErrors({ amount: 'Please enter or select a valid amount' });
        return;
      }
      setErrors({});
      setStep(2);
    } else if (step === 2) {
      if (validateStep2()) {
        setStep(3);
      }
    }
  };

  const handleDonateSubmit = async () => {
    setIsProcessing(true);
    setErrors({});
    
    const isScriptLoaded = await loadRazorpay();
    if (!isScriptLoaded) {
      setErrors({ amount: 'Failed to load payment gateway. Please check your internet connection.' });
      setIsProcessing(false);
      return;
    }

    const campaignNames = {
      camp_general: 'General Fund',
      camp_education: 'Vidya Scholarship (Education)',
      camp_healthcare: 'Rural Mobile Clinics (Healthcare)',
      camp_livelihood: 'Women Livelihood Center (Livelihood)',
      camp_environment: 'Green Villages (Solar Grid)'
    };

    const donationAmount = Number(amount);
    
    const options = {
      key: 'rzp_test_dummy_key_replace_me', // Dummy test key, replace with actual Razorpay Key
      amount: donationAmount * 100, // Amount in paise
      currency: 'INR',
      name: 'Annai Therasa Home',
      description: `Donation towards ${campaignNames[campaignId] || 'General Fund'}`,
      image: 'https://cdn-icons-png.flaticon.com/512/3209/3209935.png', // Placeholder logo
      handler: function (response) {
        // Payment success callback
        // response.razorpay_payment_id
        addDonation({
          name: donorDetails.name,
          email: donorDetails.email,
          phone: donorDetails.phone || 'N/A',
          pan: donorDetails.pan,
          amount: donationAmount,
          frequency: frequency,
          paymentMethod: paymentMethod,
          campaignId: campaignId,
          campaignName: campaignNames[campaignId] || 'General Fund',
          transactionId: response.razorpay_payment_id
        });
        setIsProcessing(false);
        setStep(4);
      },
      prefill: {
        name: donorDetails.name,
        email: donorDetails.email,
        contact: donorDetails.phone,
      },
      notes: {
        campaign: campaignNames[campaignId] || 'General Fund',
        frequency: frequency
      },
      theme: {
        color: '#064e3b'
      },
      modal: {
        ondismiss: function() {
          setIsProcessing(false);
        }
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.on('payment.failed', function (response) {
      setErrors({ amount: `Payment Failed: ${response.error.description}` });
      setIsProcessing(false);
    });
    paymentObject.open();
  };

  return (
    <div style={modalStyles.backdrop} onClick={onClose} id="modal-overlay">
      <div style={modalStyles.modal} onClick={(e) => e.stopPropagation()} className="fade-in-el">
        {/* Header */}
        <div style={modalStyles.header}>
          <div style={modalStyles.headerTitle}>
            <Heart size={20} color="var(--primary)" fill="var(--primary)" />
            <h3 style={{ fontSize: '1.4rem' }}>Make a Contribution</h3>
          </div>
          <button onClick={onClose} style={modalStyles.closeBtn}>
            <X size={20} />
          </button>
        </div>

        {/* Progress Bar */}
        {step < 4 && (
          <div style={modalStyles.progressBarContainer}>
            <div style={modalStyles.progressBar(step)} />
          </div>
        )}

        {/* Body Content */}
        <div style={modalStyles.body}>
          
          {/* STEP 1: Select Amount */}
          {step === 1 && (
            <div style={modalStyles.stepContainer}>
              <p style={modalStyles.stepDesc}>Your tax-deductible donation directly supports local schools and health camps.</p>
              
              <div style={modalStyles.freqToggle}>
                <button 
                  onClick={() => setFrequency('one-time')} 
                  style={modalStyles.freqBtn(frequency === 'one-time')}
                >
                  One-Time
                </button>
                <button 
                  onClick={() => setFrequency('monthly')} 
                  style={modalStyles.freqBtn(frequency === 'monthly')}
                >
                  Monthly Gift
                </button>
              </div>

              <div style={modalStyles.presetGrid}>
                {presets.map((val) => (
                  <button
                    key={val}
                    onClick={() => handleAmountSelect(val)}
                    style={modalStyles.presetBtn(amount === val && !isCustom)}
                  >
                    ₹{val}
                  </button>
                ))}
              </div>

              <div style={{ marginTop: '1.25rem' }}>
                <label style={modalStyles.label}>Or Enter Custom Amount (₹)</label>
                <input
                  type="text"
                  placeholder="Enter other amount"
                  value={isCustom ? amount : ''}
                  onChange={handleCustomAmountChange}
                  style={modalStyles.input}
                />
                {errors.amount && <p style={modalStyles.errorText}>{errors.amount}</p>}
              </div>

              <div style={modalStyles.exemptionBanner}>
                <Shield size={16} color="var(--primary)" />
                <span>All contributions are eligible for 50% Tax Exemption under Sec 80G.</span>
              </div>
            </div>
          )}

          {/* STEP 2: Donor Details */}
          {step === 2 && (
            <div style={modalStyles.stepContainer}>
              <h4 style={modalStyles.stepTitle}>Donor Information</h4>
              <p style={modalStyles.stepDesc}>Enter your details below to receive tax-exemption certificates and progress reports.</p>
              
              <div style={modalStyles.formGrid}>
                <div>
                  <label style={modalStyles.label}>Full Name *</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={donorDetails.name}
                    onChange={(e) => setDonorDetails({ ...donorDetails, name: e.target.value })}
                    style={modalStyles.input}
                  />
                  {errors.name && <p style={modalStyles.errorText}>{errors.name}</p>}
                </div>

                <div>
                  <label style={modalStyles.label}>Email Address *</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    value={donorDetails.email}
                    onChange={(e) => setDonorDetails({ ...donorDetails, email: e.target.value })}
                    style={modalStyles.input}
                  />
                  {errors.email && <p style={modalStyles.errorText}>{errors.email}</p>}
                </div>

                <div>
                  <label style={modalStyles.label}>Phone Number *</label>
                  <input
                    type="tel"
                    placeholder="10 digit mobile"
                    value={donorDetails.phone}
                    onChange={(e) => setDonorDetails({ ...donorDetails, phone: e.target.value })}
                    style={modalStyles.input}
                  />
                  {errors.phone && <p style={modalStyles.errorText}>{errors.phone}</p>}
                </div>

                <div>
                  <label style={modalStyles.label}>PAN Card Number (Optional - for tax receipt)</label>
                  <input
                    type="text"
                    placeholder="ABCDE1234F"
                    value={donorDetails.pan}
                    onChange={(e) => setDonorDetails({ ...donorDetails, pan: e.target.value.toUpperCase() })}
                    style={modalStyles.input}
                  />
                  {errors.pan && <p style={modalStyles.errorText}>{errors.pan}</p>}
                </div>

                <div>
                  <label style={modalStyles.label}>Choose Project Cause / Campaign *</label>
                  <select
                    value={campaignId}
                    onChange={(e) => setCampaignId(e.target.value)}
                    style={modalStyles.input}
                  >
                    <option value="camp_general">General Trust Fund</option>
                    <option value="camp_education">Vidya Scholarship (Education)</option>
                    <option value="camp_healthcare">Rural Mobile Clinics (Healthcare)</option>
                    <option value="camp_livelihood">Women Livelihood Center (Livelihood)</option>
                    <option value="camp_environment">Green Villages (Solar Grid)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Payment & Confirm */}
          {step === 3 && (
            <div style={modalStyles.stepContainer}>
              <h4 style={modalStyles.stepTitle}>Complete Your Gift</h4>
              <p style={modalStyles.stepDesc}>Supporting Annai Therasa Home with: <strong style={{color:'var(--primary)'}}>₹{amount} ({frequency})</strong></p>

              <div style={modalStyles.payMethods}>
                <div 
                  onClick={() => setPaymentMethod('upi')}
                  style={modalStyles.payMethodCard(paymentMethod === 'upi')}
                >
                  <div style={modalStyles.radioCircle(paymentMethod === 'upi')} />
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.95rem' }}>UPI / QR Code</strong>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>GPay, PhonePe, Paytm</span>
                  </div>
                </div>

                <div 
                  onClick={() => setPaymentMethod('card')}
                  style={modalStyles.payMethodCard(paymentMethod === 'card')}
                >
                  <div style={modalStyles.radioCircle(paymentMethod === 'card')} />
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.95rem' }}>Credit / Debit Card</strong>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Visa, Mastercard, RuPay</span>
                  </div>
                </div>

                <div 
                  onClick={() => setPaymentMethod('netbank')}
                  style={modalStyles.payMethodCard(paymentMethod === 'netbank')}
                >
                  <div style={modalStyles.radioCircle(paymentMethod === 'netbank')} />
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.95rem' }}>Net Banking</strong>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>All Indian Major Banks</span>
                  </div>
                </div>
              </div>

              {isProcessing && (
                <div style={modalStyles.spinnerContainer}>
                  <div className="spinner" style={modalStyles.spinner} />
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Processing donation secure portal...</span>
                </div>
              )}
            </div>
          )}

          {/* STEP 4: Success Feedback */}
          {step === 4 && (
            <div style={modalStyles.successContainer}>
              <div style={modalStyles.successBadge}>
                <CheckCircle size={48} color="var(--primary)" fill="rgba(6, 78, 59, 0.1)" />
              </div>
              <h4 style={modalStyles.successTitle}>Thank You for Your Generosity!</h4>
              <p style={modalStyles.successDesc}>
                Your payment of <strong>₹{amount}</strong> has been received successfully. A tax-deductible receipt (80G exemption) has been emailed to <strong>{donorDetails.email}</strong>.
              </p>

              <div style={modalStyles.impactSummary}>
                <Sparkles size={20} color="var(--secondary)" />
                <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>
                  This contribution is enough to support {Math.max(1, Math.floor(parseInt(amount, 10) / 1000))} schoolchild's study materials for a full term!
                </span>
              </div>

              <button onClick={onClose} className="btn btn-primary" style={{ width: '100%', marginTop: '1.5rem' }}>
                Close Window
              </button>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        {step < 4 && (
          <div style={modalStyles.footer}>
            {step > 1 ? (
              <button 
                onClick={() => setStep(step - 1)} 
                className="btn btn-outline" 
                style={{ flex: 1 }}
                disabled={isProcessing}
              >
                Back
              </button>
            ) : (
              <div style={{ flex: 1 }} />
            )}
            
            {step < 3 ? (
              <button onClick={handleNextStep} className="btn btn-primary" style={{ flex: 1.5 }}>
                Continue
              </button>
            ) : (
              <button 
                onClick={handleDonateSubmit} 
                className="btn btn-secondary" 
                style={{ flex: 1.5 }}
                disabled={isProcessing}
              >
                Confirm & Pay ₹{amount}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const modalStyles = {
  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000,
    padding: '1rem',
  },
  modal: {
    backgroundColor: 'var(--bg-surface)',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--radius-lg)',
    width: '100%',
    maxWidth: '520px',
    boxShadow: 'var(--shadow-xl)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.25rem 1.5rem',
    borderBottom: '1px solid var(--border-color)',
  },
  headerTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    padding: '0.25rem',
    borderRadius: '50%',
    transition: 'background-color var(--transition-fast)',
    '&:hover': {
      backgroundColor: 'var(--bg-surface-hover)',
    },
  },
  progressBarContainer: {
    width: '100%',
    height: '4px',
    backgroundColor: 'var(--border-color)',
  },
  progressBar: (step) => ({
    width: `${(step / 3) * 100}%`,
    height: '100%',
    backgroundColor: 'var(--primary)',
    transition: 'width var(--transition-normal)',
  }),
  body: {
    padding: '1.5rem',
    overflowY: 'auto',
    maxHeight: '70vh',
  },
  stepContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  stepTitle: {
    fontSize: '1.2rem',
    fontWeight: 700,
  },
  stepDesc: {
    fontSize: '0.9rem',
    color: 'var(--text-secondary)',
    lineHeight: 1.45,
  },
  freqToggle: {
    display: 'flex',
    borderRadius: 'var(--radius-md)',
    backgroundColor: 'var(--bg-surface-hover)',
    padding: '0.25rem',
    border: '1px solid var(--border-color)',
  },
  freqBtn: (isActive) => ({
    flex: 1,
    padding: '0.5rem',
    border: 'none',
    borderRadius: 'var(--radius-sm)',
    background: isActive ? 'var(--bg-surface)' : 'transparent',
    color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
    fontWeight: isActive ? 600 : 500,
    fontSize: '0.85rem',
    cursor: 'pointer',
    boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
    transition: 'all var(--transition-fast)',
  }),
  presetGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '0.5rem',
  },
  presetBtn: (isActive) => ({
    padding: '0.75rem 0.25rem',
    border: '1px solid',
    borderColor: isActive ? 'var(--primary)' : 'var(--border-color)',
    borderRadius: 'var(--radius-md)',
    background: isActive ? 'rgba(6, 78, 59, 0.08)' : 'var(--bg-surface)',
    color: isActive ? 'var(--primary)' : 'var(--text-primary)',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all var(--transition-fast)',
  }),
  label: {
    display: 'block',
    fontSize: '0.85rem',
    fontWeight: 600,
    color: 'var(--text-secondary)',
    marginBottom: '0.35rem',
  },
  input: {
    width: '100%',
    padding: '0.75rem 1rem',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--border-color)',
    backgroundColor: 'var(--bg-surface)',
    color: 'var(--text-primary)',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'border-color var(--transition-fast)',
    '&:focus': {
      borderColor: 'var(--primary)',
    },
  },
  exemptionBanner: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: 'rgba(6, 78, 59, 0.05)',
    padding: '0.75rem 1rem',
    borderRadius: 'var(--radius-md)',
    color: 'var(--primary-dark)',
    fontSize: '0.82rem',
    fontWeight: 500,
    marginTop: '0.5rem',
    border: '1px dashed rgba(6, 78, 59, 0.2)',
  },
  formGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.85rem',
  },
  payMethods: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    marginTop: '0.5rem',
  },
  payMethodCard: (isActive) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem',
    borderRadius: 'var(--radius-md)',
    border: '1px solid',
    borderColor: isActive ? 'var(--primary)' : 'var(--border-color)',
    background: isActive ? 'rgba(6, 78, 59, 0.03)' : 'var(--bg-surface)',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)',
  }),
  radioCircle: (isActive) => ({
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    border: '2px solid',
    borderColor: isActive ? 'var(--primary)' : 'var(--text-muted)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&::after': isActive ? {
      content: '""',
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      backgroundColor: 'var(--primary)',
    } : null,
  }),
  errorText: {
    color: '#ef4444',
    fontSize: '0.78rem',
    marginTop: '0.25rem',
  },
  spinnerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.75rem',
    padding: '1.5rem 0',
  },
  spinner: {
    width: '28px',
    height: '28px',
    border: '3px solid var(--border-color)',
    borderTopColor: 'var(--primary)',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
  successContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: '1rem 0',
  },
  successBadge: {
    marginBottom: '1.25rem',
    animation: 'fadeIn 0.5s ease-out',
  },
  successTitle: {
    fontSize: '1.35rem',
    fontWeight: 700,
    marginBottom: '0.75rem',
  },
  successDesc: {
    fontSize: '0.92rem',
    color: 'var(--text-secondary)',
    lineHeight: 1.5,
    marginBottom: '1.5rem',
  },
  impactSummary: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.65rem',
    backgroundColor: '#fffbeb',
    border: '1px solid #fde68a',
    padding: '1rem',
    borderRadius: 'var(--radius-md)',
    color: '#92400e',
    textAlign: 'left',
  },
  footer: {
    display: 'flex',
    gap: '0.75rem',
    padding: '1.25rem 1.5rem',
    borderTop: '1px solid var(--border-color)',
    backgroundColor: 'var(--bg-surface-hover)',
  },
};

// Add spinner keyframes and radio active styling to style tag dynamically
if (typeof window !== 'undefined') {
  const styleEl = document.createElement('style');
  styleEl.innerHTML = `
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    .pay-active-radio {
      background-color: var(--primary);
    }
  `;
  document.head.appendChild(styleEl);
}

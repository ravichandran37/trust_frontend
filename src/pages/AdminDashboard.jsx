import React, { useState, useEffect } from 'react';
import { 
  Lock, Shield, TrendingUp, MessageSquare, Target, LogOut, 
  Search, Filter, Plus, FileText, CheckCircle, Mail, User, Calendar, 
  CreditCard, Award, Sparkles, Send, RefreshCw, Eye, EyeOff, X, Heart, Download, Users
} from 'lucide-react';
import { 
  getDonations, getQueries, getCampaigns, addDonation, 
  replyToQuery, updateCampaignGoal,
  getGalleryCategories, addGalleryCategory, updateGalleryCategory, deleteGalleryCategory,
  getGalleryItems, addGalleryItem, updateGalleryItem, deleteGalleryItem,
  getServices, addService, updateService, deleteService,
  getMenuOptions, addMenuOption, updateMenuOption, deleteMenuOption,
  getPage, updatePage, uploadImage,
  getBoardMembers, addBoardMember, updateBoardMember, deleteBoardMember
} from '../utils/api';

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('ponnar_adminLoggedIn') === 'true');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState(() => {
    return sessionStorage.getItem('ponnar_adminTab') || 'overview';
  });

  useEffect(() => {
    localStorage.setItem('ponnar_adminLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    sessionStorage.setItem('ponnar_adminTab', activeTab);
  }, [activeTab]);

  useEffect(() => {
    // Lock the main window scrolling when viewing the Admin Dashboard
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Database states
  const [donations, setDonations] = useState([]);
  const [queries, setQueries] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [galleryCategories, setGalleryCategories] = useState([]);
  const [galleryItems, setGalleryItems] = useState([]);
  const [services, setServices] = useState([]);
  const [menuOptions, setMenuOptions] = useState([]);
  const [boardMembers, setBoardMembers] = useState([]);

  // Board Members Modal State
  const [isBoardMemberModalOpen, setIsBoardMemberModalOpen] = useState(false);
  const [editingBoardMember, setEditingBoardMember] = useState(null);
  const [boardMemberForm, setBoardMemberForm] = useState({ name: '', role: '', photo: '' });
  const [boardMemberFile, setBoardMemberFile] = useState(null);

  // About Sections Content State
  const [selectedAboutSection, setSelectedAboutSection] = useState('');
  const [aboutSectionForm, setAboutSectionForm] = useState({ title: '', content: '', heroImage: '', contentImage: '' });
  const [aboutSectionHeroFile, setAboutSectionHeroFile] = useState(null);
  const [aboutSectionContentFile, setAboutSectionContentFile] = useState(null);
  const [isLoadingAboutSection, setIsLoadingAboutSection] = useState(false);


  // Toast Notification State
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filters & Search States
  const [donSearch, setDonSearch] = useState('');
  const [donCampaignFilter, setDonCampaignFilter] = useState('all');
  const [donMethodFilter, setDonMethodFilter] = useState('all');
  const [donFreqFilter, setDonFreqFilter] = useState('all');

  const [queryCategoryFilter, setQueryCategoryFilter] = useState('all');
  const [queryStatusFilter, setQueryStatusFilter] = useState('all');
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [replyText, setReplyText] = useState('');

  // Modals States
  const [isManualDonOpen, setIsManualDonOpen] = useState(false);
  const [manualDonForm, setManualDonForm] = useState({
    name: '',
    email: '',
    phone: '',
    pan: '',
    amount: '',
    frequency: 'one-time',
    paymentMethod: 'netbank',
    campaignId: 'camp_education'
  });
  const [manualDonErrors, setManualDonErrors] = useState({});

  const [receiptDonation, setReceiptDonation] = useState(null);

  // Gallery Categories Modals
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryForm, setCategoryForm] = useState({ id: '', label: '' });

  // Gallery Images Modals
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [editingImage, setEditingImage] = useState(null);
  const [imageForm, setImageForm] = useState({ src: '', category: 'education', title: '', date: '', description: '' });
  const [imageFile, setImageFile] = useState(null);

  // Services Modals
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [serviceForm, setServiceForm] = useState({ 
    category: 'education', title: '', shortDesc: '', longDesc: '', metric: '', image: '', icon: 'Heart', subProjects: '', impactTestimony: '' 
  });

  // Menu Options Modals
  const [isMenuOptionModalOpen, setIsMenuOptionModalOpen] = useState(false);
  const [editingMenuOption, setEditingMenuOption] = useState(null);
  const [menuOptionForm, setMenuOptionForm] = useState({ category: 'about_us', label: '', linkId: '' });

  // Load database on mount and when login state changes
  useEffect(() => {
    if (isLoggedIn) {
      refreshData();
    }
  }, [isLoggedIn]);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 4000);
  };

  const refreshData = async () => {
    setIsRefreshing(true);
    try {
      setDonations(await getDonations());
      setQueries(await getQueries());
      setCampaigns(await getCampaigns());
      setGalleryCategories(await getGalleryCategories());
      setGalleryItems(await getGalleryItems());
      setServices(await getServices());
      setMenuOptions(await getMenuOptions());
      setBoardMembers(await getBoardMembers());
      // showToast('Database synchronized successfully.', 'info');
    } catch (error) {
      console.error('Refresh error:', error);
      showToast('Failed to sync database.', 'error');
    } finally {
      setIsRefreshing(false);
    }
  };

  // Login handler
  const handleLogin = (e) => {
    e.preventDefault();
    if (loginEmail === 'admin@motherteresahome.org' && loginPassword === 'admin123') {
      setIsLoggedIn(true);
      setLoginError('');
      showToast('Logged in successfully as Administrator.');
    } else {
      setLoginError('Invalid administrator credentials.');
    }
  };

  // Log out handler
  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoginEmail('');
    setLoginPassword('');
    showToast('Logged out of Admin Portal.', 'info');
  };

  // Add manual donation
  const handleManualDonSubmit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!manualDonForm.name.trim()) errs.name = 'Full name is required';
    if (!manualDonForm.email.trim()) {
      errs.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(manualDonForm.email)) {
      errs.email = 'Enter a valid email';
    }
    if (!manualDonForm.amount || Number(manualDonForm.amount) <= 0) {
      errs.amount = 'Enter a valid amount (> 0)';
    }

    if (Object.keys(errs).length > 0) {
      setManualDonErrors(errs);
      return;
    }

    const selectedCampObj = campaigns.find(c => c.id === manualDonForm.campaignId);
    
    const donationData = {
      name: manualDonForm.name,
      email: manualDonForm.email,
      phone: manualDonForm.phone || 'N/A',
      pan: manualDonForm.pan.toUpperCase(),
      amount: Number(manualDonForm.amount),
      frequency: manualDonForm.frequency,
      paymentMethod: manualDonForm.paymentMethod,
      campaignId: manualDonForm.campaignId,
      campaignName: selectedCampObj ? selectedCampObj.name : 'General Fund'
    };

    await addDonation(donationData);
    await refreshData();
    setIsManualDonOpen(false);
    setManualDonForm({
      name: '',
      email: '',
      phone: '',
      pan: '',
      amount: '',
      frequency: 'one-time',
      paymentMethod: 'netbank',
      campaignId: 'camp_education'
    });
    setManualDonErrors({});
    showToast(`Successfully added offline donation of ₹${donationData.amount} from ${donationData.name}.`);
  };

  const handleDownloadCSV = () => {
    if (filteredDonations.length === 0) {
      showToast('No donations to export.', 'error');
      return;
    }
    const headers = ['Donation ID', 'Date', 'Name', 'Email', 'Phone', 'PAN', 'Amount', 'Payment Method', 'Frequency', 'Campaign ID', 'Campaign Name', '80G Receipt Status'];
    const rows = filteredDonations.map(don => [
      don.id,
      new Date(don.date).toISOString().split('T')[0],
      `"${don.name}"`,
      don.email,
      don.phone || '',
      don.pan || '',
      don.amount,
      don.paymentMethod,
      don.frequency,
      don.campaignId,
      `"${don.campaignName}"`,
      don.receiptSent ? 'Sent' : 'Pending'
    ]);
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `donations_export_${new Date().getTime()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Donation database exported to CSV successfully.');
  };

  // Reply to inquiry
  const handleSendReply = async (queryId) => {
    if (!replyText.trim()) {
      showToast('Reply message cannot be empty', 'error');
      return;
    }

    const updated = await replyToQuery(queryId, replyText);
    await refreshData();
    setSelectedQuery(updated);
    setReplyText('');
    showToast('Reply saved and sent to user email (simulated).');
  };

  // Update campaign goals
  const handleGoalUpdate = async (campaignId, newGoal) => {
    if (!newGoal || Number(newGoal) <= 1000) {
      showToast('Campaign target must be greater than ₹1,000', 'error');
      return;
    }
    await updateCampaignGoal(campaignId, newGoal);
    await refreshData();
    showToast('Campaign target updated successfully.');
  };

  // --- Handlers for Gallery Categories ---
  const handleSaveCategory = async (e) => {
    e.preventDefault();
    if (!categoryForm.label.trim()) { showToast('Category label is required', 'error'); return; }
    
    if (editingCategory) {
      await updateGalleryCategory(editingCategory.id, categoryForm);
      showToast('Category updated successfully.');
    } else {
      const newId = categoryForm.label.toLowerCase().replace(/[^a-z0-9]/g, '');
      await addGalleryCategory({ ...categoryForm, id: newId || 'cat_' + Date.now() });
      showToast('Category added successfully.');
    }
    await refreshData();
    setIsCategoryModalOpen(false);
  };
  const handleDeleteCategory = async (id) => {
    if (confirm('Are you sure you want to delete this category?')) {
      await deleteGalleryCategory(id);
      await refreshData();
      showToast('Category deleted successfully.');
    }
  };

  // --- Handlers for Gallery Images ---
  const handleSaveImage = async (e) => {
    e.preventDefault();
    if (!imageForm.title.trim()) { showToast('Image title is required', 'error'); return; }
    if (!imageForm.src.trim() && !imageFile) { showToast('Please upload an image or provide a URL', 'error'); return; }
    
    try {
      let finalSrc = imageForm.src;
      
      // If a new file was selected, upload it first
      if (imageFile) {
        const uploadRes = await uploadImage(imageFile);
        if (uploadRes && uploadRes.url) {
          finalSrc = uploadRes.url;
        }
      }
      
      const payload = { ...imageForm, src: finalSrc };

      if (editingImage) {
        await updateGalleryItem(editingImage.id, payload);
        showToast('Image details updated successfully.');
      } else {
        await addGalleryItem(payload);
        showToast('Image added successfully.');
      }
      
      await refreshData();
      setIsImageModalOpen(false);
      setImageFile(null);
    } catch (err) {
      console.error(err);
      showToast('Error saving image. Check if file is too large.', 'error');
    }
  };
  const handleDeleteImage = async (id) => {
    if (confirm('Are you sure you want to delete this image?')) {
      await deleteGalleryItem(id);
      await refreshData();
      showToast('Image deleted successfully.');
    }
  };

  // --- Handlers for Services ---
  const handleSaveService = async (e) => {
    e.preventDefault();
    if (!serviceForm.title.trim() || !serviceForm.shortDesc.trim()) { showToast('Service Title and Short Description are required', 'error'); return; }
    
    // Parse subProjects if it's a string (from textarea)
    let finalServiceForm = { ...serviceForm };
    if (typeof finalServiceForm.subProjects === 'string') {
      finalServiceForm.subProjects = finalServiceForm.subProjects.split(',').map(s => s.trim()).filter(Boolean);
    }

    if (editingService) {
      await updateService(editingService.id, finalServiceForm);
      showToast('Service updated successfully.');
    } else {
      await addService(finalServiceForm);
      showToast('Service added successfully.');
    }
    await refreshData();
    setIsServiceModalOpen(false);
  };
  const handleDeleteService = async (id) => {
    if (confirm('Are you sure you want to delete this service?')) {
      await deleteService(id);
      await refreshData();
      showToast('Service deleted successfully.');
    }
  };

  // --- Handlers for Menu Options ---
  const handleSaveMenuOption = async (e) => {
    e.preventDefault();
    if (!menuOptionForm.label.trim()) { showToast('Menu Option Label is required', 'error'); return; }
    
    if (!menuOptionForm.linkId.trim()) {
      menuOptionForm.linkId = menuOptionForm.label.toLowerCase().replace(/[^a-z0-9]/g, '-');
    }

    if (editingMenuOption) {
      await updateMenuOption(editingMenuOption.id, menuOptionForm);
      showToast('Menu option updated successfully.');
    } else {
      await addMenuOption(menuOptionForm);
      showToast('Menu option added successfully.');
    }
    await refreshData();
    setIsMenuOptionModalOpen(false);
  };
  const handleDeleteMenuOption = async (optionId) => {
    if (window.confirm('Are you sure you want to delete this menu option?')) {
      await deleteMenuOption(optionId);
      await refreshData();
      showToast('Menu option deleted successfully.');
    }
  };

  // --- Handlers for Board Members ---
  const handleEditBoardMember = (member) => {
    setEditingBoardMember(member);
    setBoardMemberForm({ name: member.name, role: member.role, photo: member.photo || '' });
    setBoardMemberFile(null);
    setIsBoardMemberModalOpen(true);
  };

  const handleSaveBoardMember = async (e) => {
    e.preventDefault();
    try {
      let finalPhoto = boardMemberForm.photo;
      if (boardMemberFile) {
        const uploadRes = await uploadImage(boardMemberFile);
        if (uploadRes && uploadRes.url) {
          finalPhoto = uploadRes.url;
        }
      }

      const payload = { ...boardMemberForm, photo: finalPhoto };

      if (editingBoardMember) {
        await updateBoardMember(editingBoardMember.id, payload);
        showToast('Board member updated successfully!');
      } else {
        await addBoardMember(payload);
        showToast('Board member added successfully!');
      }
      setIsBoardMemberModalOpen(false);
      setBoardMemberForm({ name: '', role: '', photo: '' });
      setBoardMemberFile(null);
      await refreshData();
    } catch (err) {
      console.error(err);
      showToast('Error saving board member', 'error');
    }
  };

  // --- Handlers for About Sections Content ---
  const handleSelectAboutSection = async (pageId) => {
    setSelectedAboutSection(pageId);
    if (!pageId) {
      setAboutSectionForm({ title: '', content: '', heroImage: '', contentImage: '' });
      return;
    }
    
    setIsLoadingAboutSection(true);
    try {
      const page = await getPage(pageId);
      if (page) {
        setAboutSectionForm({ 
          title: page.title, 
          content: page.content, 
          heroImage: page.heroImage || '',
          contentImage: page.contentImage || ''
        });
      } else {
        const opt = menuOptions.find(o => o.linkId === pageId);
        setAboutSectionForm({ title: opt ? opt.label : '', content: '', heroImage: '', contentImage: '' });
      }
    } catch (err) {
      console.error(err);
      showToast('Error loading section content', 'error');
    } finally {
      setIsLoadingAboutSection(false);
    }
  };

  const handleSaveAboutSection = async (e) => {
    e.preventDefault();
    if (!selectedAboutSection) return;
    
    try {
      let finalHeroImage = aboutSectionForm.heroImage;
      if (aboutSectionHeroFile) {
        const uploadRes = await uploadImage(aboutSectionHeroFile);
        if (uploadRes && uploadRes.url) {
          finalHeroImage = uploadRes.url;
        }
      }

      let finalContentImage = aboutSectionForm.contentImage;
      if (aboutSectionContentFile) {
        const uploadRes = await uploadImage(aboutSectionContentFile);
        if (uploadRes && uploadRes.url) {
          finalContentImage = uploadRes.url;
        }
      }
      
      await updatePage(selectedAboutSection, { 
        ...aboutSectionForm, 
        heroImage: finalHeroImage,
        contentImage: finalContentImage
      });
      setAboutSectionHeroFile(null);
      setAboutSectionContentFile(null);
      showToast('Section content saved successfully!');
    } catch (err) {
      console.error(err);
      showToast('Error saving section', 'error');
    }
  };


  const handleDeleteBoardMember = async (id) => {
    if (window.confirm('Are you sure you want to remove this board member?')) {
      try {
        await deleteBoardMember(id);
        await refreshData();
        showToast('Board member removed.');
      } catch (err) {
        console.error(err);
        showToast('Error removing board member', 'error');
      }
    }
  };

  // Calculations for Metrics
  const totalRaised = donations.reduce((sum, item) => sum + Number(item.amount), 0);
  const totalTransactions = donations.length;
  const avgGift = totalTransactions > 0 ? Math.round(totalRaised / totalTransactions) : 0;
  const pendingQueries = queries.filter(q => q.status === 'Pending').length;
  const volunteerQueries = queries.filter(q => q.category === 'Volunteering').length;

  // Filtered Donations list
  const filteredDonations = donations.filter(don => {
    const matchSearch = 
      don.name.toLowerCase().includes(donSearch.toLowerCase()) || 
      don.email.toLowerCase().includes(donSearch.toLowerCase());
    const matchCampaign = donCampaignFilter === 'all' || don.campaignId === donCampaignFilter;
    const matchMethod = donMethodFilter === 'all' || don.paymentMethod === donMethodFilter;
    const matchFreq = donFreqFilter === 'all' || don.frequency === donFreqFilter;
    return matchSearch && matchCampaign && matchMethod && matchFreq;
  });

  // Filtered Queries list
  const filteredQueries = queries.filter(q => {
    const matchCategory = queryCategoryFilter === 'all' || q.category === queryCategoryFilter;
    const matchStatus = queryStatusFilter === 'all' || q.status === queryStatusFilter;
    return matchCategory && matchStatus;
  });

  // Generate Date Labels & Data Points for Chart (last 7 days/items)
  const chartDonations = [...donations].reverse(); // oldest first
  const chartLabels = chartDonations.slice(-6).map(d => {
    const dateObj = new Date(d.date);
    return dateObj.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  });
  const chartData = chartDonations.slice(-6).map(d => d.amount);

  return (
    <div style={styles.container}>
      {/* Toast notification banner */}
      {toast.show && (
        <div style={styles.toast(toast.type)}>
          <CheckCircle size={18} />
          <span>{toast.message}</span>
        </div>
      )}

      {!isLoggedIn ? (
        /* LOGIN SCREEN */
        <div style={styles.loginWrapper} className="mesh-bg">
          <div style={styles.loginCard} className="card-glass">
            <div style={styles.loginHeader}>
              <div style={styles.shieldIcon}>
                <Shield size={32} color="#ffffff" fill="var(--primary)" />
              </div>
              <h2 style={styles.loginTitle}>Admin Console</h2>
              <p style={styles.loginDesc}>Authorized security login. Enter administrative credentials.</p>
            </div>

            <form onSubmit={handleLogin} style={styles.loginForm}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Admin Email Address</label>
                <input 
                  type="email" 
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  style={styles.input} 
                  required
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Access Password</label>
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    style={{ ...styles.input, width: '100%', paddingRight: '40px' }} 
                    required
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)} 
                    style={{ position: 'absolute', right: '10px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {loginError && <p style={styles.loginError}>{loginError}</p>}

              <button type="submit" className="btn btn-primary" style={styles.loginBtn}>
                <Lock size={16} />
                <span>Verify & Enter</span>
              </button>
            </form>

            <div style={styles.loginTip}>
              <Sparkles size={14} color="var(--secondary)" />
              <span>Demo Login: <strong>admin@motherteresahome.org</strong> / <strong>admin123</strong></span>
            </div>
          </div>
        </div>
      ) : (
        /* MAIN DASHBOARD PANEL */
        <div style={styles.dashboardLayout}>
          
          {/* SIDEBAR NAVIGATION */}
          <aside style={styles.sidebar}>
            <div style={styles.sidebarBrand}>
              <img src="/logo.png" alt="Logo" style={{ height: '45px', width: 'auto', objectFit: 'contain' }} />
              <div>
                <h3 style={styles.brandTitle}>Admin Panel</h3>
              </div>
            </div>

            <nav style={styles.sidebarNav}>
              <button 
                onClick={() => { setActiveTab('overview'); refreshData(); }}
                style={styles.sidebarLink(activeTab === 'overview')}
              >
                <TrendingUp size={18} />
                <span>Insights Dashboard</span>
              </button>

              <button 
                onClick={() => { setActiveTab('donations'); refreshData(); }}
                style={styles.sidebarLink(activeTab === 'donations')}
              >
                <CreditCard size={18} />
                <span>Donation Database</span>
                <span style={styles.badgeCount}>{donations.length}</span>
              </button>

              <button 
                onClick={() => { setActiveTab('inquiries'); refreshData(); }}
                style={styles.sidebarLink(activeTab === 'inquiries')}
              >
                <MessageSquare size={18} />
                <span>Inquiries Inbox</span>
                {pendingQueries > 0 && <span style={styles.badgePending}>{pendingQueries}</span>}
              </button>

              <button 
                onClick={() => { setActiveTab('campaigns'); refreshData(); }}
                style={styles.sidebarLink(activeTab === 'campaigns')}
              >
                <Target size={18} />
                <span>Campaign Manager</span>
              </button>

              <button 
                onClick={() => { setActiveTab('galleryCategories'); refreshData(); }}
                style={styles.sidebarLink(activeTab === 'galleryCategories')}
              >
                <Filter size={18} />
                <span>Gallery Categories</span>
              </button>

              <button 
                onClick={() => { setActiveTab('galleryImages'); refreshData(); }}
                style={styles.sidebarLink(activeTab === 'galleryImages')}
              >
                <Search size={18} />
                <span>Gallery Images</span>
              </button>

              <button onClick={() => { setActiveTab('services'); refreshData(); }} style={styles.sidebarLink(activeTab === 'services')}>
                <Plus size={18} /> <span>Services Manager</span>
              </button>
              <button onClick={() => setActiveTab('aboutSections')} style={styles.sidebarLink(activeTab === 'aboutSections')}>
                <FileText size={18} /> <span>About Sections</span>
              </button>
              <button onClick={() => { setActiveTab('boardMembers'); refreshData(); }} style={styles.sidebarLink(activeTab === 'boardMembers')}>
                <Users size={18} /> <span>Board Members</span>
              </button>
            </nav>

          </aside>

          {/* MAIN BODY AREA */}
          <main style={styles.mainContent}>
            
            {/* TOP HEADER */}
            <header style={styles.topHeader}>
              <div>
                <span style={styles.headerSubtitle}>Console / {activeTab.toUpperCase()}</span>
                <h1 style={styles.headerTitleText}>
                  {activeTab === 'overview' && 'Dashboard Overview'}
                  {activeTab === 'donations' && 'Donation Register'}
                  {activeTab === 'inquiries' && 'Support Inquiries'}
                  {activeTab === 'campaigns' && 'Campaign Targets'}
                  {activeTab === 'galleryCategories' && 'Gallery Categories'}
                  {activeTab === 'galleryImages' && 'Gallery Images'}
                  {activeTab === 'services' && 'Services Configuration'}
                  {activeTab === 'aboutSections' && 'About Sections Content'}
                  {activeTab === 'boardMembers' && 'Board Members'}
                </h1>
              </div>

              <div style={styles.headerActions}>
                <div style={styles.adminUser}>
                  <div style={styles.userAvatar}>A</div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.88rem' }}>Administrator</strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>System Auditor</span>
                  </div>
                </div>

                <button onClick={refreshData} style={styles.refreshBtn} title="Sync database data">
                  <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
                </button>
                <button onClick={handleLogout} style={styles.headerLogoutBtn} title="Log Out Console">
                  <LogOut size={16} />
                </button>
              </div>
            </header>

            {/* TAB CONTENTS */}
            
            {/* 1. OVERVIEW & ANALYTICS TAB */}
            {activeTab === 'overview' && (
              <div style={styles.tabContent}>
                {/* KPI Metrics row */}
                <div style={styles.metricsGrid}>
                  <div style={styles.kpiCard} className="card-glass">
                    <div style={styles.kpiHeader}>
                      <span style={styles.kpiLabel}>Total Donations Raised</span>
                      <div style={styles.kpiIcon('primary')}><Award size={20} /></div>
                    </div>
                    <h2 style={styles.kpiValue}>₹{totalRaised.toLocaleString('en-IN')}</h2>
                    <div style={styles.kpiGrowth}>
                      <span style={styles.growthText}>+14.2%</span>
                      <span style={{ color: 'var(--text-muted)' }}> vs last month</span>
                    </div>
                  </div>

                  <div style={styles.kpiCard} className="card-glass">
                    <div style={styles.kpiHeader}>
                      <span style={styles.kpiLabel}>Total Transactions</span>
                      <div style={styles.kpiIcon('secondary')}><CreditCard size={20} /></div>
                    </div>
                    <h2 style={styles.kpiValue}>{totalTransactions}</h2>
                    <div style={styles.kpiGrowth}>
                      <span style={styles.growthText}>{donations.filter(d => d.frequency === 'monthly').length} recurring</span>
                      <span style={{ color: 'var(--text-muted)' }}> monthly sponsors</span>
                    </div>
                  </div>

                  <div style={styles.kpiCard} className="card-glass">
                    <div style={styles.kpiHeader}>
                      <span style={styles.kpiLabel}>Average Gift Value</span>
                      <div style={styles.kpiIcon('accent')}><TrendingUp size={20} /></div>
                    </div>
                    <h2 style={styles.kpiValue}>₹{avgGift.toLocaleString('en-IN')}</h2>
                    <div style={styles.kpiGrowth}>
                      <span style={{ color: 'var(--primary-light)', fontWeight: 600 }}>100% Tax-exempt</span>
                      <span style={{ color: 'var(--text-muted)' }}> Sec 80G receipts</span>
                    </div>
                  </div>

                  <div style={styles.kpiCard} className="card-glass">
                    <div style={styles.kpiHeader}>
                      <span style={styles.kpiLabel}>Pending Inquiries</span>
                      <div style={styles.kpiIcon('warning')}><MessageSquare size={20} /></div>
                    </div>
                    <h2 style={{ ...styles.kpiValue, color: pendingQueries > 0 ? '#d97706' : 'inherit' }}>{pendingQueries}</h2>
                    <div style={styles.kpiGrowth}>
                      <span style={{ color: '#0d9488', fontWeight: 600 }}>{volunteerQueries} volunteering</span>
                      <span style={{ color: 'var(--text-muted)' }}> applications</span>
                    </div>
                  </div>
                </div>

                {/* Charts & Graphics Section */}
                <div style={styles.dashboardGrid}>
                  
                  {/* Donation trend SVG bar chart */}
                  <div style={{ ...styles.gridCard, flex: 2 }} className="card-glass">
                    <h3 style={styles.cardTitle}>Recent Donation Transactions Trend</h3>
                    <p style={styles.cardDesc}>Visualized breakdown of recent payments logged in database</p>
                    
                    <div style={styles.chartWrapper}>
                      {chartData.length > 0 ? (
                        <div style={styles.barChartContainer}>
                          {chartData.map((val, idx) => {
                            const maxVal = Math.max(...chartData, 5000);
                            const heightPercent = `${Math.max(15, (val / maxVal) * 80)}%`;
                            return (
                              <div key={idx} style={styles.chartBarCol}>
                                <div style={styles.chartBarValue}>₹{val.toLocaleString('en-IN')}</div>
                                <div style={styles.chartBarOuter}>
                                  <div style={{ ...styles.chartBarInner, height: heightPercent }} />
                                </div>
                                <div style={styles.chartBarLabel}>{chartLabels[idx] || `Tx-${idx+1}`}</div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div style={styles.noData}>No recent donation transactions.</div>
                      )}
                    </div>
                  </div>

                  {/* Fund Allocation / Campaigns overview */}
                  <div style={{ ...styles.gridCard, flex: 1.2 }} className="card-glass">
                    <h3 style={styles.cardTitle}>Campaign Distributions</h3>
                    <p style={styles.cardDesc}>Funds raised vs. total campaign milestones</p>
                    
                    <div style={styles.campaignListOverview}>
                      {campaigns.map(camp => {
                        const pct = Math.min(100, Math.round((camp.raised / camp.target) * 100));
                        return (
                          <div key={camp.id} style={styles.campProgressItem}>
                            <div style={styles.campProgressMeta}>
                              <strong style={{ fontSize: '0.9rem' }}>{camp.name.split(' (')[0]}</strong>
                              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{pct}%</span>
                            </div>
                            <div style={styles.campProgressBarOuter}>
                              <div style={{ ...styles.campProgressBarInner(camp.id), width: `${pct}%` }} />
                            </div>
                            <div style={styles.campProgressSums}>
                              <span>₹{camp.raised.toLocaleString('en-IN')} raised</span>
                              <span style={{ color: 'var(--text-muted)' }}>Target: ₹{camp.target.toLocaleString('en-IN')}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Recent Activities Panel */}
                <div style={styles.wideCard} className="card-glass">
                  <h3 style={styles.cardTitle}>Recent Audit Transactions Log</h3>
                  <div style={styles.activityList}>
                    {donations.slice(0, 4).map((don) => (
                      <div key={don.id} style={styles.activityItem}>
                        <div style={styles.activityIcon}>
                          <User size={16} color="var(--primary)" />
                        </div>
                        <div style={styles.activityBody}>
                          <span>
                            <strong>{don.name}</strong> contributed <strong>₹{don.amount.toLocaleString('en-IN')}</strong> to the <em>{don.campaignName}</em> project.
                          </span>
                          <span style={styles.activityTime}>
                            {new Date(don.date).toLocaleString(undefined, { 
                              month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
                            })} &bull; {don.paymentMethod.toUpperCase()} &bull; {don.frequency}
                          </span>
                        </div>
                        <button 
                          onClick={() => setReceiptDonation(don)}
                          style={styles.actionBtnSmall}
                          title="Generate Tax Receipt"
                        >
                          <FileText size={14} />
                          <span>Receipt</span>
                        </button>
                      </div>
                    ))}
                    {queries.slice(0, 2).map((q) => (
                      <div key={q.id} style={styles.activityItem}>
                        <div style={{ ...styles.activityIcon, backgroundColor: '#fef3c7' }}>
                          <MessageSquare size={16} color="#d97706" />
                        </div>
                        <div style={styles.activityBody}>
                          <span>
                            Support query regarding <strong>{q.category}</strong> received from <strong>{q.name}</strong>.
                          </span>
                          <span style={styles.activityTime}>
                            {new Date(q.date).toLocaleString(undefined, { 
                              month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
                            })} &bull; Status: <strong style={{ color: q.status === 'Pending' ? '#b45309' : '#047857' }}>{q.status}</strong>
                          </span>
                        </div>
                        <button 
                          onClick={() => { setSelectedQuery(q); setActiveTab('inquiries'); }}
                          style={styles.actionBtnSmall}
                          title="View Inquiry"
                        >
                          <Send size={14} />
                          <span>Inbox</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 2. DONATION DATABASE TAB */}
            {activeTab === 'donations' && (
              <div style={styles.tabContent}>
                {/* Search & Filter tools */}
                <div style={styles.filtersBar} className="card-glass">
                  <div style={styles.searchBox}>
                    <Search size={18} color="var(--text-muted)" style={styles.searchIcon} />
                    <input 
                      type="text" 
                      placeholder="Search donor name, email..." 
                      value={donSearch}
                      onChange={(e) => setDonSearch(e.target.value)}
                      style={styles.searchInput}
                    />
                  </div>

                  <div style={styles.filterDropdowns}>
                    <div style={styles.selectWrapper}>
                      <Filter size={14} color="var(--text-muted)" />
                      <select 
                        value={donCampaignFilter}
                        onChange={(e) => setDonCampaignFilter(e.target.value)}
                        style={styles.filterSelect}
                      >
                        <option value="all">All Campaigns</option>
                        {campaigns.map(c => <option key={c.id} value={c.id}>{c.name.split(' (')[0]}</option>)}
                      </select>
                    </div>

                    <div style={styles.selectWrapper}>
                      <select 
                        value={donMethodFilter}
                        onChange={(e) => setDonMethodFilter(e.target.value)}
                        style={styles.filterSelect}
                      >
                        <option value="all">All Payment Methods</option>
                        <option value="upi">UPI / QR Code</option>
                        <option value="card">Credit/Debit Card</option>
                        <option value="netbank">Net Banking</option>
                        <option value="cash">Offline Cash</option>
                        <option value="cheque">Cheque Deposit</option>
                      </select>
                    </div>

                    <div style={styles.selectWrapper}>
                      <select 
                        value={donFreqFilter}
                        onChange={(e) => setDonFreqFilter(e.target.value)}
                        style={styles.filterSelect}
                      >
                        <option value="all">All Frequencies</option>
                        <option value="one-time">One-Time</option>
                        <option value="monthly">Monthly Gift</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button 
                      onClick={handleDownloadCSV} 
                      className="btn btn-outline"
                      style={styles.addDonBtn}
                      title="Download Donation Data as CSV"
                    >
                      <Download size={16} />
                      <span>Export CSV</span>
                    </button>
                    <button 
                      onClick={() => setIsManualDonOpen(true)} 
                      className="btn btn-primary"
                      style={styles.addDonBtn}
                    >
                      <Plus size={16} />
                      <span>Log offline donation</span>
                    </button>
                  </div>
                </div>

                {/* Table View */}
                <div style={styles.tableCard} className="card-glass">
                  <div style={{ overflowX: 'auto' }}>
                    <table style={styles.table}>
                      <thead>
                        <tr>
                          <th style={styles.th}>Donor Info</th>
                          <th style={styles.th}>Date Registered</th>
                          <th style={styles.th}>Campaign Category</th>
                          <th style={styles.th}>Exemption (80G)</th>
                          <th style={styles.th}>Gateway</th>
                          <th style={{...styles.th, textAlign: 'right'}}>Amount</th>
                          <th style={{...styles.th, textAlign: 'center'}}>Receipt</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredDonations.length > 0 ? (
                          filteredDonations.map((don) => (
                            <tr key={don.id} style={styles.tr}>
                              <td style={styles.td}>
                                <div>
                                  <strong style={styles.donorName}>{don.name}</strong>
                                  <span style={styles.donorEmail}>{don.email}</span>
                                  {don.phone && <span style={styles.donorPhone}>{don.phone}</span>}
                                </div>
                              </td>
                              <td style={styles.td}>
                                <div style={styles.dateCell}>
                                  <Calendar size={14} color="var(--text-muted)" />
                                  <span>{new Date(don.date).toLocaleDateString(undefined, { 
                                    year: 'numeric', month: 'short', day: 'numeric' 
                                  })}</span>
                                </div>
                              </td>
                              <td style={styles.td}>
                                <span style={styles.campBadge}>{don.campaignName ? don.campaignName.split(' (')[0] : 'General'}</span>
                              </td>
                              <td style={styles.td}>
                                {don.pan ? (
                                  <span style={styles.panBadge}>{don.pan}</span>
                                ) : (
                                  <span style={styles.panNone}>None provided</span>
                                )}
                              </td>
                              <td style={styles.td}>
                                <span style={styles.methodBadge}>
                                  {don.paymentMethod.toUpperCase()} ({don.frequency === 'monthly' ? 'M' : '1T'})
                                </span>
                              </td>
                              <td style={{...styles.td, textAlign: 'right'}}>
                                <strong style={styles.amountText}>₹{don.amount.toLocaleString('en-IN')}</strong>
                              </td>
                              <td style={{...styles.td, textAlign: 'center'}}>
                                <button 
                                  onClick={() => setReceiptDonation(don)}
                                  style={styles.actionBtnSmall}
                                >
                                  <Eye size={14} />
                                  <span>Receipt</span>
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="7" style={styles.noResults}>
                              No matching donation entries found.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* 3. INQUIRIES INBOX TAB */}
            {activeTab === 'inquiries' && (
              <div style={styles.tabContent}>
                <div style={styles.inboxLayout}>
                  
                  {/* Inbox Sidebar List */}
                  <div style={styles.inboxSidebar} className="card-glass">
                    <div style={styles.inboxFilterHeader}>
                      <div style={styles.selectWrapperFull}>
                        <select 
                          value={queryCategoryFilter}
                          onChange={(e) => setQueryCategoryFilter(e.target.value)}
                          style={styles.filterSelectFull}
                        >
                          <option value="all">All Inquiries</option>
                          <option value="CSR Sponsorship">CSR sponsorship</option>
                          <option value="Volunteering">Volunteering</option>
                          <option value="Tax Receipt">Tax certificates</option>
                          <option value="General">General / Other</option>
                        </select>
                      </div>

                      <div style={styles.selectWrapperFull}>
                        <select 
                          value={queryStatusFilter}
                          onChange={(e) => setQueryStatusFilter(e.target.value)}
                          style={styles.filterSelectFull}
                        >
                          <option value="all">All Statuses</option>
                          <option value="Pending">Pending Review</option>
                          <option value="Replied">Replied</option>
                        </select>
                      </div>
                    </div>

                    <div style={styles.inboxList}>
                      {filteredQueries.length > 0 ? (
                        filteredQueries.map((q) => (
                          <div 
                            key={q.id}
                            onClick={() => { setSelectedQuery(q); setReplyText(''); }}
                            style={styles.inboxItem(selectedQuery && selectedQuery.id === q.id, q.status === 'Pending')}
                          >
                            <div style={styles.inboxItemHeader}>
                              <strong style={styles.inboxItemName}>{q.name}</strong>
                              <span style={styles.inboxItemDate}>
                                {new Date(q.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                              </span>
                            </div>
                            <span style={styles.inboxItemSubject}>{q.subject}</span>
                            <div style={styles.inboxItemFooter}>
                              <span style={styles.inboxItemCat}>{q.category}</span>
                              <span style={styles.statusLabel(q.status)}>{q.status}</span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div style={styles.inboxEmpty}>No inquiries in this category.</div>
                      )}
                    </div>
                  </div>

                  {/* Inbox Message Details Detail Panel */}
                  <div style={styles.inboxDetails} className="card-glass">
                    {selectedQuery ? (
                      <div style={styles.detailsContainer}>
                        <div style={styles.detailsHeader}>
                          <div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{selectedQuery.subject}</h3>
                            <div style={styles.detailsMeta}>
                              <User size={14} color="var(--text-muted)" />
                              <strong style={{ color: 'var(--text-primary)' }}>{selectedQuery.name}</strong>
                              <span style={{ color: 'var(--text-muted)' }}>&bull; {selectedQuery.email}</span>
                            </div>
                          </div>
                          <span style={styles.statusLabel(selectedQuery.status)}>{selectedQuery.status}</span>
                        </div>

                        <div style={styles.detailsTime}>
                          <Calendar size={14} color="var(--text-muted)" />
                          <span>Received: {new Date(selectedQuery.date).toLocaleString()}</span>
                          <span style={{ marginLeft: '1rem', color: 'var(--primary-light)' }}>Category: {selectedQuery.category}</span>
                        </div>

                        <div style={styles.messageBox}>
                          <p style={{ whiteSpace: 'pre-wrap', fontSize: '0.98rem', color: 'var(--text-primary)' }}>
                            {selectedQuery.message}
                          </p>
                        </div>

                        {selectedQuery.status === 'Replied' ? (
                          <div style={styles.replyBox}>
                            <h4 style={styles.replyTitle}>
                              <CheckCircle size={16} color="var(--primary)" />
                              <span>Administrator Reply Sent</span>
                            </h4>
                            <p style={{ whiteSpace: 'pre-wrap', fontStyle: 'italic' }}>
                              "{selectedQuery.reply}"
                            </p>
                          </div>
                        ) : (
                          <div style={styles.replyForm}>
                            <label style={styles.label}>Administrative Reply Message</label>
                            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                              Replying will resolve this support ticket, change status to 'Replied' and simulate emailing.
                            </p>
                            <textarea
                              rows="4"
                              placeholder="Write reply instructions, details, or volunteer onboarding templates..."
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              style={styles.textarea}
                            />
                            <button 
                              onClick={() => handleSendReply(selectedQuery.id)} 
                              className="btn btn-primary"
                              style={{ alignSelf: 'flex-start', marginTop: '0.75rem' }}
                            >
                              <Send size={16} />
                              <span>Send Official Reply</span>
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div style={styles.detailsPlaceholder}>
                        <Mail size={48} color="var(--text-muted)" style={{ marginBottom: '1rem' }} />
                        <h3>Inquiry Message Reader</h3>
                        <p>Select a message from the left inbox list to view details and send official responses.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* 4. CAMPAIGN MANAGER TAB */}
            {activeTab === 'campaigns' && (
              <div style={styles.tabContent}>
                <div style={styles.campaignList}>
                  {campaigns.map((camp) => {
                    const pct = Math.min(100, Math.round((camp.raised / camp.target) * 100));
                    return (
                      <div key={camp.id} style={styles.campManagerCard} className="card-glass">
                        <div style={styles.campHeader}>
                          <div>
                            <span style={styles.campBadge}>{camp.category}</span>
                            <h3 style={styles.campNameText}>{camp.name}</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginTop: '0.2rem' }}>
                              {camp.description}
                            </p>
                          </div>
                          
                          {/* Circle Progress Indicator */}
                          <div style={styles.circleProgressWrapper}>
                            <svg width="60" height="60" viewBox="0 0 36 36" style={styles.progressCircle}>
                              <path
                                style={styles.circleBg}
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              />
                              <path
                                style={styles.circleDash(pct, camp.id)}
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              />
                              <text x="18" y="20.35" style={styles.circleText}>{pct}%</text>
                            </svg>
                          </div>
                        </div>

                        <div style={styles.campStatsGrid}>
                          <div>
                            <span style={styles.statLabel}>Funds Raised</span>
                            <strong style={styles.statValue}>₹{camp.raised.toLocaleString('en-IN')}</strong>
                          </div>
                          <div>
                            <span style={styles.statLabel}>Active Target Goal</span>
                            <strong style={styles.statValue}>₹{camp.target.toLocaleString('en-IN')}</strong>
                          </div>
                          <div>
                            <span style={styles.statLabel}>Donation Distribution</span>
                            <span style={{ ...styles.statValue, fontSize: '1rem', color: 'var(--primary-light)' }}>
                              {donations.filter(d => d.campaignId === camp.id).length} individual gifts
                            </span>
                          </div>
                        </div>

                        {/* Adjust Goal form inline */}
                        <div style={styles.campActionForm}>
                          <label style={{ ...styles.label, margin: 0, fontSize: '0.85rem' }}>Update Funding Target (₹)</label>
                          <div style={styles.inlineForm}>
                            <input 
                              type="number"
                              placeholder={camp.target}
                              defaultValue={camp.target}
                              onBlur={(e) => {
                                if (Number(e.target.value) !== camp.target) {
                                  handleGoalUpdate(camp.id, e.target.value);
                                }
                              }}
                              style={styles.inlineInput}
                            />
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                              Press Tab/Blur input to update
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 5. GALLERY CATEGORIES TAB */}
            {activeTab === 'galleryCategories' && (
              <div style={styles.tabContent}>
                <div style={styles.filtersBar} className="card-glass">
                  <h3 style={styles.cardTitle}>Manage Gallery Categories</h3>
                  <button onClick={() => { setEditingCategory(null); setCategoryForm({ id: '', label: '' }); setIsCategoryModalOpen(true); }} className="btn btn-primary" style={styles.addDonBtn}>
                    <Plus size={16} />
                    <span>Add Category</span>
                  </button>
                </div>
                <div style={styles.tableCard} className="card-glass">
                  <table style={styles.table}>
                    <thead><tr><th style={styles.th}>ID</th><th style={styles.th}>Label</th><th style={styles.th}>Actions</th></tr></thead>
                    <tbody>
                      {galleryCategories.map(cat => (
                        <tr key={cat.id} style={styles.tr}>
                          <td style={styles.td}>{cat.id}</td>
                          <td style={styles.td}>{cat.label}</td>
                          <td style={{ ...styles.td, display: 'flex', gap: '0.5rem' }}>
                            <button onClick={() => { setEditingCategory(cat); setCategoryForm(cat); setIsCategoryModalOpen(true); }} style={styles.actionBtnSmall}>Edit</button>
                            <button onClick={() => handleDeleteCategory(cat.id)} style={{ ...styles.actionBtnSmall, color: 'red' }}>Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 6. GALLERY IMAGES TAB */}
            {activeTab === 'galleryImages' && (
              <div style={styles.tabContent}>
                <div style={styles.filtersBar} className="card-glass">
                  <h3 style={styles.cardTitle}>Manage Gallery Images</h3>
                  <button onClick={() => { setEditingImage(null); setImageForm({ src: '', category: galleryCategories[0]?.id || 'education', title: '', date: '', description: '' }); setIsImageModalOpen(true); }} className="btn btn-primary" style={styles.addDonBtn}>
                    <Plus size={16} />
                    <span>Add Image</span>
                  </button>
                </div>
                <div style={styles.tableCard} className="card-glass">
                  <table style={styles.table}>
                    <thead><tr><th style={styles.th}>Preview</th><th style={styles.th}>Title</th><th style={styles.th}>Category</th><th style={styles.th}>Date</th><th style={styles.th}>Actions</th></tr></thead>
                    <tbody>
                      {galleryItems.map(img => (
                        <tr key={img.id} style={styles.tr}>
                          <td style={styles.td}><img src={img.src} alt={img.title} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} /></td>
                          <td style={styles.td}>{img.title}</td>
                          <td style={styles.td}>{img.category}</td>
                          <td style={styles.td}>{img.date}</td>
                          <td style={{ ...styles.td, display: 'flex', gap: '0.5rem' }}>
                            <button onClick={() => { setEditingImage(img); setImageForm(img); setIsImageModalOpen(true); }} style={styles.actionBtnSmall}>Edit</button>
                            <button onClick={() => handleDeleteImage(img.id)} style={{ ...styles.actionBtnSmall, color: 'red' }}>Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 7. SERVICES TAB */}
            {activeTab === 'services' && (
              <div style={styles.tabContent}>
                <div style={styles.filtersBar} className="card-glass">
                  <h3 style={styles.cardTitle}>Manage Services</h3>
                  <button onClick={() => { setEditingService(null); setServiceForm({ category: 'education', title: '', shortDesc: '', longDesc: '', metric: '', image: '', icon: 'Heart', subProjects: '', impactTestimony: '' }); setIsServiceModalOpen(true); }} className="btn btn-primary" style={styles.addDonBtn}>
                    <Plus size={16} />
                    <span>Add Service</span>
                  </button>
                </div>
                <div style={styles.tableCard} className="card-glass">
                  <table style={styles.table}>
                    <thead><tr><th style={styles.th}>Title</th><th style={styles.th}>Category</th><th style={styles.th}>Metric</th><th style={styles.th}>Actions</th></tr></thead>
                    <tbody>
                      {services.map(srv => (
                        <tr key={srv.id} style={styles.tr}>
                          <td style={styles.td}>{srv.title}</td>
                          <td style={styles.td}>{srv.category}</td>
                          <td style={styles.td}>{srv.metric}</td>
                          <td style={{ ...styles.td, display: 'flex', gap: '0.5rem' }}>
                            <button onClick={() => { setEditingService(srv); setServiceForm({ ...srv, subProjects: srv.subProjects.join(', ') }); setIsServiceModalOpen(true); }} style={styles.actionBtnSmall}>Edit</button>
                            <button onClick={() => handleDeleteService(srv.id)} style={{ ...styles.actionBtnSmall, color: 'red' }}>Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 9. ABOUT SECTIONS CONTENT TAB */}
            {activeTab === 'aboutSections' && (
              <div style={styles.tabContent}>
                <div style={styles.filtersBar} className="card-glass">
                  <h3 style={styles.cardTitle}>About Sections Content</h3>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <label style={styles.label}>Select Section to Edit:</label>
                    <select 
                      value={selectedAboutSection}
                      onChange={(e) => handleSelectAboutSection(e.target.value)}
                      style={{ ...styles.input, width: '250px' }}
                    >
                      <option value="">-- Select an Option --</option>
                      {menuOptions.filter(o => o.category === 'about_us' && o.linkId !== 'board-members' && o.linkId !== 'leadership').map(opt => (
                        <option key={opt.id} value={opt.linkId}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {selectedAboutSection && (
                  <div style={styles.tableCard} className="card-glass">
                    {isLoadingAboutSection ? (
                      <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading...</div>
                    ) : (
                      <form onSubmit={handleSaveAboutSection} style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                          <label style={styles.label}>Section Title</label>
                          <input 
                            type="text" 
                            value={aboutSectionForm.title}
                            onChange={(e) => setAboutSectionForm({...aboutSectionForm, title: e.target.value})}
                            style={{ ...styles.input, width: '100%', boxSizing: 'border-box' }}
                            required 
                          />
                        </div>
                        <div>
                          <label style={styles.label}>Upload Section Image or Enter URL (Optional)</label>
                          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <input 
                              type="file" 
                              accept="image/*" 
                              onChange={(e) => setAboutSectionHeroFile(e.target.files[0])} 
                              style={{ ...styles.input, flex: 1, padding: '0.45rem', backgroundColor: 'transparent' }} 
                            />
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 'bold' }}>OR</span>
                            <input 
                              type="text" 
                              value={aboutSectionForm.heroImage}
                              onChange={(e) => setAboutSectionForm({...aboutSectionForm, heroImage: e.target.value})}
                              style={{ ...styles.input, flex: 1 }}
                              placeholder="Existing URL"
                            />
                          </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          <label style={styles.label}>Section Text Content</label>
                          <textarea 
                            value={aboutSectionForm.content}
                            onChange={(e) => setAboutSectionForm({...aboutSectionForm, content: e.target.value})}
                            style={{ ...styles.textarea, width: '100%', height: '300px', boxSizing: 'border-box' }}
                            placeholder="Write the text content for this section here..."
                            required
                          />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                          <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 2rem' }}>Save Section</button>
                        </div>
                      </form>
                    )}
                  </div>
                )}
              </div>
            )}
            {/* 10. BOARD MEMBERS TAB */}
            {activeTab === 'boardMembers' && (
              <div style={styles.tabContent}>
                <div style={styles.filtersBar} className="card-glass">
                  <h3 style={styles.cardTitle}>Board Members Management</h3>
                  <button onClick={() => {
                    setEditingBoardMember(null);
                    setBoardMemberForm({ name: '', role: '', photo: '' });
                    setBoardMemberFile(null);
                    setIsBoardMemberModalOpen(true);
                  }} className="btn btn-primary">
                    <Plus size={16} /> Add Board Member
                  </button>
                </div>
                
                <div style={styles.tableCard} className="card-glass">
                  <div style={styles.tableResponsive}>
                    <table style={styles.table}>
                      <thead>
                        <tr>
                          <th style={styles.th}>Photo</th>
                          <th style={styles.th}>Name</th>
                          <th style={styles.th}>Role / Designation</th>
                          <th style={styles.th}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {boardMembers.map(member => (
                          <tr key={member.id} style={styles.tr}>
                            <td style={styles.td}>
                              {member.photo ? (
                                <img src={member.photo} alt={member.name} style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }} />
                              ) : (
                                <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'var(--bg-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                  <User size={24} color="var(--text-secondary)" />
                                </div>
                              )}
                            </td>
                            <td style={{ ...styles.td, fontWeight: 'bold' }}>{member.name}</td>
                            <td style={styles.td}>{member.role}</td>
                            <td style={styles.td}>
                              <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <button onClick={() => handleEditBoardMember(member)} style={styles.actionBtnSmall}>Edit</button>
                                <button onClick={() => handleDeleteBoardMember(member.id)} style={{ ...styles.actionBtnSmall, color: '#ef4444' }}>Delete</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {boardMembers.length === 0 && (
                          <tr>
                            <td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>No board members added yet.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      )}

      {/* MODAL: ADD/EDIT MENU OPTION */}
      {isMenuOptionModalOpen && (
        <div style={{...modalStyles.backdrop, display: 'flex', justifyContent: 'center', alignItems: 'center'}} onClick={() => setIsMenuOptionModalOpen(false)}>
          <div style={{...modalStyles.modal, width: '400px'}} onClick={(e) => e.stopPropagation()}>
            <div style={modalStyles.header}>
              <h3 style={{ fontSize: '1.25rem' }}>{editingMenuOption ? 'Edit Menu Option' : 'Add Menu Option'}</h3>
              <button onClick={() => setIsMenuOptionModalOpen(false)} style={modalStyles.closeBtn}><X size={18} /></button>
            </div>
            <form onSubmit={handleSaveMenuOption} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.25rem 1.5rem' }}>
              <div>
                <label style={styles.label}>Parent Category</label>
                <select 
                  value={menuOptionForm.category}
                  onChange={(e) => setMenuOptionForm({...menuOptionForm, category: e.target.value})}
                  style={styles.input}
                >
                  <option value="about_us">About Us</option>
                  <option value="stories_news">Stories & News</option>
                </select>
              </div>
              <div>
                <label style={styles.label}>Label</label>
                <input 
                  type="text" 
                  value={menuOptionForm.label}
                  onChange={(e) => setMenuOptionForm({...menuOptionForm, label: e.target.value})}
                  style={styles.input} 
                  required
                />
              </div>
              <div>
                <label style={styles.label}>Link ID (optional)</label>
                <input 
                  type="text" 
                  value={menuOptionForm.linkId}
                  onChange={(e) => setMenuOptionForm({...menuOptionForm, linkId: e.target.value})}
                  style={styles.input} 
                />
              </div>
              <div style={modalStyles.footer}>
                <button type="button" onClick={() => setIsMenuOptionModalOpen(false)} style={styles.actionBtnSmall}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ padding: '0.65rem 1.25rem' }}>Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* MODAL: ADD/EDIT BOARD MEMBER */}
      {isBoardMemberModalOpen && (
        <div style={{...modalStyles.backdrop, display: 'flex', justifyContent: 'center', alignItems: 'center'}} onClick={() => setIsBoardMemberModalOpen(false)}>
          <div style={{...modalStyles.modal, width: '450px'}} onClick={(e) => e.stopPropagation()}>
            <div style={modalStyles.header}>
              <h3 style={{ fontSize: '1.25rem' }}>{editingBoardMember ? 'Edit Board Member' : 'Add Board Member'}</h3>
              <button onClick={() => setIsBoardMemberModalOpen(false)} style={modalStyles.closeBtn}><X size={18} /></button>
            </div>
            <form onSubmit={handleSaveBoardMember} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.25rem 1.5rem' }}>
              <div>
                <label style={styles.label}>Full Name</label>
                <input 
                  type="text" 
                  value={boardMemberForm.name}
                  onChange={(e) => setBoardMemberForm({...boardMemberForm, name: e.target.value})}
                  style={styles.input} 
                  required
                />
              </div>
              <div>
                <label style={styles.label}>Role / Designation</label>
                <input 
                  type="text" 
                  value={boardMemberForm.role}
                  onChange={(e) => setBoardMemberForm({...boardMemberForm, role: e.target.value})}
                  style={styles.input} 
                  required
                  placeholder="e.g. Legal Advisor, President"
                />
              </div>
              <div>
                <label style={styles.label}>Profile Photo (Optional)</label>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={(e) => setBoardMemberFile(e.target.files[0])} 
                    style={{ ...styles.input, flex: 1, padding: '0.45rem', backgroundColor: 'transparent' }} 
                  />
                </div>
              </div>
              <div style={modalStyles.footer}>
                <button type="button" onClick={() => setIsBoardMemberModalOpen(false)} style={styles.actionBtnSmall}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ padding: '0.65rem 1.25rem' }}>Save Board Member</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 1: ADD MANUAL OFFLINE DONATION */}
      {isManualDonOpen && (
        <div style={modalStyles.backdrop} onClick={() => setIsManualDonOpen(false)}>
          <div style={modalStyles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={modalStyles.header}>
              <h3 style={{ fontSize: '1.25rem' }}>Record Offline / Manual Donation</h3>
              <button onClick={() => setIsManualDonOpen(false)} style={modalStyles.closeBtn}><X size={18} /></button>
            </div>
            
            <form onSubmit={handleManualDonSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.25rem 1.5rem' }}>
              <div>
                <label style={styles.label}>Donor Full Name *</label>
                <input 
                  type="text" 
                  value={manualDonForm.name}
                  onChange={(e) => setManualDonForm({...manualDonForm, name: e.target.value})}
                  style={styles.input} 
                />
                {manualDonErrors.name && <p style={styles.errorText}>{manualDonErrors.name}</p>}
              </div>

              <div style={modalStyles.grid2}>
                <div>
                  <label style={styles.label}>Donor Email Address *</label>
                  <input 
                    type="email" 
                    value={manualDonForm.email}
                    onChange={(e) => setManualDonForm({...manualDonForm, email: e.target.value})}
                    style={styles.input} 
                  />
                  {manualDonErrors.email && <p style={styles.errorText}>{manualDonErrors.email}</p>}
                </div>
                <div>
                  <label style={styles.label}>Phone Number</label>
                  <input 
                    type="tel" 
                    placeholder="10-digit mobile"
                    value={manualDonForm.phone}
                    onChange={(e) => setManualDonForm({...manualDonForm, phone: e.target.value})}
                    style={styles.input} 
                  />
                </div>
              </div>

              <div style={modalStyles.grid2}>
                <div>
                  <label style={styles.label}>PAN Card Number (For 80G)</label>
                  <input 
                    type="text" 
                    placeholder="ABCDE1234F"
                    value={manualDonForm.pan}
                    onChange={(e) => setManualDonForm({...manualDonForm, pan: e.target.value.toUpperCase()})}
                    style={styles.input} 
                  />
                </div>
                <div>
                  <label style={styles.label}>Donation Amount (₹) *</label>
                  <input 
                    type="number" 
                    placeholder="5000"
                    value={manualDonForm.amount}
                    onChange={(e) => setManualDonForm({...manualDonForm, amount: e.target.value})}
                    style={styles.input} 
                  />
                  {manualDonErrors.amount && <p style={styles.errorText}>{manualDonErrors.amount}</p>}
                </div>
              </div>

              <div style={modalStyles.grid2}>
                <div>
                  <label style={styles.label}>Donation Campaign Cause</label>
                  <select 
                    value={manualDonForm.campaignId}
                    onChange={(e) => setManualDonForm({...manualDonForm, campaignId: e.target.value})}
                    style={styles.input}
                  >
                    {campaigns.map(c => <option key={c.id} value={c.id}>{c.name.split(' (')[0]}</option>)}
                  </select>
                </div>
                <div>
                  <label style={styles.label}>Payment Method</label>
                  <select 
                    value={manualDonForm.paymentMethod}
                    onChange={(e) => setManualDonForm({...manualDonForm, paymentMethod: e.target.value})}
                    style={styles.input}
                  >
                    <option value="netbank">Net Banking transfer</option>
                    <option value="cheque">Cheque Deposit</option>
                    <option value="cash">Direct Cash collection</option>
                    <option value="upi">UPI / QR Code</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={styles.label}>Donation frequency</label>
                <select 
                  value={manualDonForm.frequency}
                  onChange={(e) => setManualDonForm({...manualDonForm, frequency: e.target.value})}
                  style={styles.input}
                >
                  <option value="one-time">One-Time Contribution</option>
                  <option value="monthly">Monthly Recurring Sponsor</option>
                </select>
              </div>

              <div style={modalStyles.footer}>
                <button type="button" onClick={() => setIsManualDonOpen(false)} style={modalStyles.cancelBtn}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={modalStyles.submitBtn}>Log Transaction</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: GALLERY CATEGORY */}
      {isCategoryModalOpen && (
        <div style={modalStyles.backdrop} onClick={() => setIsCategoryModalOpen(false)}>
          <div style={modalStyles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={modalStyles.header}>
              <h3 style={{ fontSize: '1.25rem' }}>{editingCategory ? 'Edit Category' : 'Add Category'}</h3>
              <button onClick={() => setIsCategoryModalOpen(false)} style={modalStyles.closeBtn}><X size={18} /></button>
            </div>
            <form onSubmit={handleSaveCategory} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.25rem 1.5rem' }}>
              <div>
                <label style={styles.label}>Category Label *</label>
                <input type="text" value={categoryForm.label} onChange={(e) => setCategoryForm({...categoryForm, label: e.target.value})} style={styles.input} required />
              </div>
              <div style={modalStyles.footer}>
                <button type="button" onClick={() => setIsCategoryModalOpen(false)} style={modalStyles.cancelBtn}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={modalStyles.submitBtn}>Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: GALLERY IMAGE */}
      {isImageModalOpen && (
        <div style={modalStyles.backdrop} onClick={() => setIsImageModalOpen(false)}>
          <div style={modalStyles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={modalStyles.header}>
              <h3 style={{ fontSize: '1.25rem' }}>{editingImage ? 'Edit Image' : 'Add Image'}</h3>
              <button onClick={() => setIsImageModalOpen(false)} style={modalStyles.closeBtn}><X size={18} /></button>
            </div>
            <form onSubmit={handleSaveImage} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.25rem 1.5rem' }}>
              <div>
                <label style={styles.label}>Upload Image or Enter URL *</label>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={(e) => setImageFile(e.target.files[0])} 
                    style={{ ...styles.input, flex: 1, padding: '0.45rem', backgroundColor: 'transparent' }} 
                  />
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 'bold' }}>OR</span>
                  <input 
                    type="text" 
                    value={imageForm.src} 
                    onChange={(e) => setImageForm({...imageForm, src: e.target.value})} 
                    style={{ ...styles.input, flex: 1 }} 
                    placeholder="Existing URL" 
                  />
                </div>
              </div>
              <div>
                <label style={styles.label}>Title *</label>
                <input type="text" value={imageForm.title} onChange={(e) => setImageForm({...imageForm, title: e.target.value})} style={styles.input} required />
              </div>
              <div style={modalStyles.grid2}>
                <div>
                  <label style={styles.label}>Category</label>
                  <select value={imageForm.category} onChange={(e) => setImageForm({...imageForm, category: e.target.value})} style={styles.input}>
                    {galleryCategories.filter(c => c.id !== 'all').map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                  </select>
                </div>
                <div>
                  <label style={styles.label}>Date (e.g. Jan 2026) <span style={{fontWeight: 'normal', color: 'var(--text-muted)'}}>(Optional)</span></label>
                  <input type="text" value={imageForm.date} onChange={(e) => setImageForm({...imageForm, date: e.target.value})} style={styles.input} />
                </div>
              </div>
              <div>
                <label style={styles.label}>Description <span style={{fontWeight: 'normal', color: 'var(--text-muted)'}}>(Optional)</span></label>
                <textarea rows="2" value={imageForm.description} onChange={(e) => setImageForm({...imageForm, description: e.target.value})} style={styles.textarea}></textarea>
              </div>
              <div style={modalStyles.footer}>
                <button type="button" onClick={() => setIsImageModalOpen(false)} style={modalStyles.cancelBtn}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={modalStyles.submitBtn}>Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: SERVICE */}
      {isServiceModalOpen && (
        <div style={modalStyles.backdrop} onClick={() => setIsServiceModalOpen(false)}>
          <div style={{ ...modalStyles.modal, maxWidth: '700px' }} onClick={(e) => e.stopPropagation()}>
            <div style={modalStyles.header}>
              <h3 style={{ fontSize: '1.25rem' }}>{editingService ? 'Edit Service' : 'Add Service'}</h3>
              <button onClick={() => setIsServiceModalOpen(false)} style={modalStyles.closeBtn}><X size={18} /></button>
            </div>
            <form onSubmit={handleSaveService} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.25rem 1.5rem', maxHeight: '75vh', overflowY: 'auto' }}>
              <div style={modalStyles.grid2}>
                <div>
                  <label style={styles.label}>Title *</label>
                  <input type="text" value={serviceForm.title} onChange={(e) => setServiceForm({...serviceForm, title: e.target.value})} style={styles.input} required />
                </div>
                <div>
                  <label style={styles.label}>Category String *</label>
                  <input type="text" value={serviceForm.category} onChange={(e) => setServiceForm({...serviceForm, category: e.target.value})} style={styles.input} required />
                </div>
              </div>
              <div style={modalStyles.grid2}>
                <div>
                  <label style={styles.label}>Icon Component Name (e.g., Heart, Shield)</label>
                  <input type="text" value={serviceForm.icon} onChange={(e) => setServiceForm({...serviceForm, icon: e.target.value})} style={styles.input} />
                </div>
                <div>
                  <label style={styles.label}>Image URL</label>
                  <input type="text" value={serviceForm.image} onChange={(e) => setServiceForm({...serviceForm, image: e.target.value})} style={styles.input} />
                </div>
              </div>
              <div>
                <label style={styles.label}>Short Description *</label>
                <textarea rows="2" value={serviceForm.shortDesc} onChange={(e) => setServiceForm({...serviceForm, shortDesc: e.target.value})} style={styles.textarea} required></textarea>
              </div>
              <div>
                <label style={styles.label}>Long Description (HTML allowed)</label>
                <textarea 
                  value={serviceForm.longDesc} 
                  onChange={(e) => setServiceForm({...serviceForm, longDesc: e.target.value})} 
                  style={{ ...styles.textarea, height: '150px', width: '100%', boxSizing: 'border-box' }}
                />
              </div>
              <div style={modalStyles.grid2}>
                <div>
                  <label style={styles.label}>Metric (e.g., 500+ Helped)</label>
                  <input type="text" value={serviceForm.metric} onChange={(e) => setServiceForm({...serviceForm, metric: e.target.value})} style={styles.input} />
                </div>
                <div>
                  <label style={styles.label}>Sub-Projects (Comma-separated)</label>
                  <input type="text" value={serviceForm.subProjects} onChange={(e) => setServiceForm({...serviceForm, subProjects: e.target.value})} style={styles.input} placeholder="Project A, Project B" />
                </div>
              </div>
              <div>
                <label style={styles.label}>Impact Testimony</label>
                <textarea rows="2" value={serviceForm.impactTestimony} onChange={(e) => setServiceForm({...serviceForm, impactTestimony: e.target.value})} style={styles.textarea}></textarea>
              </div>
              <div style={modalStyles.footer}>
                <button type="button" onClick={() => setIsServiceModalOpen(false)} style={modalStyles.cancelBtn}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={modalStyles.submitBtn}>Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: 80G TAX RECEIPT DIALOG */}
      {receiptDonation && (
        <div style={modalStyles.backdrop} onClick={() => setReceiptDonation(null)}>
          <div style={modalStyles.receiptModal} onClick={(e) => e.stopPropagation()}>
            <div style={modalStyles.receiptHeader}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Heart size={18} fill="#ffffff" color="#ffffff" />
                <strong style={{ fontSize: '1.1rem', color: '#ffffff' }}>ANNAI THERASA HOME</strong>
              </div>
              <button onClick={() => setReceiptDonation(null)} style={modalStyles.receiptCloseBtn}><X size={18} /></button>
            </div>

            <div style={modalStyles.receiptBody}>
              <div style={modalStyles.receiptTopRow}>
                <div>
                  <h4 style={{ textTransform: 'uppercase', fontSize: '1.2rem', color: 'var(--primary)' }}>Receipt Cum Certificate</h4>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Under Section 80G of Income Tax Act 1961</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.82rem' }}><strong>Receipt No:</strong> PECT/2026/R-{receiptDonation.id.split('_')[1] || '102'}</div>
                  <div style={{ fontSize: '0.82rem' }}><strong>Date:</strong> {new Date(receiptDonation.date).toLocaleDateString()}</div>
                </div>
              </div>

              <hr style={modalStyles.receiptHr} />

              <div style={modalStyles.receiptContent}>
                <p style={{ color: '#334155' }}>Received with thanks from <strong style={{ color: '#0f172a' }}>Shri / Smt. {receiptDonation.name}</strong>,</p>
                <p style={{ color: '#334155' }}>Email ID: <em>{receiptDonation.email}</em> | Phone: <em>{receiptDonation.phone}</em></p>
                
                <p style={{ marginTop: '0.75rem', color: '#334155' }}>
                  The sum of <strong>₹{receiptDonation.amount.toLocaleString('en-IN')}</strong> (Rupees {receiptDonation.amount === 25000 ? 'Twenty Five Thousand Only' : receiptDonation.amount === 10000 ? 'Ten Thousand Only' : receiptDonation.amount === 5000 ? 'Five Thousand Only' : receiptDonation.amount === 2500 ? 'Two Thousand Five Hundred Only' : receiptDonation.amount === 1500 ? 'One Thousand Five Hundred Only' : receiptDonation.amount === 1000 ? 'One Thousand Only' : `${receiptDonation.amount} Rupees Only`})
                  by gateway mode <strong>{receiptDonation.paymentMethod.toUpperCase()} ({receiptDonation.frequency})</strong>.
                </p>

                <p style={{ marginTop: '0.75rem' }}>
                  Contribution allocated cause: <strong>{receiptDonation.campaignName}</strong>.
                </p>
              </div>

              <div style={modalStyles.receiptGridInfo}>
                <div style={modalStyles.receiptBoxItem}>
                  <strong>Trust Registration Details</strong>
                  <div>PAN: AAATP1982K &bull; CSR00018302</div>
                  <div>80G Reg: IT/80G/CHE-2015-16</div>
                  <div>Validity: Perpetual Exemption</div>
                </div>
                <div style={modalStyles.receiptBoxItem}>
                  <strong>Donor Tax Details</strong>
                  <div>PAN: {receiptDonation.pan || 'Not provided'}</div>
                  <div>Exemption Status: 50% deduction eligible</div>
                </div>
              </div>

              <div style={modalStyles.receiptFooter}>
                <div style={{ fontSize: '0.75rem', color: '#64748b', flex: 1 }}>
                  Note: This is a system generated receipt. No physical signature is required. All donations made to Annai Therasa Home are exempt under Section 80G of the Income Tax Act.
                </div>
                <div style={{ textAlign: 'center', minWidth: '120px' }}>
                  <div style={{ height: '35px', borderBottom: '1px dashed #cbd5e1', margin: '0 auto 5px auto' }} />
                  <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--primary)' }}>Managing Trustee</span>
                </div>
              </div>
            </div>

            <div style={modalStyles.receiptActions}>
              <button 
                onClick={() => {
                  window.print();
                }} 
                className="btn btn-primary"
                style={{ flex: 1 }}
              >
                Print Official Certificate
              </button>
              <button 
                onClick={() => setReceiptDonation(null)} 
                style={modalStyles.receiptCloseBtnAction}
              >
                Close Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Styling system
const styles = {
  container: {
    minHeight: '85vh',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    backgroundColor: 'var(--bg-base)',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-body)',
  },
  toast: (type) => ({
    position: 'fixed',
    top: '20px',
    right: '20px',
    backgroundColor: type === 'error' ? '#ef4444' : type === 'info' ? 'var(--primary-light)' : 'var(--primary)',
    color: '#ffffff',
    padding: '0.85rem 1.5rem',
    borderRadius: 'var(--radius-md)',
    boxShadow: 'var(--shadow-lg)',
    zIndex: 99999,
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    fontSize: '0.9rem',
    animation: 'fadeIn 0.3s ease-out',
  }),
  loginWrapper: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '3rem 1.5rem',
    background: 'radial-gradient(circle at 50% 50%, rgba(6, 78, 59, 0.05) 0%, transparent 80%)',
  },
  loginCard: {
    width: '100%',
    maxWidth: '440px',
    padding: '2.5rem',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--border-glass)',
    backgroundColor: 'var(--bg-surface-glass)',
    boxShadow: 'var(--shadow-xl)',
    backdropFilter: 'blur(10px)',
  },
  loginHeader: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  shieldIcon: {
    width: '64px',
    height: '64px',
    borderRadius: 'var(--radius-md)',
    backgroundColor: 'rgba(6, 78, 59, 0.08)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1rem auto',
    border: '1px solid var(--border-glass)',
  },
  loginTitle: {
    fontSize: '1.6rem',
    fontWeight: 800,
    letterSpacing: '-0.02em',
    marginBottom: '0.5rem',
  },
  loginDesc: {
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
    lineHeight: 1.5,
  },
  loginForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.4rem',
    fontSize: '0.82rem',
    fontWeight: 600,
    color: 'var(--text-primary)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  input: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.95rem',
    padding: '0.75rem 1rem',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--border-color)',
    backgroundColor: 'var(--bg-surface)',
    color: 'var(--text-primary)',
    transition: 'border-color var(--transition-fast)',
    outline: 'none',
    '&:focus': {
      borderColor: 'var(--primary)',
    }
  },
  textarea: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.95rem',
    padding: '0.75rem 1rem',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--border-color)',
    backgroundColor: 'var(--bg-surface)',
    color: 'var(--text-primary)',
    outline: 'none',
    resize: 'vertical',
  },
  loginError: {
    fontSize: '0.82rem',
    color: '#ef4444',
    textAlign: 'center',
    fontWeight: 500,
  },
  loginBtn: {
    width: '100%',
    marginTop: '0.5rem',
    padding: '0.85rem',
  },
  loginTip: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    marginTop: '1.5rem',
    fontSize: '0.8rem',
    color: 'var(--text-secondary)',
    borderTop: '1px dashed var(--border-color)',
    paddingTop: '1.25rem',
  },
  dashboardLayout: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    height: 'calc(100vh - 88px)',
  },
  sidebar: {
    width: '280px',
    backgroundColor: 'var(--bg-surface)',
    borderRight: '1px solid var(--border-color)',
    display: 'flex',
    flexDirection: 'column',
    padding: '1.5rem',
    boxShadow: 'var(--shadow-sm)',
    overflowY: 'auto',
  },
  sidebarBrand: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '2rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid var(--border-color)',
  },
  brandLogo: {
    width: '32px',
    height: '32px',
    borderRadius: '6px',
    backgroundColor: 'var(--primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandTitle: {
    fontSize: '1rem',
    fontWeight: 700,
    lineHeight: 1.1,
  },
  brandSub: {
    fontSize: '0.75rem',
    color: 'var(--text-secondary)',
  },
  sidebarNav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    flex: 1,
  },
  sidebarLink: (isActive) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.75rem 1rem',
    borderRadius: 'var(--radius-md)',
    backgroundColor: isActive ? 'rgba(6, 78, 59, 0.06)' : 'transparent',
    color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
    fontWeight: isActive ? 600 : 500,
    fontSize: '0.9rem',
    border: 'none',
    textAlign: 'left',
    cursor: 'pointer',
    transition: 'background-color var(--transition-fast), color var(--transition-fast)',
    position: 'relative',
    '&:hover': {
      backgroundColor: 'var(--bg-surface-hover)',
      color: 'var(--text-primary)',
    }
  }),
  badgeCount: {
    marginLeft: 'auto',
    fontSize: '0.75rem',
    backgroundColor: 'var(--border-color)',
    color: 'var(--text-secondary)',
    padding: '0.1rem 0.5rem',
    borderRadius: 'var(--radius-full)',
    fontWeight: 600,
  },
  badgePending: {
    marginLeft: 'auto',
    fontSize: '0.75rem',
    backgroundColor: '#fffbeb',
    border: '1px solid #fde68a',
    color: '#b45309',
    padding: '0.1rem 0.5rem',
    borderRadius: 'var(--radius-full)',
    fontWeight: 700,
  },
  sidebarFooter: {
    marginTop: 'auto',
    paddingTop: '1rem',
    borderTop: '1px solid var(--border-color)',
  },
  logoutBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    width: '100%',
    padding: '0.7rem 1rem',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--border-color)',
    backgroundColor: 'transparent',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: 600,
    transition: 'background-color var(--transition-fast), color var(--transition-fast), border-color var(--transition-fast)',
    '&:hover': {
      backgroundColor: '#fef2f2',
      color: '#dc2626',
      borderColor: '#fca5a5',
    }
  },
  mainContent: {
    flex: 1,
    backgroundColor: 'var(--bg-base)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  topHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '2rem 2rem 1.25rem 2rem',
    borderBottom: '1px solid var(--border-color)',
    backgroundColor: 'var(--bg-base)',
    zIndex: 10,
  },
  headerSubtitle: {
    fontSize: '0.75rem',
    fontWeight: 700,
    color: 'var(--primary-light)',
    letterSpacing: '0.1em',
  },
  headerTitleText: {
    fontSize: '1.75rem',
    fontWeight: 800,
    letterSpacing: '-0.02em',
  },
  headerActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  adminUser: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.65rem',
    padding: '0.4rem 0.85rem',
    borderRadius: 'var(--radius-md)',
    backgroundColor: 'var(--bg-surface)',
    border: '1px solid var(--border-color)',
  },
  userAvatar: {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    backgroundColor: 'var(--primary)',
    color: '#ffffff',
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.8rem',
  },
  refreshBtn: {
    width: '38px',
    height: '38px',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--border-color)',
    backgroundColor: 'var(--bg-surface)',
    color: 'var(--text-secondary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)',
    '&:hover': {
      backgroundColor: 'var(--bg-surface-hover)',
      color: 'var(--primary)',
    }
  },
  headerLogoutBtn: {
    width: '38px',
    height: '38px',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--border-color)',
    backgroundColor: 'var(--bg-surface)',
    color: 'var(--text-secondary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)',
    '&:hover': {
      backgroundColor: '#fef2f2',
      color: '#dc2626',
      borderColor: '#fca5a5',
    }
  },
  tabContent: {
    flex: 1,
    overflowY: 'auto',
    padding: '2rem', // Restored top padding for spacing from header
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '1.25rem',
  },
  kpiCard: {
    padding: '1.5rem',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--border-color)',
    backgroundColor: 'var(--bg-surface)',
    boxShadow: 'var(--shadow-sm)',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  kpiHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  kpiLabel: {
    fontSize: '0.8rem',
    fontWeight: 600,
    color: 'var(--text-secondary)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  kpiIcon: (theme) => {
    const bg = 
      theme === 'primary' ? 'rgba(6, 78, 59, 0.08)' :
      theme === 'secondary' ? 'rgba(217, 119, 6, 0.08)' :
      theme === 'accent' ? 'rgba(16, 185, 129, 0.08)' : 'rgba(13, 148, 136, 0.08)';
    const color = 
      theme === 'primary' ? 'var(--primary)' :
      theme === 'secondary' ? 'var(--secondary)' :
      theme === 'accent' ? 'var(--accent)' : 'var(--primary-light)';
    return {
      width: '36px',
      height: '36px',
      borderRadius: '8px',
      backgroundColor: bg,
      color: color,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };
  },
  kpiValue: {
    fontSize: '1.8rem',
    fontWeight: 800,
    letterSpacing: '-0.02em',
  },
  kpiGrowth: {
    fontSize: '0.78rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
  },
  growthText: {
    color: '#0d9488',
    fontWeight: 600,
  },
  dashboardGrid: {
    display: 'flex',
    gap: '1.5rem',
    flexWrap: 'wrap',
  },
  gridCard: {
    padding: '1.5rem',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--border-color)',
    backgroundColor: 'var(--bg-surface)',
    boxShadow: 'var(--shadow-sm)',
    minWidth: '300px',
  },
  cardTitle: {
    fontSize: '1.1rem',
    fontWeight: 700,
  },
  cardDesc: {
    fontSize: '0.8rem',
    color: 'var(--text-secondary)',
    marginBottom: '1.5rem',
  },
  chartWrapper: {
    height: '240px',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  barChartContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    width: '100%',
    height: '100%',
    paddingBottom: '1rem',
  },
  chartBarCol: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '14%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  chartBarValue: {
    fontSize: '0.75rem',
    fontWeight: 600,
    color: 'var(--primary-light)',
    marginBottom: '0.4rem',
  },
  chartBarOuter: {
    width: '28px',
    height: '75%',
    backgroundColor: 'var(--bg-base)',
    borderRadius: 'var(--radius-sm)',
    display: 'flex',
    alignItems: 'flex-end',
    overflow: 'hidden',
  },
  chartBarInner: {
    width: '100%',
    backgroundColor: 'var(--primary)',
    borderRadius: 'var(--radius-sm)',
    transition: 'height 1s cubic-bezier(0.4, 0, 0.2, 1)',
    background: 'linear-gradient(to top, var(--primary) 0%, var(--primary-light) 100%)',
  },
  chartBarLabel: {
    fontSize: '0.7rem',
    color: 'var(--text-secondary)',
    marginTop: '0.5rem',
    textAlign: 'center',
    whiteSpace: 'nowrap',
  },
  noData: {
    fontSize: '0.9rem',
    color: 'var(--text-muted)',
    fontStyle: 'italic',
  },
  campaignListOverview: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',
  },
  campProgressItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.35rem',
  },
  campProgressMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  campProgressBarOuter: {
    height: '8px',
    backgroundColor: 'var(--bg-base)',
    borderRadius: 'var(--radius-full)',
    overflow: 'hidden',
  },
  campProgressBarInner: (campId) => {
    let bg = 'var(--primary)';
    if (campId === 'camp_healthcare') bg = 'var(--primary-light)';
    if (campId === 'camp_livelihood') bg = 'var(--secondary)';
    if (campId === 'camp_environment') bg = 'var(--accent)';
    return {
      height: '100%',
      backgroundColor: bg,
      borderRadius: 'var(--radius-full)',
    };
  },
  campProgressSums: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.78rem',
    color: 'var(--text-secondary)',
  },
  wideCard: {
    padding: '1.5rem',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--border-color)',
    backgroundColor: 'var(--bg-surface)',
    boxShadow: 'var(--shadow-sm)',
  },
  activityList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginTop: '1.25rem',
  },
  activityItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid var(--border-color)',
    '&:last-child': {
      borderBottom: 'none',
      paddingBottom: 0,
    }
  },
  activityIcon: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: 'rgba(6, 78, 59, 0.06)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  activityBody: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    fontSize: '0.88rem',
  },
  activityTime: {
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
    marginTop: '0.15rem',
  },
  actionBtnSmall: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.35rem',
    padding: '0.35rem 0.7rem',
    borderRadius: 'var(--radius-sm)',
    border: '1px solid var(--border-color)',
    backgroundColor: 'var(--bg-surface)',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    fontSize: '0.78rem',
    fontWeight: 600,
    transition: 'background-color var(--transition-fast), border-color var(--transition-fast), color var(--transition-fast)',
    '&:hover': {
      backgroundColor: 'var(--bg-surface-hover)',
      borderColor: 'var(--primary)',
      color: 'var(--primary)',
    }
  },
  filtersBar: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
    padding: '1rem 1.25rem',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--border-color)',
    backgroundColor: 'var(--bg-surface)',
    flexWrap: 'wrap',
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    flex: 1,
    minWidth: '200px',
  },
  searchIcon: {
    position: 'absolute',
    left: '12px',
  },
  searchInput: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.9rem',
    padding: '0.65rem 1rem 0.65rem 2.25rem',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--border-color)',
    backgroundColor: 'var(--bg-base)',
    color: 'var(--text-primary)',
    outline: 'none',
    width: '100%',
  },
  filterDropdowns: {
    display: 'flex',
    gap: '0.75rem',
    flexWrap: 'wrap',
  },
  selectWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.35rem',
    padding: '0.55rem 0.75rem',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--border-color)',
    backgroundColor: 'var(--bg-base)',
  },
  filterSelect: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.85rem',
    border: 'none',
    backgroundColor: 'transparent',
    color: 'var(--text-primary)',
    outline: 'none',
    cursor: 'pointer',
  },
  addDonBtn: {
    padding: '0.65rem 1.25rem',
    fontSize: '0.88rem',
  },
  tableCard: {
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--border-color)',
    backgroundColor: 'var(--bg-surface)',
    overflow: 'hidden',
    boxShadow: 'var(--shadow-sm)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
    fontSize: '0.88rem',
    tableLayout: 'fixed',
  },
  th: {
    padding: '1rem 1.25rem',
    backgroundColor: 'var(--bg-surface-hover)',
    fontWeight: 700,
    color: 'var(--text-primary)',
    borderBottom: '1px solid var(--border-color)',
    fontSize: '0.8rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  tr: {
    borderBottom: '1px solid var(--border-color)',
    '&:hover': {
      backgroundColor: 'rgba(6, 78, 59, 0.01)',
    }
  },
  td: {
    padding: '1rem 1.25rem',
    verticalAlign: 'middle',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  donorName: {
    display: 'block',
    fontSize: '0.92rem',
    fontWeight: 600,
  },
  donorEmail: {
    display: 'block',
    fontSize: '0.78rem',
    color: 'var(--text-secondary)',
  },
  donorPhone: {
    display: 'block',
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
  },
  dateCell: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
  },
  campBadge: {
    display: 'inline-block',
    padding: '0.2rem 0.5rem',
    borderRadius: 'var(--radius-sm)',
    fontSize: '0.75rem',
    fontWeight: 600,
    backgroundColor: 'rgba(13, 148, 136, 0.08)',
    color: 'var(--primary-light)',
  },
  panBadge: {
    fontFamily: 'monospace',
    fontSize: '0.8rem',
    padding: '0.15rem 0.4rem',
    borderRadius: '3px',
    backgroundColor: 'var(--bg-base)',
    border: '1px solid var(--border-color)',
    color: 'var(--text-primary)',
  },
  panNone: {
    fontSize: '0.78rem',
    color: 'var(--text-muted)',
    fontStyle: 'italic',
  },
  methodBadge: {
    fontSize: '0.78rem',
    color: 'var(--text-secondary)',
    textTransform: 'uppercase',
    fontWeight: 600,
  },
  amountText: {
    fontSize: '1rem',
    color: 'var(--primary)',
  },
  noResults: {
    padding: '3rem',
    textAlign: 'center',
    color: 'var(--text-muted)',
    fontStyle: 'italic',
  },
  inboxLayout: {
    display: 'flex',
    gap: '1.5rem',

  },
  inboxSidebar: {
    width: '320px',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--border-color)',
    backgroundColor: 'var(--bg-surface)',
    display: 'flex',
    flexDirection: 'column',
    height: '600px',
    overflow: 'hidden',
  },
  inboxFilterHeader: {
    padding: '1rem',
    borderBottom: '1px solid var(--border-color)',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    backgroundColor: 'var(--bg-surface-hover)',
  },
  selectWrapperFull: {
    width: '100%',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--radius-md)',
    backgroundColor: 'var(--bg-surface)',
    padding: '0.45rem 0.65rem',
  },
  filterSelectFull: {
    width: '100%',
    border: 'none',
    backgroundColor: 'transparent',
    fontFamily: 'var(--font-body)',
    fontSize: '0.85rem',
    outline: 'none',
    color: 'var(--text-primary)',
  },
  inboxList: {
    flex: 1,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  inboxItem: (isActive, isPending) => ({
    padding: '1.1rem',
    borderBottom: '1px solid var(--border-color)',
    cursor: 'pointer',
    backgroundColor: isActive ? 'rgba(6, 78, 59, 0.04)' : 'transparent',
    borderLeft: isActive ? '4px solid var(--primary)' : isPending ? '4px solid #d97706' : '4px solid #047857',
    transition: 'background-color var(--transition-fast), border-color var(--transition-fast)',
    '&:hover': {
      backgroundColor: 'var(--bg-surface-hover)',
    }
  }),
  inboxItemHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: '0.2rem',
  },
  inboxItemName: {
    fontSize: '0.88rem',
    fontWeight: 600,
  },
  inboxItemDate: {
    fontSize: '0.72rem',
    color: 'var(--text-muted)',
  },
  inboxItemSubject: {
    display: 'block',
    fontSize: '0.8rem',
    color: 'var(--text-secondary)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    marginBottom: '0.5rem',
  },
  inboxItemFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inboxItemCat: {
    fontSize: '0.72rem',
    color: 'var(--primary-light)',
    fontWeight: 600,
  },
  statusLabel: (status) => {
    const isPend = status === 'Pending';
    return {
      fontSize: '0.7rem',
      fontWeight: 700,
      textTransform: 'uppercase',
      padding: '0.15rem 0.45rem',
      borderRadius: 'var(--radius-sm)',
      backgroundColor: isPend ? '#fffbeb' : '#d1fae5',
      color: isPend ? '#d97706' : '#047857',
      border: isPend ? '1px solid #fde68a' : '1px solid #a7f3d0',
    };
  },
  inboxEmpty: {
    padding: '2rem',
    textAlign: 'center',
    color: 'var(--text-muted)',
    fontStyle: 'italic',
    fontSize: '0.85rem',
  },
  inboxDetails: {
    flex: 1,
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--border-color)',
    backgroundColor: 'var(--bg-surface)',
    height: '600px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  detailsPlaceholder: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '3rem',
    textAlign: 'center',
    color: 'var(--text-muted)',
  },
  detailsContainer: {
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  detailsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottom: '1px solid var(--border-color)',
    paddingBottom: '1.25rem',
  },
  detailsMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
    marginTop: '0.25rem',
  },
  detailsTime: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
  },
  messageBox: {
    backgroundColor: 'var(--bg-base)',
    padding: '1.25rem',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--border-color)',
    lineHeight: 1.6,
  },
  replyForm: {
    borderTop: '1px solid var(--border-color)',
    paddingTop: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  replyBox: {
    borderTop: '1px dashed var(--border-color)',
    paddingTop: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    backgroundColor: 'rgba(6, 78, 59, 0.02)',
    padding: '1rem',
    borderRadius: 'var(--radius-md)',
    color: 'var(--text-primary)',
  },
  replyTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    fontSize: '0.9rem',
    fontWeight: 700,
    color: 'var(--primary)',
  },
  campaignList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  campManagerCard: {
    padding: '2rem',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid var(--border-color)',
    backgroundColor: 'var(--bg-surface)',
    boxShadow: 'var(--shadow-sm)',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  campHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '1rem',
  },
  campNameText: {
    fontSize: '1.25rem',
    fontWeight: 800,
    marginTop: '0.25rem',
  },
  circleProgressWrapper: {
    width: '60px',
    height: '60px',
    flexShrink: 0,
  },
  progressCircle: {
    transform: 'rotate(-90deg)',
  },
  circleBg: {
    fill: 'none',
    stroke: 'var(--bg-base)',
    strokeWidth: 3.2,
  },
  circleDash: (pct, campId) => {
    let color = 'var(--primary)';
    if (campId === 'camp_healthcare') color = 'var(--primary-light)';
    if (campId === 'camp_livelihood') color = 'var(--secondary)';
    if (campId === 'camp_environment') color = 'var(--accent)';
    return {
      fill: 'none',
      stroke: color,
      strokeWidth: 3.2,
      strokeDasharray: `${pct}, 100`,
      strokeLinecap: 'round',
    };
  },
  circleText: {
    fill: 'var(--text-primary)',
    fontFamily: 'var(--font-heading)',
    fontSize: '9px',
    fontWeight: 700,
    textAnchor: 'middle',
    transform: 'rotate(90deg)',
    transformOrigin: '50% 50%',
  },
  campStatsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '1rem',
    padding: '1.25rem',
    backgroundColor: 'var(--bg-base)',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--border-color)',
  },
  statLabel: {
    display: 'block',
    fontSize: '0.78rem',
    color: 'var(--text-secondary)',
    textTransform: 'uppercase',
    letterSpacing: '0.02em',
    marginBottom: '0.2rem',
  },
  statValue: {
    display: 'block',
    fontSize: '1.25rem',
    fontWeight: 800,
  },
  campActionForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
  },
  inlineForm: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  inlineInput: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.9rem',
    padding: '0.5rem 0.75rem',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--border-color)',
    backgroundColor: 'var(--bg-surface)',
    color: 'var(--text-primary)',
    outline: 'none',
    width: '180px',
  },
  errorText: {
    color: '#ef4444',
    fontSize: '0.78rem',
    marginTop: '0.25rem',
  }
};

// Modal specific styling
const modalStyles = {
  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999999,
    padding: '1rem',
  },
  modal: {
    width: '100%',
    maxWidth: '560px',
    backgroundColor: 'var(--bg-surface)',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-xl)',
    border: '1px solid var(--border-color)',
    overflow: 'hidden',
    animation: 'fadeIn 0.3s ease-out',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.25rem 1.5rem',
    borderBottom: '1px solid var(--border-color)',
    backgroundColor: 'var(--bg-surface-hover)',
  },
  closeBtn: {
    border: 'none',
    backgroundColor: 'transparent',
    color: 'var(--text-secondary)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    '&:hover': {
      backgroundColor: 'var(--border-color)',
      color: 'var(--text-primary)',
    }
  },
  grid2: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '0.75rem',
    paddingTop: '1rem',
    borderTop: '1px solid var(--border-color)',
  },
  cancelBtn: {
    padding: '0.65rem 1.2rem',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--border-color)',
    backgroundColor: 'transparent',
    color: 'var(--text-secondary)',
    fontWeight: 600,
    cursor: 'pointer',
    fontSize: '0.88rem',
  },
  submitBtn: {
    padding: '0.65rem 1.5rem',
    fontSize: '0.88rem',
  },
  
  // Tax Receipt Styles
  receiptModal: {
    width: '100%',
    maxWidth: '680px',
    backgroundColor: '#ffffff', // Always light for printed receipt feel
    borderRadius: 'var(--radius-md)',
    boxShadow: 'var(--shadow-xl)',
    border: '2px solid var(--primary)',
    overflow: 'hidden',
    color: '#0f172a',
    animation: 'fadeIn 0.3s ease-out',
  },
  receiptHeader: {
    backgroundColor: 'var(--primary)',
    padding: '1rem 1.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  receiptCloseBtn: {
    border: 'none',
    backgroundColor: 'transparent',
    color: '#ffffff',
    cursor: 'pointer',
  },
  receiptBody: {
    padding: '2rem',
    backgroundColor: '#ffffff',
    fontFamily: 'Outfit, sans-serif',
  },
  receiptTopRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  receiptHr: {
    margin: '1.25rem 0',
    border: 'none',
    borderTop: '1px solid #e2e8f0',
  },
  receiptContent: {
    fontSize: '0.95rem',
    lineHeight: 1.7,
    color: '#334155',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  receiptGridInfo: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
    marginTop: '1.5rem',
  },
  receiptBoxItem: {
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0',
    padding: '0.85rem 1rem',
    borderRadius: 'var(--radius-sm)',
    fontSize: '0.78rem',
    lineHeight: 1.5,
  },
  receiptFooter: {
    marginTop: '2rem',
    display: 'flex',
    gap: '2rem',
    alignItems: 'flex-end',
    borderTop: '1px dashed #cbd5e1',
    paddingTop: '1.25rem',
  },
  receiptActions: {
    backgroundColor: '#f1f5f9',
    padding: '1rem 1.5rem',
    display: 'flex',
    gap: '0.75rem',
    borderTop: '1px solid #e2e8f0',
  },
  receiptCloseBtnAction: {
    padding: '0.65rem 1.25rem',
    borderRadius: 'var(--radius-md)',
    border: '1px solid #cbd5e1',
    backgroundColor: '#ffffff',
    color: '#475569',
    fontWeight: 600,
    cursor: 'pointer',
    fontSize: '0.88rem',
  }
};

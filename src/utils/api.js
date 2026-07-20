import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// --- IMAGE UPLOAD ---
export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);
  
  const response = await api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data; // { url: '...' }
};

// --- DONATIONS ---
export const getDonations = async () => {
  const response = await api.get('/donations');
  return response.data;
};

export const addDonation = async (donationData) => {
  const response = await api.post('/donations', donationData);
  return response.data;
};

// --- QUERIES ---
export const getQueries = async () => {
  const response = await api.get('/queries');
  return response.data;
};

export const addQuery = async (queryData) => {
  const response = await api.post('/queries', queryData);
  return response.data;
};

export const replyToQuery = async (queryId, replyText) => {
  const response = await api.patch(`/queries/${queryId}/reply`, { reply: replyText });
  return response.data;
};

// --- CAMPAIGNS ---
export const getCampaigns = async () => {
  const response = await api.get('/campaigns');
  return response.data;
};

export const updateCampaignGoal = async (campaignId, target) => {
  const response = await api.patch(`/campaigns/${campaignId}`, { target });
  return response.data;
};

// --- GALLERY CATEGORIES ---
export const getGalleryCategories = async () => {
  const response = await api.get('/gallery-categories');
  return response.data;
};

export const addGalleryCategory = async (categoryData) => {
  const response = await api.post('/gallery-categories', categoryData);
  return response.data;
};

export const updateGalleryCategory = async (categoryId, categoryData) => {
  const response = await api.put(`/gallery-categories/${categoryId}`, categoryData);
  return response.data;
};

export const deleteGalleryCategory = async (categoryId) => {
  const response = await api.delete(`/gallery-categories/${categoryId}`);
  return response.data;
};

// --- GALLERY ITEMS ---
export const getGalleryItems = async () => {
  const response = await api.get('/gallery-items');
  return response.data;
};

export const addGalleryItem = async (itemData) => {
  const response = await api.post('/gallery-items', itemData);
  return response.data;
};

export const updateGalleryItem = async (itemId, itemData) => {
  const response = await api.put(`/gallery-items/${itemId}`, itemData);
  return response.data;
};

export const deleteGalleryItem = async (itemId) => {
  const response = await api.delete(`/gallery-items/${itemId}`);
  return response.data;
};

// --- SERVICES ---
export const getServices = async () => {
  const response = await api.get('/services');
  return response.data;
};

export const addService = async (serviceData) => {
  const response = await api.post('/services', serviceData);
  return response.data;
};

export const updateService = async (serviceId, serviceData) => {
  const response = await api.put(`/services/${serviceId}`, serviceData);
  return response.data;
};

export const deleteService = async (serviceId) => {
  const response = await api.delete(`/services/${serviceId}`);
  return response.data;
};

// --- MENU OPTIONS ---
export const getMenuOptions = async () => {
  const response = await api.get('/menu-options');
  return response.data;
};

export const addMenuOption = async (optionData) => {
  const response = await api.post('/menu-options', optionData);
  return response.data;
};

export const updateMenuOption = async (optionId, optionData) => {
  const response = await api.put(`/menu-options/${optionId}`, optionData);
  return response.data;
};

export const deleteMenuOption = async (optionId) => {
  const response = await api.delete(`/menu-options/${optionId}`);
  return response.data;
};

// --- PAGE CONTENT ---
export const getPage = async (pageId) => {
  const response = await api.get(`/pages/${pageId}`);
  return response.data;
};

export const updatePage = async (pageId, pageData) => {
  const response = await api.put(`/pages/${pageId}`, pageData);
  return response.data;
};

// --- BOARD MEMBERS ---
export const getBoardMembers = async () => {
  const response = await api.get('/board-members');
  return response.data;
};

export const addBoardMember = async (memberData) => {
  const response = await api.post('/board-members', memberData);
  return response.data;
};

export const updateBoardMember = async (memberId, memberData) => {
  const response = await api.put(`/board-members/${memberId}`, memberData);
  return response.data;
};

export const deleteBoardMember = async (memberId) => {
  const response = await api.delete(`/board-members/${memberId}`);
  return response.data;
};

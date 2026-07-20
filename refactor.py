import re

with open('src/pages/AdminDashboard.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Imports
content = content.replace("'../utils/localStorageHelper'", "'../utils/api'")

# 2. refreshData
content = content.replace('const refreshData = () => {', 'const refreshData = async () => {')
content = content.replace('setDonations(getDonations());', 'setDonations(await getDonations());')
content = content.replace('setQueries(getQueries());', 'setQueries(await getQueries());')
content = content.replace('setCampaigns(getCampaigns());', 'setCampaigns(await getCampaigns());')
content = content.replace('setGalleryCategories(getGalleryCategories());', 'setGalleryCategories(await getGalleryCategories());')
content = content.replace('setGalleryItems(getGalleryItems());', 'setGalleryItems(await getGalleryItems());')
content = content.replace('setServices(getServices());', 'setServices(await getServices());')

# 3. Handlers
content = content.replace('const handleManualDonSubmit = (e) => {', 'const handleManualDonSubmit = async (e) => {')
content = content.replace('addDonation(donationData);', 'await addDonation(donationData);')

content = content.replace('const handleSendReply = (queryId) => {', 'const handleSendReply = async (queryId) => {')
content = content.replace('const updated = replyToQuery(queryId, replyText);', 'const updated = await replyToQuery(queryId, replyText);')

content = content.replace('const handleGoalUpdate = (campaignId, newGoal) => {', 'const handleGoalUpdate = async (campaignId, newGoal) => {')
content = content.replace('updateCampaignGoal(campaignId, newGoal);', 'await updateCampaignGoal(campaignId, newGoal);')

content = content.replace('const handleSaveCategory = (e) => {', 'const handleSaveCategory = async (e) => {')
content = content.replace('updateGalleryCategory(editingCategory.id, categoryForm);', 'await updateGalleryCategory(editingCategory.id, categoryForm);')
content = content.replace("addGalleryCategory({ ...categoryForm, id: newId || 'cat_' + Date.now() });", "await addGalleryCategory({ ...categoryForm, id: newId || 'cat_' + Date.now() });")

content = content.replace('const handleDeleteCategory = (id) => {', 'const handleDeleteCategory = async (id) => {')
content = content.replace('deleteGalleryCategory(id);', 'await deleteGalleryCategory(id);')

content = content.replace('const handleSaveImage = (e) => {', 'const handleSaveImage = async (e) => {')
content = content.replace('updateGalleryItem(editingImage.id, imageForm);', 'await updateGalleryItem(editingImage.id, imageForm);')
content = content.replace('addGalleryItem(imageForm);', 'await addGalleryItem(imageForm);')

content = content.replace('const handleDeleteImage = (id) => {', 'const handleDeleteImage = async (id) => {')
content = content.replace('deleteGalleryItem(id);', 'await deleteGalleryItem(id);')

content = content.replace('const handleSaveService = (e) => {', 'const handleSaveService = async (e) => {')
content = content.replace('updateService(editingService.id, finalServiceForm);', 'await updateService(editingService.id, finalServiceForm);')
content = content.replace('addService(finalServiceForm);', 'await addService(finalServiceForm);')

content = content.replace('const handleDeleteService = (id) => {', 'const handleDeleteService = async (id) => {')
content = content.replace('deleteService(id);', 'await deleteService(id);')

# Finally, replace refreshData() calls inside handlers
content = content.replace('refreshData();', 'await refreshData();')
# Revert the ones inside useEffect which shouldn't be awaited directly
content = content.replace('await refreshData();\n    }', 'refreshData();\n    }')
content = content.replace("setActiveTab('overview'); await refreshData();", "setActiveTab('overview'); refreshData();")
content = content.replace("setActiveTab('donations'); await refreshData();", "setActiveTab('donations'); refreshData();")
content = content.replace("setActiveTab('inquiries'); await refreshData();", "setActiveTab('inquiries'); refreshData();")
content = content.replace("setActiveTab('campaigns'); await refreshData();", "setActiveTab('campaigns'); refreshData();")
content = content.replace("setActiveTab('galleryCategories'); await refreshData();", "setActiveTab('galleryCategories'); refreshData();")
content = content.replace("setActiveTab('galleryImages'); await refreshData();", "setActiveTab('galleryImages'); refreshData();")
content = content.replace("setActiveTab('services'); await refreshData();", "setActiveTab('services'); refreshData();")
content = content.replace("<button onClick={await refreshData}", "<button onClick={refreshData}")

with open('src/pages/AdminDashboard.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

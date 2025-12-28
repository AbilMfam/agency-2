const API_BASE_URL = '/api/v1';

class ApiService {
  constructor() {
    this.baseUrl = API_BASE_URL;
    this.token = localStorage.getItem('auth_token');
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'خطایی رخ داده است');
    }

    return data;
  }

  // Auth
  async login(email, password) {
    const data = await this.request('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (data.token) {
      this.setToken(data.token);
    }
    return data;
  }

  async logout() {
    await this.request('/admin/logout', { method: 'POST' });
    this.clearToken();
  }

  async getMe() {
    return this.request('/admin/me');
  }

  // Dashboard
  async getDashboard() {
    return this.request('/admin/dashboard');
  }

  async getDashboardStats() {
    return this.request('/admin/dashboard/stats');
  }

  // Services
  async getServices() {
    return this.request('/services');
  }

  async getService(slug) {
    return this.request(`/services/${slug}`);
  }

  async createService(data) {
    return this.request('/admin/services', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateService(id, data) {
    return this.request(`/admin/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteService(id) {
    return this.request(`/admin/services/${id}`, { method: 'DELETE' });
  }

  // Portfolios
  async getPortfolios(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/portfolios${query ? `?${query}` : ''}`);
  }

  async getPortfolio(slug) {
    return this.request(`/portfolios/${slug}`);
  }

  async createPortfolio(data) {
    return this.request('/admin/portfolios', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updatePortfolio(id, data) {
    return this.request(`/admin/portfolios/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deletePortfolio(id) {
    return this.request(`/admin/portfolios/${id}`, { method: 'DELETE' });
  }

  // Industries
  async getIndustries() {
    return this.request('/industries');
  }

  async getIndustry(slug) {
    return this.request(`/industries/${slug}`);
  }

  async createIndustry(data) {
    return this.request('/admin/industries', { method: 'POST', body: JSON.stringify(data) });
  }

  async updateIndustry(id, data) {
    return this.request(`/admin/industries/${id}`, { method: 'PUT', body: JSON.stringify(data) });
  }

  async deleteIndustry(id) {
    return this.request(`/admin/industries/${id}`, { method: 'DELETE' });
  }

  // Blog
  async getBlogPosts() {
    return this.request('/blog');
  }

  async getPublicBlogPosts() {
    return this.request('/blog/public');
  }

  async getBlogPost(slug) {
    return this.request(`/blog/${slug}`);
  }

  async createBlogPost(data) {
    return this.request('/admin/blog', { method: 'POST', body: JSON.stringify(data) });
  }

  async updateBlogPost(id, data) {
    return this.request(`/admin/blog/${id}`, { method: 'PUT', body: JSON.stringify(data) });
  }

  async deleteBlogPost(id) {
    return this.request(`/admin/blog/${id}`, { method: 'DELETE' });
  }

  // Clients
  async getClients() {
    return this.request('/clients');
  }

  async createClient(data) {
    return this.request('/admin/clients', { method: 'POST', body: JSON.stringify(data) });
  }

  async updateClient(id, data) {
    return this.request(`/admin/clients/${id}`, { method: 'PUT', body: JSON.stringify(data) });
  }

  async deleteClient(id) {
    return this.request(`/admin/clients/${id}`, { method: 'DELETE' });
  }

  // Packages
  async getPackages() {
    return this.request('/packages');
  }

  async createPackage(data) {
    return this.request('/admin/packages', { method: 'POST', body: JSON.stringify(data) });
  }

  async updatePackage(id, data) {
    return this.request(`/admin/packages/${id}`, { method: 'PUT', body: JSON.stringify(data) });
  }

  async deletePackage(id) {
    return this.request(`/admin/packages/${id}`, { method: 'DELETE' });
  }

  // Testimonials
  async getTestimonials() {
    return this.request('/testimonials');
  }

  async createTestimonial(data) {
    return this.request('/admin/testimonials', { method: 'POST', body: JSON.stringify(data) });
  }

  async updateTestimonial(id, data) {
    return this.request(`/admin/testimonials/${id}`, { method: 'PUT', body: JSON.stringify(data) });
  }

  async deleteTestimonial(id) {
    return this.request(`/admin/testimonials/${id}`, { method: 'DELETE' });
  }

  // Contact
  async submitContact(data) {
    return this.request('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getContacts(params = {}) {
    const query = new URLSearchParams(params).toString();
    return this.request(`/admin/contacts${query ? `?${query}` : ''}`);
  }

  async getContact(id) {
    return this.request(`/admin/contacts/${id}`);
  }

  async updateContact(id, data) {
    return this.request(`/admin/contacts/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  // Site Settings
  async getSettings(group = null) {
    const query = group ? `?group=${group}` : '';
    return this.request(`/settings${query}`);
  }

  async getSetting(key) {
    return this.request(`/settings/${key}`);
  }

  async updateSettings(settings) {
    return this.request('/admin/settings/bulk', {
      method: 'POST',
      body: JSON.stringify({ settings }),
    });
  }

  async updateSetting(key, value, type = 'text', group = 'general') {
    return this.request(`/admin/settings/${key}`, {
      method: 'PUT',
      body: JSON.stringify({ value, type, group }),
    });
  }

  // Reels
  async getReels(type = null) {
    const query = type ? `?type=${type}` : '';
    return this.request(`/reels${query}`);
  }

  async createReel(data) {
    return this.request('/admin/reels', { method: 'POST', body: JSON.stringify(data) });
  }

  async updateReel(id, data) {
    return this.request(`/admin/reels/${id}`, { method: 'PUT', body: JSON.stringify(data) });
  }

  async deleteReel(id) {
    return this.request(`/admin/reels/${id}`, { method: 'DELETE' });
  }

  // Home Cards
  async getHomeCards(section = null) {
    const query = section ? `?section=${section}` : '';
    return this.request(`/home-cards${query}`);
  }

  // Web Projects
  async getWebProjects(type = null) {
    const query = type && type !== 'all' ? `?type=${type}` : '';
    return this.request(`/web-projects${query}`);
  }

  async getWebProject(slug) {
    return this.request(`/web-projects/${slug}`);
  }

  async getWebProjectTypes() {
    return this.request('/web-projects/types');
  }

  async createWebProject(data) {
    return this.request('/admin/web-projects', { method: 'POST', body: JSON.stringify(data) });
  }

  async updateWebProject(id, data) {
    return this.request(`/admin/web-projects/${id}`, { method: 'PUT', body: JSON.stringify(data) });
  }

  async deleteWebProject(id) {
    return this.request(`/admin/web-projects/${id}`, { method: 'DELETE' });
  }

  async createHomeCard(data) {
    return this.request('/admin/home-cards', { method: 'POST', body: JSON.stringify(data) });
  }

  async updateHomeCard(id, data) {
    return this.request(`/admin/home-cards/${id}`, { method: 'PUT', body: JSON.stringify(data) });
  }

  async deleteHomeCard(id) {
    return this.request(`/admin/home-cards/${id}`, { method: 'DELETE' });
  }

  // File Upload
  async uploadFile(file, folder = 'uploads') {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    const url = `${this.baseUrl}/admin/files/upload`;
    const headers = {};
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'خطا در آپلود فایل');
    }
    return data;
  }

  async uploadVideo(file, type = 'vertical', folder = 'videos') {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);
    formData.append('type', type);

    const url = `${this.baseUrl}/admin/files/upload-video`;
    const headers = {};
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'خطا در آپلود ویدیو');
    }
    return data;
  }
}

export const api = new ApiService();
export default api;

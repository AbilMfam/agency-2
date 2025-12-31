import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

const API_URL = 'http://127.0.0.1:8000';

const ImageUpload = ({ value, onChange, folder = 'uploads', label = 'تصویر' }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('فقط فایل‌های تصویری مجاز هستند');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('حجم فایل نباید بیشتر از 5 مگابایت باشد');
      return;
    }

    setError('');
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      const token = localStorage.getItem('auth_token');
      const response = await fetch(`${API_URL}/api/v1/admin/files/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        onChange(data.path);
      } else {
        setError(data.message || 'خطا در آپلود فایل');
      }
    } catch (err) {
      setError('خطا در اتصال به سرور');
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div>
      <label className="block text-dark-300 text-sm mb-2">{label}</label>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {value ? (
        <div className="relative group">
          <img
            src={value}
            alt="Preview"
            className="w-full h-48 object-cover rounded-xl border border-white/10"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-2 rounded-lg bg-red-500/80 text-white opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="w-full h-48 border-2 border-dashed border-white/20 rounded-xl flex flex-col items-center justify-center gap-3 hover:border-primary-500/50 hover:bg-white/5 transition-colors disabled:opacity-50"
        >
          {uploading ? (
            <>
              <div className="w-8 h-8 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin" />
              <span className="text-dark-400 text-sm">در حال آپلود...</span>
            </>
          ) : (
            <>
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                <Upload className="w-6 h-6 text-dark-400" />
              </div>
              <span className="text-dark-400 text-sm">کلیک کنید یا فایل را بکشید</span>
              <span className="text-dark-500 text-xs">PNG, JPG تا 5MB</span>
            </>
          )}
        </button>
      )}

      {error && (
        <p className="mt-2 text-red-400 text-sm">{error}</p>
      )}
    </div>
  );
};

export default ImageUpload;

import { useState, useCallback, useEffect, useMemo } from 'react';
import { Plus, Trash2, Lightbulb, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';
import { parseHtmlCallouts } from '../../utils/htmlParser';

const CalloutBuilder = ({ value, onChange }) => {
  const [callouts, setCallouts] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  const types = [
    { id: 'emerald', label: 'نکته', color: 'emerald', icon: Lightbulb },
    { id: 'blue', label: 'اطلاعات', color: 'blue', icon: Info },
    { id: 'yellow', label: 'هشدار', color: 'yellow', icon: AlertTriangle },
    { id: 'red', label: 'خطر', color: 'red', icon: AlertCircle },
    { id: 'green', label: 'موفقیت', color: 'green', icon: CheckCircle },
  ];

  const generateHTML = useCallback((calloutsList) => {
    return calloutsList.map(callout => {
      const typeConfig = types.find(t => t.id === callout.type);
      const iconName = typeConfig?.icon || 'lightbulb';
      
      // Get icon name as string
      const iconString = typeof iconName === 'string' ? iconName : 'lightbulb';
      
      // Simple icon without complex paths
      const iconHtml = `<div class="w-5 h-5 bg-${callout.type}-500 rounded-full flex items-center justify-center">
        <div class="w-2 h-2 bg-white rounded-full"></div>
      </div>`;
      
      return `<div class="bg-${callout.type}-500/10 border-${callout.type}-500/30 border-r-4 rounded-xl p-5 my-6">
        <div class="flex items-start gap-3">
          <div class="flex-shrink-0 mt-0.5">
            ${iconHtml}
          </div>
          <div class="flex-1">
            <h4 class="font-bold text-${callout.type}-400 mb-2">${callout.title || ''}</h4>
            <div class="text-dark-300 leading-relaxed">${callout.content || ''}</div>
          </div>
        </div>
      </div>`;
    }).join('\n');
  }, [types]);

  const addCallout = useCallback(() => {
    const newCallout = {
      id: Date.now(),
      type: 'emerald',
      title: '',
      content: '',
    };
    const newCallouts = [...callouts, newCallout];
    setCallouts(newCallouts);
    
    // Update parent
    const html = generateHTML(newCallouts);
    onChange(html);
  }, [callouts, generateHTML, onChange]);

  
  const updateCallout = useCallback((id, field, value) => {
    const newCallouts = callouts.map(callout => 
      callout.id === id ? { ...callout, [field]: value } : callout
    );
    setCallouts(newCallouts);
    
    // Update parent
    const html = generateHTML(newCallouts);
    onChange(html);
  }, [callouts, generateHTML, onChange]);

  const deleteCallout = useCallback((id) => {
    const newCallouts = callouts.filter(callout => callout.id !== id);
    setCallouts(newCallouts);
    
    // Update parent
    const html = generateHTML(newCallouts);
    onChange(html);
  }, [callouts, generateHTML, onChange]);

  // Initialize with existing value or empty array
  useEffect(() => {
    if (!isInitialized) {
      if (value) {
        // Parse existing blocks to callout objects
        const parsedCallouts = parseHtmlCallouts(value);
        setCallouts(parsedCallouts);
      } else {
        setCallouts([]);
      }
      setIsInitialized(true);
    }
  }, [value, isInitialized]);

  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-white">کال‌اوت‌ها</h3>
        <button
          type="button"
          onClick={addCallout}
          className="px-3 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          افزودن کال‌اوت
        </button>
      </div>

      {callouts.map((callout, index) => {
            const typeConfig = types.find(t => t.id === callout.type);
            const Icon = typeConfig?.icon || Lightbulb;
            
            return (
            <div key={callout.id} className="bg-dark-800/50 border border-white/10 rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-lg bg-${callout.type}-500/10 border border-${callout.type}-500/30`}>
                    <Icon className={`w-4 h-4 text-${callout.type}-400`} />
                  </div>
                  <div className="flex flex-col">
                    <select
                      value={callout.type}
                      onChange={(e) => updateCallout(callout.id, 'type', e.target.value)}
                      className="bg-dark-700 border border-white/10 rounded-lg px-3 py-1 text-white text-sm"
                    >
                      {types.map(type => (
                        <option key={type.id} value={type.id}>{type.label}</option>
                      ))}
                    </select>
                    {callout.originalType && (
                      <span className="text-xs text-dark-400">
                        نوع: {callout.originalType}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => deleteCallout(callout.id)}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3">
                <div className="relative">
                  <input
                    type="text"
                    value={callout.title}
                    onChange={(e) => updateCallout(callout.id, 'title', e.target.value)}
                    placeholder="عنوان بلاک"
                    className={`w-full bg-dark-700 border border-white/10 rounded-lg px-3 py-2 text-white pr-8`}
                    maxLength={255}
                  />
                  <div className={`absolute right-2 top-1/2 -translate-y-1/2 w-1 h-4 bg-${callout.type}-400 rounded-full`}></div>
                </div>
                <textarea
                  value={callout.content}
                  onChange={(e) => updateCallout(callout.id, 'content', e.target.value)}
                  placeholder="محتوای بلاک"
                  rows={3}
                  className="w-full bg-dark-700 border border-white/10 rounded-lg px-3 py-2 text-white resize-none"
                  maxLength={1000}
                />
              </div>

              {/* Show additional info for complex blocks */}
              {callout.originalData && (
                <div className="mt-3 p-2 bg-dark-900/50 rounded border border-white/5">
                  <div className="text-xs text-dark-400">
                    {callout.originalType === 'quote' && `نویسنده: ${callout.originalData.author || ''}`}
                    {callout.originalType === 'list' && `تعداد آیتم‌ها: ${callout.originalData.items?.length || 0}`}
                    {callout.originalType === 'cta' && `دکمه: ${callout.originalData.button_text || ''}`}
                  </div>
                </div>
              )}

              {/* Preview */}
              {(callout.title || callout.content) && (
                <div className="mt-4 p-3 bg-dark-900/50 rounded-lg border border-white/5">
                  <div className="text-xs text-dark-400 mb-2">پیش‌نمایش:</div>
                  <div className={`bg-${callout.type}-500/5 border border-${callout.type}-500/20 rounded-lg p-3`}>
                    {callout.title && (
                      <div className={`font-medium text-${callout.type}-400 mb-1`}>{callout.title}</div>
                    )}
                    {callout.content && (
                      <div className="text-dark-300 text-sm">{callout.content}</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}

      {callouts.length === 0 && (
        <div className="text-center py-8 text-dark-400">
          <Lightbulb className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>هنوز کال‌اوتی اضافه نشده است</p>
          <p className="text-sm mt-1">برای افزودن کال‌اوت روی دکمه بالا کلیک کنید</p>
        </div>
      )}
    </div>
  );
};

export default CalloutBuilder;

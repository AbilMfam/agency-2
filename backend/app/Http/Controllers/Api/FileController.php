<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class FileController extends Controller
{
    public function upload(Request $request)
    {
        $request->validate([
            'file' => 'required|file|max:10240',
            'folder' => 'nullable|string',
        ]);

        try {
            $file = $request->file('file');
            $folder = $request->input('folder', 'uploads');
            
            // Log upload attempt
            \Log::info('File upload attempt', [
                'original_name' => $file->getClientOriginalName(),
                'size' => $file->getSize(),
                'mime_type' => $file->getMimeType(),
                'folder' => $folder
            ]);
            
            $filename = time() . '_' . Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME)) 
                        . '.' . $file->getClientOriginalExtension();
            
            $path = $file->storeAs("public/{$folder}", $filename, 'public');
            
            // Log success
            \Log::info('File uploaded successfully', [
                'path' => $path,
                'url' => Storage::disk('public')->url(str_replace('public/', '', $path))
            ]);
            
            return response()->json([
                'success' => true,
                'path' => Storage::disk('public')->url(str_replace('public/', '', $path)),
                'filename' => $filename,
            ]);
        } catch (\Exception $e) {
            // Log error
            \Log::error('File upload failed', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'خطا در آپلود فایل: ' . $e->getMessage()
            ], 500);
        }
    }

    public function list(Request $request)
    {
        $folder = $request->input('folder', 'uploads');
        $files = Storage::disk('public')->files("{$folder}");
        
        $fileList = collect($files)->map(function ($file) {
            return [
                'name' => basename($file),
                'path' => Storage::disk('public')->url($file),
                'size' => Storage::disk('public')->size($file),
                'modified' => Storage::disk('public')->lastModified($file),
            ];
        });

        return response()->json([
            'success' => true,
            'data' => $fileList,
        ]);
    }

    public function delete(Request $request)
    {
        $request->validate(['path' => 'required|string']);
        
        $path = str_replace('/storage/', '', $request->input('path'));
        
        if (Storage::disk('public')->exists($path)) {
            Storage::disk('public')->delete($path);
            return response()->json(['success' => true]);
        }

        return response()->json(['success' => false, 'message' => 'فایل یافت نشد'], 404);
    }

    public function uploadVideo(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:mp4,mov,avi,wmv,webm|max:102400', // 100MB max
            'folder' => 'nullable|string',
            'type' => 'nullable|string|in:vertical,horizontal',
        ]);

        $file = $request->file('file');
        $folder = $request->input('folder', 'videos');
        $type = $request->input('type', 'vertical');
        
        $subfolder = $type === 'vertical' ? 'reels' : 'horizontal';
        
        $filename = time() . '_' . Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME)) 
                    . '.' . $file->getClientOriginalExtension();
        
        $path = $file->storeAs("public/{$folder}/{$subfolder}", $filename, 'public');
        
        return response()->json([
            'success' => true,
            'path' => Storage::disk('public')->url(str_replace('public/', '', $path)),
            'filename' => $filename,
            'type' => $type,
        ]);
    }
}

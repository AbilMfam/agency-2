# Download all images for the agency website
$basePath = ".\storage\app\public"

# Services images
$services = @{
    "services/video-production.jpg" = "https://images.unsplash.com/photo-1579632652768-6cb9dcf85912?w=800"
    "services/video-editing.jpg" = "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800"
    "services/motion-graphics.jpg" = "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800"
    "services/photography.jpg" = "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800"
    "services/content-creation.jpg" = "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800"
    "services/social-media.jpg" = "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800"
    "services/digital-marketing.jpg" = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800"
    "services/branding.jpg" = "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800"
    "services/web-design.jpg" = "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800"
    "services/seo.jpg" = "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800"
}

# Portfolio images
$portfolios = @{
    "portfolios/cafe-lamiz.jpg" = "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800"
    "portfolios/cafe-lamiz-cover.jpg" = "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=1920"
    "portfolios/clinic-rose.jpg" = "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=800"
    "portfolios/clinic-rose-cover.jpg" = "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1920"
    "portfolios/fashion-aria.jpg" = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800"
    "portfolios/fashion-aria-cover.jpg" = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920"
    "portfolios/auto-persia.jpg" = "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800"
    "portfolios/auto-persia-cover.jpg" = "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920"
    "portfolios/cafe-viva.jpg" = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800"
    "portfolios/cafe-viva-cover.jpg" = "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920"
    "portfolios/shop-digi.jpg" = "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800"
    "portfolios/shop-digi-cover.jpg" = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920"
    "portfolios/fitness-fitland.jpg" = "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800"
    "portfolios/fitness-fitland-cover.jpg" = "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1920"
    "portfolios/edu-noavaran.jpg" = "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800"
    "portfolios/edu-noavaran-cover.jpg" = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920"
    "portfolios/dental-labkhand.jpg" = "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800"
    "portfolios/dental-labkhand-cover.jpg" = "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=1920"
}

# Industries images
$industries = @{
    "industries/cafe-restaurant.jpg" = "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200"
    "industries/automotive.jpg" = "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200"
    "industries/beauty-clinic.jpg" = "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200"
    "industries/medical.jpg" = "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200"
    "industries/fashion.jpg" = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200"
    "industries/fitness.jpg" = "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200"
    "industries/education.jpg" = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200"
}

# Testimonials avatars
$testimonials = @{
    "testimonials/ali-mohammadi.jpg" = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100"
    "testimonials/sara-ahmadi.jpg" = "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100"
    "testimonials/mohammad-rezaei.jpg" = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
    "testimonials/niloofar-karimi.jpg" = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
    "testimonials/amir-hosseini.jpg" = "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100"
    "testimonials/reza-karimi.jpg" = "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100"
    "testimonials/fateme-rahimi.jpg" = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100"
    "testimonials/hossein-noori.jpg" = "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=100"
}

# Blog images
$blog = @{
    "blog/instagram-reels-tips.jpg" = "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800"
    "blog/content-calendar.jpg" = "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800"
    "blog/local-seo.jpg" = "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800"
    "blog/brand-identity.jpg" = "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800"
    "blog/digital-marketing.jpg" = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800"
    "blog/cafe-marketing.jpg" = "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800"
}

# Clients images
$clients = @{
    "clients/cafe-lamiz.jpg" = "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=200"
    "clients/clinic-rose.jpg" = "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=200"
    "clients/fashion-aria.jpg" = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200"
    "clients/auto-persia.jpg" = "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=200"
    "clients/digi-style.jpg" = "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200"
    "clients/fitland.jpg" = "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200"
}

# Hero images
$hero = @{
    "hero/hero-bg.jpg" = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920"
    "hero/team.jpg" = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920"
}

# Reels thumbnails
$reels = @{
    "reels/reel1.jpg" = "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400"
    "reels/reel2.jpg" = "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400"
    "reels/reel3.jpg" = "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=400"
    "reels/reel4.jpg" = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400"
    "reels/reel5.jpg" = "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400"
}

# Combine all
$allImages = @{}
$allImages += $services
$allImages += $portfolios
$allImages += $industries
$allImages += $testimonials
$allImages += $blog
$allImages += $clients
$allImages += $hero
$allImages += $reels

Write-Host "Starting download of $($allImages.Count) images..." -ForegroundColor Cyan

foreach ($item in $allImages.GetEnumerator()) {
    $filePath = Join-Path $basePath $item.Key
    $url = $item.Value
    
    Write-Host "Downloading: $($item.Key)..." -NoNewline
    try {
        Invoke-WebRequest -Uri $url -OutFile $filePath -ErrorAction Stop
        Write-Host " Done" -ForegroundColor Green
    } catch {
        Write-Host " Failed: $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "`nAll downloads completed!" -ForegroundColor Cyan

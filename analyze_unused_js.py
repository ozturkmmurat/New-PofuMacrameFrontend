#!/usr/bin/env python3
"""
Script to analyze unused JavaScript files in src/assets/js/pages directory
"""
import os
import re
from pathlib import Path

# Git status'ta silinen sayfalar
DELETED_PAGES = {
    'tables': ['basic', 'gridjs', 'listjs'],
    'ui': ['accordions', 'alerts', 'badges', 'buttons', 'cards', 'carousel', 'colors', 
           'dropdowns', 'general', 'grid', 'images', 'links', 'list', 'media', 'modals', 
           'notifications', 'placeholder', 'progress', 'ribbons', 'tabs', 'typography', 
           'utilities', 'video']
}

# Menu.ts'deki ama routing'de olmayan sayfalar (menu.ts'den kontrol edilecek)
MENU_BUT_NO_ROUTE = {
    'tables': ['basic', 'gridjs', 'listjs'],
    'charts': ['apex-line', 'apex-area', 'apex-column', 'apex-bar', 'apex-mixed', 
               'apex-timeline', 'apex-candlestick', 'apex-boxplot', 'apex-bubble', 
               'apex-scatter', 'apex-heatmap', 'apex-treemap', 'apex-pie', 
               'apex-radialbar', 'apex-radar', 'apex-polar', 'chartjs', 'echarts'],
    'maps': ['google', 'leaflet'],
    'apps': ['calendar', 'chat', 'mailbox', 'file-manager', 'todo', 'projects', 
             'tasks', 'kanban', 'ecommerce', 'crm', 'crypto', 'invoices', 
             'support-tickets', 'nft'],
    'pages': ['starter', 'profile', 'profile-setting', 'team', 'timeline', 'faqs', 
              'pricing', 'gallery', 'maintenance', 'coming-soon', 'sitemap', 
              'search-results', 'privacy-policy', 'terms-condition'],
    'forms': ['basic', 'select', 'checkboxs-radios', 'pickers', 'masks', 'advanced', 
              'range-sliders', 'validation', 'wizard', 'editors', 'file-uploads', 'layouts'],
    'icons': ['remix', 'boxicons', 'materialdesign', 'lineawesome', 'feather', 'icons-crypto'],
    'advance-ui': ['sweetalerts', 'scrollbar', 'animation', 'tour', 'swiper', 
                   'ratings', 'highlight', 'scrollspy']
}

def get_js_files():
    """Get all JS files from src/assets/js/pages"""
    js_dir = Path('src/assets/js/pages')
    js_files = []
    if js_dir.exists():
        for js_file in js_dir.rglob('*.js'):
            js_files.append(js_file.name)
    return sorted(js_files)

def map_js_to_pages():
    """Map JS file names to page routes"""
    js_files = get_js_files()
    js_to_page = {}
    
    for js_file in js_files:
        # Remove .init.js or .js extension
        base_name = js_file.replace('.init.js', '').replace('.js', '')
        
        # Map common patterns
        if base_name.startswith('dashboard-'):
            js_to_page[js_file] = f"dashboards/{base_name.replace('dashboard-', '')}"
        elif base_name.startswith('ecommerce-'):
            js_to_page[js_file] = f"ecommerce/{base_name.replace('ecommerce-', '')}"
        elif base_name.startswith('form-'):
            js_to_page[js_file] = f"forms/{base_name.replace('form-', '')}"
        elif base_name.startswith('apps-nft-'):
            js_to_page[js_file] = f"apps/nft/{base_name.replace('apps-nft-', '')}"
        elif base_name.startswith('apexcharts-'):
            js_to_page[js_file] = f"charts/apex-{base_name.replace('apexcharts-', '')}"
        elif base_name.startswith('crm-'):
            js_to_page[js_file] = f"apps/crm/{base_name.replace('crm-', '')}"
        elif base_name.startswith('crypto-'):
            js_to_page[js_file] = f"apps/crypto/{base_name.replace('crypto-', '')}"
        elif base_name.startswith('job-'):
            js_to_page[js_file] = f"apps/job/{base_name.replace('job-', '')}"
        elif base_name == 'gridjs':
            js_to_page[js_file] = 'tables/gridjs'
        elif base_name == 'listjs':
            js_to_page[js_file] = 'tables/listjs'
        elif base_name == 'datatables':
            js_to_page[js_file] = 'tables/datatables'
        elif base_name == 'chartjs':
            js_to_page[js_file] = 'charts/chartjs'
        elif base_name == 'echarts':
            js_to_page[js_file] = 'charts/echarts'
        elif base_name == 'gmaps':
            js_to_page[js_file] = 'maps/google'
        elif base_name == 'leaflet-map':
            js_to_page[js_file] = 'maps/leaflet'
        elif base_name == 'sweetalerts':
            js_to_page[js_file] = 'advance-ui/sweetalerts'
        elif base_name == 'swiper':
            js_to_page[js_file] = 'advance-ui/swiper'
        elif base_name == 'tour':
            js_to_page[js_file] = 'advance-ui/tour'
        elif base_name == 'gallery':
            js_to_page[js_file] = 'pages/gallery'
        elif base_name == 'timeline':
            js_to_page[js_file] = 'pages/timeline'
        elif base_name == 'team':
            js_to_page[js_file] = 'pages/team'
        elif base_name == 'profile':
            js_to_page[js_file] = 'pages/profile'
        elif base_name == 'profile-setting':
            js_to_page[js_file] = 'pages/profile-setting'
        elif base_name == 'pricing':
            js_to_page[js_file] = 'pages/pricing'
        elif base_name == 'coming-soon':
            js_to_page[js_file] = 'pages/coming-soon'
        elif base_name == 'search-result':
            js_to_page[js_file] = 'pages/search-results'
        elif base_name == 'landing':
            js_to_page[js_file] = 'landing'
        elif base_name == 'nft-landing':
            js_to_page[js_file] = 'landing/nft'
        elif base_name == 'job-lading':
            js_to_page[js_file] = 'landing/job'
        else:
            # Direct mapping
            js_to_page[js_file] = base_name
    
    return js_to_page

def check_routes_exist():
    """Check which routes actually exist in the codebase"""
    existing_routes = set()
    
    # Check routing modules
    routing_files = [
        'src/app/pages/pages-routing.module.ts',
        'src/app/main-landing/main-landing.routing.module.ts',
        'src/app/pages/dashboards/dashboards-routing.module.ts',
        'src/app/pages/apps/apps-routing.module.ts',
        'src/app/pages/ecommerce/ecommerce-routing.module.ts',
        'src/app/pages/extrapages/extraspages-routing.module.ts',
        'src/app/pages/advance-ui/advance-ui-routing.module.ts',
        'src/app/pages/form/form-routing.module.ts',
        'src/app/pages/icons/icons-routing.module.ts',
    ]
    
    for routing_file in routing_files:
        file_path = Path(routing_file)
        if file_path.exists():
            content = file_path.read_text(encoding='utf-8')
            # Extract route paths
            routes = re.findall(r"link:\s*['\"]([^'\"]+)['\"]", content)
            for route in routes:
                existing_routes.add(route)
    
    return existing_routes

def main():
    print("Analyzing unused JavaScript files...")
    print("=" * 60)
    
    js_files = get_js_files()
    js_to_page = map_js_to_pages()
    existing_routes = check_routes_exist()
    
    # Files related to deleted pages
    unused_from_deleted = []
    for category, pages in DELETED_PAGES.items():
        for page in pages:
            # Find matching JS files
            for js_file, route in js_to_page.items():
                if category in route and page in route:
                    unused_from_deleted.append(js_file)
    
    # Files that might be unused (not in existing routes)
    potentially_unused = []
    for js_file, route in js_to_page.items():
        # Skip if route exists
        route_exists = False
        for existing_route in existing_routes:
            if route in existing_route or existing_route in route:
                route_exists = True
                break
        
        if not route_exists:
            # Check if it's a landing page or other special case
            if 'landing' in route or 'nft' in route or 'job' in route:
                continue
            potentially_unused.append((js_file, route))
    
    print(f"\nTotal JS files found: {len(js_files)}")
    print(f"\nFiles related to DELETED pages (tables, ui):")
    print("-" * 60)
    for js_file in sorted(set(unused_from_deleted)):
        print(f"  - {js_file}")
    
    print(f"\n\nPotentially unused files (not found in routing):")
    print("-" * 60)
    for js_file, route in sorted(potentially_unused):
        print(f"  - {js_file} (route: {route})")
    
    print(f"\n\nSummary:")
    print("-" * 60)
    print(f"Files from deleted pages: {len(set(unused_from_deleted))}")
    print(f"Potentially unused files: {len(potentially_unused)}")
    
    # Write to file
    with open('unused_js_files.txt', 'w', encoding='utf-8') as f:
        f.write("UNUSED JAVASCRIPT FILES ANALYSIS\n")
        f.write("=" * 60 + "\n\n")
        f.write("Files related to DELETED pages:\n")
        f.write("-" * 60 + "\n")
        for js_file in sorted(set(unused_from_deleted)):
            f.write(f"{js_file}\n")
        f.write("\n\nPotentially unused files:\n")
        f.write("-" * 60 + "\n")
        for js_file, route in sorted(potentially_unused):
            f.write(f"{js_file} -> {route}\n")
    
    print(f"\n\nResults saved to unused_js_files.txt")

if __name__ == '__main__':
    main()
